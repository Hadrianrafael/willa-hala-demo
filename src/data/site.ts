/**
 * Todo o conteúdo factual do site vive aqui, com a fonte de cada dado.
 * Fontes consultadas em set/2026: Instagram @willa.hala (bio pública), Linktree oficial
 * (linktr.ee/willahala.1) e página da hospedagem no Booking.com.
 * Nada aqui é inventado — o que não foi confirmado fica de fora ou marcado como pendente.
 */

export const site = {
  name: "Willa Hala",
  city: "Vinhedo",
  state: "SP",
  // Booking.com (endereço e CEP) e listagens públicas
  address: "Rua Luiz de Campos Serra, 1285 — Chácaras São Bento",
  cityLine: "Vinhedo · São Paulo · CEP 13278-033",
  // Instagram / Linktree oficial
  instagram: "https://www.instagram.com/willa.hala/",
  instagramHandle: "@willa.hala",
  whatsapp: "https://api.whatsapp.com/send?phone=5519984428183",
  whatsappLabel: "(19) 98442-8183",
  email: "willahala.1@gmail.com",
  // Link oficial divulgado no Linktree da hospedagem (sem parâmetros de rastreamento)
  booking: "https://www.booking.com/hotel/br/willa-hala.pt-br.html",
  // Nenhum anúncio oficial da Willa Hala foi encontrado no Airbnb — aguardando o link do cliente.
  airbnb: null as string | null,
  maps: "https://www.google.com/maps/search/?api=1&query=Willa+Hala+Rua+Luiz+de+Campos+Serra+1285+Vinhedo+SP",
  mapsEmbed:
    "https://www.google.com/maps?q=Willa+Hala+Rua+Luiz+de+Campos+Serra+1285+Vinhedo+SP&output=embed",
} as const;

export const nav = [
  { href: "#hospedagem", label: "A hospedagem" },
  { href: "#acomodacoes", label: "Acomodações" },
  { href: "#galeria", label: "Galeria" },
  { href: "#experiencias", label: "Experiências" },
  { href: "#localizacao", label: "Localização" },
] as const;

/** Avaliações públicas do Booking.com (428 avaliações, consultado em set/2026). */
export const ratings = {
  overall: "9,2",
  count: 428,
  label: "Fantástico",
  categories: [
    { label: "Atendimento da equipe", value: 9.8 },
    { label: "Limpeza", value: 9.4 },
    { label: "Custo-benefício", value: 9.3 },
    { label: "Conforto", value: 9.0 },
    { label: "Localização", value: 8.9 },
    { label: "Comodidades", value: 8.8 },
  ],
  /** Temas recorrentes nos comentários dos hóspedes (síntese, sem citação literal). */
  highlights: ["Acolhimento", "Tranquilidade", "Limpeza", "Café da manhã", "Estacionamento gratuito"],
} as const;

export const rooms = [
  {
    slot: "quarto-queen-jardim",
    scene: "queen",
    name: "Queen com Vista para o Jardim",
    beds: "1 cama de casal grande",
    text: "Cama de casal grande e vista para o jardim: o quarto para acordar com o verde da propriedade.",
  },
  {
    slot: "quarto-suite-deluxe",
    scene: "suite",
    name: "Suíte Deluxe Queen-size",
    beds: "1 cama de casal grande",
    text: "A suíte deluxe da casa, com cama queen-size e o conforto de um refúgio preparado para dois.",
  },
  {
    slot: "quarto-duplo",
    scene: "twin",
    name: "Quarto Duplo Amplo",
    beds: "2 camas de solteiro",
    text: "Duas camas de solteiro em um quarto amplo — para amigos, colegas de viagem ou família.",
  },
  {
    slot: "quarto-triplo",
    scene: "triple",
    name: "Quarto Triplo Comfort",
    beds: "3 camas de solteiro",
    text: "Três camas de solteiro para estadias em grupo, com a mesma calma e o mesmo cuidado da casa.",
  },
] as const;

export const roomAmenities = [
  "Banheiro privativo",
  "TV",
  "Chaleira elétrica",
  "Wi-Fi gratuito",
  "Vista para o jardim",
] as const;

export const experiences = [
  {
    slot: "exp-cafe",
    scene: "breakfast",
    title: "Café da manhã",
    text: "Café da manhã continental e buffet, um dos pontos mais elogiados pelos hóspedes.",
  },
  {
    slot: "exp-jardim",
    scene: "garden",
    title: "Jardim",
    text: "Um lindo jardim, com assentos ao ar livre, para desacelerar entre plantas e pássaros.",
  },
  {
    slot: "exp-lareira",
    scene: "fireplace",
    title: "Lareira externa",
    text: "Lareira ao ar livre: um convite para ficar mais um pouco depois do jantar.",
  },
  {
    slot: "exp-sala",
    scene: "lounge",
    title: "Sala de estar",
    text: "Sala de estar para receber, conversar e descansar em um ambiente aconchegante.",
  },
  {
    slot: "exp-criancas",
    scene: "kids",
    title: "Espaço para crianças",
    text: "Área de recreação interna e quartos para famílias. Crianças de qualquer idade são bem-vindas.",
  },
  {
    slot: "exp-cafeteria",
    scene: "cafe",
    title: "Cafeteria",
    text: "Cafeteria na propriedade para uma pausa tranquila durante a estadia.",
  },
] as const;

export const perks = [
  "Estacionamento privativo gratuito",
  "Wi-Fi gratuito",
  "Quartos para famílias",
  "Quartos para não fumantes",
  "Estadia individual ou em grupo",
] as const;

/** Distâncias informadas pelo Booking.com (estimativas por rota/linha reta). */
export const distances = [
  { label: "Bosque dos Ipês", km: 6 },
  { label: "Estação de trem de Valinhos", km: 7 },
  { label: "Parque das Águas", km: 10 },
  { label: "Wet'n Wild São Paulo", km: 13 },
  { label: "Campinas Shopping", km: 15 },
  { label: "Aeroporto de Viracopos", km: 20 },
] as const;

export const farAirports = [
  { label: "Congonhas", km: 86 },
  { label: "Guarulhos", km: 96 },
] as const;

export const rules = [
  { label: "Check-in", value: "15h às 18h" },
  { label: "Check-out", value: "8h às 11h" },
  { label: "Crianças", value: "De qualquer idade" },
  { label: "Berço", value: "Grátis, sob pedido" },
  { label: "Pets", value: "Não permitidos" },
  { label: "Festas", value: "Não permitidas" },
] as const;

/** Galeria: cada item é um "slot" que recebe a foto real de public/photos/<slot>.jpg */
export const gallery = [
  { slot: "gal-01", scene: "house", alt: "Fachada da Willa Hala", span: "col-span-2 row-span-2 md:col-span-6 md:row-span-2" },
  { slot: "gal-02", scene: "garden", alt: "Jardim da propriedade", span: "col-span-1 md:col-span-3" },
  { slot: "gal-03", scene: "queen", alt: "Quarto com cama queen", span: "col-span-1 md:col-span-3" },
  { slot: "gal-04", scene: "breakfast", alt: "Mesa do café da manhã", span: "col-span-1 md:col-span-3 md:row-span-2" },
  { slot: "gal-05", scene: "fireplace", alt: "Lareira externa", span: "col-span-1 md:col-span-3" },
  { slot: "gal-06", scene: "lounge", alt: "Sala de estar", span: "col-span-1 md:col-span-4" },
  { slot: "gal-07", scene: "detail", alt: "Detalhes da decoração", span: "col-span-1 md:col-span-2" },
  { slot: "gal-08", scene: "suite", alt: "Suíte deluxe", span: "col-span-2 md:col-span-3" },
  { slot: "gal-09", scene: "garden", alt: "Recantos verdes da casa", span: "col-span-2 md:col-span-12" },
] as const;

export type Scene =
  | "house"
  | "garden"
  | "queen"
  | "suite"
  | "twin"
  | "triple"
  | "breakfast"
  | "fireplace"
  | "lounge"
  | "kids"
  | "cafe"
  | "detail";
