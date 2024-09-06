import { baseURL, service } from "../../api/api";
import { GetQuestionsResponse } from "./question.types";

const questionService = {
  getQuestions: async () => {
    const res = await service.get<GetQuestionsResponse>(baseURL)
    return res.data
  }
}

export default questionService;
