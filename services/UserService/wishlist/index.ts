import { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";

export default class WishlistApi {
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

  async getWishlist() {
    const headers = await this.getAuthHeader();
    const response = await this.client.get("/wishlist", {
      headers,
    });
    return response.data;
  }
  async addItem(payload: { imageId: string; imageUrl: string }) {
    const headers = await this.getAuthHeader();
    const response = await this.client.post("/wishlist/add", payload, {
      headers,
    });
    return response.data;
  }

  async removeItem(imageId: string) {
    const headers = await this.getAuthHeader();
    const response = await this.client.delete("/wishlist/remove", {
      headers,
      data: { imageId },
    });
    return response.data;
  }
}
