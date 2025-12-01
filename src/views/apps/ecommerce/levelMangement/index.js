import React from 'react'
import List from './List'
import BreadCrumbs from '@components/breadcrumbs'

const LevelManagement = () => {
  return (
    <>
      <BreadCrumbs title='سطح' data={[{ title: '  سطح دوره ها' }, { title: ' سطح' }]} />
      <div>
      <List/>
    </div>
    </>
 
  )
}

export default LevelManagement
