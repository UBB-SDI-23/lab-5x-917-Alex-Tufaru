const PROD_BACKEND_API_URL = "34.88.117.38/api";
const DEV_BACKEND_API_URL = "http://127.0.0.1:80/api";

export const BACKEND_API_URL =
  process.env.NODE_ENV === "development"
    ? DEV_BACKEND_API_URL
    : PROD_BACKEND_API_URL;
