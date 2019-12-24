import axios from "axios";

const instance = axios.create({
  baseURL: "https://ptelearning-7266d.firebaseio.com/"
});

export default instance;
