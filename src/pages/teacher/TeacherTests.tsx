import React, { useState } from 'react';
import { portalService } from '../../services/portalService';
import { useToast } from '../../context/ToastContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/common/Table';
import { Award, Plus, Calendar, Clock, CheckSquare } from 'lucide-react';

export const TeacherTests: React.FC = () => {
  const { showToast } = useToast();
  const [tests, setTests] = useState(() => portalService.getTests());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [courseTitle, setCourseTitle] = useState('PHY301: Advanced Classical Mechanics');
  const [scheduledDate, setScheduledDate] = useState('2026-10-10');
  const [durationMinutes, setDurationMinutes] = useState(180);
  const [totalMarks, setTotalMarks] = useState(300);
  const [difficulty, setDifficulty] = useState<'Standard' | 'Advanced' | 'Olympiad Level'>('Advanced');

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    const newTest = {
      id: `test-${Date.now()}`,
      title,
      courseTitle,
      scheduledDate,
      durationMinutes: Number(durationMinutes),
      totalMarks: Number(totalMarks),
      status: 'upcoming' as const,
      difficulty,
      topics: ['Full Syllabus Review', 'Analytical Problems'],
    };
    setTests((prev) => [newTest, ...prev]);
    setIsModalOpen(false);
    showToast('Mock Test Scheduled', `"${title}" has been scheduled for ${scheduledDate}.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Diagnostic & Mock Test Management</h1>
          <p className="text-xs text-[#57534E] mt-1">
            Conduct state-wide benchmarks, configure testing formats, and publish cohort percentiles.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Schedule Diagnostic Test
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Test Name</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Scheduled Date</TableHead>
            <TableHead>Duration & Marks</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tests.map((t) => (
            <TableRow key={t.id}>
              <TableCell className="font-bold text-[#1C1917]">
                {t.title}
              </TableCell>
              <TableCell className="text-xs text-[#57534E]">
                {t.courseTitle}
              </TableCell>
              <TableCell className="text-xs text-[#78716C]">
                {t.scheduledDate}
              </TableCell>
              <TableCell className="text-xs text-[#1C1917] font-medium">
                {t.durationMinutes} mins • {t.totalMarks} Marks
              </TableCell>
              <TableCell>
                <Badge variant={t.difficulty === 'Olympiad Level' ? 'terracotta' : 'stone'} size="sm">
                  {t.difficulty}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={t.status === 'upcoming' ? 'ochre' : 'forest'} size="sm">
                  {t.status === 'upcoming' ? 'Scheduled' : 'Evaluated'}
                </Badge>
              </TableCell>
              <TableCell>
                <button className="text-xs text-[#B84A22] font-semibold hover:underline cursor-pointer">
                  {t.status === 'upcoming' ? 'Edit Details' : 'View Scores'}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Schedule Test Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Schedule Diagnostic Test"
          subtitle="Configure format, marks, and duration"
        >
          <form onSubmit={handleCreateTest} className="space-y-4">
            <Select
              label="Subject / Discipline"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              options={[
                'PHY301: Advanced Classical Mechanics',
                'MTH202: Real Analysis & Multivariable Calculus',
                'CHM105: Organic Chemistry',
              ]}
            />

            <Input
              label="Test Title"
              placeholder="e.g. All-India Physics Benchmark Test 4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Date"
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                required
              />
              <Select
                label="Difficulty Level"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                options={['Standard', 'Advanced', 'Olympiad Level']}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Duration (minutes)"
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                required
              />
              <Input
                label="Total Marks"
                type="number"
                value={totalMarks}
                onChange={(e) => setTotalMarks(Number(e.target.value))}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#EAE2D2]">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Confirm & Schedule
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
