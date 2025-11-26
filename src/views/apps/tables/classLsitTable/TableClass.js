// ** Custom Components
import React from "react";
import { Formik, Form, Field } from "formik";
// ** Images
import defaultpPic from "../../../../assets/images/defalt.png";
// ** Icons Imports
import { MoreVertical, Edit, Trash } from "react-feather";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";

// ** Reactstrap Imports
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editClassist } from "../../../../core/Services/api/ClassSection";

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
                در حال بارگذاری...
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
            >
              {({ handleSubmit }) => (
                <Form>
                  <Field
                    name="classRoomName"
                    className="form-control mb-1"
                    placeholder="نام کلاس"
                  />
                  <Field
                  type="number"
                    name="capacity"
                    className="form-control mb-1"
                    placeholder="ظرفیت"
                  />
                  <Field
                  as="select"
                    name="buildingId"
                    className="form-control mb-1"
                    placeholder="ساختمان کلاس"
                   
                  >
                    {building?.map((build)=>(
                      <option key={build.id} value={build.id}>{build.buildingName}</option>
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
export default TableClass;
