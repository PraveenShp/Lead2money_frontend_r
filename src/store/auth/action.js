import {
  SIDEBAR_TOGGLE,
  LOADING,
  UPDATE_TOKEN,
} from "./actionTypes";

export const sidebarToggle = (updates) => {
  return {
    type: SIDEBAR_TOGGLE,
    updates,
  };
};

export const updateLoading = (updates) => {
  return {
    type: LOADING,
    updates,
  };
};

export const updateToken = (updates) => {
  localStorage.setItem("token", updates.token);
  return {
    type: UPDATE_TOKEN,
    updates,
  };
};
