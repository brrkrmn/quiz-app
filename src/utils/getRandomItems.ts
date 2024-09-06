import { Question } from "@/context/quizContext.types";
import { Item } from "@/services/question";

export const getQuestionsFromData = (array: Item[], count: number) => {
  const shuffled = array.slice().sort(() => 0.5 - Math.random());
  const sliced = shuffled.slice(0, count);
  const questions: Question[] = [];
  sliced.map((item, index) => {
    const options = item.body.split("\n");
    const questionObject = {
      number: index + 1,
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
    questions.push(questionObject);
  });
  return questions;
};
