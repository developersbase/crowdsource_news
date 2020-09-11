import axios from "axios";
import {
  GET_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  GET_POST,
} from "./posts.types";

//Get Posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts/fetch");
    console.log(res.data);

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Get Post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
