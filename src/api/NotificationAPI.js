import { RestServerAxios } from "@/util/http-commons";
import { httpStatusCode } from "@/util/http-status";
const local = RestServerAxios();

function getNotificationByUserId(userId) {
    return local.get(`/notification/user?userId=${userId}`).then((response => response.data));
  }

export { getNotificationByUserId };
