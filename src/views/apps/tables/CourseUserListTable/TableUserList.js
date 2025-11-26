// ** Custom Components
import React from "react";
import { Formik, Form, Field } from "formik";
// ** Images
import Avatar from "@components/avatar";

import defaultpPic from "../../../../assets/images/defalt.png";

// ** Reactstrap Imports
import {
  Table,
  Spinner,
} from "reactstrap";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editStatusList } from "../../../../core/Services/api/StatusSection";
import defaultPic from "../../../../assets/images/defalt.png";

const TableUserList = ({ data, isLoading, selectedId }) => {
  if (!selectedId) {
    return (
      <div className="text-center p-4">
        <h5>لطفاً یک دوره انتخاب کنید</h5>
      </div>
    );
  }

  if (isLoading) {
    return <Spinner color="primary" className='d-flex justify-content-center'/>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center p-4">
        <h5>کاربری برای این دوره یافت نشد</h5>
      </div>
    );
  }

  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>عکس</th>
            <th>نام</th>
            <th>ایمیل </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td className="fw-bold text-black">
                <Avatar img={item.currentPictureAddress||defaultpPic} />
              </td>

              <td className="fw-bold text-black">{item.fName}</td>
              <td className="fw-bold text-black">{item.gmail}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default TableUserList;
