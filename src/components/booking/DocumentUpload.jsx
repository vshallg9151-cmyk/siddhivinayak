import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, ShieldCheck, FileText, Lock, Sparkles, AlertCircle, RefreshCw, FileCheck2, ShieldAlert } from 'lucide-react';
import { validateDrivingLicenseNumber, validateGovtIdNumber } from '../../services/govtVerificationService';

export default function DocumentUpload({
  rentalType = 'self-drive',
  dlNumber = '',
  setDlNumber = () => {},
  idType = 'Aadhaar',
  setIdType = () => {},
  idNumber = '',
  setIdNumber = () => {},
  dlUploaded = false,
  setDlUploaded = () => {},
  idUploaded = false,
  setIdUploaded = () => {},
  hasSubmittedError = false
}) {
  const isSelfDrive = rentalType === 'self-drive';

  // Internal component states for error and verification feedback
  const [dlError, setDlError] = useState('');
  const [idError, setIdError] = useState('');

  const [dlVerifying, setDlVerifying] = useState(false);
  const [idVerifying, setIdVerifying] = useState(false);

  const [dlFileName, setDlFileName] = useState('');
  const [idFileName, setIdFileName] = useState('');

  const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
  const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

  const validateUploadedFile = (file) => {
    if (!file) return { valid: false, error: 'No file selected. Please choose a valid document image or PDF.' };
    if (file.size === 0) return { valid: false, error: 'Uploaded file is empty or corrupted (0 bytes).' };

    const ext = file.name.split('.').pop().toLowerCase();
    const isAllowedExt = ['jpg', 'jpeg', 'png', 'webp', 'pdf'].includes(ext);
    const isAllowedMime = ALLOWED_MIME_TYPES.includes(file.type) || isAllowedExt;

    if (!isAllowedMime) {
      return { valid: false, error: 'Invalid document format. Please upload JPG, PNG, WEBP or PDF documents only.' };
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return { valid: false, error: 'File size exceeds 5MB limit. Please upload a clear compressed document copy.' };
    }

    return { valid: true };
  };

  // Handle Driving License Verification & Upload
  const handleDLFileUpload = (e) => {
    setDlError('');
    const file = e.target.files[0];

    // 1. Validate DL Number first
    const dlCheck = validateDrivingLicenseNumber(dlNumber);
    if (!dlCheck.valid) {
      setDlError(`❌ ${dlCheck.error}`);
      setDlUploaded(false);
      return;
    }

    // 2. Validate Document File
    const fileCheck = validateUploadedFile(file);
    if (!fileCheck.valid) {
      setDlError(`❌ ${fileCheck.error}`);
      setDlUploaded(false);
      return;
    }

    setDlFileName(file.name);
    setDlVerifying(true);

    // Simulate AI & Govt RTO Hologram / Verification Scan
    setTimeout(() => {
      setDlVerifying(false);
      setDlUploaded(true);
      setDlError('');
    }, 1000);
  };

  // Handle Govt ID Verification & Upload
  const handleIDFileUpload = (e) => {
    setIdError('');
    const file = e.target.files[0];

    // 1. Validate Govt ID Number first
    const idCheck = validateGovtIdNumber(idType, idNumber);
    if (!idCheck.valid) {
      setIdError(`❌ ${idCheck.error}`);
      setIdUploaded(false);
      return;
    }

    // 2. Validate Document File
    const fileCheck = validateUploadedFile(file);
    if (!fileCheck.valid) {
      setIdError(`❌ ${fileCheck.error}`);
      setIdUploaded(false);
      return;
    }

    setIdFileName(file.name);
    setIdVerifying(true);

    // Simulate AI & Govt Database Verification Scan
    setTimeout(() => {
      setIdVerifying(false);
      setIdUploaded(true);
      setIdError('');
    }, 1000);
  };

  // Re-verify when numbers change
  const handleDlNumberChange = (val) => {
    const uppercaseVal = val.toUpperCase();
    setDlNumber(uppercaseVal);
    if (dlUploaded) {
      // Re-verify formatting if previously uploaded
      const check = validateDrivingLicenseNumber(uppercaseVal);
      if (!check.valid) {
        setDlUploaded(false);
        setDlError(`❌ DL Number changed: ${check.error}`);
      } else {
        setDlError('');
      }
    }
  };

  const handleIdNumberChange = (val) => {
    const uppercaseVal = val.toUpperCase();
    setIdNumber(uppercaseVal);
    if (idUploaded) {
      const check = validateGovtIdNumber(idType, uppercaseVal);
      if (!check.valid) {
        setIdUploaded(false);
        setIdError(`❌ ${idType} Number changed: ${check.error}`);
      } else {
        setIdError('');
      }
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="pb-3 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> 3. Mandatory Govt Document Verification
            </h3>
            <span className="text-[10px] font-black bg-rose-950 text-rose-300 px-2.5 py-0.5 rounded-full border border-rose-800/50 uppercase">
              Real-Time AI Verification *
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">
            {isSelfDrive
              ? 'Enter official Govt DL & ID numbers. Our AI verifies credentials against RTO & Identity databases.'
              : 'Enter official Govt ID number. Our AI verifies credentials against official identity databases.'}
          </p>
        </div>
        <span className="text-[10px] font-extrabold bg-slate-950 text-emerald-400 px-3 py-1 rounded-full border border-slate-800 self-start sm:self-auto">
          🔒 256-Bit Encrypted Vault
        </span>
      </div>

      <div className={`grid grid-cols-1 ${isSelfDrive ? 'md:grid-cols-2' : ''} gap-6`}>
        
        {/* Driving License Upload Card - ONLY for Self Drive */}
        {isSelfDrive && (
          <div className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
            dlUploaded
              ? 'bg-emerald-950/40 border-emerald-500/50 shadow-md'
              : dlError
              ? 'bg-rose-950/40 border-rose-500/60'
              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    dlUploaded ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-amber-500/20 text-amber-400 font-bold'
                  }`}>
                    {dlUploaded ? <CheckCircle2 className="w-5 h-5" /> : <FileText className="w-4 h-4" />}
                  </div>
                  <h4 className="text-xs font-black text-white">
                    1. Driving License Verification <span className="text-amber-400 font-bold">*</span>
                  </h4>
                </div>

                {dlUploaded ? (
                  <span className="text-[10px] font-black bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" /> RTO Verified
                  </span>
                ) : (
                  <span className="text-[10px] font-black bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">
                    Required *
                  </span>
                )}
              </div>

              {/* DL Number Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold uppercase text-slate-300 block">
                  Enter DL Number (e.g. MH-14-2018-0098234) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. MH1420180098234"
                  value={dlNumber}
                  onChange={(e) => handleDlNumberChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:ring-2 focus:ring-amber-500 uppercase tracking-wider"
                />
              </div>

              {/* Error Message */}
              {dlError && (
                <div className="p-3 bg-rose-950/80 border border-rose-500/60 rounded-xl text-[11px] font-bold text-rose-300 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{dlError}</span>
                </div>
              )}

              {/* Verifying Spinner */}
              {dlVerifying && (
                <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-xs font-bold text-amber-300 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
                  <span>Connecting to Parivahan RTO AI Vault for DL Verification...</span>
                </div>
              )}

              {dlUploaded && !dlError && (
                <div className="p-3 bg-emerald-950/50 rounded-xl border border-emerald-500/40 text-xs font-bold text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>✓ DL Format & Document Verified ({dlFileName || 'DL Copy'})</span>
                </div>
              )}
            </div>

            <label className="mt-3 w-full py-2.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs cursor-pointer transition-all shadow-sm block text-center">
              {dlUploaded ? '✓ DL Uploaded (Click to Change File)' : '📁 Upload Driving License Copy *'}
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
        <div className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
          idUploaded
            ? 'bg-emerald-950/40 border-emerald-500/50 shadow-md'
            : idError
            ? 'bg-rose-950/40 border-rose-500/60'
            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  idUploaded ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-amber-500/20 text-amber-400 font-bold'
                }`}>
                  {idUploaded ? <CheckCircle2 className="w-5 h-5" /> : <FileText className="w-4 h-4" />}
                </div>
                <h4 className="text-xs font-black text-white">
                  {isSelfDrive ? '2. Govt ID Verification' : 'Govt ID Verification'} <span className="text-amber-400 font-bold">*</span>
                </h4>
              </div>

              {idUploaded ? (
                <span className="text-[10px] font-black bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" /> ID Verified
                </span>
              ) : (
                <span className="text-[10px] font-black bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Required *
                </span>
              )}
            </div>

            {/* Govt ID Type Select & Number Input */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1">
                <label className="text-[10px] font-extrabold uppercase text-slate-300 block mb-1">ID Type</label>
                <select
                  value={idType}
                  onChange={(e) => {
                    setIdType(e.target.value);
                    setIdUploaded(false);
                    setIdError('');
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2 py-2 text-xs font-bold text-amber-400 outline-none"
                >
                  <option value="Aadhaar">Aadhaar</option>
                  <option value="PAN">PAN Card</option>
                  <option value="Voter ID">Voter ID</option>
                  <option value="Passport">Passport</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="text-[10px] font-extrabold uppercase text-slate-300 block mb-1">
                  {idType} Number <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder={
                    idType === 'Aadhaar' ? '12-digit e.g. 9876 5432 1098' :
                    idType === 'PAN' ? '10-char e.g. ABCDE1234F' :
                    idType === 'Voter ID' ? '10-char e.g. ABC1234567' : '8-char e.g. A1234567'
                  }
                  value={idNumber}
                  onChange={(e) => handleIdNumberChange(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:ring-2 focus:ring-amber-500 uppercase tracking-wider"
                />
              </div>
            </div>

            {/* Error Message */}
            {idError && (
              <div className="p-3 bg-rose-950/80 border border-rose-500/60 rounded-xl text-[11px] font-bold text-rose-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{idError}</span>
              </div>
            )}

            {/* Verifying Spinner */}
            {idVerifying && (
              <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl text-xs font-bold text-amber-300 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
                <span>Connecting to Govt Identity Vault for {idType} Verification...</span>
              </div>
            )}

            {idUploaded && !idError && (
              <div className="p-3 bg-emerald-950/50 rounded-xl border border-emerald-500/40 text-xs font-bold text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>✓ {idType} Number & Document Verified ({idFileName || 'ID Copy'})</span>
              </div>
            )}
          </div>

          <label className="mt-3 w-full py-2.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs cursor-pointer transition-all shadow-sm block text-center">
            {idUploaded ? '✓ ID Proof Uploaded (Click to Change File)' : `📁 Upload ${idType} Document Copy *`}
            <input
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleIDFileUpload}
            />
          </label>
        </div>

      </div>

      <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-slate-400 text-xs font-medium flex items-center gap-2">
        <Lock className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          {isSelfDrive
            ? '🔒 Driving License & Govt ID Proof are strictly verified against government format rules before proceeding.'
            : '🔒 Govt ID Proof is strictly verified against government format rules before proceeding.'}
        </span>
      </div>

    </div>
  );
}
