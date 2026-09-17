import React, { useState } from 'react';
import { portalService } from '../../services/portalService';
import { useToast } from '../../context/ToastContext';
import { Announcement } from '../../types';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Megaphone, Plus, Bell, Calendar, UserCheck } from 'lucide-react';

export const AdminAnnouncements: React.FC = () => {
  const { showToast } = useToast();
  const [announcements, setAnnouncements] = useState<Announcement[]>(() =>
    portalService.getAnnouncements()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New announcement form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetRole, setTargetRole] = useState<'all' | 'student' | 'teacher' | 'mentor'>('all');
  const [priority, setPriority] = useState<'normal' | 'urgent'>('normal');

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnn = portalService.createAnnouncement({
      title,
      content,
      targetRole,
      priority,
      author: 'Foundation Directorate Office',
    });
    setAnnouncements((prev) => [newAnn, ...prev]);
    setIsModalOpen(false);
    setTitle('');
    setContent('');
    showToast('Circular Broadcasted', `Dispatched to ${targetRole.toUpperCase()} portal users.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Foundation Announcements & Circulars</h1>
          <p className="text-xs text-[#57534E] mt-1">
            Publish official notices, academic circulars, and residential guidelines.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          New Broadcast Circular
        </Button>
      </div>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <Card key={ann.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={ann.priority === 'urgent' ? 'danger' : 'stone'} size="sm">
                    {ann.priority.toUpperCase()}
                  </Badge>
                  <span className="text-[11px] font-bold text-[#8C6D4F] uppercase bg-[#EFE8DC] px-2 py-0.5 rounded">
                    Audience: {ann.targetRole}
                  </span>
                  <span className="text-xs text-[#78716C]">{ann.date}</span>
                </div>

                <h3 className="text-base font-bold font-serif text-[#1C1917]">
                  {ann.title}
                </h3>
                <p className="text-xs text-[#57534E] mt-2 leading-relaxed">
                  {ann.content}
                </p>

                <span className="text-[11px] text-[#78716C] mt-3 block">
                  Author: <strong>{ann.author}</strong>
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Broadcast Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Broadcast Official Circular"
          subtitle="Dispatches notification across portal accounts"
        >
          <form onSubmit={handleBroadcast} className="space-y-4">
            <Input
              label="Circular Title"
              placeholder="e.g. Schedule for All-India Grand Mock Test 4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Target Audience"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value as any)}
                options={[
                  { value: 'all', label: 'All Users (Foundation Wide)' },
                  { value: 'student', label: 'Students Only' },
                  { value: 'teacher', label: 'Faculty Only' },
                  { value: 'mentor', label: 'Advisory Mentors Only' },
                ]}
              />

              <Select
                label="Priority Level"
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                options={[
                  { value: 'normal', label: 'Normal Bulletin' },
                  { value: 'urgent', label: 'Urgent Circular' },
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1.5">
                Notice Content
              </label>
              <textarea
                rows={4}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Full text of the foundation memorandum..."
                className="w-full rounded-lg border border-[#D5CBB9] bg-white p-3 text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#B84A22]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#EAE2D2]">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Broadcast Circular
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
