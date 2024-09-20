"use client";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
const EditorBox = dynamic(() => import("@/components/EditorDiv/EditorBox"), {
  ssr: false,
});
const EditorRedux = ({ id, data, readOnly,edit }) => {
  const defaultValue = useSelector((state) => state.blogReducer.content);
  const contentValue = data ? data : defaultValue ? defaultValue : "";
  return (
    <div className="container w-full mx-auto ">
      <EditorBox defaultValue={contentValue} id={id} readOnly={readOnly} edit={edit} />
    </div>
  );
};

export default EditorRedux;
