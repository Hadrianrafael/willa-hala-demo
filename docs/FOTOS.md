# Fotografias necessárias (Willa Hala)

O protótipo **não usa** fotos copiadas do Instagram, do Booking ou de terceiros: elas pertencem à hospedagem/fotógrafos e
só podem ser usadas com autorização. Enquanto o acervo oficial não chega, cada espaço mostra uma ilustração com o
selo "Foto oficial em breve".

## Como aplicar as fotos

1. Peça ao proprietário os arquivos originais (idealmente em alta resolução, sem filtros do Instagram).
2. Renomeie cada arquivo com o nome do **slot** abaixo (ex.: `hero.jpg`, `gal-03.jpg`). Uma mesma foto pode servir a vários slots (duplique o arquivo).
3. Rode a otimização (redimensiona, comprime e remove metadados/GPS):

   ```bash
   npm run photos -- ./pasta-com-as-fotos
   ```

4. Rode `npm run build` (ou faça push na `main`: o GitHub Actions publica sozinho). O site detecta os arquivos em `public/photos/`
   no build e troca as ilustrações pelas fotos reais — sem mexer em código.

> Dica: se preferir colocar os arquivos direto em `public/photos/`, use `.jpg`, `.webp` ou `.png` com o nome do slot.

## Lista de slots (24)

| Slot | Onde aparece | O que fotografar / pedir | Orientação ideal |
|---|---|---|---|
| `hero` | Abertura (metade direita da tela) | Fachada da casa, de preferência com luz natural bonita. É a foto mais importante. | Vertical ou quase quadrada (4:5), ≥ 2000 px |
| `hero-2` | Abertura (foto menor sobreposta, só no desktop) | Detalhe da casa ou de um ambiente | Vertical/quadrada |
| `sobre-1` | "A hospedagem" (foto grande) | Fachada ou detalhe arquitetônico (referência à Polônia) | Vertical |
| `sobre-2` | "A hospedagem" (canto superior) | Jardim / plantas | Horizontal |
| `sobre-3` | "A hospedagem" (canto inferior) | Sala de estar ou detalhe de decoração | Horizontal |
| `quarto-queen-jardim` | Acomodações · card 01 | Quarto Queen com Vista para o Jardim | Horizontal (5:4) |
| `quarto-suite-deluxe` | Acomodações · card 02 | Suíte Deluxe Queen-size | Horizontal (5:4) |
| `quarto-duplo` | Acomodações · card 03 | Quarto Duplo Amplo (2 solteiro) | Horizontal (5:4) |
| `quarto-triplo` | Acomodações · card 04 | Quarto Triplo Comfort (3 solteiro) | Horizontal (5:4) |
| `gal-01` | Galeria (destaque grande) | Fachada | Horizontal |
| `gal-02` | Galeria | Jardim | Horizontal |
| `gal-03` | Galeria | Quarto | Horizontal |
| `gal-04` | Galeria (vertical alta) | Mesa do café da manhã | Vertical |
| `gal-05` | Galeria | Lareira externa | Horizontal |
| `gal-06` | Galeria | Sala de estar | Horizontal |
| `gal-07` | Galeria (pequena) | Detalhe de decoração | Quadrada |
| `gal-08` | Galeria | Suíte deluxe | Horizontal |
| `gal-09` | Galeria (faixa panorâmica) | Recantos verdes / área externa | Panorâmica |
| `exp-cafe` | Experiências · 01 | Café da manhã (continental/buffet) | Vertical (4:5) |
| `exp-jardim` | Experiências · 02 | Jardim com assentos ao ar livre | Vertical (4:5) |
| `exp-lareira` | Experiências · 03 | Lareira externa | Vertical (4:5) |
| `exp-sala` | Experiências · 04 | Sala de estar | Vertical (4:5) |
| `exp-criancas` | Experiências · 05 | Área de recreação interna | Vertical (4:5) |
| `exp-cafeteria` | Experiências · 06 | Cafeteria | Vertical (4:5) |

Mínimo para uma boa apresentação: `hero`, os 4 `quarto-*` e ~6 fotos de galeria.

## Autorização de uso

Registre por escrito (WhatsApp/e-mail bastam) que o proprietário autoriza o uso das imagens no site, e confirme com quem
fotografou se houver direito autoral de terceiros.
