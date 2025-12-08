import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";

export const EditorComponent = ({ value, onChange }) => {
  const ejInstance = useRef(null);
  const editorContainer = useRef(null);

  const defaultData = {
    time: new Date().getTime(),
    blocks: [],
    version: "2.22.2",
  };

  useEffect(() => {
    if (!ejInstance.current) {
      const sanitizedData = value && value.blocks ? value : defaultData;

      ejInstance.current = new EditorJS({
        holder: editorContainer.current,
        tools: {
          header: Header,
          list: List,
          paragraph: { class: Paragraph, inlineToolbar: true },
        },
        data: sanitizedData,
        onChange: async () => {
          const content = await ejInstance.current.save();
          onChange(content);
        },
      });
    }

    return () => {
      if (ejInstance.current?.destroy) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={editorContainer}
      style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10 }}
    ></div>
  );
};
