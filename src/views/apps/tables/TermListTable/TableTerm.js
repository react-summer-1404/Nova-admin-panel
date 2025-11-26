// ** Custom Components
import React from "react";
import { Formik, Form, Field } from "formik";
// ** Icons Imports
import { Edit } from "react-feather";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  Label,
  Badge,
} from "reactstrap";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import Flatpickr from "react-flatpickr";

// ** Reactstrap Imports
import { Table } from "reactstrap";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editTermList } from "../../../../core/Services/api/TermSection";

const TableTerm = ({ data, isLoading, dep }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const queryClient = useQueryClient();
  const mutationEditTerm = useMutation({
    mutationFn: editTermList,
    onSuccess: () => {
      toast.success("ترم با موفقیت ویرایش شد");
      queryClient.invalidateQueries(["getTermList"]);
    },

    onError: () => toast.error("خطا در ویرایش ترم"),
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
            <th>تاریخ شروع تا پایان </th>
            <th>دپارتمان</th>
            <th>وضعیت</th>
            <th>اقدام</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4" className="text-center">
                <Spinner
                  color="primary"
                  className="d-flex justify-content-center"
                />
                ;
              </td>
            </tr>
          ) : (
            data?.map((item) => {
              return (
                <tr key={item.id}>
                  <td className="fw-bold text-black">{item.termName}</td>

                  <td style={{ display: "flex", gap: 6 }}>
                    <p>{item.startDate?.slice(0, 10)}</p> تا{" "}
                    <p>{item.endDate?.slice(0, 10)}</p>
                  </td>
                  <td className="fw-bold text-black">{item.departmentName}</td>

                  <td>
                    {item.expire ? (
                      <Badge color="light-warning">منقضی شده</Badge>
                    ) : (
                      <Badge color="light-success">منقضی نشده</Badge>
                    )}
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
        <ModalHeader toggle={handleCloseModal}>ویرایش ترم</ModalHeader>

        <ModalBody>
          {selectedItem && (
            <Formik
              initialValues={{
                termName: selectedItem.termName,
                startDate: new Date(selectedItem.startDate),
                endDate: new Date(selectedItem.endDate),
                departmentId: selectedItem.departmentId,
                expire: selectedItem.expire ? "true" : "false",
              }}
              onSubmit={(values) => {
                mutationEditTerm.mutate({
                  ...values,
                  expire:values.expire === "true",
                  id: selectedItem.id,
                });

                handleCloseModal();
              }}
            >
              {({ handleSubmit, errors }) => (
                <Form>
                  <Label className="form-label mt-1">نام ترم</Label>

                  <Field
                    name="termName"
                    className="form-control mb-1"
                    placeholder="نام ترم"
                  />
                  {errors.termName && (
                    <div
                      className="text-danger"
                      style={{ fontSize: "12px", marginBottom: "6px" }}
                    >
                      {errors.termName}
                    </div>
                  )}
                  <Label className="form-label">تاریخ شروع</Label>
                  <Field name="startDate">
                    {({ field, form }) => (
                      <Flatpickr
                        className="form-control"
                        id="startDate"
                        value={field.value}
                        onChange={(date) =>
                          form.setFieldValue("startDate", date[0])
                        }
                      />
                    )}
                  </Field>

                  <Label className="form-label mt-1">تاریخ پایان</Label>
                  <Field name="endDate">
                    {({ field, form }) => (
                      <Flatpickr
                        className="form-control"
                        id="endDate"
                        value={field.value}
                        onChange={(date) =>
                          form.setFieldValue("endDate", date[0])
                        }
                      />
                    )}
                  </Field>

                  <Label className="form-label mt-1"> دپارتمان</Label>
                  <Field
                    as="select"
                    name="departmentId"
                    className="form-control mb-1"
                    placeholder="دپارتمان کلاس"
                  >
                    {dep?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.depName}
                      </option>
                    ))}
                  </Field>
                  <Label className="form-label mt-1">وضعیت ترم</Label>

                  <Field
                    as="select"
                    name="expire"
                    className="form-control mb-1"
                    placeholder="وضعیت"
                  >
                    <option value={false}>منقضی نشده</option>
                    <option value={true}>منقضی شده</option>
                  </Field>

                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={handleSubmit}
                    >
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
export default TableTerm;
