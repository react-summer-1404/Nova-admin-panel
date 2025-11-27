import React from "react";
import BreadCrumbs from "@components/breadcrumbs";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import StatsVertical from "@components/widgets/stats/StatsVertical";
import { Clipboard   } from "react-feather";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { getDepartmentList, postDepartmentList } from "../../../core/Services/api/DepartmentSection";
import { getBuilding } from "../../../core/Services/api/ClassSection";
import TableDepartment from "../tables/depaermentManagement/TableDepartment";
function TasksManagement() {
  const [centeredModal, setCenteredModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getDepartmentList"],
    queryFn: getDepartmentList,
    refetchOnWindowFocus: false,
    staleTime: 5 * 1000 * 60,
  });
  const queryClient = useQueryClient();
  const mutationPostDepartment = useMutation({
    mutationFn: postDepartmentList,
    onSuccess: () => {
      toast.success("دپارتمان با موفقیت اضافه شد");
      queryClient.invalidateQueries(["getDepartmentList"]);
      setCenteredModal(!centeredModal);
    },

    onError: () => toast.error("خطا در افزودن دپارتمان"),
  });
  const { data: building } = useQuery({
    queryKey: ["buildList"],
    queryFn: getBuilding,
    refetchOnWindowFocus: false,
    staleTime: 5 * 1000 * 60,
  });
  return (
    <>
      <BreadCrumbs
        title="دپارتمان"
        data={[{ title: "دپارتمان ها" }, { title: " دپارتمان" }]}
      />
      <Row>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<Clipboard  size={21} />}
            color="primary"
            stats={data?.length}
            statTitle="تعداد دپارتمان ها"
          />
          <Button
            color="primary"
            style={{ width: "100%" }}
            onClick={() => setCenteredModal(!centeredModal)}
          >
            افزودن دپارتمان +
          </Button>
          <Modal
            isOpen={centeredModal}
            toggle={() => setCenteredModal(!centeredModal)}
            className="modal-dialog-centered"
          >
            <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
              افزودن دپارتمان
            </ModalHeader>

            <ModalBody>
              <Formik
                initialValues={{
                    depName: "",
                    buildingId: "",
                }}
                onSubmit={(values) => {
                    mutationPostDepartment.mutate(values);
                }}
              >
                <Form>
                  <Label className="form-label mt-1">عنوان تسک</Label>
                  <Field
                    name="depName"
                    className="form-control mb-1"
                    placeholder="نام دپارتمان"
                  />
                  <Label className="form-label mt-1">انتخاب ساختمان</Label>
                  <Field
                    as="select"
                    name="buildingId"
                    className="form-control mb-1"
                  >
                    {building?.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.buildingName}
                      </option>
                    ))}
                  </Field>

                  <ModalFooter>
                    <Button color="primary" onClick={onsubmit}>
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
              </Formik>
            </ModalBody>
          </Modal>
        </Col>

        <Col md="9">
          <Card>
            <TableDepartment data={data} isLoading={isLoading} building={building} />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default TasksManagement;
