// ** Icons Imports
import { useQuery } from '@tanstack/react-query';
import { MoreVertical, Edit, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { getGroupList } from '../../../core/Services/api/getGroup';
// import { GetCourseCount } from '../../../core/Services/api/Dashbord/DashboardReport';
import { getProductsCourse } from '../../../core/Services/api/getCourseList';

const TableBasic = ({data}) => {
    const { data: groups } = useQuery({
        queryKey: ["getGroupList3"],
        queryFn: getGroupList,
    });
    const cr = groups?.courseGroupDtos;
    const apiParams={
        PageNumber:1,
        RowsOfPage:120
    }
    const {data : course } = useQuery({
        queryKey:['courseName1',apiParams],
        queryFn :()=> getProductsCourse(apiParams),
    })

    const name = course?.courseDtos;
    console.log("course" ,name)
    return (
        <Table responsive>
        <thead>
            <tr>
            <th>نام گروه</th>
            <th>نام دوره</th>
            <th>ایدی دانش اموز</th>
            <th>اقدام</th>
            </tr>
        </thead>
        <tbody>
            {data?.map((item) => {
                    const foundedItem = cr?.find(g => g.id == item.courseGroupId);
                    console.log("foundedItem: ",foundedItem)
                    const courseIdName = name?.find(v => v.courseId == item.courseId);
                    console.log("courseIdName: ", courseIdName)
                return (
                <tr key={item.id}>
                    <td>
                        <span className='align-middle fw-bold'> {foundedItem?.groupName || "نامشخص"}</span>
                    </td>
                    <td>
                        <span className='align-middle fw-bold'>{courseIdName?.title || "نامشخص"}</span>
                    </td>
                    <td>
                        <span>{item.studentId}</span>
                    </td>                 
                    <td>
                        <UncontrolledDropdown>
                        <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
                            <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>
                            <Edit className='me-50' size={15} /> <span className='align-middle'>ویرایش</span>
                            </DropdownItem>
                            <DropdownItem >
                            <Trash className='me-50' size={15} /> <span className='align-middle'>حذف</span>
                            </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown>
                    </td>
                </tr> 
            );
            })}
            
        </tbody>
        </Table>
    )
    }

export default TableBasic
