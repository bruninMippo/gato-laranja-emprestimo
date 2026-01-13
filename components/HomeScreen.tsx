
import React from 'react';
import { Banknote, Car, Store, FileText, ClipboardList } from 'lucide-react';
import { Screen } from '../types';

interface CardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
}

const LoanCard: React.FC<CardProps> = ({ title, subtitle, icon, onClick, fullWidth }) => (
  <button
    onClick={onClick}
    className={`bg-[#1e1e1e] p-6 rounded-2xl flex flex-col items-center justify-center gap-4 border border-zinc-800 hover:border-[#ff8c00] transition-all group active:scale-95 text-center shadow-lg h-full ${fullWidth ? 'w-full' : 'w-full'}`}
  >
    <div className="bg-zinc-800 p-4 rounded-xl text-[#ff8c00] group-hover:bg-[#ff8c00] group-hover:text-black transition-colors shadow-inner">
      {icon}
    </div>
    <div className="flex flex-col gap-1">
      <span className="font-bold text-sm text-zinc-100 uppercase tracking-wide">{title}</span>
      {subtitle && <span className="text-[10px] text-zinc-500 font-medium uppercase">{subtitle}</span>}
    </div>
  </button>
);

interface HomeScreenProps {
  onSelect: (screen: Screen) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSelect }) => {
  return (
    <div className="p-6 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 mt-4">
        <h2 className="text-2xl font-bold text-white leading-snug">
          Bem-vindo ao <span className="text-[#ff8c00]">Gato Laranja</span> Empréstimos!
        </h2>
        <p className="text-zinc-400 text-sm font-medium">
          Escolha a modalidade que melhor se adapta a você.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <LoanCard 
          title="Empréstimo Pessoal" 
          icon={<Banknote size={28} />} 
          onClick={() => onSelect(Screen.PERSONAL)}
        />
        <LoanCard 
          title="Motoristas" 
          subtitle="Uber, 99, etc"
          icon={<Car size={28} />} 
          onClick={() => onSelect(Screen.DRIVERS)}
        />
        <LoanCard 
          title="Empresas" 
          subtitle="Pequenas Empresas"
          icon={<Store size={28} />} 
          onClick={() => onSelect(Screen.BUSINESS)}
        />
        <LoanCard 
          title="Negativados" 
          subtitle="Nome Sujo"
          icon={<FileText size={28} />} 
          onClick={() => onSelect(Screen.NEGATIVE)}
        />
      </div>

      <button 
        onClick={() => onSelect(Screen.MY_REQUESTS)}
        className="w-full bg-[#1a1a1a] p-4 rounded-2xl border border-zinc-800 flex items-center justify-between hover:border-[#ff8c00] transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-800 rounded-lg text-[#ff8c00] group-hover:bg-[#ff8c00] group-hover:text-black transition-colors">
            <ClipboardList size={20} />
          </div>
          <span className="text-zinc-300 font-bold uppercase text-xs">Acompanhar meus pedidos</span>
        </div>
        <div className="text-zinc-600 group-hover:text-[#ff8c00]">Status</div>
      </button>
    </div>
  );
};

export default HomeScreen;
