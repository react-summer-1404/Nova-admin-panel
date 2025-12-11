// ** Custom Components
import React from "react";
import { Formik, Form, Field } from "formik";
// ** Images
import defaultpPic from "../../../../assets/images/defalt.png";
// ** Icons Imports
import { Edit } from "react-feather";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Spinner,
  Label,
} from "reactstrap";

// ** Reactstrap Imports
import { Table } from "reactstrap";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTechList } from "../../../../core/Services/api/TechSection";
import toast from "react-hot-toast";
import { UpdateNewsCategoryApi } from "../../../../core/Services/api/News/UpdateNewsCategory";

const CategoryTable = ({ data, isLoading }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const queryClient = useQueryClient();
  const mutationEditCat = useMutation({
    mutationFn: (formData)=>UpdateNewsCategoryApi(formData),
    onSuccess: () => {
      toast.success("کتگوری با موفقیت ویرایش شد");
      queryClient.invalidateQueries(["newsCategories"]);
      handleCloseModal()
    },

    onError: () => toast.error("خطا در ویرایش کتگوری"),
  });

  const handleEditClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => setSelectedItem(null);
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("CategoryName", values.CategoryName);
    formData.append("Id", selectedItem.id);
    // formData.append("Image", values.Image);
    // formData.append("IconName", values.IconName);
    formData.append("GoogleTitle", values.GoogleTitle);
    formData.append("GoogleDescribe", values.GoogleDescribe);

    await mutationEditCat.mutateAsync(formData);
  };
  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>عنوان</th>
            <th>عنوان گوگل</th>
            <th>توضیح </th>
            <th>اقدام</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4" className="d-flex justify-content-center">
                <Spinner
                  color="primary"
                  className="d-flex justify-content-center"
                />
                ;
              </td>
            </tr>
          ) : (
            data?.map((item) => (
              <tr key={item.id}>
                <td className="fw-bold text-black">{item.categoryName}</td>
                <td>{item.googleTitle}</td>

                <td>
                  <p style={{ color: "#7367f0" }}>{item.GoogleDescribe}</p>
                </td>

                <td>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => handleEditClick(item)}
                  >
                    <Edit
                      size={15}
                      className="ms-50"
                      style={{ marginLeft: "6px" }}
                    />
                    ادیت
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal
        isOpen={selectedItem ? true : false}
        toggle={handleCloseModal}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={handleCloseModal}>ویرایش کتگوری</ModalHeader>

        <ModalBody>
          {selectedItem && (
            <Formik
              initialValues={{
                GoogleTitle: selectedItem.googleTitle,
                GoogleDescribe: selectedItem.GoogleDescribe,
                CategoryName: selectedItem.categoryName,
              }}
            //   onSubmit={(values) => {
            //     mutationEditTech.mutate({
            //       ...values,
            //       id: selectedItem.id,
            //     });
            //     handleCloseModal();
            //   }}
            onSubmit={handleSubmit}
            >
              {/* {({ handleSubmit }) => ( */}
                <Form>
                  <Label>نام کتگوری</Label>
                  <Field
                    name="CategoryName"
                    className="form-control mb-1"
                    placeholder="نام کتگوری"
                  />
                  <Label>عنوان گوگل</Label>

                  <Field
                    name="GoogleTitle"
                    className="form-control mb-1"
                    placeholder="عنوان گوگل"
                  />
                  <Label>توضیحات گوگل</Label>
                  <Field
                    name="GoogleDescribe"
                    className="form-control mb-1"
                    placeholder="توضیحات گوگل"
                  />

                  <ModalFooter>
                    <Button color="primary" type="submit">
                      ذخیره
                    </Button>
                    <Button color="secondary" onClick={handleCloseModal}>
                      بستن
                    </Button>
                  </ModalFooter>
                </Form>
              {/* )} */}
            </Formik>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};
export default CategoryTable;
