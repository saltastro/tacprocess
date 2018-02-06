import axios from "axios";
import { API_BASE_URL } from '../types';

export const jsonClient = (responseType='json') => axios.create({
    responseType,
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
              jsonClient()
                      .post("token", { credentials })
                      .then(res => res.data.user),

      switchUser: username =>
              jsonClient()
                      .get(`token/${username}`)
                      .then(res => res.data.user)
  }
}
