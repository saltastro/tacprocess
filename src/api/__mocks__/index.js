export const jsonClient = () => {
  return {post: (url, data) => {
      //return this._client.post(url, data).catch(this._handleError);
      return new Promise((resolve, reject) => {
        resolve(url, data);
        reject("Error submiting");
      });
  }}
};
