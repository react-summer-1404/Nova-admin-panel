import React, { useEffect } from "react";
import { Card, Row, Col, Button, ModalFooter } from "reactstrap";
// import TableTech from "../../tables/techListTable/TableTech";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import StatsVertical from "@components/widgets/stats/StatsVertical";
import { Cpu } from "react-feather";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";

// ** Import APIs
import { UpdateNewsCategoryApi } from "../../../../../../core/Services/api/News/UpdateNewsCategory";

const EditNewsCategoryForm = ({newsId}) => {
  const [centeredModal, setCenteredModal] = useState(false);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (newsId) {
      instance.get(`/News/GetNewsCategory/${newsId}`).then((res) => {
        setInitialData(res.data);
      });
    }
  }, [blogId]);

  const { mutateAsync } = useMutation({
    mutationFn: UpdateNewsCategoryApi,
    onSuccess: () => {
      toast.success("دسته بندی با موفقیت اضافه شد");
    },
    onError: () => {
      toast.error("خطا در افزودن دسته‌بندی");
    },
  });

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("CategoryName", values.CategoryName);
    formData.append("Image", values.Image);
    formData.append("IconName", values.IconName);
    formData.append("GoogleTitle", values.GoogleTitle);
    formData.append("GoogleDescribe", values.GoogleDescribe);

    await mutateAsync(formData);
  };

  return (
    <Row>
      <Formik
        initialValues={{
          CategoryName: initialData?.detailsNewsDto?.title || "",
          Image: "",
          IconName: "",
          GoogleTitle: "",
          GoogleDescribe: "",
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field
            name="CategoryName"
            className="form-control mb-1"
            placeholder="نام دسته بندی"
          />
          <Field
            name="IconName"
            className="form-control mb-1"
            placeholder="نام آیکن"
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

      <Col md="9">
        <Card>{/* <TableTech data={data} isLoading={isLoading} /> */}</Card>
      </Col>
    </Row>
  );
};

export default EditNewsCategoryForm;
