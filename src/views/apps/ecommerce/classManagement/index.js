import React from 'react'
import List from './List'
import BreadCrumbs from '@components/breadcrumbs'

const ClassManagement = () => {
  return (
    <>
      <BreadCrumbs title='کلاس' data={[{ title: ' کلاس دوره ها' }, { title: ' کلاس' }]} />
      <div>
      <List/>
    </div>
    </>
 
  )
}

export default ClassManagement
