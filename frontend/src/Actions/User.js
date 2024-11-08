import axios from "axios";

// Set the base URL for all axios requests
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://circle-up-backend.vercel.app/api/v1";

// Retrieve the token from localStorage and set the Authorization header
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Use interceptors to attach token to all requests
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Actions

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LoginRequest" });

    const { data } = await axios.post("/login", { email, password }, {
      headers: { "Content-Type": "application/json" }
    });

    // Store the token in localStorage
    localStorage.setItem('token', data.token);

    // Set the token in axios default headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

    dispatch({ type: "LoginSuccess", payload: data.user });
  } catch (error) {
    console.error('Login error:', error.response); // Debug log
    dispatch({ type: "LoginFailure", payload: error.response.data.message });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    const { data } = await axios.get("/me");

    dispatch({ type: "LoadUserSuccess", payload: data.user });
  } catch (error) {
    console.error('Load user error:', error.response); // Debug log
    dispatch({ type: "LoadUserFailure", payload: error.response.data.message });
  }
};

export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({ type: "PostOfFollowingRequest" });

    const { data } = await axios.get("/posts");

    dispatch({ type: "PostOfFollowingSuccess", payload: data.posts });
  } catch (error) {
    dispatch({ type: "PostOfFollowingFailure", payload: error.message || "An error occurred" });
  }
};

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({ type: "myPostsRequest" });

    const { data } = await axios.get("/my/posts");

    dispatch({ type: "myPostsSuccess", payload: data.posts });
  } catch (error) {
    dispatch({ type: "myPostsFailure", payload: error.message || "An error occurred" });
  }
};

export const getAllUsers = (name = "") => async (dispatch) => {
  try {
    dispatch({ type: "allUsersRequest" });

    const { data } = await axios.get(`/users?name=${name}`);

    dispatch({ type: "allUsersSuccess", payload: data.users });
  } catch (error) {
    dispatch({ type: "allUsersFailure", payload: error.message || "An error occurred" });
  }
};

export const logOutUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LogoutUserRequest" });

    await axios.get("/logout");

    dispatch({ type: "LogOutUserSuccess" });
  } catch (error) {
    dispatch({ type: "LogOutUserFailure", payload: error.message || "An error occurred" });
  }
};

export const registerUser = (name, email, password, avatar) => async (dispatch) => {
  try {
    dispatch({ type: "RegisterRequest" });

    const { data } = await axios.post("/register", { name, email, password, avatar }, {
      headers: { "Content-Type": "application/json" }
    });

    dispatch({ type: "RegisterSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "RegisterFailure", payload: error.response.data.message });
  }
};

export const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileRequest" });

    const { data } = await axios.put("/update/profile", { name, email, avatar }, {
      headers: { "Content-Type": "application/json" }
    });

    dispatch({ type: "updateProfileSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "updateProfileFailure", payload: error.response.data.message });
  }
};

export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: "updatePasswordRequest" });

    const { data } = await axios.put("/update/password", { oldPassword, newPassword }, {
      headers: { "Content-Type": "application/json" }
    });

    dispatch({ type: "updatePasswordSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "updatePasswordFailure", payload: error.response.data.message });
  }
};

export const deleteMyProfile = () => async (dispatch) => {
  try {
    dispatch({ type: "deleteProfileRequest" });

    const { data } = await axios.delete("/delete/me");

    dispatch({ type: "deleteProfileSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "deleteProfileFailure", payload: error.response.data.message });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgotPasswordRequest",
    });

    const { data } = await axios.post(
      "/forgot/password",
      { email },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch({
      type: "forgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgotPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = ({ otp, newPassword }) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPasswordRequest",
    });

    const { data } = await axios.put(
      "/reset/password",
      { otp, newPassword },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch({
      type: "resetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch({ type: "userPostsRequest" });

    const { data } = await axios.get(`/userposts/${id}`);

    dispatch({ type: "userPostsSuccess", payload: data.posts });
  } catch (error) {
    dispatch({ type: "userPostsFailure", payload: error.message || "An error occurred" });
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({ type: "userProfileRequest" });

    const { data } = await axios.get(`/user/${id}`);
    dispatch({ type: "userProfileSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "userProfileFailure", payload: error.message });
  }
};

export const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "followUserRequest" });

    const { data } = await axios.get(`/follow/${id}`);
    dispatch({ type: "followUserSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "followUserFailure", payload: error.response.data.message });
  }
};
