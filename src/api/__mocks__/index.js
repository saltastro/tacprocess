export const jsonClient = () => ({post: (url, data) => 
  // return this._client.post(url, data).catch(this._handleError);
  new Promise((resolve, reject) => {
    resolve(url, data)
    reject('Error submiting')
  })
})
