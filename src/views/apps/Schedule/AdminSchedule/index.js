import React from "react";
import AdminScheduleTable from "./components/table/AdminScheduleTable/";
import { useState } from "react";
import DatePickerComponent from "./components/DatePickerComponent";
import { Button } from "reactstrap";
import Create from "./components/Create";
import { useQuery } from "@tanstack/react-query";
import { getGroupList } from "../../../../core/Services/api/getGroup";
import { getAdminSchedules } from "../../../../core/Services/api/Schedule";
const AdminSchedule = () => {
  const [picker, setPicker] = useState(new Date());
  const [modal, setModal] = useState(false);
  const apiParams = {
    startDate: picker[0],
    endDate: picker[1],
  };
  const { data, isLoading } = useQuery({
    queryKey: ["getAdminSchedules", apiParams],
    queryFn: () => getAdminSchedules(apiParams),
  });
  const { data: groups } = useQuery({
    queryKey: ["groupsForSchedules"],
    queryFn: getGroupList,
  });
  const groupData = groups?.courseGroupDtos;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <DatePickerComponent picker={picker} setPicker={setPicker} />
        <Button  style={{ height: 40 ,width:300}} onClick={() => setModal(!modal)}>
          افزودن بازه زمانی +
        </Button>
        <Create modal={modal} setModal={setModal} data={groupData} />
      </div>
      <AdminScheduleTable
        picker={picker}
        isLoading={isLoading}
        apiParams={apiParams}
        data={data}
      />
    </div>
  );
};

export default AdminSchedule;
