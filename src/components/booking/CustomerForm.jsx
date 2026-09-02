import React from 'react';
import { User, Phone, Mail, MapPin, FileText, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';

export default function CustomerForm({ formData, setFormData, rentalType = 'self-drive' }) {
  const handleChange = (field, value) => {
    setFormData({ [field]: value });
  };

  const isSelfDrive = rentalType === 'self-drive';

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
      
      <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> 2. Customer Information
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-1">
            {isSelfDrive
              ? 'Enter driver & primary contact details for contract generation.'
              : 'Enter primary contact details for contract generation.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
            {isSelfDrive ? 'Full Name (As per Driving License) *' : 'Full Name (As per Govt ID) *'}
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="e.g. Rajesh Kulkarni"
              value={formData.fullName || ''}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold text-white outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
            Mobile Number (For WhatsApp OTP) *
          </label>
          <div className="relative">
            <span className="text-xs font-bold text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2">
              +91
            </span>
            <input
              type="tel"
              required
              placeholder="98765 43210"
              value={formData.mobile || ''}
              onChange={(e) => handleChange('mobile', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-12 pr-4 py-3 text-xs font-bold text-white outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              placeholder="rajesh@example.com"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold text-white outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* City */}
        <div>
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
            City of Residence *
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="e.g. Mumbai"
              value={formData.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold text-white outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Driving License Number (Self Drive Only) */}
        {isSelfDrive && (
          <div className="md:col-span-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1.5">
              Driving License Number *
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="MH-14-2018-0098234"
                value={formData.dlNumber || ''}
                onChange={(e) => handleChange('dlNumber', e.target.value.toUpperCase())}
                className="w-full bg-slate-950 border border-amber-500/50 rounded-2xl pl-10 pr-4 py-3 text-xs font-bold text-white outline-none focus:ring-2 focus:ring-amber-500 uppercase tracking-widest"
              />
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
