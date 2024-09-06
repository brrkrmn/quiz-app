export type QuizContextValue = null | {
  initializeQuestions: () => void;
  questions: Question[];
  step: Step;
  status: Status;
  finishQuiz: () => void;
  startQuiz: () => void;
}

export type Question = {
  id: number;
  title: string;
  options: QuestionOption;
  selected: SelectedOption;
}

export type QuestionOption = {
  [key in Options]: string;
}

export type Options = 'A' | 'B' | 'C' | 'D'
export type SelectedOption = Options | null

export type Status = "notStarted" | "ongoing" | "finished"
export type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10