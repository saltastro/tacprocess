import axios from "axios";

const token = if (!localStorage.tacPageJWT) ? "" : localStorage.tacPageJWT

export default {
  user:{
    login: (credentials) => axios.post("/token", credentials).then(
      response => response.data.user)
  },
  graphql:{
    query: () => axios.get(
      url: "/graphql",
      params: {"query":$query},
      headers: {'Authorization': `Token ${token}`}
    ).then(
      response => response.data.graphql
    )
  }
}
