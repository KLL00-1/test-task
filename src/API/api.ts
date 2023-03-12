import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.github.com/graphql",
});
instance.interceptors.request.use((config: any) => {
  config.headers.Authorization =
    "Bearer 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";
  return config;
});

export const githubApi = {
  getAllRepo: (query: any) => {
    return instance.post("", { query }).then((response) => {
      return response.data.data.user.repositories;
    });
  },
  searchRepo: (query: any) => {
    return instance.post("", { query }).then((response) => {
      return response.data.data.search.nodes;
    });
  },
  getCurrentRepo: (query: any) => {
    return instance.post("", { query }).then((response) => {
      return response.data.data.node;
    });
  },
};
