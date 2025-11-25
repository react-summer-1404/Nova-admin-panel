import React from 'react'
import CommentTable from '../../UserCommentManag/CommentTable'
import { Col, Row } from 'reactstrap'

const UserCommentManagment = ({userId}) => {
    return (
        <>
        <Row>
            <Col md ={12}>
                <CommentTable userId={userId}/>
            </Col>
        </Row>
        </>
    )
}

export default UserCommentManagment