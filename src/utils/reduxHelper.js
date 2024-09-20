"use client";
import {
  updateBlogDesc,
  updateBlogTitle,
  addTag,
  removeTag,
  updateTag,
  updateBanner,
  resetState,
} from "@/redux/Blogslice";
import {
  handleTitleChangeEdit,
  resetStateEdit,
  addblogUpdateEdit,
  updateBannerEdit,
  updateContentEdit,
  updateBlogTitleEdit,
  updateBlogDescEdit,
  addTagEdit,
  removeTagEdit,
  updateTagEdit,
} from "@/redux/Updateslice";
export const handleTitleChange = (e, dispatch) => {
  console.log(e.target.value);
  dispatch(updateBlogTitle(e.target.value));
};
export const UpdatehandleTitleChange = (e, dispatch) => {
  console.log(e.target.value);
  dispatch(updateBlogTitleEdit(e.target.value));
};
export const handleDescChange = (e, dispatch) => {
  dispatch(updateBlogDesc(e.target.value));
};
export const handleDescChangeEdit = (e, dispatch) => {
  dispatch(updateBlogDescEdit(e.target.value));
};
export const handleAddTagEdit = (tag, dispatch) => {
  if (tag.trim()) {
    dispatch(addTagEdit(tag));
  }
};
export const handleAddTag = (tag, dispatch) => {
  if (tag.trim()) {
    dispatch(addTag(tag));
  }
};

export const BlogData = () => {
  // const BlogData=useSelector((state)=>state.blogReducer)
  // console.log(BlogData)
};
export const handleRemoveTag = (tagToRemove, dispatch) => {
  dispatch(removeTag(tagToRemove));
};
export const handleRemoveTagEdit = (tagToRemove, dispatch) => {
  dispatch(removeTagEdit(tagToRemove));
};
export const handleEditTagEdit = (oldTag, newTag, dispatch) => {
  dispatch(updateTagEdit({ oldTag, newTag }));
};
export const handleEditTag = (oldTag, newTag, dispatch) => {
  dispatch(updateTag({ oldTag, newTag }));
};

export const handleUpdateBanner = (banner, dispatch) => {
  dispatch(updateBanner(banner));
};
export const handleUpdateBannerEdit = (banner, dispatch) => {
  dispatch(updateBannerEdit(banner));
};
export const handleReset = (dispatch) => {
  dispatch(resetStateEdit());
};
export const handleResetEdit = (dispatch) => {
  dispatch(resetState());
};

export const handleBlogData=(blog,dispatch)=>{
  dispatch(addblogUpdateEdit(blog));
}