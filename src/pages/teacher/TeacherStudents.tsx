import React, { useState } from 'react';
import { portalService } from '../../services/portalService';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/common/Table';
import { Search, Users, Phone, MapPin, AlertCircle, CheckCircle } from 'lucide-react';

export const TeacherStudents: React.FC = () => {
  const students = portalService.getAllStudents();
  const [search, setSearch] = useState('');
  const [batchFilter, setBatchFilter] = useState('all');

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.center.toLowerCase().includes(search.toLowerCase());

    const matchesBatch = batchFilter === 'all' || s.batch === batchFilter;
    return matchesSearch && matchesBatch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'High Performer':
        return <Badge variant="forest" size="sm">High Performer</Badge>;
      case 'On Track':
        return <Badge variant="stone" size="sm">On Track</Badge>;
      case 'Needs Support':
        return <Badge variant="ochre" size="sm">Needs Support</Badge>;
      case 'Urgent Attention':
        return <Badge variant="danger" size="sm">Urgent Attention</Badge>;
      default:
        return <Badge variant="stone" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Scholar Academic Directory</h1>
          <p className="text-xs text-[#57534E] mt-1">
            Track individual progress, attendance compliance, and intervention flags.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-[#8C6D4F] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, roll number, or district..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#DDD4C3] rounded-lg text-[#1C1917] placeholder-[#8C8478] focus:outline-none focus:ring-2 focus:ring-[#B84A22]"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
          {['all', 'Grade 12 STEM Achievers', 'Grade 12 Medical Cohort', 'Grade 12 Humanities & Social Sciences'].map((b) => (
            <button
              key={b}
              onClick={() => setBatchFilter(b)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                batchFilter === b
                  ? 'bg-[#B84A22] text-white shadow-2xs'
                  : 'bg-white border border-[#DDD4C3] text-[#57534E] hover:bg-[#FAF6EE]'
              }`}
            >
              {b === 'all' ? 'All Batches' : b}
            </button>
          ))}
        </div>
      </div>

      {/* Students Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Scholar</TableHead>
            <TableHead>Roll Number</TableHead>
            <TableHead>Batch & Center</TableHead>
            <TableHead>Attendance</TableHead>
            <TableHead>Academic Benchmark</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Target Aspiration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((s) => (
            <TableRow key={s.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#D5CBB9]"
                  />
                  <div>
                    <span className="font-bold text-[#1C1917] text-xs block">{s.name}</span>
                    <span className="text-[10px] text-[#78716C]">{s.socioeconomicCategory}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-mono text-xs text-[#57534E]">
                {s.rollNumber}
              </TableCell>
              <TableCell className="text-xs text-[#57534E]">
                <span className="font-semibold block text-[#1C1917]">{s.batch}</span>
                <span className="text-[11px] text-[#78716C]">{s.center}</span>
              </TableCell>
              <TableCell>
                <span
                  className={`font-bold text-xs ${
                    s.attendance < 80 ? 'text-[#991B1B]' : 'text-[#2D4A3E]'
                  }`}
                >
                  {s.attendance}%
                </span>
              </TableCell>
              <TableCell className="font-bold text-xs text-[#1C1917]">
                {s.gpaScore}%
              </TableCell>
              <TableCell>
                {getStatusBadge(s.status)}
              </TableCell>
              <TableCell className="text-xs font-medium text-[#8C6D4F]">
                {s.target}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
