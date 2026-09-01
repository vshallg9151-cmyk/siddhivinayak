import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download, CheckCircle, Car, Shield, Building, PhoneCall, Mail } from 'lucide-react';
import { DISPLAY_PHONE } from '../../utils/whatsappHelper';

export default function BookingInvoiceModal({ isOpen, onClose, booking }) {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    let text = `SIDDHIVINAYAK TOURS & TRAVELS - TAX INVOICE\n`;
    text += `Invoice No: INV-${booking.bookingId || '2026-001'}\n`;
    text += `Date: ${new Date().toLocaleDateString()}\n`;
    text += `Customer Name: ${booking.passengerName || 'Valued Customer'}\n`;
    text += `Item: ${booking.carName || booking.title || 'Tour Booking'}\n`;
    text += `Total Price: ₹${(booking.totalPrice || 12499).toLocaleString()}\n`;
    text += `Status: ${booking.status || 'CONFIRMED'}\n`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${booking.bookingId || '2026'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
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
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">Tax Invoice & Booking Voucher</h3>
                <p className="text-xs text-slate-400">Invoice ID: INV-SV-{booking.bookingId || '84878'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1 border border-slate-700"
              >
                <Download className="w-4 h-4 text-amber-400" /> Export
              </button>
              <button
                onClick={handlePrint}
                className="p-2 bg-amber-500 text-slate-950 hover:bg-amber-400 rounded-xl text-xs font-bold flex items-center gap-1"
              >
                <Printer className="w-4 h-4" /> Print PDF
              </button>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors ml-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Invoice Body */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar text-slate-100 bg-slate-950 font-sans">
            
            {/* Top Company & Customer Header */}
            <div className="flex flex-col sm:flex-row justify-between gap-6 border-b border-slate-800 pb-6">
              <div>
                <h2 className="text-xl font-black text-amber-400 tracking-tight">SIDDHIVINAYAK TOURS & TRAVELS</h2>
                <p className="text-xs text-slate-400 mt-1">Andheri West, Mumbai, Maharashtra 400053</p>
                <p className="text-xs text-slate-400">GSTIN: 27AAAAA0000A1Z5 • Regd. No: MH-2024-SV</p>
                <p className="text-xs text-slate-400">Support Hotline: {DISPLAY_PHONE}</p>
              </div>

              <div className="text-right sm:text-right">
                <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30 uppercase tracking-widest">
                  {booking.status || 'CONFIRMED'}
                </span>
                <p className="text-xs text-slate-400 mt-2">Date: <strong>{new Date().toLocaleDateString()}</strong></p>
                <p className="text-xs text-slate-400">Booking Code: <strong className="text-amber-400">{booking.bookingId || 'BK-2026'}</strong></p>
              </div>
            </div>

            {/* Passenger Details */}
            <div className="grid grid-cols-2 gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 text-xs">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Customer Details</p>
                <p className="font-bold text-slate-100 mt-1">{booking.passengerName || 'Sachin Mishra'}</p>
                <p className="text-slate-400">{booking.phone || '9173746558'}</p>
                <p className="text-slate-400">{booking.email || 'customer@example.com'}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Service Category</p>
                <p className="font-bold text-slate-100 mt-1">{booking.carName || booking.title || 'Innova Crysta Rental'}</p>
                <p className="text-slate-400">Dates: {booking.travelDates || 'Aug 15 - Aug 18, 2026'}</p>
                <p className="text-slate-400">Pickup: {booking.city || 'Mumbai'}</p>
              </div>
            </div>

            {/* Itemized Table */}
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-800">
                  <th className="p-3">Description</th>
                  <th className="p-3 text-center">Qty / Days</th>
                  <th className="p-3 text-right">Rate</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="p-3 font-semibold text-slate-200">{booking.carName || booking.title || 'Tour Package Booking'}</td>
                  <td className="p-3 text-center">{booking.days || 3}</td>
                  <td className="p-3 text-right">₹{Math.round((booking.totalPrice || 12499) * 0.85 / (booking.days || 3)).toLocaleString()}</td>
                  <td className="p-3 text-right font-bold">₹{Math.round((booking.totalPrice || 12499) * 0.85).toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-200">GST (5% CGST + SGST)</td>
                  <td className="p-3 text-center">1</td>
                  <td className="p-3 text-right">5%</td>
                  <td className="p-3 text-right font-bold">₹{Math.round((booking.totalPrice || 12499) * 0.05).toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-200">24x7 Roadside Emergency Insurance</td>
                  <td className="p-3 text-center">1</td>
                  <td className="p-3 text-right">Included</td>
                  <td className="p-3 text-right font-bold text-emerald-400">FREE</td>
                </tr>
              </tbody>
            </table>

            {/* Total Footer */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex justify-between items-center text-sm">
              <span className="font-bold text-slate-300">Net Payable Total</span>
              <span className="text-2xl font-black text-amber-400">₹{(booking.totalPrice || 12499).toLocaleString()}</span>
            </div>

            <div className="text-[10px] text-slate-500 text-center leading-relaxed">
              This is a computer-generated tax invoice and requires no signature. Thank you for traveling with Siddhivinayak Tours & Travels!
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
