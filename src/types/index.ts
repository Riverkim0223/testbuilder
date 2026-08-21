// 4대 축 점수 타입
export interface Scores {
  energy: number;
  presence: number;
  movement: number;
  direction: number;
}

// 챌린지 데이터 타입
export interface Challenge {
  id: string;
  title: string;
  songTitle: string;
  artist: string;
  scores: Scores;
  difficulty: number; // 1, 2, 3
  peopleType: '1in' | '2in' | 'group';
  vibeKeywords: string[];
  officialUrl: string;
  thumbnailUrl: string;
  trendScore: number;
  isActive: boolean;
}

// 테스트 결과 유형 타입
export type ResultType = 
  | 'SOFT_CUTE' 
  | 'POWER_PERFORMER' 
  | 'EYE_CATCHER' 
  | 'DETAIL_DIRECTOR'
  | 'CONCEPT_HOLIC'
  | 'GROOVE_MASTER'
  | 'VIBE_MAKER'
  | 'MINIMAL_MOOD';
  
// 테스트 진행 상태 타입
export interface UserCondition {
  peopleType: '1in' | '2in' | 'group';
  difficulty: number;
}

export interface QuestionOption {
  label: string;
  value: number;
}

export interface Question {
  id: number;
  text: string;
  axis: keyof Scores;
  options: QuestionOption[];
}