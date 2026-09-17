import React from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { GraduationCap, Users, Calendar, Award } from 'lucide-react';

export const AdminCohorts: React.FC = () => {
  const cohorts = [
    {
      id: 'c-1',
      name: 'Class of 2026: STEM Olympiad & Research Alpha',
      stream: 'Pure Sciences, Mathematics & Engineering',
      studentCount: 320,
      centerFocus: 'Ranchi, Bhubaneswar, Dumka',
      avgAttendance: 93.4,
      targetAcceptanceGoal: '85% in Tier 1 Institutions',
      milestone: 'Phase 3: University Entrance Mock Season',
      completion: 72,
    },
    {
      id: 'c-2',
      name: 'Class of 2026: Medical & Life Sciences Vanguard',
      stream: 'Biology, Organic Chemistry & Community Health',
      studentCount: 260,
      centerFocus: 'Mayurbhanj, Khunti, Hazaribagh',
      avgAttendance: 90.8,
      targetAcceptanceGoal: 'Govt Medical Colleges & APU Life Sciences',
      milestone: 'Phase 3: National Mock Benchmarks',
      completion: 68,
    },
    {
      id: 'c-3',
      name: 'Class of 2026: Humanities, Law & Public Policy',
      stream: 'Economics, Constitutional Studies & Literature',
      studentCount: 180,
      centerFocus: 'Ranchi Learning Center Hub',
      avgAttendance: 94.2,
      targetAcceptanceGoal: 'Ashoka, TISS, NLUs & Azim Premji',
      milestone: 'Phase 4: Personal Statement & Interview Prep',
      completion: 82,
    },
    {
      id: 'c-4',
      name: 'Class of 2027: Foundation Discovery Cohort',
      stream: 'Grade 11 Interdisciplinary Bridge Course',
      studentCount: 80,
      centerFocus: 'All 6 Centers',
      avgAttendance: 91.0,
      targetAcceptanceGoal: '100% Transition to Advanced Tracks',
      milestone: 'Phase 1: Diagnostic Fundamentals',
      completion: 35,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif text-[#1C1917]">State-Wide Scholar Cohorts</h1>
        <p className="text-xs text-[#57534E] mt-1">
          Tracking progression across multi-year academic tracks and admission target cycles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cohorts.map((cohort) => (
          <Card key={cohort.id} className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant="terracotta" size="sm">
                  {cohort.stream}
                </Badge>
                <span className="text-xs font-bold text-[#1C1917]">{cohort.studentCount} Scholars</span>
              </div>

              <h3 className="text-lg font-bold font-serif text-[#1C1917] mt-1">
                {cohort.name}
              </h3>
              <p className="text-xs text-[#78716C] mt-1">
                Centers: {cohort.centerFocus}
              </p>

              <div className="mt-4 p-3.5 rounded-xl bg-[#FAF8F3] border border-[#ECE5D8] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Current Milestone:</span>
                  <strong className="text-[#B84A22]">{cohort.milestone}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Average Attendance:</span>
                  <strong className="text-[#2D4A3E]">{cohort.avgAttendance}%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Admission Target:</span>
                  <span className="font-semibold text-[#57534E]">{cohort.targetAcceptanceGoal}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs text-[#57534E] mb-1 font-medium">
                  <span>Cycle Progress</span>
                  <span>{cohort.completion}%</span>
                </div>
                <ProgressBar value={cohort.completion} showPercent={false} color="terracotta" />
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#EAE2D2] flex justify-end">
              <Button variant="outline" size="sm">
                View Cohort Roster & Analytics
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
