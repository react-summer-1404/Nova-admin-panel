import React from 'react'
import List from './List'
import BreadCrumbs from '@components/breadcrumbs'

const StatusManagement = () => {
  return (
    <>
      <BreadCrumbs title='وضعیت' data={[{ title: ' وضعیت دوره ها' }, { title: ' وضعیت' }]} />
      <div>
      <List/>
    </div>
    </>
 
  )
}

export default StatusManagement
