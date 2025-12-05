import React, { useState } from "react";
import { Input, Button } from "reactstrap";
import { useMutation } from "@tanstack/react-query";
import { addSessionFile } from "../../../../../../../core/Services/api/session/Session";
import toast from "react-hot-toast";

const FileUpload = ({ ScheduleId }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const uploadFileMutation = useMutation({
    mutationFn: (formData) => addSessionFile(formData),
  });

  const handleUpload = () => {
    if (!file) {
      toast.error("ابتدا یک فایل انتخاب کنید");
      return;
    }

    const formData = new FormData();
    formData.append("SessionFiles", file);
    formData.append("SessionId", ScheduleId);

    toast.promise(uploadFileMutation.mutateAsync(formData), {
      loading: "در حال آپلود...",
      success: <b>آپلود شد!</b>,
      error: <b>آپلود ناموفق!</b>,
    });
  };

  return (
    <div className="d-flex flex-column gap-2">
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const selectedFile = e.target.files[0];
          setFile(selectedFile);
          setPreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
        }}
        style={{ width: 200, height: 50 }}
      />

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: 300,
          width: "100%",
          border: "2px dotted #7367f0",
          borderRadius: 8,
          padding: 5,
        }}
      >
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="img-fluid rounded"
            style={{ maxHeight: "100%" }}
          />
        )}
      </div>

      <Button color="primary" onClick={handleUpload}></Button>
    </div>
  );
};

export default FileUpload;
