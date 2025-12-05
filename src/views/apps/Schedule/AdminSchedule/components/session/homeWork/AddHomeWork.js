import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const AddHomeWork = ({ ScheduleId }) => {
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
          <Formik
            initialValues={{
              sessionId: ScheduleId,
              hwTitle: "",
              hwDescribe: "",
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
                <Label className="form-label mt-1"> </Label>
                <Field
                  name="hwTitle"
                  className="form-control mb-1"
                  placeholder="مثلاً 14:00"
                />
                <ErrorMessage
                  name="hwTitle"
                  component="div"
                  className="text-danger mt-25 mb-1"
                />

                <Label className="form-label mt-1">زمان پایان</Label>
                <Field
                  name="hwDescribe"
                  className="form-control mb-1"
                  placeholder="مثلاً 15:00"
                />
                <ErrorMessage
                  name="hwDescribe"
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

export default AddHomeWork;
