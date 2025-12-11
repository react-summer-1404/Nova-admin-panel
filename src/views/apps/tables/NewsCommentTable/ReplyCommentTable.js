// ** React Import
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// ** Custom Components

// ** Images

// ** Icons Imports
import { MoreVertical, Edit, Trash, XSquare, Check, Eye } from "react-feather";

// ** APIs Imports

// ** Reactstrap Imports
import { Col, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import toast from "react-hot-toast";
import instance from "../../../../core/interseptor/Interseptor";

const ReplyCommentTable = ({userName,replies }) => {

  const navigate = useNavigate();

  return (
    <Table responsive>
      <thead>
        <tr>
          <th >کاربر</th>
          <th>عنوان کامنت</th>
          <th >نمایش کامنت</th>
        </tr>
      </thead>
      {replies?.map((item, index) => {
        return (
          <tbody>
            <tr key={item.id}>
              <td>{userName}</td>
              <td>{item?.title}</td>
              <td>{item?.describe}</td>
            </tr>
          </tbody>
        );
      })}
    </Table>
  );
};

export default ReplyCommentTable;
