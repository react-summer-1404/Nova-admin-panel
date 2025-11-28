import { useMutation, useQuery } from "@tanstack/react-query";
import { Field, Form, Formik } from "formik";
import React from "react";
import { Check, X } from "react-feather";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { getCreateCourse } from "../../../../../core/Services/api/CreateCourse";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import Flatpickr from "react-flatpickr";
import { editCourse } from "../../../../../core/Services/api/EditCourse";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getProducts, getProduct } from "../../store";
const EditCourse = ({ show, setShow, selectedCourse }) => {
const dispatch = useDispatch();

  const { data } = useQuery({
    queryKey: ["courseEditInfo"],
    queryFn: getCreateCourse,
    refetchOnWindowFocus: false,
  });
  const mutationEditCourse = useMutation({
    mutationFn: (formData) => editCourse(formData),
    onSuccess: () => {
      toast.success("ویرایش دوره با موفقیت انجام شد");

      dispatch(getProduct(selectedCourse.id));
    
      setShow(false);
    }
,    
    onError: (error) => {
      console.log("error", error), toast.error("ویرایش دوره با خطا مواجه شد");
    },
  });
  return (
    <div>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">ویرایش دوره</h1>
          </div>
          <Formik
            initialValues={{
              Title: selectedCourse.title,
              Describe: selectedCourse.describe,
              MiniDescribe: selectedCourse.miniDescribe,
              Capacity: selectedCourse.capacity,
              CourseLvlId: selectedCourse.courseLvlId,
              TeacherId: selectedCourse.teacherId,
              Cost: selectedCourse.price,
              Image: null,
              StartTime: selectedCourse.startTime?.slice(0, 10),
              EndTime: selectedCourse.endTime?.slice(0, 10),
              GoogleTitle: selectedCourse.googleTitle,
              Id: selectedCourse.id,
              ImageAddress: "",
            }}
            onSubmit={(values) => {
              const formData = new FormData();
              formData.append("Title", values.Title);
              formData.append("Describe", values.Describe);
              formData.append("MiniDescribe", values.MiniDescribe);
              formData.append("Capacity", values.Capacity);
              formData.append("CourseLvlId", values.CourseLvlId);
              formData.append("TeacherId", values.TeacherId);
              formData.append("Cost", values.Cost);
              formData.append("StartTime", values.StartTime);
              formData.append("EndTime", values.EndTime);
              formData.append("GoogleTitle", values.GoogleTitle);
              formData.append("Id", values.Id);

              if (values.Image) {
                formData.append("Image", values.Image);
              } else if (values.ImageAddress) {
                formData.append("ImageAddress", values.ImageAddress);
              }

              mutationEditCourse.mutate(formData);

              //   setCenteredModal(!centeredModal)
              console.log(values);
              console.log("SelectedCourse ID:", selectedCourse.id);
            }}
          >
            {({ handleSubmit }) => (
              <Form>
                <Row className="gy-1 pt-75">
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="Title">
                      نام دوره
                    </Label>
                    <Field name="Title" className="form-control mb-1" />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="Capacity">
                      ظرفیت
                    </Label>
                    <Field name="Capacity" className="form-control mb-1" />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="StartTime">
                      تاریخ شروع
                    </Label>
                    <Field name="StartTime" className="form-control mb-1">
                      {({ field, form }) => (
                        <Flatpickr
                          className="form-control"
                          id="StartTime"
                          value={field.value}
                          onChange={(date) =>
                            form.setFieldValue("StartTime", date[0])
                          }
                        />
                      )}
                    </Field>
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="EndTime">
                      تاریخ پایان
                    </Label>
                    <Field name="EndTime" className="form-control mb-1">
                      {({ field, form }) => (
                        <Flatpickr
                          className="form-control"
                          id="EndTime"
                          value={field.value}
                          onChange={(date) =>
                            form.setFieldValue("EndTime", date[0])
                          }
                        />
                      )}
                    </Field>
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="Cost">
                      قیمت:
                    </Label>
                    <Field
                      type="number"
                      name="Cost"
                      className="form-control mb-1"
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="GoogleTitle">
                      عنوان گوگل
                    </Label>
                    <Field name="GoogleTitle" className="form-control mb-1" />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="CourseLvlId">
                      سطح دوره
                    </Label>
                    <Field
                      as="select"
                      name="CourseLvlId"
                      className="form-control mb-1"
                    >
                      {data?.courseLevelDtos?.map((Level) => (
                        <option key={Level.id} value={Level.id}>
                          {Level.levelName}
                        </option>
                      ))}
                    </Field>
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="TeacherId">
                      معلم دوره
                    </Label>
                    <Field
                      as="select"
                      name="TeacherId"
                      className="form-control mb-1"
                    >
                      {data?.teachers?.map((teacher) => (
                        <option
                          key={teacher.teacherId}
                          value={teacher.teacherId}
                        >
                          {teacher.fullName}
                        </option>
                      ))}
                    </Field>
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="MiniDescribe">
                      توضیحات کوتاه
                    </Label>
                    <Field
                      as="textarea"
                      name="MiniDescribe"
                      className="form-control mb-1"
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="Describe">
                      توضیحات
                    </Label>
                    <Field
                      as="textarea"
                      name="Describe"
                      className="form-control mb-1"
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="Image">
                      عکس
                    </Label>
                    <Field name="Image">
                      {({ form }) => (
                        <Input
                          type="file"
                          accept="image/*"
                          className="form-control mb-1"
                          onChange={(e) => {
                            form.setFieldValue("Image", e.target.files[0]);
                            form.setFieldValue("ImageAddress", "");
                          }}
                        />
                      )}
                    </Field>
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="ImageAddress">
                      لینک عکس
                    </Label>
                    <Field name="ImageAddress">
                      {({ field, form }) => (
                        <Input
                          {...field}
                          className="form-control mb-1"
                          onChange={(e) => {
                            form.setFieldValue("ImageAddress", e.target.value);
                            form.setFieldValue("Image", null);
                          }}
                        />
                      )}
                    </Field>
                  </Col>

                  <Col xs={12} className="text-center mt-2 pt-50">
                    <Button
                      type="submit"
                      className="me-1"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      ویرایش
                    </Button>
                    <Button
                      type="reset"
                      color="secondary"
                      outline
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      لغو
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditCourse;
