'use client'
import {
  updateBlogDesc,
  updateBlogTitle,
  addTag,
  removeTag,
  updateTag,
  updateBanner,
  resetState,
} from "@/redux/Blogslice";

export const handleTitleChange = (e, dispatch) => {
  console.log(e.target.value)
  dispatch(updateBlogTitle(e.target.value));
};
export const handleDescChange = (e, dispatch) => {
  dispatch(updateBlogDesc(e.target.value));
};
export const handleAddTag = (tag, dispatch) => {
  
  if (tag.trim()) {
    dispatch(addTag(tag));
  }
};
export const BlogData=()=>{
  // const BlogData=useSelector((state)=>state.blogReducer)
  // console.log(BlogData)
}
export const handleRemoveTag = (tagToRemove, dispatch) => {
 
  dispatch(removeTag(tagToRemove));
};
export const handleEditTag=(oldTag,newTag,dispatch)=>{
 dispatch(updateTag({ oldTag, newTag }));
}
export const handleUpdateBanner=(banner,dispatch)=>{
  dispatch(updateBanner(banner));
}
export const handleReset=(dispatch)=>{
  dispatch(resetState());
}