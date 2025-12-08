// ** Custom Components
import React from "react";
import { Formik, Form, Field } from "formik";
// ** Icons Imports
import { Edit, MoreVertical } from "react-feather";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  Label,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
  editTermList,
  editTermListTime,
  getTermDetail,
} from "../../../../core/Services/api/TermSection";
import ReactPaginate from "react-paginate";

const TableTerm = ({ data, isLoading, dep }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemTime, setSelectedItemTime] = useState(null);
  const [perPage, setPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();
  const mutationEditTerm = useMutation({
    mutationFn: editTermList,
    onSuccess: () => {
      toast.success("ترم با موفقیت ویرایش شد");
      queryClient.invalidateQueries(["getTermList"]);
    },

    onError: () => toast.error("خطا در ویرایش ترم"),
  });
  const mutationEditTermTime = useMutation({
    mutationFn: editTermListTime,
    onSuccess: () => {
      toast.success("زمان ترم با موفقیت ویرایش شد");
    },

    onError: () => toast.error("خطا در ویرایش زمان ترم"),
  });

  const handleEditClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => setSelectedItem(null);

  const handleEditTimeClick = (item) => {
    setSelectedItemTime(item);
  };

  const handleCloseTimeModal = () => setSelectedItemTime(null);
  const [modal, setModal] = useState(false);
  const [detailId, setDetailId] = useState(false);
  const { data: detail, isLoading: detailLoading } = useQuery({
    queryKey: ["getTermDetail"],
    queryFn: () => getTermDetail(detailId),
    enabled: !!detailId,
    refetchOnWindowFocus: false,
  });

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const pageCount = Math.ceil((data?.length || 0) / perPage);
  
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      activeClassName="active"
      forcePage={currentPage - 1}
      onPageChange={(page) => handlePagination(page.selected + 1)}
      pageClassName="page-item"
      breakClassName="page-item"
      nextLinkClassName="page-link"
      pageLinkClassName="page-link"
      breakLinkClassName="page-link"
      previousLinkClassName="page-link"
      nextClassName="page-item next-item"
      previousClassName="page-item prev-item"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
    />
  );
  
  const dataToRender = data?.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  )
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
            dataToRender?.map((item) => {
              return (
                <tr key={item.id}>
                  <td
                    className="fw-bold text-black"
                    onClick={() => {
                      setModal(!modal);
                      setDetailId(item.id);
                    }}
                  >
                    {item.termName}
                  </td>

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
                          <span className="align-middle">ادیت ترم</span>
                        </DropdownItem>
                        <DropdownItem onClick={() => handleEditTimeClick(item)}>
                          <Edit className="me-50" size={15} />{" "}
                          <span className="align-middle">ادیت زمان</span>
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
      <CustomPagination/>
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
              <p> نام ترم: {detail.termName}</p>
              <p> تاریخ شروع : {detail.startDate?.slice(0, 10)}</p>
              <p> تاریخ پایان : {detail.endDate?.slice(0, 10)}</p>
              <p>
                {" "}
                وضعیت :{" "}
                {detail.expire ? (
                  <Badge color="light-success">منقضی نشده</Badge>
                ) : (
                  <Badge color="light-danger">منقضی شده</Badge>
                )}
              </p>
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
                  expire: values.expire === "true",
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

      <Modal
        isOpen={selectedItemTime ? true : false}
        toggle={handleCloseTimeModal}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={handleCloseTimeModal}>ویرایش ترم</ModalHeader>

        <ModalBody>
          {selectedItemTime && (
            <Formik
              initialValues={{
                termId: selectedItemTime.termId,
                startCloseDate: selectedItemTime.startCloseDate
                  ? new Date(selectedItemTime.startCloseDate)
                  : "",
                endCloseDate: selectedItemTime.endCloseDate
                  ? new Date(selectedItemTime.endCloseDate)
                  : "",
                closeReason: selectedItemTime.closeReason || "",
              }}
              onSubmit={(values) => {
                mutationEditTermTime.mutate({
                  ...values,
                  id: selectedItemTime.id,
                });

                handleCloseTimeModal();
              }}
            >
              {({ handleSubmit }) => (
                <Form>
                  <Label className="form-label mt-1"> ترم</Label>
                  <Field
                    as="select"
                    name="termId"
                    className="form-control mb-1"
                  >
                    {data?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.termName}
                      </option>
                    ))}
                  </Field>

                  <Label className="form-label">تاریخ شروع</Label>
                  <Field name="startCloseDate">
                    {({ field, form }) => (
                      <Flatpickr
                        className="form-control"
                        id="startCloseDate"
                        value={field.value ? new Date(field.value) : null}
                        onChange={(date) =>
                          form.setFieldValue("startCloseDate", date[0])
                        }
                      />
                    )}
                  </Field>

                  <Label className="form-label mt-1">تاریخ پایان</Label>
                  <Field name="endCloseDate">
                    {({ field, form }) => (
                      <Flatpickr
                        className="form-control"
                        id="endCloseDate"
                        value={field.value ? new Date(field.value) : null}
                        onChange={(date) =>
                          form.setFieldValue("endCloseDate", date[0])
                        }
                      />
                    )}
                  </Field>

                  <Label className="form-label mt-1">دلیل بسته بودن</Label>

                  <Field
                    as="textarea"
                    name="closeReason"
                    className="form-control mb-1"
                    placeholder="وضعیت"
                  />

                  <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>
                      ذخیره
                    </Button>

                    <Button color="secondary" onClick={handleCloseTimeModal}>
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
