const { createSlice, } = require("@reduxjs/toolkit");
const initialState = {
  title: "",
  banner: "",
  content: [],
  Tag: [],
  description: "",
};
const updateSlice = createSlice({
  name: "blogupdate",
  initialState,
  reducers: {
    addblogUpdateEdit: (state, action) => {
      console.log(action.payload);
      const { title, banner, content, Tag, description } = action.payload;
      state.title = title;
      state.banner = banner;
      state.content = content;
      state.Tag = Tag;
      state.description = description;
    },
    updateContentEdit: (state, action) => {
      state.content = action.payload;
    },
    updateBlogTitleEdit: (state, action) => {
      state.title = action.payload;
    },
    updateBlogDescEdit: (state, action) => {
      state.description = action.payload;
    },
    addTagEdit: (state, action) => {
      if (!state.Tag.includes(action.payload)) {
        state.Tag.push(action.payload);
      }
    },
    removeTagEdit: (state, action) => {
      state.Tag = state.Tag.filter((Tag) => Tag !== action.payload);
    },
    updateTagEdit: (state, action) => {
      const { oldTag, newTag } = action.payload;
      const tagIndex = state.Tag.findIndex((Tag) => Tag === oldTag);
      if (tagIndex !== -1) {
        state.Tag[tagIndex] = newTag;
      }
    },
    updateBannerEdit: (state, action) => {
      state.banner = action.payload;
    },
    resetStateEdit: () => {
      return initialState;
    },
  },
});
export const {
  resetStateEdit,
  addblogUpdateEdit,
  updateBannerEdit,
  updateContentEdit,
  updateBlogTitleEdit,
  updateBlogDescEdit,
  addTagEdit,
  removeTagEdit,
  updateTagEdit,
} = updateSlice.actions;

export default updateSlice.reducer;
