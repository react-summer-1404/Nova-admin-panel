import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useMutation } from "@tanstack/react-query";
import { AddSchedualSingle } from "../../../../../core/Services/api/Schedule";
import toast from "react-hot-toast";
import * as yup from "yup";
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const Create = ({ setModal, modal, data }) => {
  const validation = yup.object().shape({
    courseGroupId: yup.string().required("گروه الزامی است"),

    startDate: yup
      .date()
      .typeError("تاریخ معتبر نیست")
      .required("تاریخ شروع الزامی است"),

    startTime: yup
      .string()
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "فرمت زمان باید HH:mm باشد")
      .required("زمان شروع الزامی است"),

    endTime: yup
      .string()
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "فرمت زمان باید HH:mm باشد")
      .required("زمان پایان الزامی است"),

    weekNumber: yup
      .number()
      .min(1, "حداقل یک جلسه در هفته لازم است")
      .required("این فیلد الزامی است"),

    rowEffect: yup
      .number()
      .min(1, "تعداد کلاس باید حداقل 1 باشد")
      .required("این فیلد الزامی است"),
  });

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
              createScheduleMutation.mutate(values);
              console.log("sent", values);
              setModal(!modal);
            }}
            validationSchema={validation}
          >
            {({ handleSubmit }) => (
              <Form>
                <Label className="form-label mt-1">گروه</Label>
                <Field
                  as="select"
                  name="courseGroupId"
                  className="form-control mb-1"
                >
                  <option value="">انتخاب کنید...</option>
                  {data?.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.groupName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="courseGroupId"
                  component="div"
                  className="text-danger mt-25 mb-1"
                />

                <Label className="form-label mt-1">تاریخ شروع</Label>
                <Field name="startDate">
                  {({ field, form }) => (
                    <Flatpickr
                      className="form-control"
                      value={field.value}
                      onChange={(date) =>
                        form.setFieldValue("startDate", date[0])
                      }
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="startDate"
                  component="div"
                  className="text-danger mt-25 mb-1"
                />

                <Label className="form-label mt-1">زمان شروع</Label>
                <Field
                  name="startTime"
                  className="form-control mb-1"
                  placeholder="مثلاً 14:00"
                />
                <ErrorMessage
                  name="startTime"
                  component="div"
                  className="text-danger mt-25 mb-1"
                />

                <Label className="form-label mt-1">زمان پایان</Label>
                <Field
                  name="endTime"
                  className="form-control mb-1"
                  placeholder="مثلاً 15:00"
                />
                <ErrorMessage
                  name="endTime"
                  component="div"
                  className="text-danger mt-25 mb-1"
                />

                <Label className="form-label mt-1">تعداد کلاس در هفته</Label>
                <Field
                  type="number"
                  name="weekNumber"
                  className="form-control mb-1"
                  placeholder="مثلاً 2"
                />
                <ErrorMessage
                  name="weekNumber"
                  component="div"
                  className="text-danger mt-25 mb-1"
                />

                <Label className="form-label mt-1">تعداد کل جلسات</Label>
                <Field
                  type="number"
                  name="rowEffect"
                  className="form-control mb-1"
                  placeholder="مثلاً 12"
                />
                <ErrorMessage
                  name="rowEffect"
                  component="div"
                  className="text-danger mt-25 mb-1"
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
