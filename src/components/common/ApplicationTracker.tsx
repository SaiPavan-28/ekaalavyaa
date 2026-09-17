import React from 'react';
import { OpportunityStage } from '../../types';
import { Check, Clock, Send, Award, XCircle } from 'lucide-react';

interface ApplicationTrackerProps {
  currentStage: OpportunityStage;
  onStageChange?: (stage: OpportunityStage) => void;
  readOnly?: boolean;
}

const STAGES: { key: OpportunityStage; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'interested', label: 'Interested', icon: Clock },
  { key: 'preparing', label: 'Preparing', icon: Clock },
  { key: 'applied', label: 'Applied', icon: Send },
  { key: 'offer_received', label: 'Offer Received', icon: Award },
];

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({
  currentStage,
  onStageChange,
  readOnly = false,
}) => {
  const isRejected = currentStage === 'not_selected';

  const getStageIndex = (stage: OpportunityStage): number => {
    switch (stage) {
      case 'interested':
        return 0;
      case 'preparing':
        return 1;
      case 'applied':
        return 2;
      case 'offer_received':
        return 3;
      case 'not_selected':
        return 2;
      default:
        return 0;
    }
  };

  const currentIndex = getStageIndex(currentStage);

  return (
    <div className="w-full py-2">
      <div className="relative flex items-center justify-between">
        {/* Progress connecting line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-[#E2DAC9] -z-0">
          <div
            className={`h-full transition-all duration-300 ${
              isRejected ? 'bg-[#991B1B]' : 'bg-[#A8432B]'
            }`}
            style={{
              width: `${(currentIndex / (STAGES.length - 1)) * 100}%`,
            }}
          />
        </div>

        {STAGES.map((stage, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex && !isRejected;
          const Icon = stage.icon;

          return (
            <div key={stage.key} className="relative z-10 flex flex-col items-center">
              <button
                type="button"
                disabled={readOnly}
                onClick={() => onStageChange && onStageChange(stage.key)}
                className={`w-8 h-8 rounded-xs flex items-center justify-center transition-all duration-150 border ${
                  readOnly ? 'cursor-default' : 'cursor-pointer'
                } ${
                  isDone
                    ? 'bg-[#1B382B] border-[#1B382B] text-[#FAF7F2]'
                    : isCurrent
                    ? 'bg-[#A8432B] border-[#A8432B] text-[#FAF7F2] shadow-xs'
                    : 'bg-white border-[#D5CBB8] text-[#7C7467]'
                }`}
                title={readOnly ? stage.label : `Change status to ${stage.label}`}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
              </button>
              <span
                className={`mt-1.5 text-[11px] text-center font-semibold whitespace-nowrap ${
                  isCurrent
                    ? 'text-[#A8432B]'
                    : isDone
                    ? 'text-[#1B382B]'
                    : 'text-[#7C7467]'
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Alternative stage toggle for Not Selected */}
      {!readOnly && onStageChange && (
        <div className="mt-3.5 pt-2.5 border-t border-[#F0EAE0] flex items-center justify-between text-xs text-[#6E675D]">
          <span>Current status: <strong className="text-[#1F1D1A] capitalize">{currentStage.replace('_', ' ')}</strong></span>
          <div className="flex gap-2">
            {currentStage !== 'not_selected' ? (
              <button
                type="button"
                onClick={() => onStageChange('not_selected')}
                className="text-[#991B1B] hover:text-[#7F1D1D] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5" />
                Mark Not Selected
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onStageChange('applied')}
                className="text-[#A8432B] hover:underline cursor-pointer"
              >
                Reopen as Applied
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
