import React from 'react';
import { Link } from 'react-router-dom';
import { portalService } from '../../services/portalService';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { SimpleBarChart, SimpleTrendLine } from '../../components/common/SimpleChart';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/common/Table';
import {
  Building2,
  Users,
  GraduationCap,
  Award,
  Megaphone,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const stats = portalService.getAdminStats();
  const centers = portalService.getLearningCenters();
  const announcements = portalService.getAnnouncements();

  const collegeAdmissions = [
    { label: 'IISc / IISERs', value: 42, displayValue: '42 Offers', color: '#1B382B' },
    { label: 'Ashoka Univ', value: 38, displayValue: '38 Offers', color: '#A8432B' },
    { label: 'Azim Premji', value: 65, displayValue: '65 Offers', color: '#C58F2C' },
    { label: 'Central Univs', value: 89, displayValue: '89 Offers', color: '#575147' },
  ];

  const yearlyScholarGrowth = [
    { label: '2023', value: 240 },
    { label: '2024', value: 410 },
    { label: '2025', value: 680 },
    { label: '2026', value: 840 },
  ];

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#E2DAC9]">
        <div>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-[#8C6D4F]">
            Foundation Directorate Control // Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#1F1D1A] mt-1 tracking-tight">
            Ekalavya Foundation State Operations
          </h1>
          <p className="text-xs sm:text-sm text-[#5E584E] mt-1">
            Overseeing 6 Learning Hubs, 840 Scholars, and Higher Education Admission Pipelines
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <Link to="/admin/announcements">
            <Button variant="primary" size="md" leftIcon={<Megaphone className="w-4 h-4" />}>
              Broadcast Circular
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Core High-Level Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          accent="forest"
          label="Learning Hubs"
          value={stats.totalCenters}
          subtitle="Jharkhand & Odisha regions"
          icon={<Building2 className="w-5 h-5 text-[#1B382B]" />}
        />
        <StatCard
          accent="terracotta"
          label="Enrolled Scholars"
          value={stats.totalStudents}
          subtitle="100% need-based fellowships"
          trend={{ value: '+24% YoY growth', isPositive: true }}
          icon={<GraduationCap className="w-5 h-5 text-[#A8432B]" />}
        />
        <StatCard
          accent="mustard"
          label="Faculty & Mentors"
          value={stats.totalFaculty + stats.totalMentors}
          subtitle={`${stats.totalFaculty} Faculty • ${stats.totalMentors} Mentors`}
          icon={<Users className="w-5 h-5 text-[#C58F2C]" />}
        />
        <StatCard
          label="College Admissions"
          value={`${stats.collegeAcceptanceRate}%`}
          subtitle="Acceptance across premier universities"
          trend={{ value: '234 confirmed', isPositive: true }}
          icon={<Award className="w-5 h-5 text-[#1B382B]" />}
        />
      </div>

      {/* Analytical Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        {/* Left 7 Cols: College Admission Outcomes */}
        <div className="lg:col-span-7">
          <Card accentBorder="forest" className="p-5 sm:p-6 bg-white border-[#E2DAC9]">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#EDE6D8]">
              <div>
                <h2 className="font-serif font-bold text-base sm:text-lg text-[#1F1D1A]">
                  University & Fellowship Acceptance Outcomes
                </h2>
                <p className="text-xs text-[#6E675D] mt-0.5">
                  Class of 2025–26 cumulative acceptance across premier institutions
                </p>
              </div>
              <Badge variant="forest" size="sm">
                234 Total Offers
              </Badge>
            </div>

            <SimpleBarChart items={collegeAdmissions} height={160} />
          </Card>
        </div>

        {/* Right 5 Cols: Scholar Growth Trend */}
        <div className="lg:col-span-5">
          <Card accentBorder="terracotta" className="p-5 sm:p-6 bg-white border-[#E2DAC9]">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#EDE6D8]">
              <div>
                <h2 className="font-serif font-bold text-base sm:text-lg text-[#1F1D1A]">
                  Scholar Enrollment Trajectory
                </h2>
                <p className="text-xs text-[#6E675D] mt-0.5">
                  First-generation learners onboarded
                </p>
              </div>
              <Badge variant="terracotta" size="sm">
                840 Scholars
              </Badge>
            </div>

            <SimpleTrendLine data={yearlyScholarGrowth} height={160} strokeColor="#A8432B" />
          </Card>
        </div>
      </div>

      {/* Learning Hubs Regional Roster */}
      <Card className="p-5 sm:p-6 bg-white border-[#E2DAC9]">
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#EDE6D8]">
          <div>
            <h2 className="font-serif font-bold text-base sm:text-lg text-[#1F1D1A]">
              State Learning Hubs Status
            </h2>
            <p className="text-xs text-[#6E675D] mt-0.5">
              Center coordinators, active scholars, and compliance ratings
            </p>
          </div>
          <Link to="/admin/centers" className="text-xs font-semibold text-[#A8432B] hover:underline">
            Manage All Hubs
          </Link>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Learning Hub</TableHead>
                <TableHead>District & State</TableHead>
                <TableHead>Coordinator</TableHead>
                <TableHead>Scholars</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {centers.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-semibold text-[#1F1D1A] font-serif">
                    {c.name}
                  </TableCell>
                  <TableCell className="text-[#5E584E]">{c.district}, {c.state}</TableCell>
                  <TableCell className="text-[#5E584E]">{c.coordinator}</TableCell>
                  <TableCell className="font-medium text-[#1F1D1A]">{c.studentCount}</TableCell>
                  <TableCell className="text-[#5E584E]">{c.capacity}</TableCell>
                  <TableCell>
                    <Badge variant={c.attendanceRate >= 90 ? 'forest' : 'stone'} size="sm">
                      {c.attendanceRate}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      to="/admin/centers"
                      className="text-xs font-semibold text-[#A8432B] hover:underline"
                    >
                      Audit Hub →
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};
