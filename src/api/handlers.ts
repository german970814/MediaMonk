import qs from "qs";
import _ from "lodash";

const API_URL = "https://jsonplaceholder.typicode.com";

export type ServerResponseBase = {
  code?: string;
  detail?: string;
  success: boolean;
};

type ApiConfig = {
  version?: string;
  baseUrl?: string;
  headers?: { [key: string]: string };
};

export class ApiHeaders {
  ["x-uid"]?: string;
  ["x-device"]?: string;
  Authorization?: string;
  ["user-agent"]?: string;
  ["Content-Type"]?: string;

  constructor() {
    this["Content-Type"] = "application/x-www-form-urlencoded";
  }
}

export const headers = new ApiHeaders();

const defaultConfig: ApiConfig = {
  version: "",
  baseUrl: API_URL,
};

export const post: <T>(
  url: string,
  params?: any,
  _config?: ApiConfig
) => Promise<T & ServerResponseBase> = (url, params, _config) => {
  const config = Object.assign({}, defaultConfig, _config);
  return fetch(`${config.baseUrl}${config.version}${url}`, {
    method: "POST",
    body:
      config.headers?.["Content-Type"] === "application/json"
        ? JSON.stringify(_.omitBy(params, _.isNil))
        : qs.stringify(_.omitBy(params, _.isNil)),
    headers: Object.assign({}, headers, config.headers ?? ({} as Headers)),
  }).then((response) => response.json());
};

export const get: <T>(
  url: string,
  params?: any,
  config?: ApiConfig
) => Promise<T & ServerResponseBase> = (
  url,
  params,
  config = defaultConfig
) => {
  const queryParams = Object.keys(_.omitBy(params ?? {}, _.isNil))
    .map((key: string) => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");
  return fetch(`${config.baseUrl}${config.version}${url}?${queryParams}`, {
    method: "GET",
    headers: headers as Headers,
  }).then((response) => response.json());
};
