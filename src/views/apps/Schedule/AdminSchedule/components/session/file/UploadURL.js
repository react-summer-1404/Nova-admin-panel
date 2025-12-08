import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Formik, Form } from "formik";
import React from "react";
import { Button, Label } from "reactstrap";
import { addSessionFileWithUrl } from "../../../../../../../core/Services/api/session/Session";
import toast from "react-hot-toast";
import * as yup from "yup";

const UploadURL = ({ ScheduleId }) => {
  const validation = yup.object().shape({
    Url: yup.string().required(" این فیلد الزامی است"),
  });
  const addUrlMutation = useMutation({
    mutationFn: (values) => addSessionFileWithUrl(values),
    onSuccess: () => {
      toast.success("فایل اپلود شد");
    },
    onError: (error) => {
      const msg = error?.response?.data?.message;
      toast.error(msg);
      console.log("error====>", error);
    },
  });
  return (
    <div>
      <Formik
        initialValues={{
          SessionId: ScheduleId,
          Url: "",
        }}
        onSubmit={(values) => {
          addUrlMutation.mutate(values);
          console.log("sent", values);
        }}
        validationSchema={validation}
      >
        {({ handleSubmit }) => (
          <Form>
            <Label className="form-label mt-1">ادرس فایل</Label>
            <Field
              name="Url"
              className="form-control mb-1"
              placeholder="ادرس فایل"
            />
            <ErrorMessage
              name="Url"
              component="div"
              className="text-danger mt-25 mb-1"
            />

            {/* <Label className="form-label mt-1">توضیحات تکلیف</Label>
            <Field
              name="hwDescribe"
              className="form-control mb-1"
              placeholder="توضیحات تکلیف"
            />
            <ErrorMessage
              name="hwDescribe"
              component="div"
              className="text-danger mt-25 mb-1"
            /> */}

            <Button color="primary" onClick={handleSubmit}>
              افزودن
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UploadURL;
