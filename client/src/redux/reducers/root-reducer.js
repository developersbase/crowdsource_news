import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import auth from "./auth/auth.reducer";
import post from "./posts/posts.reducer";
import alert from "./alert/alert.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth,
  post,
  alert,
});

export default persistReducer(persistConfig, rootReducer);
