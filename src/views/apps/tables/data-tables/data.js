// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'

// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p><span className='fw-bold'>Author:</span> {data.user}</p>
      <p><span className='fw-bold'>Title:</span> {data.title}</p>
      <p className='m-0'><span className='fw-bold'>Comment:</span> {data.comment}</p>
    </div>
  )
}


// ** Table Server Side Column
export const serverSideColumns = [
  { name: 'Author', selector: row => row.user, sortable: true },
  { name: 'Title', selector: row => row.title, sortable: true },
  { name: 'Comment', selector: row => row.comment, sortable: true },
  { name: 'Date', selector: row => row.date, sortable: true }
]


export default ExpandableTable
