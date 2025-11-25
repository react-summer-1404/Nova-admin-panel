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
import { Layers } from "react-feather";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import TableLevel from "../../tables/levelListTable/TableStatus";
import { getLevelList, postLevelList } from "../../../../core/Services/api/levelSection";

const List = () => {
  const [centeredModal, setCenteredModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getLevelList"],
    queryFn: getLevelList,
    refetchOnWindowFocus: false,
    staleTime: 5 * 1000 * 60,
  });
  const queryClient = useQueryClient();
  const mutationPostLevelLis = useMutation({
    mutationFn: postLevelList,
    onSuccess: () => {
      toast.success("سطح جدید با موفقیت اضافه شد");
      queryClient.invalidateQueries(["getLevelList"]);
      setCenteredModal(!centeredModal);
    },

    onError: () => toast.error("خطا در افزودن سطح جدید"),
  });

  return (
    <Row>
      <Col xl="3" md="4" sm="6">
        <StatsVertical
          icon={<Layers size={21} />}
          color="primary"
          stats={data?.length}
          statTitle="تعداد سطح دوره ها"
        />
        <Button
          color="relief-primary"
          style={{ width: "100%" }}
          onClick={() => setCenteredModal(!centeredModal)}
        >
          افزودن سطح دوره +
        </Button>
        <Modal
          isOpen={centeredModal}
          toggle={() => setCenteredModal(!centeredModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
            افزودن سطح
          </ModalHeader>

          <ModalBody>
            <Formik
              initialValues={{
                levelName: ""
              }}
              onSubmit={(values) => {
                mutationPostLevelLis.mutate(values);
              }}
            >
              <Form>
                <Field
                  name="levelName"
                  className="form-control mb-1"
                  placeholder="نام سطح"
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
          <TableLevel data={data} isLoading={isLoading} />
        </Card>
      </Col>
    </Row>
  );
};

export default List;
