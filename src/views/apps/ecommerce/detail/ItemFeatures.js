// ** Icon Imports
import { MessageSquare, Users, Layers } from 'react-feather'
// ** Reactstrap Imports
import { Row, Col, CardText } from 'reactstrap'

const ItemFeatures = ({data}) => {
  

  return (
    <div className='item-features'>
      <Row className='text-center'>
        <Col className='mb-4 mb-md-0' md='4' xs='12'>
          <div className='w-75 mx-auto'>
            <MessageSquare />
            <h4 className='mt-2 mb-1'>{data?.courseCommentTotal}</h4>
            <CardText>تعداد  نظراتی که کاربران برای این دوره ثبت کردن </CardText>
          </div>
        </Col>
        <Col className='mb-4 mb-md-0' md='4' xs='12'>
          <div className='w-75 mx-auto'>
            <Users />
            <h4 className='mt-2 mb-1'>{data.reserveUserTotal}</h4>
            <CardText>تعداد کاربرانی که این دوره را رزرو کردند</CardText>
          </div>
        </Col>
        <Col className='mb-4 mb-md-0' md='4' xs='12'>
          <div className='w-75 mx-auto'>
            <Layers />
            <h4 className='mt-2 mb-1'>{data.courseGroupTotal}</h4>
            <CardText>تعداد گروه هایی که این دوره در انها قرار دارد</CardText>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ItemFeatures
