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
import { Link } from "react-router-dom";
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
 
  const mutationEditSocialGroup = useMutation({
    mutationFn: (apiData) => editGroup(apiData),
    onError: (error) => {
      toast.error("خطایی رخ داد");
      console.log("error", error);
    },
    onSuccess: () => {
      toast.success("گروه ویرایش شد");
      dispatch(getData({ courseId }));
      setCenteredModal(!centeredModal);
    },
  });

  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>نام گروه</th>
            <th>لینک </th>
            <th>اقدام</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td className="fw-bold text-black">{item.groupName}</td>
              <td className="fw-bold text-black">
                <a href={item.groupLink} target="_blank">
                {item.groupLink}
                </a>
              </td>
              <td>
                <Button color="primary" onClick={() => handleEditClick(item)}>
                  <Edit className="me-50" size={15} />{" "}
                  <span className="align-middle">ویرایش</span>
                </Button>
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
                groupName: selectedItem.groupName,
                groupLink: selectedItem.groupLink,
                CourseId: courseId,
                id: selectedItem.id,
              }}
              onSubmit={(values) => {
                mutationEditSocialGroup.mutate(values);
                console.log("values",values)
              }}
            >
              {({ handleSubmit }) => (
                <Form>
                  <Field
                    name="groupName"
                    className="form-control mb-1"
                    placeholder="نام گروه'"
                  />
                  <Field
                    name="groupLink"
                    className="form-control mb-1"
                    placeholder="لینک"
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
