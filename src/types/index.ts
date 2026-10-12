export type OrderStatus = 'pendente' | 'em_criacao' | 'aprovacao' | 'concluido' | 'cancelado';
export type PaymentStatus = 'pago' | 'parcial' | 'pendente';
export type InvitationCategory = 'Convite Digital';

export type DigitalFormat = 
  | 'imagem_card'       // Imagem / Card Digital simples (WhatsApp, sem botões)
  | 'interativo_pdf'    // Interativo em PDF com botões clicáveis
  | 'animado_video'     // Vídeo animado com música
  | 'save_the_date'     // Save The Date digital simples
  | 'kit_digital'       // Kit Digital
  | 'site_rsvp';        // Página Web com botões

export interface InvitationTemplate {
  id: string;
  title: string;
  category?: string;
  format: DigitalFormat;
  price: number;
  originalPrice?: number;
  isPromotion?: boolean;
  imageUrl: string;
  videoUrl?: string;
  description: string;
  tags: string[];
  features?: string[];
  timesUsed: number;
  demoUrl?: string;
  hasInteraction: boolean; // true = tem botões clicáveis, false = convite simples sem botões
}

export interface DigitalPhotoshootExample {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface Order {
  id: string;
  clientName: string;
  clientWhatsapp: string;
  theme?: string;
  templateId?: string;
  templateTitle: string;
  category?: string;
  digitalFormat: DigitalFormat;
  hasInteraction?: boolean;
  rsvpContact?: string;
  giftList?: string;
  mapsLocation?: string;
  includeDigitalPhotoshoot?: boolean;
  photoshootDetails?: string;
  totalValue: number;
  paidValue: number;
  eventDate: string;
  eventTime?: string;
  specialPhrase?: string;
  photoUrl?: string;
  deadlineDate: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
  createdAt: string;
}