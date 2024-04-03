import axios from '~/axios'

export const apiCreateNewPropertyType = (data) => axios({
    url: "/property-types/",
    method: "post",
    data
})

