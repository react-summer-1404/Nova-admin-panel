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
import TableStatus from "../../tables/statusListTable/TableStatus";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import StatsVertical from "@components/widgets/stats/StatsVertical";
import { Info } from "react-feather";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import {
  getStatusList,
  postStatusList,
} from "../../../../core/Services/api/StatusSection";

const List = () => {
  const [centeredModal, setCenteredModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getStatusList"],
    queryFn: getStatusList,
    refetchOnWindowFocus: false,
    staleTime: 5 * 1000 * 60,
  });
  const queryClient = useQueryClient();
  const mutationPostStatusLis = useMutation({
    mutationFn: postStatusList,
    onSuccess: () => {
      toast.success("وضعیت جدید با موفقیت اضافه شد");
      queryClient.invalidateQueries(["getStatusList"]);
      setCenteredModal(!centeredModal);
    },

    onError: () => toast.error("خطا در افزودن وضعیت"),
  });

  return (
    <Row>
      <Col xl="3" md="4" sm="6">
        <StatsVertical
          icon={<Info size={21} />}
          color="info"
          stats={data?.length}
          statTitle="تعداد وضعیت دوره ها"
        />
        <Button
          color="relief-primary"
          style={{ width: "100%" }}
          onClick={() => setCenteredModal(!centeredModal)}
        >
          افزودن وضعیت +
        </Button>
        <Modal
          isOpen={centeredModal}
          toggle={() => setCenteredModal(!centeredModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
            افزودن وضعیت
          </ModalHeader>

          <ModalBody>
            <Formik
              initialValues={{
                statusName: "",
                describe: "",
                iconAddress: "",
              }}
              onSubmit={(values) => {
                mutationPostStatusLis.mutate(values);
              }}
            >
              <Form>
                <Field
                  name="statusName"
                  className="form-control mb-1"
                  placeholder="نام وضعیت"
                />
             
                <Field
                    name="describe"
                    className="form-control mb-1"
                    placeholder="توضیحات"
                  />
                <Field
                    name="statusNumber"
                    className="form-control mb-1"
                    placeholder="شماره"
                  />

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
          <TableStatus data={data} isLoading={isLoading} />
        </Card>
      </Col>
    </Row>
  );
};

export default List;
