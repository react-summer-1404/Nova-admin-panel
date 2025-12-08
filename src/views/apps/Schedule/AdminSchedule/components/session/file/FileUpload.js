import React, { useState } from "react";
import { Input, Button } from "reactstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSessionFile } from "../../../../../../../core/Services/api/session/Session";
import toast from "react-hot-toast";

const FileUpload = ({ ScheduleId, apiParams }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState(null);

  const queryClient = useQueryClient();

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
      success: () => {
        queryClient.invalidateQueries(["getSessionDetails", apiParams]);
        return "آپلود با موفقیت انجام شد";
      },
      error: "آپلود ناموفق!",
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    setFileType(selectedFile.type);

    if (selectedFile.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selectedFile));
    } else if (selectedFile.type === "application/pdf") {
      setPreview(selectedFile.name);
    } else if (selectedFile.type.startsWith("video/")) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(selectedFile.name);
    }
  };

  return (
    <div className="d-flex flex-column gap-2">
      <Input
        type="file"
        accept=".pdf,image/*,video/*"
        onChange={handleFileChange}
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
        {preview && fileType?.startsWith("image/") && (
          <img
            src={preview}
            alt="preview"
            className="img-fluid rounded"
            style={{ maxHeight: "100%" }}
          />
        )}

        {preview && fileType === "application/pdf" && (
          <p className="text-center fw-bold text-primary">{preview}</p>
        )}

        {preview && fileType?.startsWith("video/") && (
          <video
            src={preview}
            controls
            style={{ maxHeight: "100%", maxWidth: "100%" }}
          />
        )}
      </div>

      <Button color="primary" onClick={handleUpload}>
        آپلود فایل
      </Button>
    </div>
  );
};

export default FileUpload;
