import { RestServerAxios } from "@/util/http-commons";
import { httpStatusCode } from "@/util/http-status";
const local = RestServerAxios();

async function userRegist(body, success, fail) {
    await local.post(`/user/regist`, body).then(success).catch(fail);
  }

async function userConfirm(param, success, fail) {
  console.log("param", param);
  await local.post(`/user/login`, param).then(success).catch(fail);
  console.log("userConfirm ok");
}

async function findById(userid, success, fail) {
  // local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  await local.get(`/user/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  local.defaults.headers["refreshToken"] = sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await local.post(`/user/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await local.get(`/user/logout/${userid}`).then(success).catch(fail);
}

async function findUserById(userId, callbackFn){
  findById(
    userId,
    (response) => {
      if (response.status === httpStatusCode.OK) {
        const result = {
          userId : response.data.userId,
          userName : response.data.userName
        }
        callbackFn(result)
      } else {
        console.log("유저 정보 없음!!!!");
        callbackFn(null)
      }
    },
    (error) => {
      callbackFn(null);
    }
  )

}

async function getAttractionUserMapping(userId, success, fail) {
  await local.get(`/user/attractionMapping/${userId}`).then(success).catch(fail);
}
async function setAttractionUserMapping(body, success, fail) {
  await local.post(`/user/attractionMapping`, body).then(success).catch(fail);
}
export { userRegist, userConfirm, findById, tokenRegeneration, logout, findUserById, getAttractionUserMapping, setAttractionUserMapping };
