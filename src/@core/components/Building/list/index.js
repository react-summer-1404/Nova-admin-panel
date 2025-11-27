// ** React Imports
import { useState } from "react";

// ** Table Columns
import { columns } from "./columns";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Reactstrap Imports
import {
  Button,
  Input,
  Row,
  Col,
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Form
} from "reactstrap";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useBuildingList } from "../../../../core/Hook/useQUserApi";
import { useCreateBuilding } from "../../../../core/Hook/useMUserApi";
import { Controller, useForm } from "react-hook-form";

import toast from "react-hot-toast";


const CustomHeader = ({ handleFilter, value, handlePerPage, rowsPerPage}) => {
  const [data, setData] = useState(null)
  const defaultValues = {
    id: '',
    buildingName: "",
    floor: 0,
    latitude: "",
    longitude: "",
  };
  const [play, setPlay] = useState(false);

  const checkIsValid = (data) => {
    if (!data || typeof data !== "object") return false;
    return Object.entries(data).every(([key, value]) => {
      if (typeof value === "string") return value.trim().length > 0;
      if (typeof value === "number") return value !== null && !isNaN(value);
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined;
    });
  };
  
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, mode: "onChange" });

  const { mutate: createBuilding } = useCreateBuilding({
    onSuccess: () => {
      toast.success("ساختمان با موفقیت ایجاد شد");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || " خطا در ایجاد ساختمان");
    },
  });

  const handleCreate = (data) => {
    console.log("مقدار data", data);
    console.log("اعتبار سنجی ", checkIsValid(data));
    if (!checkIsValid(data)) {
      for (const key in data) {
        const value = data[key];
        const isValid =
          value !== null &&
          value !== undefined &&
          (typeof value !== "string" || value.trim().length > 0);
        console.log(`${key} : ${isValid ? "ok" : "notOk"}`);
      }
      return;
    }
  };

  // ** Function to handle form submit
  const onSubmit = (data) => {
    const finalData= {
      ...data,
      floor : Number(data.floor)
    }
    
    createBuilding(finalData);
    console.log("onsubmit user");
  };

  return (
    <>
      <div className="invoice-list-table-header w-100 py-2">
        <Row>
          <Col lg="6" className="d-flex align-items-center px-0 px-lg-1">
            <div className="d-flex align-items-center me-2">
              <label htmlFor="rows-per-page">نمایش</label>
              <Input
                type="select"
                id="rows-per-page"
                value={rowsPerPage}
                onChange={handlePerPage}
                className="form-control ms-50 pe-3"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </Input>
            </div>
            <Button color="primary" onClick={() => setPlay(true)}>
              افزودن ساختمان
            </Button>
          </Col>
          <Col
            lg="6"
            className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
          >
            <div className="d-flex align-items-center">
              <label htmlFor="search-invoice">جستجو</label>
              <Input
                id="search-invoice"
                className="ms-50 me-2 w-100"
                type="text"
                value={value}
                onChange={(e) => handleFilter(e.target.value)}
                placeholder="جستجو کنید"
              />
            </div>
          </Col>
        </Row>
      </div>
      <Modal
        isOpen={play}
        toggle={() => setPlay(!play)}
        className="modal-dialog-centered modal-md"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setPlay(!play)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">ایجاد ساختمان جدید</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col md={12} xs={12}>
                <Label className="form-label" for="buildingName">
                  نام ساختمان
                </Label>
                <Controller
                  control={control}
                  name="buildingName"
                  rules={{ required: "نام ساختمان الزامی است" }}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}                        
                        placeholder="نام ساختمان را وارد کنید"
                      />
                      {errors.buildingName && (
                        <span>{errors.buildingName.message}</span>
                      )}
                    </>
                  )}
                />
              </Col> 
              <Col md={12} xs={12}>
                <Label className="form-label" for="floor">
                  طبقه
                </Label>
                <Controller
                  control={control}
                  name="floor"
                  rules={{ required: "طبقه الزامی است" }}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        
                        placeholder="نام خانوادگی را وارد کنید"
                      />
                      {errors.floor && <span>{errors.floor.message}</span>}
                    </>
                  )}
                />
              </Col>
              <Col md={12} xs={12}>
                <Label className="form-label" for="latitude">
                  طبقه
                </Label>
                <Controller
                  control={control}
                  name="latitude"
                  rules={{ required: "طبقه الزامی است" }}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        
                        placeholder="نام خانوادگی را وارد کنید"
                      />
                      {errors.latitude && <span>{errors.latitude.message}</span>}
                    </>
                  )}
                />
              </Col>
              <Col md={12} xs={12}>
                <Label className="form-label" for="longitude">
                  طبقه
                </Label>
                <Controller
                  control={control}
                  name="longitude"
                  rules={{ required: "طبقه الزامی است" }}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        
                        placeholder="نام خانوادگی را وارد کنید"
                      />
                      {errors.longitude && <span>{errors.longitude.message}</span>}
                    </>
                  )}
                />
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50"> 
                <Button type="submit" className="me-1" color="primary" onClick={() => handleCreate(data)}>
                  تایید و ارسال
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => {
                    setPlay(false);
                  }}
                >
                  صرف نظر کردن
                </Button>
              </Col>
            </Row>
            </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

const InvoiceList = () => {
  // ** States
  const [value, setValue] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useBuildingList();

  const handleFilter = (val) => {
    setValue(val);
  };

  const handlePerPage = (e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const CustomPagination = () => {
    const count = Number((data?.length / perPage).toFixed(0));

    return (
      <ReactPaginate
        nextLabel=""
        breakLabel="..."
        previousLabel=""
        pageCount={count || 1}
        activeClassName="active"
        breakClassName="page-item"
        pageClassName={"page-item"}
        breakLinkClassName="page-link"
        nextLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousLinkClassName={"page-link"}
        previousClassName={"page-item prev"}
        onPageChange={(page) => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={"pagination react-paginate justify-content-end p-1"}
      />
    );
  };

  const dataToRender = () => {
    const filtered = data?.filter((b) =>
      b.buildingName.toLowerCase().includes(value.toLowerCase())
    );
    return filtered?.slice((currentPage - 1) * perPage, currentPage * perPage);
  };

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            pagination
            sortServer
            paginationServer
            subHeader={true}
            columns={columns}
            responsive={true}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
            paginationDefaultPage={currentPage}
            paginationComponent={CustomPagination}
            subHeaderComponent={
              <CustomHeader
                value={value}
                perPage={perPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
              />
            }
          />
        </div>
      </Card>
    </div>
  );
};

export default InvoiceList;
