"use client";
import EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import { UploadImage, UploadImageByUrl } from "@/utils/supabase";
import { imageSchema, validateWithZodSchema } from "@/utils/FormValidation";
const EditorBox = () => {
  const UploadImageByLink = async (image) => {
    try {
      const url = await UploadImageByUrl(image);
      return {
        success: 1,
        file: { url },
      };
    } catch (err) {
      return { success: 0, message: err.message };
    }
  };
  const UploadImageByFile = async (image) => {
    const validateFields = await validateWithZodSchema(imageSchema, { image });
    try {
      const url = await UploadImage(validateFields.image);
      return {
        success: 1,
        file: { url },
      };
    } catch (err) {
      console.error("Error uploading image by file:", err.message);
      return { success: 0, message: err.message };
    }
  };
  const TOOLS = {
    embed: Embed,
    table: Table,
    marker: Marker,
    list: List,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    image: {
      class: Image,
      config: {
        uploader: {
          uploadByUrl: UploadImageByLink,
          uploadByFile: UploadImageByFile,
        },
      },
    },
    raw: Raw,
    header: {
      class: Header,
      inlineToolbar: true,
      config: {
        placeholder: "Type something....",
        levels: [1, 2, 3, 4, 5, 6],
        defaultLevel: 2,
      },
    },
    quote: Quote,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage,
  };

  const editor = new EditorJS({
    holder: "editorjs",
    tools: TOOLS,
    data: "",
    placeholder: "let's write an awesome story",
  });
  return (
    <>
      <div id="editorjs" className=""></div>
    </>
  );
};

export default EditorBox;
