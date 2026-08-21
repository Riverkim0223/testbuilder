import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const previewsDir = path.join(rootDir, 'public', 'previews');
const challengesPath = path.join(rootDir, 'src', 'utils', 'challenges.ts');

const REEL_PATTERN = /instagram\.com\/(?:[^/]+\/)?reel\/([^/?#]+)/i;
const YOUTUBE_PATTERN = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&/?#]+)/i;

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

function decodeUrl(url) {
  return url
    .replace(/\\u0026/g, '&')
    .replace(/\\u003d/g, '=')
    .replace(/\\u0025/g, '%')
    .replace(/&amp;/g, '&')
    .replace(/\\\//g, '/');
}

function extractReelId(url) {
  const match = url.match(REEL_PATTERN);
  return match?.[1] ?? null;
}

function extractYouTubeId(url) {
  const match = url.match(YOUTUBE_PATTERN);
  return match?.[1] ?? null;
}

function extractThumbnailUrl(html) {
  const ogMatch = html.match(/property="og:image" content="([^"]+)"/i);
  if (ogMatch?.[1]) {
    return decodeUrl(ogMatch[1]);
  }

  const jsonPatterns = [
    /thumbnail_src\\?":\\?"([^"\\]+)/,
    /display_url\\?":\\?"([^"\\]+)/,
    /video_preview_image_url\\?":\\?"([^"\\]+)/,
    /cover_photo_url\\?":\\?"([^"\\]+)/,
  ];

  for (const pattern of jsonPatterns) {
    const match = html.match(pattern);
    if (match?.[1]?.includes('cdninstagram')) {
      return decodeUrl(match[1]);
    }
  }

  const unescaped = decodeUrl(html);
  const candidates =
    unescaped.match(/https:\/\/[^"'\s]*cdninstagram\.com[^"'\s]+\.jpg[^"'\s]*/g) ?? [];

  const cover = candidates.find(
    (url) =>
      url.includes('cover_frame') ||
      url.includes('nframed') ||
      url.includes('video_preview') ||
      url.includes('xpids'),
  );

  return cover ?? candidates[0] ?? null;
}

async function fetchEmbedHtml(reelId) {
  const embedUrl = `https://www.instagram.com/reel/${reelId}/embed/captioned/`;
  const response = await fetch(embedUrl, {
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'text/html,application/xhtml+xml',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.text();
}

async function downloadImage(imageUrl, outputPath) {
  const response = await fetch(imageUrl, {
    headers: {
      'User-Agent': USER_AGENT,
      Referer: 'https://www.instagram.com/',
    },
  });

  if (!response.ok) {
    throw new Error(`Image HTTP ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 1024) {
    throw new Error('Image too small');
  }

  await fs.writeFile(outputPath, buffer);
}

function parseChallenges(source) {
  const entries = [];
  const blockPattern = /\{\s*id:\s*'([^']+)'[\s\S]*?videoUrl:\s*'([^']+)'/g;

  for (const match of source.matchAll(blockPattern)) {
    entries.push({ id: match[1], videoUrl: match[2] });
  }

  return entries;
}

function upsertPreviewImageUrl(source, id, previewPath) {
  const blockStart = source.indexOf(`id: '${id}'`);
  if (blockStart === -1) {
    return source;
  }

  const nextIdIndex = source.indexOf("\n  {\n    id: '", blockStart + 1);
  const blockEnd = nextIdIndex === -1 ? source.length : nextIdIndex;
  let block = source.slice(blockStart, blockEnd);

  if (/previewImageUrl:/.test(block)) {
    block = block.replace(/previewImageUrl:\s*'[^']*'/, `previewImageUrl: '${previewPath}'`);
  } else if (/videoUrl:/.test(block)) {
    block = block.replace(
      /(videoUrl:\s*'[^']*')/,
      `$1,\n    previewImageUrl: '${previewPath}'`,
    );
  }

  return source.slice(0, blockStart) + block + source.slice(blockEnd);
}

async function fetchPreviewForChallenge(challenge) {
  const outputPath = path.join(previewsDir, `${challenge.id}.jpg`);
  const publicPath = `/previews/${challenge.id}.jpg`;

  const youtubeId = extractYouTubeId(challenge.videoUrl);
  if (youtubeId) {
    const youtubeThumb = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
    await downloadImage(youtubeThumb, outputPath);
    return { status: 'ok', file: publicPath, source: 'youtube' };
  }

  const reelId = extractReelId(challenge.videoUrl);
  if (!reelId) {
    return { status: 'skipped', reason: 'not a reel/youtube URL' };
  }

  const html = await fetchEmbedHtml(reelId);
  const thumbnailUrl = extractThumbnailUrl(html);

  if (!thumbnailUrl) {
    return { status: 'failed', reason: 'thumbnail not found in embed HTML' };
  }

  await downloadImage(thumbnailUrl, outputPath);
  return { status: 'ok', file: publicPath, source: 'instagram' };
}

async function main() {
  await fs.mkdir(previewsDir, { recursive: true });

  const source = await fs.readFile(challengesPath, 'utf8');
  const challenges = parseChallenges(source);
  let updatedSource = source;
  let updateCount = 0;

  const results = [];

  for (const challenge of challenges) {
    try {
      const result = await fetchPreviewForChallenge(challenge);
      results.push({ id: challenge.id, ...result });

      if (result.status === 'ok') {
        updatedSource = upsertPreviewImageUrl(updatedSource, challenge.id, result.file);
        updateCount += 1;
        console.log(`✓ ${challenge.id} (${result.source})`);
      } else if (result.status === 'skipped') {
        console.log(`- ${challenge.id}: ${result.reason}`);
      } else {
        console.log(`✗ ${challenge.id}: ${result.reason}`);
      }
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      results.push({ id: challenge.id, status: 'failed', reason });
      console.log(`✗ ${challenge.id}: ${reason}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  if (updateCount > 0) {
    await fs.writeFile(challengesPath, updatedSource, 'utf8');
  }

  const summary = {
    ok: results.filter((item) => item.status === 'ok').length,
    skipped: results.filter((item) => item.status === 'skipped').length,
    failed: results.filter((item) => item.status === 'failed').length,
  };

  console.log('\nSummary:', summary);
  await fs.writeFile(
    path.join(previewsDir, 'fetch-report.json'),
    JSON.stringify({ summary, results }, null, 2),
    'utf8',
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
