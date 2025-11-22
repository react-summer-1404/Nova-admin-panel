import React from 'react'
import { Row, Col, Alert } from 'reactstrap'
import TableBasic from '../../UserCourseReserve/TableBasic'

const UserCourseReserv = ({data}) => {
    if (!data || data.length === 0){
        return <Alert color='warning' className ='py-2 text-center'>هیچ دوره ای رزرو نشده است</Alert>
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
export default UserCourseReserv