import React, { useState } from 'react';
import { portalService } from '../../services/portalService';
import { useToast } from '../../context/ToastContext';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  User,
  GraduationCap,
  Award,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Save,
  CheckCircle2,
} from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const { showToast } = useToast();
  const initialProfile = portalService.getStudentProfile();
  const [profile, setProfile] = useState(initialProfile);
  const [targetMajor, setTargetMajor] = useState(initialProfile.targetMajor);
  const [phone, setPhone] = useState(initialProfile.phone || '');
  const [bio, setBio] = useState(initialProfile.bio || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      const updated = portalService.updateStudentProfile({
        targetMajor,
        phone,
        bio,
      });
      setProfile(updated);
      setIsSaving(false);
      showToast('Profile Updated', 'Your scholar information has been updated.');
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header Banner */}
      <div className="rounded-2xl border border-[#E0D7C6] bg-white p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-[#B84A22] shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-serif text-[#1C1917]">{profile.name}</h1>
              <Badge variant="forest" size="sm">Active Fellow</Badge>
            </div>
            <p className="text-xs text-[#78716C] mt-1 flex flex-wrap items-center gap-3">
              <span>Roll No: <strong>{profile.rollNumber}</strong></span>
              <span>•</span>
              <span>{profile.gradeLevel}</span>
              <span>•</span>
              <span>{profile.center}</span>
            </p>
            <div className="flex flex-wrap gap-2 mt-2.5">
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#FAF6EE] border border-[#E8E1D3] text-[#6E5A44] font-medium">
                {profile.socioeconomicCategory}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#FAF6EE] border border-[#E8E1D3] text-[#6E5A44] font-medium">
                Native: {profile.nativeDistrict}
              </span>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#FAF6EE] border border-[#E8E1D3] text-right">
          <p className="text-[11px] uppercase tracking-wider font-bold text-[#8C6D4F]">
            Assigned Mentor
          </p>
          <p className="text-sm font-bold text-[#1C1917] font-serif mt-0.5">
            {profile.assignedMentor}
          </p>
          <p className="text-xs text-[#78716C]">{profile.mentorContact}</p>
        </div>
      </div>

      {/* Main Profile Form and Details */}
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Academic & Personal Data */}
        <div className="md:col-span-7 space-y-6">
          <Card className="p-6">
            <h3 className="text-base font-bold font-serif text-[#1C1917] mb-4 pb-2 border-b border-[#EAE2D2]">
              Academic & Contact Information
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Roll Number"
                  value={profile.rollNumber}
                  disabled
                  helperText="Managed by Ekalavya Registry"
                />
                <Input
                  label="Academic Stream"
                  value={profile.stream}
                  disabled
                />
              </div>

              <Input
                label="Target Undergraduate Major"
                value={targetMajor}
                onChange={(e) => setTargetMajor(e.target.value)}
                placeholder="e.g. Theoretical Physics / Mathematics"
                helperText="Informs your personalized university recommendations"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Primary Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                />
                <Input
                  label="Registered Email"
                  value={profile.email}
                  disabled
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1.5">
                  Academic Bio / Statement
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-[#D5CBB9] bg-[#FAF8F3] p-3 text-sm text-[#1C1917] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#B84A22]"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSaving}
                  leftIcon={<Save className="w-4 h-4" />}
                >
                  Save Profile Changes
                </Button>
              </div>
            </div>
          </Card>

          {/* Achievements & Milestones */}
          <Card className="p-6">
            <h3 className="text-base font-bold font-serif text-[#1C1917] mb-3 pb-2 border-b border-[#EAE2D2] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#B84A22]" />
              <span>Honors, Grants & Achievements</span>
            </h3>
            <div className="space-y-2.5">
              {profile.achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#FAF8F3] border border-[#ECE5D8] text-xs text-[#44403C]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2D4A3E] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Dream Institutions & Family Details */}
        <div className="md:col-span-5 space-y-6">
          <Card className="p-6">
            <h3 className="text-base font-bold font-serif text-[#1C1917] mb-3 pb-2 border-b border-[#EAE2D2] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#2D4A3E]" />
              <span>Dream Target Institutions</span>
            </h3>
            <p className="text-xs text-[#78716C] mb-3">
              Institutions configured in your higher education application strategy.
            </p>
            <div className="space-y-2">
              {profile.dreamInstitutions.map((inst, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg border border-[#E0D7C6] bg-white text-xs font-semibold text-[#1C1917] flex items-center gap-2"
                >
                  <span className="w-5 h-5 rounded-full bg-[#EFE8DC] text-[#78716C] flex items-center justify-center text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <span>{inst}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-bold font-serif text-[#1C1917] mb-3 pb-2 border-b border-[#EAE2D2]">
              Guardian & Residential Verification
            </h3>
            <div className="space-y-3 text-xs text-[#57534E]">
              <div>
                <span className="text-[#8C6D4F] font-bold block uppercase text-[10px]">Guardian Name</span>
                <span className="text-sm font-semibold text-[#1C1917]">{profile.guardianName}</span>
              </div>
              <div>
                <span className="text-[#8C6D4F] font-bold block uppercase text-[10px]">Guardian Contact</span>
                <span className="text-[#1C1917]">{profile.guardianContact}</span>
              </div>
              <div>
                <span className="text-[#8C6D4F] font-bold block uppercase text-[10px]">Residential Center</span>
                <span className="text-[#1C1917]">{profile.center}</span>
              </div>
              <div className="pt-2 border-t border-[#EAE2D2] flex items-center gap-2 text-[11px] text-[#2D4A3E]">
                <ShieldCheck className="w-4 h-4 text-[#2D4A3E]" />
                <span>Need-based scholarship documents verified by District Magistrate.</span>
              </div>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};
