import React from 'react';
import { Link } from 'react-router-dom';
import { portalService } from '../../services/portalService';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  Compass,
  Users,
  Calendar,
  FileCheck,
  Award,
  ArrowRight,
  GraduationCap,
  MessageSquare,
} from 'lucide-react';

export const MentorDashboard: React.FC = () => {
  const mentees = portalService.getMentees();
  const sessions = portalService.getMentoringSessions();
  const applications = portalService.getApplications();

  const upcomingSessions = sessions.filter((s) => s.status === 'upcoming');
  const applicationsUnderReview = applications.filter((a) => a.stage === 'preparing' || a.stage === 'applied');
  const offersReceived = applications.filter((a) => a.stage === 'offer_received');

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      {/* Editorial Header Banner */}
      <div className="p-6 sm:p-8 rounded-xs bg-[#FAF6EE] border border-[#E2DAC9]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-white text-[#8C6D4F] border border-[#E5DECf] text-[11px] font-bold uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5 text-[#1B382B]" />
            <span>Higher Education Advisory Cell // Class of 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#1F1D1A] tracking-tight">
            Prof. Rajeshwari Sen (Advisory Fellow)
          </h1>
          <p className="text-xs sm:text-sm text-[#5E584E] mt-2 leading-relaxed">
            Advising <strong>{mentees.length} first-generation rural scholars</strong> across IISc Bangalore, Ashoka University, and Azim Premji University admission pipelines. <strong>{offersReceived.length} full-tuition fellowship</strong> already secured!
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link to="/mentor/sessions">
              <Button
                variant="primary"
                size="md"
                rightIcon={<Calendar className="w-4 h-4" />}
              >
                Upcoming Clinics ({upcomingSessions.length})
              </Button>
            </Link>
            <Link to="/mentor/mentees">
              <Button
                variant="outline"
                size="md"
              >
                Scholar 360° Dossiers
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          accent="forest"
          label="Assigned Mentees"
          value={mentees.length}
          subtitle="Top state cohort scholars"
          icon={<Users className="w-5 h-5 text-[#1B382B]" />}
        />
        <StatCard
          accent="terracotta"
          label="Advisory Sessions"
          value={`${upcomingSessions.length} Scheduled`}
          subtitle="SoP & interview simulations"
          icon={<Calendar className="w-5 h-5 text-[#A8432B]" />}
        />
        <StatCard
          accent="mustard"
          label="Dossiers In Review"
          value={applicationsUnderReview.length}
          subtitle="National & private universities"
          icon={<FileCheck className="w-5 h-5 text-[#C58F2C]" />}
        />
        <StatCard
          label="Fellowship Offers"
          value={`${offersReceived.length} Confirmed`}
          subtitle="100% need-based coverage"
          badge="1 Full Ride"
          icon={<Award className="w-5 h-5 text-[#1B382B]" />}
        />
      </div>

      {/* 2-Column Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left 7 Cols: Mentees Roster & Active Pipeline */}
        <div className="lg:col-span-7 space-y-7">
          {/* Mentees Roster */}
          <Card accentBorder="forest" className="p-5 sm:p-6 bg-white border-[#E2DAC9]">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#EDE6D8]">
              <div>
                <h2 className="font-serif font-bold text-base sm:text-lg text-[#1F1D1A]">
                  Assigned Scholar Dossiers
                </h2>
                <p className="text-xs text-[#6E675D] mt-0.5">
                  First-generation learners progressing toward premier admissions
                </p>
              </div>
              <Link to="/mentor/mentees" className="text-xs font-semibold text-[#A8432B] hover:underline">
                View All Mentees
              </Link>
            </div>

            <div className="space-y-3.5">
              {mentees.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-xs border border-[#E2DAC9] bg-[#FAF8F3] hover:border-[#BFAF98] transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-10 h-10 rounded-xs object-cover border border-[#D5CBB8] flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="font-bold text-sm text-[#1F1D1A] font-serif truncate">
                          {m.name}
                        </h3>
                        <p className="text-xs text-[#5E584E] mt-0.5">
                          {m.gradeLevel} • {m.nativeDistrict}
                        </p>
                        <p className="text-[11px] text-[#7C7467] mt-0.5">
                          Target: <strong className="text-[#1F1D1A]">{m.targetMajor}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <Badge
                        variant={m.academicPerformanceScore >= 85 ? 'forest' : 'stone'}
                        size="sm"
                      >
                        {m.academicPerformanceScore >= 85 ? 'SCHOLAR TRACK' : 'IN PROGRESS'}
                      </Badge>
                      <span className="block text-[11px] text-[#7C7467] mt-1">
                        Benchmark: <strong>{m.academicPerformanceScore}%</strong>
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#EDE6D8] flex items-center justify-between text-xs">
                    <span className="text-[#6E675D]">Dream: <strong>{m.dreamInstitutions.slice(0, 2).join(', ')}</strong></span>
                    <Link
                      to="/mentor/mentees"
                      className="text-[#A8432B] font-semibold hover:underline flex items-center gap-1"
                    >
                      Dossier 360° <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right 5 Cols: Scheduled Advisory Clinics */}
        <div className="lg:col-span-5 space-y-7">
          {/* Upcoming Sessions Card */}
          <Card accentBorder="terracotta" className="p-5 sm:p-6 bg-white border-[#E2DAC9]">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#EDE6D8]">
              <div>
                <h3 className="font-serif font-bold text-base text-[#1F1D1A]">
                  Scheduled Advisory Clinics
                </h3>
                <p className="text-xs text-[#6E675D] mt-0.5">
                  1-on-1 SoP reviews and mock interviews
                </p>
              </div>
              <Link to="/mentor/sessions" className="text-xs font-semibold text-[#A8432B] hover:underline">
                Schedule New
              </Link>
            </div>

            <div className="space-y-3">
              {sessions.map((sess) => (
                <div
                  key={sess.id}
                  className="p-3.5 rounded-xs border border-[#E2DAC9] bg-[#FAF8F3] hover:border-[#BFAF98] transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D4F]">
                        {sess.date} • {sess.time}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-[#1F1D1A] font-serif mt-0.5">
                        {sess.agenda}
                      </h4>
                      <p className="text-xs text-[#5E584E] mt-0.5">
                        Scholar: <strong>{sess.studentName}</strong> • {sess.mode}
                      </p>
                    </div>
                    <Badge variant={sess.status === 'completed' ? 'stone' : 'terracotta'} size="sm">
                      {sess.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
