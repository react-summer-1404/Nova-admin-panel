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
import ReactPaginate from "react-paginate";

const TableLevel = ({ data, isLoading }) => {
  const [perPage, setPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

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
            dataToRender?.map((item) => (
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
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <CustomPagination />
    </>
  );
};
export default TableLevel;
