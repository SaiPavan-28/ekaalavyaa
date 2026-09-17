import React, { useState } from 'react';
import { portalService } from '../../services/portalService';
import { User, UserRole } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/common/Table';
import { Search, UserCheck, ShieldCheck, Mail, Phone, Filter } from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const users = portalService.getUsers();
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = users.filter((u) => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.center && u.center.toLowerCase().includes(search.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'student':
        return <Badge variant="forest" size="sm">Scholar</Badge>;
      case 'teacher':
        return <Badge variant="terracotta" size="sm">Faculty</Badge>;
      case 'mentor':
        return <Badge variant="ochre" size="sm">Mentor</Badge>;
      case 'admin':
        return <Badge variant="stone" size="sm">Admin</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1C1917]">User Identity & Role Access Directory</h1>
          <p className="text-xs text-[#57534E] mt-1">
            Manage institutional access for scholars, academic faculty, advisory mentors, and foundation directors.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-[#8C6D4F] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, or center..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-[#DDD4C3] rounded-lg text-[#1C1917] placeholder-[#8C8478] focus:outline-none focus:ring-2 focus:ring-[#B84A22]"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
          {['all', 'student', 'teacher', 'mentor', 'admin'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize cursor-pointer whitespace-nowrap transition-colors ${
                roleFilter === r
                  ? 'bg-[#B84A22] text-white shadow-2xs'
                  : 'bg-white border border-[#DDD4C3] text-[#57534E] hover:bg-[#FAF6EE]'
              }`}
            >
              {r === 'all' ? 'All Roles' : r}
            </button>
          ))}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>System Role</TableHead>
            <TableHead>Contact Email</TableHead>
            <TableHead>Learning Center Hub</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((u) => (
            <TableRow key={u.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#D5CBB9]"
                  />
                  <div>
                    <span className="font-bold text-xs text-[#1C1917] block">{u.name}</span>
                    <span className="text-[10px] text-[#78716C]">{u.phone || '—'}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {getRoleBadge(u.role)}
              </TableCell>
              <TableCell className="font-mono text-xs text-[#57534E]">
                {u.email}
              </TableCell>
              <TableCell className="text-xs text-[#57534E]">
                {u.center || 'Directorate HQ'}
              </TableCell>
              <TableCell>
                <Badge variant="forest" size="sm" dot>
                  Active
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
