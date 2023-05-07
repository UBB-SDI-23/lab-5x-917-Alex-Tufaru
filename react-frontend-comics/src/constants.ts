const PROD_BACKEND_API_URL = "ec2-13-53-44-200.eu-north-1.compute.amazonaws.com/api";
const DEV_BACKEND_API_URL = "http://127.0.0.1:80/api";

export const BACKEND_API_URL =
  process.env.NODE_ENV === "development"
    ? DEV_BACKEND_API_URL
    : PROD_BACKEND_API_URL;
