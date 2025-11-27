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
  Label,
} from "reactstrap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import StatsVertical from "@components/widgets/stats/StatsVertical";
import { Layers,XCircle,CheckCircle } from "react-feather";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import {
  getTermList,
  postTermList,
  postTermListTime,
} from "../../../../core/Services/api/TermSection";
import TableTerm from "../../tables/TermListTable/TableTerm";
import { getDepartmentList } from "../../../../core/Services/api/DepartmentSection";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import Flatpickr from "react-flatpickr";

const List = () => {
  const [centeredModal, setCenteredModal] = useState(false);
  const [centeredModalTime, setCenteredModalTime] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getTermList"],
    queryFn: getTermList,
    refetchOnWindowFocus: false,
    staleTime: 5 * 1000 * 60,
  });
  const queryClient = useQueryClient();
  const mutationPostTerm = useMutation({
    mutationFn: postTermList,
    onSuccess: () => {
      toast.success("ترم با موفقیت اضافه شد");
      queryClient.invalidateQueries(["getTermList"]);
      setCenteredModal(!centeredModal);
    },

    onError: () => toast.error("خطا در افزودن ترم"),
  });
  const { data: dep } = useQuery({
    queryFn: getDepartmentList,
    queryKey: ["TermDepartment"],
    refetchOnWindowFocus: false,
    staleTime: 5 * 1000 * 60,
  });
const expired =data?.filter((item)=>item.expire==true)
const unexpired =data?.filter((item)=>item.expire==false)

const mutationPostTermTime = useMutation({
  mutationFn: postTermListTime,
  onSuccess: () => {
    toast.success("زمان ترم با موفقیت اضافه شد");
    setCenteredModalTime(!centeredModalTime);
  },

  onError: () => toast.error("خطا در افزودن زمان تزم"),
});
  return (
    <Row>
      <Col xl="3" md="4" sm="6">
        <StatsVertical
          icon={<Layers size={21} />}
          color="primary"
          stats={data?.length}
          statTitle="تعداد کل ترم ها"
        />
        <StatsVertical
          icon={<XCircle size={21} />}
          color="warning"
          stats={expired?.length}
          statTitle="تعداد ترم های منقضی شده"
        />
        <StatsVertical
          icon={<CheckCircle  size={21} />}
          color="info"
          stats={unexpired?.length}
          statTitle="تعداد ترم های منقضی نشده"
        />
      <Row className="mt-1">
     <Col>
     <Button
          color="primary"
          style={{ width: "100%" }}
          onClick={() => setCenteredModal(!centeredModal)}
        >
          افزودن ترم +
        </Button>
        <Modal
          isOpen={centeredModal}
          toggle={() => setCenteredModal(!centeredModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
            افزودن ترم
          </ModalHeader>

          <ModalBody>
            <Formik
              initialValues={{
                termName: "",
                startDate: "",
                endDate: "",
                departmentId: "",
              }}
              onSubmit={(values) => {
                mutationPostTerm.mutate(values);
              }}
            >
              <Form>
                <Label className="form-label mt-1">نام ترم</Label>

                <Field
                  name="termName"
                  className="form-control mb-1"
                  placeholder="نام ترم"
                />
                
                <Label className="form-label">تاریخ شروع</Label>
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

                <Label className="form-label mt-1">تاریخ پایان</Label>
                <Field name="endDate">
                  {({ field, form }) => (
                    <Flatpickr
                      className="form-control"
                      id="endDate"
                      value={field.value}
                      onChange={(date) =>
                        form.setFieldValue("endDate", date[0])
                      }
                    />
                  )}
                </Field>

                <Label className="form-label mt-1"> دپارتمان</Label>
                <Field
                  as="select"
                  name="departmentId"
                  className="form-control mb-1"
                >
                  {dep?.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.depName}
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
        </Modal></Col>
     <Col>
     <Button
          color="primary"
          style={{ width: "100%" }}
          onClick={() => setCenteredModalTime(!centeredModalTime)}
        >
          افزودن زمان +
        </Button>
        <Modal
          isOpen={centeredModalTime}
          toggle={() => setCenteredModalTime(!centeredModalTime)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setCenteredModalTime(!centeredModalTime)}>
            افزودن زمان
          </ModalHeader>

          <ModalBody>
            <Formik
              initialValues={{
                termId: "",
                startCloseDate: "",
                endCloseDate: "",
                closeReason: "",
              }}
              onSubmit={(values) => {
                mutationPostTermTime.mutate(values);
              }}
            >
              <Form>
              <Label className="form-label mt-1"> انتخاب ترم</Label>
                <Field
                  as="select"
                  name="termId"
                  className="form-control mb-1"
                  placeholder="ترم"
                >
                  {data?.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.termName}
                    </option>
                  ))}
                </Field>
                
                <Label className="form-label">تاریخ شروع</Label>
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

                <Label className="form-label mt-1">تاریخ پایان</Label>
                <Field name="endDate">
                  {({ field, form }) => (
                    <Flatpickr
                      className="form-control"
                      id="endDate"
                      value={field.value}
                      onChange={(date) =>
                        form.setFieldValue("endDate", date[0])
                      }
                    />
                  )}
                </Field>
                <Label className="form-label mt-1">دلیل بسته بودن</Label>
                <Field name="closeReason" as="textarea"  className="form-control mb-1"/>

                <ModalFooter>
                  <Button color="primary" onClick={onsubmit}>
                    ذخیره
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => setCenteredModalTime(!centeredModalTime)}
                  >
                    بستن
                  </Button>
                </ModalFooter>
              </Form>
            </Formik>
          </ModalBody>
        </Modal></Col>
        
      </Row>
      </Col>

      <Col md="9">
        <Card>
          <TableTerm data={data} isLoading={isLoading} dep={dep} />
        </Card>
      </Col>
    </Row>
  );
};

export default List;
