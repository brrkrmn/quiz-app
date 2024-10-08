'use client'

import { questionService } from "@/services/question";
import { getNFromArray } from "@/utils/getNFromArray";
import { createContext, useContext, useMemo, useState } from "react";
import {
  Option,
  Question,
  QuizContextValue,
  Status,
  Step,
} from "./quizContext.types";

export const QuizContext = createContext<QuizContextValue>(null);

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (context === null) {
    throw new Error("You can only call this hook inside QuizProvider");
  }
  return context;
};

const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [step, setStep] = useState<Step>(10);
  const [status, setStatus] = useState<Status>("notStarted");
  const [isLoading, setIsLoading] = useState(false);

  const initializeQuestions = async () => {
    setIsLoading(true);
    const items = await questionService.getQuestions();
    const randomizedItems = getNFromArray(items, 10);

    const questions: Question[] = randomizedItems.map((item, index) => {
      const options = item.body.split("\n");
      return {
        number: (index + 1) as Step,
        id: item.id,
        title: item.title,
        options: {
          A: options[0],
          B: options[1],
          C: options[2],
          D: options[3],
        },
        selected: null,
      };
    });
    setQuestions(questions);
    setIsLoading(false);
  };

  const startQuiz = async () => {
    await initializeQuestions();
    setStatus("ongoing");
    setStep(1);
  };

  const currentQuestion = useMemo(() => {
    const question = questions.find((q) => q.number === step);
    return question ?? null;
  }, [step]);

  const handleSaveAndNext = (answer?: Option) => {
    if (answer) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === currentQuestion?.id
            ? { ...question, selected: answer }
            : question
        )
      );
    }

    const nextStep = step + 1;
    if (nextStep === 11) {
      setStatus("finished");
    } else {
      setStep(nextStep as Step);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        step,
        status,
        setStatus,
        isLoading,
        initializeQuestions,
        currentQuestion,
        questions,
        handleSaveAndNext,
        startQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;