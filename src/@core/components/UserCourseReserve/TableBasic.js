// ** Icons Imports
import { MoreVertical, Edit, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

const statusColors = {
  true: 'bg-success',
  false: 'bg-danger'
}

const statusOptions = [
  { value: true, label: 'فعال' },
  { value: false, label: 'غیر فعال' },
]
const TableBasic = ({data}) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>نام دوره</th>
          <th>وضعیت</th>
          <th>تاریخ رزرو</th>
          <th>اقدام</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) =>(
          <tr key={item.id}>
          <td>
            <span className='align-middle fw-bold'>{item.courseName}</span>
          </td>
          <td>
            <Badge className ='text-capitalize' color={statusColors[item.active]}>
              {item.active == true ? "فعال" : "غیرفعال"}
            </Badge>
          </td>
          <td> {item.reserverDate?.slice(0,10)}</td>                    
          <td>
            <UncontrolledDropdown>
              <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem >
                  <Edit className='me-50' size={15} /> <span className='align-middle'>ویرایش</span>
                </DropdownItem>
                <DropdownItem >
                  <Trash className='me-50' size={15} /> <span className='align-middle'>حذف</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr> 
        ))}
        
      </tbody>
    </Table>
  )
}

export default TableBasic
