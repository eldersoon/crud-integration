import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 10000,
});

// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("ERRO RESPONSE", error);
  }
);

export { request };
