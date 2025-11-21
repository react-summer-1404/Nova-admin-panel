// ** React Imports
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { useUserDetails } from '../../../../core/Hook/useQUserApi'
// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import UserInfoCard from './UserInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'

const UserView = () => {
  // ** Hooks
  const { id } = useParams()
  const [active, setActive] = useState('1')

  const toggleTab = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const {data : selectedUser, isLoading, error } = useUserDetails(id)
  console.log("data:",selectedUser)

  if(isLoading){
    <Alert color='info'>...درحال بارگذاری اطلاعات کاربر </Alert>
  }

  // if(error || !selectedUser){
  //   return (
  //     <div className='text-center'>
  //       <h4 className='mb-1'>کاربر یافت نشد</h4>
  //       <p className='mb-1'>
  //         <h4>کاربری با این شناسه وجود ندارد لیست کامل کاربران را ببینید : {id}</h4>
  //         <Link to={'/list'}>لیست کاربران </Link>
  //       </p>
  //     </div>
  //   )
  // }
  return (
    <div className='app-user-view'>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={selectedUser} />
        </Col>
        <Col xl='8' lg='7' xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} UserId={id} selectedUser = {selectedUser}/>
        </Col>
      </Row>
    </div>
  ) 
}
export default UserView
