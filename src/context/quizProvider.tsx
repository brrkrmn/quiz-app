'use client'

import questionService from "@/services/question/question";
import { Item } from "@/services/question/question.types";
import { createContext, useContext, useMemo, useState } from "react";
import { Options, Question, QuizContextValue, Status, Step } from "./quizContext.types";

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
  const [step, setStep] = useState<Step>(0);
  const [status, setStatus] = useState<Status>("notStarted");

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

  const finishQuiz = () => {
    setStatus("finished")
  }

  const startQuiz = () => {
    initializeQuestions()
    setStatus("ongoing")
    setStep(1)
  }

  const currentQuestion = useMemo(() => {
    const question = questions.find(q => q.id === step)
    if (question) {
      return question
    }
    return null
  }, [step])

  const handleSaveAndNext = (answer?: Options) => {
    if (answer) {
      const currentQuestion = questions.find(q => q.id === step)
      setQuestions(prevQuestions =>
        prevQuestions.map(question =>
          question.id === currentQuestion?.id
            ? { ...question, selected: answer }
            : question
        )
      )
    }

    const nextStep = step + 1
    if (nextStep === 11) {
      setStatus("finished")
    } else {
      setStep(nextStep)
    }
  }

  return (
    <QuizContext.Provider
      value={{
        step,
        status,
        initializeQuestions,
        currentQuestion,
        questions,
        handleSaveAndNext,
        finishQuiz,
        startQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export default QuizProvider;