import axios from "axios";

export default {
  user:{
    login: credentials => axios.post("/token", {credentials}).then(
      response => response.data.user)
  }
}
