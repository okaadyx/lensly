import axios, { AxiosInstance } from "axios";
import User from "./user";

class Api {
  axiosClient: AxiosInstance;
  user: User;
  constructor() {
    this.axiosClient = axios.create({
      baseURL: "https://quick-pic-one.vercel.app/",
    });
    this.user = new User(this.axiosClient);
  }
}

export const userApi = new Api();
