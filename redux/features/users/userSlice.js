const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

//initialsate
const initialState = {
  isLoading: false,
  users: [],
  error: "",
};

// async thunk function
const getUsers = createAsyncThunk("user/getUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  return users;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.isLoading = true;
      state.users = [];
      state.error = "";
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      console.log("hhuhdsibgwbrugvbb");
      state.isLoading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      console.log("hhuhdsibgwbrugvbb");
      state.isLoading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

module.exports = userSlice.reducer;
module.exports.getUsers = getUsers;
