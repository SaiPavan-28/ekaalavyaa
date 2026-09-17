import React from 'react';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { SimpleBarChart, SimpleTrendLine } from '../../components/common/SimpleChart';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/common/Table';
import { TrendingUp, Users, Award, BarChart3, CheckCircle2 } from 'lucide-react';

export const TeacherAnalytics: React.FC = () => {
  const attendanceTrends = [
    { label: 'Week 1', value: 89 },
    { label: 'Week 2', value: 92 },
    { label: 'Week 3', value: 90.5 },
    { label: 'Week 4', value: 93.4 },
    { label: 'Week 5', value: 94.2 },
  ];

  const conceptualMastery = [
    { label: 'Newtonian Dynamics', value: 94, displayValue: '94%', color: '#2D4A3E' },
    { label: 'Rotational Motion', value: 78, displayValue: '78%', color: '#92400E' },
    { label: 'Electrostatics', value: 86, displayValue: '86%', color: '#B84A22' },
    { label: 'Thermodynamics', value: 82, displayValue: '82%', color: '#78716C' },
    { label: 'Wave Optics', value: 88, displayValue: '88%', color: '#57534E' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Class Academic Diagnostics & Learning Curves</h1>
        <p className="text-xs text-[#57534E] mt-1">
          Detailed metrics on student topic comprehension, attendance trends, and retention indices.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Syllabus Pacing"
          value="On Track"
          subtitle="Module 6 of 8 delivered"
          trend={{ value: '4 days ahead of schedule', isPositive: true }}
          icon={<Award className="w-5 h-5" />}
        />
        <StatCard
          label="Class Median Score"
          value="84.2%"
          subtitle="Physics Olympiad Stream"
          trend={{ value: '+5.1% over previous year', isPositive: true }}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <StatCard
          label="Pass / Mastery Index"
          value="96.4%"
          subtitle="Above 70% threshold"
          trend={{ value: 'Cohort High', isPositive: true }}
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-serif font-bold text-sm text-[#1C1917] mb-2">
            Weekly Batch Attendance Trend
          </h3>
          <p className="text-xs text-[#78716C] mb-4">Five-week consistency tracking across all lecture slots</p>
          <SimpleTrendLine data={attendanceTrends} height={140} />
        </Card>

        <Card className="p-6">
          <h3 className="font-serif font-bold text-sm text-[#1C1917] mb-2">
            Topic Conceptual Mastery Ratings
          </h3>
          <p className="text-xs text-[#78716C] mb-4">Average test scores on specific core physics sub-units</p>
          <SimpleBarChart data={conceptualMastery} maxValue={100} height={140} />
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-serif font-bold text-base text-[#1C1917] mb-3 pb-2 border-b border-[#EAE2D2]">
          Curriculum Intervention Recommendations
        </h3>
        <div className="space-y-3 text-xs text-[#44403C]">
          <div className="p-3 rounded-lg bg-[#FAF8F3] border border-[#ECE5D8] flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#B84A22] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">1</span>
            <div>
              <p className="font-bold text-[#1C1917]">Reinforce Rotational Dynamics & Moment of Inertia (78% mastery)</p>
              <p className="text-[#57534E] mt-0.5">Recommended 2 additional problem-solving workshops before mid-term evaluations.</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-[#FAF8F3] border border-[#ECE5D8] flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#2D4A3E] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">2</span>
            <div>
              <p className="font-bold text-[#1C1917]">Accelerate Advanced Problem Sets for Top 10 Scholars</p>
              <p className="text-[#57534E] mt-0.5">Top percentile scholars (Arjun Das, Priya Hansda, etc.) are ready for Irodov-level problems.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
