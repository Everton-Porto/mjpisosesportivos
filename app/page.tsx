"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// ─── CONFIG ────────────────────────────────────────────────────────────────────

const WA = "https://wa.me/5551997340520";

// ─── ANIMATION PRIMITIVE ───────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── DATA ──────────────────────────────────────────────────────────────────────

const DIFERENCIAIS = [
  { key: "install", title: "Instalação Rápida Sem Quebra",  desc: "Sistema de encaixe tecnológico. Sem obras, sem entulho, sem cola." },
  { key: "shield",  title: "Alta Durabilidade",             desc: "10 anos de garantia escrita. Carga suportada de 1.530 kg/m²." },
  { key: "sun",     title: "Resistência UV",                desc: "Cor estável, sem desbotamento mesmo após anos de exposição solar." },
  { key: "grip",    title: "Sistema Antiderrapante",        desc: "Textura de alta aderência — segurança garantida em qualquer clima." },
  { key: "layers",  title: "Tecnologia Shock Floor®",       desc: "30 pinos de amortecimento por placa. Redução de 30% no impacto." },
  { key: "impact",  title: "Proteção ao Impacto",           desc: "Laudo Inmetro de queda livre de 1,4m. Proteção certificada." },
  { key: "tool",    title: "Fácil Manutenção",              desc: "Limpeza simples com água. Módulos substituídos individualmente." },
  { key: "drop",    title: "Escoamento de Água",            desc: "Drenos integrados — sem acúmulo de água ou fungos." },
  { key: "badge",   title: "Garantia de Fábrica",           desc: "Garantia escrita comprovada em laudo de laboratório credenciado." },
  { key: "cert",    title: "Certificações Completas",       desc: "INMETRO · ABNT NBR 16071 · ASTM · DIN ISO." },
] as const;

const PRODUTOS = [
  {
    tag: "Interno",    linha: "Linha EI · Mod. EI-30",   title: "EI-30 Interno",
    desc: "Ginásios cobertos, quadras indoor e salões multiuso. Conforto acústico superior, Tecnologia Shock Floor® integrada e montagem limpa sem cola.",
    specs: ["INTERNO · ACÚSTICO · SEM COLA", "Amortecimento Shock Floor®", "Carga 1.530 kg/m²"],
    aplicacao: "Ginásios, Quadras Indoor",
    img: "/interno.jpeg",
  },
  {
    tag: "Externo",    linha: "Linha EE · Mod. EE-30",   title: "EE-30 Externo",
    desc: "Quadras externas, praças e escolas descobertas. Proteção UV contra desbotamento e Sistema Antifurto para proteção do patrimônio.",
    specs: ["EXTERNO · UV · ANTIFURTO", "Escoamento rápido de água", "Superfície antiderrapante"],
    aplicacao: "Quadras Externas, Praças",
    img: "/externo.jpg",
  },
  {
    tag: "Tênis",      linha: "Linha T · Mod. T-31",      title: "Tênis T-31",
    desc: "Quadras de tênis e áreas poliesportivas de alto rendimento. Performance de nível internacional, Categoria 4 de velocidade (ITF) e Sistema Antifurto.",
    specs: ["CAT. 4 · ANTIFURTO · PATENTEADO", "Padrão ITF profissional", "Indoor e Outdoor"],
    aplicacao: "Quadras de Tênis",
    img: "/tenis.png",
  },
  {
    tag: "Playground", linha: "Linha Kids · Playground",  title: "Kids / Playground",
    desc: "Áreas de brinquedos, creches e pátios infantis. Detentor do laudo exclusivo de queda livre de 1,4m — exigência ABNT NBR 16071-2:2021.",
    specs: ["QUEDA 1,4M · INMETRO", "ABNT NBR 16071-2:2021", "Superfície macia e segura"],
    aplicacao: "Playgrounds, Escolas",
    img: "/kids.jpeg",
  },
];

const SF_LAYERS = [
  {
    title: "Camada de Superfície",
    tags: "Antiderrapante · UV+ · Cor estável",
    css: "sf-surface bg-[#1e3a5c]",
    accent: false,
    iconPath: "M3 6h18M3 10h18M3 14h18",
  },
  {
    title: "Núcleo Estrutural",
    tags: "Rigidez dimensional · Carga 1.530 kg/m²",
    css: "sf-core bg-[#17304d]",
    accent: false,
    iconPath: "M4 4h4v4H4zM10 4h4v4h-4zM16 4h4v4h-4zM4 10h4v4H4zM10 10h4v4h-4zM16 10h4v4h-4zM4 16h4v4H4zM10 16h4v4h-4zM16 16h4v4h-4z",
  },
  {
    title: "Câmaras Shock Floor®",
    tags: "30 pinos/placa · Redução de 30% no impacto",
    css: "sf-shock bg-[#1e1200]",
    accent: true,
    iconPath: "M12 8a4 4 0 100 8 4 4 0 000-8zM5 12a7 7 0 1014 0A7 7 0 005 12z M8 12a4 4 0 108 0",
  },
  {
    title: "Base de Drenagem",
    tags: "Escoamento · Anti-umidade · Ventilação",
    css: "sf-drain bg-[#0c1a26]",
    accent: false,
    iconPath: "M12 3c0 0-6 7-6 11a6 6 0 0012 0c0-4-6-11-6-11zM9.5 18a2.5 2.5 0 004 0",
  },
];

const SF_BENEFITS = [
  {
    title: "Proteção Articular",
    desc: "Redução real de 30% no impacto — protegendo joelhos, tornozelos e articulações de atletas, crianças e adultos.",
    iconPath: "M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z",
  },
  {
    title: "Performance Esportiva",
    desc: "Retorno energético otimizado pelo sistema de pinos — mais performance sem comprometer a segurança.",
    iconPath: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  },
  {
    title: "Redução de Ruído",
    desc: "Câmaras de amortecimento absorvem vibrações e reduzem significativamente o ruído de impacto.",
    iconPath: "M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07",
  },
  {
    title: "Estabilidade Térmica",
    desc: "Mantém propriedades estruturais em qualquer clima — da neve ao sol forte — sem deformação.",
    iconPath: "M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z",
  },
  {
    title: "Patrimônio Reversível",
    desc: "Pode ser reposicionado ou expandido. Módulos individuais substituídos sem perda de material.",
    iconPath: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
  },
];

const CLIENTES = [
  { name: "Prefeitura de Nova Petrópolis", type: "Governo Municipal · RS", icon: "gov" },
  { name: "Prefeitura de Xangri-Lá",      type: "Governo Municipal · RS", icon: "gov" },
  { name: "Prefeitura de Palmares do Sul", type: "Governo Municipal · RS", icon: "gov" },
  { name: "Colégio La Salle",             type: "Instituição de Ensino",   icon: "school" },
  { name: "Escola Maple Bear",            type: "Escola Internacional",    icon: "school" },
  { name: "Colégio Dom Bosco",            type: "Instituição de Ensino",   icon: "school" },
  { name: "APCEF / SC",                   type: "Associação",              icon: "org" },
];

const DEPOIMENTOS = [
  {
    quote: "Que espetáculo! Isso é primeiro mundo mesmo.",
    author: "Frederico Figueiró",
    role: "Vice-Prefeito e Secretário de Educação",
    org: "Xangri-Lá / RS",
  },
  {
    quote: "Só elogios. Equipe sempre atenciosa, cuidadosa com as crianças e respeitosa com as professoras.",
    author: "Gorete Ferrari",
    role: "Diretora",
    org: "EMEI Lobinho Guará · Xangri-Lá / RS",
  },
];

const PROJETOS = [
  { title: "Quadra Poliesportiva",  detail: "Piso EE-30 · Externo",  img: "/proj_1.jpeg" },
  { title: "Playground Kids",       detail: "Linha Infantil",         img: "/kids.jpeg" },
  { title: "Ginásio Indoor",        detail: "Piso EI-30 · Interno",  img: "/interno.jpeg" },
  { title: "Quadra Coberta",        detail: "Piso EE-30 · Externo",  img: "/externo.jpg" },
  { title: "Escola Estadual",       detail: "Projeto Municipal",      img: "/proj_2.jpeg" },
  { title: "Espaço Público",        detail: "Projeto Prefeitura",     img: "/proj_3.jpeg" },
];

const CERTIFICACOES = [
  { code: "INMETRO", full: "Instituto Nacional de Metrologia",          desc: "Laudos credenciados de resistência, impacto e queda livre de 1,4m." },
  { code: "ABNT",    full: "Normas Brasileiras",                         desc: "NBR 16071-2:2021, NBR 16071-3:2021, NBR 11300, NBR 16040 e NBR 300-3." },
  { code: "ASTM",    full: "American Society for Testing and Materials", desc: "D638, D256, D792, G154 e D2244 — padrão internacional de qualidade." },
  { code: "DIN ISO", full: "Norma Industrial Alemã",                     desc: "ISO 4649-2006 (Resistência à abrasão) e UL94 (Inflamabilidade)." },
];

const SPECS = [
  { label: "Garantia Escrita",          value: "10 Anos" },
  { label: "Carga Suportada",           value: "1.530 kg/m²" },
  { label: "Redução de Impacto",        value: "−30%" },
  { label: "Queda Livre Laudo Inmetro", value: "1,4 m" },
];

const SEGMENTOS = [
  "Quadras Esportivas", "Escolas",
  "Prefeituras",        "Condomínios",
  "Academias",          "Playgrounds",
  "Espaços Públicos",   "Indoor · Outdoor",
];

// ─── ICONS ─────────────────────────────────────────────────────────────────────

function IcoArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M10 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoWA({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.15-1.758-.867-2.03-.967-.273-.1-.471-.15-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.532 5.858L.057 23.95l6.234-1.637A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.819 9.819 0 01-5.016-1.373l-.36-.214-3.726.978.995-3.64-.234-.373A9.832 9.832 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
    </svg>
  );
}

function IcoMenu() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IcoClose() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IcoStar({ filled = true }: { filled?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 1l1.8 4.2L14 6l-3 3.1.7 4.4L8 11.2 4.3 13.5l.7-4.4L2 6l4.2-.8L8 1z"
        fill={filled ? "#ea8e25" : "none"}
        stroke="#ea8e25"
        strokeWidth="1"
      />
    </svg>
  );
}

function IcoCert() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="18" cy="16" r="10" stroke="#ea8e25" strokeWidth="1.5" />
      <path d="M13 31l-2.5 4.5 7.5-2 7.5 2L23 31" stroke="#ea8e25" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 16l3 3 5-6" stroke="#ea8e25" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcoClientType({ type }: { type: string }) {
  if (type === "gov") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3 18h14M2 8h16M10 2L2 7h16L10 2zM5 8v10M10 8v10M15 8v10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "school") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2L2 7l8 5 8-5-8-5z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
        <path d="M2 7v6M6 9.5V16a4 4 0 008 0V9.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        <circle cx="18" cy="7" r="1.5" fill="currentColor" />
        <path d="M18 8.5V13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="6" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M14 6V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2M10 11v2M8 11h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function DifIcon({ k }: { k: string }) {
  const W = 26;
  switch (k) {
    case "install":
      return <svg width={W} height={W} viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="15" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="15" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="15" y="15" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 7h4M7 11v4M19 11v4M11 19h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>;
    case "shield":
      return <svg width={W} height={W} viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path d="M13 3L5 7v6c0 5 4 9 8 10 4-1 8-5 8-10V7L13 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>;
    case "sun":
      return <svg width={W} height={W} viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="13" cy="13" r="4.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 2v3M13 21v3M2 13h3M21 13h3M5.6 5.6l2.1 2.1M18.3 18.3l2.1 2.1M20.4 5.6l-2.1 2.1M7.7 18.3l-2.1 2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>;
    case "grip":
      return <svg width={W} height={W} viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path d="M5 21L21 5M5 15L15 5M11 21L21 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>;
    case "layers":
      return <svg width={W} height={W} viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path d="M3 7l10-4 10 4-10 4L3 7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3 13l10 4 10-4M3 19l10 4 10-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>;
    case "impact":
      return <svg width={W} height={W} viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="13" cy="13" r="9" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="13" cy="13" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="13" cy="13" r="2" fill="currentColor" opacity="0.6" />
      </svg>;
    case "tool":
      return <svg width={W} height={W} viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path d="M17 5c0 0 2 2 2 5s-3 4.5-3 4.5L8 23 3 18l8-8.5S11 7 14 7l3-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>;
    case "drop":
      return <svg width={W} height={W} viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path d="M13 3C13 3 6 11 6 16a7 7 0 0014 0c0-5-7-13-7-13z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9.5 18a3.5 3.5 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>;
    case "badge":
      return <svg width={W} height={W} viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="13" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 19l-2 4 6-2 6 2-2-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 11l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>;
    case "cert":
      return <svg width={W} height={W} viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path d="M13 2l2.7 6 6.3.5-4.7 4.3 1.5 6.5L13 16l-5.8 3.3 1.5-6.5L4 8.5l6.3-.5L13 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>;
    default: return null;
  }
}

// ─── SHARED ────────────────────────────────────────────────────────────────────

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`font-semibold text-xs uppercase tracking-[0.22em] mb-3 ${light ? "text-ds-orange" : "text-ds-orange"}`}>
      {children}
    </p>
  );
}

// ─── NAVBAR ────────────────────────────────────────────────────────────────────

function Navbar({ scrolled, open, setOpen }: {
  scrolled: boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ds-950/97 backdrop-blur-md nav-shadow py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="shrink-0">
          <img
            src="/logo_mj.svg"
            alt="MJ Pisos Esportivos"
            className="h-10 w-auto"
          />
        </a>

        {/* Desktop CTA only */}
        <div className="flex items-center gap-3">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-ds-orange hover:bg-ds-orange-h text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors"
          >
            <IcoWA size={18} />
            Falar no WhatsApp
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden text-white p-1"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <IcoClose /> : <IcoMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu — logo + WA */}
      {open && (
        <div className="sm:hidden bg-ds-950 border-t border-ds-border px-6 py-5">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-ds-orange text-white font-bold px-5 py-3 rounded"
          >
            <IcoWA /> Falar no WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/header.jpeg"
          alt="Quadra esportiva com piso MJ"
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-ds-950/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-ds-950/85 via-ds-950/55 to-transparent" />
      </div>

      {/* Orange left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-ds-orange z-10" />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10 w-full">
        <div className="max-w-2xl">
          <FadeUp>
            <p className="text-ds-orange font-semibold text-sm uppercase tracking-[0.22em] mb-5">
              Shock Floor® · Inmetro · 10 Anos · Antifurto
            </p>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1
              className="font-display text-white uppercase leading-[0.92] tracking-wide"
              style={{ fontSize: "clamp(3.2rem, 8vw, 6rem)" }}
            >
              Transformamos
              <br />
              <span className="text-ds-orange">quadras</span>
              <br />
              em referência.
            </h1>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="text-ds-300 text-lg mt-8 max-w-lg leading-relaxed">
              Pisos modulares com{" "}
              <strong className="text-white font-semibold">10 anos de garantia</strong>{" "}
              e tecnologia certificada internacionalmente. Instalação em dias — sem obra,
              sem cola, sem reforma.
            </p>
          </FadeUp>

          <FadeUp delay={0.24}>
            <div className="flex flex-wrap gap-4 mt-10">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ds-orange hover:bg-ds-orange-h text-white font-bold px-8 py-4 rounded text-base transition-colors"
              >
                Solicitar Orçamento <IcoArrow />
              </a>
              <a
                href="#produtos"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded text-base transition-colors"
              >
                Ver Produtos
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.32}>
            <div className="mt-16 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { v: "10 Anos",        s: "Garantia Escrita" },
                { v: "1.530 kg/m²",    s: "Carga Suportada" },
                { v: "−30%",           s: "Redução de Impacto" },
                { v: "1,4 m",          s: "Laudo Queda Inmetro" },
              ].map((item) => (
                <div key={item.v}>
                  <div className="text-white font-display text-xl uppercase tracking-wide leading-tight">{item.v}</div>
                  <div className="text-ds-400 text-xs mt-1">{item.s}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── DIFERENCIAIS ──────────────────────────────────────────────────────────────

function SecDiferenciais() {
  return (
    <section id="diferenciais" className="bg-ds-050 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="max-w-2xl mb-14">
            <Eyebrow>Por que escolher a MJ Pisos</Eyebrow>
            <h2 className="font-display text-5xl lg:text-6xl uppercase text-ds-900 leading-tight">
              Diferenciais Técnicos
            </h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-ds-200 rounded-xl overflow-hidden">
          {DIFERENCIAIS.map((item, i) => (
            <FadeUp key={item.key} delay={i * 0.04}>
              <div className="bg-ds-050 hover:bg-white p-6 transition-colors group h-full">
                <div className="text-ds-orange mb-4 group-hover:scale-110 transition-transform origin-left">
                  <DifIcon k={item.key} />
                </div>
                <h3 className="font-display text-lg uppercase text-ds-900 leading-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-ds-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EMPRESA ───────────────────────────────────────────────────────────────────

function SecEmpresa() {
  return (
    <section id="empresa" className="bg-ds-900 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div>
              <Eyebrow>Sobre a empresa</Eyebrow>
              <h2 className="font-display text-5xl lg:text-6xl uppercase text-white leading-tight mb-6">
                Referência em pisos esportivos modulares
              </h2>
              <p className="text-ds-300 leading-relaxed mb-5">
                A MJ Pisos Esportivos é especializada em soluções de alto desempenho para
                ambientes internos e externos. Atendemos projetos de todos os portes com
                tecnologia de ponta, consultoria técnica completa e suporte pós-venda.
              </p>
              <p className="text-ds-300 leading-relaxed mb-10">
                Sistema importado dos EUA, patenteado e certificado — com 30 pinos de
                amortecimento por placa e redução real de 30% no impacto. Nossa equipe
                acompanha cada obra do planejamento à entrega.
              </p>
              <ul className="space-y-2.5 text-sm text-ds-400">
                <li className="flex items-start gap-3">
                  <span className="text-ds-orange mt-0.5">▸</span>
                  R. Barão do Rio Branco, 537 — Niterói, Canoas / RS
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ds-orange mt-0.5">▸</span>
                  <a href="tel:+5551997340520" className="hover:text-white transition-colors">(51) 99734-0520</a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-ds-orange mt-0.5">▸</span>
                  comerciodepisosesportivos@gmail.com
                </li>
              </ul>

              <div className="grid grid-cols-2 gap-3 mt-10">
                {SEGMENTOS.map((seg) => (
                  <div
                    key={seg}
                    className="border border-ds-border hover:border-ds-orange/40 rounded-lg px-4 py-3 text-white text-sm flex items-center gap-3 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-ds-orange shrink-0" />
                    {seg}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Photo */}
          <FadeIn delay={0.15}>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-[3/4]">
              <Image
                src="/sobre.jpeg"
                alt="Instalação de piso MJ Pisos"
                fill
                className="object-cover object-center"
                quality={80}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ds-950/40 to-transparent" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── PRODUTOS ──────────────────────────────────────────────────────────────────

function SecProdutos() {
  return (
    <section id="produtos" className="bg-ds-050 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="max-w-2xl mb-14">
            <Eyebrow>Linha de produtos</Eyebrow>
            <h2 className="font-display text-5xl lg:text-6xl uppercase text-ds-900 leading-tight mb-3">
              Soluções para cada ambiente
            </h2>
            <p className="text-ds-500">Do playground ao ginásio municipal — temos a linha certa para o seu projeto.</p>
          </div>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUTOS.map((p, i) => (
            <FadeUp key={p.tag} delay={i * 0.07}>
              <article className="product-card bg-ds-900 rounded-xl overflow-hidden flex flex-col h-full">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-cover object-center"
                    quality={80}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ds-950/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-ds-orange text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      {p.linha}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <span className="text-ds-orange text-[11px] font-bold uppercase tracking-widest mb-1">{p.tag}</span>
                  <h3 className="font-display text-2xl uppercase text-white leading-tight mb-3">{p.title}</h3>
                  <p className="text-ds-400 text-sm leading-relaxed flex-1">{p.desc}</p>

                  <ul className="mt-4 space-y-1.5">
                    {p.specs.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-xs text-ds-400">
                        <span className="text-ds-orange shrink-0"><IcoCheck /></span>
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-4 border-t border-ds-border flex items-center justify-between">
                    <span className="text-ds-500 text-xs">{p.aplicacao}</span>
                    <a
                      href={WA}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-ds-orange hover:text-ds-orange-h font-semibold text-sm transition-colors"
                    >
                      Saiba mais <IcoArrow />
                    </a>
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SHOCK FLOOR ───────────────────────────────────────────────────────────────

function SecShockFloor() {
  return (
    <section id="tecnologia" className="bg-ds-950 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header + image */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
          <FadeUp>
            <div>
              <Eyebrow>Tecnologia proprietária</Eyebrow>
              <h2 className="font-display text-5xl lg:text-6xl uppercase text-white leading-tight mb-6">
                Shock Floor®
                <br />
                <span className="text-ds-orange">Não é só um piso.</span>
                <br />
                É proteção do corpo.
              </h2>
              <p className="text-ds-300 leading-relaxed mb-4">
                Sistema importado dos EUA, patenteado e certificado.{" "}
                <strong className="text-white">30 pinos de amortecimento por placa</strong>{" "}
                e redução real de <strong className="text-white">30% no impacto com o solo</strong> —
                protegendo articulações de atletas, crianças e adultos.
              </p>
              <p className="text-ds-400 text-sm leading-relaxed">
                Certificado pelo INMETRO com laudo de queda livre de 1,4m —
                em conformidade com ABNT NBR 16071-2:2021.
              </p>
            </div>
          </FadeUp>

          <FadeIn delay={0.15}>
            <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-[4/3]">
              <Image
                src="/sf.png"
                alt="Tecnologia Shock Floor — estrutura em camadas"
                fill
                className="object-cover object-center"
                quality={85}
              />
            </div>
          </FadeIn>
        </div>

        {/* Layer diagram */}
        <FadeUp>
          <div className="mb-16">
            <p className="text-ds-400 text-xs uppercase tracking-widest mb-5 text-center">
              Estrutura em 4 camadas — passe o cursor para explorar
            </p>
            <div className="flex flex-col rounded-2xl overflow-hidden border border-ds-border h-80">
              {SF_LAYERS.map((layer) => (
                <div
                  key={layer.title}
                  className={`sf-layer group relative flex items-center gap-6 px-8 ${layer.css}`}
                >
                  {/* Layer icon */}
                  <div className={`shrink-0 ${layer.accent ? "text-ds-orange" : "text-white/50 group-hover:text-white/90"} transition-colors`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={layer.iconPath} />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <div className={`font-display text-xl uppercase leading-tight font-normal ${layer.accent ? "text-ds-orange" : "text-white"}`}>
                      {layer.title}
                    </div>
                    <div className="text-ds-300 text-sm mt-0.5 group-hover:text-white/90 transition-colors">{layer.tags}</div>
                  </div>

                  {layer.accent && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 shrink-0">
                      <span className="border border-ds-orange/60 text-ds-orange text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-widest">
                        Patenteado
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {SF_BENEFITS.map((b, i) => (
            <FadeUp key={b.title} delay={i * 0.06}>
              <div className="bg-ds-800 rounded-xl p-5 border border-ds-border hover:border-ds-orange/30 transition-colors">
                <div className="text-ds-orange mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={b.iconPath} />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-sm mb-2 leading-tight">{b.title}</h3>
                <p className="text-ds-400 text-xs leading-relaxed">{b.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CLIENTES ──────────────────────────────────────────────────────────────────

function SecClientes() {
  return (
    <section id="clientes" className="bg-ds-050 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="max-w-2xl mb-14">
            <Eyebrow>Prova social</Eyebrow>
            <h2 className="font-display text-5xl lg:text-6xl uppercase text-ds-900 leading-tight mb-3">
              Quem já confia na MJ Pisos
            </h2>
            <p className="text-ds-500">Prefeituras, escolas de referência e grandes instituições do Brasil.</p>
          </div>
        </FadeUp>

        {/* Client grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {CLIENTES.map((c, i) => (
            <FadeUp key={c.name} delay={i * 0.05}>
              <div className="bg-white border border-ds-200 hover:border-ds-orange/40 rounded-xl p-5 text-center transition-colors h-full flex flex-col items-center justify-center gap-2">
                <div className="text-ds-400 mb-1">
                  <IcoClientType type={c.icon} />
                </div>
                <div className="font-semibold text-ds-900 text-sm leading-tight">{c.name}</div>
                <div className="text-ds-400 text-xs">{c.type}</div>
              </div>
            </FadeUp>
          ))}
          <FadeUp delay={0.35}>
            <div className="bg-ds-orange rounded-xl p-5 flex flex-col items-center justify-center h-full">
              <span className="text-white font-display text-4xl leading-none">+</span>
              <span className="text-white/80 text-xs mt-1.5 text-center">Seu Projeto Aqui</span>
            </div>
          </FadeUp>
        </div>

        {/* Testimonials — 2 real ones */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {DEPOIMENTOS.map((d, i) => (
            <FadeUp key={d.author} delay={i * 0.1}>
              <blockquote className="bg-white border border-ds-200 rounded-xl p-7">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => <IcoStar key={s} />)}
                </div>
                <p className="text-ds-700 text-base leading-relaxed italic mb-6">
                  &ldquo;{d.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ds-900 flex items-center justify-center font-display text-white text-lg shrink-0">
                    {d.author.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-ds-900 text-sm">{d.author}</div>
                    <div className="text-ds-500 text-xs">{d.role} · {d.org}</div>
                  </div>
                </div>
              </blockquote>
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <div className="text-center">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ds-orange hover:bg-ds-orange-h text-white font-bold px-8 py-4 rounded text-base transition-colors"
            >
              Solicite um orçamento <IcoArrow />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── PROJETOS ──────────────────────────────────────────────────────────────────

function SecProjetos() {
  return (
    <section id="projetos" className="bg-ds-900 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="max-w-2xl mb-14">
            <Eyebrow>Portfólio</Eyebrow>
            <h2 className="font-display text-5xl lg:text-6xl uppercase text-white leading-tight mb-3">
              Projetos executados
            </h2>
            <p className="text-ds-400">
              Instalações realizadas em todo o Brasil — da escola à quadra municipal.
            </p>
          </div>
        </FadeUp>

        {/* 6 projetos, 3 colunas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJETOS.map((proj, i) => (
            <FadeUp key={proj.title} delay={i * 0.07}>
              <div className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-ds-border hover:border-ds-orange/40 transition-colors">
                <Image
                  src={proj.img}
                  alt={proj.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  quality={75}
                />
                <div className="absolute inset-0 bg-ds-950/40 group-hover:bg-ds-950/25 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-ds-950/90 to-transparent">
                  <span className="text-white font-semibold text-base leading-tight block">{proj.title}</span>
                  <span className="text-ds-300 text-xs">{proj.detail}</span>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-ds-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CERTIFICAÇÕES ─────────────────────────────────────────────────────────────

function SecCertificacoes() {
  return (
    <section id="certificacoes" className="bg-ds-050 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp>
          <div className="max-w-2xl mb-14">
            <Eyebrow>Conformidade e qualidade</Eyebrow>
            <h2 className="font-display text-5xl lg:text-6xl uppercase text-ds-900 leading-tight mb-3">
              Certificações e garantias
            </h2>
            <p className="text-ds-500">
              Documentação técnica completa — pronta para processos licitatórios e auditorias.
            </p>
          </div>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {CERTIFICACOES.map((c, i) => (
            <FadeUp key={c.code} delay={i * 0.07}>
              <div className="bg-white border border-ds-200 hover:border-ds-orange/30 rounded-xl p-6 transition-colors">
                <div className="mb-4">
                  <IcoCert />
                </div>
                <div className="font-display text-3xl text-ds-orange uppercase mb-2">{c.code}</div>
                <div className="font-semibold text-ds-900 text-sm mb-3 leading-snug">{c.full}</div>
                <p className="text-ds-500 text-xs leading-relaxed">{c.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Specs */}
        <FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ds-200 rounded-xl overflow-hidden">
            {SPECS.map((s) => (
              <div key={s.label} className="bg-ds-900 px-6 py-10 text-center">
                <div className="font-display text-5xl text-ds-orange uppercase leading-none">{s.value}</div>
                <div className="text-ds-400 text-xs mt-3 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── CTA FINAL ─────────────────────────────────────────────────────────────────

function SecCTA() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image com overlay */}
      <div className="absolute inset-0">
        <Image
          src="/header.jpeg"
          alt="Quadra esportiva"
          fill
          className="object-cover object-center"
          quality={80}
        />
        <div className="absolute inset-0 bg-ds-950/65" />
        <div className="absolute inset-0 bg-ds-orange/10" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        <FadeUp>
          <Eyebrow>Atendimento especializado</Eyebrow>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl uppercase text-white leading-tight mb-4">
            Fale com um
            <br />
            <span className="text-ds-orange">especialista</span>
          </h2>
          <p className="text-ds-300 text-xl mb-3">
            Transforme seu espaço esportivo com tecnologia profissional
          </p>
          <p className="text-ds-400 text-base max-w-xl mx-auto mb-12">
            Nossa equipe técnica está pronta para elaborar a solução ideal para
            o seu projeto — orçamento sem compromisso, documentação completa para
            licitações.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ds-orange hover:bg-ds-orange-h text-white font-bold px-10 py-5 rounded text-lg transition-colors shadow-xl"
            >
              <IcoWA size={22} />
              Solicitar Orçamento Gratuito
            </a>
            <a
              href={`mailto:comerciodepisosesportivos@gmail.com`}
              className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white text-white font-bold px-10 py-5 rounded text-lg transition-colors"
            >
              Enviar E-mail
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm">
            {["Resposta em até 2 horas", "Orçamento sem compromisso", "Documentação para licitações", "10 anos de garantia escrita"].map((p) => (
              <div key={p} className="flex items-center gap-2">
                <span className="text-ds-orange"><IcoCheck /></span>
                {p}
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-ds-950 text-ds-400 py-16 border-t border-ds-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1 — logo only */}
          <div className="flex items-start">
            <img src="/logo_mj.svg" alt="MJ Pisos Esportivos" className="h-12 w-auto" />
          </div>

          {/* Col 2 — produtos (4 products only) */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">Produtos</h4>
            <ul className="space-y-2.5 text-sm">
              {["Esporte Interno EI-30", "Esporte Externo EE-30", "Linha Tênis T-31", "Playground / Kids"].map((p) => (
                <li key={p}><a href="#produtos" className="hover:text-white transition-colors">{p}</a></li>
              ))}
            </ul>
          </div>

          {/* Col 3 — empresa */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">Empresa</h4>
            <ul className="space-y-2.5 text-sm">
              {([
                ["Sobre a MJ Pisos",      "#empresa"],
                ["Tecnologia Shock Floor®", "#tecnologia"],
                ["Certificações",          "#certificacoes"],
                ["Nossos Clientes",        "#clientes"],
                ["Galeria de Projetos",    "#projetos"],
              ] as [string, string][]).map(([label, href]) => (
                <li key={label}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Col 4 — contato */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li>R. Barão do Rio Branco, 537<br />Niterói, Canoas / RS</li>
              <li><a href="tel:+5551997340520" className="hover:text-white transition-colors">(51) 99734-0520</a></li>
              <li><a href="mailto:comerciodepisosesportivos@gmail.com" className="hover:text-white transition-colors break-all">comerciodepisosesportivos@gmail.com</a></li>
            </ul>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 bg-[#25D366] hover:bg-[#22BF5A] text-white font-semibold text-sm px-4 py-2.5 rounded transition-colors"
            >
              <IcoWA size={18} /> Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-ds-border pt-8 flex flex-wrap gap-4 justify-between items-center text-xs">
          <p>© 2024 <span className="text-white font-semibold">MJ Pisos Esportivos</span>. Todos os direitos reservados.</p>
          <div className="flex gap-2 flex-wrap">
            {["INMETRO", "ABNT", "ASTM", "DIN ISO"].map((cert) => (
              <span key={cert} className="border border-ds-border text-ds-400 text-[10px] px-2 py-0.5 rounded">{cert}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── WHATSAPP FLOAT ────────────────────────────────────────────────────────────

function WAFloat() {
  return (
    <a
      href={WA}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale no WhatsApp"
      className="wa-btn fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#22BF5A] text-white font-semibold shadow-2xl rounded-full py-3.5 pl-4 pr-5 transition-all hover:scale-105"
    >
      <IcoWA size={22} />
      <span className="wa-label text-sm">Fale com um especialista!</span>
    </a>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Navbar scrolled={scrolled} open={menuOpen} setOpen={setMenuOpen} />
      <main>
        <Hero />
        <SecDiferenciais />
        <SecEmpresa />
        <SecProdutos />
        <SecShockFloor />
        <SecClientes />
        <SecProjetos />
        <SecCertificacoes />
        <SecCTA />
      </main>
      <Footer />
      <WAFloat />
    </>
  );
}
