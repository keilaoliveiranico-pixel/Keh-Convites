import React, { useState } from 'react';
import { InvitationTemplate, Order, DigitalFormat } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Sparkles } from 'lucide-react';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  templates: InvitationTemplate[];
  preSelectedTemplate?: InvitationTemplate | null;
  onSaveOrder: (newOrder: Order) => void;
}

export function NewOrderModal({
  isOpen,
  onClose,
  templates,
  preSelectedTemplate,
  onSaveOrder,
}: NewOrderModalProps) {
  if (!isOpen) return null;

  const [clientName, setClientName] = useState('');
  const [clientWhatsapp, setClientWhatsapp] = useState('');
  const [theme, setTheme] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    preSelectedTemplate?.id || (templates[0]?.id ?? '')
  );
  const [digitalFormat, setDigitalFormat] = useState<DigitalFormat>(
    preSelectedTemplate?.format || 'imagem_card'
  );
  const [totalValue, setTotalValue] = useState(preSelectedTemplate ? preSelectedTemplate.price : 49);
  const [paidValue, setPaidValue] = useState(preSelectedTemplate ? preSelectedTemplate.price : 49);
  const [deadlineDate, setDeadlineDate] = useState('2025-06-15');
  const [eventDate, setEventDate] = useState('2025-07-20');
  const [rsvpContact, setRsvpContact] = useState('');
  const [mapsLocation, setMapsLocation] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      alert('Por favor, informe o nome do cliente.');
      return;
    }

    const templateObj = templates.find((t) => t.id === selectedTemplateId);
    const paymentStatus =
      paidValue >= totalValue ? 'pago' : paidValue > 0 ? 'parcial' : 'pendente';

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      clientName,
      clientWhatsapp,
      theme: theme.trim() || undefined,
      templateId: selectedTemplateId,
      templateTitle: templateObj?.title || 'Convite Digital Personalizado',
      digitalFormat,
      rsvpContact: rsvpContact || undefined,
      mapsLocation: mapsLocation || undefined,
      totalValue: Number(totalValue) || 0,
      paidValue: Number(paidValue) || 0,
      eventDate,
      deadlineDate,
      status: 'em_criacao',
      paymentStatus,
      notes,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSaveOrder(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4B2E20]/65 backdrop-blur-sm animate-fade-in">
      <Card className="max-w-xl w-full bg-[#fcf8f3] border-[#D4AF37]/50 shadow-2xl rounded-3xl overflow-hidden max-h-[92vh] flex flex-col">
        <CardHeader className="border-b border-[#D4AF37]/25 flex flex-row items-center justify-between pb-4 bg-[#ecdccb]/50">
          <div>
            <CardTitle className="text-lg font-serif font-bold text-[#4B2E20] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Novo Pedido de Convite Digital</span>
            </CardTitle>
            <p className="text-xs text-[#4B2E20]/70 font-medium mt-0.5">
              Keh Convites • Cadastre o pedido de Card, Interativo, Vídeo ou Save The Date
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl hover:bg-[#ecdccb] text-[#4B2E20] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        <CardContent className="overflow-y-auto p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#4B2E20] mb-1 font-semibold">
                  Nome do Cliente / Homenageado *
                </label>
                <Input
                  required
                  placeholder="Ex: Marina & Lucas, Sofia..."
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="bg-white border-[#D4AF37]/40 text-[#4B2E20] rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[#4B2E20] mb-1 font-semibold">
                  WhatsApp para Contato / Envio
                </label>
                <Input
                  placeholder="(32) 98888-7777"
                  value={clientWhatsapp}
                  onChange={(e) => setClientWhatsapp(e.target.value)}
                  className="bg-white border-[#D4AF37]/40 text-[#4B2E20] rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#4B2E20] mb-1 font-semibold">
                  Modelo Escolhido
                </label>
                <select
                  value={selectedTemplateId}
                  onChange={(e) => {
                    setSelectedTemplateId(e.target.value);
                    const found = templates.find((t) => t.id === e.target.value);
                    if (found) {
                      setDigitalFormat(found.format);
                      setTotalValue(found.price);
                      setPaidValue(found.price);
                    }
                  }}
                  className="w-full h-10 px-3 rounded-xl bg-white border border-[#D4AF37]/40 text-xs text-[#4B2E20] font-medium focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                >
                  {templates.map((tpl) => (
                    <option key={tpl.id} value={tpl.id}>
                      {tpl.title} (R$ {tpl.price.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#4B2E20] mb-1 font-semibold">
                  Formato de Entrega
                </label>
                <select
                  value={digitalFormat}
                  onChange={(e) => setDigitalFormat(e.target.value as DigitalFormat)}
                  className="w-full h-10 px-3 rounded-xl bg-white border border-[#D4AF37]/40 text-xs text-[#4B2E20] font-medium focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                >
                  <option value="imagem_card">Card em Imagem (WhatsApp/Foto)</option>
                  <option value="interativo_pdf">Interativo em PDF (Botões Clicáveis)</option>
                  <option value="animado_video">Vídeo Animado com Música</option>
                  <option value="save_the_date">Save The Date Digital</option>
                  <option value="kit_digital">Kit Digital Completo (Combo)</option>
                  <option value="site_rsvp">Página Web do Evento</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#4B2E20] mb-1 font-semibold">
                Tema / Estilo do Convite (Opcional)
              </label>
              <Input
                placeholder="Ex: Bosque Encantado, Realeza, Minimalista Dourado..."
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-white border-[#D4AF37]/40 text-[#4B2E20] rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#4B2E20] mb-1 font-semibold">
                  Prazo de Envio da Prévia
                </label>
                <Input
                  type="date"
                  value={deadlineDate}
                  onChange={(e) => setDeadlineDate(e.target.value)}
                  className="bg-white border-[#D4AF37]/40 text-[#4B2E20] rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[#4B2E20] mb-1 font-semibold">
                  Data do Evento
                </label>
                <Input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="bg-white border-[#D4AF37]/40 text-[#4B2E20] rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#4B2E20] mb-1 font-semibold">
                  Valor Total (R$)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={totalValue}
                  onChange={(e) => setTotalValue(Number(e.target.value))}
                  className="bg-white border-[#D4AF37]/40 text-[#4B2E20] rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[#4B2E20] mb-1 font-semibold">
                  Valor Pago (R$)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={paidValue}
                  onChange={(e) => setPaidValue(Number(e.target.value))}
                  className="bg-white border-[#D4AF37]/40 text-[#4B2E20] rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#4B2E20] mb-1 font-semibold">
                Observações do Pedido
              </label>
              <textarea
                rows={2}
                placeholder="Ex: Cores preferidas, frase de carinho ou detalhes da festa..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white border border-[#D4AF37]/40 text-xs text-[#4B2E20] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="text-[#4B2E20] text-xs rounded-xl"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#4B2E20] hover:bg-[#382015] text-[#F7EBDD] font-bold text-xs rounded-xl border border-[#D4AF37]/40 shadow-sm"
              >
                Cadastrar Pedido
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}