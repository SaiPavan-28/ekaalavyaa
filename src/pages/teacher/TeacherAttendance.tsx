import React, { useState } from 'react';
import { portalService } from '../../services/portalService';
import { useToast } from '../../context/ToastContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Select } from '../../components/common/Select';
import { Badge } from '../../components/common/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/common/Table';
import { Calendar, CheckCircle2, Save, UserCheck, AlertCircle } from 'lucide-react';

export const TeacherAttendance: React.FC = () => {
  const { showToast } = useToast();
  const students = portalService.getAllStudents();
  const classes = portalService.getTeacherClasses();

  const [selectedClass, setSelectedClass] = useState(classes[0].id);
  const [date, setDate] = useState('2026-09-17');
  const [sessionTopic, setSessionTopic] = useState('Rotational Kinematics and Inertial Tensor Calculations');
  
  // Attendance status mapping for the class
  const [attendanceState, setAttendanceState] = useState<Record<string, 'present' | 'absent' | 'late' | 'excused'>>(() => {
    const map: Record<string, 'present' | 'absent' | 'late' | 'excused'> = {};
    students.forEach((s) => {
      map[s.id] = s.attendance < 80 ? 'late' : 'present';
    });
    return map;
  });

  const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    setAttendanceState((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, 'present' | 'absent' | 'late' | 'excused'> = {};
    students.forEach((s) => {
      updated[s.id] = 'present';
    });
    setAttendanceState(updated);
    showToast('Batch Action', 'All scholars marked as Present.');
  };

  const handleSaveRegister = () => {
    const presentCount = Object.values(attendanceState).filter((s) => s === 'present').length;
    portalService.markAttendance({
      date,
      courseTitle: classes.find((c) => c.id === selectedClass)?.subject || 'Advanced Mechanics',
      sessionTopic,
      status: 'present',
      remarks: `Class log saved by Dr. Vandana Sharma. ${presentCount}/${students.length} scholars present.`,
    });
    showToast('Attendance Logged', `Recorded register for ${date}. Synchronized to Foundation registry.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Class Attendance Register</h1>
          <p className="text-xs text-[#57534E] mt-1">
            Log daily classroom and laboratory attendance for batch compliance and residential stipends.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleMarkAllPresent} leftIcon={<UserCheck className="w-4 h-4" />}>
            Mark All Present
          </Button>
          <Button variant="primary" size="sm" onClick={handleSaveRegister} leftIcon={<Save className="w-4 h-4" />}>
            Save Register
          </Button>
        </div>
      </div>

      {/* Control Panel */}
      <Card className="p-5 bg-white border-[#E0D7C6]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Select Batch / Course"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            options={classes.map((c) => ({ value: c.id, label: `${c.name} (${c.batch})` }))}
          />
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1.5">
              Attendance Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-[#D5CBB9] bg-[#FAF8F3] px-3.5 py-2 text-sm text-[#1C1917] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B84A22]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1.5">
              Curriculum Session Topic
            </label>
            <input
              type="text"
              value={sessionTopic}
              onChange={(e) => setSessionTopic(e.target.value)}
              placeholder="e.g. Chapter 4 Problem Solving..."
              className="w-full rounded-lg border border-[#D5CBB9] bg-[#FAF8F3] px-3.5 py-2 text-sm text-[#1C1917] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B84A22]"
            />
          </div>
        </div>
      </Card>

      {/* Attendance Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Scholar</TableHead>
            <TableHead>Roll Number</TableHead>
            <TableHead>Term Attendance</TableHead>
            <TableHead>Mark Session Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((s) => {
            const currentStatus = attendanceState[s.id] || 'present';

            return (
              <TableRow key={s.id}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <img
                      src={s.avatar}
                      alt={s.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#D5CBB9]"
                    />
                    <div>
                      <span className="font-bold text-xs text-[#1C1917] block">{s.name}</span>
                      <span className="text-[10px] text-[#78716C]">{s.center}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs text-[#57534E]">
                  {s.rollNumber}
                </TableCell>
                <TableCell>
                  <span className={`text-xs font-semibold ${s.attendance < 80 ? 'text-[#991B1B]' : 'text-[#2D4A3E]'}`}>
                    {s.attendance}%
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {(['present', 'late', 'excused', 'absent'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleStatusChange(s.id, st)}
                        className={`px-2.5 py-1 rounded text-xs font-semibold capitalize transition-colors cursor-pointer ${
                          currentStatus === st
                            ? st === 'present'
                              ? 'bg-[#2D4A3E] text-white'
                              : st === 'late'
                              ? 'bg-[#C27803] text-white'
                              : st === 'excused'
                              ? 'bg-[#78716C] text-white'
                              : 'bg-[#991B1B] text-white'
                            : 'bg-[#FAF6EE] text-[#78716C] border border-[#DDD4C3] hover:bg-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
