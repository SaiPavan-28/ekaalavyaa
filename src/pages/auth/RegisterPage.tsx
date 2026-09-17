import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { UserRole } from '../../types';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { UserPlus, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { selectedRole, register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>(selectedRole || 'student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [center, setCenter] = useState('Ranchi Learning Center, Jharkhand');
  const [stream, setStream] = useState('Science (STEM / Engineering / Medical)');
  const [loading, setLoading] = useState(false);

  const centers = [
    'Ranchi Learning Center, Jharkhand',
    'Bhubaneswar Academic Hub, Odisha',
    'Dumka Residential Learning Center',
    'Khunti Rural Preparation Center',
    'Mayurbhanj Tribal Scholar Center',
    'Hazaribagh Science Academy',
  ];

  const streams = [
    'Science (STEM / Pure Sciences / IISc)',
    'Medical & Life Sciences (NEET Track)',
    'Humanities & Social Sciences (APU / TISS)',
    'Commerce & Mathematical Economics',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const ok = register({
        name,
        email,
        role,
        phone,
        center,
      });
      setLoading(false);
      if (ok) {
        showToast('Registration Successful', `Account created for ${name}. Welcome!`);
        navigate(`/${role}/dashboard`);
      } else {
        showToast('Registration Error', 'Unable to create user profile.', 'error');
      }
    }, 400);
  };

  return (
    <div className="w-full">
      <div className="mb-5">
        <Link
          to="/role-selection"
          className="inline-flex items-center gap-1.5 text-xs text-[#8C6D4F] hover:text-[#B84A22] font-semibold mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Role Selection</span>
        </Link>
        <h2 className="text-2xl font-bold text-[#1C1917] font-serif">
          Ekalavya Scholar Registration
        </h2>
        <p className="text-xs text-[#57534E] mt-1">
          Apply for enrollment into academic coaching and higher education mentorship.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <Select
          label="Portal Persona"
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
          options={[
            { value: 'student', label: 'Student / Scholar' },
            { value: 'teacher', label: 'Faculty / Teacher' },
            { value: 'mentor', label: 'Higher Education Mentor' },
            { value: 'admin', label: 'Administrator' },
          ]}
        />

        <Input
          label="Full Legal Name"
          placeholder="e.g. Ramesh Chandra Murmu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Email Address"
            type="email"
            placeholder="scholar@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+91 98000 00000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <Select
          label="Learning Center / Hub"
          value={center}
          onChange={(e) => setCenter(e.target.value)}
          options={centers}
        />

        {role === 'student' && (
          <Select
            label="Target Academic Stream"
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            options={streams}
          />
        )}

        <div className="p-3 rounded-lg bg-[#F4EEE2] border border-[#E0D7C6] text-xs text-[#57534E] flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#2D4A3E] flex-shrink-0 mt-0.5" />
          <span>
            By registering, you confirm participation in foundation attendance policies, academic honesty pledges, and fellowship tracking.
          </span>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={loading}
          leftIcon={<UserPlus className="w-4 h-4" />}
        >
          Complete Registration
        </Button>
      </form>

      <div className="mt-5 pt-3 border-t border-[#E8E1D3] text-center text-xs text-[#57534E]">
        <span>Already have an account? </span>
        <Link to="/login" className="font-bold text-[#B84A22] hover:underline">
          Sign In here
        </Link>
      </div>
    </div>
  );
};
