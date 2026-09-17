import React, { useState } from 'react';
import { portalService } from '../../services/portalService';
import { useToast } from '../../context/ToastContext';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Settings, RefreshCw, Save, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { showToast } = useToast();
  const [academicYear, setAcademicYear] = useState('2025–2026');
  const [minAttendance, setMinAttendance] = useState('85');
  const [fellowshipTarget, setFellowshipTarget] = useState('80');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    showToast('Settings Saved', 'Portal configuration parameters updated.');
  };

  const handleResetData = () => {
    portalService.resetAllMockData();
    showToast('Data Reset', 'All local mock records restored to initial educational state.');
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Foundation Portal Configuration</h1>
        <p className="text-xs text-[#57534E] mt-1">
          Global academic rules, compliance thresholds, and local test environment management.
        </p>
      </div>

      <form onSubmit={handleSaveConfig} className="space-y-6">
        <Card className="p-6">
          <h3 className="font-serif font-bold text-base text-[#1C1917] mb-4 pb-2 border-b border-[#EAE2D2]">
            Academic & Fellowship Thresholds
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Active Academic Cycle"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              helperText="Determines cohort reporting periods"
            />
            <Input
              label="Minimum Attendance Compliance (%)"
              type="number"
              value={minAttendance}
              onChange={(e) => setMinAttendance(e.target.value)}
              helperText="Flagged below this percentage"
            />
          </div>

          <div className="mt-4">
            <Input
              label="Target College Acceptance Goal (%)"
              type="number"
              value={fellowshipTarget}
              onChange={(e) => setFellowshipTarget(e.target.value)}
              helperText="State foundation objective for Class of 2026"
            />
          </div>

          <div className="mt-5 pt-3 border-t border-[#EAE2D2] flex justify-end">
            <Button type="submit" variant="primary" size="sm" leftIcon={<Save className="w-4 h-4" />}>
              Save Operational Parameters
            </Button>
          </div>
        </Card>
      </form>

      {/* Simulated Local Environment Management */}
      <Card className="p-6 border-[#F2D7C8] bg-[#FFFBF8]">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#FDF2EC] text-[#B84A22] mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-[#1C1917]">
              Reset Local Mock Data Store
            </h3>
            <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
              This application operates strictly in the browser using simulated localStorage persistence. If you wish to restore original seed data (reset applications, grades, student profiles, and test scores), click below.
            </p>

            <div className="mt-4">
              <Button
                variant="danger"
                size="sm"
                onClick={handleResetData}
                leftIcon={<RefreshCw className="w-4 h-4" />}
              >
                Reset All Records to Factory Defaults
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
