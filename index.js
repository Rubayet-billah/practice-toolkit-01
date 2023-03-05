const store = require("./app/store");
const { counterActions } = require("./redux/features/counter/counterSlice");
const { getUsers } = require("./redux/features/users/userSlice");

console.log(`initial state ${JSON.stringify(store.getState())}`);
store.subscribe(() => {
  console.log(`final state ${JSON.stringify(store.getState())}`);
});

// store.dispatch(counterActions.increment());
// store.dispatch(counterActions.increment());
// store.dispatch(counterActions.increment());
// store.dispatch(counterActions.increment());
// store.dispatch(counterActions.decrement());

store.dispatch(getUsers());

// console.log(store.getState());
