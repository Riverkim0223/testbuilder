import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../public/og-image.png');

const W = 1200;
const H = 630;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0f"/>
      <stop offset="45%" stop-color="#14101f"/>
      <stop offset="100%" stop-color="#0d1520"/>
    </linearGradient>
    <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff2d95"/>
      <stop offset="50%" stop-color="#b829ff"/>
      <stop offset="100%" stop-color="#29d4ff"/>
    </linearGradient>
    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#ffd4ec"/>
      <stop offset="100%" stop-color="#c4b5ff"/>
    </linearGradient>
    <radialGradient id="glowPink" cx="20%" cy="30%" r="45%">
      <stop offset="0%" stop-color="#ff2d95" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ff2d95" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowCyan" cx="85%" cy="75%" r="40%">
      <stop offset="0%" stop-color="#29d4ff" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#29d4ff" stop-opacity="0"/>
    </radialGradient>
    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="18" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
    </pattern>
    <clipPath id="phoneClip">
      <rect x="860" y="95" width="250" height="440" rx="36"/>
    </clipPath>
  </defs>

  <!-- background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glowPink)"/>
  <rect width="${W}" height="${H}" fill="url(#glowCyan)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>

  <!-- decorative lines -->
  <line x1="80" y1="560" x2="420" y2="560" stroke="url(#neon)" stroke-width="3" stroke-linecap="round" opacity="0.9"/>
  <circle cx="440" cy="560" r="5" fill="#29d4ff"/>

  <!-- top badge -->
  <rect x="80" y="72" width="210" height="42" rx="21" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.15"/>
  <text x="185" y="99" text-anchor="middle" font-family="Arial Black, Malgun Gothic, sans-serif" font-size="15" font-weight="900" fill="#ff6ec7" letter-spacing="2">REELS FIT TEST</text>

  <!-- main title -->
  <text x="80" y="210" font-family="Malgun Gothic, Apple SD Gothic Neo, sans-serif" font-size="62" font-weight="800" fill="url(#titleGrad)">나만의 릴스</text>
  <text x="80" y="290" font-family="Malgun Gothic, Apple SD Gothic Neo, sans-serif" font-size="62" font-weight="800" fill="url(#titleGrad)">성향 테스트</text>

  <!-- emoji accent next to title -->
  <text x="520" y="250" font-size="72" transform="rotate(-8 520 250)">🎬</text>

  <!-- subtitle -->
  <text x="80" y="350" font-family="Malgun Gothic, sans-serif" font-size="28" font-weight="600" fill="#d8d2e8">12문항으로 찾는</text>
  <text x="80" y="392" font-family="Malgun Gothic, sans-serif" font-size="28" font-weight="600" fill="#ffffff">찰떡 릴스 챌린지 추천</text>

  <!-- tags -->
  <rect x="80" y="430" width="118" height="38" rx="19" fill="#ff2d95" fill-opacity="0.18" stroke="#ff2d95" stroke-opacity="0.5"/>
  <text x="139" y="455" text-anchor="middle" font-family="Malgun Gothic, sans-serif" font-size="16" font-weight="700" fill="#ff8ec8">#숏폼</text>

  <rect x="210" y="430" width="118" height="38" rx="19" fill="#b829ff" fill-opacity="0.18" stroke="#b829ff" stroke-opacity="0.5"/>
  <text x="269" y="455" text-anchor="middle" font-family="Malgun Gothic, sans-serif" font-size="16" font-weight="700" fill="#d4a8ff">#챌린지</text>

  <rect x="340" y="430" width="118" height="38" rx="19" fill="#29d4ff" fill-opacity="0.18" stroke="#29d4ff" stroke-opacity="0.5"/>
  <text x="399" y="455" text-anchor="middle" font-family="Malgun Gothic, sans-serif" font-size="16" font-weight="700" fill="#7ee8ff">#릴스추천</text>

  <!-- phone mock -->
  <rect x="845" y="80" width="280" height="470" rx="44" fill="#111118" stroke="url(#neon)" stroke-width="3"/>
  <rect x="860" y="95" width="250" height="440" rx="36" fill="#1a1028"/>
  <g clip-path="url(#phoneClip)">
    <rect x="860" y="95" width="250" height="440" fill="url(#neon)" opacity="0.25"/>
    <text x="985" y="280" text-anchor="middle" font-size="88">💃</text>
    <text x="985" y="360" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="22" font-weight="900" fill="#ffffff" letter-spacing="1">MATCH</text>
    <text x="985" y="390" text-anchor="middle" font-family="Malgun Gothic, sans-serif" font-size="18" font-weight="700" fill="#ffd4ec">98%</text>
  </g>
  <rect x="955" y="108" width="60" height="8" rx="4" fill="#333"/>

  <!-- floating stickers -->
  <text x="760" y="130" font-size="44" transform="rotate(12 760 130)" opacity="0.95">🔥</text>
  <text x="720" y="480" font-size="38" transform="rotate(-10 720 480)" opacity="0.9">✨</text>
  <text x="1110" y="200" font-size="36" transform="rotate(8 1110 200)" opacity="0.85">🎵</text>
  <text x="1140" y="520" font-size="32" transform="rotate(-6 1140 520)" opacity="0.8">📱</text>

  <!-- bottom url -->
  <text x="80" y="590" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#6b6580" letter-spacing="1">reels-fit.vercel.app</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, quality: 90 })
  .toFile(outPath);

console.log(`OG image saved: ${outPath}`);
