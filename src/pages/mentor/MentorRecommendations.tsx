import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Award, FileText, CheckCircle2, PenTool, ExternalLink } from 'lucide-react';

interface RecommendationRequest {
  id: string;
  studentName: string;
  rollNumber: string;
  institution: string;
  program: string;
  deadline: string;
  status: 'draft' | 'submitted' | 'requested';
  letterText: string;
}

export const MentorRecommendations: React.FC = () => {
  const { showToast } = useToast();
  const [requests, setRequests] = useState<RecommendationRequest[]>([
    {
      id: 'rec-1',
      studentName: 'Arjun Das',
      rollNumber: 'EF-2026-JH-014',
      institution: 'Indian Institute of Science (IISc)',
      program: 'BS Research in Physical Sciences',
      deadline: '2026-10-15',
      status: 'submitted',
      letterText: 'It is my distinct academic honor to recommend Arjun Das for the Bachelor of Science (Research) program at the Indian Institute of Science. Having observed Arjun’s intellectual maturity across advanced classical mechanics and multivariable calculus, I rank him in the top 1% of rural STEM aspirants in Eastern India. His rigorous problem-solving intuition and perseverance make him an exceptional research scholar candidate.',
    },
    {
      id: 'rec-2',
      studentName: 'Priya Hansda',
      rollNumber: 'EF-2026-JH-029',
      institution: 'Ashoka University',
      program: 'B.A. (Hons.) Economics & Mathematics',
      deadline: '2026-10-25',
      status: 'requested',
      letterText: 'I write to endorse Priya Hansda for admission to Ashoka University with full need-based financial grant. Priya has demonstrated profound analytical depth in macroeconomics and rural supply chain modeling.',
    },
    {
      id: 'rec-3',
      studentName: 'Kunal Soren',
      rollNumber: 'EF-2026-OD-088',
      institution: 'Azim Premji University',
      program: 'B.Sc. in Life Sciences & Ecology',
      deadline: '2026-11-05',
      status: 'draft',
      letterText: 'Drafting in progress...',
    },
  ]);

  const [activeLetter, setActiveLetter] = useState<RecommendationRequest | null>(null);

  const handleSignAndSubmit = () => {
    if (!activeLetter) return;
    setRequests((prev) =>
      prev.map((r) => (r.id === activeLetter.id ? { ...r, status: 'submitted' } : r))
    );
    showToast('Endorsement Letter Dispatched', `Institutional letter submitted to ${activeLetter.institution}.`);
    setActiveLetter(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Institutional Recommendation Letters</h1>
          <p className="text-xs text-[#57534E] mt-1">
            Author and endorse official Ekalavya Foundation Letters of Recommendation (LoR).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <Card key={req.id} className="flex flex-col justify-between p-6">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant={req.status === 'submitted' ? 'forest' : req.status === 'requested' ? 'terracotta' : 'stone'} size="sm">
                  {req.status === 'submitted' ? 'Submitted & Signed' : req.status === 'requested' ? 'Action Required' : 'Draft'}
                </Badge>
                <span className="text-[11px] text-[#78716C]">Due {req.deadline}</span>
              </div>

              <h3 className="text-base font-bold font-serif text-[#1C1917] mt-1">
                {req.studentName}
              </h3>
              <p className="text-xs text-[#78716C]">{req.rollNumber}</p>

              <div className="mt-4 p-3 rounded-lg bg-[#FAF8F3] border border-[#ECE5D8] space-y-1 text-xs">
                <div>
                  <span className="text-[#78716C] block">Institution:</span>
                  <strong className="text-[#1C1917]">{req.institution}</strong>
                </div>
                <div>
                  <span className="text-[#78716C] block">Program:</span>
                  <span className="text-[#57534E]">{req.program}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#EAE2D2] flex justify-end">
              <Button
                variant={req.status === 'submitted' ? 'outline' : 'primary'}
                size="sm"
                onClick={() => setActiveLetter(req)}
                leftIcon={<PenTool className="w-3.5 h-3.5" />}
              >
                {req.status === 'submitted' ? 'View Letter' : 'Review & Sign'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Letter Modal */}
      {activeLetter && (
        <Modal
          isOpen={!!activeLetter}
          onClose={() => setActiveLetter(null)}
          title={`Letter of Recommendation: ${activeLetter.studentName}`}
          subtitle={`For ${activeLetter.institution} (${activeLetter.program})`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#FAF8F3] border border-[#ECE5D8] text-xs leading-relaxed text-[#1C1917] font-serif whitespace-pre-wrap">
              {activeLetter.letterText}
            </div>

            <div className="p-3 rounded-lg bg-[#FAF6EE] border border-[#E8E1D3] text-xs text-[#57534E]">
              Signed officially by: <strong>Prof. Rajeshwari Sen, Advisory Mentor & Dean of Higher Ed, Ekalavya Foundation</strong>.
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#EAE2D2]">
              <Button variant="outline" size="sm" onClick={() => setActiveLetter(null)}>
                Close
              </Button>
              {activeLetter.status !== 'submitted' && (
                <Button variant="primary" size="sm" onClick={handleSignAndSubmit}>
                  Sign & Submit Letter
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
