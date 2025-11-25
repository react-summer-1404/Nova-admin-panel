// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useUserList } from '../../../../core/Hook/useQUserApi'

const UsersList = () => {
  const apiParams = {
      PageNumber:1,
      RowsOfPage:10,
      SortingCol:'',
      SortType : '',
      // ...(searchTerm && {Query : searchTerm}),
      // ...(isActive.value != "" && {IsActiveUser : isActive.value}),
      // ...(isDeleted.value !="" && {IsDeletedUser : isDeleted.value}),  
      // ...(selectedRoleID.value !="" && {roleId : selectedRoleID.value}),   
      
  }
  // console.log("selectedRoleID", selectedRoleID)
  const {data} = useUserList(apiParams)
  const activeUser = data?.listUser?.filter(listUser => listUser.active === true);
  const teacherUser = data?.listUser?.filter(listUser => listUser.roles?.includes("teacher"))
  const studentUser = data?.listUser?.filter(listUser => listUser.roles?.includes("student"))
  return (
    <div className='app-user-list'>
      <Row>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='تعداد کاربران'
            icon={<User size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{data?.totalCount}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='success'
            statTitle='کاربران فعال '
            icon={<UserCheck size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{activeUser?.length}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='danger'
            statTitle=' اساتید'
            icon={<UserPlus size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{teacherUser?.length}</h3>}
          />
        </Col>       
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='warning'
            statTitle='دانشجویان '
            icon={<UserX size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{studentUser?.length}</h3>}
          />
        </Col>
      </Row>
      <Table />
    </div>
  )
}

export default UsersList
