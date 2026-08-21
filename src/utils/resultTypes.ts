import { ResultType } from '@/types';

export interface ResultTypeDetail {
  id: ResultType;
  title: string;
  subtitle: string;
  description: string;
  themeColor: string;
  bgColor: string;
  emoji: string;
  shareText: string;
}

export const RESULT_TYPES: Record<ResultType, ResultTypeDetail> = {
  SOFT_CUTE: {
    id: 'SOFT_CUTE',
    title: '말랑 큐티형',
    subtitle: '손끝 하나로 귀여움 폭발하는 타입',
    description: '부담스러운 전신 안무보다는 가벼운 손동작과 표정 연기로 시선을 사로잡는 귀여움 담당입니다.',
    themeColor: '#FF99C8',
    bgColor: 'bg-pink-50',
    emoji: '🐾',
    shareText: '나랑 뽀짝한 손댄스 릴스 찍을 사람? 🐾',
  },
  POWER_PERFORMER: {
    id: 'POWER_PERFORMER',
    title: '파워 퍼포머형',
    subtitle: '무대를 씹어먹는 폼생폼사 힙스터',
    description: '비트를 하나하나 쪼개며 전신을 사용하는 파워풀한 안무에서 가장 빛이 나는 댄스 본능 타입입니다.',
    themeColor: '#FF3366',
    bgColor: 'bg-red-50',
    emoji: '🔥',
    shareText: '오늘 좀 빡세게 췄다🔥 댄스 듀엣 구함!',
  },
  EYE_CATCHER: {
    id: 'EYE_CATCHER',
    title: '시선 강탈형',
    subtitle: '주인공 병이 아니라 진짜 주인공',
    description: '어느 자리에서든 존재감이 확실하며, 킬링 파트 표정과 썸네일 한 장으로 사람들을 홀리는 시선 집중 타입입니다.',
    themeColor: '#FFE600',
    bgColor: 'bg-yellow-50',
    emoji: '😎',
    shareText: '나랑 릴스 찍으면 무조건 알고리즘 떡상함 😎',
  },
  DETAIL_DIRECTOR: {
    id: 'DETAIL_DIRECTOR',
    title: '아기자기 연출형',
    subtitle: '작은 디테일까지 작품으로 만드는 숏폼 감독',
    description: '소품, 의상 교체, 화면 전환 타이밍을 정교하게 맞추어 완성도 높은 영상을 기획하는 연출가 타입입니다.',
    themeColor: '#00F5D4',
    bgColor: 'bg-emerald-50',
    emoji: '🎬',
    shareText: '우리 추억 소소하고 감성 있게 릴스로 남길래? 🎬',
  },
  CONCEPT_HOLIC: {
    id: 'CONCEPT_HOLIC',
    title: '컨셉 과몰입형',
    subtitle: '세계관을 찢고 나온 숏폼 연기파',
    description: '독특한 소품 연출과 표정 연기로 확실한 콘셉트를 잡아 시청자를 빠져들게 만드는 타입입니다.',
    themeColor: '#9D4EDD',
    bgColor: 'bg-purple-50',
    emoji: '🎭',
    shareText: '나랑 병맛/컨셉 릴스 같이 찍을 사람 구함 🎭',
  },
  GROOVE_MASTER: {
    id: 'GROOVE_MASTER',
    title: '여유로운 그루버형',
    subtitle: '힘 빡 안 줘도 리듬감 넘치는 춤꾼',
    description: '과도한 에너지를 쓰지 않고도 그루브와 스텝만으로 릴스를 스타일리시하게 채우는 타입입니다.',
    themeColor: '#48CAE4',
    bgColor: 'bg-sky-50',
    emoji: '🎧',
    shareText: '스무스하게 릴스 하나 말아볼까? 🎧',
  },
  VIBE_MAKER: {
    id: 'VIBE_MAKER',
    title: '분위기 메이커형',
    subtitle: '보기만 해도 기분 좋아지는 인간 박카스',
    description: '넘치는 텐션과 유쾌한 존재감으로 함께 찍는 친구들까지 흥나게 만드는 릴스 인싸 타입입니다.',
    themeColor: '#FF9E00',
    bgColor: 'bg-orange-50',
    emoji: '🎉',
    shareText: '나랑 찍으면 텐션 보장함! 릴스 가자 🎉',
  },
  MINIMAL_MOOD: {
    id: 'MINIMAL_MOOD',
    title: '감성 미니멀형',
    subtitle: '일상도 영화로 만드는 감성 아티스트',
    description: '화려한 댄스보다는 톤앤매너, 자연스러운 움직임과 배경 음악으로 잔잔한 감성을 전하는 타입입니다.',
    themeColor: '#B7B7A4',
    bgColor: 'bg-stone-50',
    emoji: '🌿',
    shareText: '소소하게 일상 감성 릴스 남길 사람? 🌿',
  },
};