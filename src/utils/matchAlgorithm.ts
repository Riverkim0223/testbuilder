import { Scores, UserCondition } from '@/types';
import { challenges, Challenge } from './challenges';
import { filterChallengesByCondition, getChallengeMeta, getConditionPenalty } from './challengeMeta';
import { getYouTubeMatchUrl } from './youtubeMatches';

export interface RankedChallenge extends Challenge {
  distance: number;
  matchRate: number;
  conditionPenalty: number;
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

export function getMatches(userScores: Scores, condition?: UserCondition) {
  const mergedCondition: UserCondition = {
    peopleType: condition?.peopleType ?? '1in',
    difficulty: condition?.difficulty ?? 2,
  };

  const pool = filterChallengesByCondition(challenges, mergedCondition);

  const calculated: RankedChallenge[] = pool.map((challenge) => {
    const enriched = attachMedia(challenge);
    const meta = getChallengeMeta(enriched.id);
    const distance = getMatchDistance(userScores, enriched);
    const conditionPenalty = getConditionPenalty(enriched.id, mergedCondition);
    const adjustedDistance = distance + conditionPenalty;

    return {
      ...enriched,
      distance,
      matchRate: getMatchRate(userScores, enriched),
      conditionPenalty,
      adjustedDistance,
      difficulty: meta.difficulty,
      peopleType: meta.peopleType,
    };
  });

  calculated.sort((a, b) => a.adjustedDistance - b.adjustedDistance);

  return {
    bestMatch: calculated[0],
    similarMatch: calculated[1],
    worstMatch: calculated[calculated.length - 1],
  };
}
