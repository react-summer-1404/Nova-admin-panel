// ** React Imports
import { Fragment } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Third Party Components
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Api Import
import { GetNewsCategories } from "./../../../../core/Services/api/News/GetNewsCategories/index";

// ** Reactstrap Imports
import { Label, Row, Col, Button, Input } from "reactstrap";

const AddBlogSlider = ({ stepper, setFormData }) => {
  // Get Categories
  const { data } = useQuery({
    queryKey: ["news-categories"],
    queryFn: GetNewsCategories,
  });

  const categoryOptions = data?.map(
    (cate) =>
      ({
        value: Number(cate.id),
        label: cate.categoryName,
      } || [])
  );

  // Form Validation
  const validationSchema = yup.object({
    NewsCatregoryId: yup
      .number()
      .nullable()
      .required("انتخاب کردن دسته بندی ضروری است"),
    IsSlider: yup.boolean(),
  });

  const handleSubmit = (values) => {
    setFormData((prev) => ({
      ...prev,
      NewsCatregoryId: values.NewsCatregoryId,
      IsSlider: values.IsSlider,
    }));
    console.log("values:", values);
    console.log("values NewsCatregoryId:", values.NewsCatregoryId);
    console.log("values NewsCatregoryId typeof:", typeof values.NewsCatregoryId);
    stepper.next();
  };
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0"> دسته بندی و اسلایدر </h5>
        <small className="text-muted">
          دسته بندی و نمایش در اسلایدر را انتخاب کنید.
        </small>
      </div>
      <Formik
        initialValues={{
          NewsCatregoryId: null,
          IsSlider: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <Row>
              <Col md="6" className="mb-1">
                <Label className="form-label" for="NewsCatregoryId">
                  انتخاب دسته بندی خبر
                </Label>
                {data && (
                  <Select
                    theme={selectThemeColors}
                    isClearable={false}
                    id="NewsCatregoryId"
                    name="NewsCatregoryId"
                    className="react-select"
                    classNamePrefix="select"
                    options={categoryOptions}
                    value={
                      categoryOptions?.find(
                        (opt) => opt.value === values.NewsCatregoryId
                      ) || null
                    }
                    onChange={(option) =>
                      setFieldValue(
                        "NewsCatregoryId",
                        option?.value || null,
                        true
                      )
                    }
                  />
                )}
                <ErrorMessage
                  name="NewsCatregoryId"
                  component="div"
                  className="text-danger"
                />
              </Col>
            </Row>
            <div className="form-check form-switch">
              <Input
                type="switch"
                name="IsSlider"
                id="IsSlider"
                onChange={(e) => {
                  setFieldValue("IsSlider", e.target.checked);
                }}
              />
              <Label for="IsSlider" className="form-check-label">
                نمایش در اسلایدر
              </Label>
            </div>
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
                  بعدی
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

export default AddBlogSlider;
