// ** React Imports
import { Fragment } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// ** Third Party Components
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { EditorComponent } from "../../../../../../configs/EditorComponent";
// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";

const defaultValues = {
  MiniDescribe: "",
  Describe: "",
};
const schema = yup.object().shape({
  MiniDescribe: yup.string().required("توضیحات کوتاه الزامی است"),
  Describe: yup.string().required("توضیحات دوره الزامی است"),
  
});
const ThirdStep = ({ stepper }) => {
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
    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">توضیحاتی درباره دوره</h5>
        <small>توضیحات مورد نظر خود را وارد کنید</small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="justify-content-center">
        <Col md="8" className="mb-3">
          <Label className="form-label" for="MiniDescribe">
            توضیحات کوتاه
          </Label>
          <Controller
            id="MiniDescribe"
            name="MiniDescribe"
            control={control}
            render={({ field }) => (
              <Input
                type="textarea"
                placeholder="توضیحی کوتاه درباره دوره بنویسید"
                invalid={errors.MiniDescribe && true}
                {...field}
              />
            )}
          />
          {errors.MiniDescribe && (
            <FormFeedback>{errors.MiniDescribe.message}</FormFeedback>
          )}
        </Col>
        <Col md="8" className="mb-3">
          <Label className="form-label" for="Describe">
            توضیحات
          </Label>
          <Controller
            id="Describe"
            name="Describe"
            control={control}
            render={({ field }) => (
              <EditorComponent value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.Describe && (
            <FormFeedback>{errors.Describe.message}</FormFeedback>
          )}
        </Col>
        </Row>
        <Row></Row>
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
              Previous
            </span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default ThirdStep;
