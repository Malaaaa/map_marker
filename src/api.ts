import axios from "axios";

export const client = axios.create({
    baseURL: import.meta.env.VITE_BING_MAPS_API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});