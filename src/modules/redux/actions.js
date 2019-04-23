export const dispatchTitle = title => ({
  type: "TITLE_CHANGE",
  payload: {
    title
  }
});

export const dispatchAbout = about => ({
  type: "ABOUT_CHANGE",
  payload: {
    about
  }
});

export const enqueueSnackbar = message => ({
  type: "ENQUEUE_SNACKBAR",
  payload: {
    notification: {
      key: new Date().getTime() + Math.random(),
      message
    }
  }
});

export const removeSnackbar = key => ({
  type: "REMOVE_SNACKBAR",
  key
});
