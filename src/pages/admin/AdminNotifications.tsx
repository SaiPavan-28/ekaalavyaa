import React, { useState } from 'react';
import { portalService } from '../../services/portalService';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Bell, CheckCheck } from 'lucide-react';

export const AdminNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState(() =>
    portalService.getNotifications().filter((n) => n.role === 'admin' || n.role === 'all')
  );

  const handleMarkAsRead = (id: string) => {
    portalService.markNotificationAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#1C1917]">Directorate Operational Alerts</h1>
          <p className="text-xs text-[#57534E] mt-1">
            State-level center reports, university partnership memorandums, and budget alerts.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <Card
            key={n.id}
            className={`p-4 transition-all ${
              n.read ? 'bg-[#FAF8F3] border-[#E8E1D3]' : 'bg-white border-[#B84A22]/40 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    n.read ? 'bg-[#EFE8DC] text-[#78716C]' : 'bg-[#FDF2EC] text-[#B84A22]'
                  }`}
                >
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#1C1917]">{n.title}</span>
                    {!n.read && <Badge variant="terracotta" size="sm">New</Badge>}
                  </div>
                  <p className="text-xs text-[#57534E] leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-[#8C8478] mt-2 block">{n.timestamp}</span>
                </div>
              </div>

              {!n.read && (
                <button
                  onClick={() => handleMarkAsRead(n.id)}
                  className="text-xs text-[#B84A22] hover:underline font-semibold whitespace-nowrap cursor-pointer"
                >
                  Mark read
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
