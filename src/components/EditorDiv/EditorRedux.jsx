"use client";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
const EditorBox = dynamic(() => import("@/components/EditorDiv/EditorBox"), {
  ssr: false,
});
const EditorRedux = ({id,data,readOnly}) => {
   const defaultValue = useSelector((state) => state.blogReducer.content);
   return (
     <div className="container w-full mx-auto ">
       <EditorBox
         defaultValue={data || defaultValue}
         id={id}
         readOnly={readOnly}
       />
     </div>
   );
};

export default EditorRedux;
