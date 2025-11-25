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

const acceptActionColumns = {
    name : "اقدام " ,
        selector : row =>(
            <div className='d-flex gap-1'>
                <span  onClick={() => handleNotImplemented("حذف",row.id)}>
                    حذف <Delete size={15}/>
                </span>
                <span  onClick={() => handleNotImplemented("رد",row.id)}>
                    رد <Edit3 size={15}/>
                </span>
            </div>
        ),
        // button : true
};

const pendingActionColumns = {
    name : "اقدام " ,
        selector : row =>(
            <div className='d-flex gap-1'>
                <span onClick={() => handleNotImplemented("حذف",row.id)}> 
                    حذف <Delete size={15}/>
                </span>
                <span onClick={() => handleNotImplemented("پذیرش",row.id)}> 
                    پذیرش <Edit3 size={15}/>
                </span>
            </div>
        ),
        
}

const acceptedColumns = [...CommentColumns, acceptActionColumns];
const pendingColumns = [...CommentColumns, pendingActionColumns]

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
    <>
    <DataTable
        title = "لیست کامنت های تایید شده"
        columns={acceptedColumns}
        data={accepted}
        
    />
    <DataTable
        title = "لیست کامنت های تایید نشده"
        columns={pendingColumns}
        data={pending}
        
    />
    </>
)
}

export default CommentTable