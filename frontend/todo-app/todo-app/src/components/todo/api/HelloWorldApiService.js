import {apiClient} from "./ApiClient";

export const getHelloWorlPathVariable =
    (username, token) => apiClient.get(`/hello-world/path-variable/${username}`)


