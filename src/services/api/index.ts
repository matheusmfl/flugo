import { Collaborator } from "./collaborators"
import { FirebaseEndpoint } from "./firebaseAdapter"


const api = {
  ...new FirebaseEndpoint(""),
  Collaborator,
}

export default api
