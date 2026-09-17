import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { portalService } from '../../services/portalService';
import { useToast } from '../../context/ToastContext';
import { ApplicationRecord, OpportunityStage } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ApplicationTracker } from '../../components/common/ApplicationTracker';
import {
  GraduationCap,
  CheckSquare,
  Compass,
  MessageSquare,
  Plus,
  Award,
} from 'lucide-react';

export const StudentApplications: React.FC = () => {
  const { showToast } = useToast();
  const [applications, setApplications] = useState<ApplicationRecord[]>(() =>
    portalService.getApplications()
  );
  const [stageFilter, setStageFilter] = useState<string>('all');

  const handleStageChange = (appId: string, newStage: OpportunityStage) => {
    const updated = portalService.updateApplicationStage(appId, newStage);
    setApplications(updated);
    showToast(
      'Application Updated',
      `Moved stage to: ${newStage.replace('_', ' ').toUpperCase()}`
    );
  };

  const handleToggleChecklist = (appId: string, taskId: string) => {
    const updated = portalService.toggleApplicationChecklist(appId, taskId);
    setApplications(updated);
  };

  const filteredApps = stageFilter === 'all'
    ? applications
    : applications.filter((a) => a.stage === stageFilter);

  const stageCounts = {
    all: applications.length,
    interested: applications.filter((a) => a.stage === 'interested').length,
    preparing: applications.filter((a) => a.stage === 'preparing').length,
    applied: applications.filter((a) => a.stage === 'applied').length,
    offer_received: applications.filter((a) => a.stage === 'offer_received').length,
    not_selected: applications.filter((a) => a.stage === 'not_selected').length,
  };

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#E2DAC9]">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#8C6D4F] block mb-1">
            Higher Education Admissions Directorate
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#1F1D1A] tracking-tight">
            Scholar Applications & Fellowship Tracker
          </h1>
          <p className="text-xs sm:text-sm text-[#5E584E] mt-1.5 leading-relaxed">
            Monitor and advance your admissions milestones: Interested → Preparing → Applied → Offer Received.
          </p>
        </div>
        <Link to="/student/opportunities" className="flex-shrink-0">
          <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
            Explore Opportunities
          </Button>
        </Link>
      </div>

      {/* Stage Filter Buttons with Crisp Tailoring */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { key: 'all', label: 'All Applications' },
          { key: 'interested', label: 'Interested' },
          { key: 'preparing', label: 'Preparing' },
          { key: 'applied', label: 'Applied' },
          { key: 'offer_received', label: 'Offer Received' },
          { key: 'not_selected', label: 'Not Selected' },
        ].map((tab) => {
          const count = stageCounts[tab.key as keyof typeof stageCounts] || 0;
          const isActive = stageFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setStageFilter(tab.key)}
              className={`h-8.5 px-3 rounded-xs text-xs font-semibold flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#1B382B] text-[#FAF7F2]'
                  : 'bg-white border border-[#D5CBB8] text-[#5E584E] hover:bg-[#FAF6EE] hover:text-[#1F1D1A]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-xs ${
                  isActive ? 'bg-white/20 text-[#FAF7F2]' : 'bg-[#EFE8DC] text-[#7C7467]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Applications List */}
      <div className="space-y-6">
        {filteredApps.map((app) => {
          const isOffer = app.stage === 'offer_received';
          const completedChecklist = app.checklist.filter((c) => c.done).length;
          const totalChecklist = app.checklist.length;

          return (
            <Card
              key={app.id}
              accentBorder={isOffer ? 'forest' : 'none'}
              className="p-5 sm:p-6 bg-white border-[#E2DAC9]"
            >
              {/* Top Banner with Title & Stage Badge */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#EDE6D8]">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D4F] bg-[#FAF6EE] border border-[#E5DECf] px-2 py-0.5 rounded-xs">
                      {app.type}
                    </span>
                    {isOffer && (
                      <Badge variant="forest" size="sm" dot>
                        100% Full Need-Based Fellowship Confirmed
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1F1D1A] font-serif tracking-tight">
                    {app.opportunityName}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[#6E675D] flex items-center gap-1.5 mt-1">
                    <Compass className="w-3.5 h-3.5 text-[#1B382B]" />
                    <span>{app.institution}</span>
                  </p>
                </div>

                <div className="text-left md:text-right flex-shrink-0">
                  <span className="text-[11px] text-[#7C7467] block uppercase tracking-wider">Deadline</span>
                  <strong className="text-xs sm:text-sm font-bold text-[#1F1D1A]">{app.deadline}</strong>
                  {app.interviewDate && (
                    <span className="block text-xs font-semibold text-[#A8432B] mt-0.5">
                      Interview: {app.interviewDate}
                    </span>
                  )}
                </div>
              </div>

              {/* Visual Application Tracker component */}
              <div className="my-5 p-4 rounded-xs bg-[#FAF8F3] border border-[#E4DCCF]">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#7C7467] block mb-3">
                  Admissions Progression Milestone (Click stage to update)
                </span>
                <ApplicationTracker
                  currentStage={app.stage}
                  onStageChange={(newStage) => handleStageChange(app.id, newStage)}
                />
              </div>

              {/* 2-Column: Checklist & Mentor Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                {/* Checklist */}
                <div className="p-3.5 rounded-xs bg-white border border-[#E2DAC9]">
                  <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#F0EAE0]">
                    <span className="text-xs font-bold text-[#1F1D1A] flex items-center gap-1.5">
                      <CheckSquare className="w-3.5 h-3.5 text-[#1B382B]" />
                      Admissions Dossier Checklist
                    </span>
                    <span className="text-[11px] font-semibold text-[#6E675D]">
                      {completedChecklist}/{totalChecklist} Completed
                    </span>
                  </div>

                  <div className="space-y-2">
                    {app.checklist.map((item) => (
                      <label
                        key={item.id}
                        className="flex items-start gap-2.5 text-xs text-[#3D3831] cursor-pointer hover:text-[#1F1D1A]"
                      >
                        <input
                          type="checkbox"
                          checked={item.done}
                          onChange={() => handleToggleChecklist(app.id, item.id)}
                          className="mt-0.5 rounded-xs border-[#C5BBA7] text-[#1B382B] focus:ring-[#1B382B]"
                        />
                        <span className={item.done ? 'line-through text-[#8C8477]' : 'font-medium'}>
                          {item.task}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Mentor Notes */}
                <div className="p-3.5 rounded-xs bg-[#FAF6EE] border border-[#E2DAC9] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#E8E0D1]">
                      <span className="text-xs font-bold text-[#1F1D1A] flex items-center gap-1.5 font-serif">
                        <MessageSquare className="w-3.5 h-3.5 text-[#A8432B]" />
                        Advisory Mentor Remarks
                      </span>
                      <span className="text-[10px] text-[#7C7467] uppercase font-semibold tracking-wider">
                        Advisor Clinic
                      </span>
                    </div>
                    <p className="text-xs text-[#524C43] leading-relaxed italic font-serif">
                      "{app.assignedMentorNotes || 'Continue perfecting your Statement of Purpose draft. Highlight your first-generation journey and STEM olympiad projects.'}"
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#E8E0D1] flex items-center justify-between text-[11px] text-[#7C7467]">
                    <span>Advisor: <strong>Prof. Rajeshwari Sen</strong></span>
                    <span className="text-[#A8432B] font-semibold">Verified Review</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
