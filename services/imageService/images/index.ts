import { AxiosInstance } from "axios";

const API_KEY = process.env.EXPO_PUBLIC_PIXABAY_KEY;

export default class ImageApi {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  async fetchImages(page: number = 1, perPage: number = 10) {
    const { data } = await this.client.get("/", {
      params: {
        key: API_KEY,
        image_type: "photo",
        per_page: perPage,
        safesearch: true,
        editors_choice: true,
        page,
      },
    });

    return data.hits as any[];
  }
  async searchImages(query: string, page: number = 1, perPage: number = 10) {
    const { data } = await this.client.get("/", {
      params: {
        key: API_KEY,
        q: query,
        image_type: "photo",
        per_page: perPage,
        safesearch: true,
        editors_choice: true,
        page,
      },
    });

    return data.hits as any[];
  }
  async fetchImagesFromCategory(
    category: string,
    page: number = 1,
    perPage: number = 10
  ) {
    const { data } = await this.client.get("/", {
      params: {
        key: API_KEY,
        category: category,
        image_type: "photo",
        per_page: perPage,
        safesearch: true,
        editors_choice: true,
        page,
      },
    });

    return data.hits as any[];
  }
}

