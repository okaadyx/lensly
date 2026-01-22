import axios, { AxiosInstance } from "axios";
import ImageApi from "./images";

class Api {
  axiosClient: AxiosInstance;
  image: ImageApi;
  constructor() {
    this.axiosClient = axios.create({
      baseURL: "https://pixabay.com/api/",
    });
    this.image = new ImageApi(this.axiosClient);
  }
}

export const api = new Api();
