import React, { useEffect } from "react";
import Avatar from "@components/avatar";
// ** Icons Imports
import { MoreVertical, Edit, Trash } from "react-feather";
import {
    Button,
} from "reactstrap";

// ** Reactstrap Imports
import {
  Table,
  Badge,
  Spinner,
} from "reactstrap";

import defaultPic from "../../../../assets/images/defalt.png";
const UserModelTable = ({
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
            <th>نام کاربر</th>
            <th>ایمیل کاربر </th>
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
              <tr key={item.id}>
                <td className="fw-bold text-black">
                  <Avatar img={item.pictureAddress || defaultPic} />
                </td>

                <td className="fw-bold text-black">{item.fName}</td>

                <td>{item.gmail}</td>

                <td>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => handleSelect(item.id)}
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
export default UserModelTable;
