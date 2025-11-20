// ** Reactstrap Imports
import { Card, CardHeader, Progress } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Avatar from '../../avatar'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'




const UserProjectsList = ({data}) => {

  const columns = [
    {
      sortable: true,
      minWidth: '300px',
      name: 'نام دوره',
      selector: row => row.courseId,
      cell: row => {
        // const hasImg = !!row.img
        // const fallbackText = row.courseId?.charAt(0).toUpperCase() || "?"
        return (
          <div className='d-flex justify-content-left align-items-center'>
            <div className='avatar-wrapper'>
              <Avatar className='me-1' 
              // img={hasImg ? row.img : undefined}
              // content = {!hasImg ? fallbackText : undefined}
              color = 'light-primary'
              imgWidth='32' />
            </div>
            <div className='d-flex flex-column'>
              <span className='text-truncate fw-bolder'>{row.courseId}</span>              
            </div>
          </div>
        )
      }
    },
    {
      name: 'توضیحات دوره',
      // selector: row => row.totalTasks
    },
    {
      name: 'تاریخ اخرین بروزرسانی',
      // selector: row => row.hours
    }
  ]
  return (
    <Card>
      <CardHeader tag='h4'> دوره های تایید شده</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={data.courseStudent}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default UserProjectsList
