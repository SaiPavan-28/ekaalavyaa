import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { BookOpen, Award, Compass, ShieldCheck, Heart } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-between text-[#1F1D1A]">
      {/* Top Simple Brand Bar */}
      <header className="px-6 py-5 max-w-6xl mx-auto w-full flex items-center justify-between border-b border-[#E8E1D3]">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xs bg-[#1B382B] text-[#FAF7F2] flex items-center justify-center font-serif font-bold text-lg border border-[#2B5441]">
            E
          </div>
          <div>
            <span className="text-[10px] tracking-widest uppercase font-bold text-[#8C6D4F] block">
              First-Generation Scholar Access // Est. 2018
            </span>
            <h1 className="font-serif font-bold text-lg text-[#1F1D1A] leading-tight">
              Ekalavya Foundation
            </h1>
          </div>
        </Link>

        <div className="flex items-center gap-3 text-xs text-[#7C7467]">
          <Link
            to="/role-selection"
            className="font-semibold text-[#A8432B] hover:underline"
          >
            Role Selection
          </Link>
          <span>•</span>
          <Link to="/login" className="hover:text-[#1F1D1A]">
            Sign In
          </Link>
        </div>
      </header>

      {/* Center Auth Card with mission highlight */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 rounded-xs border border-[#E2DAC9] bg-white shadow-[0_1px_3px_rgba(28,25,23,0.04)] overflow-hidden">
          {/* Left Context Panel (Earthy Educational Identity) */}
          <div className="md:col-span-5 bg-[#FAF6EE] border-b md:border-b-0 md:border-r border-[#E2DAC9] p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-[#8C6D4F] block mb-2">
                Educational Mission
              </span>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#1F1D1A] leading-snug tracking-tight">
                Unlocking premier higher education for first-generation scholars.
              </h2>
              <p className="text-xs text-[#5E584E] mt-3 leading-relaxed">
                From rural high schools to premier institutions—IISc Bangalore, Ashoka University, Azim Premji University, and IITs. We provide dedicated faculty, personal mentors, and 100% need-based fellowship guidance.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2.5 text-xs text-[#3D3831]">
                  <Award className="w-4 h-4 text-[#A8432B] flex-shrink-0" />
                  <span>100% Need-Based Higher Education Fellowships</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#3D3831]">
                  <Compass className="w-4 h-4 text-[#1B382B] flex-shrink-0" />
                  <span>Personalized 1-on-1 Academic Mentoring</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#3D3831]">
                  <BookOpen className="w-4 h-4 text-[#8C6D4F] flex-shrink-0" />
                  <span>Curriculum aligned with national entrance tests</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#3D3831]">
                  <ShieldCheck className="w-4 h-4 text-[#C58F2C] flex-shrink-0" />
                  <span>Empowering tribal and rural scholars across state cohorts</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E2DAC9] text-[11px] text-[#7C7467] flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-[#A8432B]" />
              <span>Supported by philanthropists, educators & university alumni.</span>
            </div>
          </div>

          {/* Right Form Area */}
          <div className="md:col-span-7 p-6 md:p-8 bg-white flex flex-col justify-center">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 text-center text-xs text-[#7C7467] border-t border-[#E8E1D3]">
        <p>© 2026 Ekalavya Foundation. Dedicated to educational equity, dignity, and academic rigor.</p>
      </footer>
    </div>
  );
};
