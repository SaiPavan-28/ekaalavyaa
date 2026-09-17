import React from 'react';
import { portalService } from '../../services/portalService';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { SimpleTrendLine, SimpleBarChart } from '../../components/common/SimpleChart';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/common/Table';
import { Award, TrendingUp, BarChart2, CheckCircle2 } from 'lucide-react';

export const StudentResults: React.FC = () => {
  const tests = portalService.getTests().filter((t) => t.status === 'graded');
  const profile = portalService.getStudentProfile();

  const scoreTrends = [
    { label: 'Diagnostic 1', value: 78 },
    { label: 'Mid-Sem 1', value: 83 },
    { label: 'Diagnostic 2', value: 88.3 },
    { label: 'Grand Mock 3', value: 90.6 },
  ];

  const percentileDistribution = [
    { label: 'Physics', value: 98.8, displayValue: '98.8%', color: '#B84A22' },
    { label: 'Math', value: 97.4, displayValue: '97.4%', color: '#2D4A3E' },
    { label: 'Chemistry', value: 94.2, displayValue: '94.2%', color: '#92400E' },
    { label: 'Analytical', value: 96.0, displayValue: '96.0%', color: '#78716C' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Academic Results & Percentile Analytics</h1>
        <p className="text-xs text-[#57534E] mt-1">
          Detailed performance breakdown across standardized mocks and state-level benchmarking examinations.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Cohort Standing"
          value="Rank 4"
          subtitle="Out of 340 State Scholars"
          trend={{ value: 'Top 1.2% Percentile', isPositive: true }}
          icon={<Award className="w-5 h-5" />}
        />
        <StatCard
          label="Grand Mock Average"
          value="89.4%"
          subtitle="Baseline Target: 75%+"
          trend={{ value: '+6.4% gain from Diagnostics', isPositive: true }}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <StatCard
          label="Research Admission Readiness"
          value="High"
          subtitle="Qualifies for IISc & IISER cutoffs"
          trend={{ value: 'IAT score probability: 94%', isPositive: true }}
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
      </div>

      {/* Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-serif font-bold text-sm text-[#1C1917] mb-2">
            Multi-Exam Score Trajectory
          </h3>
          <p className="text-xs text-[#78716C] mb-4">Cumulative weighted percentages across term assessments</p>
          <SimpleTrendLine data={scoreTrends} height={130} />
        </Card>

        <Card className="p-6">
          <h3 className="font-serif font-bold text-sm text-[#1C1917] mb-2">
            Discipline Percentile Breakdown
          </h3>
          <p className="text-xs text-[#78716C] mb-4">All-India mock percentile by subject category</p>
          <SimpleBarChart data={percentileDistribution} maxValue={100} height={130} />
        </Card>
      </div>

      {/* Results Detail Table */}
      <Card className="p-6">
        <h3 className="font-serif font-bold text-base text-[#1C1917] mb-4 pb-2 border-b border-[#EAE2D2]">
          Completed Examination Scorecard
        </h3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Marks Obtained</TableHead>
              <TableHead>Percentile</TableHead>
              <TableHead>Cohort Rank</TableHead>
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
                <TableCell className="font-bold text-[#1C1917]">
                  {t.obtainedMarks} / {t.totalMarks}
                </TableCell>
                <TableCell className="font-bold text-[#2D4A3E]">
                  {t.percentile} %ile
                </TableCell>
                <TableCell className="text-xs font-semibold text-[#8C6D4F]">
                  Rank {t.rank} <span className="text-[#A8A29E] font-normal">of {t.totalStudents}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
