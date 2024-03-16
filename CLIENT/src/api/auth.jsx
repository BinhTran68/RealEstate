import axios from '~/axios'

export const apiRegister = (data) => axios({
    url: "/auth/register",
    method: "post",
    data
})

