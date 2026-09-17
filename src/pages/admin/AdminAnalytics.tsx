import React from 'react';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { SimpleBarChart, SimpleTrendLine } from '../../components/common/SimpleChart';
import { Award, TrendingUp, Users, GraduationCap, CheckCircle2 } from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const socioeconomicBreakdown = [
    { label: 'Scheduled Tribe (ST)', value: 58, displayValue: '58%', color: '#2D4A3E' },
    { label: 'Scheduled Caste (SC)', value: 24, displayValue: '24%', color: '#B84A22' },
    { label: 'OBC / Low-Income', value: 14, displayValue: '14%', color: '#92400E' },
    { label: 'First-Gen Learner', value: 4, displayValue: '4%', color: '#57534E' },
  ];

  const collegeOffersByDiscipline = [
    { label: 'Pure Sciences (IISc/IISER)', value: 44, displayValue: '44', color: '#2D4A3E' },
    { label: 'Liberal Arts & Policy', value: 38, displayValue: '38', color: '#B84A22' },
    { label: 'Engineering (IITs/NITs)', value: 52, displayValue: '52', color: '#92400E' },
    { label: 'Medicine & Health', value: 32, displayValue: '32', color: '#78716C' },
  ];

  const yearlyGrantsDisbursed = [
    { label: '2023', value: 1.2 },
    { label: '2024', value: 2.1 },
    { label: '2025', value: 3.4 },
    { label: '2026', value: 4.8 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Foundation Impact & Educational Outcomes</h1>
        <p className="text-xs text-[#57534E] mt-1">
          Measurable outcomes in socioeconomic equity, state-wide higher education access, and retention.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="First-Generation College Aspirants"
          value="92.4%"
          subtitle="Family members never attended university"
          trend={{ value: 'Transformative impact', isPositive: true }}
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard
          label="Average Fellowship Grant per Scholar"
          value="₹ 1,85,000"
          subtitle="Full residential, tuition, and food grant"
          icon={<Award className="w-5 h-5" />}
        />
        <StatCard
          label="College Acceptance Success Rate"
          value="91.2%"
          subtitle="Among students completing 2-year cohort"
          trend={{ value: '+4.2% YoY gain', isPositive: true }}
          icon={<GraduationCap className="w-5 h-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-serif font-bold text-base text-[#1C1917] mb-2">
            Socioeconomic Demographic Representation
          </h3>
          <p className="text-xs text-[#78716C] mb-4">Focus on underserved tribal and rural communities across Eastern India</p>
          <SimpleBarChart data={socioeconomicBreakdown} maxValue={70} height={140} />
        </Card>

        <Card className="p-6">
          <h3 className="font-serif font-bold text-base text-[#1C1917] mb-2">
            Offers Secured by Academic Discipline
          </h3>
          <p className="text-xs text-[#78716C] mb-4">Confirmed undergraduate seats for Class of 2026</p>
          <SimpleBarChart data={collegeOffersByDiscipline} maxValue={60} height={140} />
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-serif font-bold text-base text-[#1C1917] mb-2">
          Cumulative Fellowship Grant Funding Disbursed (in ₹ Crores)
        </h3>
        <p className="text-xs text-[#78716C] mb-4">Annual foundation philanthropic investment in rural scholar higher education</p>
        <SimpleTrendLine data={yearlyGrantsDisbursed} height={140} />
      </Card>
    </div>
  );
};
