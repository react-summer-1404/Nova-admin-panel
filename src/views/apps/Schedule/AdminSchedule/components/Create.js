import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useMutation } from "@tanstack/react-query";
import { AddSchedualSingle } from "../../../../../core/Services/api/Schedule";
import toast from "react-hot-toast";
import * as yup from "yup";
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const Create = ({ setModal, modal, data }) => {
    // const validation = yup.object().shape({
    //     startDate:yup.date().required("این فیلد الزامی است"),
    //     weekNumber:yup.number().required("این فیلد الزامی است"),
    //     endTime:yup.number().required("این فیلد الزامی است"),
    //     startTime:yup.number().required("این فیلد الزامی است"),
    //     rowEffect:yup.number().required("این فیلد الزامی است"),
    // })
  const createScheduleMutation = useMutation({
    mutationFn: (apiData) => AddSchedualSingle(apiData),
    onSuccess: () => {
      toast.success("با موفقیت ساخته شد");
    },
    onError: (error) => {
      const msg = error?.response?.data?.message;
      toast.error(msg);
      console.log("error====>", error);
    },
  });
  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={() => setModal(!modal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setModal(!modal)}>
          ساخت بازه زمانی جدید
        </ModalHeader>

        <ModalBody>
          <Formik
            initialValues={{
              courseGroupId: "",
              startDate: "",
              startTime: "",
              endTime: "",
              weekNumber: "",
              rowEffect: "",
            }}
            onSubmit={(values) => {
            //   createScheduleMutation.mutate(values);
              console.log("sent",values)
              setModal(!modal);
            }}
            // validationSchema={validation}
          >
            {({ handleSubmit }) => (
              <Form>
                <Label className="form-label mt-1"> گروه</Label>
                <Field
                  as="select"
                  name="courseGroupId"
                  className="form-control mb-1"
                >
                  {data?.map((d) => (
                    <option key={`${d.id}+groupsSchedule`} value={d.id}>
                      {d.groupName}
                    </option>
                  ))}
                </Field>

                <Label className="form-label mt-1">تاریخ شروع</Label>
                <Field name="startDate">
                  {({ field, form }) => (
                    <Flatpickr
                      className="form-control"
                      id="startDate"
                      value={field.value}
                      onChange={(date) =>
                        form.setFieldValue("startDate", date[0])
                      }
                    />
                  )}
                </Field>

                <Label className="form-label mt-1">زمان شروع</Label>
                <Field
                  name="startTime"
                  className="form-control mb-1"
                  placeholder="زمان شروع"
                />

                <Label className="form-label mt-1">زمان پایان</Label>
                <Field
                  name="endTime"
                  className="form-control mb-1"
                  placeholder="زمان پایان"
                />

                <Label className="form-label mt-1">تعداد کلاس در هفته</Label>
                <Field
                  type="number"
                  name="weekNumber"
                  className="form-control mb-1"
                  placeholder="تعداد کلاس در هفته"
                />

                <Label className="form-label mt-1">تعداد کل کلاس ها </Label>
                <Field
                  type="number"
                  name="rowEffect"
                  className="form-control mb-1"
                  placeholder="تعداد کل کلاس ها"
                />

                <ModalFooter>
                  <Button color="primary" onClick={handleSubmit}>
                    ذخیره
                  </Button>
                  <Button color="secondary" onClick={() => setModal(!modal)}>
                    بستن
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Create;
