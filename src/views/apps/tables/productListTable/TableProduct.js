// ** Custom Components
import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
// ** Images
import Avatar from "@components/avatar";

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
  Spinner,
} from "reactstrap";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editStatusList } from "../../../../core/Services/api/StatusSection";
import defaultPic from "../../../../assets/images/defalt.png";
const TableProduct = ({
  data,
  isLoading,
  setCenteredModal,
  centeredModal,
  setSelectedId,
  selectedId,
}) => {
  const handleSelect = (id) => {
    setSelectedId(id);
    setCenteredModal(false);
  };

  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>عکس</th>
            <th>عنوان</th>
            <th>وضعیت </th>
            <th>اقدام</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4" className="text-center">
                <Spinner color="primary" />
              </td>
            </tr>
          ) : (
            data?.map((item) => (
              <tr key={item.courseId}>
                <td className="fw-bold text-black">
                  <Avatar img={item.imageAddress || defaultPic} />
                </td>

                <td className="fw-bold text-black">{item.title}</td>
                <td>
                  {item.active ? (
                    <Badge color="light-success" className="rounded-pill">
                      فعال
                    </Badge>
                  ) : (
                    <Badge color="light-warning" className="rounded-pill">
                      غیرفعال
                    </Badge>
                  )}
                </td>

                <td>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => handleSelect(item.courseId)}
                  >
                    انتخاب
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};
export default TableProduct;
