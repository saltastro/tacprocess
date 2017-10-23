import axios from "axios";

export default {
  user:{
    login: credentials =>
      axios.post("token", { credentials }).then(res => res.data.user)
  }
}
