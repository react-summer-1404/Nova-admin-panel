import CardCongratulations from "../@core/components/CardCongratulations/CardCongratulations";
import GoalOverview from "../@core/components/GoalView/GoalOverview";
import { Row, Col } from 'reactstrap'
import SubscribersGained from "../@core/components/Subscribe/Subscribs.js";
import InCompeletSubscribe from "../@core/components/inCompeletSubscribe/inCompeletSubscribe.js";
import Earnings from "../@core/components/Earnings/Earnings.js";
import TableStriped from "../@core/components/CourseTable/TableStriped.js";
import { useQuery } from "@tanstack/react-query";
import { getTechReport } from "../core/Services/api/Dashbord/DashboardTechnologyReport/index.js";
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import { Award, Book, Send, User, Users } from "react-feather";
import { GetCommentTotal, GetDataCount} from "../core/Services/api/Dashbord/DashboardReport/index.js";
import { getProductsCourse } from "../core/Services/api/getCourseList/index.js";
import PolarAreaChart from '../@core/components/Chart/ChartjsPolarAreaChart.js';
import BarChart from '../@core/components/Chart/ChartjsBarChart.js';

const Home = () => {
  
  const {data} = useQuery({
    queryKey : ["adminTechReport"],
    queryFn : getTechReport,
  });

  const{data : commentTotal} = useQuery({
    queryKey : ["total"],
    queryFn : GetCommentTotal
  })
  const {data : course} = useQuery({
    queryKey : ["courseTotal"],
    queryFn : getProductsCourse
  })

  const{data: dataCount} = useQuery({
    queryKey : ["dataTotal"],
    queryFn : GetDataCount 
  })
  const teacherUser = dataCount?.listUser?.filter(listUser => listUser.roles?.includes("teacher"))
  const studentUser = dataCount?.listUser?.filter(listUser => listUser.roles?.includes("student"))

  
  return (
    
    <>
    <Row>                      
      <Col lg={6} sm={6}>   
        <CardCongratulations />
      </Col>
      <Col lg={4} sm={4}>   
        <Earnings/>
      </Col>      
    </Row>
    <Row>
      <Col lg={6} sm={6}>   
        <GoalOverview />
      </Col>   
      <Col lg={3} sm={4}>   
        <SubscribersGained/>
        <StatsHorizontal
          color='danger'          
          icon={<Award size={20} />}
          statTitle=' اساتید '
          renderStats={<h3 className='fw-bolder'>{teacherUser?.length}</h3>}
        />
        <StatsHorizontal
          color='success'          
          icon={<User size={20} />}
          statTitle=' دانشجویان '
          renderStats={<h3 className='fw-bolder'>{studentUser?.length}</h3>}
        />
      </Col>
      <Col lg={3} sm={6}>   
        <InCompeletSubscribe/>
        <StatsHorizontal
          color='info'          
          icon={<Send size={20} />}
          statTitle='کامنت ها '
          renderStats={<h3 className='fw-bolder'>{commentTotal?.totalCount}</h3>}
        />
        <StatsHorizontal
          color='secondary'          
          icon={<Book size={20} />}
          statTitle='دوره ها '
          renderStats={<h3 className='fw-bolder'>{course?.totalCount}</h3>}
        />        
      </Col>
    </Row>
    <Row>
      <Col lg={6} sm={6}>
        <PolarAreaChart        
          greyColor={"#4F5D70"}
            labelColor={'#b4b7bd'}
            yellowColor={'#ffe800'}
            primary={'#836AF9'}
            infoColorShade={'#299AFF'}
            warningColorShade={'#84D0FF'}
            successColorShade={'#28dac6'}/>
      </Col>
      <Col lg={6} sm={6}>
      <BarChart success={'#836AF9'} labelColor={'#b4b7bd'} gridLineColor={"#4F5D70"} />
      </Col>
    </Row>
    <Row>
      <Col lg={12}>      
        <TableStriped data = {data} />
      </Col>
    </Row>
    
    </>
  );
};

export default Home;
