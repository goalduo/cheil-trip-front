import { RestServerAxios } from "../util/http-commons";
const axios = RestServerAxios();

function getBoardList() {
    return axios.get(`/board/list`)
        .then((response) => response.data)
}


export {
    getBoardList
}