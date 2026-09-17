import React, { useState } from 'react';
import { Opportunity, OpportunityStage } from '../../types';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { ApplicationTracker } from './ApplicationTracker';
import { Bookmark, MapPin, Calendar, CheckCircle, ArrowUpRight, Award, Compass } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onApplyOrTrack?: (opp: Opportunity) => void;
  isSaved?: boolean;
  onToggleSave?: (oppId: string) => void;
  currentStage?: OpportunityStage;
  onStageChange?: (newStage: OpportunityStage) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onApplyOrTrack,
  isSaved = false,
  onToggleSave,
  currentStage,
  onStageChange,
}) => {
  const [showTracker, setShowTracker] = useState(!!currentStage);

  const typeVariant = {
    University: 'forest',
    Fellowship: 'terracotta',
    Scholarship: 'ochre',
    'Premier Entrance': 'stone',
  }[opportunity.type] as 'forest' | 'terracotta' | 'ochre' | 'stone';

  return (
    <Card
      accentBorder={opportunity.featured ? 'mustard' : 'none'}
      className="flex flex-col justify-between border-[#E2DAC9] bg-white transition-all duration-150 hover:border-[#BFAF98]"
    >
      <div>
        {/* Top badges & Save button */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={typeVariant} size="sm">
              {opportunity.type}
            </Badge>
            {opportunity.featured && (
              <Badge variant="mustard" size="sm" dot>
                High Fellowship Match
              </Badge>
            )}
          </div>
          <button
            type="button"
            onClick={() => onToggleSave && onToggleSave(opportunity.id)}
            className={`p-1.5 rounded-xs border transition-colors cursor-pointer ${
              isSaved
                ? 'bg-[#FDF2EE] border-[#F1D3C9] text-[#A8432B]'
                : 'border-[#E2DAC9] text-[#7C7467] hover:bg-[#FAF6EE] hover:text-[#1F1D1A]'
            }`}
            title={isSaved ? 'Remove from Saved' : 'Save opportunity'}
            aria-label="Save opportunity"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#A8432B]' : ''}`} />
          </button>
        </div>

        {/* Opportunity Name & Institution */}
        <h3 className="text-base font-bold text-[#1F1D1A] font-serif leading-snug tracking-tight">
          {opportunity.name}
        </h3>
        <p className="text-xs font-medium text-[#6E675D] flex items-center gap-1.5 mt-1">
          <Compass className="w-3.5 h-3.5 text-[#1B382B]" />
          <span>{opportunity.institution}</span>
        </p>

        {/* Location & Deadline Meta */}
        <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-[#F0EAE0] text-xs text-[#5E584E]">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#8C6D4F] flex-shrink-0" />
            <span className="truncate">{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#8C6D4F] flex-shrink-0" />
            <span className="truncate">Deadline: <strong className="text-[#1F1D1A]">{opportunity.deadline}</strong></span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-[#524C43] mt-3 leading-relaxed line-clamp-3">
          {opportunity.description}
        </p>

        {/* Eligibility & Benefits Highlights */}
        <div className="mt-3 p-3 rounded-xs bg-[#FAF6EE] border border-[#E5DECf] text-xs space-y-1.5">
          <div className="flex items-start gap-2 text-[#3D3831]">
            <CheckCircle className="w-3.5 h-3.5 text-[#1B382B] flex-shrink-0 mt-0.5" />
            <span className="text-[11px] leading-relaxed">
              <strong className="font-semibold text-[#1F1D1A]">Eligibility:</strong> {opportunity.eligibility}
            </span>
          </div>
          <div className="flex items-start gap-2 text-[#3D3831]">
            <Award className="w-3.5 h-3.5 text-[#A8432B] flex-shrink-0 mt-0.5" />
            <span className="text-[11px] leading-relaxed">
              <strong className="font-semibold text-[#1F1D1A]">Coverage:</strong> {opportunity.benefits}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {opportunity.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] uppercase font-semibold tracking-wider text-[#635C52] bg-[#F2ECE0] border border-[#E4DCCF] px-2 py-0.5 rounded-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Application Tracking Module */}
      <div className="mt-4 pt-3 border-t border-[#E8E1D3]">
        {currentStage ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#1F1D1A]">Application Milestone</span>
              <button
                type="button"
                onClick={() => setShowTracker(!showTracker)}
                className="text-xs text-[#A8432B] hover:underline cursor-pointer font-medium"
              >
                {showTracker ? 'Hide Tracker' : 'Show Progress'}
              </button>
            </div>
            {showTracker && (
              <ApplicationTracker
                currentStage={currentStage}
                onStageChange={onStageChange}
              />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-[#6E675D]">
              Fee: <strong className="text-[#1F1D1A]">{opportunity.applicationFee}</strong>
            </span>
            <div className="flex gap-2">
              {opportunity.websiteUrl && (
                <a
                  href={opportunity.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-medium text-[#6E675D] hover:text-[#1F1D1A] p-1.5 border border-[#D8CFBF] rounded-xs hover:bg-[#FAF6EE] transition-colors"
                  title="Official University Portal"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              <Button
                size="sm"
                variant="primary"
                onClick={() => onApplyOrTrack && onApplyOrTrack(opportunity)}
              >
                Start Journey
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
