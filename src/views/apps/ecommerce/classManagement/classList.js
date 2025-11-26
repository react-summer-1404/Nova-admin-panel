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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import StatsVertical from "@components/widgets/stats/StatsVertical";
import { Grid } from "react-feather";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import {
  getBuilding,
  getClassist,
  postClassist,
} from "../../../../core/Services/api/ClassSection";
import TableClass from "../../tables/classLsitTable/TableClass";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  classRoomName: Yup.string().required("*الزامی"),

  capacity: Yup.number().required("*الزامی"),

  buildingId: Yup.string().required("*الزامی"),
});
const ClassList = () => {
  const [centeredModal, setCenteredModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getClassList"],
    queryFn: getClassist,
    refetchOnWindowFocus: false,
    staleTime: 5 * 1000 * 60,
  });
  const queryClient = useQueryClient();
  const mutationPostClass = useMutation({
    mutationFn: postClassist,
    onSuccess: () => {
      toast.success("کلاس با موفقیت اضافه شد");
      queryClient.invalidateQueries(["getClassList"]);
      setCenteredModal(!centeredModal);
    },

    onError: () => toast.error("خطا در افزودن کلاس"),
  });
  const { data: building } = useQuery({
    queryFn: getBuilding,
    queryKey: ["classBuilding"],
  });
  return (
    <Row>
      <Col xl="3" md="4" sm="6">
        <StatsVertical
          icon={<Grid size={21} />}
          color="primary"
          stats={data?.length}
          statTitle="تعداد کلاس ها"
        />
        <Button
          color="relief-primary"
          style={{ width: "100%" }}
          onClick={() => setCenteredModal(!centeredModal)}
        >
          افزودن کلاس +
        </Button>
        <Modal
          isOpen={centeredModal}
          toggle={() => setCenteredModal(!centeredModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
            افزودن کلاس
          </ModalHeader>

          <ModalBody>
            <Formik
              initialValues={{
                classRoomName: "",
                capacity: "",
                buildingId: "",
              }}
              onSubmit={(values) => {
                mutationPostClass.mutate(values);
              }}
              validationSchema={validationSchema}
            >
              {({ handleSubmit, errors }) => (
                <Form>
                  <Field
                    name="classRoomName"
                    className="form-control"
                    style={{ marginBottom: "2px" }}
                    placeholder="نام کلاس"
                  />
                  {errors.classRoomName && (
                    <div
                      className="text-danger"
                      style={{ fontSize: "12px", marginBottom: "6px" }}
                    >
                      {errors.classRoomName}
                    </div>
                  )}

                  <Field
                    type="number"
                    name="capacity"
                    className="form-control"
                    style={{ marginBottom: "2px" }}
                    placeholder="ظرفیت"
                  />
                  {errors.capacity && (
                    <div
                      className="text-danger"
                      style={{ fontSize: "12px", marginBottom: "6px" }}
                    >
                      {errors.capacity}
                    </div>
                  )}

                  <Field
                    as="select"
                    name="buildingId"
                    className="form-control"
                    style={{ marginBottom: "2px" }}
                  >
                    <option value="">انتخاب ساختمان...</option>
                    {building?.map((build) => (
                      <option key={build.id} value={build.id}>
                        {build.buildingName}
                      </option>
                    ))}
                  </Field>
                  {errors.buildingId && (
                    <div
                      className="text-danger"
                      style={{ fontSize: "12px", marginBottom: "6px" }}
                    >
                      {errors.buildingId}
                    </div>
                  )}

                  <ModalFooter>
                    <Button
                      color="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
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
        <Card>
          <TableClass data={data} isLoading={isLoading} building={building} />
        </Card>
      </Col>
    </Row>
  );
};

export default ClassList;
