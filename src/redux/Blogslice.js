import { act } from "react";
import { nan } from "zod";

const { createSlice, nanoid } = require("@reduxjs/toolkit");
const initialState = {
  title: "",
  banner: "",
  content: [],
  Tag: [],
  description: "",
};
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addblog: (state, action) => {
      const { title, banner, content, Tag, description } = action.payload;
      state.title = title;
      state.banner = banner;
      state.content = content;
      state.Tag = Tag;
      state.description = description;
    },
    updateContent: (state, action) => {
      state.content = action.payload;
    },
    updateBlogTitle: (state, action) => {
      state.title = action.payload;
    },
    updateBlogDesc: (state, action) => {
      state.description = action.payload;
    },
    addTag: (state, action) => {
      if (!state.Tag.includes(action.payload)) {
        state.Tag.push(action.payload);
      }
    },
    removeTag: (state, action) => {
      state.Tag = state.Tag.filter((Tag) => Tag !== action.payload);
    },
    updateTag: (state, action) => {
      const { oldTag, newTag } = action.payload;
      const tagIndex = state.Tag.findIndex((Tag) => Tag === oldTag);
      if (tagIndex !== -1) {
        state.Tag[tagIndex] = newTag;
      }
    },
    updateBanner: (state, action) => {
      state.banner = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
});
export const {
  resetState,
  addBlog,
  updateBanner,
  updateContent,
  updateBlogTitle,
  updateBlogDesc,
  addTag,
  removeTag,
  updateTag,
} = blogSlice.actions;

export default blogSlice.reducer;
