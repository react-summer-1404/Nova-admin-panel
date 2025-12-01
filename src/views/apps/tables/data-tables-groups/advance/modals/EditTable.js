// ** Custom Components
import React from "react";
import { Formik, Form, Field } from "formik";
// ** Images
// import defaultpPic from "../../../../assets/images/defalt.png";
// ** Icons Imports
import { MoreVertical, Edit, CheckCircle, XCircle } from "react-feather";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  InputGroup,
  Input,
  InputGroupText,
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
import {
  deleteGroup,
  editGroup,
} from "../../../../../../core/Services/api/getGroup";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../store";
// import { useSelector } from "react-redux";

const EditTable = ({ data, courseId }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [centeredModal, setCenteredModal] = useState(false);
  const dispatch = useDispatch();
  const teacherId = useSelector(
    (state) => state.ecommerce.productDetail.teacherId
  );
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setCenteredModal(true);
  };
  const mutationDeleteGroup = useMutation({
    mutationFn: (formData) => deleteGroup(formData),
    onError: (error) => {
      toast.error("خطایی رخ داد");
      console.log("error", error);
    },
    onSuccess: () => {
      toast.success("گروه حذف شد");
      dispatch(getData({ courseId, teacherId }));
    },
  });
  const mutationEditGroup = useMutation({
    mutationFn: (formData) => editGroup(formData),
    onError: (error) => {
      toast.error("خطایی رخ داد");
      console.log("error", error);
    },
    onSuccess: () => {
      toast.success("گروه ویرایش شد");
      dispatch(getData({ courseId, teacherId }));
      setCenteredModal(!centeredModal);
    },
  });

  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>نام گروه</th>
            <th>ظرفیت </th>
            <th>اقدام</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td className="fw-bold text-black">{item.title}</td>
              <td className="fw-bold text-black">{item.groupCapacity}</td>
              <td>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="icon-btn hide-arrow"
                    color="transparent"
                    size="sm"
                    caret
                  >
                    <MoreVertical size={15} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => handleEditClick(item)}>
                      <Edit className="me-50" size={15} />{" "}
                      <span className="align-middle">ویرایش</span>
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        const fd = new FormData();
                        fd.append("Id", item.id);
                        mutationDeleteGroup.mutate(fd);
                      }}
                    >
                      <XCircle className="me-50" size={15} />
                      <span className="align-middle">حذف</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}

      <Modal
        isOpen={centeredModal}
        toggle={() => setCenteredModal(false)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setCenteredModal(false)}>
          ویرایش وضعیت
        </ModalHeader>

        <ModalBody>
          {selectedItem && (
            <Formik
              initialValues={{
                GroupName: selectedItem.title,
                GroupCapacity: selectedItem.groupCapacity,
                CourseId: courseId,
                Id: selectedItem.id,
              }}
              onSubmit={(values) => {
                const formData = new FormData();
                formData.append("GroupName", values.GroupName);
                formData.append("GroupCapacity", values.GroupCapacity);
                formData.append("CourseId", values.CourseId);
                formData.append("Id", values.Id);
                mutationEditGroup.mutate(formData);
              }}
            >
              {({ handleSubmit }) => (
                <Form>
                  <Field
                    name="GroupName"
                    className="form-control mb-1"
                    placeholder="نام گروه'"
                  />
                  <Field
                    type="number"
                    name="GroupCapacity"
                    className="form-control mb-1"
                    placeholder="ظرفیت"
                  />

                  <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>
                      ذخیره
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => setCenteredModal(false)}
                    >
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
export default EditTable;
