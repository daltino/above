import axios from "axios";
import config from "./config/local";

export default axios.create({
  baseURL: config.BASE_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});
