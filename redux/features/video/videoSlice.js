const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: fetch } = require("node-fetch");

// initialstate
const initialState = {
  isLoading: false,
  videos: [],
  error: "",
};

const getLoppedString = (arr) => arr.map((tag) => `tags_like=${tag}`).join("&");

// create async thunk
const fetchVideos = createAsyncThunk("video/fetchVideos", async () => {
  const firstUrl = "http://localhost:9000/videos";
  const res = await fetch(firstUrl);
  const video = await res.json();
  const { tags } = video;

  const secondUrl = `${firstUrl}?${getLoppedString(tags)}`;
  const anotherRes = await fetch(secondUrl);
  const videos = await anotherRes.json();
  const sortedVideos = videos.sort(
    (a, b) => parseFloat(a.views) - parseFloat(b.views)
  );
  return sortedVideos;
});

// create slice
const videoSlice = createSlice({
  name: "video",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVideos.pending, (state, action) => {
      state.isLoading = true;
      state.videos = [];
      state.error = "";
    });
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.videos = action.payload;
      state.error = "";
    });
    builder.addCase(fetchVideos.rejected, (state, action) => {
      state.isLoading = false;
      state.videos = [];
      state.error = action.error.message;
    });
  },
});

module.exports = videoSlice.reducer;
module.exports.fetchVideos = fetchVideos;
