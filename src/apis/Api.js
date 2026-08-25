import axios from "axios";
const api = axios.create({
  baseURL: "https://openlibrary.org",
});

export default api;
