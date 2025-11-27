// ** Custom Components
import React from "react";
// ** Images
import Avatar from "@components/avatar";

import defaultpPic from "../../../../assets/images/defalt.png";

// ** Reactstrap Imports
import { Table, Spinner } from "reactstrap";
import { Alert } from "reactstrap";
const TableUserList = ({ data, isLoading, selectedId }) => {
  if (!selectedId) {
    return (
      <div className="text-center p-4">
        <Alert color="primary">
          <div className="alert-body">
            <span className="fw-bold">لطفا یک دوره را انتخاب کنید</span>
          </div>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Spinner color="primary" className="d-flex justify-content-center" />
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center p-4">
        <Alert color="warning">
          <div className="alert-body">
            <span className="fw-bold">کاربری برای این دوره یافت نشد</span>
          </div>
        </Alert>
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
                <Avatar img={item.currentPictureAddress || defaultpPic} />
              </td>

              <td className="fw-bold text-black">
                <span>{item.fName}</span>
                <span style={{ marginLeft: 8, marginRight: 8 }}>
                  {item.lName}
                </span>
              </td>

              <td className="fw-bold text-black">{item.gmail}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default TableUserList;
