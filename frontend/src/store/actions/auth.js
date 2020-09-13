import axiosInstance from "../../components/auth/AuthServices";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (username, access_token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    username: username,
    access_token: access_token
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const authLogout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("access_token");
  localStorage.removeItem("expirationDate");
  axiosInstance.defaults.headers['Authorization'] = null;
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = expirationTime => {
  return dispath => {
    setTimeout( () => {
      dispath(authLogout());
    }, expirationTime * 1000)
  }
}

export const authLogin = (username, password) => {
  return dispath => {
    dispath(authStart());
    axiosInstance.post("/token/", {
      username: username,
      password: password
    })
    .then( res => {
      axiosInstance.defaults.headers['Authorization'] = "Bearer " + res.data.access;
      const access_token = res.data.access;
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000); // add 1 hour
      localStorage.setItem("username", username);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expirationDate", expirationDate);
      dispath(authSuccess(username, access_token));
      dispath(checkAuthTimeout(3600));
    })
    .catch( err => {
      dispath(authFail(err))
    })
  }
}

export const authSignup = (username, email, password1, password2) => {
  return dispath => {
    dispath(authStart());
    axiosInstance.post("/registration/", {
      username: username,
      email: email,
      password1: password1,
      password2: password2
    })
    .then( res => {
      const access_token = res.data.access;
      const expirationDate = new Date(new Date().getTime() * 3600 * 1000); // add 1 hour
      localStorage.setItem("username", username);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("expirationDate", expirationDate);
      dispath(authSuccess(username, access_token));
      dispath(checkAuthTimeout(3600));
    })
    .catch( err => {
      dispath(authFail(err))
    })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const username = localStorage.getItem("username");
    const access_token = localStorage.getItem("access_token");
    if (access_token === undefined) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"))
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        dispatch(authSuccess(username, access_token));
        dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
      }
    }
  }
}
