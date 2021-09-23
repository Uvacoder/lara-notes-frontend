import axios from "axios";

const instance = axios.create({
  baseURL: "https://lara-notes.herokuapp.com/api",
})

export default instance;
