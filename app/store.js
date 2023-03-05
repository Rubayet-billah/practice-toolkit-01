const { configureStore, getDefaultMiddleware } = require("@reduxjs/toolkit");
const counterReducer = require("../redux/features/counter/counterSlice");
const userSlice = require("../redux/features/users/userSlice");
const videoSlice = require("../redux/features/video/videoSlice");
const { createLogger } = require("redux-logger");

const logger = createLogger();

const store = configureStore({
  reducer: {
    // counter: counterReducer,
    // user: userSlice,
    video: videoSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;
