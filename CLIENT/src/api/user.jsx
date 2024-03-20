import axios from "../axios";

export const apiGetCurrentByToken = () => axios({
    url: "/user/current",
    method: "get"
})
