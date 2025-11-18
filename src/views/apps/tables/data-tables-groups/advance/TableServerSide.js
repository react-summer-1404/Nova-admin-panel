// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'

// ** Table Columns
import { serverSideColumns } from '../data'

// ** Store & Actions
import { getData } from '../store'
import { useSelector, useDispatch } from 'react-redux'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, Input, Label, Row, Col } from 'reactstrap'

const DataTableServerSide = () => {
  const dispatch = useDispatch()
  const courseId = useSelector(state => state.ecommerce.productDetail.id)
  const teacherId = useSelector(state => state.ecommerce.productDetail.brand)
  const store = useSelector(state => state.courseGroup)
  // const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(7)

  useEffect(() => {
    if (courseId || teacherId) {
      dispatch(getData({ courseId ,teacherId }))
    }
  }, [courseId ,teacherId])
  
  // const filteredData = store.data.filter(item =>
  //   item.comment?.toLowerCase().includes(searchValue.toLowerCase())
  // )

  return (
    <Card>
      <CardHeader className='border-bottom'>
        <CardTitle tag='h4'>گروه های دوره</CardTitle>
      </CardHeader>

      {/* <Row className='mx-0 mt-1 mb-50'>
        <Col className='d-flex align-items-center justify-content-end'>
          <Label className='me-1'>جستجو</Label>
          <Input
            className='dataTable-filter'
            type='text'
            bsSize='sm'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Col>
      </Row> */}

      <div className='react-dataTable'>
        <DataTable
           noHeader
           columns={serverSideColumns}
           data={store.data}
           sortIcon={<ChevronDown size={10} />}
           pagination
           paginationPerPage={rowsPerPage}
           paginationRowsPerPageOptions={[5, 7, 10, 15]} 
           onChangeRowsPerPage={(newPerPage, page) => setRowsPerPage(newPerPage)}
        />
      </div>
    </Card>
  )
}


export default memo(DataTableServerSide)
