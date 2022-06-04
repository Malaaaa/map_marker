import axios from "axios";

export const client = axios.create({
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

