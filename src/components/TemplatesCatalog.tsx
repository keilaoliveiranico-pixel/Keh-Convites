import React, { useState } from 'react';
import { InvitationTemplate, Order } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Check,
  Search,
  Heart,
  Edit,
  Trash2,
  Clock,
  Send,
  Play,
  Film,
} from 'lucide-react';
import { ClientOrderModal } from './ClientOrderModal';

export const EXEMPLOS_ENSAIOS_CATALOGO = [
  {
    id: 'ensaio-cat-1',
    titulo: 'Ensaio Infantil Temático',
    subtitulo: 'Safári, Bosque, Circo & Fazendinha',
    valor: 'R$ 25,00',
    descricao: 'Criamos a foto temática digital do seu filho(a) com cenário lindo para ilustrar com encanto o convite.',
    foto: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ensaio-cat-2',
    titulo: 'Ensaio Princesa & Realeza',
    subtitulo: 'Vestidos de Gala, Castelos e Flores',
    valor: 'R$ 25,00',
    descricao: 'Transformação visual delicada para encantar os convidados logo na capa do convite.',
    foto: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ensaio-cat-3',
    titulo: 'Ensaio Casal / Pré-Wedding',
    subtitulo: 'Pôr do Sol, Praia e Cenário Romântico',
    valor: 'R$ 29,00',
    descricao: 'Foto tratada em atmosfera apaixonante pronta para compor seu convite digital.',
    foto: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ensaio-cat-4',
    titulo: 'Ensaio 1º Aninho Digital',
    subtitulo: 'Smash Cake, Balões e Cores Pastéis',
    valor: 'R$ 25,00',
    descricao: 'Cenário alegre e fofo perfeito para a primeira celebração do seu pequeno amor.',
    foto: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=600&q=80',
  },
];

export interface TemplatesCatalogProps {
  templates: InvitationTemplate[];
  onOpenOrderModal: (template: InvitationTemplate) => void;
  isAdmin?: boolean;
  onEditTemplate?: (template: InvitationTemplate) => void;
  onDeleteTemplate?: (templateId: string) => void;
  onSaveNewOrderFromClient?: (order: Order) => void;
}

export function TemplatesCatalog({
  templates,
  onOpenOrderModal,
  isAdmin = false,
  onEditTemplate,
  onDeleteTemplate,
  onSaveNewOrderFromClient,
}: TemplatesCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [orderingClientTemplate, setOrderingClientTemplate] = useState<InvitationTemplate | null>(null);

  const filteredTemplates = (templates || []).filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSearch;
  });

  const handleSelectTemplateForOrder = (tpl: InvitationTemplate) => {
    setOrderingClientTemplate(tpl);
  };

  const handleOrderSubmitted = (order: Order) => {
    if (onSaveNewOrderFromClient) {
      onSaveNewOrderFromClient(order);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 bg-gradient-to-br from-[#ecdccb] via-[#F7EBDD] to-[#e4cfbd] border border-[#D4AF37]/40 shadow-sm text-[#4B2E20]">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#D4AF37]/40 text-[#4B2E20] text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Catálogo Exclusivo • Keh Convites Digitais</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#4B2E20] leading-tight">
            Modelos de Convites Digitais para Enviar no WhatsApp
          </h1>
          
          <p className="text-xs sm:text-sm text-[#4B2E20]/80 leading-relaxed font-sans max-w-2xl">
            Escolha o modelo digital que você mais gostar e personalize tudo: nome, data, horário, local e todos os detalhes do seu evento.
          </p>
        </div>

        {/* Vantagens dos Convites Digitais */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-6 pt-5 border-t border-[#D4AF37]/25 text-xs">
          <div className="flex items-center gap-2 text-[#4B2E20] font-medium">
            <div className="w-5 h-5 rounded-full bg-[#D4AF37]/25 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-[#4B2E20]" />
            </div>
            <span>Envio ilimitado pelo WhatsApp</span>
          </div>
          <div className="flex items-center gap-2 text-[#4B2E20] font-medium">
            <div className="w-5 h-5 rounded-full bg-[#D4AF37]/25 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-[#4B2E20]" />
            </div>
            <span>Design delicado & personalizado</span>
          </div>
          <div className="flex items-center gap-2 text-[#4B2E20] font-medium">
            <div className="w-5 h-5 rounded-full bg-[#D4AF37]/25 flex items-center justify-center shrink-0">
              <Check className="w-3 h-3 text-[#4B2E20]" />
            </div>
            <span>Entrega rápida</span>
          </div>
        </div>
      </div>

      {/* Barra de Pesquisa */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#ecdccb]/40 p-3 sm:p-4 rounded-2xl border border-[#D4AF37]/25">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4B2E20]/50" />
          <input
            type="text"
            placeholder="Buscar modelo de convite digital..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white border border-[#D4AF37]/35 text-[#4B2E20] placeholder-[#4B2E20]/50 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 text-xs text-[#4B2E20]/75 font-semibold px-1">
          <span>{filteredTemplates.length} modelo(s) disponível(is)</span>
        </div>
      </div>

      {/* Grid de Modelos de Convites */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const hasVideo = Boolean(template.videoUrl);

          return (
            <Card
              key={template.id}
              className="group overflow-hidden rounded-3xl border-[#D4AF37]/35 bg-[#fcf8f3] hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visualização de Mídia (Vídeo ou Foto) */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#ecdccb]/40">
                  {hasVideo ? (
                    <div className="relative w-full h-full">
                      <video
                        src={template.videoUrl}
                        poster={template.imageUrl}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        controls
                        playsInline
                        preload="metadata"
                      />
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#4B2E20]/80 text-[#F7EBDD] backdrop-blur-md border border-[#D4AF37]/40 shadow-sm">
                          <Film className="w-3 h-3 text-[#D4AF37]" />
                          Vídeo Convite
                        </span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={template.imageUrl}
                        alt={template.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#4B2E20]/85 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    </>
                  )}

                  {/* Tag Promoção se houver */}
                  {template.isPromotion && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md animate-pulse">
                        <Sparkles className="w-3 h-3" />
                        PROMOÇÃO
                      </span>
                    </div>
                  )}

                  {/* Botões do Administrador para Editar e Excluir */}
                  {isAdmin && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10 bg-white/90 p-1.5 rounded-xl shadow-md border border-[#D4AF37]/40 backdrop-blur-sm">
                      {onEditTemplate && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditTemplate(template);
                          }}
                          className="p-1.5 rounded-lg bg-[#4B2E20] hover:bg-[#382015] text-[#F7EBDD] transition-colors"
                          title="Editar modelo, fotos, vídeo e valores"
                        >
                          <Edit className="w-3.5 h-3.5 text-[#D4AF37]" />
                        </button>
                      )}
                      {onDeleteTemplate && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Deseja realmente excluir o modelo "${template.title}"?`)) {
                              onDeleteTemplate(template.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
                          title="Excluir modelo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Conteúdo do Card */}
                <CardContent className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#4B2E20] line-clamp-1 group-hover:text-[#855729] transition-colors">
                      {template.title}
                    </h3>
                    <p className="text-xs text-[#4B2E20]/75 line-clamp-2 mt-1 leading-relaxed">
                      {template.description}
                    </p>
                  </div>

                  {/* Preço e Promoção */}
                  <div className="flex items-baseline gap-2 pt-1 border-t border-[#D4AF37]/20">
                    <span className="text-lg font-bold text-[#4B2E20]">
                      R$ {template.price.toFixed(2)}
                    </span>
                    {template.isPromotion && template.originalPrice && (
                      <span className="text-xs text-[#4B2E20]/50 line-through">
                        R$ {template.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </CardContent>
              </div>

              {/* Botão de Ação */}
              <div className="p-5 pt-0">
                <Button
                  onClick={() => handleSelectTemplateForOrder(template)}
                  className="w-full bg-[#4B2E20] hover:bg-[#382015] text-[#F7EBDD] font-semibold text-xs py-2.5 rounded-xl border border-[#D4AF37]/50 shadow-sm flex items-center justify-center gap-2 group-hover:scale-[1.01] transition-transform"
                >
                  <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Quero Esse Modelo</span>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 bg-[#ecdccb]/30 rounded-3xl border border-[#D4AF37]/25 p-6">
          <p className="text-sm font-semibold text-[#4B2E20]">Nenhum modelo de convite encontrado</p>
          <p className="text-xs text-[#4B2E20]/70 mt-1">Tente pesquisar com outro termo.</p>
        </div>
      )}

      {/* SEÇÃO OPCIONAL DE ENSAIOS DIGITAIS — NO FINAL DA PÁGINA */}
      <div className="mt-16 pt-10 border-t-2 border-[#D4AF37]/30 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ecdccb]/60 border border-[#D4AF37]/40 text-[#4B2E20] text-xs font-semibold shadow-xs">
            <Heart className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Serviço Especial Adicional</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#4B2E20]">
            Ensaios Digitais para Ilustrar seu Convite
          </h2>
          <p className="text-xs sm:text-sm text-[#4B2E20]/75 leading-relaxed">
            Se você não tem fotos profissionais, criamos um ensaio digital temático exclusivo para abrilhantar seu convite digital!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXEMPLOS_ENSAIOS_CATALOGO.map((ensaio) => (
            <Card
              key={ensaio.id}
              className="overflow-hidden rounded-2xl border-[#D4AF37]/30 bg-[#fdfbf7] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] overflow-hidden bg-[#ecdccb]/40 relative">
                  <img
                    src={ensaio.foto}
                    alt={ensaio.titulo}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-[#4B2E20]/90 text-[#D4AF37] text-[11px] font-bold shadow-sm">
                    {ensaio.valor}
                  </div>
                </div>
                <div className="p-3.5 space-y-1">
                  <h4 className="text-xs font-serif font-bold text-[#4B2E20]">
                    {ensaio.titulo}
                  </h4>
                  <p className="text-[11px] text-[#4B2E20]/70 font-medium">
                    {ensaio.subtitulo}
                  </p>
                  <p className="text-[11px] text-[#4B2E20]/80 leading-relaxed pt-1">
                    {ensaio.descricao}
                  </p>
                </div>
              </div>

              <div className="p-3.5 pt-0">
                <p className="text-[10px] text-center italic text-[#855729] font-medium bg-[#ecdccb]/40 py-1 px-2 rounded-lg border border-[#D4AF37]/20">
                  Pode ser adicionado ao pedir qualquer convite!
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal de Pedido do Cliente com Formulário e Pagamento PIX */}
      <ClientOrderModal
        isOpen={Boolean(orderingClientTemplate)}
        template={orderingClientTemplate}
        onClose={() => setOrderingClientTemplate(null)}
        onSubmitOrder={handleOrderSubmitted}
      />
    </div>
  );
}