import { Users, UserX } from 'react-feather'
import { Card, Col} from 'reactstrap'
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
// ** Custom Components

import { useQuery } from '@tanstack/react-query'
import { getReport } from '../../../core/Services/api/Dashbord/DashboardReport'

const InCompeletSubscribe = () => {
    const {data} = useQuery({
        queryKey : ["adminReport"],
        queryFn : getReport,
    });
    
    return  (          
        <StatsHorizontal
            color='warning'          
            icon={<UserX size={20} />}
            statTitle='کاربران با اطلاعات ناقص '
            renderStats={<h3 className='fw-bolder'>{data?.inCompeletUserCount}</h3>}
        />         
    ) 
}

export default InCompeletSubscribe