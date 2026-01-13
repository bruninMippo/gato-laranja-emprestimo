
import React from 'react';
import { ArrowLeft, Check, X, Image as ImageIcon, User, Briefcase, Car, Wallet } from 'lucide-react';
import { Application, Screen } from '../types';

interface AdminDetailsProps {
  app: Application;
  onUpdateStatus: (id: string, status: Application['status']) => void;
  onBack: () => void;
}

const AdminDetails: React.FC<AdminDetailsProps> = ({ app, onUpdateStatus, onBack }) => {
  const handleAction = (status: Application['status']) => {
    onUpdateStatus(app.id, status);
    onBack();
  };

  const getIcon = () => {
    switch(app.type) {
      case Screen.BUSINESS: return <Briefcase size={16} />;
      case Screen.DRIVERS: return <Car size={16} />;
      case Screen.NEGATIVE: return <Wallet size={16} />;
      default: return <User size={16} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen animate-in slide-in-from-right-8 duration-300">
      <div className="p-4 bg-zinc-950 border-b border-zinc-900 flex items-center gap-4 sticky top-0 z-40">
        <button onClick={onBack} className="p-2 text-zinc-500 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h2 className="font-black text-sm uppercase tracking-tighter text-white">Análise de Solicitação</h2>
      </div>

      <div className="p-6 space-y-8">
        {/* Header Status */}
        <div className="flex justify-between items-center bg-[#1a1a1a] p-5 rounded-2xl border border-zinc-800 shadow-lg">
          <div>
            <div className="text-[10px] text-zinc-600 font-black uppercase mb-1">PROTOCOLO</div>
            <div className="text-white font-mono text-lg font-bold">#{app.id}</div>
            <div className="text-[10px] text-[#ff8c00] font-black uppercase flex items-center gap-1 mt-1">
              {getIcon()} {app.typeName}
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase border-2 ${
            app.status === 'Aprovado' ? 'text-green-500 border-green-500 bg-green-500/10' :
            app.status === 'Recusado' ? 'text-red-500 border-red-500 bg-red-500/10' :
            'text-[#ff8c00] border-[#ff8c00] bg-[#ff8c00]/10'
          }`}>
            {app.status}
          </div>
        </div>

        {/* Data Sections */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[#ff8c00] text-xs font-black uppercase tracking-widest">Informações do Formulário</h3>
            <span className="text-[10px] text-zinc-600 font-bold italic">{app.date}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(app.formData).map(([key, value]: [string, any]) => (
              <div key={key} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex flex-col gap-1">
                <span className="text-[8px] text-zinc-600 font-black uppercase tracking-tighter">{key.replace('_', ' ')}</span>
                <span className="text-white text-sm font-bold truncate">{value || '---'}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Image Preview Section */}
        <section className="space-y-4">
          <h3 className="text-[#ff8c00] text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <ImageIcon size={14} /> Arquivos e Documentos
          </h3>
          {Object.keys(app.images).length === 0 ? (
            <div className="bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-2xl p-8 text-center text-zinc-600 text-xs italic">
              Nenhuma imagem anexada.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
               {Object.entries(app.images).map(([key, src]: [string, any]) => (
                 <ImageCard key={key} label={key.replace('_', ' ')} src={src} />
               ))}
            </div>
          )}
        </section>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-6 pb-12">
          <button 
            onClick={() => handleAction('Recusado')}
            className="flex flex-col items-center justify-center gap-2 bg-red-500/10 border-2 border-red-500 p-6 rounded-3xl hover:bg-red-500/20 transition-all active:scale-95 group"
          >
            <div className="bg-red-500 p-3 rounded-full text-black shadow-lg shadow-red-500/30">
              <X size={28} strokeWidth={3} />
            </div>
            <span className="text-red-500 font-black uppercase text-sm mt-1">Recusar</span>
          </button>
          <button 
            onClick={() => handleAction('Aprovado')}
            className="flex flex-col items-center justify-center gap-2 bg-green-500/10 border-2 border-green-500 p-6 rounded-3xl hover:bg-green-500/20 transition-all active:scale-95 group"
          >
            <div className="bg-green-500 p-3 rounded-full text-black shadow-lg shadow-green-500/30">
              <Check size={28} strokeWidth={3} />
            </div>
            <span className="text-green-500 font-black uppercase text-sm mt-1">Aprovar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ImageCard: React.FC<{ label: string; src: string }> = ({ label, src }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group cursor-pointer active:scale-95 transition-all">
    <div className="h-32 bg-zinc-800 relative">
      <img src={src} alt={label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ImageIcon className="text-white" size={24} />
      </div>
    </div>
    <div className="p-3 text-center text-[10px] font-black text-zinc-400 uppercase tracking-tighter border-t border-zinc-800">{label}</div>
  </div>
);

export default AdminDetails;
