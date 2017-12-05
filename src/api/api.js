import axios from "axios";
import { API_BASE_URL } from '../types';

const loginClient = () => axios.create({
  baseURL: API_BASE_URL,
  "routes": {
    "cors": true
  },
  headers: {
    'Authorization': `Token ${localStorage.tacPageJWT}`,
    'Content-Type': 'application/json',
  }
});

export default {
  user: {
    login: credentials =>
      loginClient().post("token", { credentials }).then(res => res.data.user)
  }
}
