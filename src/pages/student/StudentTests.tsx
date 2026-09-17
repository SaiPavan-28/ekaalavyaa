import React from 'react';
import { portalService } from '../../services/portalService';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { CheckSquare, Calendar, Clock, Award, BookOpen } from 'lucide-react';

export const StudentTests: React.FC = () => {
  const tests = portalService.getTests();
  const upcomingTests = tests.filter((t) => t.status === 'upcoming');
  const pastTests = tests.filter((t) => t.status !== 'upcoming');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Diagnostic Assessments & Grand Mocks</h1>
        <p className="text-xs text-[#57534E] mt-1">
          Benchmarking tests simulated after JEE Advanced, IAT (IISER), CUET, and Ashoka Aptitude format.
        </p>
      </div>

      {/* Upcoming Tests Section */}
      <div>
        <h2 className="text-base font-bold font-serif text-[#1C1917] mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#B84A22]" />
          <span>Scheduled Upcoming Assessments</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingTests.map((test) => (
            <Card key={test.id} className="p-6 border-[#E0D7C6]">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider bg-[#EFE8DC] px-2.5 py-1 rounded">
                  {test.courseTitle}
                </span>
                <Badge variant="terracotta" size="sm">
                  {test.difficulty}
                </Badge>
              </div>

              <h3 className="text-base font-bold text-[#1C1917] font-serif mt-1">
                {test.title}
              </h3>

              <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-[#EAE2D2] text-xs">
                <div>
                  <span className="text-[#78716C] block">Scheduled Date</span>
                  <strong className="text-[#1C1917]">{test.scheduledDate}</strong>
                </div>
                <div>
                  <span className="text-[#78716C] block">Duration & Marks</span>
                  <strong className="text-[#1C1917]">{test.durationMinutes} mins • {test.totalMarks} Marks</strong>
                </div>
              </div>

              <div className="mt-3">
                <span className="text-[11px] text-[#78716C] block mb-1 font-semibold uppercase">Key Syllabus Topics</span>
                <div className="flex flex-wrap gap-1.5">
                  {test.topics.map((tp, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-[#FAF8F3] border border-[#E0D7C6] text-[#57534E]">
                      {tp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#EAE2D2] flex justify-end">
                <Button variant="outline" size="sm">
                  Download Test Instructions
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Tests Summary */}
      <div>
        <h2 className="text-base font-bold font-serif text-[#1C1917] mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-[#2D4A3E]" />
          <span>Recently Evaluated Tests</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pastTests.map((test) => (
            <Card key={test.id} className="p-6 bg-[#FAF8F3]">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider bg-[#EFE8DC] px-2 py-0.5 rounded">
                  {test.courseTitle}
                </span>
                <Badge variant="forest" size="sm">
                  Rank {test.rank} of {test.totalStudents}
                </Badge>
              </div>

              <h3 className="text-base font-bold text-[#1C1917] font-serif">
                {test.title}
              </h3>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-[#EAE2D2] text-xs">
                <div>
                  <span className="text-[#78716C] block">Obtained</span>
                  <strong className="text-sm font-bold text-[#1C1917]">{test.obtainedMarks} / {test.totalMarks}</strong>
                </div>
                <div>
                  <span className="text-[#78716C] block">Percentile</span>
                  <strong className="text-sm font-bold text-[#2D4A3E]">{test.percentile} %ile</strong>
                </div>
                <div>
                  <span className="text-[#78716C] block">Date</span>
                  <span className="text-xs font-medium text-[#57534E]">{test.scheduledDate}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
