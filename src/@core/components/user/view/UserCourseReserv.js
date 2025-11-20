
import React from 'react'
import { Row, Col, Alert } from 'reactstrap'
import TableBasic from '../../UserCourseReserve/TableBasic'

const UserCourseReserv = ({data}) => {
    if (!data || data.length === 0){
        return <Alert color='warning'>هیچ دوره ای رزرو نشده است</Alert>
    }
    return (
        <>
            <Row>
                <Col className='mb-2' md ={6}>
                    <TableBasic data={data}/>
                </Col>
            </Row>
        </>
    )
}

export default UserCourseReserv