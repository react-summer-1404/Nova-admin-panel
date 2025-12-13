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
import ReplyCommentTable from "./ReplyCommentTable";

const CommentTable = ({ dataId, apiData, thList, title }) => {
  // ** States
  const [data, setData] = useState();
  const [commentId, setCommentId] = useState();
  const [replyData, setReplyData] = useState([]);
  const [replyModal, setReplyModal] = useState();

  const { id } = useParams();

  // ** Get News Comment
  useEffect(() => {
    instance.get(`/News/GetNewsComments?NewsId=${id}`).then(async (res) => {
      setData(res.data);
      // ** Get News Reply Comment
      const replies = await Promise.all(
        res.data.map((c) =>
          instance
            .get(`/News/GetRepliesComments?Id=${c.id}`)
            .then((r) => r.data)
        )
      );
      setReplyData(replies.flat());
    });
  }, [id]);

  const navigate = useNavigate();

  return (
    <Table responsive>
      <thead>
        <tr>
          {thList?.map((item) => {
            return <th key={item.id}>{item}</th>;
          })}
        </tr>
      </thead>
      {data?.map((item, index) => {
        return (
          <tbody>
            <tr>
              <td>{item?.userFullName}</td>
              <td>{item?.title}</td>
              <td>{item?.describe}</td>
              <td>
                <span
                  onClick={() => {
                    setCommentId(item.id)
                    setReplyModal(!replyModal);
                  }}
                >
                  {replyData?.find((r) => r.parentId === item.id) ? (
                    <Eye size={20} />
                  ) : (
                    ""
                  )}
                </span>
                <Modal
                  isOpen={replyModal}
                  toggle={() => setReplyModal(!replyModal)}
                >
                  <ModalHeader toggle={() => setReplyModal(!replyModal)}>
                    نمایش پاسخ کامنت
                  </ModalHeader>
                  <ModalBody>
                    <Col sm="12">
                      <ReplyCommentTable replies={replyData.filter(r => r.parentId === commentId)}  userName={item.userFullName}/>
                    </Col>
                  </ModalBody>
                </Modal>
              </td>
            </tr>
          </tbody>
        );
      })}
    </Table>
  );
};

export default CommentTable;
