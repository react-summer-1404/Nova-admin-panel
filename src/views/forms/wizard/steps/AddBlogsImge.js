// ** React Imports
import { Fragment } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Third Party Components
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Api Import
import { CreateNewsApi } from "./../../../../core/Services/api/News/CreateNews/index";

// ** Reactstrap Imports
import { Label, Row, Col, Button, Input } from "reactstrap";
import toast from "react-hot-toast";

const AddBlogMainInfo = ({ stepper, setFormData,formData }) => {
  // Form Validation
  const validationSchema = yup.object({
    Image: yup.mixed().required("فیلد عکس خالی است"),
  });

  const { mutateAsync, isError, isSuccess } = useMutation({
    mutationFn: CreateNewsApi,
    onSuccess:() =>{
      toast.success("ثبت خبر با موفقیت صورت گرفت");
    },
    onError:() =>{
      toast.error("ثبت خبر با خطا صورت گرفت");
    },
  });

  const handleSubmit = async () => {
    const finalData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      finalData.append(key, value);
    });

    const handleSuccess = () => {
      return MySwal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
        customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
      });
    };

    const handleError = () => {
      return MySwal.fire({
        title: "Error!",
        text: " You clicked the button!",
        icon: "error",
        customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
      });
    };
    for (let pair of finalData.entries()) {
    console.log(pair[0] + ":", pair[1]);
  }

    await mutateAsync(finalData);
    // stepper.next()
    const MySwal = withReactContent(Swal);
    if (isSuccess) {
      handleSuccess;
    }
    if(isError) {
      handleError
    }
    console.log("FINAL FORM DATA:", formData);
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
          Image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <Row>
              <Col md="6" className="mb-1 d-flex flex-column">
                <Label className="form-label" for="Image">
                  انتخاب تصویر
                </Label>
                <Input
                  className="p-1"
                  type="file"
                  id="Image"
                  name="Image"
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];
                    setFieldValue("Image", file);
                    setFormData((prev) => ({ ...prev, Image: file }));
                  }}
                />
                <ErrorMessage
                  name="Image"
                  className="text-danger"
                  component={"span"}
                />
              </Col>
            </Row>
            <Row></Row>
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
              <Button type="submit" color="primary" className="btn-next">
                <span className="align-middle d-sm-inline-block d-none">
                  ثبت خبر
                </span>
                <ArrowRight
                  size={14}
                  className="align-middle ms-sm-25 ms-0"
                ></ArrowRight>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default AddBlogMainInfo;
