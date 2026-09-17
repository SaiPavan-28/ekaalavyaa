import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { UserRole } from '../../types';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { LogIn, KeyRound, Mail, Sparkles, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { selectedRole, login, switchRole } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const demoAccounts: { role: UserRole; email: string; label: string; name: string }[] = [
    { role: 'student', email: 'student@example.com', label: 'Student / Scholar', name: 'Arjun Das' },
    { role: 'teacher', email: 'teacher@example.com', label: 'Faculty / Teacher', name: 'Dr. Vandana Sharma' },
    { role: 'mentor', email: 'mentor@example.com', label: 'Higher Ed Mentor', name: 'Prof. Rajeshwari Sen' },
    { role: 'admin', email: 'admin@example.com', label: 'Admin Directorate', name: 'Anand Prakash' },
  ];

  const currentDemo = demoAccounts.find((d) => d.role === selectedRole) || demoAccounts[0];

  const [email, setEmail] = useState(currentDemo.email);
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState<UserRole>(selectedRole);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const ok = login(email, role);
      setLoading(false);
      if (ok) {
        showToast('Authentication Successful', `Welcome back to the ${role.toUpperCase()} portal.`);
        navigate(`/${role}/dashboard`);
      } else {
        showToast('Login failed', 'Please check your email credentials', 'error');
      }
    }, 300);
  };

  const handleQuickDemoLogin = (demo: typeof demoAccounts[0]) => {
    setEmail(demo.email);
    setRole(demo.role);
    switchRole(demo.role);
    showToast(`Loaded ${demo.name}`, `Accessing ${demo.label} workspace.`);
    navigate(`/${demo.role}/dashboard`);
  };

  return (
    <div className="w-full">
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs uppercase tracking-widest font-bold text-[#8C6D4F]">
            Sign In
          </span>
          <Link
            to="/role-selection"
            className="text-xs text-[#B84A22] font-semibold hover:underline"
          >
            Change Role ({role})
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-[#1C1917] font-serif">
          Welcome to the Portal
        </h2>
        <p className="text-xs text-[#57534E] mt-1">
          Enter your registered institutional credentials to access your dashboard.
        </p>
      </div>

      {/* 1-Click Demo Accounts Quick-Select */}
      <div className="mb-5 p-3.5 rounded-xl bg-[#F4EEE2] border border-[#E0D7C6]">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C6D4F] uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#B84A22]" />
          <span>Quick Demo Access (1-Click Fill)</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {demoAccounts.map((d) => (
            <button
              key={d.role}
              type="button"
              onClick={() => handleQuickDemoLogin(d)}
              className={`p-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                role === d.role
                  ? 'bg-white border-[#B84A22] font-semibold text-[#B84A22] shadow-2xs'
                  : 'bg-[#FAF6EE] border-[#E0D7C6] text-[#57534E] hover:bg-white'
              }`}
            >
              <div className="font-bold truncate">{d.label}</div>
              <div className="text-[10px] text-[#78716C] truncate">{d.email}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Institutional Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          leftIcon={<Mail className="w-4 h-4" />}
          placeholder="your.email@ekalavya.org"
        />

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#57534E]">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-[#8C6D4F] hover:text-[#B84A22] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            leftIcon={<KeyRound className="w-4 h-4" />}
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full shadow-sm"
            isLoading={loading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign In to {role.toUpperCase()}
          </Button>
        </div>
      </form>

      <div className="mt-6 pt-4 border-t border-[#E8E1D3] text-center text-xs text-[#57534E]">
        <span>Don't have an institutional profile? </span>
        <Link to="/register" className="font-bold text-[#B84A22] hover:underline">
          Register new student/scholar
        </Link>
      </div>
    </div>
  );
};
