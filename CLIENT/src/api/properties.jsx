import axios from "~/axios.jsx";

export const apiGetProperties = (params) => axios({
    url: "/properties",
    method: "get",
    params
})
