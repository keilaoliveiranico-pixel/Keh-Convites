import React, { useState, useEffect, useRef } from 'react';
import { InvitationTemplate, DigitalFormat } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  X,
  Sparkles,
  Upload,
  Video,
  Image as ImageIcon,
  Trash2,
  Percent,
} from 'lucide-react';

interface NewTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTemplate: (template: InvitationTemplate) => void;
  templateToEdit?: InvitationTemplate | null;
}

export function NewTemplateModal({
  isOpen,
  onClose,
  onSaveTemplate,
  templateToEdit,
}: NewTemplateModalProps) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [format, setFormat] = useState<DigitalFormat>('imagem_card');
  const [hasInteraction, setHasInteraction] = useState(false);
  const [price, setPrice] = useState<number>(49);
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [isPromo, setIsPromo] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
  );
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('Digital, WhatsApp');

  const [imageFileName, setImageFileName] = useState<string>('');
  const [videoFileName, setVideoFileName] = useState<string>('');

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (templateToEdit) {
      setTitle(templateToEdit.title || '');
      setFormat(templateToEdit.format || 'imagem_card');
      setHasInteraction(Boolean(templateToEdit.hasInteraction));
      setPrice(templateToEdit.price || 49);
      setOriginalPrice(templateToEdit.originalPrice ?? '');
      setIsPromo(Boolean(templateToEdit.isPromotion));
      setImageUrl(templateToEdit.imageUrl || '');
      setVideoUrl(templateToEdit.videoUrl || '');
      setDescription(templateToEdit.description || '');
      setTagsInput(templateToEdit.tags?.join(', ') || 'Digital, WhatsApp');
      setImageFileName('');
      setVideoFileName('');
    } else {
      setTitle('');
      setFormat('imagem_card');
      setHasInteraction(false);
      setPrice(49);
      setOriginalPrice('');
      setIsPromo(false);
      setImageUrl('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80');
      setVideoUrl('');
      setDescription('');
      setTagsInput('Digital, WhatsApp');
      setImageFileName('');
      setVideoFileName('');
    }
  }, [templateToEdit, isOpen]);

  // Upload de Foto / Capa do Computador
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFileName(file.name);
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
    }
  };

  // Upload de Vídeo do Computador
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFileName(file.name);
      const objectUrl = URL.createObjectURL(file);
      setVideoUrl(objectUrl);
      setFormat('animado_video');
    }
  };

  const handleRemoveVideo = () => {
    setVideoUrl('');
    setVideoFileName('');
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Por favor, informe o título do modelo de convite.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const savedTemplate: InvitationTemplate = {
      id: templateToEdit?.id || `tmpl-${Date.now()}`,
      title,
      category: 'Convite Digital',
      format,
      price: Number(price) || 0,
      originalPrice: isPromo && originalPrice !== '' ? Number(originalPrice) : undefined,
      isPromotion: isPromo,
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      videoUrl: videoUrl.trim() || undefined,
      description,
      tags: tags.length > 0 ? tags : ['Digital', 'WhatsApp'],
      features: templateToEdit?.features || [
        'Personalização completa de dados do evento',
        'Entrega rápida no WhatsApp',
        'Envios ilimitados',
      ],
      timesUsed: templateToEdit?.timesUsed || 0,
      hasInteraction: hasInteraction || format === 'interativo_pdf' || format === 'site_rsvp',
    };

    onSaveTemplate(savedTemplate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#4B2E20]/75 backdrop-blur-sm animate-fade-in">
      <Card className="max-w-2xl w-full bg-[#fdfbf7] border-[#D4AF37]/50 shadow-2xl rounded-3xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Cabeçalho */}
        <CardHeader className="border-b border-[#D4AF37]/25 flex flex-row items-center justify-between pb-4 bg-gradient-to-r from-[#ecdccb]/90 to-[#f7ebdd]/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#4B2E20] flex items-center justify-center text-[#D4AF37] shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg font-serif font-bold text-[#4B2E20]">
                {templateToEdit ? 'Editar Modelo de Convite' : 'Cadastrar Novo Modelo de Convite'}
              </CardTitle>
              <p className="text-[11px] text-[#4B2E20]/75 font-medium">
                Envie fotos e vídeos do seu computador, edite valores e promoções
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl hover:bg-[#ecdccb] text-[#4B2E20] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        {/* Corpo do Formulário */}
        <CardContent className="overflow-y-auto p-5 sm:p-6 space-y-5 text-xs text-[#4B2E20]">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nome do Modelo */}
            <div>
              <label className="block text-xs font-bold text-[#4B2E20] mb-1">
                Nome do Modelo de Convite *
              </label>
              <Input
                required
                placeholder="Ex: Modelo Floral Dourado, Modelo Encantado, Convite Delicado..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-white border-[#D4AF37]/40 text-[#4B2E20] text-sm rounded-xl focus-visible:ring-[#D4AF37]"
              />
            </div>

            {/* SEÇÃO DE MÍDIAS (FOTOS E VÍDEOS DO COMPUTADOR) */}
            <div className="p-4 rounded-2xl bg-[#ecdccb]/35 border border-[#D4AF37]/30 space-y-4">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-2">
                <span className="font-bold text-[#4B2E20] flex items-center gap-1.5 text-xs">
                  <Upload className="w-4 h-4 text-[#D4AF37]" />
                  Mídias do Convite (Fotos e Vídeos do Computador)
                </span>
                <span className="text-[10px] text-[#4B2E20]/70 font-medium">
                  Upload local do seu PC
                </span>
              </div>

              {/* Upload da Imagem / Capa */}
              <div className="space-y-2">
                <label className="block font-semibold text-[#4B2E20]">
                  1. Foto / Capa do Modelo
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="template-image-file"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => imageInputRef.current?.click()}
                    className="border-[#D4AF37]/50 bg-white hover:bg-[#ecdccb]/50 text-[#4B2E20] rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                    <span>Escolher Foto do Computador</span>
                  </Button>
                  {imageFileName && (
                    <span className="text-[11px] text-[#4B2E20]/80 font-medium truncate max-w-xs">
                      Arquivo: {imageFileName}
                    </span>
                  )}
                </div>

                {imageUrl && (
                  <div className="mt-2 relative w-24 h-24 rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow-xs">
                    <img src={imageUrl} alt="Prévia" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Upload do Vídeo */}
              <div className="space-y-2 border-t border-[#D4AF37]/20 pt-3">
                <label className="block font-semibold text-[#4B2E20]">
                  2. Vídeo do Convite (Se houver vídeo)
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="template-video-file"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => videoInputRef.current?.click()}
                    className="border-[#D4AF37]/50 bg-white hover:bg-[#ecdccb]/50 text-[#4B2E20] rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Video className="w-4 h-4 text-[#D4AF37]" />
                    <span>Escolher Vídeo do Computador</span>
                  </Button>

                  {videoUrl && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleRemoveVideo}
                      className="text-red-700 hover:bg-red-100/50 rounded-xl text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remover Vídeo</span>
                    </Button>
                  )}
                </div>

                {videoUrl && (
                  <div className="mt-2 relative max-w-xs rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow-xs">
                    <video
                      src={videoUrl}
                      controls
                      className="w-full max-h-40 rounded-xl bg-black"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* SEÇÃO 2: VALORES & PROMOÇÃO */}
            <div className="p-4 rounded-2xl bg-[#ecdccb]/35 border border-[#D4AF37]/30 space-y-3">
              <span className="font-bold text-[#4B2E20] flex items-center gap-1.5 text-xs">
                <Percent className="w-4 h-4 text-[#D4AF37]" />
                Precificação & Promoção
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-[#4B2E20]">
                    Valor do Convite (R$) *
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="bg-white border-[#D4AF37]/40 text-[#4B2E20] rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-[#4B2E20]">
                    Preço Original / De (Opcional se Promoção)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 69.90"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    disabled={!isPromo}
                    className="bg-white border-[#D4AF37]/40 text-[#4B2E20] rounded-xl text-sm disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="promo-checkbox"
                  checked={isPromo}
                  onChange={(e) => setIsPromo(e.target.checked)}
                  className="w-4 h-4 rounded text-[#4B2E20] focus:ring-[#D4AF37]"
                />
                <label htmlFor="promo-checkbox" className="font-bold text-[#4B2E20] cursor-pointer">
                  Destacar este modelo em PROMOÇÃO
                </label>
              </div>
            </div>

            {/* SEÇÃO 3: DESCRIÇÃO */}
            <div>
              <label className="block font-bold text-[#4B2E20] mb-1">
                Descrição do Modelo
              </label>
              <textarea
                rows={3}
                placeholder="Descreva detalhes como tons, animação, delicadeza visual e sugestões..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-xl bg-white border border-[#D4AF37]/40 text-xs text-[#4B2E20] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>

            {/* Botões do Rodapé */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#D4AF37]/25">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="text-[#4B2E20] rounded-xl text-xs"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#4B2E20] hover:bg-[#382015] text-[#F7EBDD] font-bold rounded-xl text-xs border border-[#D4AF37]/40 shadow-sm flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{templateToEdit ? 'Salvar Alterações' : 'Publicar Modelo'}</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}