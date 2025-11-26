import React from 'react'
import ClassList from './classList'
import BreadCrumbs from '@components/breadcrumbs'

const ClassManagement = () => {
  return (
    <>
      <BreadCrumbs title='کلاس' data={[{ title: ' کلاس دوره ها' }, { title: ' کلاس' }]} />
      <div>
      <ClassList/>
    </div>
    </>
 
  )
}

export default ClassManagement
