import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, ShieldCheck, CheckCircle, RefreshCw, AlertCircle, ArrowRight, Lock, AlertTriangle } from 'lucide-react';
import { userDB } from '../../services/userDatabase';

export default function OtpVerificationModal({ user: initialUser, onClose, onVerificationComplete }) {
  const [user, setUser] = useState(initialUser);

  // Email OTP State
  const [emailOtpDigits, setEmailOtpDigits] = useState(['', '', '', '', '', '']);
  const emailInputRefs = useRef([]);
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');
  const [emailResendTimer, setEmailResendTimer] = useState(() => initialUser?.emailDelivery?.success ? 60 : 0);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailDeliveryInfo, setEmailDeliveryInfo] = useState(initialUser?.emailDelivery || null);

  // Email Resend Cooldown Countdown Timer (60s)
  useEffect(() => {
    let timer;
    if (emailResendTimer > 0) {
      timer = setInterval(() => setEmailResendTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [emailResendTimer]);

  // Check if email verification is completed
  const isVerified = Boolean(user?.emailVerified);

  // Handle 6-Digit Auto-Focus and Paste for Email
  const handleEmailDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...emailOtpDigits];
    
    // Paste 6-digit handling
    if (value.length > 1) {
      const pasted = value.slice(0, 6).split('');
      pasted.forEach((char, i) => {
        newDigits[i] = char;
      });
      setEmailOtpDigits(newDigits);
      if (emailInputRefs.current[5]) emailInputRefs.current[5].focus();
      return;
    }

    newDigits[index] = value;
    setEmailOtpDigits(newDigits);

    if (value && index < 5 && emailInputRefs.current[index + 1]) {
      emailInputRefs.current[index + 1].focus();
    }
  };

  const handleEmailKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !emailOtpDigits[index] && index > 0) {
      if (emailInputRefs.current[index - 1]) {
        emailInputRefs.current[index - 1].focus();
      }
    }
  };

  // Auto-fill test OTP in Dev/Testing mode
  const handleAutoFillDevOtp = (otpToFill) => {
    if (!otpToFill) return;
    const digits = otpToFill.toString().slice(0, 6).split('');
    setEmailOtpDigits(digits);
    if (emailInputRefs.current[5]) emailInputRefs.current[5].focus();
  };

  // Verify Email OTP
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setEmailError('');
    setEmailSuccess('');
    setEmailLoading(true);

    const otpCode = emailOtpDigits.join('');
    if (otpCode.length !== 6) {
      setEmailError('Please enter the complete 6-digit Email OTP.');
      setEmailLoading(false);
      return;
    }

    try {
      const updatedUser = await userDB.verifyEmailOTP(user.id, otpCode);
      setUser(updatedUser);
      setEmailSuccess('Email address verified successfully! Account is now ACTIVE. ✅');
      if (updatedUser.emailVerified) {
        setTimeout(() => {
          if (onVerificationComplete) onVerificationComplete(updatedUser);
        }, 1200);
      }
    } catch (err) {
      setEmailError(err.message || 'Invalid Email OTP.');
    } finally {
      setEmailLoading(false);
    }
  };

  // Resend Email OTP
  const handleResendEmail = async () => {
    if (emailResendTimer > 0) return;
    setEmailError('');
    setEmailSuccess('');
    try {
      const res = await userDB.resendEmailOTP(user.id);
      setUser(res.user);
      setEmailDeliveryInfo(res.delivery);
      setEmailOtpDigits(['', '', '', '', '', '']);

      if (res.delivery?.success) {
        setEmailSuccess('✓ New 6-digit OTP dispatched to your registered email.');
        setEmailResendTimer(60);
      } else {
        setEmailError(res.delivery?.message || res.delivery?.error || 'Unable to send Email OTP. Please try again.');
        setEmailResendTimer(0);
      }
    } catch (err) {
      setEmailError(err.message || 'Failed to resend Email OTP.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black mx-auto mb-3 shadow-lg shadow-amber-500/20">
            <ShieldCheck className="w-8 h-8 text-slate-950" />
          </div>
          <h2 className="text-2xl font-black text-white">Email OTP Verification</h2>
          <p className="text-xs text-slate-400 mt-1">
            Enter the 6-digit verification code sent to your registered email address to activate your account.
          </p>
        </div>

        {/* Verified Banner */}
        {isVerified && (
          <div className="p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-center space-y-2 animate-in zoom-in-95 duration-200">
            <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="text-base font-black text-white">Verification Complete!</h4>
            <p className="text-xs text-emerald-300">
              Your email address has been verified. Your account is now <strong className="text-white uppercase">ACTIVE</strong>.
            </p>
            <button
              onClick={() => onVerificationComplete && onVerificationComplete(user)}
              className="mt-2 w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Continue to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* EMAIL VERIFICATION SECTION */}
        <div className={`p-5 rounded-2xl border transition-all space-y-4 ${
          user?.emailVerified 
            ? 'bg-emerald-950/20 border-emerald-500/40' 
            : 'bg-slate-950 border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-400" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Email Verification</h4>
                <p className="text-[11px] text-slate-400 font-mono">{user?.email}</p>
              </div>
            </div>
            
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
              user?.emailVerified 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}>
              {user?.emailVerified ? 'Verified ✅' : 'Pending ⏳'}
            </span>
          </div>

          {/* Truthful Email Delivery Status */}
          {!user?.emailVerified && emailDeliveryInfo && (
            <div className="space-y-2">
              <div className={`p-3 rounded-xl text-[11px] font-medium flex items-start gap-2 ${
                emailDeliveryInfo.success
                  ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-950/40 border border-rose-500/30 text-rose-300'
              }`}>
                {emailDeliveryInfo.success ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <span>
                    {emailDeliveryInfo.success
                      ? `✓ 6-digit OTP sent to ${user?.email}. Please check your inbox and spam folder.`
                      : emailDeliveryInfo.message || 'Email OTP service is temporarily unavailable.'}
                  </span>
                </div>
              </div>

              {emailDeliveryInfo?.devOtp && (
                <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-[11px] text-amber-300 flex items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-amber-200 block">⚡ Dev/Testing Mode OTP: {emailDeliveryInfo.devOtp}</span>
                    <span className="text-[10px] text-amber-400/80">Configure Gmail SMTP in <code>.env</code> to deliver real emails to all recipients.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAutoFillDevOtp(emailDeliveryInfo.devOtp)}
                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-lg text-[10px] shrink-0 transition-all shadow-sm"
                  >
                    Auto-fill OTP
                  </button>
                </div>
              )}
            </div>
          )}

          {!user?.emailVerified && (
            <form onSubmit={handleVerifyEmail} className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Enter 6-Digit Email OTP
                </label>
              </div>

              {/* 6 Auto-focus OTP Digits */}
              <div className="flex items-center justify-center gap-2">
                {emailOtpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => emailInputRefs.current[index] = el}
                    type="text"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleEmailDigitChange(index, e.target.value)}
                    onKeyDown={(e) => handleEmailKeyDown(index, e)}
                    className="w-10 h-11 sm:w-11 sm:h-12 text-center text-lg font-black text-amber-400 bg-slate-900 border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                ))}
              </div>

              {emailError && <p className="text-[11px] text-rose-400 font-medium">{emailError}</p>}
              {emailSuccess && <p className="text-[11px] text-emerald-400 font-medium">{emailSuccess}</p>}

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleResendEmail}
                  disabled={emailResendTimer > 0}
                  className={`text-xs font-bold transition-colors flex items-center gap-1 ${
                    emailResendTimer > 0 
                      ? 'text-slate-600 cursor-not-allowed' 
                      : 'text-amber-400 hover:underline'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {emailResendTimer > 0 ? `Resend Email OTP in ${emailResendTimer}s` : 'Resend Email OTP'}
                </button>

                <button
                  type="submit"
                  disabled={emailLoading}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all"
                >
                  {emailLoading ? 'Verifying...' : 'Verify & Activate'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
