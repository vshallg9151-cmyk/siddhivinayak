import React from 'react';
import { ShieldAlert, Lock, ArrowLeft, User, ShieldCheck, Crown, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminDashboardPage from '../admin/AdminDashboardPage';
import SuperAdminDashboardPage from '../super-admin/SuperAdminDashboardPage';
import UserDashboardPage from '../dashboard/UserDashboardPage';

export default function DashboardAccessGuard({ 
  targetPage, 
  requestedPath, 
  onNavigate, 
  onExitToHome, 
  onOpenAuth, 
  ...dashboardProps 
}) {
  const { user, loginAsPreset } = useAuth();

  const handleGoHome = onNavigate ? () => onNavigate('home') : (onExitToHome || (() => { window.location.href = '/'; }));
  const handleOpenAuthModal = onOpenAuth || (() => { window.location.href = '/login'; });

  // Resolve target page from targetPage prop OR requestedPath string
  let activeTarget = targetPage;
  if (!activeTarget && requestedPath) {
    if (requestedPath.startsWith('/super-admin')) activeTarget = 'super-admin';
    else if (requestedPath.startsWith('/admin')) activeTarget = 'admin';
    else if (requestedPath.startsWith('/user') || requestedPath === '/dashboard') activeTarget = 'dashboard';
    else if (requestedPath === '/setup' || requestedPath === '/create-super-admin') activeTarget = 'setup';
  }

  // Standard Access Denied Component with exact user-specified message
  const renderAccessDenied = (customTitle = '403 Forbidden', customMessage = "You don't have permission to access this page.") => {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-slate-950 font-sans">
        <div className="max-w-md w-full bg-slate-900/95 border border-rose-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-center space-y-6 animate-in fade-in duration-300">
          
          {/* Badge & Warning Icon */}
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-rose-500/20 rounded-full animate-ping opacity-30"></div>
            <div className="w-20 h-20 bg-gradient-to-tr from-rose-600 to-amber-600 rounded-2xl flex items-center justify-center text-slate-950 shadow-xl shadow-rose-500/20">
              <ShieldAlert className="w-10 h-10 text-white" />
            </div>
          </div>

          <div>
            <span className="px-3 py-1 bg-rose-500/20 text-rose-400 font-extrabold text-[10px] tracking-widest uppercase rounded-full border border-rose-500/30">
              403 FORBIDDEN
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-3">{customTitle}</h2>
            
            {/* EXACT MESSAGE MANDATED BY USER SPECIFICATION */}
            <div className="mt-3 p-4 bg-slate-950 border border-rose-500/30 rounded-2xl">
              <p className="text-sm font-semibold text-rose-300">
                "{customMessage}"
              </p>
            </div>
          </div>

          {/* Active Session Indicator */}
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Your Current Active Role:</span>
            <span className={`font-extrabold px-2.5 py-0.5 rounded-full text-[11px] ${
              user?.role === 'SUPER_ADMIN' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
              user?.role === 'ADMIN' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
              user?.role === 'USER' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' :
              'bg-slate-800 text-slate-400'
            }`}>
              {user?.role || 'NOT LOGGED IN'}
            </span>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            {!user ? (
              <button
                onClick={handleOpenAuthModal}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" /> Log In with Authorized Account
              </button>
            ) : null}

            <button
              onClick={handleGoHome}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400" /> Return to Home Page
            </button>
          </div>

          {/* Quick Demo Switcher */}
          <div className="pt-4 border-t border-slate-800/80">
            <span className="text-[10px] text-slate-500 uppercase font-bold block mb-2">
              Quick Test Role Switcher
            </span>
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <button
                onClick={() => loginAsPreset('USER')}
                className="py-1.5 px-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg font-bold border border-blue-500/30"
              >
                👤 USER
              </button>
              <button
                onClick={() => loginAsPreset('ADMIN')}
                className="py-1.5 px-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg font-bold border border-amber-500/30"
              >
                🛡️ ADMIN
              </button>
              <button
                onClick={() => loginAsPreset('SUPER_ADMIN')}
                className="py-1.5 px-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 rounded-lg font-bold border border-purple-500/30"
              >
                👑 SUPER_ADMIN
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  };

  // BLOCK /setup OR /create-super-admin ROUTES
  if (activeTarget === 'setup' || activeTarget === 'create-super-admin') {
    return renderAccessDenied('Access Blocked', "Super Admin account already exists in database. New Super Admin creation is disabled.");
  }

  // 1. SUPER ADMIN DASHBOARD GUARD (/super-admin/dashboard)
  if (activeTarget === 'super-admin') {
    if (!user || user.role !== 'SUPER_ADMIN') {
      return renderAccessDenied('Super Admin Portal Guard', "You don't have permission to access this page.");
    }
    return <SuperAdminDashboardPage onExit={handleGoHome} {...dashboardProps} />;
  }

  // 2. ADMIN DASHBOARD GUARD (/admin/dashboard)
  if (activeTarget === 'admin') {
    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
      return renderAccessDenied('Admin Operations Guard', "You don't have permission to access this page.");
    }
    return <AdminDashboardPage onExitAdmin={handleGoHome} {...dashboardProps} />;
  }

  // 3. USER DASHBOARD GUARD (/user/dashboard)
  if (activeTarget === 'dashboard') {
    if (!user || (user.role !== 'USER' && user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
      return renderAccessDenied('Customer Dashboard Guard', "You don't have permission to access this page.");
    }
    return <UserDashboardPage onNavigateFleet={() => (onNavigate ? onNavigate('fleet') : null)} {...dashboardProps} />;
  }

  return renderAccessDenied('404 Page Not Found', "The requested dashboard page does not exist.");
}
