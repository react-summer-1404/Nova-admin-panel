// ** React Imports
import { Fragment } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Third Party Components
import Select from 'react-select'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";

// ** Utils
import { selectThemeColors } from '@utils'

// ** Api Import
import { GetNewsCategories } from './../../../../core/Services/api/News/GetNewsCategories/index';

// ** Reactstrap Imports
import { Label, Row, Col, Input, Button } from "reactstrap";

const AddBlogSlider = ({ stepper,setFormData }) => {
  // Get Categories
  const {data} = useQuery({
    queryKey:["news-categories"],
    queryFn: GetNewsCategories
  })

  const categoryOptions = data?.map(cate => ({
    value: cate.id,
    label: cate.title
  }) || [])

  const countryOptions = [
    { value: "UK", label: "UK" },
    { value: "USA", label: "USA" },
    { value: "Spain", label: "Spain" },
    { value: "France", label: "France" },
    { value: "Italy", label: "Italy" },
    { value: "Australia", label: "Australia" },
  ];

  // Form Validation
  const validationSchema = yup.object({
    NewsCategoryId: yup.string().required("انتخاب کردن دسته بندی ضروری است"),
  });

 const handleSubmit = async (values) => {
    setFormData(prev => ({...prev,...values}))
    stepper.next()
    
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
          NewsCategoryId: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
       {({setFieldValue}) => (
         <Form>
          <Row>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="NewsCategoryId">
                انتخاب دسته بندی خبر
              </Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                id="NewsCategoryId"
                name="NewsCategoryId"
                className="react-select"
                classNamePrefix="select"
                options={categoryOptions}
                onChange={(option) => {setFieldValue("NewsCategoryId", option? option.value: "")}}
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
       )}
      </Formik>
    </Fragment>
  );
};

export default AddBlogSlider;
