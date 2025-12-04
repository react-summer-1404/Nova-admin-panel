import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { CommentManagment } from '../../../core/Services/api/GetUserList'
import DataTable from 'react-data-table-component'
import { Delete, Edit3 } from 'react-feather'

const handleNotImplemented = (action,commentId) => {
    console.log(`عملیات ${action} برای کامنت ${commentId} هنوز پیاده سازی نشد`)
}

const CommentColumns = [
    {
        name : "عنوان نظر " ,
        selector : row => row.title
    },
    {
        name : "متن نظر" ,
        cell : row => row.describe
    },
    {
        name : "تاریخ",
        selector : row => row.insertDate?.slice(0,10)
    },
]

const CommentTable = ({userId}) => {

    const {
        data: accepted = [],
        isLoading: loadingAccepted,
    } = useQuery({
        queryKey : ["userCommentAccepted",userId ],
        queryFn : () => CommentManagment(userId, true),
        enabled : !!userId,
    });

    const {
        data: pending = [],
        isLoading: loadingPending,
    } = useQuery({
        queryKey : ["userCommentPending",userId ],
        queryFn : () => CommentManagment(userId, false),
        enabled : !!userId,
    });

    useEffect(()=> {
        console.log("accepted:",accepted);
        console.log("pending:",pending);
    })

    if (loadingAccepted || loadingPending) 
        return <p>در حال بارگذازی نظرات ... </p>

return (
    <div style={{display :"flex", flexFlow: "column", gap:"35px"}}>
    <DataTable
        title = "لیست کامنت های تایید شده"
        columns={CommentColumns}
        data={accepted}
        
    />
    <DataTable
        title = "لیست کامنت های تایید نشده"
        columns={CommentColumns}
        data={pending}        
    />
    </div>
)
}

export default CommentTable