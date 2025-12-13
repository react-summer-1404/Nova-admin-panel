// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import {Card, CardBody} from 'reactstrap'
// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

const UserInfoCard2 = ({ selectedUser }) => {

  
  return (
    <Fragment>
      <Card>
        <CardBody>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>سایر اطلاعات</h4>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25 text-primary'>محل سکونت:</span>
                  <span>{selectedUser?.homeAdderess}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25 text-primary'> تاریخ تولد:</span>
                  <span>{selectedUser?.birthDay?.slice(0,10)}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25 text-primary'>تکمیل پروفایل:</span>                  
                    {selectedUser?.profileCompletionPercentage}%
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25 text-primary'>ادرس تلگرام:</span>
                  <span className='text-capitalize'>{selectedUser?.telegramLink}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25 text-primary'>درباره کاربر :</span>
                  <span className='text-capitalize'>{selectedUser?.userAbout}</span>
                </li>  
                <li className='mb-75'>
                  <span className='fw-bolder me-25 text-primary'> لینکدین :</span>
                  <span className='text-capitalize'>{selectedUser?.linkdinProfile}</span>
                </li> 
                <li className='mb-75'>
                  <span className='fw-bolder me-25 text-primary'>کد ملی  :</span>
                  <span className='text-capitalize'>{selectedUser?.nationalCode}</span>
                </li>             
                <li className='mb-75'>
                  <span className='fw-bolder me-25 text-primary'>تاریخ درج :</span>
                  <span className='text-capitalize'>{selectedUser?.insertDate}</span>
                </li> 
                <li className='mb-75'>
                  <span className='fw-bolder me-25 text-primary'>درباره کاربر :</span>
                  <span className='text-capitalize'>{selectedUser?.userAbout}</span>
                </li> 
              </ul>
            ) : null}
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default UserInfoCard2