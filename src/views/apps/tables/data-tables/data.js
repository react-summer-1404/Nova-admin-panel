// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'

// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p><span className='fw-bold'>نویسنده:</span> {data.user}</p>
      <p><span className='fw-bold'>ایدی کاربر</span>{data.userId} </p>
      <p className='m-0'><span className='fw-bold'>تاریخ:</span>{data.Date}</p>
      <p className='m-0'><span className='fw-bold'>عنوان:</span>{data.title}</p>
      <p className='m-0' ><span className='fw-bold'>وضعیت تایید:</span>{data.accepted}</p>
    </div>
  )
}


// ** Table Server Side Column
export const serverSideColumns = [
  { name: 'نویسنده', selector: row => row.user, sortable: true },
  { name: 'ایدی کاربر', selector: row => row.userId, sortable: true },
  { name: 'عنوان', selector: row => row.comment, sortable: true },
  { name: 'تاریخ', selector: row => row.date?.slice(0,10), sortable: true },
  { name: 'وضعیت تایید', selector: row => row.accepted?"accept":"reject", sortable: true },
]


export default ExpandableTable
