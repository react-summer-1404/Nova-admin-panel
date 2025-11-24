// ** React Imports
import { Fragment, useState, useEffect, memo } from 'react'

// ** Table Columns
import { serverSideColumns } from '../socialGroupData'

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
  const store = useSelector(state => state.courseSocialGroup)
  const newStore = store?.data?.filter(item=>item.courseId==courseId)
  console.log("newStore",newStore)
  console.log("store.data",store.data)
  console.log("courseId",courseId)

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(7)

  useEffect(() => {
    dispatch(getData())
  }, [])

  return (
    <Card>
      <CardHeader className='border-bottom'>
        <CardTitle tag='h4'>گروه های اجتماعی</CardTitle>
      </CardHeader>

      <div className='react-dataTable'>
        <DataTable
          columns={serverSideColumns}
          data={newStore}
          sortIcon={<ChevronDown size={10} />}
          className='react-dataTable'
        />
      </div>
    </Card>
  )
}

export default memo(DataTableServerSide)
