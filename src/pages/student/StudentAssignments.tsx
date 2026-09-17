import React, { useState } from 'react';
import { portalService } from '../../services/portalService';
import { useToast } from '../../context/ToastContext';
import { Assignment } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { FileText, CheckCircle2, Clock, Upload, MessageSquare } from 'lucide-react';

export const StudentAssignments: React.FC = () => {
  const { showToast } = useToast();
  const [assignments, setAssignments] = useState<Assignment[]>(() => portalService.getAssignments());
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const updated = portalService.submitAssignment(selectedAssignment.id, submissionNotes);
      setAssignments(updated);
      setIsSubmitting(false);
      setSelectedAssignment(null);
      setSubmissionNotes('');
      showToast('Assignment Submitted', `Your work for "${selectedAssignment.title}" was submitted to faculty.`);
    }, 400);
  };

  const statusBadge = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="terracotta" size="sm" dot>Pending Submission</Badge>;
      case 'submitted':
        return <Badge variant="ochre" size="sm" dot>Under Evaluation</Badge>;
      case 'graded':
        return <Badge variant="forest" size="sm" dot>Graded & Reviewed</Badge>;
      case 'late':
        return <Badge variant="danger" size="sm" dot>Late</Badge>;
      default:
        return <Badge variant="stone" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Assignments & Problem Sets</h1>
        <p className="text-xs text-[#57534E] mt-1">
          Complete calculus problem sets, laboratory analysis write-ups, and Statements of Purpose.
        </p>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((asg) => (
          <Card key={asg.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider bg-[#EFE8DC] px-2 py-0.5 rounded">
                    {asg.courseTitle}
                  </span>
                  {statusBadge(asg.status)}
                </div>

                <h3 className="text-base font-bold text-[#1C1917] font-serif">
                  {asg.title}
                </h3>
                <p className="text-xs text-[#57534E] mt-2 leading-relaxed">
                  {asg.description}
                </p>

                {asg.attachmentName && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F3] border border-[#E0D7C6] text-xs text-[#78716C]">
                    <FileText className="w-3.5 h-3.5 text-[#B84A22]" />
                    <span>Problem Sheet: <strong>{asg.attachmentName}</strong></span>
                  </div>
                )}

                {/* Feedback block if graded */}
                {asg.teacherFeedback && (
                  <div className="mt-4 p-3 rounded-lg bg-[#FAF6EE] border border-[#E8E1D3] text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[#2D4A3E] mb-1">
                      <MessageSquare className="w-3.5 h-3.5 text-[#2D4A3E]" />
                      <span>Faculty Feedback:</span>
                    </div>
                    <p className="text-[#44403C] italic">"{asg.teacherFeedback}"</p>
                  </div>
                )}
              </div>

              {/* Right metadata / Actions */}
              <div className="flex flex-col items-start md:items-end justify-between self-stretch gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-[#EFE8DC]">
                <div className="text-left md:text-right">
                  <span className="text-[11px] text-[#78716C] block">Due Date</span>
                  <span className="text-xs font-bold text-[#1C1917]">{asg.dueDate}</span>

                  <div className="mt-2">
                    <span className="text-[11px] text-[#78716C] block">Score</span>
                    <span className="text-sm font-bold text-[#1C1917]">
                      {asg.obtainedScore !== undefined ? `${asg.obtainedScore} / ${asg.maxScore}` : `Max: ${asg.maxScore}`}
                    </span>
                  </div>
                </div>

                {asg.status === 'pending' && (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => setSelectedAssignment(asg)}
                    leftIcon={<Upload className="w-4 h-4" />}
                  >
                    Submit Problem Set
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Submit Assignment Modal */}
      {selectedAssignment && (
        <Modal
          isOpen={!!selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
          title={`Submit: ${selectedAssignment.title}`}
          subtitle={selectedAssignment.courseTitle}
        >
          <form onSubmit={handleSubmitAssignment} className="space-y-4">
            <div className="p-3 rounded-lg bg-[#FAF8F3] border border-[#E8E1D3] text-xs text-[#57534E]">
              <p className="font-bold text-[#1C1917] mb-1">Submission Guidelines:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Include all step-by-step calculus workings and diagrams.</li>
                <li>State any physical constants and boundary assumptions clearly.</li>
              </ul>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1.5">
                Submission Notes & References
              </label>
              <textarea
                rows={4}
                required
                value={submissionNotes}
                onChange={(e) => setSubmissionNotes(e.target.value)}
                placeholder="State your answer summary, approach rationale, or upload drive link..."
                className="w-full rounded-lg border border-[#D5CBB9] bg-white p-3 text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B84A22]"
              />
            </div>

            <div className="p-4 border-2 border-dashed border-[#DDD4C3] rounded-xl text-center bg-[#FAF7F0]">
              <Upload className="w-6 h-6 mx-auto text-[#8C6D4F] mb-1" />
              <span className="text-xs font-semibold text-[#1C1917] block">Upload Hand-written Scan (PDF/Images)</span>
              <span className="text-[11px] text-[#78716C]">Simulated submission (transfers to faculty queue)</span>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#EAE2D2]">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedAssignment(null)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={isSubmitting}
              >
                Confirm Submission
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
