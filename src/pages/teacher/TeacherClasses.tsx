import React from 'react';
import { portalService } from '../../services/portalService';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Layers, Users, Calendar, MapPin, Award, Plus } from 'lucide-react';

export const TeacherClasses: React.FC = () => {
  const classes = portalService.getTeacherClasses();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Class Cohorts & Batches</h1>
          <p className="text-xs text-[#57534E] mt-1">
            Course allocation, room assignments, and academic tracking for Senior Faculty.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <Card key={cls.id} className="flex flex-col justify-between p-6">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant="terracotta" size="sm">
                  {cls.batch}
                </Badge>
                <span className="text-xs font-semibold text-[#2D4A3E]">
                  {cls.totalStudents} Scholars Enrolled
                </span>
              </div>

              <h3 className="text-lg font-bold font-serif text-[#1C1917] mt-1">
                {cls.name}
              </h3>
              <p className="text-xs text-[#78716C] mt-1">{cls.subject}</p>

              <div className="mt-4 p-3 rounded-lg bg-[#FAF8F3] border border-[#ECE5D8] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#44403C]">
                  <span className="text-[#78716C]">Class Schedule:</span>
                  <span className="font-semibold text-[#1C1917]">{cls.schedule}</span>
                </div>
                <div className="flex items-center justify-between text-[#44403C]">
                  <span className="text-[#78716C]">Room / Lab:</span>
                  <span>{cls.room}</span>
                </div>
                <div className="flex items-center justify-between text-[#44403C]">
                  <span className="text-[#78716C]">Average Attendance:</span>
                  <span className="font-bold text-[#2D4A3E]">{cls.averageAttendance}%</span>
                </div>
                <div className="flex items-center justify-between text-[#44403C]">
                  <span className="text-[#78716C]">Benchmark Average:</span>
                  <span className="font-bold text-[#B84A22]">{cls.averageScore}%</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#EAE2D2] flex items-center justify-between text-xs">
              <span className="text-[#78716C]">{cls.activeAssignments} Active Problem Sets</span>
              <Button variant="outline" size="sm">
                View Roster
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
