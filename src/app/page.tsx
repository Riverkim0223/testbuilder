'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Landing from '@/components/Landing';
import ConditionSelect from '@/components/ConditionSelect';
import Question from '@/components/Question';
import Loading from '@/components/Loading';
import Result from '@/components/Result';
import { UserCondition, Scores } from '@/types';
import {
  clearResultState,
  parseShareParams,
  saveResultState,
} from '@/utils/shareResult';

type Step = 'LANDING' | 'CONDITION' | 'QUESTION' | 'LOADING' | 'RESULT';

const defaultScores: Scores = {
  energy: 50,
  presence: 50,
  movement: 50,
  direction: 50,
};

const defaultCondition: UserCondition = {
  peopleType: '1in',
  difficulty: 2,
};

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initializedRef = useRef(false);
  const skipRestoreRef = useRef(false);

  const [step, setStep] = useState<Step>('LANDING');
  const [condition, setCondition] = useState<UserCondition>(defaultCondition);
  const [userScores, setUserScores] = useState<Scores>(defaultScores);
  const [hydrated, setHydrated] = useState(false);

  // 최초 1회만 URL/세션에서 결과 복원 (다시하기 후에는 복원 안 함)
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    if (!skipRestoreRef.current) {
      const fromUrl = parseShareParams(searchParams);
      if (fromUrl) {
        setUserScores(fromUrl.scores);
        setCondition(fromUrl.condition);
        setStep('RESULT');
      }
    }

    setHydrated(true);
  }, [searchParams]);

  useEffect(() => {
    if (step === 'RESULT') {
      saveResultState({ scores: userScores, condition });
    }
  }, [step, userScores, condition]);

  const handleConditionSubmit = (selectedCondition: UserCondition) => {
    skipRestoreRef.current = true;
    clearResultState();
    router.replace('/', { scroll: false });
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
    skipRestoreRef.current = true;
    clearResultState();
    setUserScores(defaultScores);
    setCondition(defaultCondition);
    setStep('LANDING');
    router.replace('/', { scroll: false });
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
