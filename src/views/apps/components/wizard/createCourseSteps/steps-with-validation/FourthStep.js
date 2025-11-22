// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import { ArrowLeft } from "react-feather";
import { useForm, Controller } from "react-hook-form";

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";
import { useState } from "react";
import { formatDate } from "@fullcalendar/core";
const defaultValues = {
  Image: "",
  ImageAddress: "",
};

const FourthStep = ({ stepper ,updateStepData,handleSubmitData}) => {
  const [preview, setPreview] = useState(null);
  // ** Hooks
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    updateStepData("step4", data); // state رو هم آپدیت کن
    handleSubmitData(data); // ولی مستقیم داده‌های جدید رو بفرست
    console.log("STEP 4 DATA", data);
  };
  

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">عکس دوره</h5>
        <small>لطفا برای دوره عکس انتخاب کنید</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="justify-content-center">
          <Col md="8" className="mb-1">
            <Label className="form-label" for="ImageAddress">
              لینک عکس
            </Label>
            <Controller
              name="ImageAddress"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="لینک عکس مورد نظر خود را وارد کنید"
                  invalid={errors.ImageAddress && true}
                  {...field}
                />
              )}
            />
            {errors.ImageAddress && (
              <FormFeedback>{errors.ImageAddress.message}</FormFeedback>
            )}
          </Col>
          <Col md="8" className="mb-1">
            <Label className="form-label" for="Image">
              عکس دوره
            </Label>
            <Controller
  name="Image"
  control={control}
  render={({ field }) => (
    <>
      <div
        style={{
          height: 200,
          width: "80%",
          border: "1px solid purple",
          borderRadius: 8,
          padding:5
        }}
      >
        <img
          src={preview || (field.value ? URL.createObjectURL(field.value) : null)}
          alt="img"
          style={{ width:"100%", height:"100%", borderRadius: 8 }}
        />
      </div>
      <Input
        style={{ width:200, height: 50, marginTop: 10 }}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          field.onChange(file);
          setPreview(file ? URL.createObjectURL(file) : null);
        }}
      />
    </>
  )}
/>

          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>
          <Button type="submit" color="success" className="btn-submit">
  Submit
</Button>

        </div>
      </Form>
    </Fragment>
  );
};

export default FourthStep;
