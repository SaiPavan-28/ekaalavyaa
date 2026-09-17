import React, { useState } from 'react';
import { portalService } from '../../services/portalService';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/common/Table';
import { Calendar, CheckCircle, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

export const StudentAttendance: React.FC = () => {
  const records = portalService.getAttendanceRecords();
  const profile = portalService.getStudentProfile();
  const [filter, setFilter] = useState<'all' | 'present' | 'absent' | 'late' | 'excused'>('all');

  const filtered = filter === 'all'
    ? records
    : records.filter((r) => r.status === filter);

  const statusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge variant="forest" size="sm" dot>Present</Badge>;
      case 'late':
        return <Badge variant="ochre" size="sm" dot>Late Arrival</Badge>;
      case 'excused':
        return <Badge variant="stone" size="sm" dot>Excused Leave</Badge>;
      case 'absent':
        return <Badge variant="danger" size="sm" dot>Absent</Badge>;
      default:
        return <Badge variant="stone" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Attendance & Regularity Records</h1>
        <p className="text-xs text-[#57534E] mt-1">
          Minimum 85% attendance is required to maintain Ekalavya Foundation residential fellowship status.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Cumulative Attendance"
          value={`${profile.attendancePercentage}%`}
          subtitle="Cohort Requirement: 85%"
          trend={{ value: 'Compliant & In Good Standing', isPositive: true }}
          icon={<Calendar className="w-5 h-5" />}
        />
        <StatCard
          label="Total Tracked Sessions"
          value="142 Sessions"
          subtitle="Academic year 2025–26"
          icon={<Clock className="w-5 h-5" />}
        />
        <StatCard
          label="Excused Sanctioned Leaves"
          value="4 Days"
          subtitle="District Science Olympiad"
          icon={<CheckCircle2 className="w-5 h-5" />}
        />
        <StatCard
          label="Consecutive Streak"
          value="18 Days"
          subtitle="No unexcused absences"
          trend={{ value: 'Perfect regularity', isPositive: true }}
          icon={<CheckCircle className="w-5 h-5" />}
        />
      </div>

      {/* Filter Tabs & Log Table */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-[#EAE2D2]">
          <h3 className="text-base font-bold font-serif text-[#1C1917]">
            Session Log
          </h3>
          <div className="flex flex-wrap gap-2">
            {(['all', 'present', 'late', 'excused', 'absent'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1 rounded-md text-xs font-semibold capitalize cursor-pointer transition-colors ${
                  filter === s
                    ? 'bg-[#B84A22] text-white'
                    : 'bg-[#FAF8F3] border border-[#DDD4C3] text-[#57534E] hover:bg-[#F2ECE1]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Course / Lecture</TableHead>
              <TableHead>Session Topic</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes / Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((rec) => (
              <TableRow key={rec.id}>
                <TableCell className="font-semibold text-[#1C1917] whitespace-nowrap">
                  {rec.date}
                </TableCell>
                <TableCell className="font-medium text-[#44403C]">
                  {rec.courseTitle}
                </TableCell>
                <TableCell className="text-xs text-[#57534E]">
                  {rec.sessionTopic}
                </TableCell>
                <TableCell>
                  {statusBadge(rec.status)}
                </TableCell>
                <TableCell className="text-xs text-[#78716C]">
                  {rec.remarks || '—'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
