import React from 'react';
import { Order, InvitationTemplate } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Plus,
  Sparkles,
  ShoppingBag,
  Award,
} from 'lucide-react';

export interface EarningsDashboardProps {
  orders: Order[];
  templates?: InvitationTemplate[];
  onOpenNewOrder: () => void;
}

export function EarningsDashboard({ orders, templates, onOpenNewOrder }: EarningsDashboardProps) {
  const safeOrders = orders || [];
  const safeTemplates = templates || [];

  const totalFaturado = safeOrders.reduce((acc, order) => acc + (Number(order.paidValue) || 0), 0);
  const totalPrevisto = safeOrders.reduce((acc, order) => acc + (Number(order.totalValue) || 0), 0);
  const aReceber = Math.max(0, totalPrevisto - totalFaturado);
  const concluidosCount = safeOrders.filter((o) => o.status === 'concluido').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Cabeçalho do Painel Financeiro */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-[#4B2E20] to-[#693f2c] text-[#F7EBDD] p-6 rounded-3xl border border-[#D4AF37]/40 shadow-lg">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Controle Financeiro • Keh Convites</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#F7EBDD]">Painel de Ganhos & Faturamento</h2>
          <p className="text-xs text-[#F7EBDD]/75 mt-0.5">
            Visualize os ganhos obtidos com as vendas de convites digitais
          </p>
        </div>

        <Button
          onClick={onOpenNewOrder}
          className="bg-[#D4AF37] hover:bg-[#c49f2f] text-[#4B2E20] font-bold text-xs rounded-xl shadow flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-[#4B2E20]" />
          <span>Registrar Entrada / Pedido</span>
        </Button>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/95 border-[#D4AF37]/35 rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#4B2E20]/70 font-medium">Total Recebido (Caixa)</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-serif font-bold text-[#4B2E20] mt-2">
            R$ {totalFaturado.toFixed(2)}
          </p>
          <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> Valores confirmados
          </span>
        </Card>

        <Card className="bg-white/95 border-[#D4AF37]/35 rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#4B2E20]/70 font-medium">Faturamento Estimado</span>
            <div className="w-8 h-8 rounded-xl bg-[#ecdccb] text-[#4B2E20] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-serif font-bold text-[#4B2E20] mt-2">
            R$ {totalPrevisto.toFixed(2)}
          </p>
          <span className="text-[10px] text-[#4B2E20]/70 font-semibold mt-1 block">
            Soma de todos os pedidos
          </span>
        </Card>

        <Card className="bg-white/95 border-[#D4AF37]/35 rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#4B2E20]/70 font-medium">Saldo Pendente a Receber</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-serif font-bold text-[#4B2E20] mt-2">
            R$ {aReceber.toFixed(2)}
          </p>
          <span className="text-[10px] text-amber-700 font-semibold mt-1 block">
            Sinal pago ou a pagar na entrega
          </span>
        </Card>

        <Card className="bg-white/95 border-[#D4AF37]/35 rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#4B2E20]/70 font-medium">Convites Entregues</span>
            <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/20 text-[#4B2E20] flex items-center justify-center">
              <Award className="w-4 h-4 text-[#D4AF37]" />
            </div>
          </div>
          <p className="text-2xl font-serif font-bold text-[#4B2E20] mt-2">
            {concluidosCount} de {safeOrders.length}
          </p>
          <span className="text-[10px] text-[#4B2E20]/70 font-semibold mt-1 block">
            {safeTemplates.length > 0 ? `${safeTemplates.length} modelos cadastrados` : 'Produção ativa'}
          </span>
        </Card>
      </div>

      {/* Histórico Recente de Entradas */}
      <Card className="bg-white/95 border-[#D4AF37]/35 rounded-2xl shadow-sm overflow-hidden">
        <CardHeader className="bg-[#fcf8f3] border-b border-[#D4AF37]/20 py-3.5 px-5">
          <CardTitle className="text-sm font-serif font-bold text-[#4B2E20] flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
            <span>Últimos Pagamentos & Vendas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#D4AF37]/15 text-xs text-[#4B2E20]">
            {safeOrders.length === 0 ? (
              <p className="p-6 text-center text-[#4B2E20]/60">Nenhum pagamento registrado ainda.</p>
            ) : (
              safeOrders.slice(0, 5).map((ord) => (
                <div key={ord.id} className="p-4 flex items-center justify-between hover:bg-[#faf5ee] transition-colors">
                  <div>
                    <p className="font-semibold text-[#4B2E20]">{ord.clientName}</p>
                    <span className="text-[11px] text-[#4B2E20]/70">{ord.templateTitle}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#4B2E20] block">
                      R$ {Number(ord.paidValue || 0).toFixed(2)}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold uppercase">
                      {ord.paymentStatus}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}