import React, { useState } from 'react';
import { Order, OrderStatus, PaymentStatus } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Layers,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  Calendar,
  Phone,
  DollarSign,
  FileText,
  MapPin,
  Camera,
  MousePointerClick,
  X,
} from 'lucide-react';

export interface OrdersManagerProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  onUpdatePayment: (orderId: string, status: PaymentStatus) => void;
  onOpenNewOrder: () => void;
  onDeleteOrder: (orderId: string) => void;
}

export function OrdersManager({
  orders,
  onUpdateStatus,
  onUpdatePayment,
  onOpenNewOrder,
  onDeleteOrder,
}: OrdersManagerProps) {
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('todos');

  const safeOrders = orders || [];
  const filteredOrders = safeOrders.filter((order) => {
    if (filterStatus === 'todos') return true;
    return order.status === filterStatus;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pendente':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-300">Pendente</Badge>;
      case 'em_criacao':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Em Criação</Badge>;
      case 'aprovacao':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-300">Em Aprovação</Badge>;
      case 'concluido':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">Concluído</Badge>;
      case 'cancelado':
        return <Badge className="bg-rose-100 text-rose-800 border-rose-300">Cancelado</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/95 p-6 rounded-3xl border border-[#D4AF37]/35 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#4B2E20] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#D4AF37]" />
            <span>Gerenciamento de Pedidos</span>
          </h2>
          <p className="text-xs text-[#4B2E20]/75 mt-0.5">
            Acompanhe os pedidos de convites digitais recebidos dos clientes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={onOpenNewOrder}
            className="bg-[#4B2E20] hover:bg-[#382015] text-[#F7EBDD] font-bold text-xs rounded-xl shadow border border-[#D4AF37]/40 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-[#D4AF37]" />
            <span>Novo Pedido Manual</span>
          </Button>
        </div>
      </div>

      {/* Filtros rápidos */}
      <div className="flex flex-wrap items-center gap-1.5 bg-[#ecdccb]/45 p-1.5 rounded-2xl border border-[#D4AF37]/30 text-xs">
        {['todos', 'pendente', 'em_criacao', 'aprovacao', 'concluido'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-xl font-semibold capitalize transition-all ${
              filterStatus === st
                ? 'bg-[#4B2E20] text-[#F7EBDD] shadow-sm'
                : 'text-[#4B2E20]/80 hover:bg-[#F7EBDD]/60'
            }`}
          >
            {st === 'todos' ? 'Todos os Pedidos' : st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Lista de Pedidos */}
      {filteredOrders.length === 0 ? (
        <Card className="bg-white/80 border-[#D4AF37]/30 rounded-3xl p-10 text-center">
          <p className="text-sm font-semibold text-[#4B2E20]">Nenhum pedido encontrado nesta categoria.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.map((ord) => (
            <Card
              key={ord.id}
              className="bg-white/95 border-[#D4AF37]/35 rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#4B2E20]">
                      {ord.clientName}
                    </h3>
                    <p className="text-xs text-[#4B2E20]/75">{ord.templateTitle}</p>
                  </div>
                  {getStatusBadge(ord.status)}
                </div>

                <div className="text-xs text-[#4B2E20]/80 space-y-1 bg-[#faf6f0] p-2.5 rounded-xl border border-[#D4AF37]/20">
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>WhatsApp: <strong>{ord.clientWhatsapp || 'Não informado'}</strong></span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Data Evento: <strong>{ord.eventDate || 'A definir'}</strong></span>
                  </p>
                  <p className="flex items-center gap-1.5 font-bold text-[#4B2E20]">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Total: R$ {ord.totalValue.toFixed(2)}</span>
                  </p>
                </div>
              </div>

              {/* Ações do Pedido */}
              <div className="pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedOrderDetails(ord)}
                  className="text-xs border-[#D4AF37]/40 text-[#4B2E20] hover:bg-[#ecdccb]/50 rounded-xl flex items-center gap-1 flex-1"
                >
                  <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Ver Detalhes</span>
                </Button>

                {/* Seletor rápido de status */}
                <select
                  value={ord.status}
                  onChange={(e) => onUpdateStatus(ord.id, e.target.value as OrderStatus)}
                  className="text-xs bg-[#faf6f0] border border-[#D4AF37]/40 rounded-xl px-2 py-1.5 text-[#4B2E20] font-semibold focus:outline-none"
                >
                  <option value="pendente">Pendente</option>
                  <option value="em_criacao">Em Criação</option>
                  <option value="aprovacao">Aprovação</option>
                  <option value="concluido">Concluído</option>
                  <option value="cancelado">Cancelado</option>
                </select>

                <button
                  onClick={() => {
                    if (confirm(`Deseja excluir o pedido de "${ord.clientName}"?`)) {
                      onDeleteOrder(ord.id);
                    }
                  }}
                  title="Excluir Pedido"
                  className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de Detalhes do Pedido */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4B2E20]/70 backdrop-blur-sm animate-fade-in">
          <Card className="max-w-lg w-full bg-[#fdfbf7] border-[#D4AF37]/50 shadow-2xl rounded-3xl overflow-hidden max-h-[90vh] flex flex-col">
            <CardHeader className="border-b border-[#D4AF37]/25 flex flex-row items-center justify-between pb-4 bg-[#ecdccb]/60 shrink-0">
              <div>
                <CardTitle className="text-base font-serif font-bold text-[#4B2E20]">
                  Detalhes do Pedido: {selectedOrderDetails.clientName}
                </CardTitle>
                <p className="text-xs text-[#4B2E20]/75">{selectedOrderDetails.templateTitle}</p>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-1 rounded-xl hover:bg-[#ecdccb] text-[#4B2E20]"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>

            <CardContent className="overflow-y-auto p-5 space-y-4 text-xs text-[#4B2E20]">
              <div className="space-y-2 bg-white p-3.5 rounded-2xl border border-[#D4AF37]/30">
                <p><strong>WhatsApp:</strong> {selectedOrderDetails.clientWhatsapp}</p>
                <p><strong>Data do Evento:</strong> {selectedOrderDetails.eventDate}</p>
                {selectedOrderDetails.mapsLocation && (
                  <p><strong>Localização:</strong> {selectedOrderDetails.mapsLocation}</p>
                )}
                {selectedOrderDetails.rsvpContact && (
                  <p><strong>Confirmação de Presença:</strong> {selectedOrderDetails.rsvpContact}</p>
                )}
                {selectedOrderDetails.giftList && (
                  <p><strong>Lista de Presentes:</strong> {selectedOrderDetails.giftList}</p>
                )}
                {selectedOrderDetails.includeDigitalPhotoshoot && (
                  <p className="text-purple-800 font-semibold">
                    ✨ Ensaio Digital Incluso: {selectedOrderDetails.photoshootDetails || 'Sim'}
                  </p>
                )}
              </div>

              {selectedOrderDetails.notes && (
                <div className="bg-[#faf6f0] p-3.5 rounded-2xl border border-[#D4AF37]/30">
                  <span className="font-bold block mb-1">Informações Fornecidas pelo Cliente:</span>
                  <p className="leading-relaxed whitespace-pre-wrap">{selectedOrderDetails.notes}</p>
                </div>
              )}

              {selectedOrderDetails.photoUrl && (
                <div className="space-y-1">
                  <span className="font-bold">Foto Anexada:</span>
                  <img
                    src={selectedOrderDetails.photoUrl}
                    alt="Foto do cliente"
                    className="max-h-48 rounded-xl object-contain border border-[#D4AF37]/40"
                  />
                </div>
              )}

              <div className="pt-2 flex items-center justify-between border-t border-[#D4AF37]/20">
                <span className="text-sm font-bold">
                  Valor Total: R$ {selectedOrderDetails.totalValue.toFixed(2)}
                </span>
                <Button
                  onClick={() => setSelectedOrderDetails(null)}
                  className="bg-[#4B2E20] text-[#F7EBDD] text-xs rounded-xl"
                >
                  Fechar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}