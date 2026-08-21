import { Scores, UserCondition } from '@/types';
import { Challenge, danceChallenges } from './challenges';
import { filterChallengesByCondition, getChallengeMeta, getConditionPenalty } from './challengeMeta';
import { getResultType, getTypeTagAffinityBonus } from './typeMatching';
import { getYouTubeMatchUrl } from './youtubeMatches';

export interface RankedChallenge extends Challenge {
  distance: number;
  matchRate: number;
  conditionPenalty: number;
  typeAffinityBonus: number;
  adjustedDistance: number;
  difficulty: 1 | 2 | 3;
  peopleType: string;
}

function attachMedia(challenge: Challenge): Challenge {
  const youtubeUrl = getYouTubeMatchUrl(challenge.id) ?? challenge.youtubeUrl;

  return {
    ...challenge,
    youtubeUrl,
    previewImageUrl: `/previews/${challenge.id}.jpg`,
  };
}

/** ch_002 ↔ au_002 등 동일 곡 페어 식별 */
function getChallengeFamilyKey(challengeId: string): string {
  const [, family] = challengeId.split('_');
  return family ?? challengeId;
}

export function getMatchDistance(userScores: Scores, challenge: Challenge): number {
  return Math.sqrt(
    (userScores.energy - challenge.idealScores.energy) ** 2 +
      (userScores.presence - challenge.idealScores.presence) ** 2 +
      (userScores.movement - challenge.idealScores.movement) ** 2 +
      (userScores.direction - challenge.idealScores.direction) ** 2,
  );
}

export function getMatchRate(userScores: Scores, challenge: Challenge): number {
  const distance = getMatchDistance(userScores, challenge);
  const maxDistance = 200;
  return Math.max(0, Math.round(100 - (distance / maxDistance) * 100));
}

function rankChallenges(
  pool: Challenge[],
  userScores: Scores,
  condition: UserCondition,
  primaryType: ReturnType<typeof getResultType>,
): RankedChallenge[] {
  return pool
    .map((challenge) => {
      const enriched = attachMedia(challenge);
      const meta = getChallengeMeta(enriched.id);
      const distance = getMatchDistance(userScores, enriched);
      const conditionPenalty = getConditionPenalty(enriched.id, condition);
      const typeAffinityBonus = getTypeTagAffinityBonus(primaryType, enriched.tags);
      const adjustedDistance = distance + conditionPenalty + typeAffinityBonus;

      return {
        ...enriched,
        distance,
        matchRate: getMatchRate(userScores, enriched),
        conditionPenalty,
        typeAffinityBonus,
        adjustedDistance,
        difficulty: meta.difficulty,
        peopleType: meta.peopleType,
      };
    })
    .sort((a, b) => a.adjustedDistance - b.adjustedDistance);
}

function pickSimilarMatch(
  ranked: RankedChallenge[],
  bestMatch: RankedChallenge,
): RankedChallenge {
  const bestFamily = getChallengeFamilyKey(bestMatch.id);
  const bestYoutube = bestMatch.youtubeUrl;

  const distinct = ranked.find((item) => {
    if (item.id === bestMatch.id) return false;
    if (getChallengeFamilyKey(item.id) === bestFamily) return false;
    if (bestYoutube && item.youtubeUrl === bestYoutube) return false;
    return true;
  });

  return distinct ?? ranked[1] ?? bestMatch;
}

function pickWorstMatch(
  userScores: Scores,
  excludeIds: string[],
): RankedChallenge {
  const excluded = new Set(excludeIds);

  const ranked = danceChallenges
    .filter((challenge) => !excluded.has(challenge.id))
    .map((challenge) => {
      const enriched = attachMedia(challenge);
      const meta = getChallengeMeta(enriched.id);
      const distance = getMatchDistance(userScores, enriched);

      return {
        ...enriched,
        distance,
        matchRate: getMatchRate(userScores, enriched),
        conditionPenalty: 0,
        typeAffinityBonus: 0,
        adjustedDistance: distance,
        difficulty: meta.difficulty,
        peopleType: meta.peopleType,
      };
    })
    .sort((a, b) => b.distance - a.distance);

  return ranked[0] ?? rankChallenges(danceChallenges, userScores, { peopleType: '1in', difficulty: 3 }, getResultType(userScores)).slice(-1)[0];
}

export function getMatches(userScores: Scores, condition?: UserCondition) {
  const mergedCondition: UserCondition = {
    peopleType: condition?.peopleType ?? '1in',
    difficulty: condition?.difficulty ?? 2,
  };

  const primaryType = getResultType(userScores);
  const pool = filterChallengesByCondition(danceChallenges, mergedCondition);
  const ranked = rankChallenges(pool, userScores, mergedCondition, primaryType);

  const bestMatch = ranked[0];
  const similarMatch = pickSimilarMatch(ranked, bestMatch);
  const worstMatch = pickWorstMatch(userScores, [bestMatch.id, similarMatch.id]);

  return {
    bestMatch,
    similarMatch,
    worstMatch,
  };
}
