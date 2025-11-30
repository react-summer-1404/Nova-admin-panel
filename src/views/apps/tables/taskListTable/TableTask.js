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
import Flatpickr from "react-flatpickr";

// ** Reactstrap Imports
import { Table } from "reactstrap";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  editTaskList,
  getTaskDetail,
} from "../../../../core/Services/api/TaskSection";

const TableTask = ({ data, isLoading, mentor }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const queryClient = useQueryClient();
  const mutationEditTask = useMutation({
    mutationFn: editTaskList,
    onSuccess: () => {
      toast.success("تسک با موفقیت ویرایش شد");
      queryClient.invalidateQueries(["getTaskList"]);
    },

    onError: () => toast.error("خطا در ویرایش تسک"),
  });

  const handleEditClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => setSelectedItem(null);
  const [modal, setModal] = useState(false);
  const [detailId, setDetailId] = useState(false);
  const { data: detail, isLoading: detailLoading } = useQuery({
    queryKey: ["getTaskDetail"],
    queryFn: () => getTaskDetail(detailId),
    enabled: !!detailId,
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>عنوان</th>
            <th>توضیح </th>
            <th>تاریخ </th>
            <th>منتور </th>
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
              const mentorName = mentor?.find(
                (b) => b.id == item?.assistanceId
              );
              return (
                <tr key={item.id}>
                  <td
                    className="fw-bold text-black"
                    onClick={() => {
                      setModal(!modal);
                      setDetailId(item.id);
                    }}
                  >
                    {item.worktitle}
                  </td>

                  <td>
                    <p style={{ color: "#7367f0" }}>{item.workDescribe}</p>
                  </td>

                  <td>
                    <p>{item.workDate?.slice(0, 10)}</p>
                  </td>

                  <td>
                    <p className="fw-bold">{mentorName?.assistanceName}</p>
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
      <Modal
        isOpen={modal}
        toggle={() => setModal(false)}
        className="modal-dialog-centered"
      >
        <ModalHeader>جزئیات کلاس</ModalHeader>
        <ModalBody>
          {detailLoading ? (
            <Spinner color="primary" />
          ) : detail ? (
            <>
              <p> نام تسک: {detail.worktitle}</p>
              <p> توضیحات تسک : {detail.workDescribe}</p>
              <p> تاریخ تسک : {detail.workDate?.slice(0, 10)}</p>
            </>
          ) : (
            <p>اطلاعات یافت نشد</p>
          )}
        </ModalBody>
      </Modal>
      {/* Modal */}
      <Modal
        isOpen={selectedItem ? true : false}
        toggle={handleCloseModal}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={handleCloseModal}>ویرایش تکنولوژی</ModalHeader>

        <ModalBody>
          {selectedItem && (
            <Formik
              initialValues={{
                worktitle: selectedItem.worktitle,
                workDescribe: selectedItem.workDescribe,
                assistanceId: selectedItem.assistanceId,
                workDate: selectedItem.workDate
                  ? new Date(selectedItem.workDate)
                  : "",
              }}
              onSubmit={(values) => {
                mutationEditTask.mutate({
                  ...values,
                  id: selectedItem.id,
                });
                handleCloseModal();
              }}
            >
              {({ handleSubmit }) => (
                <Form>
                  <Label className="form-label mt-1">عنوان تسک</Label>

                  <Field
                    name="worktitle"
                    className="form-control mb-1"
                    placeholder="نام تسک"
                  />
                  <Label className="form-label mt-1">توضیحات تسک</Label>

                  <Field
                    as="textarea"
                    name="workDescribe"
                    className="form-control mb-1"
                    placeholder="توضیحات"
                  />
                  <Label className="form-label mt-1">تاریخ تسک</Label>
                  <Field name="workDate">
                    {({ field, form }) => (
                      <Flatpickr
                        className="form-control"
                        id="workDate"
                        value={field.value ? new Date(field.value) : null}
                        onChange={(date) =>
                          form.setFieldValue("workDate", date[0])
                        }
                      />
                    )}
                  </Field>

                  <Label className="form-label mt-1"> منتور</Label>
                  <Field
                    as="select"
                    name="assistanceId"
                    className="form-control mb-1"
                    placeholder="منتور تسک"
                  >
                    {mentor?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.assistanceName}
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
