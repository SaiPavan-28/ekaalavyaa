import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { Button } from '../../components/common/Button';
import { GraduationCap, BookOpen, Compass, ShieldCheck, ArrowRight } from 'lucide-react';

export const RoleSelectionPage: React.FC = () => {
  const { selectedRole, setSelectedRole } = useAuth();
  const navigate = useNavigate();

  const roles: {
    id: UserRole;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    demoEmail: string;
  }[] = [
    {
      id: 'student',
      title: 'Student / Scholar',
      subtitle: 'Higher Ed Aspirant',
      description: 'Access enrolled courses, track test percentiles, explore fellowship opportunities, and submit university applications.',
      icon: GraduationCap,
      accentColor: 'border-[#A8432B] text-[#A8432B]',
      demoEmail: 'student@example.com',
    },
    {
      id: 'teacher',
      title: 'Faculty / Teacher',
      subtitle: 'Academic Instructor',
      description: 'Manage class batches, log daily attendance, issue problem sets, and evaluate student academic progress.',
      icon: BookOpen,
      accentColor: 'border-[#1B382B] text-[#1B382B]',
      demoEmail: 'teacher@example.com',
    },
    {
      id: 'mentor',
      title: 'Advisory Mentor',
      subtitle: 'Higher Ed Guide',
      description: 'Access Student 360° dossiers, review Statements of Purpose, schedule interview preps, and recommend university grants.',
      icon: Compass,
      accentColor: 'border-[#C58F2C] text-[#C58F2C]',
      demoEmail: 'mentor@example.com',
    },
    {
      id: 'admin',
      title: 'Administrator',
      subtitle: 'Foundation Operations',
      description: 'Oversee center operations, analyze state-wide cohorts, manage faculty allocations, and track college acceptance outcomes.',
      icon: ShieldCheck,
      accentColor: 'border-[#575147] text-[#575147]',
      demoEmail: 'admin@example.com',
    },
  ];

  const handleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleProceedLogin = () => {
    navigate('/login');
  };

  const handleProceedRegister = () => {
    navigate('/register');
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-[#8C6D4F] block">
          Step 1 of 2 // Portal Entry
        </span>
        <h2 className="text-2xl font-bold text-[#1F1D1A] font-serif mt-1 tracking-tight">
          Select Your Portal Perspective
        </h2>
        <p className="text-xs text-[#5E584E] mt-1 leading-relaxed">
          Select how you participate in the Ekalavya Foundation educational ecosystem.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {roles.map((r) => {
          const isSelected = selectedRole === r.id;
          const Icon = r.icon;

          return (
            <div
              key={r.id}
              onClick={() => handleSelect(r.id)}
              className={`p-4 rounded-xs border transition-all cursor-pointer text-left flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#A8432B] shadow-2xs ring-1 ring-[#A8432B]'
                  : 'bg-[#FAF8F3] border-[#E2DAC9] hover:border-[#BFAF98] hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-8 h-8 rounded-xs flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#A8432B] text-[#FAF7F2]'
                        : 'bg-[#EDE6D8] text-[#5E584E]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#8C6D4F]">
                    {r.subtitle}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-sm text-[#1F1D1A]">{r.title}</h3>
                <p className="text-xs text-[#5E584E] mt-1.5 leading-relaxed line-clamp-3">
                  {r.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#EDE6D8] flex items-center justify-between text-[11px]">
                <span className="text-[#7C7467]">Demo ID: {r.demoEmail}</span>
                <span className={`font-semibold ${isSelected ? 'text-[#A8432B]' : 'text-[#7C7467]'}`}>
                  {isSelected ? '✓ Selected' : 'Select'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-4 border-t border-[#E8E1D3]">
        <Button
          variant="outline"
          size="md"
          className="w-full sm:w-auto"
          onClick={handleProceedRegister}
        >
          New Scholar Registration
        </Button>
        <Button
          variant="primary"
          size="md"
          className="w-full sm:w-auto"
          onClick={handleProceedLogin}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Continue to Sign In
        </Button>
      </div>
    </div>
  );
};
