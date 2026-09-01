import React from 'react';
import { Check } from 'lucide-react';

export default function BookingStepper({ currentStep, steps, onStepClick }) {
  return (
    <div className="w-full bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm mb-8">
      <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-none">
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step Pill */}
              <button
                disabled={stepNum > currentStep}
                onClick={() => onStepClick && onStepClick(stepNum)}
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl transition-all shrink-0 ${
                  isCurrent
                    ? 'bg-brand-navy text-brand-gold font-extrabold shadow-md scale-105 border border-brand-gold/30'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-100 text-slate-400 font-semibold cursor-not-allowed'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  isCurrent
                    ? 'bg-brand-gold text-brand-navy'
                    : isCompleted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-300 text-slate-600'
                }`}>
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : stepNum}
                </div>
                <span className="text-xs whitespace-nowrap">{step.title}</span>
              </button>

              {/* Connecting Line */}
              {idx < steps.length - 1 && (
                <div className={`h-0.5 w-6 sm:w-10 shrink-0 mx-1 ${
                  stepNum < currentStep ? 'bg-emerald-500' : 'bg-slate-200'
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
