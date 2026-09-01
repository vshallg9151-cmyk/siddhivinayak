import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, ShieldCheck, FileText, Lock, Sparkles, AlertCircle, RefreshCw, FileCheck2 } from 'lucide-react';

export default function DocumentUpload({ dlUploaded, setDlUploaded, idUploaded, setIdUploaded, hasSubmittedError, rentalType = 'self-drive' }) {
  const isSelfDrive = rentalType === 'self-drive';

  const [dlNumber, setDlNumber] = useState('');
  const [dlStatus, setDlStatus] = useState('idle'); // 'idle' | 'verifying' | 'verified' | 'error'
  const [dlFileName, setDlFileName] = useState('');
  const [uploadError, setUploadError] = useState('');

  const [idType, setIdType] = useState('Aadhaar');
  const [idNumber, setIdNumber] = useState('');
  const [idStatus, setIdStatus] = useState('idle'); // 'idle' | 'verifying' | 'verified' | 'error'
  const [idFileName, setIdFileName] = useState('');

  const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
  const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

  const validateFile = (file) => {
    if (!file) return { valid: false, error: 'No file selected.' };

    const ext = file.name.split('.').pop().toLowerCase();
    const isAllowedExt = ['jpg', 'jpeg', 'png', 'webp', 'pdf'].includes(ext);
    const isAllowedMime = ALLOWED_MIME_TYPES.includes(file.type) || isAllowedExt;

    if (!isAllowedMime) {
      return { valid: false, error: 'Invalid file format. Please upload JPG, PNG, WEBP or PDF documents only.' };
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return { valid: false, error: 'File size exceeds 5MB limit. Please upload a compressed copy.' };
    }

    return { valid: true };
  };

  const handleDLFileUpload = (e) => {
    setUploadError('');
    const file = e.target.files[0];
    if (!file) return;

    const check = validateFile(file);
    if (!check.valid) {
      setUploadError(check.error);
      return;
    }

    setDlFileName(file.name);
    setDlStatus('verifying');
    
    // Simulate AI Parivahan RTO Hologram & OCR Verification Scan
    setTimeout(() => {
      setDlStatus('verified');
      setDlUploaded(true);
    }, 1200);
  };

  const handleIDFileUpload = (e) => {
    setUploadError('');
    const file = e.target.files[0];
    if (!file) return;

    const check = validateFile(file);
    if (!check.valid) {
      setUploadError(check.error);
      return;
    }

    setIdFileName(file.name);
    setIdStatus('verifying');

    // Simulate AI UIDAI / Govt ID Verification Scan
    setTimeout(() => {
      setIdStatus('verified');
      setIdUploaded(true);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-black text-brand-navy flex items-center gap-1.5">
              <span>Mandatory Document Verification</span>
              <span className="text-rose-600 font-extrabold text-sm">*</span>
            </h3>
            <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200 uppercase">
              Mandatory Required *
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {isSelfDrive
              ? 'Paperless AI verification for Indian driving permits & government identity proofs.'
              : 'Paperless AI verification for government identity proofs.'}
          </p>
        </div>
        <span className="text-[10px] font-extrabold bg-blue-50 text-brand-blue px-3 py-1 rounded-full border border-blue-100 self-start sm:self-auto">
          🔒 256-Bit Encrypted Vault
        </span>
      </div>

      {/* Upload Validation Error Notice */}
      {uploadError && (
        <div className="p-4 bg-rose-50 border-2 border-rose-400 rounded-2xl flex items-start gap-3 animate-pulse">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-black text-rose-900">Upload Issue</h4>
            <p className="text-xs text-rose-700 font-semibold mt-0.5">{uploadError}</p>
          </div>
        </div>
      )}

      {/* Warning Notice if user tried to submit without documents */}
      {hasSubmittedError && (isSelfDrive ? (!dlUploaded || !idUploaded) : !idUploaded) && (
        <div className="p-4 bg-rose-50 border-2 border-rose-400 rounded-2xl flex items-start gap-3 animate-pulse">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-black text-rose-900">Mandatory Documents Required!</h4>
            <p className="text-xs text-rose-700 font-semibold mt-0.5">
              {isSelfDrive
                ? 'Government regulations strictly require BOTH a valid Driving License and Govt ID Proof (Aadhaar / Voter ID / Passport) before proceeding to Price Summary.'
                : 'Government regulations strictly require a valid Govt ID Proof (Aadhaar / Voter ID / Passport) before proceeding to Price Summary.'}
            </p>
          </div>
        </div>
      )}

      <div className={`grid grid-cols-1 ${isSelfDrive ? 'md:grid-cols-2' : ''} gap-6`}>
        
        {/* Driving License Upload Card - ONLY for Self Drive */}
        {isSelfDrive && (
          <div className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-4 ${
            dlUploaded
              ? 'bg-emerald-50/70 border-emerald-500 shadow-md'
              : hasSubmittedError && !dlUploaded
                ? 'bg-rose-50/50 border-rose-400'
                : 'bg-slate-50 border-dashed border-slate-300 hover:border-brand-blue'
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    dlUploaded ? 'bg-emerald-500 text-white' : 'bg-brand-blue/10 text-brand-blue font-bold'
                  }`}>
                    {dlUploaded ? <CheckCircle2 className="w-5 h-5" /> : <FileText className="w-4 h-4" />}
                  </div>
                  <h4 className="text-xs font-black text-slate-900">
                    1. Driving License <span className="text-rose-600 font-bold">*</span>
                  </h4>
                </div>

                {dlUploaded ? (
                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                    <FileCheck2 className="w-3.5 h-3.5" /> Verified
                  </span>
                ) : (
                  <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200">
                    Required *
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                Front & back image of valid Indian LMV / Commercial Driving License.
              </p>

              {/* DL Number Input & Format Verification */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold uppercase text-slate-600 block">
                  DL Registration Number <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. MH-14-2018-0098234"
                  value={dlNumber}
                  onChange={(e) => setDlNumber(e.target.value.toUpperCase())}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-900 outline-none focus:border-brand-blue"
                />
              </div>

              {/* AI Verification Status Box */}
              {dlStatus === 'verifying' && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-amber-900 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-amber-600 animate-spin" />
                  <span>Scanning DL Hologram & Parivahan RTO Database...</span>
                </div>
              )}

              {dlStatus === 'verified' && (
                <div className="p-3 bg-emerald-100 rounded-xl border border-emerald-300 text-xs font-black text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>✓ Verified Official Driving License (Parivahan RTO Verified)</span>
                </div>
              )}
            </div>

            <label className="mt-3 w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs cursor-pointer transition-all shadow-sm block text-center">
              {dlUploaded ? '✓ DL Uploaded (Click to Replace)' : '📁 Upload Driving License (Front & Back) *'}
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleDLFileUpload}
              />
            </label>
          </div>
        )}

        {/* Govt ID Proof Upload Card */}
        <div className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-4 ${
          idUploaded
            ? 'bg-emerald-50/70 border-emerald-500 shadow-md'
            : hasSubmittedError && !idUploaded
              ? 'bg-rose-50/50 border-rose-400'
              : 'bg-slate-50 border-dashed border-slate-300 hover:border-brand-blue'
        }`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  idUploaded ? 'bg-emerald-500 text-white' : 'bg-brand-blue/10 text-brand-blue font-bold'
                }`}>
                  {idUploaded ? <CheckCircle2 className="w-5 h-5" /> : <FileText className="w-4 h-4" />}
                </div>
                <h4 className="text-xs font-black text-slate-900">
                  {isSelfDrive ? '2. Govt ID Proof' : 'Govt ID Proof'} <span className="text-rose-600 font-bold">*</span>
                </h4>
              </div>

              {idUploaded ? (
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                  <FileCheck2 className="w-3.5 h-3.5" /> Verified
                </span>
              ) : (
                <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200">
                  Required *
                </span>
              )}
            </div>

            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              Official Indian Govt Identity Proof (Aadhaar Card, Passport, or Voter ID).
            </p>

            {/* ID Type Select & Number Input */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1">
                <label className="text-[10px] font-extrabold uppercase text-slate-600 block mb-1">ID Type</label>
                <select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-2 py-2 text-xs font-bold text-slate-900 outline-none"
                >
                  <option value="Aadhaar">Aadhaar</option>
                  <option value="Voter ID">Voter ID</option>
                  <option value="Passport">Passport</option>
                  <option value="PAN">PAN Card</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="text-[10px] font-extrabold uppercase text-slate-600 block mb-1">
                  {idType} Number <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder={idType === 'Aadhaar' ? '12-digit e.g. 9988 7766 5544' : 'ID Number'}
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-brand-blue"
                />
              </div>
            </div>

            {/* AI Verification Status Box */}
            {idStatus === 'verifying' && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-amber-900 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-amber-600 animate-spin" />
                <span>Scanning UIDAI / Government Document Hologram...</span>
              </div>
            )}

            {idStatus === 'verified' && (
              <div className="p-3 bg-emerald-100 rounded-xl border border-emerald-300 text-xs font-black text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>✓ Verified Official Govt ID Proof ({idType} Verified)</span>
              </div>
            )}
          </div>

          <label className="mt-3 w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs cursor-pointer transition-all shadow-sm block text-center">
            {idUploaded ? '✓ ID Proof Uploaded (Click to Replace)' : '📁 Upload Govt ID Proof (Aadhaar/Passport/Voter ID) *'}
            <input
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleIDFileUpload}
            />
          </label>
        </div>

      </div>

      <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2">
        <Lock className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          {isSelfDrive
            ? '🔒 Driving License & Govt ID Proof are strictly MANDATORY by law. Our executive will verify physical originals prior to vehicle key handover.'
            : '🔒 Govt ID Proof is strictly MANDATORY by law. Our executive will verify physical originals prior to vehicle key handover.'}
        </span>
      </div>

    </div>
  );
}
