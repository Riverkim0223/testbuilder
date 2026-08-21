# 🎬 숏폼 챌린지 성향 테스트 (Reels/Shorts Challenge Matcher)

사용자의 댄스 및 촬영 성향을 12개의 질문으로 분석하여, 가장 잘 맞는 숏폼(릴스, 쇼츠, 틱톡) 챌린지를 추천해 주는 인터랙티브 웹 애플리케이션입니다.

## ✨ 주요 기능 (Features)
- **사용자 맞춤형 조건 설정:** 촬영 인원(1인, 2인, 다수) 및 선호 난이도 사전 선택
- **4축 성향 분석:** 에너지, 존재감, 움직임, 연출력 4가지 지표를 기준으로 성향 측정
- **유클리드 거리 기반 매칭 알고리즘:** 사용자의 결과 점수와 가장 근사치에 있는 챌린지 도출
- **결과 이미지 저장:** `html2canvas`를 활용한 고화질 결과 카드 캡처 및 다운로드 지원
- **모바일 최적화 UI:** 모바일 디바이스에 맞춘 반응형 레이아웃 및 Tailwind CSS 기반의 미려한 애니메이션

## 🛠 기술 스택 (Tech Stack)
- **Framework:** Next.js (React) - App Router 적용 (`'use client'`)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Library:** html2canvas (이미지 저장)

## 📁 디렉토리 구조 (Directory Structure)
```text
src/
 ├── components/
 │    ├── Landing.tsx         # 메인 시작 화면
 │    ├── ConditionSelect.tsx # 촬영 인원/난이도 조건 설정
 │    ├── Question.tsx        # 12문항 질문 풀이 및 진행률 바
 │    ├── Loading.tsx         # 결과 분석 트랜지션 화면
 │    └── Result.tsx          # 최종 결과 매칭 및 이미지 저장
 ├── utils/
 │    ├── questions.ts        # 12개 질문 데이터
 │    ├── challenges.ts       # 결과 챌린지 목록 데이터
 │    └── matchAlgorithm.ts   # 유클리드 거리 매칭 로직
 ├── types/
 │    └── index.ts            # 공통 타입(인터페이스) 정의
 └── app/
      └── page.tsx            # 메인 페이지 (상태에 따른 흐름 제어)