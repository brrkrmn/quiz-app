'use client'

import { Quiz } from "@/components/Quiz";
import { Results } from "@/components/Results";
import { StartingMenu } from "@/components/StartingMenu";
import { useQuizContext } from "@/context/quizProvider";
import { useEffect } from "react";

export const Home = () => {
  const { initializeQuestions, status } = useQuizContext()

  useEffect(() => {
    initializeQuestions()
  }, [])

  return (
    <div className="dark bg-zinc-900 flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {status === "notStarted" ? <StartingMenu /> : status === "finished" ? <Results /> : <Quiz />}
    </div>
  );
}

export default Home