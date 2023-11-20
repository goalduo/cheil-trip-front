import { RestServerAxios } from "../util/http-commons";
const axios = RestServerAxios();

function getTripplansAndTripCoursesByUserId(userId) {
    return axios.get(`/tripplan/user/${userId}`)
        .then((response) => response.data)
}
function getTripPlanAndTripCoursesByPlanId(id) {
    return axios.get(`/tripplan/${id}`)
        .then((response) => response.data)
}

function postTripPlanAndTripCourse(body) {
    axios.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
    return axios.post(`/tripplan`, body)
    .then((response) => console.log(response.data))
}

function getTripplanId() {
    return axios.get(`/tripplan/planId`).then((response) => response.data)
}

function addUserIdAtAttraction(body) {
    return axios.post('/tripplan/user', body).then((response) => response.data)
}
function isUserInAttractionSet(params) {
    return axios.get('/tripplan/check', {params : params}).then((response) => response.data)
}

export {
    getTripplansAndTripCoursesByUserId,
    getTripPlanAndTripCoursesByPlanId,
    postTripPlanAndTripCourse,
    getTripplanId,
    addUserIdAtAttraction,
    isUserInAttractionSet
}