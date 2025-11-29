// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'

// ** Expandable table component



// ** Table Server Side Column
export const serverSideColumns = [
  { name: 'ایدی دانشجو', selector: row => row.studentId, sortable: true },
  { name: 'تاریخ پرداخت', selector: row => row.PeymentDate?.slice(0,10), sortable: true }, 
  { name: 'تاریخ ثبت', selector: row => row.instertDate?.slice(0,10), sortable: true }, 
  { name: 'شماره فاکتور', selector: row => row.PaymentInvoiceNumber, sortable: true }, 
  { name: 'مبلغ پرداخت شده', selector: row => row.Paid, sortable: true }, 
  { name: 'وضعیت تایید', selector: row => row.accepted?<Badge color='light-success'>نایید شده</Badge>:<Badge color='light-danger'>رد شده</Badge>, sortable: true },
]


