import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://foxus-ai-be.onrender.com",
});

export default newRequest;