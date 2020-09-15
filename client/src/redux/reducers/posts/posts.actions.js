import axios from "axios";
import { GET_POSTS, POST_ERROR, GET_POST, ADD_COMMENT } from "./posts.types";
import { setAlert } from "../alert/alert.actions";

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

//Add Comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log(formData);
    const res = await axios.put(
      `/api/posts/${postId}/comments/new`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(
      setAlert("Comment Successfully Posted", "success", "check-circle")
    );
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
