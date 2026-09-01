import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Users, Share2, Crown, Sparkles, Copy, Check } from 'lucide-react';
import { GAMIFICATION_BADGES } from '../../data/phase7Data';

export default function SocialGamificationModal({ isOpen, onClose }) {
  const [copiedGroupCode, setCopiedGroupCode] = useState(false);
  const groupCode = 'TRIP-SV-9920';

  if (!isOpen) return null;

  const handleCopyGroupCode = () => {
    navigator.clipboard.writeText(`https://siddhivinayaktours.com/group/join/${groupCode}`);
    setCopiedGroupCode(true);
    setTimeout(() => setCopiedGroupCode(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  Travel Gamification & Social Group Hub
                  <span className="text-xs bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-full">
                    Level 5 Master Explorer
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Unlock travel badges, invite friends & compete on leaderboards</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-slate-100">
            
            {/* Social Group Trip Card */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 p-5 rounded-2xl border border-amber-500/40 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                  <Users className="w-4 h-4 text-sky-400" /> Create / Join Group Trip
                </h4>
                <span className="text-[10px] bg-sky-500/20 text-sky-400 font-bold px-2 py-0.5 rounded-full border border-sky-500/30">
                  Shared Itinerary
                </span>
              </div>
              <p className="text-xs text-slate-300">Invite family & friends to edit itineraries & split cab/hotel payments together!</p>
              <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 font-mono flex-1">Group Code: <strong className="text-amber-400">{groupCode}</strong></span>
                <button
                  onClick={handleCopyGroupCode}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1"
                >
                  {copiedGroupCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedGroupCode ? 'Copied Link' : 'Copy Invite Link'}
                </button>
              </div>
            </div>

            {/* Badges Matrix */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Unlocked Explorer Badges
              </h4>

              <div className="grid grid-cols-2 gap-3">
                {GAMIFICATION_BADGES.map(badge => (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-2xl border flex items-center gap-3 ${
                      badge.unlocked
                        ? 'bg-slate-950 border-amber-500/40 text-slate-100'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
                    }`}
                  >
                    <span className="text-3xl">{badge.icon}</span>
                    <div>
                      <h5 className="font-bold text-xs text-slate-100">{badge.name}</h5>
                      <p className="text-[10px] text-slate-400 mt-0.5">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">🏆 Top Siddhivinayak Explorers Leaderboard</h4>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center p-2 rounded-xl bg-slate-900 font-semibold">
                  <span>1. 🥇 Rahul Sharma (Mumbai)</span>
                  <span className="text-amber-400 font-bold">1,840 Points</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-xl bg-slate-900 font-semibold">
                  <span>2. 🥈 Sachin Mishra (You)</span>
                  <span className="text-amber-400 font-bold">1,450 Points</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-xl bg-slate-900 font-semibold">
                  <span>3. 🥉 Priya Verma (Pune)</span>
                  <span className="text-amber-400 font-bold">1,200 Points</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
