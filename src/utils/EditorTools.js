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
import { imageSchema, validateWithZodSchema } from "./FormValidation";
import { Caption } from "react-day-picker";
export default class CustomEditorJSEmbed extends Embed {
  render() {
    this.element = Embed.prototype.render.call(this);

    if (this.readOnly && !this.data.caption) {
      this.element.removeChild(this.element.lastChild);
    }

    return this.element;
  }
}
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
      const validateFields = await validateWithZodSchema(imageSchema, {
        image,
      });
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
export const TOOLS = {
  embed: {
    class: CustomEditorJSEmbed, // Use the custom embed class
    config: {
      services: {
        // Specify your supported embed services, e.g. YouTube, Instagram, etc.
        youtube: true,
        instagram: true,
      },
    },
  },
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
    caption: false,
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
