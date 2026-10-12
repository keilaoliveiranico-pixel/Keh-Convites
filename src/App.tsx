import React, { useState } from 'react';
import { initialTemplates, initialOrders } from '@/data/initialData';
import { InvitationTemplate, Order, OrderStatus, PaymentStatus } from '@/types';
import { Navbar } from '@/components/Navbar';
import { TemplatesCatalog } from '@/components/TemplatesCatalog';
import { OrdersManager } from '@/components/OrdersManager';
import { EarningsDashboard } from '@/components/EarningsDashboard';
import { AdminLoginModal } from '@/components/AdminLoginModal';
import { NewOrderModal } from '@/components/NewOrderModal';
import { NewTemplateModal } from '@/components/NewTemplateModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'orders' | 'templates'>('templates');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);

  // Estados dos Modelos e Pedidos
  const [templates, setTemplates] = useState<InvitationTemplate[]>(initialTemplates);
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  // Modais administrativos
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState<boolean>(false);
  const [isNewTemplateModalOpen, setIsNewTemplateModalOpen] = useState<boolean>(false);
  const [templateBeingEdited, setTemplateBeingEdited] = useState<InvitationTemplate | null>(null);

  // Handlers para Pedidos
  const handleCreateOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  const handleUpdateOrderPayment = (orderId: string, paymentStatus: PaymentStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, paymentStatus } : ord))
    );
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
  };

  // Handlers para Modelos
  const handleSaveTemplate = (savedTemplate: InvitationTemplate) => {
    setTemplates((prev) => {
      const exists = prev.some((t) => t.id === savedTemplate.id);
      if (exists) {
        return prev.map((t) => (t.id === savedTemplate.id ? savedTemplate : t));
      }
      return [savedTemplate, ...prev];
    });
    setTemplateBeingEdited(null);
  };

  const handleEditTemplate = (template: InvitationTemplate) => {
    setTemplateBeingEdited(template);
    setIsNewTemplateModalOpen(true);
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== templateId));
  };

  const pendingOrdersCount = orders.filter((o) => o.status === 'pendente').length;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4B2E20] font-sans flex flex-col selection:bg-[#D4AF37]/30 selection:text-[#4B2E20]">
      {/* Barra de Navegação */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isAdminAuthenticated={isAdminAuthenticated}
        onOpenAdminAuth={() => setIsAdminLoginOpen(true)}
        onLogoutAdmin={() => {
          setIsAdminAuthenticated(false);
          setCurrentTab('templates');
        }}
        onOpenNewOrder={() => setIsNewOrderModalOpen(true)}
        onOpenNewTemplate={() => {
          setTemplateBeingEdited(null);
          setIsNewTemplateModalOpen(true);
        }}
        pendingOrdersCount={pendingOrdersCount}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentTab === 'templates' && (
          <TemplatesCatalog
            templates={templates}
            isAdmin={isAdminAuthenticated}
            onSubmitClientOrder={handleCreateOrder}
            onEditTemplate={handleEditTemplate}
            onDeleteTemplate={handleDeleteTemplate}
          />
        )}

        {currentTab === 'orders' && isAdminAuthenticated && (
          <OrdersManager
            orders={orders}
            onUpdateStatus={handleUpdateOrderStatus}
            onUpdatePayment={handleUpdateOrderPayment}
            onOpenNewOrder={() => setIsNewOrderModalOpen(true)}
            onDeleteOrder={handleDeleteOrder}
          />
        )}

        {currentTab === 'dashboard' && isAdminAuthenticated && (
          <EarningsDashboard
            orders={orders}
            templates={templates}
            onOpenNewOrder={() => setIsNewOrderModalOpen(true)}
          />
        )}
      </main>

      {/* Rodapé */}
      <footer className="mt-auto border-t border-[#D4AF37]/25 bg-[#ecdccb]/30 py-6 text-center text-xs text-[#4B2E20]/75">
        <p className="font-serif font-semibold text-[#4B2E20]">Keh Convites • Convites Digitais Exclusivos</p>
        <p className="text-[11px] text-[#4B2E20]/60 mt-1">Todos os direitos reservados ✨</p>
      </footer>

      {/* Modais Globais */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => {
          setIsAdminAuthenticated(true);
          setIsAdminLoginOpen(false);
        }}
      />

      <NewOrderModal
        isOpen={isNewOrderModalOpen}
        onClose={() => setIsNewOrderModalOpen(false)}
        templates={templates}
        onSaveOrder={handleCreateOrder}
      />

      <NewTemplateModal
        isOpen={isNewTemplateModalOpen}
        onClose={() => {
          setIsNewTemplateModalOpen(false);
          setTemplateBeingEdited(null);
        }}
        onSaveTemplate={handleSaveTemplate}
        templateToEdit={templateBeingEdited}
      />
    </div>
  );
}