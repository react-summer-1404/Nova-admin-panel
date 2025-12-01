// ** React Import
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ** Custom Components
import MultipleColumnForm from "../../../forms/form-layouts/MultipleColumnForm";

// ** Images
// import HandleImgError from "../../../../assets/images/";

// ** Icons Imports
import { MoreVertical, Edit, Trash, Eye, XSquare, Send } from "react-feather";

// ** Reactstrap Imports
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Col,
} from "reactstrap";
import CommentReplyTable from "./CommentReplyTable.js";
import CommentReplyForm from "../../../forms/form-layouts/CommentReplyForm.js";

const CommentTableBasic = ({ dataId, apiData, thList, title }) => {
  const [disabledModal, setDisabledModal] = useState(false);
  const [closedModal, setClosedModal] = useState(false);
  const [commentId, setCommentId] = useState();
  const [commentState, setCommentState] = useState([]);
  const [selectedComment, setSelectedComment] = useState();
  const [deleteComment, setDeleteComment] = useState();
  const [replyComment, setReplyComment] = useState();

  // Handle comment state changing
  useEffect(() => {
    const savedCommentState = localStorage.getItem("commentState");
    if (savedCommentState) {
      setCommentState(JSON.parse(savedCommentState));
    } else apiData?.comments?.map((c) => c.accept);
  }, [apiData]);

  const handleAproved = (index) => {
    setCommentState((prev) => {
      const update = [...prev];
      update[index] = !update[index];
      localStorage.setItem("commentState", JSON.stringify(update));
      return update;
    });
  };

  // Handle Deleting Comment
  useEffect(() => {
    const savedCommentDelete = localStorage.getItem("deleteComment");
    console.log("savedCommentDelete:", savedCommentDelete);

    if (savedCommentDelete && savedCommentDelete !== "undefined") {
      setDeleteComment(JSON.parse(savedCommentDelete));
    }
  }, []);

  const handleDeleteComment = (item) => {
    const deleteChosenComment = apiData?.comments?.filter(
      (comment) => comment?.id !== item.id
    );
    localStorage.setItem("deleteComment", JSON.stringify(deleteChosenComment));
    setDeleteComment(deleteChosenComment);
    console.log("deleteChosenComment:", deleteChosenComment);
  };

  return (
    <Table responsive>
      <thead>
        <tr>
          {thList.map((item) => {
            return <th>{item}</th>;
          })}
        </tr>
      </thead>
      {apiData?.comments?.map((item, index) => {
        return (
          <tbody>
            <tr>
              <td>{item?.author === "null null" || "" ? "نامشخص" : item?.author}</td>
              <td>{item?.commentTitle}</td>
              <td>{item?.describe}</td>
              <td>{item?.courseTitle}</td>
              <td>
                <Badge
                  pill
                  color={commentState[index] === true ? "success" : "warning"}
                  className="me-1"
                >
                  {commentState[index] === true ? "تایید شده" : "تایید نشده"}
                </Badge>
              </td>
              <td>
                {item.replyCount && item.replyCount !== "null" ? <Eye /> : "-"}
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
                    <DropdownItem
                      onClick={() => {
                        setDisabledModal(!disabledModal);
                      }}
                    >
                      <Trash className="me-50" size={15} />{" "}
                      <span className="align-middle">حذف</span>
                    </DropdownItem>
                    <Modal
                      isOpen={disabledModal}
                      toggle={() => setDisabledModal(!disabledModal)}
                      className="modal-dialog-centered"
                      backdrop={false}
                    >
                      <ModalBody>آیا مایل به حذف کامنت هستید؟</ModalBody>
                      <ModalFooter>
                        <Button
                          color="primary"
                          onClick={() => {
                            setDisabledModal(!disabledModal);
                            handleDeleteComment(item);
                          }}
                        >
                          تایید
                        </Button>{" "}
                        <Button
                          color="secondery"
                          onClick={() => setDisabledModal(!disabledModal)}
                        >
                          انصراف
                        </Button>{" "}
                      </ModalFooter>
                    </Modal>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      <XSquare className="me-50" size={15} />{" "}
                      <span
                        className="align-middle"
                        onClick={() => {
                          setCommentId(item?.commentId);
                          handleAproved(index);
                        }}
                      >
                        {commentState[index] === true
                          ? "رد کردن"
                          : "تایید کردن"}
                      </span>
                    </DropdownItem>
                    {commentState[index] === true && <DropdownItem
                      onClick={() => {
                        // setCommentId(item?.id);
                        setClosedModal(!closedModal);
                        setSelectedComment(item);
                      }}
                    >
                      <Send className="me-50" size={15} />{" "}
                      <span className="align-middle">پاسخ</span>
                    </DropdownItem>}
                    <Modal
                      isOpen={closedModal}
                      toggle={() => setClosedModal(!closedModal)}
                      className="modal-dialog-centered"
                      backdrop={false}
                    >
                      <ModalHeader toggle={() => setClosedModal(!closedModal)}>
                        لطفا پاسخ کامنت را وارد کنید
                      </ModalHeader>
                      <ModalBody>
                        <CommentReplyForm apiData={apiData}/>
                      </ModalBody>
                    </Modal>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </td>
            </tr>
          </tbody>
        );
      })}
    </Table>
  );
};

export default CommentTableBasic;
