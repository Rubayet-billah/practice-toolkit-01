require("util").inspect.defaultOptions.depth = null;
const store = require("./app/store");
const { counterActions } = require("./redux/features/counter/counterSlice");
const { getUsers } = require("./redux/features/users/userSlice");
const { fetchVideos } = require("./redux/features/video/videoSlice");

// store.subscribe(() => {
//   console.log(`final state ${JSON.stringify(store.getState())}`);
// });

store.dispatch(fetchVideos());
