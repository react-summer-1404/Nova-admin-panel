import { Fragment, useState } from "react";
import { ArrowLeft } from "react-feather";
import { useForm, Controller } from "react-hook-form";

import {
  Label,
  Row,
  Col,
  Button,
  Form,
  Input,
  FormFeedback,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const defaultValues = {
  Image: "",
  ImageAddress: "",
};

const FourthStep = ({ stepper, updateStepData, handleSubmitData }) => {
  const [preview, setPreview] = useState(null);
  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) setActive(tab);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    updateStepData("step4", data);
    handleSubmitData(data);
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">عکس دوره</h5>
        <small>لطفا برای دوره عکس انتخاب کنید</small>
      </div>

      <Nav tabs justified>
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggle("1")}>
            آپلود عکس
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggle("2")}>
            لینک عکس
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={active} className="py-50">
        <TabPane tabId="1">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Col md="8" className="mb-3">
              {/* <Label>آپلود عکس</Label> */}

              <Controller
                name="Image"
                control={control}
                render={({ field }) => (
                  <>
                     <Input
                      style={{ width: 200, height: 50, marginTop: 10 }}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        field.onChange(file);
                        setPreview(file ? URL.createObjectURL(file) : null);
                      }}
                    />
                    <div
                      style={{
                        height: 300,
                        width: "150%",
                        border: "2px dotted #7367f0",
                        borderRadius: 8,
                        padding: 5,
                        marginTop:20,
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center"
                      }}
                    >
                      <img
                        src={
                          preview ||
                          (field.value
                            ? URL.createObjectURL(field.value)
                            : null)
                        }
                        alt="upload your image"
                        style={{
                          width: "300px",
                          height: "60%",
                          borderRadius: 8,
                        }}
                      />
                    </div>

                 
                  </>
                )}
              />
            </Col>

           
          </Form>
        </TabPane>

        <TabPane tabId="2">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Col md="8" className="mb-1">
              <Label>لینک عکس</Label>

              <Controller
                name="ImageAddress"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="لینک عکس را وارد کنید"
                    invalid={errors.ImageAddress && true}
                    {...field}
                  />
                )}
              />

              {errors.ImageAddress && (
                <FormFeedback>{errors.ImageAddress.message}</FormFeedback>
              )}
            </Col>
          </Form>
        </TabPane>
      </TabContent>
      <div className="d-flex justify-content-between mt-2">
        <Button
          color="primary"
          className="btn-prev"
          onClick={() => stepper.previous()}
        >
          <ArrowLeft size={14} className="align-middle me-1" />
          قبلی
        </Button>

        <Button
          color="success"
          className="btn-submit"
          onClick={handleSubmit(onSubmit)}
        >
          ثبت
        </Button>
      </div>
    </Fragment>
  );
};

export default FourthStep;
