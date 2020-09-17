import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  ADD_COMMENT,
  ADD_REPLY,
} from "./posts.types";

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };

    case ADD_COMMENT:
      return {
        ...state,
        post: { comments: payload, ...state.post },
        loading: false,
      };

    case ADD_REPLY:
      return {
        ...state,
        post: { comments: payload, ...state.post },
        loading: false,
      };

    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
