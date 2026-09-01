import React from 'react';
import { User, Phone, Mail, MapPin, FileText, MessageSquare, ShieldCheck } from 'lucide-react';

export default function CustomerForm({ formData, setFormData, rentalType = 'self-drive' }) {
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const isSelfDrive = rentalType === 'self-drive';

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      
      <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-brand-navy">Customer Information</h3>
          <p className="text-xs text-slate-500 font-medium">
            {isSelfDrive
              ? 'Enter driver & primary contact details for contract generation.'
              : 'Enter primary contact details for contract generation.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <div>
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
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
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-extrabold text-slate-900 outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
            Mobile Number (For WhatsApp OTP) *
          </label>
          <div className="relative">
            <span className="text-xs font-bold text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2">
              +91
            </span>
            <input
              type="tel"
              required
              placeholder="98765 43210"
              value={formData.mobile || ''}
              onChange={(e) => handleChange('mobile', e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-12 pr-4 py-2.5 text-xs font-extrabold text-slate-900 outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
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
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-extrabold text-slate-900 outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
        </div>

        {/* City */}
        <div>
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
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
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-extrabold text-slate-900 outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
        </div>

        {/* Driving License Number - ONLY for Self Drive */}
        {isSelfDrive && (
          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
              Driving License Number (DL) *
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. MH0220201234567"
                value={formData.dlNumber || ''}
                onChange={(e) => handleChange('dlNumber', e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-slate-900 outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
          </div>
        )}

        {/* Preferred Contact Channel */}
        <div>
          <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
            Preferred Communication Channel
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleChange('preferredContact', 'WhatsApp')}
              className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                formData.preferredContact === 'WhatsApp'
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={() => handleChange('preferredContact', 'Phone Call')}
              className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                formData.preferredContact === 'Phone Call'
                  ? 'bg-brand-navy text-brand-gold border-brand-navy shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Phone Call</span>
            </button>
          </div>
        </div>

      </div>

      {/* Special Requirements */}
      <div>
        <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 block mb-1.5">
          Special Requirements (Optional)
        </label>
        <textarea
          rows={2}
          placeholder="e.g. Need child seat, roof carrier, or early 6:00 AM doorstep delivery..."
          value={formData.specialRequirements || ''}
          onChange={(e) => handleChange('specialRequirements', e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3 text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-brand-blue"
        />
      </div>

    </div>
  );
}
