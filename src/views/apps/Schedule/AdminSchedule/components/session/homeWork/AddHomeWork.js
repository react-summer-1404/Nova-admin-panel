import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import * as yup from "yup";
import { addMainHomework } from "../../../../../../../core/Services/api/session/Session";
import toast from "react-hot-toast";

const AddHomeWork = ({ ScheduleId,showModal,setShowModal,apiParams }) => {
  const queyClient = useQueryClient()
  const addHwMutation = useMutation({
    mutationFn:(values)=>addMainHomework(values),
    onSuccess:()=>{
      toast.success("تکلیف افزوده شد"),
      queyClient.invalidateQueries(["getSessionHomeWorks",apiParams])
      setShowModal(false)
    },
    onError:(error)=>{
      const msg = error?.response?.data?.ErrorMessage
      console.log("error=>",error),
      toast.error(msg)
    }
  })
  const validation = yup.object().shape({
   
    hwTitle: yup
      .string()
      .required(" عنوان تکلیف الزامی است"),

      hwDescribe: yup
      .string()
      .required(" توضیحات تکلیف الزامی است"),
  });

  return (
    <div>
      <Modal
        isOpen={showModal}
        toggle={() => setShowModal(!showModal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setShowModal(!showModal)}>
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
              addHwMutation.mutate(values);
              console.log("sent", values);
              
            }}
            validationSchema={validation}
          >
            {({ handleSubmit }) => (
              <Form>
                <Label className="form-label mt-1"> عنوان تکلیف</Label>
                <Field
                  name="hwTitle"
                  className="form-control mb-1"
                  placeholder="عنوان تکلیف..."
                />
                <ErrorMessage
                  name="hwTitle"
                  component="div"
                  className="text-danger mt-25 mb-1"
                />

                <Label className="form-label mt-1">توضیحات تکلیف</Label>
                <Field
                  name="hwDescribe"
                  className="form-control mb-1"
                  placeholder="توضیحات تکلیف"
                />
                <ErrorMessage
                  name="hwDescribe"
                  component="div"
                  className="text-danger mt-25 mb-1"
                />

                <ModalFooter>
                  <Button color="primary" onClick={handleSubmit}>
                    افزودن
                  </Button>
                  <Button color="secondary" onClick={() => setShowModal(!showModal)}>
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
