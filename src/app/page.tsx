'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Landing from '@/components/Landing';
import ConditionSelect from '@/components/ConditionSelect';
import Question from '@/components/Question';
import Loading from '@/components/Loading';
import Result from '@/components/Result';
import { UserCondition, Scores } from '@/types';
import { clearResultState, loadResultState, parseShareParams, saveResultState } from '@/utils/shareResult';

type Step = 'LANDING' | 'CONDITION' | 'QUESTION' | 'LOADING' | 'RESULT';

const defaultScores: Scores = {
  energy: 50,
  presence: 50,
  movement: 50,
  direction: 50,
};

function HomeContent() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>('LANDING');
  const [condition, setCondition] = useState<UserCondition>({
    peopleType: '1in',
    difficulty: 1,
  });
  const [userScores, setUserScores] = useState<Scores>(defaultScores);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const fromUrl = parseShareParams(searchParams);
    const saved = fromUrl ?? loadResultState();

    if (saved) {
      setUserScores(saved.scores);
      setCondition(saved.condition);
      setStep('RESULT');
    }

    setHydrated(true);
  }, [searchParams]);

  useEffect(() => {
    if (step === 'RESULT') {
      saveResultState({ scores: userScores, condition });
    }
  }, [step, userScores, condition]);

  const handleConditionSubmit = (selectedCondition: UserCondition) => {
    clearResultState();
    setCondition(selectedCondition);
    setStep('QUESTION');
  };

  const handleQuestionComplete = (calculatedScores: Scores) => {
    setUserScores(calculatedScores);
    setStep('LOADING');

    setTimeout(() => {
      setStep('RESULT');
    }, 2500);
  };

  const handleRestart = () => {
    clearResultState();
    setStep('LANDING');
  };

  if (!hydrated) {
    return (
      <main className="w-full max-w-md mx-auto min-h-screen bg-slate-50 flex items-center justify-center">
        <span className="text-sm text-slate-400">불러오는 중...</span>
      </main>
    );
  }

  return (
    <main className="w-full max-w-md mx-auto min-h-screen bg-slate-50 relative overflow-x-hidden">
      {step === 'LANDING' && <Landing onStart={() => setStep('CONDITION')} />}
      {step === 'CONDITION' && <ConditionSelect onSubmit={handleConditionSubmit} />}
      {step === 'QUESTION' && <Question onComplete={handleQuestionComplete} />}
      {step === 'LOADING' && <Loading />}
      {step === 'RESULT' && (
        <Result scores={userScores} condition={condition} onRestart={handleRestart} />
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <main className="w-full max-w-md mx-auto min-h-screen bg-slate-50 flex items-center justify-center">
          <span className="text-sm text-slate-400">불러오는 중...</span>
        </main>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
