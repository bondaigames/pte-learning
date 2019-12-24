import axios from "axios";

const instance = axios.create({
  baseURL: "https://dz1ckmix5oech.cloudfront.net/"
});

export default instance;
