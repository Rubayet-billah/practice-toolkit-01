const { configureStore } = require("@reduxjs/toolkit");
const counterReducer = require("../redux/features/counter/counterSlice");

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

module.exports = store;
