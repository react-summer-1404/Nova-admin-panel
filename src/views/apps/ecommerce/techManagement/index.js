import React from 'react'
import List from './List'
import BreadCrumbs from '@components/breadcrumbs'

const TechManagement = () => {
  return (
    <>
      <BreadCrumbs title='  تکنولوژِی' data={[{ title: ' تکنولوژی دوره ها' }, { title: ' تکنولوژِی' }]} />
      <div>
      <List/>
    </div>
    </>
 
  )
}

export default TechManagement
