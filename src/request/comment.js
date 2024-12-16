import apiClient from "./apiClient";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    delete: (slug, id) => apiClient.delete("/comments/" + slug + "/" + id),
    create: (slug, body) => apiClient.post(`/comments/${slug}`, { comment: { body } }),
    get: (slug) => apiClient.get("/comments/" + slug),
}