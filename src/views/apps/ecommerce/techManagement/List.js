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
import TableTech from "../../tables/techListTable/TableTech";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTechList,
  postTechList,
} from "../../../../core/Services/api/TechSection";
import StatsVertical from "@components/widgets/stats/StatsVertical";
import { Cpu } from "react-feather";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";

const List = () => {
  const [centeredModal, setCenteredModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["getTechList"],
    queryFn: getTechList,
    refetchOnWindowFocus: false,
    staleTime: 5 * 1000 * 60,
  });
  const queryClient = useQueryClient();
  const mutationPostTech = useMutation({
    mutationFn: postTechList,
    onSuccess: () => {
      toast.success("تکنولوژی با موفقیت اضافه شد");
      queryClient.invalidateQueries(["getTechList"]);
      setCenteredModal(!centeredModal);
    },

    onError: () => toast.error("خطا در افزودن تکنولوژی"),
  });

  return (
    <Row>
      <Col xl="3" md="4" sm="6">
        <StatsVertical
          icon={<Cpu size={21} />}
          color="primary"
          stats={data?.length}
          statTitle="تعداد تکنولوژی ها"
        />
        <Button
          color="primary"
          style={{ width: "100%" }}
          onClick={() => setCenteredModal(!centeredModal)}
        >
          افزودن تکنولوژِی +
        </Button>
        <Modal
          isOpen={centeredModal}
          toggle={() => setCenteredModal(!centeredModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
            افزودن تکنولوژی
          </ModalHeader>

          <ModalBody>
            <Formik
              initialValues={{
                techName: "",
                describe: "",
                iconAddress: "",
              }}
              onSubmit={(values) => {
                mutationPostTech.mutate(values);
              }}
            >
              <Form>
                <Field
                  name="techName"
                  className="form-control mb-1"
                  placeholder="نام تکنولوژی"
                />
                <Field
                  name="describe"
                  className="form-control mb-1"
                  placeholder="توضیحات"
                />
                <Field
                  name="iconAddress"
                  className="form-control mb-1"
                  placeholder="آدرس آیکون"
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
          <TableTech data={data} isLoading={isLoading} />
        </Card>
      </Col>
    </Row>
  );
};

export default List;
