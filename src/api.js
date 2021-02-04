import React from "react";
import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "https://api.themoviedb.org/3/movie/",
        language: "en-US"
    }
});

export default api;
