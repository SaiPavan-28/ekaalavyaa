import React from 'react';
import { Link } from 'react-router-dom';
import { portalService } from '../../services/portalService';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { SimpleBarChart } from '../../components/common/SimpleChart';
import {
  Users,
  Layers,
  Calendar,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  CheckSquare,
  Plus,
  BookOpen,
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const classes = portalService.getTeacherClasses();
  const studentsAtRisk = portalService.getStudentsRequiringAttention();

  const totalStudents = classes.reduce((sum, c) => sum + c.totalStudents, 0);

  const cohortScoreDistribution = [
    { label: '90%+', value: 28, displayValue: '28 std', color: '#1B382B' },
    { label: '80-89%', value: 54, displayValue: '54 std', color: '#A8432B' },
    { label: '70-79%', value: 24, displayValue: '24 std', color: '#C58F2C' },
    { label: '< 70%', value: 9, displayValue: '9 std', color: '#991B1B' },
  ];

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#E2DAC9]">
        <div>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-[#8C6D4F]">
            Academic Faculty Directorate // STEM
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#1F1D1A] mt-1 tracking-tight">
            Dr. Vandana Sharma (Senior Physics Faculty)
          </h1>
          <p className="text-xs sm:text-sm text-[#5E584E] mt-1">
            Bhubaneswar Academic Hub • All-India STEM Olympiad & Premier Admissions Track
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <Link to="/teacher/attendance">
            <Button variant="primary" size="md" leftIcon={<Calendar className="w-4 h-4" />}>
              Roll Call Register
            </Button>
          </Link>
          <Link to="/teacher/assignments">
            <Button variant="outline" size="md" leftIcon={<Plus className="w-4 h-4" />}>
              Issue Problem Set
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          accent="forest"
          label="Assigned Batches"
          value={classes.length}
          subtitle="Alpha Cohort & Grade 11-12"
          icon={<Layers className="w-5 h-5 text-[#1B382B]" />}
        />
        <StatCard
          accent="terracotta"
          label="Total Scholars"
          value={totalStudents}
          subtitle="Across 3 lecture batches"
          icon={<Users className="w-5 h-5 text-[#A8432B]" />}
        />
        <StatCard
          accent="mustard"
          label="Average Attendance"
          value="91.5%"
          subtitle="Cohort benchmark: 85%+"
          trend={{ value: '+1.8% compliance', isPositive: true }}
          icon={<Calendar className="w-5 h-5 text-[#C58F2C]" />}
        />
        <StatCard
          label="Intervention Alerts"
          value={studentsAtRisk.length}
          subtitle="Scholars needing support"
          trend={{ value: 'Action required', neutral: false, isPositive: false }}
          icon={<AlertTriangle className="w-5 h-5 text-[#991B1B]" />}
        />
      </div>

      {/* 2-Column Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left 7 Cols: Class Batches & Score Distribution */}
        <div className="lg:col-span-7 space-y-7">
          {/* Active Classes Card */}
          <Card accentBorder="forest" className="p-5 sm:p-6 bg-white border-[#E2DAC9]">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#EDE6D8]">
              <div>
                <h2 className="font-serif font-bold text-base sm:text-lg text-[#1F1D1A]">
                  Active Teaching Batches
                </h2>
                <p className="text-xs text-[#6E675D] mt-0.5">
                  Assigned curriculum modules, schedules, and attendance metrics
                </p>
              </div>
              <Link to="/teacher/classes" className="text-xs font-semibold text-[#A8432B] hover:underline">
                View All Batches
              </Link>
            </div>

            <div className="space-y-3.5">
              {classes.map((cls) => (
                <div
                  key={cls.id}
                  className="p-4 rounded-xs border border-[#E2DAC9] bg-[#FAF8F3] hover:border-[#BFAF98] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="stone" size="sm">
                          {cls.batch}
                        </Badge>
                        <span className="text-xs text-[#7C7467]">Room: {cls.room}</span>
                      </div>
                      <h3 className="font-serif font-bold text-base text-[#1F1D1A]">
                        {cls.name}
                      </h3>
                      <p className="text-xs text-[#5E584E] mt-0.5">
                        Subject: <strong className="text-[#1F1D1A]">{cls.subject}</strong>
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-1">
                      <span className="text-xs text-[#7C7467]">
                        {cls.totalStudents} Enrolled
                      </span>
                      <span className="text-xs font-bold text-[#1B382B] bg-[#EBF3EE] px-2 py-0.5 rounded-xs border border-[#C2D9CD]">
                        {cls.averageAttendance}% Attendance
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#EDE6D8] flex items-center justify-between text-xs">
                    <span className="text-[#6E675D]">Schedule: <strong>{cls.schedule}</strong></span>
                    <Link
                      to="/teacher/attendance"
                      className="font-semibold text-[#A8432B] hover:underline flex items-center gap-1"
                    >
                      Roll Call <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Academic Benchmark Distribution Chart */}
          <Card className="p-5 sm:p-6 bg-white border-[#E2DAC9]">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#EDE6D8]">
              <div>
                <h2 className="font-serif font-bold text-base sm:text-lg text-[#1F1D1A] flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#1B382B]" />
                  <span>State Benchmark Score Distribution</span>
                </h2>
                <p className="text-xs text-[#6E675D] mt-0.5">
                  115 scholars across Physics & Advanced Mechanics
                </p>
              </div>
              <Badge variant="forest" size="sm">
                Session 2025–26
              </Badge>
            </div>

            <SimpleBarChart items={cohortScoreDistribution} height={140} />
          </Card>
        </div>

        {/* Right 5 Cols: Scholars Requiring Intervention & Quick Desk */}
        <div className="lg:col-span-5 space-y-7">
          {/* Priority Support Needed */}
          <Card accentBorder="terracotta" className="p-5 sm:p-6 bg-[#FAF6EE] border-[#E2DAC9]">
            <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-[#EDE6D8]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#A8432B]" />
                <h3 className="font-serif font-bold text-sm sm:text-base text-[#1F1D1A]">
                  Scholars Needing Faculty Review
                </h3>
              </div>
              <Badge variant="terracotta" size="sm">
                {studentsAtRisk.length} Alerts
              </Badge>
            </div>

            <div className="space-y-3">
              {studentsAtRisk.map((st) => (
                <div
                  key={st.studentId}
                  className="p-3 rounded-xs border border-[#E2DAC9] bg-white text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1F1D1A] font-serif">{st.name}</span>
                    <span className="text-[10px] uppercase font-bold text-[#A8432B]">
                      {st.riskFactor}
                    </span>
                  </div>
                  <p className="text-[#5E584E] text-[11px] leading-relaxed">
                    Action: {st.actionTaken}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px] text-[#7C7467]">
                    <span>Attendance: <strong className="text-[#991B1B]">{st.attendance}%</strong> • Test: <strong>{st.recentTestScore}%</strong></span>
                    <Link
                      to="/teacher/students"
                      className="text-[#A8432B] font-semibold hover:underline"
                    >
                      Open Student Dossier →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Faculty Actions */}
          <Card className="p-5 sm:p-6 bg-white border-[#E2DAC9]">
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#1F1D1A] mb-3">
              Faculty Desk Shortcuts
            </h3>
            <div className="space-y-2">
              <Link
                to="/teacher/assignments"
                className="flex items-center justify-between p-3 rounded-xs border border-[#E2DAC9] bg-[#FAF8F3] hover:bg-[#FAF3E5] hover:border-[#C4B79E] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CheckSquare className="w-4 h-4 text-[#1B382B]" />
                  <div>
                    <span className="text-xs font-bold text-[#1F1D1A] block">Evaluate Problem Sets</span>
                    <span className="text-[11px] text-[#7C7467]">14 submissions pending grading</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#8C6D4F]" />
              </Link>

              <Link
                to="/teacher/tests"
                className="flex items-center justify-between p-3 rounded-xs border border-[#E2DAC9] bg-[#FAF8F3] hover:bg-[#FAF3E5] hover:border-[#C4B79E] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-[#A8432B]" />
                  <div>
                    <span className="text-xs font-bold text-[#1F1D1A] block">Schedule Diagnostic Test</span>
                    <span className="text-[11px] text-[#7C7467]">Create questions & answer keys</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#8C6D4F]" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
