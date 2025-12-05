// ** React Import
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ** Custom Components
import MultipleColumnForm from "../../../forms/form-layouts/MultipleColumnForm";

// ** Images
import HandleImgError from "../../../../@core/assets/images/images.jpg";

// ** Icons Imports
import { MoreVertical, Edit, Trash, XSquare, Check } from "react-feather";

// ** APIs Imports
import { DeleteNewsApi } from "../../../../core/Services/api/News/DeleteNews";

// ** Reactstrap Imports
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  ModalFooter,
  Button,
} from "reactstrap";
import { useMutation } from "@tanstack/react-query";

const TableBasic = ({ dataId, apiData, thList, title }) => {
  const [basicModal, setBasicModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [blogId, setBlogId] = useState();
  const [blogState, setBlogState] = useState([]);
  const [blogs, setBlogs] = useState(apiData?.news || []);

useEffect(() => {
  setBlogs(apiData?.news || []);
}, [apiData]);


  // Handle Blogs State
  useEffect(() => {
    const saveBlogState = localStorage.getItem("BlogState");
    if (saveBlogState) {
      setBlogState(JSON.parse(saveBlogState));
    }
  }, [apiData]);

  const handleBlogState = (index) => {
    setBlogState((prev) => {
      const updateState = [...prev];
      updateState[index] = !updateState[index];
      localStorage.setItem("BlogState", JSON.stringify(updateState));
      return updateState;
    });
  };

  const {mutateAsync } = useMutation({
    mutationFn : DeleteNewsApi
  })

  const handleDeleteBlogs = (id) => {
    const filteredData = apiData.news.filter((item) => item.id !== id);
    setBlogState(filteredData.map(() => true));
  }

  const navigate = useNavigate();

  return (
    <Table responsive>
      <thead>
        <tr>
          {thList?.map((item) => {
            return <th>{item}</th>;
          })}
        </tr>
      </thead>
      {blogs?.map((item, index) => {
        return (
          <tbody>
            <tr>
              <td>
                <img
                  className="me-75"
                  src={item.currentImageAddress || HandleImgError}
                  onError={(e) => (e.target.src = HandleImgError)}
                  alt={item.title}
                  height="20"
                  width="20"
                />
                <span
                  className="align-middle fw-bold"
                  onClick={() => {
                    navigate(`/pages/blog/detail/${item.id}`);
                  }}
                >
                  {item.title}
                </span>
              </td>
              <td>{item?.updateDate.slice(0, 10)}</td>
              <td>{item?.addUserFullName}</td>
              <td>
                <Badge
                  pill
                  color={blogState[index] === true ? "success" : "danger"}
                  className="me-1"
                >
                  {blogState[index] === true ? "فعال" : "غیرفعال"}
                </Badge>
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
                        setEditId(item?.id);
                        setBasicModal(!basicModal);
                      }}
                    >
                      <Edit className="me-50" size={15} />{" "}
                      <span className="align-middle">ویرایش</span>
                    </DropdownItem>
                    <Modal
                      isOpen={basicModal}
                      toggle={() => setBasicModal(!basicModal)}
                    >
                      <ModalHeader toggle={() => setBasicModal(!basicModal)}>
                        ویرایش مقاله
                      </ModalHeader>
                      <ModalBody>
                        <Col sm="12">
                          <MultipleColumnForm blogId={editId} />
                        </Col>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="primary"
                          onClick={() => setBasicModal(!basicModal)}
                        >
                          ثبت تغییرات
                        </Button>
                      </ModalFooter>
                    </Modal>
                    <DropdownItem onClick={() => handleDeleteBlogs(item.id)}>
                      <Trash className="me-50" size={15} />{" "}
                      <span className="align-middle">حذف</span>
                    </DropdownItem>
                    
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      {blogState[index] == true ?
                      <Check className="me-50" size={15} /> :
                      <XSquare className="me-50" size={15} /> 
                      }
                      <span
                        className="align-middle"
                        onClick={() => {
                          setBlogId(item?.id);
                          handleBlogState(index);
                        }}
                      >
                        {blogState[index] === true
                          ? "غیرفعال کردن"
                          : "فعال کردن"}
                      </span>
                    </DropdownItem>
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

export default TableBasic;
