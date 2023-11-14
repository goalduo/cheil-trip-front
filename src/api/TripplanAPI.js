import { RestServerAxios } from "../util/http-commons";
const axios = RestServerAxios();

function getTripplansAndTripCoursesByUserId() {
    return axios.get(`/user/tripplan`)
        .then((response) => response.data)
}
function getTripPlanAndTripCoursesByPlanId(id) {
    return axios.get(`/tripplan/${id}`)
        .then((response) => response.data)
}

export {
    getTripplansAndTripCoursesByUserId,
    getTripPlanAndTripCoursesByPlanId
}