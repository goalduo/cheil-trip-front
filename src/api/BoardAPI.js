import { RestServerAxios, fileAxios } from "../util/http-commons";
const local = RestServerAxios();
const axios = fileAxios();

function listArticle(param, success, fail) {
    local.get(`/board`, { params: param }).then(success).catch(fail);
  }
  
function listArticleByUserId(param, userId, success, fail) {
  local.get(`/board/user/${userId}`, {params: param}).then(success).catch(fail);
}
  function detailArticle(articleno, success, fail) {
    local.get(`/board/${articleno}`).then(success).catch(fail);
  }
  
  function registArticle(article, success, fail) {
    console.log("boardjs article", article);
    local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
    local.post(`/board`, JSON.stringify(article)).then(success).catch(fail);
  }
  
  function getModifyArticle(articleno, success, fail) {
    local.get(`/board/modify/${articleno}`).then(success).catch(fail);
  }
  
  function modifyArticle(article, success, fail) {
    local.put(`/board`, JSON.stringify(article)).then(success).catch(fail);
  }
  
  function deleteArticle(articleno, success, fail) {
    local.delete(`/board/${articleno}`).then(success).catch(fail);
  }
  
function uploadImage(formData, success, fail) {
  axios.post(`/board/image-upload`, formData).then(success).catch(fail);
}
  
function getArticleCountByUserId(userId) {
  return axios.get(`/board/user/${userId}/count`).then((response) => response.data)
}

  export {
    listArticle,
    detailArticle,
    registArticle,
    getModifyArticle,
    modifyArticle,
    deleteArticle,
  uploadImage,
  listArticleByUserId,
  getArticleCountByUserId
  };