# Willa Hala — protótipo de demonstração (HR Tech)

Protótipo comercial **não oficial** de um site boutique para a Willa Hala (hospedagem em Vinhedo, SP).
Serve para apresentar ao proprietário como poderá ficar o site definitivo. Não é o site oficial da hospedagem.

- **Stack:** Next.js 16 (App Router, exportação estática) · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger + SplitText
- **Hospedagem:** GitHub Pages (gratuito) via GitHub Actions
- **Sem** backend, banco de dados, login, checkout ou APIs privadas

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera a pasta out/ (site estático)
npm run lint
```

## Publicação (GitHub Pages)

Todo push na `main` dispara `.github/workflows/deploy.yml`, que faz o build com
`NEXT_PUBLIC_BASE_PATH=/<nome-do-repositório>` (o `next.config.ts` aplica `basePath` e `assetPrefix`) e publica a pasta `out/`.
Pré-requisito único: em **Settings → Pages → Source**, escolher **GitHub Actions**.

Para testar o build no subdiretório localmente (PowerShell):

```powershell
$env:NEXT_PUBLIC_BASE_PATH="/willa-hala-demo"; npm run build
```

## Fotografias

Nenhuma foto de terceiros foi copiada (Instagram/Booking): pertencem à hospedagem. Cada espaço de imagem exibe uma
ilustração até o acervo oficial ser enviado. Para trocar por fotos reais **sem alterar código**:
veja [`docs/FOTOS.md`](docs/FOTOS.md) (lista dos 23 slots) e rode `npm run photos -- ./pasta-das-fotos`.

## Onde editar o conteúdo

| O quê | Onde |
|---|---|
| Textos, quartos, comodidades, distâncias, links (Booking/Airbnb/Instagram/WhatsApp) | `src/data/site.ts` |
| Ativar o botão do Airbnb | `site.airbnb` em `src/data/site.ts` (basta informar a URL oficial) |
| Animações globais (revelações, parallax, trilho horizontal) | `src/components/Motion.tsx` |
| Hero cinematográfico | `src/components/Hero.tsx` |
| Cards 3D / Galeria com lightbox | `RoomCard.tsx` / `Gallery.tsx` |

Todo dado factual em `site.ts` vem de fontes públicas (Instagram/Linktree oficiais e página da hospedagem no Booking.com, consultadas em set/2026).

## Acessibilidade e performance

- Respeita `prefers-reduced-motion` (sem cortina, sem parallax; conteúdo sempre visível).
- Se o JS de animação falhar, um *failsafe* libera o conteúdo em 6 s.
- Navegação por teclado, foco visível, lightbox com foco preso e retorno de foco, `aria-*` nos controles.
- Mapa do Google carregado só sob demanda (privacidade e velocidade).
- `noindex`: o protótipo não deve aparecer no Google.
