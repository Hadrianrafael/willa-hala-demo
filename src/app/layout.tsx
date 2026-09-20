import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Willa Hala — Hospedagem em Vinhedo (demonstração)",
  description:
    "Demonstração não oficial de site para a Willa Hala, hospedagem em Vinhedo, SP. Protótipo desenvolvido pela HR Tech.",
  // Protótipo de terceiros: não deve ser indexado nem competir com os canais oficiais.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#08132a",
  width: "device-width",
  initialScale: 1,
};

/**
 * Só ativa o estado inicial "escondido" das animações se o usuário aceita movimento.
 * Failsafe: se o JS de animação não confirmar em 6s, o conteúdo é liberado.
 */
const motionGate = `(function(){try{var d=document.documentElement;if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion-ready');setTimeout(function(){if(!window.__motionReady){d.classList.remove('motion-ready')}},6000)}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${jost.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
