import axios from "axios";

export const baseURL = "https://jsonplaceholder.typicode.com/posts"

export const service = axios.create({
  baseURL: baseURL
});