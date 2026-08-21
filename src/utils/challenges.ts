//import { Challenge } from '@/types';

// types.ts
export interface Challenge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
  idealScores: { energy: number; presence: number; movement: number; direction: number; };
  videoUrl?: string;
  youtubeUrl?: string;
  previewImageUrl?: string; // public/previews/ch_001.jpg 등 캡처 이미지
  previewVideoUrl?: string; // public/previews/ch_001.mp4 등 짧은 미리보기 영상
}


/** 릴스 댄스 챌린지 20개 — 추천 매칭 풀 (au_* 오디오 트렌드는 제외) */
export const danceChallenges: Challenge[] = [];

export const challenges: Challenge[] = [
  {
    id: 'ch_001',
    name: 'SWIM 댄스·다이브 챌린지 🏊‍♀️',
    description: 'BTS 원곡 챌린지! 침대·수영장 다이브 변형은 안전 안내 필요',
    imageUrl: '🏊‍♀️',
    tags: ["#파워퍼포머형", "#반전매력형", "#현재상위권"],
    idealScores: { energy: 75, presence: 75, movement: 70, direction: 35 },
    videoUrl: 'https://www.instagram.com/reel/DWbYVp-EwCl/',
    youtubeUrl: 'https://www.youtube.com/watch?v=_lvzM4jOj6o'
  },
  {
    id: 'ch_002',
    name: 'Animal 댄스 챌린지 🦁',
    description: 'KATSEYE 원곡 챌린지! 동물 제스처 변형 콘텐츠로 난이도 하향 버전 제작 가능',
    imageUrl: '🦁',
    tags: ["#파워퍼포머형", "#칼각완성형", "#시선강탈형"],
    idealScores: { energy: 88, presence: 85, movement: 90, direction: 55 },
    videoUrl: 'https://www.instagram.com/reel/DbYEphdS_Kp/',
    youtubeUrl: 'https://www.youtube.com/watch?v=gHkV4E5J1lM'
  },
  {
    id: 'ch_003',
    name: 'THIS & THAT 챌린지 🎬',
    description: 'Stray Kids 원곡 챌린지! 정확도 중심이라 0.75배속 튜토리얼 링크가 유용',
    imageUrl: '🎬',
    tags: ["#칼각완성형", "#파워퍼포머형", "#현재상위권"],
    idealScores: { energy: 85, presence: 80, movement: 88, direction: 40 },
    videoUrl: 'https://www.instagram.com/reel/DcC9E2oz5H6/',
    youtubeUrl: 'https://www.youtube.com/watch?v=PsDwJSJMdxE'
  },
  {
    id: 'ch_004',
    name: 'REDRED 귀 플랩 챌린지 🎬',
    description: 'CORTIS 원곡 챌린지! 쉬운 포인트 안무라 초보 추천 풀에 적합',
    imageUrl: '🎬',
    tags: ["#말랑큐티형", "#표정천재형", "#파워퍼포머형"],
    idealScores: { energy: 65, presence: 65, movement: 55, direction: 25 },
    videoUrl: 'https://www.instagram.com/reel/DXwkI5Jyde8/',
    youtubeUrl: 'https://www.youtube.com/shorts/O0SbDRS2RfI'
  },
  {
    id: 'ch_005',
    name: 'MOTION 댄스 챌린지 🎬',
    description: 'CORTIS feat. Juicy J 원곡 챌린지! 고난도 후보가 부족할 때 핵심 콘텐츠',
    imageUrl: '🎬',
    tags: ["#파워퍼포머형", "#칼각완성형", "#상승·지속형"],
    idealScores: { energy: 92, presence: 85, movement: 92, direction: 45 },
    videoUrl: 'https://www.instagram.com/hyfaustine/reel/Db5xgcfI5e4/',
    youtubeUrl: 'https://www.youtube.com/watch?v=h7ITAdTxdxM'
  },
  {
    id: 'ch_006',
    name: 'BANG BANG 챌린지 🔫',
    description: 'IVE 원곡 챌린지! 최신 급상승보다는 검증된 보조 후보로 운영',
    imageUrl: '🔫',
    tags: ["#시선강탈형", "#칼각완성형", "#지속형"],
    idealScores: { energy: 88, presence: 90, movement: 88, direction: 60 },
    videoUrl: 'https://www.instagram.com/reel/DVjcIAEjWq2/',
    youtubeUrl: 'https://www.youtube.com/shorts/oj-6jfhz2Cs'
  },
  {
    id: 'ch_007',
    name: '놀아보세 챌린지 🎬',
    description: 'Picheolin (DINO) 원곡 챌린지! 친구·그룹 슬롯에 특히 적합',
    imageUrl: '🎬',
    tags: ["#파워퍼포머형", "#말랑큐티형", "#현재확산"],
    idealScores: { energy: 80, presence: 70, movement: 68, direction: 30 },
    videoUrl: 'https://www.instagram.com/reel/DbqTeffBeIf/',
    youtubeUrl: 'https://www.youtube.com/watch?v=Do9BOhk0u_w'
  },
  {
    id: 'ch_008',
    name: 'Golden 댄스 챌린지 🎬',
    description: 'HUNTR/X 원곡 챌린지! 고난도·커버댄스 성향 대표 에버그린',
    imageUrl: '🎬',
    tags: ["#칼각완성형", "#파워퍼포머형", "#에버그린상위권"],
    idealScores: { energy: 90, presence: 85, movement: 95, direction: 55 },
    videoUrl: 'https://www.instagram.com/popular/golden-dance-challenge/',
    youtubeUrl: 'https://www.youtube.com/shorts/YRHXudxV9kI'
  },
  {
    id: 'ch_009',
    name: 'Dai Dai 댄스 챌린지 🎬',
    description: 'Shakira feat. Burna Boy 원곡 챌린지! 유니폼·응원 소품을 쓰면 PRODUCTION 변형 가능',
    imageUrl: '🎬',
    tags: ["#파워퍼포머형", "#반전매력형", "#2026여름대형트렌드"],
    idealScores: { energy: 90, presence: 75, movement: 80, direction: 35 },
    videoUrl: 'https://www.instagram.com/reel/DaVyEpauwBV/',
    youtubeUrl: 'https://www.youtube.com/shorts/PSe-L3V9nGo'
  },
  {
    id: 'ch_010',
    name: '신발 던지기 핏 전환 🎬',
    description: 'Original audio by valeri_murr 원곡 챌린지! 균형 동작 실패 위험이 있어 안전한 대체 연출 준비',
    imageUrl: '🎬',
    tags: ["#시선강탈형", "#반전매력형", "#현재트렌드"],
    idealScores: { energy: 45, presence: 85, movement: 25, direction: 90 },
    videoUrl: 'https://www.instagram.com/reels/audio/27587126967609168',
    youtubeUrl: 'https://www.youtube.com/shorts/dwwljQG5pjU'
  },
  {
    id: 'ch_011',
    name: 'Work & Result 비포애프터 🎬',
    description: 'Original audio by arceriinteriors 원곡 챌린지! 촬영 준비 과정이 있는 사용자에게 강함',
    imageUrl: '🎬',
    tags: ["#무드연출가형", "#아기자기디테일형", "#현재트렌드"],
    idealScores: { energy: 40, presence: 55, movement: 15, direction: 90 },
    videoUrl: 'https://www.instagram.com/reels/audio/26129774656696571/',
    youtubeUrl: 'https://www.youtube.com/shorts/5m4hCcnRhP4'
  },
  {
    id: 'ch_012',
    name: 'My Biggest Flex 🎬',
    description: 'She Wolf - Shakira 원곡 챌린지! 직업·취미 열거형이라 비댄스 사용자 전환용',
    imageUrl: '🎬',
    tags: ["#시선강탈형", "#표정천재형", "#현재트렌드"],
    idealScores: { energy: 65, presence: 95, movement: 20, direction: 65 },
    videoUrl: 'https://www.instagram.com/reels/audio/407484960012624',
    youtubeUrl: 'https://www.youtube.com/watch?v=booKP974B0k',
    previewImageUrl: '/previews/ch_012.jpg',
  },
  {
    id: 'ch_013',
    name: '등 떠밀기 새 도전 🎬',
    description: 'Original audio by thefoundryavondale 원곡 챌린지! 밀기 연출은 실제 충돌 없이 컷 편집으로 구현',
    imageUrl: '🎬',
    tags: ["#반전매력형", "#표정천재형", "#현재트렌드"],
    idealScores: { energy: 55, presence: 70, movement: 30, direction: 60 },
    videoUrl: 'https://www.instagram.com/reels/audio/27435154212849943/',
    youtubeUrl: 'https://www.youtube.com/shorts/OI99VhaW7-A',
    previewImageUrl: '/previews/ch_013.jpg',
  },
  {
    id: 'ch_014',
    name: 'You Can`t Do That 증명 릴스 🎬',
    description: 'Original audio 원곡 챌린지! 사용자 성취·변신 서사에 적합',
    imageUrl: '🎬',
    tags: ["#시선강탈형", "#반전매력형", "#현재트렌드"],
    idealScores: { energy: 70, presence: 90, movement: 35, direction: 70 },
    videoUrl: 'https://www.instagram.com/reels/audio/26261188156890234/',
    youtubeUrl: 'https://www.youtube.com/shorts/OI99VhaW7-A',
  },
  {
    id: 'ch_015',
    name: 'Two Best Friends 반대 취향 🎬',
    description: 'Original audio by lisahoogendoorn 원곡 챌린지! 커피·패션·음악 취향 대비로 현지화하기 쉬움',
    imageUrl: '🎬',
    tags: ["#아기자기디테일형", "#말랑큐티형", "#표정천재형"],
    idealScores: { energy: 55, presence: 65, movement: 30, direction: 65 },
    videoUrl: 'https://www.instagram.com/reels/audio/26282138668150926',
    youtubeUrl: 'https://www.youtube.com/watch?v=CmT_b4SaV8w'
  },
  {
    id: 'ch_016',
    name: 'Yummy Little Day 디테일 몽타주 🎬',
    description: '@emilogue 원곡 챌린지! 릴스핏의 귀여운 유형 커버리지 핵심',
    imageUrl: '🎬',
    tags: ["#아기자기디테일형", "#말랑큐티형", "#무드연출가형"],
    idealScores: { energy: 35, presence: 45, movement: 15, direction: 75 },
    videoUrl: 'https://www.instagram.com/reels/audio/980370881663525/',
    youtubeUrl: 'https://www.youtube.com/shorts/Cfe_pQGsJjQ'
  },
  {
    id: 'ch_017',
    name: '카메라 닦기 변신 전환 🎬',
    description: 'JAMES AND ANTLER 원곡 챌린지! 표본 규모가 아직 작아 1주 후 재검증 권장',
    imageUrl: '🎬',
    tags: ["#시선강탈형", "#무드연출가형", "#반전매력형"],
    idealScores: { energy: 55, presence: 75, movement: 20, direction: 95 },
    videoUrl: 'https://www.instagram.com/reels/audio/26923322580669821',
    youtubeUrl: 'https://www.youtube.com/shorts/dwwljQG5pjU'
  },
  {
    id: 'ch_018',
    name: 'Netflix Documentary 준비 밈 🎬',
    description: 'Original audio by natalie_rantingma 원곡 챌린지! 표정 천재형에 강한 비댄스 추천',
    imageUrl: '🎬',
    tags: ["#표정천재형", "#시선강탈형", "#현재대형트렌드"],
    idealScores: { energy: 30, presence: 85, movement: 10, direction: 55 },
    videoUrl: 'https://www.instagram.com/reels/audio/27669710879352765/',
    youtubeUrl: 'https://www.youtube.com/watch?v=fxDZvm0aqe4'
  },
  {
    id: 'ch_019',
    name: 'DANCE… 비트드롭 포즈 공개 🎬',
    description: 'Slayyyter 원곡 챌린지! 춤 실력보다 포즈·타이밍 중심',
    imageUrl: '🎬',
    tags: ["#시선강탈형", "#반전매력형", "#현재트렌드"],
    idealScores: { energy: 80, presence: 95, movement: 35, direction: 70 },
    videoUrl: 'https://www.instagram.com/reels/audio/1648322256423011',
    youtubeUrl: 'https://www.youtube.com/shorts/yBRdTAR7-Js'
  },
  {
    id: 'ch_020',
    name: 'Don`t You Want It? 친구 설득 립싱크 🎬',
    description: 'Original audio by roselitkowski 원곡 챌린지! 확산 전 단계라 클릭률 실험용으로만 사용',
    imageUrl: '🎬',
    tags: ["#표정천재형", "#말랑큐티형", "#초기상승"],
    idealScores: { energy: 45, presence: 70, movement: 10, direction: 35 },
    videoUrl: 'https://www.instagram.com/reels/audio/35125291193784685',
    youtubeUrl: 'https://www.youtube.com/watch?v=FgogshnCziE'
  },
  {
    id: 'au_001',
    name: 'SWIM 🏊‍♀️',
    description: 'BTS 원곡 챌린지! 추천 구간은 후렴·다이브 포인트로 별도 큐레이션',
    imageUrl: '🏊‍♀️',
    tags: ["#반전매력형", "#파워퍼포머형", "#무드연출가형"],
    idealScores: { energy: 75, presence: 70, movement: 65, direction: 50 },
    videoUrl: 'https://www.instagram.com/reel/DWbYVp-EwCl/',
    youtubeUrl: 'https://www.youtube.com/watch?v=WOmHZv4USUs'
  },
  {
    id: 'au_002',
    name: 'Animal 🦁',
    description: 'KATSEYE 원곡 챌린지! 고에너지 결과의 1순위 오디오 후보',
    imageUrl: '🦁',
    tags: ["#파워퍼포머형", "#시선강탈형", "#현재상위권"],
    idealScores: { energy: 90, presence: 85, movement: 85, direction: 55 },
    videoUrl: 'https://www.youtube.com/watch?v=m7k9UMcHbr0',
    youtubeUrl: 'https://www.youtube.com/watch?v=m7k9UMcHbr0',
    previewImageUrl: '/previews/au_002.jpg',
  },
  {
    id: 'au_003',
    name: 'THIS & THAT 🎬',
    description: 'Stray Kids 원곡 챌린지! 정확한 비트 구간을 추천 구간으로 지정',
    imageUrl: '🎬',
    tags: ["#칼각완성형", "#파워퍼포머형", "#현재상위권"],
    idealScores: { energy: 88, presence: 80, movement: 90, direction: 45 },
    videoUrl: 'https://www.instagram.com/reel/DcC9E2oz5H6/',
    previewImageUrl: '/previews/au_003.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=-4NUjd6S_fo'
  },
  {
    id: 'au_004',
    name: 'Golden 🎬',
    description: 'HUNTR/X 원곡 챌린지! 최신성보다 장기 지속성과 인지도 강점',
    imageUrl: '🎬',
    tags: ["#칼각완성형", "#무드연출가형", "#시선강탈형"],
    idealScores: { energy: 85, presence: 85, movement: 80, direction: 60 },
    videoUrl: 'https://www.instagram.com/popular/golden-dance-challenge/',
    previewImageUrl: '/previews/au_004.jpg',
    youtubeUrl: 'https://www.youtube.com/shorts/CCSiMOEALc4'
  },
  {
    id: 'au_005',
    name: 'august 🎬',
    description: 'Taylor Swift 원곡 챌린지! 8월 종료 후 trendScore 자동 감점 필요',
    imageUrl: '🎬',
    tags: ["#무드연출가형", "#아기자기디테일형", "#시즌형현재트렌드"],
    idealScores: { energy: 20, presence: 35, movement: 5, direction: 60 },
    videoUrl: 'https://www.instagram.com/reels/audio/921447351682109',
    youtubeUrl: 'https://www.youtube.com/watch?v=nn_0zPAfyo8',
    previewImageUrl: '/previews/au_005.jpg',
  },
  {
    id: 'au_006',
    name: 'sweetly (71.78) 🍬',
    description: 'jkl 원곡 챌린지! 범용성이 높아 fallback 오디오로도 적합',
    imageUrl: '🍬',
    tags: ["#말랑큐티형", "#아기자기디테일형", "#무드연출가형"],
    idealScores: { energy: 35, presence: 45, movement: 10, direction: 55 },
    videoUrl: 'https://www.instagram.com/reels/audio/1741362503149150/',
    previewImageUrl: '/previews/au_006.jpg',
    youtubeUrl: 'https://www.youtube.com/shorts/PSe-L3V9nGo',
  },
  {
    id: 'au_007',
    name: 'Loser 🎬',
    description: 'Tame Impala 원곡 챌린지! 도시·패션·시네마틱 편집에 적합',
    imageUrl: '🎬',
    tags: ["#무드연출가형", "#시선강탈형", "#현재재상승"],
    idealScores: { energy: 55, presence: 70, movement: 20, direction: 70 },
    videoUrl: 'https://www.instagram.com/reels/audio/1145851344072089/loser/',
    youtubeUrl: 'https://www.youtube.com/watch?v=s3a4OQR-10M',
    previewImageUrl: '/previews/au_007.jpg',
  },
  {
    id: 'au_008',
    name: 'petal 🎬',
    description: 'Ariana Grande 원곡 챌린지! 클린 버전 또는 대체 음원 여부 확인 후 활성화',
    imageUrl: '🎬',
    tags: ["#무드연출가형", "#시선강탈형", "#신규상승"],
    idealScores: { energy: 45, presence: 80, movement: 25, direction: 85 },
    videoUrl: 'https://www.instagram.com/reels/audio/27070461759205089/',
    youtubeUrl: 'https://www.youtube.com/watch?v=afSgBNwmZrQ',
    previewImageUrl: '/previews/au_008.jpg',
  },
  {
    id: 'au_009',
    name: 'Dracula (JENNIE Remix) 🎬',
    description: 'Tame Impala / JENNIE 원곡 챌린지! 카메라 워킹·입모양 중심 추천에 강함',
    imageUrl: '🎬',
    tags: ["#시선강탈형", "#표정천재형", "#반전매력형"],
    idealScores: { energy: 75, presence: 95, movement: 30, direction: 65 },
    videoUrl: 'https://www.instagram.com/reels/audio/1887907191828006/',
    previewImageUrl: '/previews/au_009.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=h7ITAdTxdxM',
  },
  {
    id: 'au_010',
    name: 'Yummy Little Day 🎬',
    description: '@emilogue 원곡 챌린지! 귀여운 유형의 대표 오디오',
    imageUrl: '🎬',
    tags: ["#말랑큐티형", "#아기자기디테일형", "#현재대형트렌드"],
    idealScores: { energy: 30, presence: 40, movement: 10, direction: 60 },
    videoUrl: 'https://www.instagram.com/reels/audio/980370881663525/',
    previewImageUrl: '/previews/au_010.jpg',
    youtubeUrl: 'https://www.youtube.com/shorts/Cfe_pQGsJjQ'
  }
];

danceChallenges.push(...challenges.filter((challenge) => challenge.id.startsWith('ch_')));