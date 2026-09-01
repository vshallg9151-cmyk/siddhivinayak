import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Sun, DollarSign, Hotel, Calendar, AlertTriangle, ChevronRight } from 'lucide-react';
import { NOTIFICATIONS_DATA } from '../../data/phase4Data';

export default function NotificationDrawer({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        className="absolute top-16 right-4 sm:right-12 z-50 w-[92vw] sm:w-[380px] bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl"
      >
        {/* Header */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm text-slate-100">Live Travel Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllRead}
              className="text-[11px] font-bold text-amber-400 hover:underline"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="max-h-[380px] overflow-y-auto p-3 space-y-2 custom-scrollbar">
          {notifications.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-8">No unread notifications right now!</p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded-2xl border transition-all flex items-start gap-3 relative ${
                  notif.unread
                    ? 'bg-slate-950 border-amber-500/30'
                    : 'bg-slate-900/60 border-slate-800/80 opacity-75'
                }`}
              >
                <div className="flex-1">
                  <h4 className="font-bold text-xs text-slate-100 flex items-center justify-between">
                    {notif.title}
                    {notif.unread && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    )}
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-snug">{notif.message}</p>
                  <span className="text-[9px] text-slate-500 mt-1.5 block font-semibold">{notif.time}</span>
                </div>
                <button
                  onClick={() => clearNotification(notif.id)}
                  className="text-slate-500 hover:text-slate-300 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
