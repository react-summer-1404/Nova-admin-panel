// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'

// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p><span className='fw-bold'> نام منتور :</span>{data.assistanceName} </p>
      <p className='m-0'><span className='fw-bold'>تاریخ ثبت:</span>{data.inserDate}</p>
    </div>
  )
}


// ** Table Server Side Column
export const serverSideColumns = [
  { name: 'نام منتور', selector: row => row.assistanceName, sortable: true },
  { name: 'تاریخ ثبت', selector: row => row.inserDate, sortable: true },
]


export default ExpandableTable
