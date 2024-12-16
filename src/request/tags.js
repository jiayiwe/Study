import apiClient from "./apiClient";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll: () => apiClient.get("/tags")
}