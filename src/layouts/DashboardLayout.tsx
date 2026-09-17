import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { portalService } from '../services/portalService';
import { UserRole } from '../types';
import {
  BookOpen,
  GraduationCap,
  Calendar,
  FileText,
  CheckSquare,
  Award,
  Compass,
  Bell,
  User,
  Users,
  BarChart3,
  Layers,
  Building2,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  ChevronDown,
  ArrowRightLeft,
  Megaphone,
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const DashboardLayout: React.FC = () => {
  const { currentUser, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = portalService.getNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const currentRole = currentUser?.role || 'student';

  const roleNavItems: Record<UserRole, NavItem[]> = {
    student: [
      { label: 'Scholar Overview', path: '/student/dashboard', icon: BarChart3 },
      { label: 'Enrolled Courses', path: '/student/courses', icon: BookOpen },
      { label: 'Attendance Record', path: '/student/attendance', icon: Calendar },
      { label: 'Problem Sets & Tasks', path: '/student/assignments', icon: FileText },
      { label: 'Mock Benchmarks', path: '/student/tests', icon: CheckSquare },
      { label: 'Scorecards & Results', path: '/student/results', icon: Award },
      { label: 'University Fellowships', path: '/student/opportunities', icon: Compass, badge: 'Curated' },
      { label: 'Applications Tracker', path: '/student/applications', icon: GraduationCap },
      { label: 'Scholar Dossier', path: '/student/profile', icon: User },
      { label: 'Circular Notices', path: '/student/notifications', icon: Bell },
    ],
    teacher: [
      { label: 'Faculty Dashboard', path: '/teacher/dashboard', icon: BarChart3 },
      { label: 'Class Batches', path: '/teacher/classes', icon: Layers },
      { label: 'Student Directory', path: '/teacher/students', icon: Users },
      { label: 'Roll Call Register', path: '/teacher/attendance', icon: Calendar },
      { label: 'Problem Sets', path: '/teacher/assignments', icon: FileText },
      { label: 'Diagnostic Tests', path: '/teacher/tests', icon: CheckSquare },
      { label: 'Cohort Benchmarks', path: '/teacher/analytics', icon: Award },
      { label: 'Faculty Notices', path: '/teacher/notifications', icon: Bell },
    ],
    mentor: [
      { label: 'Advisory Overview', path: '/mentor/dashboard', icon: BarChart3 },
      { label: 'Mentees & Scholars', path: '/mentor/mentees', icon: Users },
      { label: 'Advisory Clinics', path: '/mentor/sessions', icon: Calendar },
      { label: 'Admission Pipeline', path: '/mentor/applications', icon: GraduationCap },
      { label: 'Endorsements & LoR', path: '/mentor/recommendations', icon: Compass },
      { label: 'Advisory Alerts', path: '/mentor/notifications', icon: Bell },
    ],
    admin: [
      { label: 'Directorate Control', path: '/admin/dashboard', icon: BarChart3 },
      { label: 'Learning Centers', path: '/admin/centers', icon: Building2 },
      { label: 'Personnel & Scholars', path: '/admin/users', icon: Users },
      { label: 'State Cohorts', path: '/admin/cohorts', icon: GraduationCap },
      { label: 'State-wide Outcomes', path: '/admin/analytics', icon: Award },
      { label: 'Foundation Circulars', path: '/admin/announcements', icon: Megaphone },
      { label: 'Directorate Settings', path: '/admin/settings', icon: Settings },
      { label: 'System Circulars', path: '/admin/notifications', icon: Bell },
    ],
  };

  const navItems = roleNavItems[currentRole] || roleNavItems.student;

  const handleRoleSwitch = (role: UserRole) => {
    switchRole(role);
    setRoleSwitcherOpen(false);
    navigate(`/${role}/dashboard`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleBadgeMap: Record<UserRole, { title: string; color: string; border: string }> = {
    student: { title: 'Scholar Fellowship Track', color: 'bg-[#FDF2EE] text-[#A8432B]', border: 'border-[#F1D3C9]' },
    teacher: { title: 'Academic Faculty Directorate', color: 'bg-[#EBF3EE] text-[#1B382B]', border: 'border-[#C2D9CD]' },
    mentor: { title: 'Higher Ed Advisory Cell', color: 'bg-[#FEF8EC] text-[#9B6D1B]', border: 'border-[#F5E0B3]' },
    admin: { title: 'Foundation State Ops', color: 'bg-[#F2ECE0] text-[#47423B]', border: 'border-[#DFD5C2]' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] to-[#F1E8D9] flex flex-col md:flex-row text-[#1F1D1A] antialiased relative">
      
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8C6D4F] rounded-full mix-blend-multiply filter blur-[100px] opacity-[0.05] pointer-events-none z-0"></div>

      {/* Mobile Top Header */}
      <header className="md:hidden glass border-b border-white/40 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1B382B] to-[#2B5441] text-[#FAF7F2] flex items-center justify-center font-serif font-bold text-sm shadow-md flex-shrink-0">
            E
          </div>
          <div className="min-w-0">
            <h1 className="font-serif font-bold text-sm text-[#1F1D1A] leading-none truncate">
              Ekalavya Foundation
            </h1>
            <span className="text-[10px] text-[#7C7467] uppercase tracking-widest font-semibold">
              {roleBadgeMap[currentRole].title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
            className="h-8 px-2.5 rounded-lg border border-white/60 bg-white/50 text-xs font-semibold text-[#443E35] flex items-center gap-1.5 cursor-pointer shadow-sm"
            title="Switch Role"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#A8432B]" />
            <span className="capitalize">{currentRole}</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 rounded-lg border border-white/60 bg-white/50 flex items-center justify-center text-[#443E35] cursor-pointer shadow-sm"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Desktop & Mobile Sidebar - Polished Glassmorphism Layout */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-68 glass border-r border-white/50 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen md:sticky md:top-0 shadow-float ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Institutional Masthead */}
          <div className="p-5 border-b border-white/40 bg-white/30 backdrop-blur-md relative overflow-hidden">
            <div className="flex items-start gap-3 relative z-10">
              <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#1B382B] to-[#2B5441] text-[#FAF7F2] flex items-center justify-center font-serif font-bold text-xl shadow-lg flex-shrink-0">
                E
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <span className="text-[9px] tracking-widest uppercase font-bold text-[#8C6D4F] block opacity-80">
                  Est. 2018 // Higher Ed
                </span>
                <h2 className="font-serif font-bold text-[15px] text-[#1F1D1A] tracking-tight truncate leading-tight mt-0.5">
                  Ekalavya Foundation
                </h2>
              </div>
            </div>

            {/* Active Academic Credential Badge */}
            <div className="mt-4 pt-3 border-t border-white/50 flex items-center justify-between relative z-10">
              <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-md border shadow-sm ${roleBadgeMap[currentRole].color} ${roleBadgeMap[currentRole].border}`}>
                {roleBadgeMap[currentRole].title}
              </span>
              <button
                onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                className="text-[10px] text-[#A8432B] hover:text-[#88341F] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                Switch
              </button>
            </div>
          </div>

          {/* Editorial Navigation Links */}
          <nav className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto">
            <div className="px-2 pb-3 text-[10px] font-bold uppercase tracking-widest text-[#8C8477]">
              Academic Dossier & Modules
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 group ${
                      isActive
                        ? 'bg-white shadow-sm text-[#1B382B] border border-white/60'
                        : 'text-[#5A5348] hover:bg-white/50 hover:text-[#1F1D1A] border border-transparent'
                    }`
                  }
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${
                       window.location.pathname === item.path ? 'text-[#A8432B]' : 'text-[#8C6D4F] group-hover:text-[#A8432B]'
                    }`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-gradient-to-r from-[#A8432B] to-[#C5533A] text-white flex-shrink-0 shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Sidebar Footer - Scholar Credentials */}
          <div className="p-4 border-t border-white/40 bg-white/20 backdrop-blur-md">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/80 border border-white/60 shadow-sm hover:shadow-md transition-shadow">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={currentUser?.name || 'User'}
                className="w-9 h-9 rounded-lg object-cover border border-[#D5CBB8] flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#1F1D1A] truncate leading-tight">
                  {currentUser?.name}
                </p>
                <p className="text-[10px] text-[#7C7467] truncate mt-0.5">{currentUser?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-7 h-7 flex items-center justify-center text-[#7C7467] hover:text-[#991B1B] hover:bg-red-50 rounded-md transition-colors cursor-pointer flex-shrink-0"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:h-screen md:overflow-y-auto relative z-10">
        
        {/* Top Desktop Navigation Bar */}
        <header className="hidden md:flex glass border-b border-white/50 px-8 py-3 items-center justify-between sticky top-0 z-20 shadow-sm">
          {/* Institutional Catalog Search */}
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full group">
              <Search className="w-4 h-4 text-[#8C8477] group-focus-within:text-[#A8432B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
              <input
                type="text"
                placeholder="Search admissions, fellowships, problem sets..."
                className="w-full h-9 pl-9 pr-4 text-xs bg-white/70 border border-white/60 rounded-lg text-[#1F1D1A] placeholder-[#8C8477] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A8432B]/20 focus:border-[#A8432B]/50 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Right actions: Role Quick Switcher, Notification, Campus Info */}
          <div className="flex items-center gap-4">
            
            <div className="flex items-center gap-3 pr-4 border-r border-black/10">
              {/* Quick Role Switcher Button */}
              <div className="relative">
                <button
                  onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                  className="h-9 flex items-center gap-2 px-3.5 rounded-lg border border-white/60 bg-white/70 text-xs font-semibold text-[#443E35] hover:bg-white transition-all cursor-pointer shadow-sm"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5 text-[#A8432B]" />
                  <span>Persona: <strong className="capitalize text-[#1B382B]">{currentRole}</strong></span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#7C7467]" />
                </button>

                {roleSwitcherOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-[#DDD4C3] rounded-xl shadow-float p-1.5 z-50">
                    <div className="px-2.5 py-2 border-b border-black/5 mb-1">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-[#8C6D4F]">
                        Switch Perspective
                      </p>
                    </div>
                    {(['student', 'teacher', 'mentor', 'admin'] as UserRole[]).map((r) => (
                      <button
                        key={r}
                        onClick={() => handleRoleSwitch(r)}
                        className={`flex w-full items-center justify-between px-3 py-2 text-xs rounded-lg font-medium cursor-pointer transition-colors ${
                          currentRole === r
                            ? 'bg-orange-50 text-[#A8432B] font-bold'
                            : 'text-[#443E35] hover:bg-black/5'
                        }`}
                      >
                        <span className="capitalize">{r}</span>
                        {currentRole === r && <span className="w-1.5 h-1.5 rounded-full bg-[#A8432B]"></span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/60 bg-white/70 text-[#575147] hover:bg-white hover:text-[#A8432B] transition-all shadow-sm relative cursor-pointer"
                  title="Circular Notices"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#A8432B] ring-2 ring-white" />
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-[#DDD4C3] rounded-xl shadow-float p-3 z-50">
                    <div className="flex items-center justify-between pb-2.5 border-b border-black/5 mb-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#1F1D1A]">
                        Circulars ({unreadCount} new)
                      </h4>
                      <NavLink
                        to={`/${currentRole}/notifications`}
                        onClick={() => setNotificationsOpen(false)}
                        className="text-[11px] text-[#A8432B] hover:underline font-semibold"
                      >
                        View All
                      </NavLink>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {notifications.slice(0, 3).map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 rounded-lg border text-left text-xs transition-colors ${
                            n.read ? 'bg-white border-[#EAE2D2]' : 'bg-orange-50/50 border-orange-100/50 font-medium'
                          }`}
                        >
                          <p className="font-semibold text-[#1F1D1A] text-[11px] leading-tight">{n.title}</p>
                          <p className="text-[11px] text-[#5A5348] line-clamp-2 mt-1">{n.message}</p>
                          <span className="text-[10px] text-[#8C8477] mt-1.5 block">{n.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Campus Info Card */}
            <div className="flex flex-col justify-center text-left">
              <p className="text-xs font-bold text-[#1F1D1A] truncate max-w-[200px] leading-tight font-serif">
                {currentUser?.center || 'Ranchi Academic Hub'}
              </p>
              <p className="text-[10px] text-[#7C7467] mt-0.5">Session 2025–26 // Directorate</p>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};
