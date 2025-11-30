// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'

// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p><span className='fw-bold'>نام گروه:</span> {data.groupName}</p>
      <p><span className='fw-bold'>لینک گروه</span>{data.groupLink} </p>
    </div>
  )
}


// ** Table Server Side Column
export const serverSideColumns = [
  { name: 'نام گروه', selector: row => row.groupName, sortable: true },
  { name: 'لینک گروه', selector: row => row.groupLink, sortable: true },
]


export default ExpandableTable
