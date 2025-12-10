import { Fragment, useEffect, useState } from "react";
import { Search } from "react-feather";
import InputPasswordToggle from "@components/input-password-toggle";
import {
  InputGroup,
  Input,
  InputGroupText,
  Card,
  CardBody,
  Row,
  Col,
  Label,
  Button,
} from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { CreateNewsCategoryApi } from "../../../../core/Services/api/News/CreateNewsCategory";

const NewsCategoryManagmentInputGroup = ({
  newsCategoryId,
  setNewsCategoryId,
}) => {
  useEffect(() => {
    if (newsCategoryId) {
      instance.get(`/News/${newsCategoryId}`).then((res) => {
        setInitialData(res.data);
      });
    }
  }, [newsCategoryId]);
  
  const{mutateAsync,data} = useMutation({
    mutationFn:CreateNewsCategoryApi
  })
  console.log(data)

  const validationSchema = yup.object({
    categoryName: yup.string().required("پرکردن این فیلد ضروری است"),
    googleTitle: yup.string().required("پرکردن این فیلد ضروری است"),
    googleDescribe: yup.string().required("پرکردن این فیلد ضروری است"),
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("googleTitle", values.googleTitle);
    formData.append("googleDescribe", values.googleDescribe);
    formData.append("categoryName", values.categoryName)
    await mutateAsync(formData);
    console.log("formData",formData)
  };
  return (
    <Card>
      <CardBody>
        <Formik
          enableReinitialize
          initialValues={{
            categoryName: "",
            googleTitle: "",
            googleDescribe: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="categoryName">
                عنوان دسته بندی
              </Label>
              <Field
                className="input-group-merge mb-1 input-group p-1"
                type="text"
                name="categoryName"
                id="categoryName"
                placeholder="عنوان دسته بندی را وارد کنید"
              />
              <ErrorMessage
                name="categoryName"
                className="text-danger"
                component={"span"}
              />
            </Col>
            <Col md="6" sm="12" className="mb-1 ">
              <Label className="form-label" for="googleTitle">
                عنوان گوگل
              </Label>
              <Field
                className="input-group-merge mb-1 input-group p-1"
                type="text"
                name="googleTitle"
                id="googleTitle"
                placeholder="عنوان گوگل را وارد کنید"
              />
              <ErrorMessage
                name="GoogleTitle"
                className="text-danger"
                component={"span"}
              />
            </Col>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="googleDescribe">
                توضیحات گوگل
              </Label>
              <Field
                className="input-group-merge mb-1 input-group p-2"
                type="text"
                name="googleDescribe"
                id="googleDescribe"
                placeholder="توضیحات گوگل را وارد کنید ..."
              />
              <ErrorMessage
                name="googleDescribe"
                className="text-danger"
                component={"span"}
              />
            </Col>
            <Button
              color="primary"
              type="submit"
            >
              ثبت دسته بندی
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
};

export default NewsCategoryManagmentInputGroup;
