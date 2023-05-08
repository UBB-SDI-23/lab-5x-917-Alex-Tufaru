const PROD_BACKEND_API_URL = "https://35.228.12.89:80/api";
const DEV_BACKEND_API_URL = "https://127.0.0.1:80:80/api";

export const BACKEND_API_URL =
    process.env.NODE_ENV === "development"
        ? DEV_BACKEND_API_URL
        : PROD_BACKEND_API_URL;
