import React, { useState } from 'react';
import { portalService } from '../../services/portalService';
import { useToast } from '../../context/ToastContext';
import { MentoringSession } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Calendar, Clock, Plus, Video, MapPin, CheckCircle2 } from 'lucide-react';

export const MentorSessions: React.FC = () => {
  const { showToast } = useToast();
  const [sessions, setSessions] = useState(() => portalService.getMentoringSessions());
  const mentees = portalService.getMentees();
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  // Schedule modal form state
  const [studentId, setStudentId] = useState(mentees[0].id);
  const [date, setDate] = useState('2026-09-29');
  const [time, setTime] = useState('04:30 PM');
  const [agenda, setAgenda] = useState('Statement of Purpose Review & Fellowship Strategy');
  const [mode, setMode] = useState<'In-Person' | 'Online Video'>('In-Person');
  const [notes, setNotes] = useState('');

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const student = mentees.find((m) => m.id === studentId);
    const newSession = portalService.createMentoringSession({
      studentId,
      studentName: student?.name || 'Scholar',
      mentorName: 'Prof. Rajeshwari Sen',
      date,
      time,
      agenda,
      status: 'upcoming',
      mode,
      notes,
    });
    setSessions((prev) => [newSession, ...prev]);
    setIsScheduleOpen(false);
    showToast('Clinic Scheduled', `Advisory session scheduled with ${student?.name} for ${date}.`);
  };

  const handleCompleteSession = (id: string) => {
    const updated = portalService.completeMentoringSession(id, 'Session conducted. Action points recorded.');
    setSessions(updated);
    showToast('Session Logged', 'Marked clinic as completed.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Higher Education Advisory Clinics</h1>
          <p className="text-xs text-[#57534E] mt-1">
            Conduct 1-on-1 consultations for university admissions, SOP reviews, and fellowship interviews.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsScheduleOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Schedule Advisory Session
        </Button>
      </div>

      <div className="space-y-4">
        {sessions.map((s) => (
          <Card key={s.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider bg-[#EFE8DC] px-2.5 py-0.5 rounded">
                    {s.mode}
                  </span>
                  <Badge variant={s.status === 'upcoming' ? 'ochre' : 'forest'} size="sm">
                    {s.status === 'upcoming' ? 'Scheduled' : 'Completed'}
                  </Badge>
                </div>

                <h3 className="text-base font-bold font-serif text-[#1C1917]">
                  {s.agenda}
                </h3>
                <p className="text-xs text-[#78716C] mt-1">
                  Scholar: <strong>{s.studentName}</strong> • Mentor: {s.mentorName}
                </p>

                {s.notes && (
                  <p className="mt-3 p-3 rounded-lg bg-[#FAF8F3] border border-[#ECE5D8] text-xs text-[#57534E]">
                    <strong>Preparation Notes:</strong> {s.notes}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start md:items-end justify-between self-stretch gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-[#EFE8DC]">
                <div className="text-left md:text-right">
                  <span className="text-xs font-bold text-[#1C1917] block">{s.date}</span>
                  <span className="text-xs text-[#78716C]">{s.time}</span>
                </div>

                {s.status === 'upcoming' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCompleteSession(s.id)}
                    leftIcon={<CheckCircle2 className="w-4 h-4" />}
                  >
                    Mark Conducted
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Schedule Clinic Modal */}
      {isScheduleOpen && (
        <Modal
          isOpen={isScheduleOpen}
          onClose={() => setIsScheduleOpen(false)}
          title="Schedule Advisory Clinic"
          subtitle="Set up 1-on-1 consultation session"
        >
          <form onSubmit={handleSchedule} className="space-y-4">
            <Select
              label="Scholar / Mentee"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              options={mentees.map((m) => ({ value: m.id, label: `${m.name} (${m.rollNumber})` }))}
            />

            <Input
              label="Session Agenda / Topic"
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              placeholder="e.g. Ashoka University Interview Mock Trial"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <Input
                label="Time Slot"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="04:30 PM"
                required
              />
            </div>

            <Select
              label="Session Mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as any)}
              options={['In-Person', 'Online Video']}
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1.5">
                Preparation Guidelines / Mentee Instructions
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Scholar should bring printed drafts of their SOP..."
                className="w-full rounded-lg border border-[#D5CBB9] bg-white p-3 text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B84A22]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#EAE2D2]">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsScheduleOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Schedule Session
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
