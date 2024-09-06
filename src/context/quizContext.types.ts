export type QuizContextValue = null | {
  step: Step;
  status: Status;
  questions: Question[];
  isLoading: boolean;
  currentQuestion: Question | null;
  startQuiz: () => void;
  initializeQuestions: () => void;
  setStatus: (value: Status) => void;
  handleSaveAndNext: (answer?: Option) => void;
};

export type Question = {
  number: Step;
  id: number;
  title: string;
  options: QuestionOption;
  selected: SelectedOption;
};

export type QuestionOption = {
  [key in Option]: string;
};

export type Option = "A" | "B" | "C" | "D";
export type SelectedOption = Option | null;

export type Status = "notStarted" | "ongoing" | "finished"
export type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;