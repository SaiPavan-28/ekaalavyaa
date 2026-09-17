import React, { useState } from 'react';
import { portalService } from '../../services/portalService';
import { useToast } from '../../context/ToastContext';
import { LearningCenter } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Building2, MapPin, Users, Plus, Phone, Mail } from 'lucide-react';

export const AdminCenters: React.FC = () => {
  const { showToast } = useToast();
  const [centers, setCenters] = useState(() => portalService.getLearningCenters());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New center form state
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('Jharkhand');
  const [coordinator, setCoordinator] = useState('');
  const [capacity, setCapacity] = useState(120);

  const handleAddCenter = (e: React.FormEvent) => {
    e.preventDefault();
    const newCenter: LearningCenter = {
      id: `center-${Date.now()}`,
      name,
      district,
      state,
      coordinator,
      contactEmail: 'center@ekalavya.org',
      contactPhone: '+91 98000 00000',
      studentCount: 0,
      capacity: Number(capacity),
      attendanceRate: 100,
      performanceScore: 80,
      status: 'active',
      facilities: ['Smart Classrooms', 'STEM Lab', 'Digital Library'],
    };
    setCenters((prev) => [newCenter, ...prev]);
    setIsModalOpen(false);
    showToast('Center Added', `${name} has been added to the Foundation network.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Ekalavya Learning Centers</h1>
          <p className="text-xs text-[#57534E] mt-1">
            Residential learning centers, science hubs, and rural digital classrooms.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Register New Center
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {centers.map((c) => (
          <Card key={c.id} className="flex flex-col justify-between p-6">
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <Badge variant="forest" size="sm">
                  {c.status.toUpperCase()}
                </Badge>
                <span className="text-xs font-semibold text-[#8C6D4F]">
                  {c.district}, {c.state}
                </span>
              </div>

              <h3 className="text-base font-bold font-serif text-[#1C1917] mt-1">
                {c.name}
              </h3>
              <p className="text-xs text-[#78716C] mt-0.5">Head: {c.coordinator}</p>

              <div className="mt-4 p-3 rounded-lg bg-[#FAF8F3] border border-[#ECE5D8] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Capacity Utilization:</span>
                  <strong className="text-[#1C1917]">{c.studentCount} / {c.capacity} Scholars</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Attendance Compliance:</span>
                  <strong className="text-[#2D4A3E]">{c.attendanceRate}%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Academic Benchmark:</span>
                  <strong className="text-[#B84A22]">{c.performanceScore}%</strong>
                </div>
              </div>

              <div className="mt-3">
                <span className="text-[11px] font-bold text-[#78716C] uppercase block mb-1">
                  Facilities Available
                </span>
                <div className="flex flex-wrap gap-1">
                  {c.facilities.map((f, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white border border-[#E0D7C6] text-[#57534E]">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#EAE2D2] flex justify-between items-center text-xs">
              <span className="text-[#78716C]">{c.contactPhone}</span>
              <Button variant="outline" size="sm">
                View Audit Report
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Center Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Register New Learning Center"
          subtitle="Add hub to Ekalavya Foundation state registry"
        >
          <form onSubmit={handleAddCenter} className="space-y-4">
            <Input
              label="Center Name"
              placeholder="e.g. West Singhbhum Residential Science Hub"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="District"
                placeholder="e.g. Chaibasa"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              />
              <Input
                label="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Coordinator Name"
                placeholder="e.g. Alok Murmu"
                value={coordinator}
                onChange={(e) => setCoordinator(e.target.value)}
                required
              />
              <Input
                label="Scholar Capacity"
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#EAE2D2]">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Register Center
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
