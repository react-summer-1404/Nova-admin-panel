// ** React Imports
import { Fragment, useState } from "react";

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
import { CorrectTextAi } from "../../../../feature/aiAssistant/CorrectTextAi";
import { EditorComponent } from "../../../../configs/EditorComponent";

const AddBlogMainInfo = ({ stepper, setFormData }) => {
  // Form Validation
  const validationSchema = yup.object({
    // Describe: yup.string().required("پرکردن این فیلد ضروری است"),
    MiniDescribe: yup.string().required("پرکردن این فیلد ضروری است"),
    Title: yup
      .string()
      .min(10, "عنوان خبر نمیتواند کمتر 10 کاراکتر باشد")
      .required("پرکردن این فیلد ضروری است"),
  });

  const { mutateAsync } = useMutation({
    mutationFn: CreateNewsApi,
  });

  const handleSubmit = async (values) => {
  // دلیل لینکه این قسمت با بقیه فرق داره اینه که 
  //   باید اینجا مفادیری که با ادیتور جی اس نوشتیم رو جیسون تیدبل میکردیم
  
    const payload = {
      ...values,
      Describe: JSON.stringify(values.Describe),
    };

    setFormData((prev) => ({ ...prev, ...payload }));

    stepper.next();

    await mutateAsync(payload);
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
          Title: "",
          MiniDescribe: "",
          Describe: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Row>
            <Col md="6" className="mb-1 d-flex flex-column">
              <Label className="form-label" for="Title">
                عنوان خبر
              </Label>
              <Field
                type="text"
                className="p-1"
                name="Title"
                id="Title"
                placeholder="عنوان خبر را وارد کنید ..."
              />
              <ErrorMessage
                name="Title"
                className="text-danger"
                component={"span"}
              />
            </Col>
            <Col md="6" className="mb-1 d-flex flex-column">
              <Label className="form-label" for="MiniDescribe">
                خلاصه خبر
              </Label>
              <Field
                type="text"
                className="p-1"
                name="MiniDescribe"
                id="MiniDescribe"
                placeholder="خلاصه خبر را وارد کنید ..."
              />
              <ErrorMessage
                name="MiniDescribe"
                className="text-danger"
                component={"span"}
              />
            </Col>
          </Row>
          <Row>
            <Col md="6" className="mb-1 d-flex flex-column">
              <Label className="form-label" for="Describe">
                توضیحات کامل خبر
              </Label>
              <Field name="Describe">
                {({ field, form }) => (
                  <EditorComponent
                    value={field.value}
                    onChange={(data) => form.setFieldValue("Describe", data)}
                  />
                )}
              </Field>

              {/* <ErrorMessage
                name="Describe"
                className="text-danger"
                component={"span"}
              /> */}
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
              // onClick={() => }
            >
              <span className="align-middle d-sm-inline-block d-none">
                بعدی
              </span>
              <ArrowRight
                size={14}
                className="align-middle ms-sm-25 ms-0"
              ></ArrowRight>
            </Button>
            <CorrectTextAi />
          </div>
        </Form>
      </Formik>
    </Fragment>
  );
};

export default AddBlogMainInfo;
