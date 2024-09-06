import { Item } from "@/services/question";

export const getNFromArray = (array: Item[], count: number) => {
  const shuffled = array.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
