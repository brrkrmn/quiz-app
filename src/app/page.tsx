'use client'

import { useQuizContext } from "@/context/quizProvider";
import { useEffect } from "react";

export const Home = () => {
  const { initializeQuestions } = useQuizContext()

  useEffect(() => {
    initializeQuestions()
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    </div>
  );
}

export default Home