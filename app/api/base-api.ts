import axios, { AxiosInstance, AxiosResponse } from "axios";

const baseUrl = "https://6626a7d9052332d55323994b.mockapi.io/api/v1";

interface ErrorResponse {
  status: number;
  data: any;
}

export class BaseApi {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async request<T>(
    url: string,
    method: string,
    data?: any,
    headers?: any
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance.request<T>({
        url,
        method,
        data,
        headers: { ...headers },
      });

      return response.data;
    } catch (error: any) {
      throw this.errorHandler(error.response);
    }
  }

  private errorHandler(
    response: AxiosResponse<any> | undefined
  ): ErrorResponse {
    if (response) {
      const { status, data } = response;
      throw { status, data };
    }

    throw { status: 500, data: "Unknown error occurred" };
  }
}

const baseApi = new BaseApi();

export default baseApi;
