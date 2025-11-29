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
  Spinner,
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  deleteGroup,
  editGroup,
} from "../../../../../../core/Services/api/getGroup";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../store";
import { Link } from "react-router-dom";
import {
  editMentor,
  getMentorDetail,
} from "../../../../../../core/Services/api/Mentor";
// import { useSelector } from "react-redux";

const EditTable = ({ data, courseId, store }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [centeredModal, setCenteredModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [detailId, setDetailId] = useState(false);
  const dispatch = useDispatch();

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setCenteredModal(true);
  };
  console.log(selectedItem);
  const mutationEditMentor = useMutation({
    mutationFn: (apiData) => editMentor(apiData),
    onError: (error) => {
      toast.error("خطایی رخ داد");
      console.log("error", error);
    },
    onSuccess: () => {
      toast.success("منتور انتخاب شد");
      dispatch(getData({ courseId }));
      setCenteredModal(!centeredModal);
    },
  });
  const { data: detail,isLoading } = useQuery({
    queryKey: ["detailMentor"],
    queryFn: () => getMentorDetail(detailId),
    enabled: !!detailId,
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>نام منتور</th>
            <th>تاریخ ثبت </th>
            <th>اقدام</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td
                className="fw-bold text-black"
                onClick={() => {
                  setModal(!modal);
                  setDetailId(item.id);
                }}
              >
                {item.assistanceName}
              </td>
              <td>{item.inserDate?.slice(0, 10)}</td>
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
      <Modal
        isOpen={modal}
        toggle={() => setModal(false)}
        className="modal-dialog-centered"
      >
        <ModalHeader>جزئیات منتور</ModalHeader>
        <ModalBody>
          {isLoading ? (
            <Spinner color="primary"/>
          ) : detail ? (
            <>
              <p>تاریخ ثبت: {detail.inserDate?.slice(0, 10)}</p>
            </>
          ) : (
            <p>اطلاعات یافت نشد</p>
          )}
        </ModalBody>
      </Modal>

      {/* Modal */}

      <Modal
        isOpen={centeredModal}
        toggle={() => setCenteredModal(false)}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => setCenteredModal(false)}>
          انتخاب منتور
        </ModalHeader>

        <ModalBody>
          {selectedItem && (
            <Formik
              initialValues={{
                userId: selectedItem.userId,
                courseId: courseId,
                id: selectedItem.id,
              }}
              onSubmit={(values) => {
                mutationEditMentor.mutate(values);
                console.log("values", values);
              }}
            >
              {({ handleSubmit }) => (
                <Form>
                  <Field
                    as="select"
                    name="userId"
                    className="form-control mb-1"
                  >
                    {store?.map((s) => (
                      <option key={s.id} value={s.userId}>
                        {s.assistanceName}
                      </option>
                    ))}
                  </Field>

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
