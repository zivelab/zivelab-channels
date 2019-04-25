import { ACTION_TYPES } from "../constants";

export const changeTheme = (paletteType, paletteColors, direction) => ({
  type: ACTION_TYPES.THEME_CHANGE,
  payload: {
    paletteType,
    paletteColors,
    direction
  }
});

export const changeTitle = title => ({
  type: ACTION_TYPES.TITLE_CHANGE,
  payload: {
    title
  }
});

export const changeAbout = about => ({
  type: ACTION_TYPES.ABOUT_CHANGE,
  payload: {
    about
  }
});

export const enqueueSnackbar = message => ({
  type: ACTION_TYPES.ENQUEUE_SNACKBAR,
  payload: {
    notification: {
      key: new Date().getTime() + Math.random(),
      message
    }
  }
});

export const removeSnackbar = key => ({
  type: ACTION_TYPES.REMOVE_SNACKBAR,
  key
});
