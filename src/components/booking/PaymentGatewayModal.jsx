import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, QrCode, ShieldCheck, CheckCircle2, Lock, Smartphone, Building, Sparkles, Receipt, ArrowRight } from 'lucide-react';

export default function PaymentGatewayModal({ isOpen, onClose, bookingDetails, onPaymentSuccess }) {
  const [paymentType, setPaymentType] = useState('full'); // 'full' | 'advance'
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'wallet' | 'emi'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [receiptData, setReceiptData] = useState(null);

  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  if (!isOpen || !bookingDetails) return null;

  const totalAmount = bookingDetails.totalPrice || 12499;
  const advanceAmount = Math.round(totalAmount * 0.2); // 20% advance
  const payableAmount = paymentType === 'advance' ? advanceAmount : totalAmount;

  const handlePayNow = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const receipt = {
        paymentId: `PAY-${Math.floor(100000 + Math.random() * 900000)}`,
        transactionDate: new Date().toLocaleString(),
        paidAmount: payableAmount,
        remainingBalance: totalAmount - payableAmount,
        paymentMethod: paymentMethod.toUpperCase(),
        paymentStatus: 'SUCCESS',
        bookingId: bookingDetails.bookingId || `BK-${Date.now()}`
      };

      setReceiptData(receipt);
      setIsProcessing(false);
      setIsSuccess(true);

      if (onPaymentSuccess) {
        onPaymentSuccess(receipt);
      }
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  Siddhivinayak Secure Pay
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> 256-Bit Encrypted
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Order ID: {bookingDetails.bookingId || 'BK-INIT'}</p>
              </div>
            </div>
            {!isSuccess && (
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {!isSuccess ? (
            <form onSubmit={handlePayNow} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-slate-100">
              
              {/* Payment Type Switcher: Full vs 20% Advance */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Choose Payment Option</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentType('full')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      paymentType === 'full'
                        ? 'bg-amber-500/20 border-amber-500 text-slate-100'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold block">100% Full Payment</span>
                    <span className="text-lg font-black text-amber-400 mt-1 block">
                      ₹{totalAmount.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">✓ Instant Booking Confirmation</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType('advance')}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      paymentType === 'advance'
                        ? 'bg-amber-500/20 border-amber-500 text-slate-100'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold block">20% Partial Advance</span>
                    <span className="text-lg font-black text-sky-400 mt-1 block">
                      ₹{advanceAmount.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Pay remaining ₹{(totalAmount - advanceAmount).toLocaleString()} later</span>
                  </button>
                </div>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Payment Method</label>
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {[
                    { key: 'upi', label: 'UPI / QR', icon: QrCode },
                    { key: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                    { key: 'netbanking', label: 'Net Banking', icon: Building },
                    { key: 'wallet', label: 'Wallets', icon: Smartphone },
                    { key: 'emi', label: 'No-Cost EMI', icon: Sparkles }
                  ].map((m) => {
                    const IconComp = m.icon;
                    return (
                      <button
                        key={m.key}
                        type="button"
                        onClick={() => setPaymentMethod(m.key)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                          paymentMethod === m.key
                            ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        <IconComp className="w-3.5 h-3.5" /> {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Method Details Input */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                {paymentMethod === 'upi' && (
                  <div className="space-y-3">
                    <div className="p-4 bg-white rounded-2xl w-40 h-40 mx-auto flex items-center justify-center border border-slate-200 shadow-inner">
                      <QrCode className="w-32 h-32 text-slate-900" />
                    </div>
                    <p className="text-xs text-center text-slate-400">Scan QR via Google Pay, PhonePe, Paytm, or BHIM</p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Enter Virtual Payment Address (e.g. user@upi)"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="flex-1 bg-slate-900 text-slate-100 text-xs p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8912"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-slate-900 text-slate-100 text-xs p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-slate-900 text-slate-100 text-xs p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">CVV Security Code</label>
                        <input
                          type="password"
                          placeholder="•••"
                          maxLength="4"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full bg-slate-900 text-slate-100 text-xs p-3 rounded-xl border border-slate-800 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {(paymentMethod === 'netbanking' || paymentMethod === 'wallet' || paymentMethod === 'emi') && (
                  <div className="p-4 text-center space-y-2">
                    <p className="text-xs text-slate-300 font-semibold">
                      You will be redirected to bank portal for secure 2-Factor Authentication.
                    </p>
                    <p className="text-[10px] text-emerald-400 font-bold">100% Cash Back Protection Guarantee</p>
                  </div>
                )}
              </div>

              {/* Pay Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-2xl text-base shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" /> Verifying Bank OTP...
                  </>
                ) : (
                  <>
                    Authorize Payment of ₹{payableAmount.toLocaleString()} <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

            </form>
          ) : (
            /* Success Receipt View */
            <div className="p-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-100">Payment Successful!</h3>
                <p className="text-xs text-slate-400 mt-1">Transaction ID: {receiptData?.paymentId}</p>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Paid Amount:</span>
                  <strong className="text-emerald-400 font-bold">₹{receiptData?.paidAmount.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Remaining Balance:</span>
                  <strong className="text-slate-200">₹{receiptData?.remainingBalance.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Payment Mode:</span>
                  <strong className="text-amber-400">{receiptData?.paymentMethod}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Time:</span>
                  <strong className="text-slate-300">{receiptData?.transactionDate}</strong>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/20 text-emerald-300 border border-emerald-900/30 rounded-xl text-xs">
                📲 Booking confirmation sent via SMS & WhatsApp to <strong>9173746558</strong>!
              </div>

              <button
                onClick={onClose}
                className="w-full py-3.5 bg-amber-500 text-slate-950 font-bold rounded-2xl text-xs"
              >
                View Confirmed Booking & Invoice
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
