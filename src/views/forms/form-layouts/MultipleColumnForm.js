// ** Reactstrap Imports
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Card, CardBody, Row, Col, Label, Button } from "reactstrap";

// ** APIs Imports
import { UpdateNewsApi } from "./../../../core/Services/api/News/UpdateNews/index";
import instance from "../../../core/interseptor/Interseptor";

import * as yup from "yup";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const MultipleColumnForm = ({ blogId, onSuccess }) => {
  const [initialData, setInitialData] = useState(null);
  const [basicModal, setBasicModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // ** Edit News
  const { mutateAsync: UpdateNews } = useMutation({
    mutationFn: UpdateNewsApi,
  });

 
  useEffect(() => {
    if (blogId) {
      instance.get(`/News/${blogId}`).then((res) => {
        setInitialData(res.data);
      });
    }
  }, [blogId]);

  // Form Validation
  const validationSchema = yup.object({
    GoogleDescribe: yup
      .string()
      .min(70, "توضیحات گوگل نمیتواند کمتر 70 کاراکتر باشد")
      .max(150, "توضیحات گوگل نمیتواند بیشتر از 150 کاراکتر باشد")
      .required("پرکردن این فیلد ضروری است"),
    Keyword: yup
      .string()
      .min(10, "کلمات کلیدی نمیتواند کمتر از 10 کاراکتر باشد")
      .max(300, "کلمات کلیدی نمیتواند بیشتر از 300 کاراکتر باشد")
      .required("پرکردن این فیلد ضروری است"),
    Describe: yup.string().required("پرکردن این فیلد ضروری است"),
    MiniDescribe: yup.string().required("پرکردن این فیلد ضروری است"),
    GoogleTitle: yup.string().required("پرکردن این فیلد ضروری است"),
    Title: yup.string().required("پرکردن این فیلد ضروری است"),
  });

  const { mutateAsync } = useMutation({
    mutationFn: UpdateNewsApi,
    onError: () => {
      toast.error("عملیات با خطا مواجه شد");
      setBasicModal(!basicModal);
    },
  }); 

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("id", blogId);
    formData.append("title", values.title);
    formData.append("googleTitle", values.googleTitle);
    formData.append("describe", values.describe);
    formData.append("miniDescribe", values.miniDescribe);
    formData.append("googleDescribe", values.googleDescribe);
    formData.append("keyword", values.keyword);
    // formData.append("Image", selectedFile);

    await mutateAsync(formData);
  };
  return (
    <Card>
      <CardBody>
        <Formik
          enableReinitialize
          initialValues={{
            Title: initialData?.detailsNewsDto?.title || "",
            GoogleTitle: initialData?.detailsNewsDto?.googleTitle || "",
            Keyword: initialData?.detailsNewsDto?.keyword || "",
            MiniDescribe: initialData?.detailsNewsDto?.miniDescribe || "",
            Describe: initialData?.detailsNewsDto?.describe || "",
            GoogleDescribe: initialData?.detailsNewsDto?.googleDescribe || "",
            // Image: initialData?.Image || "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="Title">
                  عنوان
                </Label>
                <Field
                  className="input-group-merge mb-1 input-group"
                  type="text"
                  name="Title"
                  id="Title"
                  placeholder="عنوان را وارد کنید"
                />
                <ErrorMessage
                  name="Title"
                  className="text-danger"
                  component={"span"}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="GoogleTitle">
                  عنوان گوگل
                </Label>
                <Field
                  className="input-group-merge mb-1 input-group"
                  type="text"
                  name="GoogleTitle"
                  id="GoogleTitle"
                  placeholder="عنوان گوگل را وارد کنید"
                />
                <ErrorMessage
                  name="GoogleTitle"
                  className="text-danger"
                  component={"span"}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="Keyword">
                  کلمات کلیدی
                </Label>
                <Field
                  className="input-group-merge mb-1 input-group"
                  type="text"
                  name="Keyword"
                  id="Keyword"
                  placeholder="کلمات کلیدی را وارد کنید ..."
                />
                <ErrorMessage
                  name="Keyword"
                  className="text-danger"
                  component={"span"}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="MiniDescribe">
                  توضیحات کوتاه
                </Label>
                <Field
                  className="input-group-merge mb-1 input-group"
                  type="text"
                  name="MiniDescribe"
                  id="MiniDescribe"
                  placeholder="توضیحات کوتاه را وارد کنید ..."
                />
                <ErrorMessage
                  name="MiniDescribe"
                  className="text-danger"
                  component={"span"}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="Describe">
                  توضیحات
                </Label>
                <Field
                  className="input-group-merge mb-1 input-group"
                  type="text"
                  name="Describe"
                  id="Describe"
                  placeholder="توضیحات را وارد کنید ..."
                />
                <ErrorMessage
                  name="Describe"
                  className="text-danger"
                  component={"span"}
                />
              </Col>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="GoogleDescribe">
                  توضیحات گوگل
                </Label>
                <Field
                  className="input-group-merge mb-1 input-group"
                  type="text"
                  name="GoogleDescribe"
                  id="GoogleDescribe"
                  placeholder="توضیحات گوگل را وارد کنید ..."
                />
                <ErrorMessage
                  name="GoogleDescribe"
                  className="text-danger"
                  component={"span"}
                />
              </Col>
            </Row>
            <Button
              color="primary"
              onClick={() => {
                // handleEdit(item.id);
                setBasicModal(!basicModal);
              }}
              type="submit"
            >
              ثبت تغییرات
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
};
export default MultipleColumnForm;
