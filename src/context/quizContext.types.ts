export type QuizContextValue = null | {
  initializeQuestions: () => void;
  questions: Question[];
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