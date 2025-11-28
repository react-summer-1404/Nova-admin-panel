// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Invoice List Sidebar
import Sidebar from './Sidebar'

// ** Table Columns
import { columns } from './columns'


// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown} from 'react-feather'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useUserList } from '../../../../core/Hook/useQUserApi'
import { useDeleteUser } from '../../../../core/Hook/useMUserApi'



// ** Table Header
const CustomHeader = ({toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm }) => {
  
  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'>نمایش</label>
            <Input
              className='mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>            
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
              جستجو:
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>

          <div className='d-flex align-items-center table-header-actions'>
            <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
              افزودن کاربر
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const UsersList = () => {

const [page, setPage] = useState(1)
const [rowsPerPage, setRowsPerPage] = useState(10)
const [sortColumn, setSortColumn] = useState('insertDate')
const [sortType, setSortType] = useState('desc')
const [searchTerm, setSearchTerm] = useState('')
const [selectedRoleID, setSelectedRoleID] = useState({ value: '', label: 'همه'})
const [sidebarOpen, setSidebarOpen] = useState(false)


  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** User filter options
  const roleOptions = [
    { value: '', label: 'همه' },
    { value: 1, label: 'مدیر' },
    { value: 2, label: 'معلم' },
    { value: 3, label: 'دانش آموز' },
    // { value: 4, label: 'مدیر ویژه' },
  ]

  const deleteOptions = [
    { value: '', label: 'همه' },
    { value: true, label: 'حذف شده' },
    { value: false, label: 'غیر حذف شده' },
  ]
  const [isDeleted, setIsDeleted] = useState(deleteOptions[0])

  const activeOptions = [
    { value: '', label: 'همه' },
    { value: true, label: 'فعال' },
    { value: false, label: 'غیر فعال' },
  ]
  const [isActive, setIsActive] = useState(activeOptions[0])


  const apiParams = {
    PageNumber:page,
    RowsOfPage:rowsPerPage,
    SortingCol:sortColumn,
    SortType : sortType,
    ...(searchTerm && {Query : searchTerm}),
    ...(isActive.value != "" && {IsActiveUser : isActive.value}),
    ...(isDeleted.value !="" && {IsDeletedUser : isDeleted.value}),  
    ...(selectedRoleID.value !="" && {roleId : selectedRoleID.value}),   
    
}
console.log("selectedRoleID", selectedRoleID)
const {data,refetch} = useUserList(apiParams)

const users = data?.listUser || []
const total = data?.totalCount || 0

  // ** Function in get data on page change
  const handlePagination = page => {
    setPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(data?.totalCount / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={page !== 0 ? page - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    )
  }

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      role: selectedRoleID.value,
      currentDelete: isDeleted.value,
      status: isActive.value,
      Query: searchTerm
    }

    const isFiltered = Object.keys(filters).some( k => {
      const val = filters[k]
      return typeof val === "string"?  val.length > 0 : !!val
    })

    if (users.length > 0) {
      return users
    } else if (users.length === 0 && isFiltered) {
      return []
    } else {
      return users
      // return users.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSortType(sortDirection)
    setSortColumn(column.sortField)
  }

  const {mutate: deleteUser, onSuccess} = useDeleteUser(() => {
    onSuccess.toast.success("کاربر با موفقیت حذف شد در انتظار تایید توسط مدیران " )
    refetch()
  })

  const handleDelete = (row) => {
    deleteUser(row.id)
  }

  const tableColumns = columns({handleDelete})

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>فیلتر</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md='4'>
              <Label for='role-select'>نقش</Label>
              <Select
                isClearable={false}
                value={selectedRoleID}
                options={roleOptions}
                className='react-select'
                classNamePrefix='select'
                theme={selectThemeColors}
                onChange={(data) => {
                  setSelectedRoleID(data)
                }}
              />
            </Col>
            <Col className='my-md-0 my-1' md='4'>
              <Label for='active-select'> وضعیت</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={activeOptions}
                value={isActive}
                onChange={data => {
                  setIsActive(data)
                }}
              />
            </Col>
            <Col md='4'>
              <Label for='delete-select'>همه</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={deleteOptions}
                value={isDeleted}
                onChange={data => {
                  setIsDeleted(data)
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={tableColumns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                total={total}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </Fragment>
  )
}

export default UsersList
