// ** Third Party Components
import { Users } from 'react-feather'
import { Card} from 'reactstrap'
// ** Custom Components

import { useQuery } from '@tanstack/react-query'
import { getReport } from '../../../core/Services/api/Dashbord/DashboardReport'

const SubscribersGained = () => {
  const {data} = useQuery({
    queryKey : ["adminReport"],
    queryFn : getReport,
  });

  return  (
    <Card className='test-center p-2 shadow-sm bg-white '>    
      <Users size={24} className='text-primary mb-2'/>
      <h6 className='text-muted text-center'> کاربران</h6>
      <h4 className='fw-bold text-center'>{data?.allUser}</h4>
    </Card>
   
  ) 
}

export default SubscribersGained
