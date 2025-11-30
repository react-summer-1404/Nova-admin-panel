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
import { editStatusList } from "../../../../core/Services/api/StatusSection";

const TableLevel = ({ data, isLoading }) => {
  // const [selectedItem, setSelectedItem] = useState(null);
  // const queryClient = useQueryClient();
  // const mutationEditStatus = useMutation({
  //   mutationFn: editStatusList,
  //   onSuccess: () => {
  //     toast.success("وضعیت با موفقیت ویرایش شد");
  //     queryClient.invalidateQueries(["getStatusList"]);
  //   },

  //   onError: () => toast.error("خطا در ویرایش وضعیت"),
  // });

  // const handleEditClick = (item) => {
  //   setSelectedItem(item);
  // };

  // const handleCloseModal = () => setSelectedItem(null);

  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
          <th>عکس</th>
            <th>عنوان</th>
            {/* <th>توضیح </th> */}
            {/* <th>اقدام</th> */}
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
            data?.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    className="me-75 rounded"
                    src={item.iconAddress || defaultpPic}
                    height="30"
                    width="30"
                  />
                </td>

                <td className="fw-bold text-black">{item.levelName}</td>
                {/* <td className="fw-bold text-black">{item.describe}</td> */}
                {/* <td>
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
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </Table>


      {/* <Modal
        isOpen={selectedItem ? true : false}
        toggle={handleCloseModal}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={handleCloseModal}>ویرایش وضعیت</ModalHeader>

        <ModalBody>
          {selectedItem && (
            <Formik
              initialValues={{
                statusName: selectedItem.statusName,
                describe: selectedItem.describe,
                statusNumber: selectedItem.statusNumber,
              }}
              onSubmit={(values) => {
                mutationEditStatus.mutate({
                  ...values,
                  id: selectedItem.id,
                });
                handleCloseModal();
              }}
            >
              {({ handleSubmit }) => (
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
                  type="number"
                    name="statusNumber"
                    className="form-control mb-1"
                    placeholder="شماره"
                  />

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
      </Modal> */}
    </>
  );
};
export default TableLevel;
