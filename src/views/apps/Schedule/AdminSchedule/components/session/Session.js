import { useQuery } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import {
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
} from "reactstrap";
import { getSessionDetails } from "../../../../../../core/Services/api/session/Session";
import { useState } from "react";
import HomeWork from "./homeWork/HomeWork";

const Session = ({ setCentralModal, centralModal, ScheduleId }) => {
  const [showHmModal, setShowHmModal] = useState(false);

  const apiParams = {
    SessionId: ScheduleId,
  };
  const { data: sessionDetail } = useQuery({
    queryKey: ["getSessionDetails",apiParams],
    queryFn: () => getSessionDetails(apiParams),
  });
 
  return (
    <div>
      <Modal
        isOpen={centralModal}
        toggle={() => setCentralModal(!centralModal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setCentralModal(!centralModal)}>
          جزییات جلسه
        </ModalHeader>

        <ModalBody>
          <div className="d-flex justify-content-between ">
            {/* <div></div> */}
            <Card className="w-50">
              <CardBody>
                <div className="d-flex gap-1 align-items-center">
                  <h5>عنوان جلسه :</h5>
                  <p>{sessionDetail?.sessionTitle}</p>
                </div>
              </CardBody>
            </Card>
            <div className="d-flex flex-column gap-1">
              <Card>
                <CardBody>asdfghjk</CardBody>
              </Card>
              <div className="d-flex flex-column gap-1">
                <Button color="primary" className="w-100">
                  افزودن فایل +
                </Button>
                <div className="d-flex gap-2 w-100">
                  <Button color="warning" className="w-50" onClick={() => setShowHmModal(!showHmModal)}>
                    تکلیف
                  </Button>
                  <Button color="secondary" className="w-50">
                    dkl
                  </Button>
                </div>
              </div>
            </div>
          </div>
         {/* modals */}
         <HomeWork setShowHmModal={setShowHmModal} showHmModal={showHmModal} ScheduleId={ScheduleId}/>
          {/* <Formik
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
          </Formik> */}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Session;
