// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

//CheckCircle
// ** Third Party Components
import {
  Edit,
  Trash,
  MoreVertical,
} from 'react-feather'

// ** Table columns
export const columns = [
  {
    name: 'ایدی',
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
            <DropdownItem tag={Link} to={`/apps/invoice/edit/${row.id}`} className='w-100'>
              <Edit size={14} className='me-50' />
              <span className='align-middle'>ویرایش</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteInvoice(row.id))
              }}
            >
              <Trash size={14} className='me-50' />
              <span className='align-middle'>غیرفعال</span>
            </DropdownItem>            
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
