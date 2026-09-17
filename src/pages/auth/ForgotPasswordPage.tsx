import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-5">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs text-[#8C6D4F] hover:text-[#B84A22] font-semibold mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>
        <h2 className="text-2xl font-bold text-[#1C1917] font-serif">
          Password Recovery
        </h2>
        <p className="text-xs text-[#57534E] mt-1">
          Provide your institutional email and we will dispatch a reset link and notify your center coordinator.
        </p>
      </div>

      {submitted ? (
        <div className="p-4 rounded-xl bg-[#EAF2ED] border border-[#C8DFCE] text-[#2D4A3E] space-y-3">
          <div className="flex items-center gap-2 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-[#2D4A3E]" />
            <span>Recovery Link Dispatched</span>
          </div>
          <p className="text-xs leading-relaxed text-[#1F3A2F]">
            We sent instructions to <strong>{email}</strong>. If you are in a residential center without direct inbox access, please contact your local warden or academic coordinator.
          </p>
          <div className="pt-2">
            <Link to="/login">
              <Button variant="outline" size="sm">
                Return to Login
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Registered Institutional Email"
            type="email"
            placeholder="student@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            leftIcon={<Mail className="w-4 h-4" />}
          />

          <Button type="submit" variant="primary" size="lg" className="w-full">
            Send Reset Instructions
          </Button>
        </form>
      )}
    </div>
  );
};
