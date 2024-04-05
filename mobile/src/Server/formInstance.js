import axios from 'axios';

const instance = axios.create({
  baseURL: "http://192.168.1.5:3333",
  headers: {'Content-Type': 'multipart/form-data'}

});
export default instance;