// client/src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://node:88000', // Set your base URL here
});

export default instance;
