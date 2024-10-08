export type GetQuestionsResponse = Item[]

export type Item = {
  userId: number;
  id: number;
  title: string;
  body: string;
}