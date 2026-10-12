import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, KeyRound, X, AlertCircle, ShieldCheck } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AdminLoginModal({ isOpen, onClose, onSuccess }: AdminLoginModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '41526378') {
      setError(false);
      setPassword('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  const handleClose = () => {
    setError(false);
    setPassword('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4B2E20]/65 backdrop-blur-sm animate-fade-in">
      <Card className="max-w-md w-full bg-[#fcf8f3] border-[#D4AF37]/50 shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="border-b border-[#D4AF37]/25 flex flex-row items-center justify-between pb-4 bg-[#ecdccb]/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#4B2E20] flex items-center justify-center text-[#D4AF37] shadow-sm">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base font-serif font-bold text-[#4B2E20]">
                Área Administrativa
              </CardTitle>
              <p className="text-[11px] text-[#4B2E20]/70 font-medium">
                Keh Convites • Acesso Restrito
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-xl hover:bg-[#ecdccb] text-[#4B2E20] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#4B2E20]">
                Digite a senha de acesso
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
                <Input
                  type="password"
                  autoFocus
                  placeholder="Senha de 8 dígitos..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(false);
                  }}
                  className="pl-9 bg-white border-[#D4AF37]/40 text-[#4B2E20] text-sm rounded-xl focus-visible:ring-[#D4AF37]"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-100/90 border border-red-300 text-red-800 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Senha incorreta! Tente novamente.</span>
              </div>
            )}

            <p className="text-[11px] text-[#4B2E20]/70 leading-relaxed">
              O painel de ganhos financeiros e gerenciamento de pedidos é restrito e protegido por senha.
            </p>

            <div className="pt-2 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleClose}
                className="text-[#4B2E20] rounded-xl text-xs"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#4B2E20] hover:bg-[#392115] text-[#F7EBDD] font-semibold rounded-xl text-xs border border-[#D4AF37]/40 shadow-sm flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Acessar Painel</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}