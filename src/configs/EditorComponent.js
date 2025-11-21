import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import List from '@editorjs/list';
export const EditorComponent = ({ value, onChange }) => {
  const ejInstance = useRef(null);

  useEffect(() => {
    if (!ejInstance.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        data: value,
        tools: {
            list: {
              class: List,
              inlineToolbar: true,
              config: {
                defaultStyle: "unordered"
              }
            }
          },
        onReady: () => {
          ejInstance.current = editor;
        },
        onChange: async () => {
          const content = await editor.saver.save();
          onChange(content); 
        },
      });
    }

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return (
    <div
      id="editorjs"
      style={{ border: "1px solid #ccc", borderRadius: 8, padding: 10 }}
    ></div>
  );
};
