"use client";
import TextAreaInput from "@/components/form/TextAreaInput";
import { useDispatch } from "react-redux";
import { handleDescChange, handleDescChangeEdit } from "@/utils/reduxHelper";
import { useSelector } from "react-redux";

const DescriptionInput = ({ className, labelText, title, row, iseditMode }) => {
  const dispatch = useDispatch();
  const createValue = useSelector((state) => state.blogReducer.description);
  const updateDescription = useSelector(
    (state) => state.updateReducer.description
  );

  const descriptionValue = iseditMode
    ? updateDescription
    : createValue
    ? createValue
    : "";
  return (
    <div className="rounded mt-3">
      <p>Short Descrption about your blog</p>
      <div className="relative pl-2 py-2 pb-4 dark:bg-muted bg-gray-200 rounded-md">
        <TextAreaInput
          labelText={labelText}
          name={title}
          row={row}
          defaultValue={descriptionValue}
          placeholder="this is a short descrption"
          className={`focus-visible:ring-none outline-none border-none ${className}`}
          onChange={(e) =>
            iseditMode
              ? handleDescChangeEdit(e, dispatch)
              : handleDescChange(e, dispatch)
          }
        />
      </div>
    </div>
  );
};

export default DescriptionInput;
