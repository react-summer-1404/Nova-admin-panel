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
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";

// ** Reactstrap Imports
import { Table } from "reactstrap";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editDepartmentList } from "../../../../core/Services/api/DepartmentSection";

const TableTask = ({ data, isLoading ,building }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const queryClient = useQueryClient();
  const mutationEditDepartment = useMutation({
    mutationFn: editDepartmentList,
    onSuccess: () => {
      toast.success("دپارتمان با موفقیت ویرایش شد");
      queryClient.invalidateQueries(["getDepartmentList"]);
    },

    onError: () => toast.error("خطا در ویرایش دپارتمان"),
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
            <th>ساختمان </th>
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
            data?.map((item) => {
                return(
              <tr key={item.id}>
               

                <td className="fw-bold text-black">{item.depName}</td>

                <td>
                  <p>{item.buildingName}</p>
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
            )})
          )}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal
        isOpen={selectedItem ? true : false}
        toggle={handleCloseModal}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={handleCloseModal}>ویرایش دپارتمان</ModalHeader>

        <ModalBody>
          {selectedItem && (
            <Formik
              initialValues={{
                depName: selectedItem.depName,
                buildingId: selectedItem.buildingId,
               
              }}
              onSubmit={(values) => {
                mutationEditDepartment.mutate({
                  ...values,
                  id: selectedItem.id,
                });
                handleCloseModal();
              }}
            >
              {({ handleSubmit }) => (
                <Form>
                  <Label className="form-label mt-1">نام دپارتمان</Label>

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
                    {building?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.buildingName}
                      </option>
                    ))}
                  </Field>

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
export default TableTask;
