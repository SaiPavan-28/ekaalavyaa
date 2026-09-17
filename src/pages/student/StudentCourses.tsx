import React, { useState } from 'react';
import { portalService } from '../../services/portalService';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { BookOpen, User, Calendar, Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const StudentCourses: React.FC = () => {
  const courses = portalService.getCourses();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Core Physics', 'Mathematics', 'Chemistry', 'Humanities & Communication'];

  const filtered = selectedCategory === 'all'
    ? courses
    : courses.filter((c) => c.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Enrolled Academic Courses</h1>
          <p className="text-xs text-[#57534E] mt-1">
            Rigorous undergraduate preparatory and foundational modules with Ekalavya faculty.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-[#E2D9C8]">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#B84A22] text-white shadow-2xs'
                : 'bg-white border border-[#DDD4C3] text-[#57534E] hover:bg-[#F5EFE3]'
            }`}
          >
            {cat === 'all' ? 'All Disciplines' : cat}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((course) => (
          <Card key={course.id} className="flex flex-col justify-between p-6">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D4F] bg-[#EFE8DC] px-2.5 py-1 rounded">
                  {course.code}
                </span>
                <Badge variant="forest" size="sm">
                  {course.category}
                </Badge>
              </div>

              <h3 className="text-lg font-bold text-[#1C1917] font-serif mt-1">
                {course.title}
              </h3>
              <p className="text-xs text-[#57534E] mt-2 leading-relaxed">
                {course.description}
              </p>

              <div className="mt-4 p-3 rounded-lg bg-[#FAF8F3] border border-[#ECE5D8] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#44403C]">
                  <span className="flex items-center gap-1.5 text-[#78716C]">
                    <User className="w-3.5 h-3.5 text-[#B84A22]" /> Faculty:
                  </span>
                  <span className="font-bold text-[#1C1917]">{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between text-[#44403C]">
                  <span className="flex items-center gap-1.5 text-[#78716C]">
                    <Calendar className="w-3.5 h-3.5 text-[#B84A22]" /> Schedule:
                  </span>
                  <span>{course.days.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between text-[#44403C]">
                  <span className="flex items-center gap-1.5 text-[#78716C]">
                    <Clock className="w-3.5 h-3.5 text-[#B84A22]" /> Next Session:
                  </span>
                  <span className="font-semibold text-[#1C1917]">{course.nextSession}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs text-[#57534E] mb-1 font-medium">
                  <span>Syllabus Completion</span>
                  <span>{course.completedModules} of {course.modulesCount} Modules ({course.progress}%)</span>
                </div>
                <ProgressBar value={course.progress} showPercent={false} color="terracotta" />
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#EAE2D2] flex items-center justify-between text-xs">
              <span className="text-[#78716C]">{course.roomOrLink}</span>
              <Button variant="outline" size="sm">
                Course Syllabus
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
