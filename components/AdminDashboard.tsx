
import React, { useState } from 'react';
import { LogOut, Folder, Users, Filter, ChevronRight, LayoutDashboard } from 'lucide-react';
import { Application, Screen } from '../types';

interface AdminDashboardProps {
  applications: Application[];
  onSelectApp: (id: string) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ applications, onSelectApp, onLogout }) => {
  const [filter, setFilter] = useState<'ALL' | Screen>('ALL');

  const filteredApps = filter === 'ALL' 
    ? applications 
    : applications.filter(app => app.type === filter);

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'Em análise').length,
    approved: applications.filter(a => a.status === 'Aprovado').length
  };

  return (
    <div className="flex flex-col min-h-screen animate-in fade-in duration-300">
      <div className="p-4 bg-zinc-950 border-b border-zinc-900 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="text-[#ff8c00]" size={20} />
          <h2 className="font-black text-sm uppercase tracking-tighter text-white">Painel de Controle</h2>
        </div>
        <button onClick={onLogout} className="p-2 text-zinc-500 hover:text-red-500 transition-colors">
          <LogOut size={20} />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#1a1a1a] p-3 rounded-2xl border border-zinc-800 text-center">
            <div className="text-zinc-500 text-[8px] font-black uppercase mb-1">Total</div>
            <div className="text-white font-black text-xl">{stats.total}</div>
          </div>
          <div className="bg-[#1a1a1a] p-3 rounded-2xl border border-zinc-800 text-center">
            <div className="text-[#ff8c00] text-[8px] font-black uppercase mb-1">Pendente</div>
            <div className="text-white font-black text-xl">{stats.pending}</div>
          </div>
          <div className="bg-[#1a1a1a] p-3 rounded-2xl border border-zinc-800 text-center">
            <div className="text-green-500 text-[8px] font-black uppercase mb-1">Aprovado</div>
            <div className="text-white font-black text-xl">{stats.approved}</div>
          </div>
        </div>

        {/* Filter Tabs (Folders) */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <FilterTab active={filter === 'ALL'} label="Tudo" onClick={() => setFilter('ALL')} />
          <FilterTab active={filter === Screen.PERSONAL} label="Pessoal" onClick={() => setFilter(Screen.PERSONAL)} />
          <FilterTab active={filter === Screen.DRIVERS} label="Motoristas" onClick={() => setFilter(Screen.DRIVERS)} />
          <FilterTab active={filter === Screen.BUSINESS} label="Empresas" onClick={() => setFilter(Screen.BUSINESS)} />
          <FilterTab active={filter === Screen.NEGATIVE} label="Negativados" onClick={() => setFilter(Screen.NEGATIVE)} />
        </div>

        {/* Applications List */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-zinc-600 mb-2">
            <Folder size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Solicitações Recebidas</span>
          </div>

          {filteredApps.length === 0 ? (
            <div className="text-center py-12 text-zinc-600 text-sm">Nenhum registro nesta pasta.</div>
          ) : (
            filteredApps.map(app => (
              <button 
                key={app.id}
                onClick={() => onSelectApp(app.id)}
                className="w-full bg-[#1a1a1a] p-4 rounded-xl border border-zinc-800 hover:border-[#ff8c00]/50 transition-all flex items-center justify-between group active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-10 rounded-full ${
                    app.status === 'Aprovado' ? 'bg-green-500' : 
                    app.status === 'Recusado' ? 'bg-red-500' : 'bg-[#ff8c00]'
                  }`} />
                  <div className="text-left">
                    <div className="text-white font-bold text-sm truncate max-w-[150px]">{app.formData.nome || 'Sem Nome'}</div>
                    <div className="text-[10px] text-zinc-500 font-bold uppercase">{app.typeName} • {app.formData.valor || 'R$ 0'}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                   <span className="text-[8px] text-zinc-600 font-black">{app.date.split(',')[0]}</span>
                   <ChevronRight size={16} className="text-zinc-700 group-hover:text-[#ff8c00]" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const FilterTab: React.FC<{ active: boolean; label: string; onClick: () => void }> = ({ active, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all ${
      active ? 'bg-[#ff8c00] text-black shadow-[0_4px_10px_rgba(255,140,0,0.2)]' : 'bg-zinc-900 text-zinc-500'
    }`}
  >
    {label}
  </button>
);

export default AdminDashboard;
