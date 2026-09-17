import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { portalService } from '../../services/portalService';
import { useToast } from '../../context/ToastContext';
import { Opportunity } from '../../types';
import { OpportunityCard } from '../../components/common/OpportunityCard';
import { Compass, Search } from 'lucide-react';

export const StudentOpportunities: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const opportunities = portalService.getOpportunities();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [savedIds, setSavedIds] = useState<string[]>(['opp-1', 'opp-2']);

  const types = ['all', 'University', 'Fellowship', 'Scholarship', 'Premier Entrance'];

  const handleToggleSave = (oppId: string) => {
    setSavedIds((prev) => {
      const exists = prev.includes(oppId);
      const next = exists ? prev.filter((id) => id !== oppId) : [...prev, oppId];
      showToast(
        exists ? 'Removed from Saved' : 'Opportunity Saved',
        exists ? 'Item removed from your bookmarks.' : 'Bookmarked for higher education planning.'
      );
      return next;
    });
  };

  const handleApplyOrTrack = (opp: Opportunity) => {
    portalService.addApplicationFromOpportunity(opp);
    showToast('Application Initialized', `Added ${opp.name} to your application journey.`);
    navigate('/student/applications');
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === 'all' || opp.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      {/* Editorial Header Banner */}
      <div className="p-6 sm:p-8 rounded-xs bg-[#FAF6EE] border border-[#E2DAC9]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-white text-[#8C6D4F] border border-[#E5DECf] text-[11px] font-bold uppercase tracking-widest mb-3">
            <Compass className="w-3.5 h-3.5 text-[#1B382B]" />
            <span>Higher Education Access Directorate</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#1F1D1A] tracking-tight">
            Universities, Fellowships & National Entrances
          </h1>
          <p className="text-xs sm:text-sm text-[#5E584E] mt-2.5 leading-relaxed">
            Every opportunity listed below offers <strong>100% need-based grants</strong>, full tuition waivers, or dedicated rural and first-generation scholar quotas. Supported through institutional partnerships and philanthropic endowments.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mt-6 pt-5 border-t border-[#E5DECf] flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-[#8C6D4F] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by college, fellowship, discipline, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-4 text-xs bg-white border border-[#D5CBB8] rounded-xs text-[#1F1D1A] placeholder-[#8C8477] focus:outline-none focus:ring-1 focus:ring-[#A8432B]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`h-8.5 px-3 rounded-xs text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                  selectedType === t
                    ? 'bg-[#1B382B] text-[#FAF7F2]'
                    : 'bg-white border border-[#D5CBB8] text-[#5E584E] hover:bg-[#FAF6EE] hover:text-[#1F1D1A]'
                }`}
              >
                {t === 'all' ? 'All Disciplines' : t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count & Meta */}
      <div className="flex items-center justify-between text-xs text-[#6E675D] px-1 border-b border-[#EAE2D4] pb-2">
        <span>Curated Catalog: <strong>{filteredOpportunities.length}</strong> verified opportunities</span>
        <span>Discipline Filter: <strong>{selectedType === 'all' ? 'All' : selectedType}</strong></span>
      </div>

      {/* Opportunity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map((opp) => (
          <OpportunityCard
            key={opp.id}
            opportunity={opp}
            isSaved={savedIds.includes(opp.id)}
            onToggleSave={handleToggleSave}
            onApplyOrTrack={handleApplyOrTrack}
          />
        ))}
      </div>
    </div>
  );
};
