
import React, { useState } from 'react';
import { ArrowLeft, Camera, Send, CheckCircle2, Info } from 'lucide-react';
import { Screen, Application } from '../types';

interface LoanFormScreenProps {
  type: Screen;
  onBack: () => void;
  onSubmit: (app: Application) => void;
}

const LoanFormScreen: React.FC<LoanFormScreenProps> = ({ type, onBack, onSubmit }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [maritalStatus, setMaritalStatus] = useState<'Solteiro' | 'Casado'>('Solteiro');
  const [formData, setFormData] = useState<any>({});
  const [uploadedImages, setUploadedImages] = useState<any>({});

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (name: string) => {
    // Simulate an image path/base64 for the prototype
    const demoImages: any = {
      idFront: 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=400',
      idBack: 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=400',
      selfie: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      residencia: 'https://images.unsplash.com/photo-1586075010620-2d8305841622?auto=format&fit=crop&q=80&w=400',
      cnh: 'https://images.unsplash.com/photo-1508317469940-e3df50fd5cf2?auto=format&fit=crop&q=80&w=400',
      local_empresa: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=400'
    };
    
    setUploadedImages((prev: any) => ({ ...prev, [name]: demoImages[name] || demoImages.idFront }));
  };

  const getFormConfig = () => {
    switch (type) {
      case Screen.DRIVERS: return { title: 'Solicitar Empréstimo para Motoristas', typeName: 'Motoristas' };
      case Screen.BUSINESS: return { title: 'Solicitar Empréstimo para Empresas', typeName: 'Empresas' };
      case Screen.NEGATIVE: return { title: 'Solicitar Empréstimo para Negativados', typeName: 'Negativados' };
      default: return { title: 'Solicitar Empréstimo Pessoal', typeName: 'Pessoal' };
    }
  };

  const config = getFormConfig();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const finalData = { ...formData };
    if (type === Screen.PERSONAL || type === Screen.NEGATIVE) {
      finalData.estado_civil = maritalStatus;
    }

    const newApp: Application = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      type,
      typeName: config.typeName,
      status: 'Em análise',
      date: new Date().toLocaleString('pt-BR'),
      formData: finalData,
      images: uploadedImages
    };

    setTimeout(() => {
      onSubmit(newApp);
      setStatus('success');
    }, 2000);
  };

  if (status === 'success') {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-center gap-6 min-h-[60vh] animate-in zoom-in duration-300">
        <div className="bg-[#ff8c00]/10 p-8 rounded-full">
          <CheckCircle2 size={80} className="text-[#ff8c00]" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Solicitação Enviada!</h2>
          <p className="text-zinc-400 font-medium italic text-lg">Status: Em análise...</p>
        </div>
        <p className="text-zinc-500 text-sm max-w-[250px]">Nossa equipe está revisando seus dados agora mesmo.</p>
        <button onClick={onBack} className="mt-6 w-full py-4 bg-[#1a1a1a] text-[#ff8c00] font-bold rounded-xl border-2 border-[#ff8c00] active:scale-95 transition-all">
          VOLTAR AO INÍCIO
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col animate-in slide-in-from-right-8 duration-300">
      <div className="p-4 flex items-center gap-4 border-b border-zinc-900 bg-zinc-950/50 sticky top-0 z-40">
        <button onClick={onBack} className="p-2 text-zinc-400 active:text-[#ff8c00]"><ArrowLeft size={24} /></button>
        <h2 className="font-bold text-base text-white truncate">{config.title}</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
        {type === Screen.NEGATIVE && (
          <div className="bg-[#ff8c00]/10 border border-[#ff8c00]/30 p-4 rounded-xl flex gap-3 items-center">
            <Info className="text-[#ff8c00] shrink-0" size={24} />
            <p className="text-[#ff8c00] text-xs font-black uppercase italic leading-tight">Mesmo com nome negativado! Aprovamos seu crédito com rapidez.</p>
          </div>
        )}

        <div className="space-y-4">
          {/* PERSONAL & NEGATIVE FIELDS */}
          {(type === Screen.PERSONAL || type === Screen.NEGATIVE) && (
            <>
              <InputGroup label="Nome completo" placeholder="Seu nome" onChange={(v) => handleInputChange('Nome', v)} required />
              <div className="grid grid-cols-2 gap-3">
                <FileUploadButton label="Foto Identidade (Frente)" onUpload={() => handleImageUpload('idFront')} hasFile={!!uploadedImages.idFront} />
                <FileUploadButton label="Foto Identidade (Verso)" onUpload={() => handleImageUpload('idBack')} hasFile={!!uploadedImages.idBack} />
              </div>
              <FileUploadButton label="Segurando a identidade" fullWidth onUpload={() => handleImageUpload('selfie')} hasFile={!!uploadedImages.selfie} />
              <InputGroup label="CPF" placeholder="000.000.000-00" onChange={(v) => handleInputChange('CPF', v)} required />
              <div className="space-y-3">
                <InputGroup label="Endereço de Residência" placeholder="Rua, Número, Bairro" onChange={(v) => handleInputChange('Endereco', v)} required />
                <FileUploadButton label="Foto Comprovante de Residência" fullWidth onUpload={() => handleImageUpload('residencia')} hasFile={!!uploadedImages.residencia} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputGroup label="E-mail" placeholder="seu@email.com" onChange={(v) => handleInputChange('Email', v)} required />
                <InputGroup label="Idade" placeholder="Sua idade" onChange={(v) => handleInputChange('Idade', v)} required />
              </div>
              <div className="space-y-2">
                <label className="text-zinc-400 text-xs font-bold uppercase tracking-widest ml-1">Estado Civil</label>
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" onClick={() => setMaritalStatus('Casado')} className={`py-3 px-4 rounded-xl border flex items-center justify-center font-bold transition-all ${maritalStatus === 'Casado' ? 'bg-[#ff8c00] border-[#ff8c00] text-black' : 'bg-[#1a1a1a] border-zinc-800 text-zinc-500'}`}>Casado</button>
                  <button type="button" onClick={() => setMaritalStatus('Solteiro')} className={`py-3 px-4 rounded-xl border flex items-center justify-center font-bold transition-all ${maritalStatus === 'Solteiro' ? 'bg-[#ff8c00] border-[#ff8c00] text-black' : 'bg-[#1a1a1a] border-zinc-800 text-zinc-500'}`}>Solteiro</button>
                </div>
              </div>
            </>
          )}

          {/* DRIVERS FIELDS */}
          {type === Screen.DRIVERS && (
            <>
              <InputGroup label="Nome completo" placeholder="Seu nome" onChange={(v) => handleInputChange('Nome', v)} required />
              <InputGroup label="CPF" placeholder="000.000.000-00" onChange={(v) => handleInputChange('CPF', v)} required />
              <div className="grid grid-cols-2 gap-3">
                <FileUploadButton label="Foto da CNH" onUpload={() => handleImageUpload('cnh')} hasFile={!!uploadedImages.cnh} />
                <FileUploadButton label="Foto do Rosto" onUpload={() => handleImageUpload('rosto')} hasFile={!!uploadedImages.rosto} />
              </div>
              <InputGroup label="Plataforma que trabalha" placeholder="Uber, 99, InDrive, etc" onChange={(v) => handleInputChange('Plataforma', v)} required />
              <InputGroup label="Média de ganho mensal" placeholder="R$ 0,00" onChange={(v) => handleInputChange('Renda Mensal', v)} required />
              <InputGroup label="Cidade / Estado" placeholder="Ex: Rio de Janeiro / RJ" onChange={(v) => handleInputChange('Localizacao', v)} required />
            </>
          )}

          {/* BUSINESS FIELDS */}
          {type === Screen.BUSINESS && (
            <>
              <InputGroup label="Nome do responsável" placeholder="Nome do Dono" onChange={(v) => handleInputChange('Responsavel', v)} required />
              <InputGroup label="Nome da empresa" placeholder="Razão Social ou Fantasia" onChange={(v) => handleInputChange('Empresa', v)} required />
              <InputGroup label="CNPJ ou CPF" placeholder="Documento da Empresa" onChange={(v) => handleInputChange('CNPJ/CPF', v)} required />
              <div className="grid grid-cols-2 gap-3">
                <FileUploadButton label="Foto do Documento" onUpload={() => handleImageUpload('doc_empresa')} hasFile={!!uploadedImages.doc_empresa} />
                <FileUploadButton label="Foto do Local" onUpload={() => handleImageUpload('local_empresa')} hasFile={!!uploadedImages.local_empresa} />
              </div>
              <InputGroup label="Renda média mensal" placeholder="Faturamento" onChange={(v) => handleInputChange('Faturamento Mensal', v)} required />
              <InputGroup label="Cidade / Estado" placeholder="Ex: Curitiba / PR" onChange={(v) => handleInputChange('Localizacao', v)} required />
              <InputGroup label="E-mail" placeholder="contato@empresa.com" onChange={(v) => handleInputChange('Email', v)} required />
            </>
          )}

          {/* SHARED FIELDS */}
          <InputGroup label="Telefone / WhatsApp" placeholder="(00) 00000-0000" onChange={(v) => handleInputChange('WhatsApp', v)} required />
          <div className="grid grid-cols-2 gap-4">
             <InputGroup label="Valor desejado" placeholder="R$ 0,00" onChange={(v) => handleInputChange('Valor', v)} required />
             <InputGroup label="Parcelas" placeholder="Ex: 12x" onChange={(v) => handleInputChange('Parcelas', v)} required />
          </div>
        </div>

        <button disabled={status === 'loading'} type="submit" className="w-full mt-4 py-5 bg-[#ff8c00] hover:bg-[#ff9d26] disabled:bg-zinc-700 text-black font-black text-xl rounded-2xl shadow-[0_5px_15px_rgba(255,140,0,0.3)] flex items-center justify-center gap-3 uppercase transition-all active:scale-[0.98]">
          {status === 'loading' ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black" /> : <><Send size={24} /> Enviar Solicitação</>}
        </button>
      </form>
    </div>
  );
};

const InputGroup: React.FC<{ label: string; placeholder: string; required?: boolean; onChange: (v: string) => void }> = ({ label, placeholder, required, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-zinc-400 text-xs font-bold uppercase tracking-widest ml-1">{label}</label>
    <input required={required} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#ff8c00] transition-colors w-full placeholder:text-zinc-700" />
  </div>
);

const FileUploadButton: React.FC<{ label: string; fullWidth?: boolean; onUpload: () => void; hasFile: boolean }> = ({ label, fullWidth, onUpload, hasFile }) => {
  return (
    <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
      <div 
        onClick={onUpload} 
        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-dashed transition-all cursor-pointer text-[10px] font-black uppercase text-center h-full min-h-[50px] ${
          hasFile ? 'bg-[#ff8c00]/10 border-[#ff8c00] text-[#ff8c00]' : 'bg-[#1a1a1a] border-zinc-800 text-zinc-500'
        }`}
      >
        {hasFile ? <CheckCircle2 size={16} /> : <Camera size={16} />}
        {hasFile ? "Arquivo Pronto" : label}
      </div>
    </div>
  );
};

export default LoanFormScreen;
