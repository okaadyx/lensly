import axios, { AxiosInstance } from "axios";
import User from "./user";
import WishlistApi from "./wishlist";
class Api {
  axiosClient: AxiosInstance;
  user: User;
  wishlist: WishlistApi;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: "https://quick-pic-one.vercel.app/",
    });
    this.user = new User(this.axiosClient);
    this.wishlist = new WishlistApi(this.axiosClient);
  }
}

export const userApi = new Api();
