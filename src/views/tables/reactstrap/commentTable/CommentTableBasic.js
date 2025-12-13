// ** React Import
import { useEffect, useState } from "react";

// ** Custom Components

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
import { useMutation, useQuery } from "@tanstack/react-query";
import { DeleteCommentApi } from "../../../../core/Services/api/CommentsManagment/DeleteComment/index.js";
import toast from "react-hot-toast";
import instance from "../../../../core/interseptor/Interseptor.js";
import { AcceptCourseCommentApi } from "./../../../../core/Services/api/CommentsManagment/ActiveDeactiveCourseComment/index";
import ReactPaginate from "react-paginate";

const CommentTableBasic = ({ apiData }) => {
  const [disabledModal, setDisabledModal] = useState(false);
  const [replyData, setReplyData] = useState(null);
  const [closedModal, setClosedModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState();
  const [courseId, setCourseId] = useState();
  const [selectedComment, setSelectedComment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [commentState, setCommentState] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (apiData?.comments) {
      setComments(apiData.comments);
    }
  }, [apiData]);

  // ** Handle comment state changing
  useEffect(() => {
    setComments(apiData?.comments || []);
  }, [apiData]);

  const { mutateAsync: acceptCourseComment } = useMutation({
    mutationFn: (CommentCourseId) => AcceptCourseCommentApi(CommentCourseId),
  });

  const handleAproved = async (CommentCourseId, index) => {
    try {
      await acceptCourseComment(CommentCourseId);

      setCommentState((prev) => {
        const updated = [...prev];
        updated[index] = !updated[index];
        return updated;
      });
    } catch (error) {
      console.log("خطا در تایید کامنت", error);
    }
  };

  // useEffect(() => {
  //   const savedCommentState = localStorage.getItem("commentState");
  //   if (savedCommentState) {
  //     setCommentState(JSON.parse(savedCommentState));
  //   } else apiData?.comments?.map((c) => c.accept);
  // }, [apiData]);

  // const handleAproved = (index) => {
  //   setCommentState((prev) => {
  //     const update = [...prev];
  //     update[index] = !update[index];
  //     localStorage.setItem("commentState", JSON.stringify(update));
  //     return update;
  //   });
  // };

  const { mutateAsync: deleteComment } = useMutation({
    mutationFn: DeleteCommentApi,
    onSuccess: () => {
      toast.success("عملیات با موفقیت انجام شد");
    },
    onError: () => {
      toast.error("عملیات با خطا مواجه شد");
    },
  });
  const handleDeleteComment = async () => {
    if (!selectedComment) return;
    await deleteComment(selectedComment.commentId);
    const updatedComments = comments.filter(
      (c) => c.commentId !== selectedComment.commentId
    );
    setComments(updatedComments);
    setShowDeleteModal(false);
  };
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageCount = Math.ceil((comments?.length || 0) / perPage);

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

  const dataToRender = comments?.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  return (
    <>
      <Modal
        isOpen={showDeleteModal}
        toggle={() => setShowDeleteModal(false)}
        className="modal-dialog-centered"
        backdrop={false}
      >
        <ModalBody>آیا مایل به حذف کامنت هستید؟</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleDeleteComment}>
            تایید
          </Button>
          <Button color="secondary" onClick={() => setShowDeleteModal(false)}>
            انصراف
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={showReplyModal}
        toggle={() => setShowReplyModal(false)}
        className="modal-dialog-centered"
        backdrop={false}
      >
        <ModalHeader>لطفاً پاسخ کامنت را وارد کنید</ModalHeader>
        <ModalBody>
          <CommentReplyForm
            CommentId={commentId}
            CourseId={courseId}
            apiData={apiData}
            selectedComment={selectedComment}
            setShowReplyModal={setShowReplyModal}
          />
        </ModalBody>
      </Modal>

      <Table responsive>
        <thead>
          <tr>
            <th>کاربر</th>
            <th>عنوان کامنت</th>
            <th>توضیحات کامنت</th>
            <th>نام دوره</th>
            <th> وضعیت</th>
            <th> پاسخ ها</th>
            <th>عملیات </th>
          </tr>
        </thead>

        {dataToRender?.map((item, index) => {
          return (
            <tbody>
              <tr>
                <td>
                  {item?.author === "null null" || "" ? "نامشخص" : item?.author}
                </td>
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
                  {console.log("item.replyCount:", item.replyCount)}
                  <td>{item.replyCount > 0 ? <Eye /> : "-"}</td>
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
                          setSelectedComment(item);
                          setShowDeleteModal(true);
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
                              handleDeleteComment(item.commentId);
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
                      <DropdownItem
                        href="/"
                        onClick={(e) => e.preventDefault()}
                      >
                        <XSquare className="me-50" size={15} />{" "}
                        <span
                          className="align-middle"
                          onClick={() => {
                            setCommentId(item?.commentId);

                            handleAproved(item?.commentId,index);
                          }}
                        >
                          {commentState[index] === true
                            ? "رد کردن"
                            : "تایید کردن"}
                        </span>
                      </DropdownItem>
                      {commentState[index] && (
                        <DropdownItem
                          onClick={() => {
                            setSelectedComment(item);
                            setCourseId(item.courseId);
                            setShowReplyModal(true);
                          }}
                        >
                          <Send className="me-50" size={15} /> پاسخ
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
      <CustomPagination />

    </>
  );
};

export default CommentTableBasic;
