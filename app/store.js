const { configureStore } = require("@reduxjs/toolkit");
const counterReducer = require("../redux/features/counter/counterSlice");
const userSlice = require("../redux/features/users/userSlice");

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice,
  },
});

module.exports = store;
