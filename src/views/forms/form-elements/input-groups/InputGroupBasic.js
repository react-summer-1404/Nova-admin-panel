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
} from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const NewsCategoryManagmentInputGroup = ({
  newsCategoryId,
  setNewsCategoryId,
}) => {
  useEffect(() => {
    // console.log(blogId)
    if (newsCategoryId) {
      instance.get(`/News/${newsCategoryId}`).then((res) => {
        setInitialData(res.data);
      });
    }
  }, [newsCategoryId]);
  
  const validationSchema = yup.object({
    categoryName: yup.string().required("پرکردن این فیلد ضروری است"),
    googleTitle: yup.string().required("پرکردن این فیلد ضروری است"),
    GoogleDescribe: yup.string().required("پرکردن این فیلد ضروری است"),
  });

  const handleSubmit = async (values) => {
    // const formData = new FormData();
    // formData.append("id", blogId);
    // formData.append("title", values.title);
    // formData.append("googleTitle", values.googleTitle);
    // formData.append("describe", values.describe);
    // formData.append("miniDescribe", values.miniDescribe);
    // formData.append("googleDescribe", values.googleDescribe);
    // formData.append("keyword", values.keyword);
    // // formData.append("Image", selectedFile);
    // await mutateAsync(formData);
  };
  return (
    <Card>
      <CardBody>
        <Formik
          enableReinitialize
          initialValues={{
            categoryName:"",
            googleTitle:"",
            GoogleDescribe:"",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <Row>
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="categoryName">
                  عنوان دسته بندی
                </Label>
                <Field
                  className="input-group-merge mb-1 input-group"
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
              <Col md="6" sm="12" className="mb-1">
                <Label className="form-label" for="googleTitle">
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
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
};

export default NewsCategoryManagmentInputGroup;
