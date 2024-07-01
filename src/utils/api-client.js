import axios from "axios";
import config from '../config.json';

//백엔드 기본주소를 axios 객체에 설정
export default axios.create({
  baseURL: `${config.backendURL}/api`
});