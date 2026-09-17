import React, { useState } from 'react';
import { portalService } from '../../services/portalService';
import { useToast } from '../../context/ToastContext';
import { StudentProfile } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import {
  Users,
  Award,
  GraduationCap,
  Calendar,
  Compass,
  CheckCircle2,
  FileText,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

export const MentorMentees: React.FC = () => {
  const { showToast } = useToast();
  const mentees = portalService.getMentees();
  const [selectedMentee, setSelectedMentee] = useState<StudentProfile | null>(null);
  const [mentorNote, setMentorNote] = useState('');

  const handleSaveNote = () => {
    if (!selectedMentee) return;
    showToast('Guidance Note Recorded', `Added note to ${selectedMentee.name}'s academic dossier.`);
    setSelectedMentee(null);
    setMentorNote('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Mentee Academic & College Readiness Dossiers</h1>
          <p className="text-xs text-[#57534E] mt-1">
            Complete 360° profile view for guiding higher-education applications and fellowship interviews.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentees.map((m) => (
          <Card key={m.id} className="flex flex-col justify-between p-6">
            <div>
              <div className="flex items-start gap-3 mb-3">
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-[#D5CBB9]"
                />
                <div>
                  <h3 className="text-base font-bold font-serif text-[#1C1917]">{m.name}</h3>
                  <p className="text-xs text-[#78716C]">{m.rollNumber}</p>
                  <span className="text-[11px] font-semibold text-[#8C6D4F] block mt-0.5">
                    {m.stream}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#FAF8F3] border border-[#ECE5D8] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Academic Benchmark:</span>
                  <strong className="text-[#2D4A3E]">{m.academicPerformanceScore}%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Attendance:</span>
                  <strong className="text-[#1C1917]">{m.attendancePercentage}%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Center:</span>
                  <span className="text-[#57534E] truncate max-w-[140px]">{m.center}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Target Major:</span>
                  <span className="font-semibold text-[#B84A22]">{m.targetMajor}</span>
                </div>
              </div>

              <div className="mt-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] block mb-1">
                  Target Institutions
                </span>
                <div className="flex flex-wrap gap-1">
                  {m.dreamInstitutions.map((inst, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded bg-white border border-[#E0D7C6] text-[#44403C]"
                    >
                      {inst}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#EAE2D2] flex items-center justify-between">
              <span className="text-xs text-[#78716C]">{m.socioeconomicCategory}</span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedMentee(m);
                  setMentorNote('');
                }}
              >
                Open 360° Dossier
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Scholar 360 Dossier Modal */}
      {selectedMentee && (
        <Modal
          isOpen={!!selectedMentee}
          onClose={() => setSelectedMentee(null)}
          title={`Scholar Dossier: ${selectedMentee.name}`}
          subtitle={`${selectedMentee.rollNumber} • ${selectedMentee.stream}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5">
            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#FAF6EE] border border-[#E8E1D3] text-center">
              <div>
                <span className="text-[10px] text-[#78716C] uppercase block font-bold">Academic Bench</span>
                <span className="text-lg font-bold text-[#2D4A3E] font-serif">
                  {selectedMentee.academicPerformanceScore}%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#78716C] uppercase block font-bold">Attendance</span>
                <span className="text-lg font-bold text-[#1C1917] font-serif">
                  {selectedMentee.attendancePercentage}%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#78716C] uppercase block font-bold">Category</span>
                <span className="text-xs font-bold text-[#8C6D4F] block mt-1">
                  {selectedMentee.socioeconomicCategory}
                </span>
              </div>
            </div>

            {/* Academic Bio */}
            {selectedMentee.bio && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#57534E] mb-1">
                  Scholar Academic Statement
                </h4>
                <p className="text-xs text-[#44403C] p-3 rounded-lg bg-[#FAF8F3] border border-[#ECE5D8] leading-relaxed">
                  "{selectedMentee.bio}"
                </p>
              </div>
            )}

            {/* Achievements */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#57534E] mb-1.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#B84A22]" />
                <span>Verified Milestones & Honors</span>
              </h4>
              <div className="space-y-1.5">
                {selectedMentee.achievements.map((ach, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#2D4A3E]">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Guidance Note */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1.5">
                Add Mentorship Session / Prep Note
              </label>
              <textarea
                rows={3}
                value={mentorNote}
                onChange={(e) => setMentorNote(e.target.value)}
                placeholder="Log interview preparation progress, SOP edits, or fellowship recommendation feedback..."
                className="w-full rounded-lg border border-[#D5CBB9] bg-white p-3 text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B84A22]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#EAE2D2]">
              <Button variant="outline" size="sm" onClick={() => setSelectedMentee(null)}>
                Close
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveNote}>
                Log Guidance Note
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
