// ** React Imports
import { Fragment } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Third Party Components
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";

// ** Api Import
import { CreateNewsApi } from "./../../../../core/Services/api/News/CreateNews/index";

// ** Reactstrap Imports
import { Label, Row, Col, Button } from "reactstrap";

const AddBlogMainInfo = ({ stepper,setFormData }) => {
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
      GoogleTitle: yup.string().required("پرکردن این فیلد ضروری است"),
    });

  const { mutateAsync } = useMutation({
    mutationFn: CreateNewsApi,
  });

 const handleSubmit = async () => {
  const formdata = new FormData();

  Object.entries(formdata).forEach(([key,value])=> { formdata.append(key,value)}) 
    // const formData = new FormData();
    // formData.append("Title", values.Title);
    // formData.append("MiniDescribe", values.MiniDescribe);
    // formData.append("Describe", values.Describe);

    // await mutateAsync(formData);
    await mutateAsync(formdata)
    // stepper.next()
    
    console.log(mutateAsync);
  };
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات اصلی</h5>
        <small className="text-muted">
          عنوان و توضیحات اصلی خبر را وارد کنید.
        </small>
      </div>
      <Formik
        initialValues={{
          GoogleTitle: "",
          GoogleDescribe: "",
          Keyword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Row>
            <Col md="6" className="mb-1 d-flex flex-column">
              <Label className="form-label" for="GoogleTitle">
                عنوان گوگل
              </Label>
              <Field
                type="text"
                className="p-1"
                name="GoogleTitle"
                id="GoogleTitle"
                placeholder="عنوان گوگل را وارد کنید ..."
              />
              <ErrorMessage
                name="GoogleTitle"
                className="text-danger"
                component={"span"}
              />
            </Col>
            <Col md="6" className="mb-1 d-flex flex-column">
              <Label className="form-label" for="GoogleDescribe">
                توضیح گوگل
              </Label>
              <Field
                type="text"
                className="p-1"
                name="GoogleDescribe"
                id="GoogleDescribe"
                placeholder=" توضیحات گوگل را وارد کنید ..."
              />
              <ErrorMessage
                name="GoogleDescribe"
                className="text-danger"
                component={"span"}
              />
            </Col>
          </Row>
          <Row>
            <Col md="6" className="mb-1 d-flex flex-column">
              <Label className="form-label" for="Keyword">
                کلمات کلیدی
              </Label>
              <Field
                type="textarea"
                className="mb-1 p-1"
                name="Keyword"
                id="Keyword"
                rows="3"
                placeholder=" کلمات کلیدی را وارد کنید ..."
              />
              <ErrorMessage
                name="Keyword"
                className="text-danger"
                component={"span"}
              />
            </Col>
          </Row>
          <div className="d-flex justify-content-between">
            <Button color="secondary" className="btn-prev" outline disabled>
              <ArrowLeft
                size={14}
                className="align-middle me-sm-25 me-0"
              ></ArrowLeft>
              <span className="align-middle d-sm-inline-block d-none">
                قبلی
              </span>
            </Button>
            <Button
              type="submit"
              color="primary"
              className="btn-next"
            >
              <span className="align-middle d-sm-inline-block d-none">
                بعدی
              </span>
              <ArrowRight
                size={14}
                className="align-middle ms-sm-25 ms-0"
              ></ArrowRight>
            </Button>
          </div>
        </Form>
      </Formik>
    </Fragment>
  );
};

export default AddBlogMainInfo;
