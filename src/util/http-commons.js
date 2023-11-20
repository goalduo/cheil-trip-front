import axios from "axios";

const { VITE_VUE_ATTRACTION_URL, VITE_VUE_API_URL } = import.meta.env;

function AttractionAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_ATTRACTION_URL,
    params: {
      "serviceKey": "9VoECIoZUsw/ZqVw5mHTphOZt6lezsg08OeiQLyYMlvltAOZPj2aaJXMhvPsguElvdiSSsO4PT5IrfsI35YvNg==",
      "MobileOS": "ETC",
      "MobileApp": "CHEILTRIP",
      "_type": "json",
      "numOfRows": 20,
      "pageNo": 1
    },headers: {
      "Content-Type": "application/json;charset=utf-8",
    }
  });
  return instance;
}

// local vue api axios instance
function RestServerAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    withCredentials: true
  });
  return instance;
}

function fileAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  });
  return instance;
}

export { RestServerAxios, AttractionAxios, fileAxios };
