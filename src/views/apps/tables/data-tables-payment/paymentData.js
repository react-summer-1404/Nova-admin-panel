// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'

// ** Expandable table component
const userExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p><span className='fw-bold'>ایدی دانشجو:</span> {data.studentId}</p>
      <p className='m-0'><span className='fw-bold'>تاریخ پرداخت:</span>{data.PeymentDate}</p>
      <p className='m-0'><span className='fw-bold'>تاریخ ثبت:</span>{data.instertDate}</p>
      <p className='m-0'><span className='fw-bold'>شماره فاکتور:</span>{data.PaymentInvoiceNumber}</p>
      <p className='m-0'><span className='fw-bold'> مبلغ پرداخت شده:</span>{data.Paid}</p>
      <p className='m-0' ><span className='fw-bold'>وضعیت تایید:</span>{data.accepted}</p>
    </div>
  )
}


// ** Table Server Side Column
export const serverSideColumns = [
  { name: 'ایدی دانشجو', selector: row => row.studentId, sortable: true },
  { name: 'تاریخ پرداخت', selector: row => row.PeymentDate, sortable: true }, 
  { name: 'تاریخ ثبت', selector: row => row.instertDate, sortable: true }, 
  { name: 'شماره فاکتور', selector: row => row.PaymentInvoiceNumber, sortable: true }, 
  { name: 'مبلغ پرداخت شده', selector: row => row.Paid, sortable: true }, 
  { name: 'وضعیت تایید', selector: row => row.accepted?"accept":"reject", sortable: true },
]


export default userExpandableTable
