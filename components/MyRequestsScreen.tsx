
import React from 'react';
import { ArrowLeft, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Application } from '../types';

interface MyRequestsScreenProps {
  applications: Application[];
  onBack: () => void;
}

const MyRequestsScreen: React.FC<MyRequestsScreenProps> = ({ applications, onBack }) => {
  const getStatusStyle = (status: Application['status']) => {
    switch (status) {
      case 'Aprovado': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Recusado': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-[#ff8c00] bg-[#ff8c00]/10 border-[#ff8c00]/20';
    }
  };

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'Aprovado': return <CheckCircle2 size={14} />;
      case 'Recusado': return <XCircle size={14} />;
      default: return <Clock size={14} />;
    }
  };

  return (
    <div className="flex flex-col animate-in slide-in-from-bottom-8 duration-300">
      <div className="p-4 flex items-center gap-4 border-b border-zinc-900 bg-zinc-950/50">
        <button onClick={onBack} className="p-2 text-zinc-400 active:text-[#ff8c00]"><ArrowLeft size={24} /></button>
        <h2 className="font-bold text-lg text-white">Meus Pedidos</h2>
      </div>

      <div className="p-6 flex flex-col gap-4">
        {applications.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <Clock size={48} className="mx-auto mb-4 text-zinc-700" />
            <p className="text-zinc-400">Nenhuma solicitação encontrada.</p>
          </div>
        ) : (
          applications.map(app => (
            <div key={app.id} className="bg-[#1a1a1a] p-5 rounded-2xl border border-zinc-800 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-bold">{app.typeName}</h3>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold">{app.date}</span>
                </div>
                <div className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase flex items-center gap-1 ${getStatusStyle(app.status)}`}>
                  {getStatusIcon(app.status)}
                  {app.status}
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-zinc-800/50">
                <span className="text-zinc-500 text-xs">Valor Solicitado</span>
                <span className="text-[#ff8c00] font-black">R$ {app.formData.valor || '---'}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyRequestsScreen;
