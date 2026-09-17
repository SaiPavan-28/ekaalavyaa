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
  Sparkles,
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
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col md:flex-row text-[#1F1D1A] antialiased">
      {/* Mobile Top Header */}
      <header className="md:hidden bg-[#FAF6EE] border-b border-[#E2DAC9] px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xs bg-[#1B382B] text-[#FAF7F2] flex items-center justify-center font-serif font-bold text-sm border border-[#2B5441] flex-shrink-0">
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
            className="h-8 px-2.5 rounded-xs border border-[#D5CBB8] bg-white text-xs font-semibold text-[#443E35] flex items-center gap-1.5 cursor-pointer"
            title="Switch Role"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#A8432B]" />
            <span className="capitalize">{currentRole}</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 rounded-xs border border-[#D5CBB8] bg-white flex items-center justify-center text-[#443E35] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Desktop & Mobile Sidebar - Editorial Stationery Layout */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-68 bg-[#FAF6EE] border-r border-[#E2DAC9] flex flex-col justify-between transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:h-screen md:sticky md:top-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Institutional Masthead */}
          <div className="p-5 border-b border-[#E2DAC9] bg-[#F4EEE2]/70">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xs bg-[#1B382B] text-[#FAF7F2] flex items-center justify-center font-serif font-bold text-lg border border-[#274E3C] shadow-2xs flex-shrink-0">
                E
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] tracking-widest uppercase font-bold text-[#8C6D4F] block">
                  Est. 2018 // Higher Ed
                </span>
                <h2 className="font-serif font-bold text-base text-[#1F1D1A] tracking-tight truncate leading-tight">
                  Ekalavya Foundation
                </h2>
                <p className="text-[11px] text-[#7C7467] truncate mt-0.5">First-Generation Scholar Access</p>
              </div>
            </div>

            {/* Active Academic Credential Badge */}
            <div className="mt-3.5 pt-3 border-t border-[#E5DECf] flex items-center justify-between">
              <span className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-xs border ${roleBadgeMap[currentRole].color} ${roleBadgeMap[currentRole].border}`}>
                {roleBadgeMap[currentRole].title}
              </span>
              <button
                onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                className="text-[11px] text-[#A8432B] hover:text-[#88341F] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
              >
                Change Role
              </button>
            </div>
          </div>

          {/* Editorial Navigation Links */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-[#8C8477]">
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
                    `flex items-center justify-between px-3 py-2 rounded-xs text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#EFE8DC] text-[#1F1D1A] border-l-3 border-l-[#1B382B] border-y border-r border-[#DFD5C3]'
                        : 'text-[#5A5348] hover:bg-[#F2ECE0] hover:text-[#1F1D1A] border border-transparent'
                    }`
                  }
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className="w-4 h-4 text-[#8C6D4F] flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-xs bg-[#A8432B] text-[#FAF7F2] flex-shrink-0">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Sidebar Footer - Scholar Credentials */}
          <div className="p-3 border-t border-[#E2DAC9] bg-[#F4EEE2]/70">
            <div className="flex items-center gap-3 p-2 rounded-xs bg-white border border-[#E2DAC9]">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={currentUser?.name || 'User'}
                className="w-8 h-8 rounded-xs object-cover border border-[#D5CBB8] flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#1F1D1A] truncate leading-tight font-serif">
                  {currentUser?.name}
                </p>
                <p className="text-[10px] text-[#7C7467] truncate mt-0.5">{currentUser?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-[#7C7467] hover:text-[#991B1B] hover:bg-[#FAF6EE] rounded-xs transition-colors cursor-pointer flex-shrink-0"
                title="Sign out"
                aria-label="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area with Crisp Editorial Shell */}
      <div className="flex-1 flex flex-col min-w-0 md:h-screen md:overflow-y-auto">
        {/* Top Desktop Navigation Bar */}
        <header className="hidden md:flex bg-[#FAF6EE] border-b border-[#E2DAC9] px-8 py-3 items-center justify-between sticky top-0 z-20 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
          {/* Institutional Catalog Search */}
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#8C6D4F] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search university admissions, fellowships, courses, problem sets..."
                className="w-full h-8.5 pl-9 pr-4 text-xs bg-white border border-[#D5CBB8] rounded-xs text-[#1F1D1A] placeholder-[#8C8477] focus:outline-none focus:ring-1 focus:ring-[#A8432B] transition-all"
              />
            </div>
          </div>

          {/* Right actions: Role Quick Switcher, Notification, Campus Info */}
          <div className="flex items-center gap-3">
            {/* Quick Role Switcher Button */}
            <div className="relative">
              <button
                onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                className="h-8.5 flex items-center gap-2 px-3 rounded-xs border border-[#D5CBB8] bg-white text-xs font-semibold text-[#443E35] hover:bg-[#FAF6EE] transition-colors cursor-pointer"
              >
                <ArrowRightLeft className="w-3.5 h-3.5 text-[#A8432B]" />
                <span>Persona: <strong className="capitalize">{currentRole}</strong></span>
                <ChevronDown className="w-3.5 h-3.5 text-[#7C7467]" />
              </button>

              {roleSwitcherOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#DDD4C3] rounded-xs shadow-md p-1.5 z-50">
                  <div className="px-2.5 py-1.5 border-b border-[#EBE3D3] mb-1">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[#8C6D4F]">
                      Switch Perspective
                    </p>
                  </div>
                  {(['student', 'teacher', 'mentor', 'admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRoleSwitch(r)}
                      className={`flex w-full items-center justify-between px-3 py-2 text-xs rounded-xs font-medium cursor-pointer transition-colors ${
                        currentRole === r
                          ? 'bg-[#F2ECE0] text-[#A8432B] font-bold'
                          : 'text-[#443E35] hover:bg-[#FAF6EE]'
                      }`}
                    >
                      <span className="capitalize">{r}</span>
                      {currentRole === r && <span className="text-[10px] text-[#A8432B] font-bold">Active</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="w-8.5 h-8.5 flex items-center justify-center rounded-xs border border-[#D5CBB8] bg-white text-[#575147] hover:bg-[#FAF6EE] transition-colors relative cursor-pointer"
                title="Circular Notices"
                aria-label="Circular Notices"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#A8432B]" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-[#DDD4C3] rounded-xs shadow-lg p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-[#EBE3D3] mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#1F1D1A] font-serif">
                      Circular Notices ({unreadCount} new)
                    </h4>
                    <NavLink
                      to={`/${currentRole}/notifications`}
                      onClick={() => setNotificationsOpen(false)}
                      className="text-[11px] text-[#A8432B] hover:underline font-semibold"
                    >
                      View All
                    </NavLink>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.slice(0, 3).map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xs border text-left text-xs ${
                          n.read ? 'bg-[#FAF7F0] border-[#EAE2D2]' : 'bg-[#FAF6EE] border-[#DDD4C3] font-medium'
                        }`}
                      >
                        <p className="font-semibold text-[#1F1D1A] text-[11px]">{n.title}</p>
                        <p className="text-[11px] text-[#5A5348] line-clamp-2 mt-0.5">{n.message}</p>
                        <span className="text-[10px] text-[#8C8477] mt-1 block">{n.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Campus Info Card */}
            <div className="pl-3.5 border-l border-[#E2DAC9] flex flex-col justify-center text-left">
              <p className="text-xs font-bold text-[#1F1D1A] truncate max-w-[200px] leading-tight font-serif">
                {currentUser?.center || 'Ranchi Academic Hub'}
              </p>
              <p className="text-[10px] text-[#7C7467] mt-0.5">Session 2025–26 // State Directorate</p>
            </div>
          </div>
        </header>

        {/* Page Content Viewport with generous, clean editorial whitespace */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};
