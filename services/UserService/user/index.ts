import { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";

export default class User {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  private async getAuthHeader() {
    const token = await SecureStore.getItemAsync("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async getUser() {
    const headers = await this.getAuthHeader();
    const response = await this.client.get("/users", {
      headers,
    });
    return response.data;
  }

  async login(data: any) {
    const response = await this.client.post("/users/login", data);
    if (response?.data.token) {
      await SecureStore.setItemAsync("token", response?.data?.token);
    }
    return response.data;
  }
  async signup(data: any) {
    const response = await this.client.post("/users/signup", data);
    if (response?.data.token) {
      await SecureStore.setItemAsync("token", response?.data?.token);
    }
    return response.data;
  }
}
