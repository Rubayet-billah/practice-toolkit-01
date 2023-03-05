const store = require("./app/store");
const { counterActions } = require("./redux/features/counter/counterSlice");

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(counterActions.increment());
store.dispatch(counterActions.increment());
store.dispatch(counterActions.increment());
store.dispatch(counterActions.decrement());

console.log(store.getState());
