"use client";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
const EditorBox = dynamic(() => import("@/components/EditorDiv/EditorBox"), {
  ssr: false,
});
const EditorRedux = ({ id, data, readOnly, edit, iseditMode }) => {
  const createValue = useSelector((state) => state.blogReducer.content);
  const updateValue = useSelector((state) => state.updateReducer.content);
  const contentValue = iseditMode ? updateValue : createValue ? createValue : "";
  return (
    <div className="container w-full mx-auto ">
      <EditorBox
        defaultValue={data||contentValue}
        id={id}
        readOnly={readOnly}
        edit={edit}
      />
    </div>
  );
};

export default EditorRedux;
