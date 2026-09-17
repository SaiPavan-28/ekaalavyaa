import React, { useState } from 'react';
import { portalService } from '../../services/portalService';
import { useToast } from '../../context/ToastContext';
import { ApplicationRecord, OpportunityStage } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ApplicationTracker } from '../../components/common/ApplicationTracker';
import { Modal } from '../../components/common/Modal';
import { Compass, CheckSquare, MessageSquare, Award, Clock } from 'lucide-react';

export const MentorApplications: React.FC = () => {
  const { showToast } = useToast();
  const [applications, setApplications] = useState<ApplicationRecord[]>(() =>
    portalService.getApplications()
  );
  const [editingApp, setEditingApp] = useState<ApplicationRecord | null>(null);
  const [mentorNotes, setMentorNotes] = useState('');

  const handleStageChange = (appId: string, newStage: OpportunityStage) => {
    const updated = portalService.updateApplicationStage(appId, newStage);
    setApplications(updated);
    showToast('Stage Updated', `Application moved to ${newStage.replace('_', ' ').toUpperCase()}`);
  };

  const handleSaveNotes = () => {
    if (!editingApp) return;
    const updated = portalService.updateApplicationMentorNotes(editingApp.id, mentorNotes);
    setApplications(updated);
    setEditingApp(null);
    showToast('Mentor Review Saved', 'Your review feedback was dispatched to the scholar.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Fellowship & University Applications Review</h1>
          <p className="text-xs text-[#57534E] mt-1">
            Review scholar draft dossiers, endorse admission submissions, and update guidance stages.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {applications.map((app) => (
          <Card key={app.id} className="p-6 border-[#E0D7C6]">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#EAE2D2]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="terracotta" size="sm">{app.type}</Badge>
                  <Badge variant="stone" size="sm">Scholar: Arjun Das</Badge>
                </div>
                <h3 className="text-lg font-bold font-serif text-[#1C1917]">
                  {app.opportunityName}
                </h3>
                <p className="text-xs text-[#78716C] mt-0.5">{app.institution}</p>
              </div>

              <div className="text-left md:text-right">
                <span className="text-[11px] text-[#78716C] block">Filing Deadline</span>
                <strong className="text-xs font-bold text-[#1C1917]">{app.deadline}</strong>
                {app.interviewDate && (
                  <span className="block text-xs font-bold text-[#B84A22] mt-0.5">
                    Interview: {app.interviewDate}
                  </span>
                )}
              </div>
            </div>

            {/* Application Tracker */}
            <div className="my-4 py-2 px-3 rounded-xl bg-[#FAF8F3] border border-[#ECE5D8]">
              <span className="text-xs uppercase tracking-wider font-bold text-[#78716C] block mb-2">
                Advancement Pipeline (Click to modify scholar stage)
              </span>
              <ApplicationTracker
                currentStage={app.stage}
                onStageChange={(newStage) => handleStageChange(app.id, newStage)}
              />
            </div>

            {/* Checklist and Mentor Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#57534E] mb-2 flex items-center gap-1.5">
                  <CheckSquare className="w-3.5 h-3.5 text-[#B84A22]" />
                  <span>Scholar Checklist Verification</span>
                </h4>
                <div className="space-y-1.5 text-xs">
                  {app.checklist.map((item) => (
                    <div
                      key={item.id}
                      className={`p-2 rounded-lg border flex items-center justify-between ${
                        item.done ? 'bg-[#EAF2ED] border-[#C8DFCE] text-[#2D4A3E]' : 'bg-white border-[#E0D7C6] text-[#78716C]'
                      }`}
                    >
                      <span className={item.done ? 'font-medium' : ''}>{item.task}</span>
                      <span className="text-[10px] font-bold uppercase">{item.done ? 'Verified' : 'Pending'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#57534E] flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#2D4A3E]" />
                    <span>Mentor Guidance & Remarks</span>
                  </h4>
                  <button
                    onClick={() => {
                      setEditingApp(app);
                      setMentorNotes(app.assignedMentorNotes || '');
                    }}
                    className="text-xs text-[#B84A22] font-semibold hover:underline cursor-pointer"
                  >
                    Edit Guidance
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-[#FAF6EE] border border-[#E8E1D3] text-xs text-[#44403C] leading-relaxed">
                  <p className="italic">"{app.assignedMentorNotes || 'No guidance recorded yet.'}"</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Guidance Modal */}
      {editingApp && (
        <Modal
          isOpen={!!editingApp}
          onClose={() => setEditingApp(null)}
          title={`Mentor Guidance: ${editingApp.opportunityName}`}
          subtitle="Provide strategic advice for Statement of Purpose or interview preparation"
        >
          <div className="space-y-4">
            <textarea
              rows={4}
              value={mentorNotes}
              onChange={(e) => setMentorNotes(e.target.value)}
              className="w-full rounded-lg border border-[#D5CBB9] bg-white p-3 text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B84A22]"
            />
            <div className="flex justify-end gap-3 pt-3 border-t border-[#EAE2D2]">
              <Button variant="outline" size="sm" onClick={() => setEditingApp(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveNotes}>
                Save Guidance
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
