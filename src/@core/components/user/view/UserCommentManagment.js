import React from 'react'
import CommentTable from '../../UserCommentManag/CommentTable'

const UserCommentManagment = () => {
    return (
        <>
        <Row>
            <Col md ={12}>
                <CommentTable data={data}/>
            </Col>
        </Row>
        </>
    )
}

export default UserCommentManagment