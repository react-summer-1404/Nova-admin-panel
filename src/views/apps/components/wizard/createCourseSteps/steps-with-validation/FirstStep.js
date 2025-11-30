// ** React Imports
import { Fragment } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// ** Third Party Components

import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import Flatpickr from "react-flatpickr";

const defaultValues = {
  Title: "",
  GoogleTitle: "",
  Capacity: "",
  Cost: "",
  StartTime: "",
  EndTime: "",
};

const schema = yup.object().shape({
  Title: yup.string().required("عنوان الزامی است"),
  GoogleTitle: yup.string().required("عنوان گوگل الزامی است"),
  Capacity: yup
    .number()
    .typeError("ظرفیت باید عدد باشد")
    .positive("عدد باید مثبت باشد")
    .required("ظرفیت الزامی است"),
  Cost: yup
    .number()
    .typeError("قیمت باید عدد باشد")
    .positive("عدد باید مثبت باشد")
    .required("قیمت الزامی است"),
  StartTime: yup
    .date()
    .typeError("تاریخ شروع معتبر نیست")
    .required("تاریخ شروع الزامی است"),
  EndTime: yup
    .date()
    .typeError("تاریخ پایان معتبر نیست")
    .required("تاریخ پایان الزامی است")
    .min(yup.ref("StartTime"), "تاریخ پایان باید بعد از تاریخ شروع باشد"),
});

const FirstStep = ({ stepper ,updateStepData}) => {
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const onSubmit = (data) => {
    updateStepData("step1",data)
    stepper.next();
  };


  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">مرحله اول </h5>
        <small>لطفا اطلاعات خواسته شده را وارد کنید</small>
      </div>
      {/* <Formik> */}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="Title">
                عنوان
              </Label>
              <Controller
                id="Title"
                name="Title"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="عنوان دوره"
                    invalid={errors.Title && true}
                    {...field}
                  />
                )}
              />
              {errors.Title && (
                <FormFeedback>{errors.Title.message}</FormFeedback>
              )}
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="GoogleTitle">
                عنوان گوگل
              </Label>
              <Controller
                id="GoogleTitle"
                name="GoogleTitle"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="عنوان گوگل"
                    invalid={errors.GoogleTitle && true}
                    {...field}
                  />
                )}
              />
              {errors.GoogleTitle && (
                <FormFeedback>{errors.GoogleTitle.message}</FormFeedback>
              )}
            </Col>
          </Row>
          <Row>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="Capacity">
                ظرفیت دوره
              </Label>

              <Controller
                id="Capacity"
                name="Capacity"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="ظرفبیت دوره ها وارد کنید"
                    invalid={errors.Capacity && true}
                    {...field}
                  />
                )}
              />
              {errors.Capacity && (
                <FormFeedback>{errors.Capacity.message}</FormFeedback>
              )}
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="Cost">
                قیمت دوره
              </Label>

              <Controller
                id="Cost"
                name="Cost"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    placeholder="ظرفبیت دوره ها وارد کنید"
                    invalid={errors.Cost && true}
                    {...field}
                  />
                )}
              />
              {errors.Cost && (
                <FormFeedback>{errors.Cost.message}</FormFeedback>
              )}
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="StartTime">
                تاریخ شروع
              </Label>

              <Controller
                control={control}
                name="StartTime"
                render={({ field }) => (
                  <>
                    <Flatpickr
                      id="StartTime"
                      className={`form-control ${
                        errors.StartTime ? "is-invalid" : ""
                      }`}
                      value={field.value}
                      onChange={(date) => field.onChange(date[0])}
                    />
                  </>
                )}
              />

              {errors.StartTime && (
                <FormFeedback>{errors.StartTime.message}</FormFeedback>
              )}
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="EndTime">
                تاریخ پایان
              </Label>

              <Controller
                control={control}
                name="EndTime"
                render={({ field }) => (
                  <>
                    <Flatpickr
                      id="EndTime"
                      className={`form-control ${
                        errors.EndTime ? "is-invalid" : ""
                      }`}
                      value={field.value}
                      onChange={(date) => field.onChange(date[0])}
                    />
                  </>
                )}
              />

              {errors.EndTime && (
                <FormFeedback>{errors.EndTime.message}</FormFeedback>
              )}
            </Col>
          </Row>
          <div className="d-flex justify-content-between">
            <Button
              type="button"
              color="primary"
              className="btn-prev"
              onClick={() => stepper.previous()}
            >
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
                بعدی
              </span>
              <ArrowRight
                size={14}
                className="align-middle ms-sm-25 ms-0"
              ></ArrowRight>
            </Button>
          </div>
        </Form>
      {/* </Formik> */}
    </Fragment>
  );
};

export default FirstStep;
