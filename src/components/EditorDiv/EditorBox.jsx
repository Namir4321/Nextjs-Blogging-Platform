"use client";
import EditorJS from "@editorjs/editorjs";
import { TOOLS } from "@/utils/EditorTools";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateContent } from "@/redux/Blogslice";
import { updateContentEdit } from "@/redux/Updateslice";
const EditorBox = ({ defaultValue, id, readOnly, edit }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  console.log(edit);

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: id,
        placeholder: "Let's write an awesome story!....",
        data: defaultValue || {},
        tools: TOOLS,
        readOnly: readOnly || false,
        async onChange(api, event) {
          const content = await api.saver.save();
          const safeContent = JSON.parse(JSON.stringify(content));
          if (edit) {
            console.log(edit)
            dispatch(updateContentEdit(safeContent));
          } else {
            dispatch(updateContent(safeContent));
          }
        },
      });
      ref.current = editor;
    }
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
        ref.current = null;
      }
    };
  }, []);

  return (
    <>
      <div id={id} className="w-full"></div>
    </>
  );
};

export default EditorBox;
