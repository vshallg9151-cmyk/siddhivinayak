import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export default function AvailabilityCalendar({ selectedDate, onSelectDate }) {
  const [currentMonth, setCurrentMonth] = useState('August 2026');

  // Realistic mock availability dates matrix for August 2026
  const calendarDays = [
    { day: 1, status: 'booked', label: 'Booked' },
    { day: 2, status: 'booked', label: 'Booked' },
    { day: 3, status: 'pending', label: 'Pending' },
    { day: 4, status: 'available', label: 'Available' },
    { day: 5, status: 'available', label: 'Available' },
    { day: 6, status: 'available', label: 'Available' },
    { day: 7, status: 'available', label: 'Available' },
    { day: 8, status: 'available', label: 'Available' },
    { day: 9, status: 'booked', label: 'Booked' },
    { day: 10, status: 'booked', label: 'Booked' },
    { day: 11, status: 'available', label: 'Available' },
    { day: 12, status: 'available', label: 'Available' },
    { day: 13, status: 'available', label: 'Available' },
    { day: 14, status: 'available', label: 'Available' },
    { day: 15, status: 'pending', label: 'Pending' },
    { day: 16, status: 'available', label: 'Available' },
    { day: 17, status: 'available', label: 'Available' },
    { day: 18, status: 'available', label: 'Available' },
    { day: 19, status: 'available', label: 'Available' },
    { day: 20, status: 'available', label: 'Available' },
    { day: 21, status: 'booked', label: 'Booked' },
    { day: 22, status: 'booked', label: 'Booked' },
    { day: 23, status: 'available', label: 'Available' },
    { day: 24, status: 'available', label: 'Available' },
    { day: 25, status: 'available', label: 'Available' },
    { day: 26, status: 'available', label: 'Available' },
    { day: 27, status: 'available', label: 'Available' },
    { day: 28, status: 'available', label: 'Available' },
    { day: 29, status: 'pending', label: 'Pending' },
    { day: 30, status: 'available', label: 'Available' },
    { day: 31, status: 'available', label: 'Available' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
      
      {/* Calendar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
          <CalendarIcon className="w-4 h-4 text-brand-blue" />
          <span>Vehicle Availability Calendar</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <span>{currentMonth}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-around gap-2 p-2 bg-slate-50 rounded-2xl text-[11px] font-bold text-slate-700">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>Green: Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <span>Yellow: Pending</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span>Red: Booked</span>
        </div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1.5 text-center pt-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <span key={d} className="text-[10px] font-extrabold uppercase text-slate-400 pb-1">{d}</span>
        ))}

        {calendarDays.map((item) => {
          const isSelected = selectedDate && selectedDate.includes(`2026-08-${item.day < 10 ? '0' + item.day : item.day}`);
          
          return (
            <button
              key={item.day}
              type="button"
              disabled={item.status === 'booked'}
              onClick={() => {
                if (item.status !== 'booked') {
                  const dateStr = `2026-08-${item.day < 10 ? '0' + item.day : item.day}`;
                  onSelectDate(dateStr);
                }
              }}
              className={`p-2 rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center relative ${
                isSelected
                  ? 'bg-brand-navy text-brand-gold shadow-md ring-2 ring-brand-gold'
                  : item.status === 'available'
                  ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 cursor-pointer'
                  : item.status === 'pending'
                  ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 cursor-pointer'
                  : 'bg-rose-50 text-rose-300 opacity-60 cursor-not-allowed line-through'
              }`}
            >
              <span>{item.day}</span>
              <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                item.status === 'available' ? 'bg-emerald-500' : item.status === 'pending' ? 'bg-amber-400' : 'bg-rose-500'
              }`}></span>
            </button>
          );
        })}
      </div>

      <div className="text-[11px] text-slate-500 text-center font-medium pt-1">
        Click on any green date slot to pick your pickup date.
      </div>

    </div>
  );
}
