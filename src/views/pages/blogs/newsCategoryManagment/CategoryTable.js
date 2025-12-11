// ** Custom Components
import React from "react";
import { Formik, Form, Field } from "formik";
// ** Images
import defaultpPic from "../../../../assets/images/defalt.png";
// ** Icons Imports
import { Edit, MoreVertical } from "react-feather";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Spinner,
  Label,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Reactstrap Imports
import { Table } from "reactstrap";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UpdateNewsCategoryApi } from "../../../../core/Services/api/News/UpdateNewsCategory";
import ReactPaginate from "react-paginate";
import { GetNewsCategoriesDetail } from "../../../../core/Services/api/News/GetNewsCategories";

const CategoryTable = ({ data, isLoading }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modal, setModal] = useState(false);
  const [detailId, setDetailId] = useState(false);

  // .........  استیت های مربوط به پجینیشن...........
  const [perPage, setPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  //   ...................................................

  const queryClient = useQueryClient();
  const mutationEditCat = useMutation({
    mutationFn: (formData) => UpdateNewsCategoryApi(formData),
    onSuccess: () => {
      toast.success("کتگوری با موفقیت ویرایش شد");
      queryClient.invalidateQueries(["newsCategories"]);
      handleCloseModal();
    },

    onError: () => toast.error("خطا در ویرایش کتگوری"),
  });

  const { data: detail, isLoading: detailLoading } = useQuery({
    queryKey: ["GetNewsCategoriesDetail"],
    queryFn: () => GetNewsCategoriesDetail(detailId),
    enabled: !!detailId,
    refetchOnWindowFocus: false,
  });

  const handleEditClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => setSelectedItem(null);
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("CategoryName", values.CategoryName);
    formData.append("Id", selectedItem.id);
    // formData.append("Image", values.Image);
    // formData.append("IconName", values.IconName);
    formData.append("GoogleTitle", values.GoogleTitle);
    formData.append("GoogleDescribe", values.GoogleDescribe);

    await mutationEditCat.mutateAsync(formData);
  };
  // ....................محاسبات و تایع پجینیشن.....................
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageCount = Math.ceil((data?.length || 0) / perPage);

  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={""}
      nextLabel={""}
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
  );
  //   ......................................................
  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>عنوان</th>
            <th>عنوان گوگل</th>
            <th>توضیح </th>
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
            // جای دیتا باید دیتا تو رندر بزاری
            dataToRender?.map((item) => (
              <tr key={item.id}>
                <td className="fw-bold text-black">{item.categoryName}</td>
                <td>{item.googleTitle}</td>

                <td>
                  <p style={{ color: "#7367f0" }}>{item.GoogleDescribe}</p>
                </td>

                <td>
                  {/* <Button
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
                  </Button> */}
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
                      <DropdownItem
                       onClick={() => handleEditClick(item)}
                      >
                        <Edit className="me-50" size={15} />{" "}
                        <span className="align-middle">ویرایش</span>
                      </DropdownItem>

                      <DropdownItem
                         onClick={() => {
                            setModal(!modal);
                            setDetailId(item.id);
                          }}
                      >
                        <Edit className="me-50" size={15} />{" "}
                        <span className="align-middle">جزییات</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* این رو باید بعد تیبل بزاری */}
      <CustomPagination />
      {/* ................ */}
      <Modal
        isOpen={modal}
        toggle={() => setModal(false)}
        className="modal-dialog-centered"
      >
        <ModalHeader>جزئیات </ModalHeader>
        <ModalBody>
          {detailLoading ? (
            <Spinner color="primary" />
          ) : detail ? (
            <>
            details here
              {/* <p> نام کلاس: {detail.classRoomName}</p>
              <p> ظرفیت : {detail.capacity}</p> */}
            </>
          ) : (
            <p>اطلاعات یافت نشد</p>
          )}
        </ModalBody>
      </Modal>
      <Modal
        isOpen={selectedItem ? true : false}
        toggle={handleCloseModal}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={handleCloseModal}>ویرایش کتگوری</ModalHeader>

        <ModalBody>
          {selectedItem && (
            <Formik
              initialValues={{
                GoogleTitle: selectedItem.googleTitle,
                GoogleDescribe: selectedItem.GoogleDescribe,
                CategoryName: selectedItem.categoryName,
              }}
           
              onSubmit={handleSubmit}
            >
              <Form>
                <Label>نام کتگوری</Label>
                <Field
                  name="CategoryName"
                  className="form-control mb-1"
                  placeholder="نام کتگوری"
                />
                <Label>عنوان گوگل</Label>

                <Field
                  name="GoogleTitle"
                  className="form-control mb-1"
                  placeholder="عنوان گوگل"
                />
                <Label>توضیحات گوگل</Label>
                <Field
                  name="GoogleDescribe"
                  className="form-control mb-1"
                  placeholder="توضیحات گوگل"
                />

                <ModalFooter>
                  <Button color="primary" type="submit">
                    ذخیره
                  </Button>
                  <Button color="secondary" onClick={handleCloseModal}>
                    بستن
                  </Button>
                </ModalFooter>
              </Form>
            </Formik>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};
export default CategoryTable;
