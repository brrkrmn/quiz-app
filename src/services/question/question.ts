import { service } from "@/api";
import { GetQuestionsResponse } from "./question.types";

const questionService = {
  getQuestions: async () => {
    const res = await service.get<GetQuestionsResponse>("/");
    return res.data;
  },
};

export { questionService };
