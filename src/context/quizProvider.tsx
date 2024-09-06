'use client'

import questionService from "@/services/question/question";
import { Item } from "@/services/question/question.types";
import { createContext, useContext, useState } from "react";
import { Question, QuizContextValue } from "./quizContext.types";

export const QuizContext = createContext<QuizContextValue>(null);

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (context === null) {
    throw new Error("You can only call this hook inside QuizProvider")
  }
  return context;
}

const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const initializeQuestions = async () => {
    const questionItems: Question[] = [];
    const items = await questionService.getQuestions();

    for (let i = 0; i < 10; i++) {
      const item: Item = items[i];
      const options = item.body.split('\n');
      const questionObject = {
        id: item.id,
        title: item.title,
        options: {
          A: options[0],
          B: options[1],
          C: options[2],
          D: options[3],
        },
        selected: null,
      }
      questionItems.push(questionObject)
    }
    setQuestions(questionItems);
  }

  return (
    <QuizContext.Provider
      value={{
        initializeQuestions,
        questions,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export default QuizProvider;