// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, BookOpen, Bell, Link } from 'react-feather'

// ** User Components

import Connections from './Connections'
import UserProjectsList from './UserProjectsList'
import UserCourseReserv from './UserCourseReserv'
import CommentTable from '../../UserCommentManag/CommentTable'

const UserTabs = ({ active, toggleTab, UserId, selectedUser }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>دوره ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <BookOpen className='font-medium-3 me-50' />
            <span className='fw-bold'>دوره های رزرو شده</span>
          </NavLink>
        </NavItem>        
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Bell className='font-medium-3 me-50' />
            <span className='fw-bold'>کامنت ها </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
            <Link className='font-medium-3 me-50' />
            <span className='fw-bold'>سایر اطلاعات کاربر</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <UserProjectsList UserId={UserId} />
        </TabPane>
        <TabPane tabId='2'>
          <UserCourseReserv data ={selectedUser?.courseReserve} />
        </TabPane>       
        <TabPane tabId='3'>
          <CommentTable/>
        </TabPane>
        <TabPane tabId='4'>
          <Connections selectedUser={selectedUser}/>
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
