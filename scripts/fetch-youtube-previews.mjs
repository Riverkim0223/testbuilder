import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const previewsDir = path.join(rootDir, 'public', 'previews');
const challengesPath = path.join(rootDir, 'src', 'utils', 'challenges.ts');
const matchesPath = path.join(rootDir, 'src', 'data', 'youtube-matches.json');

const YOUTUBE_PATTERN = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&/?#]+)/i;

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

function extractYouTubeId(url) {
  const match = url.match(YOUTUBE_PATTERN);
  return match?.[1] ?? null;
}

function getYouTubeThumbnailUrl(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

async function downloadImage(imageUrl, outputPath) {
  const response = await fetch(imageUrl, {
    headers: { 'User-Agent': USER_AGENT },
  });

  if (!response.ok) {
    throw new Error(`Image HTTP ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 512) {
    throw new Error('Image too small');
  }

  await fs.writeFile(outputPath, buffer);
}

function parseChallengeIds(source) {
  return [...source.matchAll(/id:\s*'([^']+)'/g)].map((match) => match[1]);
}

function upsertChallengeFields(source, id, fields) {
  const blockStart = source.indexOf(`id: '${id}'`);
  if (blockStart === -1) {
    return source;
  }

  const nextIdIndex = source.indexOf("\n  {\n    id: '", blockStart + 1);
  const blockEnd = nextIdIndex === -1 ? source.length : nextIdIndex;
  let block = source.slice(blockStart, blockEnd);

  for (const [key, value] of Object.entries(fields)) {
    const fieldRegex = new RegExp(`${key}:\\s*'[^']*'`);
    const fieldLine = `${key}: '${value}'`;

    if (fieldRegex.test(block)) {
      block = block.replace(fieldRegex, fieldLine);
      continue;
    }

    if (/youtubeUrl:/.test(block)) {
      block = block.replace(/(youtubeUrl:\s*'[^']*')/, `$1,\n    ${fieldLine}`);
    } else if (/videoUrl:/.test(block)) {
      block = block.replace(/(videoUrl:\s*'[^']*')/, `$1,\n    ${fieldLine}`);
    } else {
      block = block.replace(/\n(\s*\},?\s*)$/, `\n    ${fieldLine},$1`);
    }
  }

  return source.slice(0, blockStart) + block + source.slice(blockEnd);
}

async function main() {
  await fs.mkdir(previewsDir, { recursive: true });

  const [source, matchesRaw] = await Promise.all([
    fs.readFile(challengesPath, 'utf8'),
    fs.readFile(matchesPath, 'utf8'),
  ]);

  const matches = JSON.parse(matchesRaw);
  const challengeIds = parseChallengeIds(source);
  let updatedSource = source;
  let updateCount = 0;
  const results = [];

  for (const id of challengeIds) {
    const youtubeUrl = matches[id];
    const outputPath = path.join(previewsDir, `${id}.jpg`);
    const publicPreview = `/previews/${id}.jpg`;

    if (!youtubeUrl) {
      results.push({ id, status: 'skipped', reason: 'no youtube match' });
      console.log(`- ${id}: no youtube match`);
      continue;
    }

    const videoId = extractYouTubeId(youtubeUrl);
    if (!videoId) {
      results.push({ id, status: 'failed', reason: 'invalid youtube URL' });
      console.log(`✗ ${id}: invalid youtube URL`);
      continue;
    }

    try {
      await downloadImage(getYouTubeThumbnailUrl(videoId), outputPath);
      updatedSource = upsertChallengeFields(updatedSource, id, {
        youtubeUrl,
        previewImageUrl: publicPreview,
      });
      updateCount += 1;
      results.push({ id, status: 'ok', youtubeUrl, file: publicPreview });
      console.log(`✓ ${id} (${videoId})`);
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      results.push({ id, status: 'failed', reason, youtubeUrl });
      console.log(`✗ ${id}: ${reason}`);
    }
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
