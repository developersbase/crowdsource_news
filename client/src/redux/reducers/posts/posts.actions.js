import axios from "axios";
import {
  GET_POSTS,
  POST_ERROR,
  GET_POST,
  ADD_POST,
  ADD_COMMENT,
  ADD_REPLY,
} from "./posts.types";
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

//Add Post
export const addPost = ({ title, body }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const content = JSON.stringify({ title, body });
  console.log(content);
  try {
    const res = await axios.post(`/api/posts/new`, content, config, {
      withCredentials: true,
    });

    console.log(res.data);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert("Post Successfully Posted", "success", "check-circle"));
    dispatch(getPosts());
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
      { withCredentials: true },
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(
      setAlert("Comment Successfully Posted", "success", "check-circle")
    );

    dispatch(getPost(postId));
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

//Add Reply
export const addReply = (postId, commentId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log(formData);
    const res = await axios.put(
      `/api/posts/${postId}/comments/${commentId}/replies/new`,
      formData,
      { withCredentials: true },
      config
    );
    console.log(res.data);

    dispatch({
      type: ADD_REPLY,
      payload: res.data,
    });

    dispatch(setAlert("Reply Successfully Posted", "success", "check-circle"));

    dispatch(getPost(postId));
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
