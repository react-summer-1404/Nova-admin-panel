import React from 'react'
import List from './List'
import BreadCrumbs from '@components/breadcrumbs'

const TermManagement = () => {
  return (
    <>
      <BreadCrumbs title='ترم' data={[{ title: ' ترم دوره ها' }, { title: ' ترم' }]} />
      <div>
      <List/>
    </div>
    </>
 
  )
}

export default TermManagement
