import axios from 'axios';

const instance = axios.create({
  baseURL: "http://192.168.1.5:3333",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },

});
export default instance;