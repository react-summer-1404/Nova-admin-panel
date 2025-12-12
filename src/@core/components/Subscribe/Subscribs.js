// ** Third Party Components
import { Users } from 'react-feather'
import { Card} from 'reactstrap'
// ** Custom Components

import { useQuery } from '@tanstack/react-query'
import { getReport } from '../../../core/Services/api/Dashbord/DashboardReport'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

const SubscribersGained = () => {
  const {data} = useQuery({
    queryKey : ["adminReport"],
    queryFn : getReport,
  });

  return  (
      <StatsHorizontal
        color='primary'          
        icon={<Users size={20} />}
        statTitle='تعداد کاربران '
        renderStats={<h3 className='fw-bolder'>{data?.allUser}</h3>}
      />    
  ) 
}

export default SubscribersGained
