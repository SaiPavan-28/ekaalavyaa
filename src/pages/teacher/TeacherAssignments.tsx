import React, { useState } from 'react';
import { portalService } from '../../services/portalService';
import { useToast } from '../../context/ToastContext';
import { Assignment } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import { Plus, FileText, CheckCircle2, MessageSquare, Award } from 'lucide-react';

export const TeacherAssignments: React.FC = () => {
  const { showToast } = useToast();
  const [assignments, setAssignments] = useState<Assignment[]>(() => portalService.getAssignments());
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New assignment form state
  const [title, setTitle] = useState('');
  const [courseTitle, setCourseTitle] = useState('PHY301: Advanced Classical Mechanics');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('2026-09-28');
  const [maxScore, setMaxScore] = useState(100);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newAsg = portalService.createAssignment({
      courseId: 'course-phy-1',
      title,
      courseTitle,
      description,
      dueDate,
      maxScore: Number(maxScore),
      status: 'pending',
      attachmentName: 'Problem_Set_Assigned.pdf',
    });
    setAssignments((prev) => [newAsg, ...prev]);
    setIsCreateOpen(false);
    setTitle('');
    setDescription('');
    showToast('Assignment Published', `"${title}" has been issued to scholars.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Assignments & Problem Sets</h1>
          <p className="text-xs text-[#57534E] mt-1">
            Issue analytical problem sheets, evaluate student derivations, and provide personalized feedback.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsCreateOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Issue New Assignment
        </Button>
      </div>

      <div className="space-y-4">
        {assignments.map((asg) => (
          <Card key={asg.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider bg-[#EFE8DC] px-2 py-0.5 rounded">
                    {asg.courseTitle}
                  </span>
                  <Badge variant={asg.status === 'graded' ? 'forest' : 'ochre'} size="sm">
                    {asg.status === 'graded' ? 'Evaluated' : 'Submissions Open'}
                  </Badge>
                </div>

                <h3 className="text-base font-bold font-serif text-[#1C1917] mt-1">
                  {asg.title}
                </h3>
                <p className="text-xs text-[#57534E] mt-2 leading-relaxed">
                  {asg.description}
                </p>

                {asg.teacherFeedback && (
                  <div className="mt-3 p-3 rounded-lg bg-[#FAF6EE] border border-[#E8E1D3] text-xs">
                    <span className="font-bold text-[#2D4A3E] block mb-1">Standard Feedback Provided:</span>
                    <p className="text-[#44403C] italic">"{asg.teacherFeedback}"</p>
                  </div>
                )}
              </div>

              <div className="text-left md:text-right flex flex-col justify-between self-stretch pt-3 md:pt-0 border-t md:border-t-0 border-[#EFE8DC]">
                <div>
                  <span className="text-[11px] text-[#78716C] block">Due Date</span>
                  <span className="text-xs font-bold text-[#1C1917]">{asg.dueDate}</span>
                  <span className="text-[11px] text-[#78716C] block mt-2">Maximum Marks: {asg.maxScore}</span>
                </div>
                <div className="pt-3">
                  <Button variant="outline" size="sm">
                    View Submissions (18)
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Issue Assignment Modal */}
      {isCreateOpen && (
        <Modal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title="Issue New Problem Sheet"
          subtitle="Publish assignment to enrolled batch scholars"
        >
          <form onSubmit={handleCreate} className="space-y-4">
            <Select
              label="Assigned Course"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              options={[
                'PHY301: Advanced Classical Mechanics',
                'MTH202: Real Analysis & Multivariable Calculus',
                'CHM105: Organic Reaction Mechanisms & Spectroscopy',
              ]}
            />

            <Input
              label="Assignment Title"
              placeholder="e.g. Lagrangian Mechanics Problem Sheet 4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1.5">
                Description & Instructions
              </label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Specify requirements, boundary equations, and submission guidelines..."
                className="w-full rounded-lg border border-[#D5CBB9] bg-white p-3 text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B84A22]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Due Date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
              <Input
                label="Max Score"
                type="number"
                value={maxScore}
                onChange={(e) => setMaxScore(Number(e.target.value))}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#EAE2D2]">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Publish Problem Sheet
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
