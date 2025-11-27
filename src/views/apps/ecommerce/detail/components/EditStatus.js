import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { editStatusProduct, getStatusList } from "../../../../../core/Services/api/StatusSection";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Label } from "recharts";
import toast from "react-hot-toast";

const EditStatus = ({ selectedCourse,centeredModal,setCenteredModal }) => {

  const { data: status } = useQuery({
    queryKey: ["statusDetail"],
    queryFn: getStatusList,
    refetchOnWindowFocus: false,
    staleTime: 60 * 5 * 1000,
  });
  const editStatusProductMutation = useMutation({
    mutationFn:(formData)=>editStatusProduct(formData),
    onError:(error)=>{
        console.log("error",error)
        toast.error("خطایی رخ داد")
    },
    onSuccess:()=>{toast.success("با موفقیت ویرایش شد")
    setCenteredModal(!centeredModal)
}
  });
  return (
    <div>
      <Modal
        isOpen={centeredModal}
        toggle={() => setCenteredModal(!centeredModal)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>ویرایش وضعیت</ModalHeader>

        <ModalBody>
          <Formik
            initialValues={{
              StatusId: selectedCourse.StatusId,
            }}
            onSubmit={(values) => {
                const formData = new FormData();
                formData.append("StatusId", values.StatusId);
                formData.append("CourseId", selectedCourse.id);
                
                editStatusProductMutation.mutate(formData);
                
            //   setCenteredModal(!centeredModal)
            console.log(values)
            }}
          >
            {({ handleSubmit }) => (
              <Form>
                <Label className="form-label mt-1">نام وضعیت</Label>
                <Field
                  as="select"
                  name="StatusId"
                  className="form-control mb-1"
                >
                  {status?.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.statusName}
                    </option>
                  ))}
                </Field>
                <ModalFooter>
                  <Button color="primary" onClick={handleSubmit}>
                    ذخیره
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => setCenteredModal(!centeredModal)}
                  >
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

export default EditStatus;
