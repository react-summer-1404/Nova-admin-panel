import React from "react";
import List from "./List";
import BreadCrumbs from "@components/breadcrumbs";

const CategoryManagement = () => {
  return (
    <>
      <BreadCrumbs
        title="  کتگوری"
        data={[{ title: "کتگوری اخبار" }, { title: " کتگوری" }]}
      />
      <div>
        <List />
      </div>
    </>
  );
};

export default CategoryManagement;
