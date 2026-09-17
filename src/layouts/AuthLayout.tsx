import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { BookOpen, Award, Compass, ShieldCheck, Heart } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] bg-gradient-to-br from-[#FAF7F2] to-[#F1E8D9] flex flex-col justify-between text-[#1F1D1A] relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#8C6D4F] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 -right-20 w-80 h-80 bg-[#1B382B] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-[#A8432B] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Top Brand Bar */}
      <header className="px-6 py-5 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/40 z-10 relative">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#1B382B] to-[#2B5441] text-[#FAF7F2] flex items-center justify-center font-serif font-bold text-xl shadow-lg transition-transform group-hover:scale-105">
            E
          </div>
          <div>
            <span className="text-[10px] tracking-widest uppercase font-bold text-[#8C6D4F] block mb-0.5 opacity-80">
              First-Generation Scholar Access // Est. 2018
            </span>
            <h1 className="font-serif font-bold text-xl text-[#1F1D1A] leading-tight">
              Ekalavya Foundation
            </h1>
          </div>
        </Link>

        <div className="hidden sm:flex items-center gap-4 text-sm font-medium">
          <Link
            to="/role-selection"
            className="text-[#A8432B] hover:text-[#8a3522] transition-colors"
          >
            Role Selection
          </Link>
          <span className="text-[#D8CEBE]">•</span>
          <Link to="/login" className="text-[#5E584E] hover:text-[#1F1D1A] transition-colors">
            Sign In
          </Link>
        </div>
      </header>

      {/* Center Auth Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 z-10 relative">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 rounded-2xl glass shadow-float overflow-hidden border border-white/50">
          
          {/* Left Context Panel */}
          <div className="md:col-span-5 bg-gradient-to-b from-[#FAF6EE]/80 to-[#F4EFE7]/80 backdrop-blur-sm border-b md:border-b-0 md:border-r border-white/50 p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-white/60 rounded-full border border-white/40 mb-6">
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#8C6D4F]">
                  Educational Mission
                </span>
              </div>
              <h2 className="font-serif font-bold text-2xl lg:text-3xl text-[#1F1D1A] leading-snug tracking-tight mb-4">
                Unlocking premier higher education for first-generation scholars.
              </h2>
              <p className="text-sm text-[#5E584E] leading-relaxed mb-8">
                From rural high schools to premier institutions—IISc Bangalore, Ashoka University, Azim Premji University, and IITs. We provide dedicated faculty, personal mentors, and 100% need-based fellowship guidance.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#A8432B]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-[#A8432B]" />
                  </div>
                  <span className="text-sm text-[#3D3831] font-medium pt-1">100% Need-Based Higher Education Fellowships</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1B382B]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Compass className="w-4 h-4 text-[#1B382B]" />
                  </div>
                  <span className="text-sm text-[#3D3831] font-medium pt-1">Personalized 1-on-1 Academic Mentoring</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#8C6D4F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4 text-[#8C6D4F]" />
                  </div>
                  <span className="text-sm text-[#3D3831] font-medium pt-1">Curriculum aligned with national entrance tests</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#C58F2C]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-[#C58F2C]" />
                  </div>
                  <span className="text-sm text-[#3D3831] font-medium pt-1">Empowering tribal and rural scholars across state cohorts</span>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-5 border-t border-[#E2DAC9]/60 text-[11px] text-[#7C7467] flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#A8432B]" />
              <span className="font-medium">Supported by philanthropists, educators & university alumni.</span>
            </div>
          </div>

          {/* Right Form Area */}
          <div className="md:col-span-7 p-8 lg:p-12 bg-white/80 backdrop-blur-md flex flex-col justify-center">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-5 px-6 text-center text-xs font-medium text-[#7C7467] border-t border-white/40 z-10 relative bg-[#FAF7F2]/50 backdrop-blur-sm">
        <p>© 2026 Ekalavya Foundation. Dedicated to educational equity, dignity, and academic rigor.</p>
      </footer>
    </div>
  );
};
