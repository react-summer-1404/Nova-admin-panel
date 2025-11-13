import { Users } from 'react-feather'
import { Card} from 'reactstrap'
// ** Custom Components

import { useQuery } from '@tanstack/react-query'
import { getReport } from '../../../core/Services/api/Dashbord/DashboardReport'

const InCompeletSubscribe = () => {
    const {data} = useQuery({
        queryKey : ["adminReport"],
        queryFn : getReport,
    });
    
    return  (
        <Card className='test-center p-2 shadow-sm bg-white '>    
            <Users size={24} className='text-primary mb-2'/>
            <h6 className='text-muted text-center'> کاربران با اطلاعات ناقص</h6>
            <h4 className='fw-bold text-center'>{data?.inCompeletUserCount}</h4>
        </Card>       
    ) 
}

export default InCompeletSubscribe