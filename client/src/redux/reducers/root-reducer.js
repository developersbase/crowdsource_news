import { combineReducers } from "redux";

import auth from "./auth/auth.reducer";
import post from "./posts/posts.reducer";
import alert from "./alert/alert.reducer";

export default combineReducers({
  auth,
  post,
  alert,
});
