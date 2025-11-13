// ** Icons Imports
// import { useQuery } from '@tanstack/react-query';
import { MoreVertical, Edit, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Table, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
// import { getReport } from '../../../core/Services/api/Dashbord/DashboardReport';


const TableStriped = ({data}) => {
  
  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th>نام دوره</th>
          <th>تعداد دفعات استفاده</th>
          <th>گزینه ها</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr key={item.id}>
          <td>
            <span className='align-middle fw-bold'>{item.techName}</span>
          </td>
          <td>
          <span className='align-middle fw-bold '>{item.countUsed}</span>
          </td>
          <td>
            <UncontrolledDropdown>
              <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href='/' onClick={e => e.preventDefault()}>
                  <Edit className='me-50' size={15} /> <span className='align-middle'>ویرایش</span>
                </DropdownItem>
                <DropdownItem href='/' onClick={e => e.preventDefault()}>
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

export default TableStriped
