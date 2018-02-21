import axios from "axios";
import { API_BASE_URL } from '../types';
import {getStorage} from "../util/storage";

export const jsonClient = (responseType='json') => {
    return {
        _client: axios.create({
                                  responseType,
                                  baseURL: API_BASE_URL,
                                  "routes": {
                                      "cors": true
                                  },
                                  headers: {
                                      'Authorization': `Token ${getStorage()}`,
                                      'Content-Type': 'application/json',
                                  }
                              }),

        _handleError: function(error) {
            console.error(error.response);
            if (error.response && error.response.data) {
                throw new Error(error.response.data.message);
            } else {
                throw error;
            }
        },

        get: function(url) {
            return this._client.get(url).catch(this._handleError);
        },

        post: function(url, data) {
            return this._client.post(url, data).catch(this._handleError);
        }
    }
};

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
