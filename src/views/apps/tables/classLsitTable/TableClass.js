// ** Custom Components
import React from "react";
import { Formik, Form, Field } from "formik";
// ** Icons Imports
import { Edit } from "react-feather";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from "reactstrap";

// ** Reactstrap Imports
import { Table } from "reactstrap";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editClassist } from "../../../../core/Services/api/ClassSection";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  classRoomName: Yup.string().required("*الزامی"),

  capacity: Yup.number("این فیلد باید عدد باشد").required("*الزامی"),

  buildingId: Yup.string().required("*الزامی"),
});
const TableClass = ({ data, isLoading, building }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const queryClient = useQueryClient();
  const mutationEditClass = useMutation({
    mutationFn: editClassist,
    onSuccess: () => {
      toast.success("کلاس با موفقیت ویرایش شد");
      queryClient.invalidateQueries(["getClassList"]);
    },

    onError: () => toast.error("خطا در ویرایش کلاس"),
  });

  const handleEditClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => setSelectedItem(null);

  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>عنوان</th>
            <th>ظرفیت </th>
            <th>ساختمان</th>
            <th>اقدام</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4" className="text-center">
               <Spinner color="primary" className='d-flex justify-content-center'/>;

              </td>
            </tr>
          ) : (
            data?.map((item) => {
              const buildingName = building?.find(
                (b) => b.id == item?.buildingId
              );

              return (
                <tr key={item.id}>
                  <td className="fw-bold text-black">{item.classRoomName}</td>

                  <td>
                    <p>{item.capacity}</p>
                  </td>
                  <td>
                    <p>{buildingName.buildingName}</p>
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
              );
            })
          )}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal
        isOpen={selectedItem ? true : false}
        toggle={handleCloseModal}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={handleCloseModal}>ویرایش کلاس</ModalHeader>

        <ModalBody>
          {selectedItem && (
            <Formik
              initialValues={{
                classRoomName: selectedItem.classRoomName,
                capacity: selectedItem.capacity,
                buildingId: selectedItem.buildingName,
              }}
              onSubmit={(values) => {
                mutationEditClass.mutate({
                  ...values,
                  id: selectedItem.id,
                });
                handleCloseModal();
              }}
              validationSchema={validationSchema}
            >
              {({ handleSubmit, errors }) => (
                <Form>
                  <Field
                    name="classRoomName"
                    className="form-control mb-1"
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
                    className="form-control mb-1"
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
                    className="form-control mb-1"
                    placeholder="ساختمان کلاس"
                  >
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
                    <Button color="primary" onClick={handleSubmit}>
                      ذخیره
                    </Button>
                    <Button color="secondary" onClick={handleCloseModal}>
                      بستن
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};
export default TableClass;
