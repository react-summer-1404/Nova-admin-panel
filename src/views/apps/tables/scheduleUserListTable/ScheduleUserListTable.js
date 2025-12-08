// ** Custom Components
import React, { useState } from "react";
// ** Images
import Avatar from "@components/avatar";

import defaultpPic from "../../../../assets/images/defalt.png";

// ** Reactstrap Imports
import {
  Table,
  Spinner,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "reactstrap";
import { Alert } from "reactstrap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGroupList } from "../../../../core/Services/api/getGroup";
import Session from "../../Schedule/AdminSchedule/components/session/Session";
import { Edit, MoreVertical } from "react-feather";
import { EditSchedualSingle } from "../../../../core/Services/api/Schedule";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";

const ScheduleUserListTable = ({
  data,
  isLoading,
  userApiParams,
  selectedId,
}) => {
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
      queryClient.invalidateQueries(["UserSchedules", userApiParams]);
    },
    onError: (error) => {
      const msg = error?.response?.data?.message;
      toast.error(msg);
      console.log("error======>", error);
    },
  });
  const { data: groups } = useQuery({
    queryKey: ["getGroupList2"],
    queryFn: getGroupList,
  });
  const cr = groups?.courseGroupDtos;
  if (!selectedId) {
    return (
      <div className="text-center p-4">
        <Alert color="primary">
          <div className="alert-body">
            <span className="fw-bold">لطفا یک کاربر را انتخاب کنید</span>
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
      <Table hover responsive>
        <thead>
          <tr>
            <th>نام گروه</th>
            <th>ساعت شروع</th>
            <th>ساعت پایان </th>
            <th>تاریخ</th>
            <th>حالت حضور</th>
            <th>اقدام</th>
          </tr>
        </thead>
        <tbody>
          {dataToRender?.map((item) => {
            const foundedItem = cr?.find((g) => g.id == item.courseGroupId);
            console.log("first", foundedItem);
            return (
              <tr key={item.id}>
                <td className="fw-bold text-black">
                  <p>{foundedItem?.groupName}</p>
                </td>
                <td className="fw-bold text-black">
                  <span>{item.startTime}</span>
                </td>
                <td>{item.endTime}</td>
                <td className="fw-bold text-black">
                  {item.startDate?.slice(0, 10)}
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
          })}
        </tbody>
      </Table>
      <CustomPagination/>

      <Session
        centralModal={centralModal}
        setCentralModal={setCentralModal}
        ScheduleId={selected?.id}
      />
    </>
  );
};

export default ScheduleUserListTable;
