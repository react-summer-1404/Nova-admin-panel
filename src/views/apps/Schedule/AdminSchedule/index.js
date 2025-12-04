import React from "react";
import AdminScheduleTable from "./components/table/AdminScheduleTable/";
import { useState } from "react";
import DatePickerComponent from "./components/DatePickerComponent";
const AdminSchedule = () => {
  const [picker, setPicker] = useState(new Date());
  return (
    <div>
      <DatePickerComponent picker={picker} setPicker={setPicker} />
      <AdminScheduleTable picker={picker}/>
    </div>
  );
};

export default AdminSchedule;
