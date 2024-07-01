import apiClient from "./api-client"

//axios의 헤더에 토큰 추가
const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete apiClient.defaults.headers.common["x-auth-token"];
  }
}

export default setAuthToken;