import React from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// import TableStatus from "../../tables/statusListTable/TableStatus";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import {
  createGroup,
  createSocialGroup,
} from "../../../../../../core/Services/api/getGroup";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../store";
import { Label } from "recharts";
import { createMentor } from "../../../../../../core/Services/api/Mentor";

const CreateModal = ({ courseId, centeredModal, setCenteredModal, store }) => {
  const dispatch = useDispatch();

  const mutationCreateMentor = useMutation({
    mutationFn: (apiData) => createMentor(apiData),
    onSuccess: () => {
      toast.success("منتور جدید با موفقیت اضافه شد");
      setCenteredModal(false);

      dispatch(getData({ courseId }));
    },
    onError: (error) => {
      toast.error("خطا در افزودن منتور");
      console.log("error", error);
    },
  });

  return (
    <Row>
      <Col xl="3" md="4" sm="6">
        <Modal
          isOpen={centeredModal}
          toggle={() => setCenteredModal(!centeredModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
            افزودن گروه
          </ModalHeader>

          <ModalBody>
            <Formik
              initialValues={{
                courseId: courseId,
                userId: "",
              }}
              onSubmit={(values) => {
                mutationCreateMentor.mutate({
                  ...values,
                  userId: Number(values.userId)
                });
              }}
              
            >
              {({ handleSubmit }) => (
                <Form>
                  <Label className="form-control mb-1">
                    منتور مورد نظر خود را انتخاب کنید
                  </Label>
                  <Field
                    as="select"
                    name="userId"
                    className="form-control mb-1"
                  >
                    {store?.data?.map((s) => (
                      <option key={s.id} value={s.userId}>
                        {s.assistanceName}
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
      </Col>

      <Col md="9">
        <Card></Card>
      </Col>
    </Row>
  );
};

export default CreateModal;
