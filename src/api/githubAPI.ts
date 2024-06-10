import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const githubAPI = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  },
});
