import axios from "axios";

axios.interceptors.response.use(null, (error) => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        console.log("An unexpected error occurred");
    }
    return Promise.reject(error);
});

const http = {
    get: axios.get,
    post: axios.post,
};

export default http;
