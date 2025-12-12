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
import { Cpu } from "react-feather";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import { GetNewsCategories } from "../../../../core/Services/api/News/GetNewsCategories";
import { CreateNewsCategoryApi } from "../../../../core/Services/api/News/CreateNewsCategory";
import CategoryTable from "./CategoryTable";

const List = () => {
  const [centeredModal, setCenteredModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["newsCategories"],
    queryFn: GetNewsCategories,
    refetchOnWindowFocus: false,
    staleTime: 5 * 1000 * 60,
  });
  const queryClient = useQueryClient();
  const mutationPostTech = useMutation({
    mutationFn: (formData) => CreateNewsCategoryApi(formData),
    onSuccess: () => {
      toast.success("کتگوری با موفقیت اضافه شد");
      queryClient.invalidateQueries(["newsCategories"]);
      setCenteredModal(!centeredModal);
    },

    onError: () => toast.error("خطا در افزودن کتگوری"),
  });
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("CategoryName", values.CategoryName);
    formData.append("Image", values.Image);
    // formData.append("IconName", values.IconName);
    formData.append("GoogleTitle", values.GoogleTitle);
    formData.append("GoogleDescribe", values.GoogleDescribe);

    await mutationPostTech.mutateAsync(formData);
  };
  return (
    <Row>
      <Col xl="3" md="4" sm="6">
        <StatsVertical
          icon={<Cpu size={21} />}
          color="primary"
          stats={data?.length}
          statTitle="تعداد کتگوری ها"
        />
        <Button
          color="primary"
          style={{ width: "100%" }}
          onClick={() => setCenteredModal(!centeredModal)}
        >
          افزودن کتگوری +
        </Button>
        <Modal
          isOpen={centeredModal}
          toggle={() => setCenteredModal(!centeredModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
            افزودن کتگوری
          </ModalHeader>

          <ModalBody>
            <Formik
              initialValues={{
                GoogleDescribe: "",
                GoogleTitle: "",
                Image: "",
                CategoryName: "",
              }}
              onSubmit={handleSubmit}
            >
              <Form>
                <Field
                  name="CategoryName"
                  className="form-control mb-1"
                  placeholder="نام کتگوری"
                />
                <Field
                  name="GoogleTitle"
                  className="form-control mb-1"
                  placeholder="عنوان گوگل"
                />
                <Field
                  name="GoogleDescribe"
                  className="form-control mb-1"
                  placeholder="توضیحات گوگل"
                />
                <Field
                  className="form-control mb-1"
                  type="file"
                  id="Image"
                  name="Image"
                />

                <ModalFooter>
                  <Button color="primary" type="submit">
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
          <CategoryTable data={data} isLoading={isLoading} />
        </Card>
      </Col>
    </Row>
  );
};

export default List;
