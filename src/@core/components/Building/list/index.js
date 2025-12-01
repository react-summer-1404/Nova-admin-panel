// ** React Imports
import { useEffect, useState } from "react";

// ** Table Columns
// import { columns } from "./columns";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown, Edit, FileText, MoreVertical, Trash } from "react-feather";
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
  Form,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useBuildingList } from "../../../../core/Hook/useQUserApi";
import { useActiveDeactiveBuilding, useCreateBuilding } from "../../../../core/Hook/useMUserApi";
import { Controller, useForm } from "react-hook-form";

import toast from "react-hot-toast";
import EditModal from "../Editmodal";
import { useQueryClient } from "@tanstack/react-query";
import DetailModal from "../DetailModal";

const CustomHeader = ({ handleFilter, value, handlePerPage, rowsPerPage}) => {
  const [data, setData] = useState(null)
  
  const queryClient = useQueryClient();
  const [isCreatedOpen, setIsCreatedOpen] = useState(false);
  const toggleCreate = () => setIsCreatedOpen(!isCreatedOpen);
  
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors,isValid },
  } = useForm({ defaultValues : {
    
    buildingName: "",
    floor: 0,
    latitude: "",
    longitude: "",
  }, mode: "onChange" });

  const { mutate: createBuilding } = useCreateBuilding({
    onSuccess: (newItem) => {
      console.log("new Building: ", newItem);
      queryClient.setQueriesData(["BuildingList"], (old = []) => [...old, newItem]);
      toast.success("ساختمان با موفقیت ایجاد شد");
      toggle();
      reset();
    },
    onError: (error) => {
      // toast.error(error?.response?.data?.message || " خطا در ایجاد ساختمان");
    },
  });

  
  const onSubmit = (formData) => {
    if (!isValid){
      console.log("Form invalid, not sending");
      return;
    }
    const finalData= {
      ...formData,
      floor : Number(formData.floor),
    }
    console.log("sending to api:", finalData); 
    createBuilding(finalData);
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
            <Button color="primary" onClick={toggleCreate}>
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
        isOpen={isCreatedOpen}
        toggle={toggleCreate}
        className="modal-dialog-centered modal-md"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={toggleCreate}
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
                        placeholder=" طبقه را وارد کنید"
                      />
                      {errors.floor && <span>{errors.floor.message}</span>}
                    </>
                  )}
                />
              </Col>
              <Col md={12} xs={12}>
                <Label className="form-label" for="latitude">
                عرض جغرافیایی
                </Label>
                <Controller
                  control={control}
                  name="latitude"
                  rules={{ required: "عرض جغرافیایی الزامی است" }}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        
                        placeholder=" عرض جغرافیایی را وارد کنید"
                      />
                      {errors.latitude && <span>{errors.latitude.message}</span>}
                    </>
                  )}
                />
              </Col>
              <Col md={12} xs={12}>
                <Label className="form-label" for="longitude">
                طول جغرافیایی
                </Label>
                <Controller
                  control={control}
                  name="longitude"
                  rules={{ required: "طول جغرافیایی الزامی است" }}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        
                        placeholder="طول جغرافیایی را وارد کنید"
                      />
                      {errors.longitude && <span>{errors.longitude.message}</span>}
                    </>
                  )}
                />
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50"> 
                <Button type="submit" className="me-1" color="primary">
                  تایید و ارسال
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => {
                    setIsCreatedOpen(false);
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [value, setValue] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const {mutate: ActiveDeActive} = useActiveDeactiveBuilding({
    onSuccess: (_, variables) => {
      queryClient.setQueriesData(["BuildingList"], (old = []) => 
        old.map((b) => 
          b.id === variables.id ? {...b, active: variables.active} : b
        )
      );
      toast.success(
        variables.active ? 'ساختمان غیر فعال شد' : 'ساختمان فعال شد'
      )
    },
    onError : () => {
      toast.error('خطا در تغییر وضعیت ساختمان');
    }
});

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
      b?.buildingName?.toLowerCase().includes(value.toLowerCase())
    );
    return filtered?.slice((currentPage - 1) * perPage, currentPage * perPage);
  };

  useEffect(() => {
    console.log("selectedRow", selectedRow);
  }, [selectedRow])

  const columns = [ 
    {
      name: 'ردیف',
      sortable: true,
      minWidth: '150px',
      sortField: 'id',
      cell: (row, index) => index +1
    },
    {
      sortable: true,
      minWidth: '200px',
      name: 'نام ساختمان ',
      sortField: 'buildingName',
      cell: row => row.buildingName
    },
    {
      sortable: true,
      minWidth: '200px',
      name: 'طبقه  ',
      sortField: 'floor',
      cell: row => row.floor
    },
    {
      sortable: true,
      minWidth: '200px',
      name: 'وضعیت',
      sortField: 'floor',
      cell: row => (
        <span className ={`badge ${row.active? 'bg-success' : 'bg-danger'}`}>
          {row.active ? 'فعال': " غیر فعال "}
        </span>
      )
    },
    {
      name: 'اقدام',
      minWidth: '110px',
      cell: row => (
        <div className='column-action d-flex align-items-center'>
          <UncontrolledDropdown>
            <DropdownToggle tag='span'>
              <MoreVertical size={17} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem className='w-100' onClick={() => {setSelectedRow(row.id);
                 setShowDetailModal(true)}}>
                <FileText size={14} className='me-50' />
                جزئیات
              </DropdownItem>
              <DropdownItem  className='w-100' onClick={() => {setSelectedRow(row);
                  setShowEditModal(true);
                  console.log("Row:", row)
                }}>
                <Edit size={14} className='me-50' />
                ویرایش
              </DropdownItem>
              <DropdownItem  className='w-100' color={row.active ? 'danger' : 'success'} 
                onClick={() => ActiveDeActive({id : row.id, active : !row.active})}       
              >
                <Trash size={14} className='me-50' />
                <span className='align-middle'>{row.active ? 'غیر فعال کردن'  : 'فعال کردن'}</span>
              </DropdownItem>            
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
    
  ]

  return (
    <>
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
    <EditModal
      isOpen={showEditModal}
      toggle={() => setShowEditModal(false)}
      data={selectedRow}
    />
    <DetailModal isOpen={showDetailModal}
      toggle={() => setShowDetailModal(false)}
      buildingId={selectedRow}
    />
    </>
  );
};

export default InvoiceList;
