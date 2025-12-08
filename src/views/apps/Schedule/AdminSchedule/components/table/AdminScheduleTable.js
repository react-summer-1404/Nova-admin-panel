import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { EditSchedualSingle } from "../../../../../../core/Services/api/Schedule";
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Spinner,
  UncontrolledDropdown,
} from "reactstrap";
import { Table } from "reactstrap";
import { Edit, MoreVertical } from "react-feather";
import toast from "react-hot-toast";
import Session from "../session/Session";
import ReactPaginate from "react-paginate";

const AdminScheduleTable = ({ isLoading, apiParams, data, groups }) => {
  const [selected, setSelected] = useState("");
  const [centralModal, setCentralModal] = useState(false);
  const queryClient = useQueryClient();
  console.log("selected", selected);
const [perPage,setPerPage]=useState(10)
const [currentPage,setCurrentPage]=useState(1)
  const editAp = useMutation({
    mutationFn: (apiData) => EditSchedualSingle(apiData),
    onSuccess: () => {
      toast.success("وضعیت تغییر کرد");
      queryClient.invalidateQueries(["getAdminSchedules", apiParams]);
    },
    onError: (error) => {
      const msg = error?.response?.data?.message;
      toast.error(msg);
      console.log("error======>", error);
    },
  });

  

  
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const pageCount = Math.ceil((data?.length || 0) / perPage);
  
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
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
  
  const dataToRender = data?.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  )
  return (
    <>
      <div className="content-body">
        <Table hover responsive>
          <thead>
            <tr>
              <th>نام گروه</th>
              <th>ساعت شروع</th>
              <th>ساعت پایان </th>
              <th>تاریخ شروع</th>
              <th>حالت حضور</th>
              <th>اقدام</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="d-flex justify-content-center">
                  <Spinner color="primary" />
                </td>
              </tr>
            ) : (
              dataToRender?.map((item) => {
                const foundedItem = groups?.find(
                  (g) => g.id == item.courseGroupId
                );
                return (
                  <tr key={item.id}>
                    <td className="text-black fw-bold">{foundedItem?.groupName}</td>
                    <td>{item.startTime}</td>

                    <td>
                      <p>{item.endTime}</p>
                    </td>
                    <td>
                      <p>{item.startDate?.slice(0, 10)}</p>
                    </td>

                    <td>
                      {item.AP ? (
                        <Badge color="light-success">میتواند</Badge>
                      ) : (
                        <Badge color="light-danger">نمیتواند</Badge>
                      )}
                    </td>

                    <td>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="icon-btn hide-arrow"
                          color="transparent"
                          size="sm"
                          caret
                          onClick={() => setSelected(item)}
                        >
                          <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
                            onClick={() =>
                              editAp.mutate({ active: !item.AP, id: item.id })
                            }
                          >
                            <Edit className="me-50" size={15} />
                            تغییر وضعیت
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => setCentralModal(!centralModal)}
                          >
                            <Edit className="me-50" size={15} />
                            <span className="align-middle">نمایش جلسه</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
        <CustomPagination/>
        <Session centralModal={centralModal} setCentralModal={setCentralModal} ScheduleId={selected?.id}/>

      </div>
    </>
  );
};

export default AdminScheduleTable;
