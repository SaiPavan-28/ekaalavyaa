import React from 'react';
import { Link } from 'react-router-dom';
import { portalService } from '../../services/portalService';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import {
  GraduationCap,
  Calendar,
  CheckSquare,
  Award,
  ArrowRight,
  Clock,
  BookOpen,
  MessageSquare,
  FileText,
  Compass,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const profile = portalService.getStudentProfile();
  const courses = portalService.getCourses();
  const assignments = portalService.getAssignments();
  const tests = portalService.getTests();
  const applications = portalService.getApplications();
  const sessions = portalService.getMentoringSessions();

  const pendingAssignments = assignments.filter((a) => a.status === 'pending');
  const upcomingTests = tests.filter((t) => t.status === 'upcoming');
  const upcomingSession = sessions.find((s) => s.status === 'upcoming');

  const offersCount = applications.filter((a) => a.stage === 'offer_received').length;
  const activeAppsCount = applications.filter((a) => ['preparing', 'applied'].includes(a.stage)).length;
  const confirmedOffer = applications.find((a) => a.stage === 'offer_received');

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      {/* Editorial Header - Masthead & Scholar Credentials */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-6 border-b border-[#E2DAC9]">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-[#FAF6EE] border border-[#E5DECf] text-[#8C6D4F] text-[11px] font-bold tracking-widest uppercase mb-2.5">
            <GraduationCap className="w-3.5 h-3.5 text-[#1B382B]" />
            <span>Class of 2026 // First-Generation Scholar • {profile.nativeDistrict}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#1F1D1A] tracking-tight">
            Namaste, {profile.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#5E584E] mt-1.5 leading-relaxed max-w-2xl">
            {profile.gradeLevel} • {profile.center} • Strategic Admissions Track: <strong className="font-semibold text-[#1F1D1A]">{profile.targetMajor}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
          <Link to="/student/applications">
            <Button
              variant="outline"
              size="md"
              leftIcon={<Award className="w-4 h-4 text-[#1B382B]" />}
            >
              Admissions Dossier ({offersCount} Confirmed)
            </Button>
          </Link>
          <Link to="/student/assignments">
            <Button
              variant="primary"
              size="md"
              leftIcon={<CheckSquare className="w-4 h-4" />}
            >
              Problem Sets ({pendingAssignments.length} Due)
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Core At-a-Glance Stat Cards with Editorial Palette */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          accent="forest"
          label="Attendance Compliance"
          value={`${profile.attendancePercentage}%`}
          subtitle="Mandatory target: 85%+"
          trend={{ value: 'Good Standing', isPositive: true }}
          icon={<Calendar className="w-5 h-5 text-[#1B382B]" />}
        />
        <StatCard
          accent="terracotta"
          label="Academic Benchmark"
          value={`${profile.academicPerformanceScore}%`}
          subtitle="Top 3% State STEM Cohort"
          trend={{ value: '+4.2% trajectory', isPositive: true }}
          icon={<Award className="w-5 h-5 text-[#A8432B]" />}
        />
        <StatCard
          accent="mustard"
          label="Admissions Pipeline"
          value={`${applications.length} Tracked`}
          subtitle={`${offersCount} Confirmed • ${activeAppsCount} Under Review`}
          badge="1 Full Offer"
          icon={<GraduationCap className="w-5 h-5 text-[#C58F2C]" />}
        />
        <StatCard
          label="Next Commitment"
          value="Tomorrow"
          subtitle="09:30 AM Advanced Mechanics"
          trend={{ value: 'Room Hall 2', neutral: true }}
          icon={<Clock className="w-5 h-5 text-[#6E675D]" />}
        />
      </div>

      {/* Asymmetric 2-Column Responsive Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left 7 Columns: Actionable Day/Week Priorities & Admissions Journey */}
        <div className="lg:col-span-7 space-y-7">
          {/* Card 1: Today & Upcoming Priorities Deck */}
          <Card accentBorder="terracotta" className="p-5 sm:p-6 bg-white border-[#E2DAC9]">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#EDE6D8]">
              <div>
                <h2 className="font-serif font-bold text-base sm:text-lg text-[#1F1D1A] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#A8432B]" />
                  <span>Academic Docket & Immediate Tasks</span>
                </h2>
                <p className="text-xs text-[#6E675D] mt-0.5">
                  Scheduled lectures, problem set deadlines, and faculty clinics
                </p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#FAF6EE] text-[#8C6D4F] border border-[#E2DAC9]">
                4 Commitments
              </span>
            </div>

            <div className="space-y-3">
              {/* Item 1: Next Lecture */}
              <div className="p-3.5 rounded-xs border border-[#E4DCCF] bg-[#FAF8F3] hover:border-[#C4B79E] transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xs bg-[#EBF3EE] text-[#1B382B] border border-[#C2D9CD] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B382B] bg-[#EBF3EE] px-1.5 py-0.5 rounded-xs">
                          Lecture
                        </span>
                        <span className="text-xs font-medium text-[#7C7467]">
                          Tomorrow • 09:30 AM
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-[#1F1D1A] mt-1 font-serif truncate">
                        Advanced Mechanics & Electromagnetism
                      </h3>
                      <p className="text-xs text-[#5E584E] mt-0.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#8C6D4F]" />
                        <span>Lab Hall 2 • Dr. Vandana Sharma</span>
                      </p>
                    </div>
                  </div>
                  <Link to="/student/courses" className="flex-shrink-0">
                    <Button variant="outline" size="sm" className="text-xs h-7 px-2.5">
                      Course Plan
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Item 2: Mentoring Clinic */}
              {upcomingSession && (
                <div className="p-3.5 rounded-xs border border-[#F1D3C9] bg-[#FDFBF9] hover:border-[#E8BCA6] transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xs bg-[#FDF2EE] text-[#A8432B] border border-[#F1D3C9] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8432B] bg-[#FDF2EE] px-1.5 py-0.5 rounded-xs">
                            Advisory Clinic
                          </span>
                          <span className="text-xs font-medium text-[#7C7467]">
                            {upcomingSession.date} • {upcomingSession.time}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm text-[#1F1D1A] mt-1 font-serif truncate">
                          {upcomingSession.agenda}
                        </h3>
                        <p className="text-xs text-[#5E584E] mt-0.5">
                          With <strong>Prof. Rajeshwari Sen</strong> • Mode: {upcomingSession.mode}
                        </p>
                      </div>
                    </div>
                    <Link to="/student/applications" className="flex-shrink-0">
                      <Badge variant="terracotta" size="sm">
                        Upcoming
                      </Badge>
                    </Link>
                  </div>
                </div>
              )}

              {/* Item 3: Pending Assignment */}
              {pendingAssignments[0] && (
                <div className="p-3.5 rounded-xs border border-[#E4DCCF] bg-white hover:border-[#C4B79E] transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xs bg-[#FEF8EC] text-[#9B6D1B] border border-[#F5E0B3] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckSquare className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#9B6D1B] bg-[#FEF8EC] px-1.5 py-0.5 rounded-xs">
                            Problem Set
                          </span>
                          <span className="text-xs font-semibold text-[#A8432B]">
                            Due {pendingAssignments[0].dueDate}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm text-[#1F1D1A] mt-1 font-serif truncate">
                          {pendingAssignments[0].title}
                        </h3>
                        <p className="text-xs text-[#7C7467] mt-0.5 truncate">
                          {pendingAssignments[0].courseTitle} • Marks: {pendingAssignments[0].maxScore}
                        </p>
                      </div>
                    </div>
                    <Link to="/student/assignments" className="flex-shrink-0">
                      <Button variant="primary" size="sm" className="text-xs h-7 px-2.5">
                        Submit
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Item 4: Upcoming Test */}
              {upcomingTests[0] && (
                <div className="p-3.5 rounded-xs border border-[#E4DCCF] bg-[#FAF8F3] hover:border-[#C4B79E] transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xs bg-[#F2ECE0] text-[#6E675D] border border-[#DDD3C2] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#575147] bg-[#F2ECE0] px-1.5 py-0.5 rounded-xs">
                            Benchmark Exam
                          </span>
                          <span className="text-xs font-medium text-[#7C7467]">
                            {upcomingTests[0].scheduledDate} • {upcomingTests[0].durationMinutes} min
                          </span>
                        </div>
                        <h3 className="font-bold text-sm text-[#1F1D1A] mt-1 font-serif truncate">
                          {upcomingTests[0].title}
                        </h3>
                        <p className="text-xs text-[#7C7467] mt-0.5 truncate">
                          Topics: {upcomingTests[0].topics.slice(0, 3).join(', ')}
                        </p>
                      </div>
                    </div>
                    <Link to="/student/tests" className="flex-shrink-0">
                      <Button variant="outline" size="sm" className="text-xs h-7 px-2.5">
                        Syllabus
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Card 2: Higher-Education Admissions Journey Snapshot */}
          <Card accentBorder="forest" className="p-5 sm:p-6 bg-white border-[#E2DAC9]">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#EDE6D8]">
              <div>
                <h2 className="font-serif font-bold text-base sm:text-lg text-[#1F1D1A] flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#1B382B]" />
                  <span>Admissions Milestone Progression</span>
                </h2>
                <p className="text-xs text-[#6E675D] mt-0.5">
                  Your structured progression toward premier university matriculation
                </p>
              </div>
              <Link
                to="/student/applications"
                className="text-xs font-semibold text-[#A8432B] hover:underline flex items-center gap-1"
              >
                Track Dossier ({applications.length}) <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Clean 4-step architectural progress bar */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="p-2.5 rounded-xs bg-[#EBF3EE] border border-[#C2D9CD] text-center">
                <span className="block text-[9px] font-bold text-[#1B382B] uppercase tracking-wider">Phase 1</span>
                <span className="text-xs font-semibold text-[#142920] block mt-0.5">Foundation</span>
                <span className="block text-[10px] text-[#1B382B] mt-0.5 font-medium">✓ Verified</span>
              </div>
              <div className="p-2.5 rounded-xs bg-[#EBF3EE] border border-[#C2D9CD] text-center">
                <span className="block text-[9px] font-bold text-[#1B382B] uppercase tracking-wider">Phase 2</span>
                <span className="text-xs font-semibold text-[#142920] block mt-0.5">Mock Tests</span>
                <span className="block text-[10px] text-[#1B382B] mt-0.5 font-medium">✓ 98th Pctl</span>
              </div>
              <div className="p-2.5 rounded-xs bg-[#FDF2EE] border border-[#F1D3C9] text-center ring-1 ring-[#A8432B]/20">
                <span className="block text-[9px] font-bold text-[#A8432B] uppercase tracking-wider">Phase 3</span>
                <span className="text-xs font-bold text-[#A8432B] block mt-0.5">Applications</span>
                <span className="block text-[10px] text-[#863314] mt-0.5 font-medium">2 In Review</span>
              </div>
              <div className="p-2.5 rounded-xs bg-[#FAF6EE] border border-[#E5DECf] text-center">
                <span className="block text-[9px] font-bold text-[#8C6D4F] uppercase tracking-wider">Phase 4</span>
                <span className="text-xs font-bold text-[#634E27] block mt-0.5">Matriculation</span>
                <span className="block text-[10px] font-bold text-[#1B382B] mt-0.5">1 Full Offer</span>
              </div>
            </div>

            {/* Confirmed Offer Highlight Banner with Editorial Seal */}
            {confirmedOffer && (
              <div className="p-3.5 rounded-xs bg-[#F5FAF6] border border-[#BFDFCA] flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1B382B] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1B382B] block">
                      Confirmed Fellowship Award
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#1F1D1A] font-serif mt-0.5">
                      {confirmedOffer.opportunityName}
                    </h4>
                    <p className="text-xs text-[#524C43] mt-0.5">
                      {confirmedOffer.institution} • 100% Full Need-Based Tuition & Residential Fellowship
                    </p>
                  </div>
                </div>
                <Link to="/student/applications" className="flex-shrink-0">
                  <Button variant="outline" size="sm" className="text-xs h-7 px-2 border-[#9ECFB2] text-[#1B382B] bg-white">
                    Award Letter
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </div>

        {/* Right 5 Columns: Mentor Spotlight, Course Pacing & Clean Launchpad */}
        <div className="lg:col-span-5 space-y-7">
          {/* Card 3: Assigned Mentor Direct Memo */}
          <Card accentBorder="mustard" className="p-5 sm:p-6 bg-[#FAF6EE] border-[#E2DAC9]">
            <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-[#E7DFCE]">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#8C6D4F]">
                <MessageSquare className="w-3.5 h-3.5 text-[#A8432B]" />
                <span>Advisory Dispatch Memo</span>
              </div>
              <Badge variant="stone" size="sm">1-on-1 Cell</Badge>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
                alt="Prof. Rajeshwari Sen"
                className="w-10 h-10 rounded-xs object-cover border border-[#D5CBB8] flex-shrink-0"
              />
              <div className="min-w-0">
                <h4 className="font-bold text-sm text-[#1F1D1A] font-serif truncate">
                  Prof. Rajeshwari Sen
                </h4>
                <p className="text-xs text-[#7C7467] truncate">
                  Higher Ed Advisor • Ashoka & IISc Admissions Track
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xs bg-white border border-[#E2DAC9] text-xs text-[#3D3831] leading-relaxed mb-3.5">
              <p className="italic font-serif">
                "{applications[0]?.assignedMentorNotes || 'Arjun, your Ashoka interview is scheduled for Oct 8. Let us run a practice Zoom simulation this weekend focusing on your community contribution essay. Keep your physics problem sets on schedule.'}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-[#7C7467]">Next Clinic: <strong className="text-[#1F1D1A]">Sep 20, 04:30 PM</strong></span>
              <Link to="/student/applications" className="font-semibold text-[#A8432B] hover:underline flex items-center gap-1">
                Advisory Feedback <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Card 4: Active Courses Pacing */}
          <Card className="p-5 sm:p-6 bg-white border-[#E2DAC9]">
            <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-[#EDE6D8]">
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#1F1D1A]">
                Academic Subject Pacing
              </h3>
              <Link to="/student/courses" className="text-xs font-semibold text-[#A8432B] hover:underline">
                All Subjects ({courses.length})
              </Link>
            </div>

            <div className="space-y-3.5">
              {courses.slice(0, 3).map((c) => (
                <div key={c.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1F1D1A] truncate max-w-[200px]">
                      {c.title}
                    </span>
                    <span className="font-bold text-[#575147] flex-shrink-0">{c.progress}%</span>
                  </div>
                  <ProgressBar value={c.progress} size="sm" color="terracotta" showPercent={false} />
                  <div className="flex items-center justify-between text-[11px] text-[#7C7467]">
                    <span className="truncate">{c.completedModules} of {c.modulesCount} modules</span>
                    <span className="truncate">{c.nextSession}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Card 5: Quick Launchpad Shortcuts */}
          <Card className="p-5 sm:p-6 bg-white border-[#E2DAC9]">
            <h3 className="font-serif font-bold text-sm sm:text-base text-[#1F1D1A] mb-3">
              Scholar Portal Access Desk
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                to="/student/attendance"
                className="p-3 rounded-xs border border-[#E2DAC9] bg-[#FAF8F3] hover:bg-[#FAF3E5] hover:border-[#C4B79E] transition-colors text-left flex flex-col justify-between"
              >
                <Calendar className="w-4 h-4 text-[#1B382B] mb-2" />
                <div>
                  <span className="text-xs font-bold text-[#1F1D1A] block">Attendance Log</span>
                  <span className="text-[11px] text-[#7C7467]">{profile.attendancePercentage}% verified</span>
                </div>
              </Link>

              <Link
                to="/student/results"
                className="p-3 rounded-xs border border-[#E2DAC9] bg-[#FAF8F3] hover:bg-[#FAF3E5] hover:border-[#C4B79E] transition-colors text-left flex flex-col justify-between"
              >
                <Award className="w-4 h-4 text-[#A8432B] mb-2" />
                <div>
                  <span className="text-xs font-bold text-[#1F1D1A] block">Mock Results</span>
                  <span className="text-[11px] text-[#7C7467]">Scorecards & ranks</span>
                </div>
              </Link>

              <Link
                to="/student/opportunities"
                className="p-3 rounded-xs border border-[#E2DAC9] bg-[#FAF8F3] hover:bg-[#FAF3E5] hover:border-[#C4B79E] transition-colors text-left flex flex-col justify-between"
              >
                <Compass className="w-4 h-4 text-[#9B6D1B] mb-2" />
                <div>
                  <span className="text-xs font-bold text-[#1F1D1A] block">Fellowships</span>
                  <span className="text-[11px] text-[#7C7467]">6 Partner institutes</span>
                </div>
              </Link>

              <Link
                to="/student/profile"
                className="p-3 rounded-xs border border-[#E2DAC9] bg-[#FAF8F3] hover:bg-[#FAF3E5] hover:border-[#C4B79E] transition-colors text-left flex flex-col justify-between"
              >
                <FileText className="w-4 h-4 text-[#575147] mb-2" />
                <div>
                  <span className="text-xs font-bold text-[#1F1D1A] block">Scholar Dossier</span>
                  <span className="text-[11px] text-[#7C7467]">Certificates & bio</span>
                </div>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
