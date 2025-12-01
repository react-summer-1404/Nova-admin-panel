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
import {
  getMentorList,
  getTaskList,
  postTaskList,
} from "../../../../core/Services/api/TaskSection";
import TableTask from "../../tables/taskListTable/TableTask";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import Flatpickr from "react-flatpickr";
function TasksManagement() {
  const [centeredModal, setCenteredModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getTaskList"],
    queryFn: getTaskList,
    refetchOnWindowFocus: false,
    staleTime: 5 * 1000 * 60,
  });
  const queryClient = useQueryClient();
  const mutationPostTask = useMutation({
    mutationFn: postTaskList,
    onSuccess: () => {
      toast.success("تسک با موفقیت اضافه شد");
      queryClient.invalidateQueries(["getTaskList"]);
      setCenteredModal(!centeredModal);
    },

    onError: () => toast.error("خطا در افزودن تسک"),
  });
  const { data: mentor } = useQuery({
    queryKey: ["getmentorList"],
    queryFn: getMentorList,
    refetchOnWindowFocus: false,
    staleTime: 5 * 1000 * 60,
  });
  return (
    <>
      <BreadCrumbs
        title="تسک"
        data={[{ title: " تسک دوره ها" }, { title: " تسک" }]}
      />
      <Row>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<Clipboard  size={21} />}
            color="primary"
            stats={data?.length}
            statTitle="تعداد تسک ها"
          />
          <Button
            color="primary"
            style={{ width: "100%" }}
            onClick={() => setCenteredModal(!centeredModal)}
          >
            افزودن تسک +
          </Button>
          <Modal
            isOpen={centeredModal}
            toggle={() => setCenteredModal(!centeredModal)}
            className="modal-dialog-centered"
          >
            <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
              افزودن تسک
            </ModalHeader>

            <ModalBody>
              <Formik
                initialValues={{
                  worktitle: "",
                  workDescribe: "",
                  workDate: "",
                  assistanceId: "",
                }}
                onSubmit={(values) => {
                  mutationPostTask.mutate(values);
                }}
              >
                <Form>
                  <Label className="form-label mt-1">عنوان تسک</Label>
                  <Field
                    name="worktitle"
                    className="form-control mb-1"
                    placeholder="عنوان تسک"
                  />
                  <Label className="form-label mt-1">توضیحات</Label>
                  <Field
                  as="textarea"
                    name="workDescribe"
                    className="form-control mb-1"
                    placeholder="توضیحات"
                  />
                  <Label className="form-label mt-1">تاریخ تسک</Label>
                  <Field name="workDate">
                    {({ field, form }) => (
                      <Flatpickr
                        className="form-control"
                        id="workDate"
                        value={field.value}
                        onChange={(date) =>
                          form.setFieldValue("workDate", date[0])
                        }
                      />
                    )}
                  </Field>

                  <Label className="form-label mt-1">منتور تسک</Label>
                  <Field
                    as="select"
                    name="assistanceId"
                    className="form-control mb-1"
                  >
                    {mentor?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.assistanceName}
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
            <TableTask data={data} isLoading={isLoading} mentor={mentor} />
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default TasksManagement;
