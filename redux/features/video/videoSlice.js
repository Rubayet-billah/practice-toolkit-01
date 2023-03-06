const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: fetch } = require("node-fetch");

// initialstate
const initialState = {
  isLoading: false,
  video: {},
  relatedVideos: [],
  error: "",
};

const getLoppedString = (arr) => arr.map((tag) => `tags_like=${tag}`).join("&");

// create async thunk

const fetchRelatedVideos = createAsyncThunk(
  "video/fetchRelatedVideos",
  async (url) => {
    const res = await fetch(url);
    const videos = await res.json();
    const sortedVideos = videos.sort(
      (a, b) => parseFloat(a.views) - parseFloat(b.views)
    );
    return sortedVideos;
  }
);

const fetchVideos = createAsyncThunk(
  "video/fetchVideos",
  async (a, thunkAPI) => {
    try {
      const firstUrl = "http://localhost:9000/videos";
      const res = await fetch(firstUrl);
      const video = await res.json();
      const { tags } = video;

      const secondUrl = `${firstUrl}?${getLoppedString(tags)}`;
      thunkAPI.dispatch(fetchRelatedVideos(secondUrl));
      return video;
    } catch (error) {
      console.log(error);
    }
  }
);

// create slice
const videoSlice = createSlice({
  name: "video",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVideos.pending, (state, action) => {
      state.isLoading = true;
      state.video = {};
      state.relatedVideos = [];
      state.error = "";
    });
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.video = action.payload;
      state.relatedVideos = [];
      state.error = "";
    });
    builder.addCase(fetchVideos.rejected, (state, action) => {
      state.isLoading = false;
      state.video = {};
      state.relatedVideos = [];
      state.error = action.error.message;
    });
    builder.addCase(fetchRelatedVideos.pending, (state, action) => {
      state.isLoading = true;
      state.video = {};
      state.relatedVideos = [];
      state.error = "";
    });
    builder.addCase(fetchRelatedVideos.fulfilled, (state, action) => {
      state.isLoading = true;
      state.relatedVideos = action.payload;
      state.error = "";
    });
    builder.addCase(fetchRelatedVideos.rejected, (state, action) => {
      state.isLoading = true;
      state.video = {};
      state.relatedVideos = [];
      state.error = action.error.message;
    });
  },
});

module.exports = videoSlice.reducer;
module.exports.fetchVideos = fetchVideos;
