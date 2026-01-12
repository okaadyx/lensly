import { AxiosInstance } from "axios";

export default class ImageApi {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  async fetchImages(page: number = 1, perPage: number = 10) {
    const { data } = await this.client.get("/", {
      params: {
        key: "45725306-f91a00a573a2608e69442bf61",
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
        key: "45725306-f91a00a573a2608e69442bf61",
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
}
