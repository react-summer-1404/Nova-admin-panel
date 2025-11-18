// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'

// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p><span className='fw-bold'>ظرفیت گروه</span>{data.groupCapacity} </p>
      <p className='m-0'><span className='fw-bold'>عنوان:</span>{data.title}</p>
    </div>
  )
}


// ** Table Server Side Column
export const serverSideColumns = [
  { name: 'ظرفیت گروه', selector: row => row.groupCapacity, sortable: true },
  { name: 'عنوان', selector: row => row.title, sortable: true },
]


export default ExpandableTable
