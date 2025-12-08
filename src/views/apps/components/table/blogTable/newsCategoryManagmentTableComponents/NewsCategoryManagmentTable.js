// ** React Import
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ** Custom Components

// ** Icons Imports
import { MoreVertical, Edit, Trash, XSquare, Check } from "react-feather";

// ** APIs Imports
// import { DeleteNewsApi } from "../../../../../core/Services/api/News/DeleteNews";
import { GetNewsCategories } from "../../../../../../core/Services/api/News/GetNewsCategories";

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
import { useMutation, useQuery } from "@tanstack/react-query";

const NewsCategoryManagmentTable = ({ dataId, apiData, thList, title }) => {
  const [editModal, setEditModal] = useState(false);
  const [categoriesId, setCategoriesId] = useState(null);

  

 
  // const { mutateAsync } = useMutation({
  //   mutationFn: DeleteNewsApi,
  // });

  const handleDeleteCategory = (id) => {
    // const filteredData = apiData.news.filter((item) => item.id !== id);
    // setBlogState(filteredData.map(() => true));
  };

  return (
    <Table responsive>
      <thead>
        <tr>
          {thList?.map((item) => {
            return <th>{item}</th>;
          })}
        </tr>
      </thead>
      {apiData?.map((item, index) => {
        return (
          <tbody>
            <tr>
              <td>
                <span className="align-middle fw-bold">
                  {item.categoryName}
                </span>
              </td>
              <td>
                <span>{item.googleTitle}</span>
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
                        setCategoriesId(dataId);
                        setEditModal(!editModal);
                      }}
                    >
                      <Edit className="me-50" size={15} />{" "}
                      <span className="align-middle">ویرایش</span>
                    </DropdownItem>
                    <Modal
                      isOpen={editModal}
                      toggle={() => setEditModal(!editModal)}
                    >
                      <ModalHeader toggle={() => setEditModal(!editModal)}>
                        ویرایش دسته بندی
                      </ModalHeader>
                      <ModalBody>
                        <Col sm="12">
                          {/* <MultipleColumnForm blogId={categoriesId} /> */}
                        </Col>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="primary"
                          onClick={() => setEditModal(!editModal)}
                        >
                          ثبت تغییرات
                        </Button>
                      </ModalFooter>
                    </Modal>
                    <DropdownItem onClick={() => handleDeleteCategory(item.id)}>
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

export default NewsCategoryManagmentTable;
