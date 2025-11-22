import React from 'react'
import { Row, Col, Alert } from 'reactstrap'
import TableBasic from "../../UserCourse/TableBasic"

const UserProjectsList = ({data}) => {
  if (!data || data.length === 0){
        return <Alert color='warning' className ='py-2 text-center'>هیچ دوره ای یافت نشد </Alert>
  }
  return (
    <>
      <Row>
          <Col md ={12}>
              <TableBasic data={data}/>
          </Col>
      </Row>
    </>
  )
}

export default UserProjectsList