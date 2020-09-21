import axios from 'axios'
import { API_BASE_URL, SALT_SERVER_API_URL } from '../types'
import {getToken} from '../util/storage'

export const jsonClient = (responseType='json') => ({
  _client: axios.create({
    responseType,
    baseURL: API_BASE_URL,
    'routes': {
      'cors': true
    },
    headers: {
      'Authorization': `Token ${ getToken() }`,
      'Content-Type': 'application/json',
    }
  }),

  _handleError(error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message)
    } else {
      throw error
    }
  },

  get(url) {
    return this._client.get(url).catch(this._handleError)
  },

  post(url, data) {
    return this._client.post(url, data).catch(this._handleError)
  }
})

export const graphqlClient = () => ({
  _client: axios.create({
    baseURL: API_BASE_URL,
    'routes': {
      'cors': true
    },
    headers: {
      'Authorization': `Token ${ getToken() }`,
      'Content-Type': 'application/json',
    }
  }),

  post(url, data) {
    return this._client.post(url, data)
      .then(res => {
        if (res.data.errors) {
          throw new Error(res.data.errors.map(error => error.message).join(' | '))
        }
        return res
      }).catch(error => {
        if (error.response.status === 401){
          localStorage.removeItem('tacPageJWT')
        }
      })
  }
})

export const saltServerApiClient = () => (
  {
    _client: axios.create({
      baseURL: SALT_SERVER_API_URL,
      'routes': {
        'cors': true
      },
      headers: {
        'Authorization': `Token ${ getToken() }`,
        'Content-Type': 'application/json',
      }
    }),

    post(url, data) {
      return this._client.post(url, data)
      .then(response => {
        if (response.data.errors) {
          throw new Error(response.data.errors.map(error => error.message).join(' | '))
        }
        return response
      }).catch(error => {
          if (error.response.status === 401){
            localStorage.removeItem('tacPageJWT')
          }
        })
    }
  }
)

