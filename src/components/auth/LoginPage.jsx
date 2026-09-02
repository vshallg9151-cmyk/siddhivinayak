import React, { useState, useEffect } from 'react';
import { Lock, Mail, Phone, User, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import OtpVerificationModal from './OtpVerificationModal';
import { userDB } from '../../services/userDatabase';
import StepProgressHeader from '../booking/StepProgressHeader';
import BackgroundWrapper from '../common/BackgroundWrapper';

export default function LoginPage({ onNavigate, onAuthSuccess }) {
  const { user: authUser, login, register, completeVerification } = useAuth();

  // If user is already logged in, automatically redirect to booking step
  useEffect(() => {
    if (authUser && authUser.emailVerified) {
      if (onNavigate) {
        onNavigate('booking');
      }
    }
  }, [authUser, onNavigate]);

  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Reset Password State
  const [forgotPasswordView, setForgotPasswordView] = useState(false);
  const [resetPasswordStep, setResetPasswordStep] = useState(false);
  const [resetUser, setResetUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  
  // Verification Modal State
  const [verifyingUser, setVerifyingUser] = useState(null);

  // Messages & Loading State
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const { user: loggedInUser, redirectUrl } = login({ email, password });
        if (onAuthSuccess) onAuthSuccess(loggedInUser, redirectUrl);
        else if (onNavigate) onNavigate('booking', null, loggedInUser);
      } else {
        // Sign Up
        const { user: registeredUser } = await register({ 
          name: fullName, 
          email, 
          mobile, 
          password,
          confirmPassword 
        });
        
        // Launch Dual OTP Verification Modal for newly registered user
        setVerifyingUser(registeredUser);
      }
    } catch (err) {
      if (err.unverifiedUser) {
        setErrorMessage(err.message);
        setVerifyingUser(err.unverifiedUser);
      } else {
        setErrorMessage(err.message || 'Authentication failed. Please check credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');
    setLoading(true);

    try {
      if (!email) {
        setErrorMessage('Please enter your registered email address.');
        setLoading(false);
        return;
      }

      const existingUser = userDB.findByEmail(email);
      if (!existingUser) {
        setErrorMessage('No user account found with this email address.');
        setLoading(false);
        return;
      }

      setVerifyingUser(existingUser);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to initiate password reset.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetNewPasswordSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      userDB.updateUser(resetUser.id, { password: newPassword });
      setInfoMessage('Password successfully reset! Please log in with your new password.');
      setForgotPasswordView(false);
      setResetPasswordStep(false);
      setResetUser(null);
      setMode('login');
      setPassword('');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to reset password.');
    }
  };

  const handleVerificationComplete = (verifiedUser) => {
    setVerifyingUser(null);
    if (forgotPasswordView) {
      setResetUser(verifiedUser);
      setResetPasswordStep(true);
      setInfoMessage('Email OTP verified! Please enter your new password below.');
    } else {
      const { user: activeUser, redirectUrl } = completeVerification(verifiedUser);
      if (onAuthSuccess) onAuthSuccess(activeUser, redirectUrl);
      else if (onNavigate) onNavigate('booking', null, activeUser);
    }
  };

  if (verifyingUser) {
    return (
      <OtpVerificationModal
        user={verifyingUser}
        onClose={() => setVerifyingUser(null)}
        onVerificationComplete={handleVerificationComplete}
      />
    );
  }

  return (
    <BackgroundWrapper>
      <div className="min-h-screen p-4 sm:p-6 lg:p-8 pt-28 sm:pt-32 pb-20 font-sans">
        <div className="max-w-5xl mx-auto mb-6">
          <StepProgressHeader currentStep={1} highestStepReached={1} onNavigate={onNavigate} />
        </div>

        {/* Clean White Login Card */}
        <div className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 text-slate-900">
          
          {/* Brand Header */}
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/20 text-slate-950 font-black text-2xl">
              S
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {forgotPasswordView 
                ? 'Reset Password' 
                : mode === 'login' 
                  ? 'Welcome Back' 
                  : 'Create Account'}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Siddhivinayak Tours & Travels Secured Portal
            </p>
          </div>

          {/* Tab Toggle */}
          {!forgotPasswordView && (
            <div className="flex p-1.5 bg-slate-100 border border-slate-200 rounded-2xl">
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMessage(''); }}
                className={`w-1/2 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'login' ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setErrorMessage(''); }}
                className={`w-1/2 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'signup' ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Register
              </button>
            </div>
          )}

          {/* Alerts */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-700 flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {infoMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-800 flex items-center gap-2 animate-in fade-in">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{infoMessage}</span>
            </div>
          )}

          {/* Form */}
          {resetPasswordStep ? (
            <form onSubmit={handleSetNewPasswordSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 block mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-amber-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 block mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                {loading ? 'Resetting Password...' : 'Save New Password & Sign In'}
              </button>

              <button
                type="button"
                onClick={() => { setResetPasswordStep(false); setForgotPasswordView(false); setErrorMessage(''); setInfoMessage(''); }}
                className="w-full py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                ← Cancel & Back to Sign In
              </button>
            </form>
          ) : forgotPasswordView ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 block mb-1">
                  Registered Email or Mobile Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="name@example.com or 9876543210"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                {loading ? 'Sending OTPs...' : 'Generate Reset OTPs'}
              </button>

              <button
                type="button"
                onClick={() => { setForgotPasswordView(false); setErrorMessage(''); setInfoMessage(''); }}
                className="w-full py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                ← Back to Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 block mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 block mb-1">
                  {mode === 'login' ? 'Email Address or Mobile Number *' : 'Email Address *'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={mode === 'login' ? 'text' : 'email'}
                    required
                    placeholder={mode === 'login' ? 'name@example.com or 9876543210' : 'name@example.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-amber-500 focus:bg-white"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 block mb-1">
                    Mobile Number (For SMS OTP) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700">
                    Password *
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => { setForgotPasswordView(true); setErrorMessage(''); }}
                      className="text-[10px] font-bold text-amber-600 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-amber-500 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 block mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {mode === 'login' && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 accent-amber-500 rounded"
                    />
                    <span className="text-xs text-slate-600 font-medium">Remember me</span>
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 mt-4 hover:scale-[1.01]"
              >
                {loading ? 'Authenticating...' : mode === 'login' ? 'Sign In' : 'Register & Send Dual OTPs'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>
      </div>
    </BackgroundWrapper>
  );
}
