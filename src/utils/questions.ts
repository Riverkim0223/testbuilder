import type { Scores } from "@/types";

export interface QuestionItem {
  id: number;
  axis: 'energy' | 'presence' | 'movement' | 'direction';
  axisLabel: string;
  question: string;
  options: { text: string; score: number }[]; 
}

export const questions: QuestionItem[] = [
  // --- [1. 에너지 (Energy)] ---
  {
    id: 1,
    axis: "energy",
    axisLabel: "에너지",
    question: "새벽 2시, 알고리즘에 뜬 역대급 유행 챌린지를 발견했다! 나의 행동은?",
    options: [
      { text: "이미 조명 켜고 촬영 버튼 눌렀음. 오늘 안 자!🔥", score: 5 },
      { text: "벌떡 일어나서 잠옷 차림으로 거울 앞에서 연습 시작", score: 4 },
      { text: "침대에서 상체만 일으켜서 팔 동작만 대충 따라 해봄", score: 3 },
      { text: "오.. 내일 친구한테 같이 찍자고 디엠 보내놓기", score: 2 },
      { text: "내일 아침에 누워서 봐야지~ (저장만 하고 잔다)", score: 1 },
    ],
  },
  {
    id: 2,
    axis: "energy",
    question: "친구가 '우리 완전 망가지는 엽기 개그 릴스 찍자!'라고 했을 때 내 반응은?",
    axisLabel: "에너지",
    options: [
      { text: "아이디어 대폭발! 내가 더 앞장서서 미친 텐션 보여줌", score: 5 },
      { text: "이왕 할 거면 제대로 망가져야지! 엽기 소품 주섬주섬", score: 4 },
      { text: "살짝 킹받는 표정 연기 정도는 기꺼이 해줄 수 있음", score: 3 },
      { text: "필터 씌우고 얼굴 빵떡으로 가려주는 조건이면 콜..", score: 2 },
      { text: "아... 내 인스타 피드에 그런 걸 올릴 순 없어 (단호)", score: 1 },
    ],
  },
  {
    id: 3,
    axis: "energy",
    axisLabel: "에너지",
    question: "길거리 한복판에서 최애 아이돌의 챌린지 노래가 나온다면?",
    options: [
      { text: "여기가 바로 무대다. 지나가는 사람 의식 안 하고 풀 댄스 갈김", score: 5 },
      { text: "나도 모르게 흥분해서 스텝 밟으며 흥얼거림", score: 4 },
      { text: "주머니 속에서 손가락으로 작게 포인트 안무를 까딱거림", score: 3 },
      { text: "친구를 툭툭 치며 '야 이거 우리 어제 본 거잖아' 하고 아는 척함", score: 2 },
      { text: "속으로 '오 이 노래네' 하고 아주 쿨하게 지나감", score: 1 },
    ],
  },

  // --- [2. 존재감 (Presence)] ---
  {
    id: 4,
    axis: "presence",
    axisLabel: "존재감",
    question: "인파가 북적이는 핫플 카페에서 릴스를 찍어야 한다면?",
    options: [
      { text: "구경꾼? 오히려 좋아. 환호성을 유도하며 시선을 즐긴다", score: 5 },
      { text: "지나가는 사람들이 쳐다봐도 꿋꿋하게 내 춤을 춘다", score: 4 },
      { text: "조금 부끄럽긴 한데, 철판 깔고 빠르게 몇 번 다시 찍음", score: 3 },
      { text: "사람들이 안 보는 타이밍에 후다닥 1번 찍고 도망침", score: 2 },
      { text: "사람 없는 구석으로... 아니 그냥 집에 가서 찍을래...", score: 1 },
    ],
  },
  {
    id: 5,
    axis: "presence",
    axisLabel: "존재감",
    question: "나를 가장 잘 표현하는 릴스 해시태그를 하나 고른다면?",
    options: [
      { text: "#관종 #조회수폭발기원 #이구역의미친자", score: 5 },
      { text: "#인싸의삶 #트렌드세터", score: 4 },
      { text: "#감성릴스 #무드보드", score: 3 },
      { text: "#부끄러움은나의몫 #어색뚝딱", score: 2 },
      { text: "#소소한일상 #방구석챌린지", score: 1 },
    ],
  },
  {
    id: 6,
    axis: "presence",
    axisLabel: "존재감",
    question: "영상을 올린 후, 사람들이 달아줬으면 하는 최고의 댓글은?",
    options: [
      { text: "알고리즘 탔네 성지순례 왔습니다. (조회수 떡상 기원)", score: 5 },
      { text: "미쳤다 폼 미쳤다 ㅋㅋㅋ 당장 아이돌 데뷔해!!", score: 4 },
      { text: "이 영상 분위기 너무 좋다~ 완전 찰떡이야!", score: 3 },
      { text: "오 ㅋㅋㅋ 쫌 귀엽네 ㅋㅋㅋ", score: 2 },
      { text: "(조용히 하트만 눌러주길 바람... 댓글 부담스러움)", score: 1 },
    ],
  },

  // --- [3. 움직임 (Movement)] ---
  {
    id: 7,
    axis: "movement",
    axisLabel: "움직임",
    question: "내가 평소에 가장 선호하는 챌린지 안무 스타일은?",
    options: [
      { text: "바닥에 눕고 구르고 뛰는 미친 활동량의 퍼포먼스", score: 5 },
      { text: "점프, 스텝, 웨이브 등 온몸을 다 쓰는 안무", score: 4 },
      { text: "골반이나 어깨를 가볍게 튕기는 적당한 그루브", score: 3 },
      { text: "손과 팔만 가볍게 움직이는 상체 위주의 율동", score: 2 },
      { text: "침대에 누워서 눈썹과 표정만으로 끝낼 수 있는 것", score: 1 },
    ],
  },
  {
    id: 8,
    axis: "movement",
    axisLabel: "움직임",
    question: "릴스 촬영을 끝내고 난 직후, 내 몸 상태는 어때야 할까?",
    options: [
      { text: "내일 알배겨서 침대에서 못 일어날 정도의 극한 유산소", score: 5 },
      { text: "숨 헐떡헐떡, 옷이 땀으로 다 젖어서 당장 씻어야 함", score: 4 },
      { text: "숨이 살짝 차오르고 이마에 송글송글 땀이 맺힘", score: 3 },
      { text: "목이나 어깨 정도만 뻐근한 가벼운 스트레칭 느낌", score: 2 },
      { text: "방금 찍었는지도 모를 만큼 호흡이 평온함 (손가락만 씀)", score: 1 },
    ],
  },
  {
    id: 9,
    axis: "movement",
    axisLabel: "움직임",
    question: "안무 영상을 봤는데, 동작이 엄청 빠르고 복잡하다! 내 생각은?",
    options: [
      { text: "복잡할수록 피가 끓는다! 완벽하게 마스터해서 찢어버림", score: 5 },
      { text: "땀 뻘뻘 흘려가며 각 잡고 1시간 이상 맹연습", score: 4 },
      { text: "속도를 0.5배속으로 낮추고 일단 뚝딱거리며 따라 해봄", score: 3 },
      { text: "제일 쉬운 손동작 부분만 따와서 내 맘대로 개조함", score: 2 },
      { text: "이건 인간이 할 수 없는 관절이다. 깔끔하게 포기.", score: 1 },
    ],
  },

  // --- [4. 연출력 (Direction)] ---
  {
    id: 10,
    axis: "direction",
    axisLabel: "연출",
    question: "영상을 촬영한 후 모니터링할 때, 내가 절대 못 참는 것은?",
    options: [
      { text: "조명, 각도, 머리카락 휘날림까지 완벽할 때까지 100번 찍음", score: 5 },
      { text: "음악 비트랑 내 동작이 0.1초라도 어긋나면 무조건 재촬영", score: 4 },
      { text: "배경에 지저분한 게 나왔네? 스티커로 대충 가리고 올림", score: 3 },
      { text: "타이밍이 살짝 안 맞긴 한데... 다시 찍기 귀찮으니 패스", score: 2 },
      { text: "내 얼굴만 잘 나왔으면 장땡! 대충 올리자~", score: 1 },
    ],
  },
  {
    id: 11,
    axis: "direction",
    axisLabel: "연출",
    question: "영상을 인스타에 올리기 직전, 마지막으로 하는 일은?",
    options: [
      { text: "색보정, 트랜지션 효과, 자막 싱크까지 영화 예고편 급 편집", score: 5 },
      { text: "비트 드롭 구간에 맞춰서 줌인/줌아웃 컷편집 싹 다 함", score: 4 },
      { text: "텍스트나 이모티콘 몇 개 귀엽게 배치해 주고 업로드", score: 3 },
      { text: "기본 필터 하나 쓱 씌우고 노래 입혀서 업로드", score: 2 },
      { text: "촬영 끝! 바로 [다음] -> [공유] 빛의 속도로 업로드", score: 1 },
    ],
  },
  {
    id: 12,
    axis: "direction",
    axisLabel: "연출",
    question: "친구들과 다 같이 단체 릴스를 찍기로 했다! 나의 포지션은?",
    options: [
      { text: "초 단위 동선 체크부터 표정 연기까지 코칭하는 JYP 감독님", score: 5 },
      { text: "의상, 소품, 카메라 구도까지 다 세팅해 주는 메인 기획자", score: 4 },
      { text: "동선 꼬일 때 한 번씩 정리해 주는 서브 디렉터", score: 3 },
      { text: "시키는 대로 앞줄에서 열심히 따라 하는 성실한 출연자", score: 2 },
      { text: "구석에서 뚝딱거리며 어떻게든 묻어가려는 병풍 역할", score: 1 },
    ],
  },
];

// 점수 계산 로직은 수정 없이 그대로 유지합니다!
function toAxisScore(total: number, count: number): number {
  if (count === 0) {
    return 50;
  }
  return Math.round((total / count / 5) * 100);
}

export function calculateScores(answers: Record<number, number>): Scores {
  const totals: Scores = {
    energy: 0,
    presence: 0,
    movement: 0,
    direction: 0,
  };
  const counts: Scores = {
    energy: 0,
    presence: 0,
    movement: 0,
    direction: 0,
  };

  questions.forEach((question) => {
    const answer = answers[question.id];
    if (answer === undefined) {
      return;
    }

    totals[question.axis] += answer;
    counts[question.axis] += 1;
  });

  return {
    energy: toAxisScore(totals.energy, counts.energy),
    presence: toAxisScore(totals.presence, counts.presence),
    movement: toAxisScore(totals.movement, counts.movement),
    direction: toAxisScore(totals.direction, counts.direction),
  };
}

/** 질문 순서대로 모은 1~5점 배열 → 0~100점 4축 점수 */
export function calculateScoresFromAnswers(answerScores: number[]): Scores {
  const answers: Record<number, number> = {};

  questions.forEach((question, index) => {
    const score = answerScores[index];
    if (score !== undefined) {
      answers[question.id] = score;
    }
  });

  return calculateScores(answers);
}