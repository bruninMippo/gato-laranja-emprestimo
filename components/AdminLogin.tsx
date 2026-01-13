
import React, { useState } from 'react';
import { ArrowLeft, Lock, User, ShieldCheck } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      onLoginSuccess();
    } else {
      setError('Acesso Negado: Usuário ou senha incorretos.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6 animate-in fade-in duration-500">
      <button onClick={onBack} className="self-start p-2 text-zinc-500 hover:text-white transition-colors mb-10">
        <ArrowLeft size={24} />
      </button>

      <div className="flex flex-col items-center gap-4 mb-10 text-center">
        <div className="bg-[#ff8c00] p-4 rounded-3xl shadow-[0_0_20px_rgba(255,140,0,0.3)]">
          <ShieldCheck size={48} color="black" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Área do Dono</h2>
          <p className="text-zinc-500 text-sm">Insira suas credenciais para gerenciar o sistema.</p>
        </div>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white focus:border-[#ff8c00] outline-none"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white focus:border-[#ff8c00] outline-none"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-xs font-bold text-center italic">{error}</p>}

        <button type="submit" className="w-full mt-4 py-4 bg-[#ff8c00] text-black font-black text-lg rounded-xl uppercase tracking-widest shadow-lg hover:bg-[#ff9d26] transition-all">
          Acessar Painel
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
