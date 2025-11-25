// ** React Import
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ** Custom Components
import MultipleColumnForm from "../../forms/form-layouts/MultipleColumnForm";

// ** Images
import HandleImgError from "../../../@core/assets/images/images.jpg";

// ** Icons Imports
import { MoreVertical, Edit, Trash } from "react-feather";

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

const TableBasic = ({ blogId, blogsData }) => {
  const [basicModal, setBasicModal] = useState(false);
  const [editId,setEditId] = useState(null);

  const onChange = (e) => {
    setSelectedFile(e.target.file[0]);
  };
  const navigate = useNavigate()

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>عنوان</th>
          <th>Client</th>
          <th>آخرین بروزرسانی</th>
          <th>وضعیت</th>
          <th>عملیات</th>
        </tr>
      </thead>
      {blogsData?.news?.map((item) => {
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
                <span className="align-middle fw-bold" onClick={() => {navigate(`/pages/blog/detail/${item.id}`)}}>{item.title}</span>
              </td>
              <td>{item?.addUserFullName}</td>
              <td>{item?.updateDate.slice(0, 10)}</td>
              <td>
                <Badge
                  pill
                  color={item.active === true ? "success" : "danger"}
                  className="me-1"
                >
                  {item.active === true ? "فعال" : "غیرفعال"}
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
                    <DropdownItem onClick={() => {
                      setEditId(item?.id)
                      setBasicModal(!basicModal)}}>
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
                          <MultipleColumnForm blogId={editId}/>
                        </Col>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="primary"
                          onClick={() => setBasicModal(!basicModal)}
                        >
                          Accept
                        </Button>
                      </ModalFooter>
                    </Modal>
                    <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                      <Trash className="me-50" size={15} />{" "}
                      <span className="align-middle">حذف</span>
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