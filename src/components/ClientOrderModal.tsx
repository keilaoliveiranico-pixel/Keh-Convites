import React, { useState, useRef } from 'react';
import { InvitationTemplate, Order } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Upload,
  Phone,
  CheckCircle2,
  QrCode,
  Copy,
  ArrowRight,
  ShieldCheck,
  CheckCheck,
} from 'lucide-react';

interface ClientOrderModalProps {
  isOpen: boolean;
  template: InvitationTemplate | null;
  onClose: () => void;
  onSubmitOrder: (newOrder: Order) => void;
}

const EXEMPLOS_ENSAIOS_DIGITAIS = [
  {
    id: 'ensaio-1',
    titulo: 'Ensaio Infantil Temático',
    subtitulo: 'Safári, Bosque ou Circo',
    preco: 25,
  },
  {
    id: 'ensaio-2',
    titulo: 'Ensaio Princesa / Realeza',
    subtitulo: 'Vestido de Gala e Castelo',
    preco: 25,
  },
  {
    id: 'ensaio-3',
    titulo: 'Ensaio Casal Romântico',
    subtitulo: 'Pôr do Sol e Cenário Floral',
    preco: 29,
  },
  {
    id: 'ensaio-4',
    titulo: 'Ensaio 1º Aninho Digital',
    subtitulo: 'Smash Cake e Balões',
    preco: 25,
  },
];

const CHAVE_PIX_KEH = '32998040080';

export function ClientOrderModal({
  isOpen,
  template,
  onClose,
  onSubmitOrder,
}: ClientOrderModalProps) {
  if (!isOpen || !template) return null;

  const temInteracao = Boolean(
    template.hasInteraction ||
    template.format === 'interativo_pdf' ||
    template.format === 'site_rsvp'
  );

  const [etapa, setEtapa] = useState<'formulario' | 'pagamento_pix' | 'concluido'>('formulario');

  // Campos do formulário
  const [nomeAniversariante, setNomeAniversariante] = useState('');
  const [dataEvento, setDataEvento] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [horarioEvento, setHorarioEvento] = useState('');
  const [localEvento, setLocalEvento] = useState('');
  const [fraseEspecial, setFraseEspecial] = useState('');
  const [whatsappCliente, setWhatsappCliente] = useState('');

  // Campos para modelo interativo/com botões se aplicável
  const [confirmacaoPresenca, setConfirmacaoPresenca] = useState('');
  const [linkLocalizacao, setLinkLocalizacao] = useState('');
  const [listaPresentes, setListaPresentes] = useState('');

  // Foto enviada pelo cliente
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Ensaio Digital Opcional
  const [querEnsaioDigital, setQuerEnsaioDigital] = useState(false);
  const [ensaioEscolhido, setEnsaioEscolhido] = useState<string>(EXEMPLOS_ENSAIOS_DIGITAIS[0].titulo);

  // Cópia do PIX
  const [pixCopiado, setPixCopiado] = useState(false);

  const valorEnsaio = querEnsaioDigital ? 25 : 0;
  const valorTotalFinal = template.price + valorEnsaio;

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoFile(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoverFoto = () => {
    setFotoFile(null);
    setFotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCopiarPix = () => {
    navigator.clipboard.writeText(CHAVE_PIX_KEH);
    setPixCopiado(true);
    setTimeout(() => setPixCopiado(false), 3000);
  };

  const handleAvancarParaPix = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nomeAniversariante.trim()) {
      alert('Por favor, informe o nome do anfitrião/homenageado.');
      return;
    }

    if (!whatsappCliente.trim()) {
      alert('Por favor, informe o seu número de WhatsApp.');
      return;
    }

    const notasFormatadas = [
      'Pedido via Catálogo Keh Convites',
      diaSemana ? `Dia: ${diaSemana}` : '',
      horarioEvento ? `Horário: ${horarioEvento}` : '',
      localEvento ? `Local: ${localEvento}` : '',
      fraseEspecial ? `Frase: "${fraseEspecial}"` : '',
      temInteracao
        ? `Interativo: RSVP (${confirmacaoPresenca || 'Sim'}) | Local (${linkLocalizacao || 'Sim'}) | Presentes (${listaPresentes || 'Sim'})`
        : 'Convite Simples',
      querEnsaioDigital ? `Ensaio Digital Incluso: Sim (${ensaioEscolhido})` : 'Sem Ensaio Digital',
      fotoFile ? `Foto Anexada: Sim (${fotoFile.name})` : 'Sem foto anexada',
      `PIX Keh Convites: R$ ${valorTotalFinal.toFixed(2)} (Chave: ${CHAVE_PIX_KEH})`,
    ]
      .filter(Boolean)
      .join(' | ');

    const novoPedido: Order = {
      id: `ped-${Date.now()}`,
      clientName: nomeAniversariante,
      clientWhatsapp: whatsappCliente,
      templateId: template.id,
      templateTitle: template.title,
      category: 'Convite Digital',
      digitalFormat: template.format,
      hasInteraction: temInteracao,
      rsvpContact: temInteracao ? confirmacaoPresenca : undefined,
      mapsLocation: temInteracao ? (linkLocalizacao || localEvento) : localEvento,
      giftList: temInteracao ? listaPresentes : undefined,
      totalValue: valorTotalFinal,
      paidValue: valorTotalFinal,
      eventDate: dataEvento || new Date().toISOString().split('T')[0],
      deadlineDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'pendente',
      paymentStatus: 'pago',
      includeDigitalPhotoshoot: querEnsaioDigital,
      photoshootDetails: querEnsaioDigital ? ensaioEscolhido : undefined,
      photoUrl: fotoPreview || undefined,
      notes: notasFormatadas,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onSubmitOrder(novoPedido);
    setEtapa('pagamento_pix');
  };

  const handleConcluirEFechar = () => {
    setEtapa('formulario');
    setPixCopiado(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#4B2E20]/70 backdrop-blur-sm animate-fade-in">
      <Card className="max-w-2xl w-full bg-[#fdfbf7] border-[#D4AF37]/50 shadow-2xl rounded-3xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Topo do Modal */}
        <CardHeader className="border-b border-[#D4AF37]/25 flex flex-row items-center justify-between pb-4 bg-gradient-to-r from-[#ecdccb]/80 to-[#f7ebdd]/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4B2E20] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-sm">
              {etapa === 'pagamento_pix' ? (
                <QrCode className="w-5 h-5" />
              ) : etapa === 'concluido' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg font-serif font-bold text-[#4B2E20]">
                {etapa === 'pagamento_pix'
                  ? 'Pagamento via PIX'
                  : etapa === 'concluido'
                  ? 'Pedido Confirmado com Sucesso!'
                  : 'Personalize seu Convite Digital'}
              </CardTitle>
              <p className="text-xs text-[#4B2E20]/75 font-medium">
                {etapa === 'pagamento_pix'
                  ? 'Efetue o PIX para confirmação imediata'
                  : etapa === 'concluido'
                  ? 'Seu convite já entrou em produção na Keh Convites'
                  : `Modelo: ${template.title}`}
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

        {/* ETAPA 1: FORMULÁRIO DE DADOS */}
        {etapa === 'formulario' && (
          <CardContent className="overflow-y-auto p-5 sm:p-6 space-y-5 text-xs text-[#4B2E20]">
            <form onSubmit={handleAvancarParaPix} className="space-y-5">
              {/* Resumo do Modelo Escolhido */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#ecdccb]/45 border border-[#D4AF37]/30">
                <div className="flex items-center gap-3">
                  <img
                    src={template.imageUrl}
                    alt={template.title}
                    className="w-12 h-12 rounded-xl object-cover border border-[#D4AF37]/40 shadow-xs"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                      Modelo Escolhido
                    </span>
                    <h4 className="font-serif font-bold text-[#4B2E20] text-sm">
                      {template.title}
                    </h4>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-[#4B2E20]/70">Valor:</span>
                  <p className="text-base font-bold text-[#4B2E20]">
                    R$ {template.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Informações Principais */}
              <div className="space-y-3">
                <h5 className="font-bold text-xs text-[#4B2E20] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#D4AF37]/20 pb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Dados do Evento
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">
                      Nome do Homenageado / Casal *
                    </label>
                    <Input
                      required
                      placeholder="Ex: Valentina, Beatriz & Lucas..."
                      value={nomeAniversariante}
                      onChange={(e) => setNomeAniversariante(e.target.value)}
                      className="bg-white border-[#D4AF37]/40 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">
                      Seu WhatsApp (para envio da prévia) *
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
                      <Input
                        required
                        placeholder="(32) 99999-9999"
                        value={whatsappCliente}
                        onChange={(e) => setWhatsappCliente(e.target.value)}
                        className="pl-8 bg-white border-[#D4AF37]/40 rounded-xl text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#D4AF37]" />
                      Data do Evento
                    </label>
                    <Input
                      type="date"
                      value={dataEvento}
                      onChange={(e) => setDataEvento(e.target.value)}
                      className="bg-white border-[#D4AF37]/40 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Dia da Semana</label>
                    <Input
                      placeholder="Ex: Sábado, Domingo..."
                      value={diaSemana}
                      onChange={(e) => setDiaSemana(e.target.value)}
                      className="bg-white border-[#D4AF37]/40 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      Horário
                    </label>
                    <Input
                      placeholder="Ex: Às 18:30"
                      value={horarioEvento}
                      onChange={(e) => setHorarioEvento(e.target.value)}
                      className="bg-white border-[#D4AF37]/40 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D4AF37]" />
                    Local do Evento / Endereço Completo
                  </label>
                  <Input
                    placeholder="Ex: Espaço Encantado - Rua das Acácias, 120"
                    value={localEvento}
                    onChange={(e) => setLocalEvento(e.target.value)}
                    className="bg-white border-[#D4AF37]/40 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">
                    Frase de Efeito ou Versículo (Opcional)
                  </label>
                  <Input
                    placeholder='Ex: "Venha comemorar comigo esse dia mágico!"'
                    value={fraseEspecial}
                    onChange={(e) => setFraseEspecial(e.target.value)}
                    className="bg-white border-[#D4AF37]/40 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Botões Clicáveis se o modelo tiver interação */}
              {temInteracao && (
                <div className="p-3.5 rounded-2xl bg-[#ecdccb]/35 border border-[#D4AF37]/30 space-y-3">
                  <h5 className="font-bold text-xs text-[#4B2E20] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Configuração dos Botões do Convite
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="block font-medium mb-1 text-[11px]">
                        WhatsApp para Confirmar Presença
                      </label>
                      <Input
                        placeholder="Ex: (32) 99999-0000"
                        value={confirmacaoPresenca}
                        onChange={(e) => setConfirmacaoPresenca(e.target.value)}
                        className="bg-white border-[#D4AF37]/40 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1 text-[11px]">
                        Link do Google Maps (Local)
                      </label>
                      <Input
                        placeholder="Link do Maps ou nome do local"
                        value={linkLocalizacao}
                        onChange={(e) => setLinkLocalizacao(e.target.value)}
                        className="bg-white border-[#D4AF37]/40 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1 text-[11px]">
                        Lista de Presentes (Link ou Loja)
                      </label>
                      <Input
                        placeholder="Ex: Loja X ou Pix ou Link"
                        value={listaPresentes}
                        onChange={(e) => setListaPresentes(e.target.value)}
                        className="bg-white border-[#D4AF37]/40 rounded-xl text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Upload Opcional de Foto do Cliente */}
              <div className="p-3.5 rounded-2xl bg-[#ecdccb]/35 border border-[#D4AF37]/30 space-y-2">
                <label className="block font-bold text-xs text-[#4B2E20] flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Enviar Foto para o Convite (Opcional)
                </label>
                <p className="text-[11px] text-[#4B2E20]/75">
                  Se o convite levar foto da criança ou do casal, anexe sua foto favorita abaixo.
                </p>

                <div className="flex items-center gap-3 pt-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFotoChange}
                    className="hidden"
                    id="foto-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="border-[#D4AF37]/50 text-[#4B2E20] bg-white hover:bg-[#ecdccb]/50 text-xs rounded-xl"
                  >
                    <Upload className="w-3.5 h-3.5 mr-1 text-[#D4AF37]" />
                    {fotoFile ? 'Trocar Foto' : 'Escolher Foto do Aparelho'}
                  </Button>

                  {fotoPreview && (
                    <div className="flex items-center gap-2">
                      <img
                        src={fotoPreview}
                        alt="Prévia"
                        className="w-10 h-10 rounded-xl object-cover border border-[#D4AF37]/50"
                      />
                      <button
                        type="button"
                        onClick={handleRemoverFoto}
                        className="text-[11px] text-red-600 hover:underline font-medium"
                      >
                        Remover
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Opção Adicional: Ensaio Digital */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#ecdccb]/60 to-[#fdfbf7] border border-[#D4AF37]/40 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-xs text-[#4B2E20] flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={querEnsaioDigital}
                        onChange={(e) => setQuerEnsaioDigital(e.target.checked)}
                        className="w-4 h-4 rounded text-[#4B2E20] focus:ring-[#D4AF37]"
                      />
                      <Heart className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Adicionar Ensaio Digital no meu Convite (+ R$ 25,00)
                    </label>
                    <p className="text-[11px] text-[#4B2E20]/75 pl-5">
                      Criamos uma linda foto temática digital para destacar ainda mais o seu convite.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#855729] shrink-0">
                    + R$ 25,00
                  </span>
                </div>

                {querEnsaioDigital && (
                  <div className="pl-5 pt-2 space-y-1">
                    <label className="block text-[11px] font-semibold text-[#4B2E20]">
                      Escolha o Estilo do Ensaio:
                    </label>
                    <select
                      value={ensaioEscolhido}
                      onChange={(e) => setEnsaioEscolhido(e.target.value)}
                      className="w-full h-8 px-2.5 rounded-xl bg-white border border-[#D4AF37]/40 text-xs text-[#4B2E20]"
                    >
                      {EXEMPLOS_ENSAIOS_DIGITAIS.map((e) => (
                        <option key={e.id} value={e.titulo}>
                          {e.titulo} ({e.subtitulo})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Totalizador */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#4B2E20] text-[#F7EBDD]">
                <div>
                  <span className="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-wider block">
                    Valor Total do Pedido
                  </span>
                  <span className="text-xs text-[#F7EBDD]/80">
                    {querEnsaioDigital ? 'Convite + Ensaio Digital' : 'Convite Digital'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-serif font-black text-[#D4AF37]">
                    R$ {valorTotalFinal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Botões do Formulário */}
              <div className="flex items-center justify-end gap-2 pt-2">
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
                  className="bg-[#4B2E20] hover:bg-[#382015] text-[#F7EBDD] font-bold text-xs rounded-xl border border-[#D4AF37]/40 px-5 shadow-sm flex items-center gap-1.5"
                >
                  <span>Ir para Pagamento PIX</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </Button>
              </div>
            </form>
          </CardContent>
        )}

        {/* ETAPA 2: TELA DE PAGAMENTO PIX */}
        {etapa === 'pagamento_pix' && (
          <CardContent className="overflow-y-auto p-5 sm:p-6 space-y-5 text-[#4B2E20]">
            <div className="text-center space-y-2 py-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-3xl bg-[#ecdccb]/80 border-2 border-[#D4AF37]/50 shadow-inner">
                <QrCode className="w-8 h-8 text-[#4B2E20]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#4B2E20]">
                Pagamento via PIX • Keh Convites
              </h3>
              <p className="text-xs text-[#4B2E20]/75 max-w-md mx-auto">
                Copie a chave PIX abaixo e efetue a transferência de{' '}
                <strong className="text-[#4B2E20] font-bold">R$ {valorTotalFinal.toFixed(2)}</strong> no aplicativo do seu banco.
              </p>
            </div>

            {/* Card com a Chave PIX */}
            <div className="p-4 rounded-2xl bg-[#ecdccb]/45 border border-[#D4AF37]/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#4B2E20]/75">
                  Tipo de Chave: <strong>Celular / Telefone</strong>
                </span>
                <span className="text-xs font-bold text-[#855729]">
                  Favorecida: Keila Souza
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-[#D4AF37]/40">
                <span className="font-mono text-sm sm:text-base font-bold text-[#4B2E20] flex-1 text-center sm:text-left select-all">
                  {CHAVE_PIX_KEH}
                </span>
                <Button
                  type="button"
                  onClick={handleCopiarPix}
                  className="bg-[#4B2E20] hover:bg-[#382015] text-[#F7EBDD] font-semibold text-xs rounded-lg px-3 shrink-0 flex items-center gap-1.5 shadow-xs"
                >
                  {pixCopiado ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Copiar Chave</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-[#D4AF37]/25 text-[#4B2E20]/80">
                <span>Valor exato a transferir:</span>
                <span className="font-bold text-[#4B2E20] text-sm">
                  R$ {valorTotalFinal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Aviso de Confirmação */}
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50/90 border border-amber-300 text-amber-900 text-xs">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                Assim que você realizar o PIX, seu pedido já estará registrado no nosso sistema administrativo e entraremos em contato no WhatsApp ({whatsappCliente || 'informado'}) com a sua prévia!
              </span>
            </div>

            {/* Botão de Finalização */}
            <div className="flex items-center justify-between pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setEtapa('formulario')}
                className="text-xs text-[#4B2E20] rounded-xl"
              >
                Voltar e Alterar Dados
              </Button>
              <Button
                type="button"
                onClick={() => setEtapa('concluido')}
                className="bg-[#4B2E20] hover:bg-[#382015] text-[#F7EBDD] font-bold text-xs rounded-xl border border-[#D4AF37]/40 px-5 shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Já Realizei o Pagamento</span>
              </Button>
            </div>
          </CardContent>
        )}

        {/* ETAPA 3: CONCLUÍDO */}
        {etapa === 'concluido' && (
          <CardContent className="p-6 sm:p-8 text-center space-y-4 text-[#4B2E20]">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center border-2 border-emerald-300 shadow-sm animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-xl text-[#4B2E20]">
                Pedido Realizado com Sucesso! 🎉
              </h3>
              <p className="text-xs text-[#4B2E20]/80 max-w-md mx-auto leading-relaxed">
                Muito obrigada pela preferência! Seu pedido do modelo{' '}
                <strong className="text-[#4B2E20]">{template.title}</strong> para{' '}
                <strong className="text-[#4B2E20]">{nomeAniversariante}</strong> já foi enviado para a área de criação da Keh Convites.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#ecdccb]/45 border border-[#D4AF37]/30 max-w-sm mx-auto text-xs space-y-1 text-left">
              <p className="text-[11px] text-[#4B2E20]/75">
                • <strong>Prazo de envio da prévia:</strong> até 24 a 48 horas úteis.
              </p>
              <p className="text-[11px] text-[#4B2E20]/75">
                • <strong>Canal de Envio:</strong> WhatsApp ({whatsappCliente}).
              </p>
              <p className="text-[11px] text-[#4B2E20]/75">
                • <strong>Valor Total:</strong> R$ {valorTotalFinal.toFixed(2)}.
              </p>
            </div>

            <div className="pt-3">
              <Button
                type="button"
                onClick={handleConcluirEFechar}
                className="bg-[#4B2E20] hover:bg-[#382015] text-[#F7EBDD] font-bold text-xs rounded-xl border border-[#D4AF37]/40 px-6 shadow-sm"
              >
                Concluir e Voltar aos Modelos
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}