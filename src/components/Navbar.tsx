import React from 'react';
import { Sparkles, Lock, LogOut, Layers, DollarSign, FolderHeart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  currentTab: 'dashboard' | 'orders' | 'templates';
  setCurrentTab: (tab: 'dashboard' | 'orders' | 'templates') => void;
  isAdminAuthenticated: boolean;
  onOpenAdminAuth: () => void;
  onLogoutAdmin: () => void;
  onOpenNewOrder: () => void;
  onOpenNewTemplate: () => void;
  pendingOrdersCount: number;
}

export function Navbar({
  currentTab,
  setCurrentTab,
  isAdminAuthenticated,
  onOpenAdminAuth,
  onLogoutAdmin,
  onOpenNewOrder,
  onOpenNewTemplate,
  pendingOrdersCount,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#D4AF37]/35 bg-[#F7EBDD]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(75,46,32,0.05)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between gap-4">
          
          {/* Logo: Somente Keh Convites */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none group"
            onClick={() => setCurrentTab('templates')}
          >
            <div className="w-11 h-11 rounded-2xl bg-[#4B2E20] border border-[#D4AF37]/50 flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105">
              <span className="font-serif italic font-black text-2xl text-[#D4AF37]">
                K
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold tracking-tight text-[#4B2E20]">
                Keh Convites
              </span>
            </div>
          </div>

          {/* Frase Chamativa no Centro */}
          {!isAdminAuthenticated ? (
            <div className="hidden md:flex items-center justify-center text-center px-4">
              <p className="text-sm font-serif italic text-[#4B2E20] font-medium tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Transformando momentos especiais em convites inesquecíveis ✨</span>
              </p>
            </div>
          ) : (
            /* Painel restrito quando a administradora está logada */
            <nav className="hidden md:flex items-center gap-1.5 bg-[#ecdccb]/60 p-1.5 rounded-2xl border border-[#D4AF37]/30 shadow-inner">
              <button
                onClick={() => setCurrentTab('templates')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  currentTab === 'templates'
                    ? 'bg-[#4B2E20] text-[#F7EBDD] shadow-sm'
                    : 'text-[#4B2E20]/80 hover:text-[#4B2E20] hover:bg-[#F7EBDD]/60'
                }`}
              >
                <FolderHeart className={`w-3.5 h-3.5 ${currentTab === 'templates' ? 'text-[#D4AF37]' : 'text-[#4B2E20]/60'}`} />
                <span>Modelos</span>
              </button>

              <button
                onClick={() => setCurrentTab('orders')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  currentTab === 'orders'
                    ? 'bg-[#4B2E20] text-[#F7EBDD] shadow-sm'
                    : 'text-[#4B2E20]/80 hover:text-[#4B2E20] hover:bg-[#F7EBDD]/60'
                }`}
              >
                <Layers className={`w-3.5 h-3.5 ${currentTab === 'orders' ? 'text-[#D4AF37]' : 'text-[#4B2E20]/60'}`} />
                <span>Pedidos</span>
                {pendingOrdersCount > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-[#D4AF37] text-[#4B2E20]">
                    {pendingOrdersCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setCurrentTab('dashboard')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  currentTab === 'dashboard'
                    ? 'bg-[#4B2E20] text-[#F7EBDD] shadow-sm'
                    : 'text-[#4B2E20]/80 hover:text-[#4B2E20] hover:bg-[#F7EBDD]/60'
                }`}
              >
                <DollarSign className={`w-3.5 h-3.5 ${currentTab === 'dashboard' ? 'text-[#D4AF37]' : 'text-[#4B2E20]/60'}`} />
                <span>Ganhos</span>
              </button>
            </nav>
          )}

          {/* Área Restrita na Direita */}
          <div className="flex items-center gap-2">
            {!isAdminAuthenticated ? (
              <Button
                size="sm"
                onClick={onOpenAdminAuth}
                className="bg-[#4B2E20] hover:bg-[#382015] text-[#F7EBDD] font-semibold text-xs px-4 py-2 rounded-xl shadow-sm border border-[#D4AF37]/40 flex items-center gap-1.5 hover:scale-[1.02] transition-transform"
              >
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Área Restrita</span>
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onOpenNewTemplate}
                  className="hidden sm:inline-flex border-[#D4AF37]/50 bg-[#fbf5ed] text-[#4B2E20] hover:bg-[#ebdccb] text-xs font-semibold rounded-xl"
                >
                  <Plus className="w-3.5 h-3.5 mr-1 text-[#D4AF37]" />
                  Novo Modelo
                </Button>

                <Button
                  size="sm"
                  onClick={onOpenNewOrder}
                  className="bg-[#4B2E20] hover:bg-[#382015] text-[#F7EBDD] font-semibold text-xs rounded-xl border border-[#D4AF37]/40 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Novo Pedido</span>
                </Button>

                <button
                  onClick={onLogoutAdmin}
                  title="Sair da Área Administrativa"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-[#4B2E20] hover:bg-[#ebdccb] border border-[#D4AF37]/30 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5 text-[#855729]" />
                  <span className="hidden sm:inline text-[11px] font-semibold">Sair</span>
                </button>
              </>
            )}
          </div>

        </div>

        {/* Frase Chamativa no Mobile */}
        {!isAdminAuthenticated && (
          <div className="md:hidden pb-3 pt-0 text-center">
            <p className="text-[12px] font-serif italic text-[#4B2E20] font-medium flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Transformando momentos em convites inesquecíveis ✨</span>
            </p>
          </div>
        )}
      </div>
    </header>
  );
}