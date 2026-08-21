'use client';

import { useState } from 'react';
import Landing from '@/components/Landing';
import ConditionSelect from '@/components/ConditionSelect';
import Question from '@/components/Question';
import Loading from '@/components/Loading';
import Result from '@/components/Result';
import { UserCondition, Scores } from '@/types';

// 화면 상태 Step
type Step = 'LANDING' | 'CONDITION' | 'QUESTION' | 'LOADING' | 'RESULT';

export default function Home() {
  const [step, setStep] = useState<Step>('LANDING');
  const [condition, setCondition] = useState<UserCondition>({
    peopleType: '1in',
    difficulty: 1,
  });
  const [userScores, setUserScores] = useState<Scores>({
    energy: 50,
    presence: 50,
    movement: 50,
    direction: 50,
  });

  // 조건 선택 완료 후 질문 단계로 이동
  const handleConditionSubmit = (selectedCondition: UserCondition) => {
    setCondition(selectedCondition);
    setStep('QUESTION');
  };

  // 12개 질문 응답 완료 후 계산 및 로딩으로 이동
  const handleQuestionComplete = (calculatedScores: Scores) => {
    setUserScores(calculatedScores);
    setStep('LOADING');

    // 2.5초 후 결과 화면으로 자동 이동
    setTimeout(() => {
      setStep('RESULT');
    }, 2500);
  };

  // 다시 테스트하기
  const handleRestart = () => {
    setStep('LANDING');
  };

  return (
    <main className="max-w-md mx-auto min-h-screen bg-slate-50 relative overflow-x-hidden">
      {step === 'LANDING' && (
        <Landing onStart={() => setStep('CONDITION')} />
      )}

      {step === 'CONDITION' && (
        <ConditionSelect onSubmit={handleConditionSubmit} />
      )}

      {step === 'QUESTION' && (
        <Question onComplete={handleQuestionComplete} />
      )}

      {step === 'LOADING' && <Loading />}

      {step === 'RESULT' && (
        <Result
          scores={userScores}
          condition={condition}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
}