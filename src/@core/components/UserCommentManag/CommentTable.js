import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { CommentManagment } from '../../../core/Services/api/GetUserList'
import DataTable from 'react-data-table-component'
import { Delete, Edit3 } from 'react-feather'


const customStyles = {
    rows: {
        style: {
            minHeight: '60px',
            '&:hover': {
            backgroundColor: '#f0f8ff',
            },
        },
    },
};

const conditionalRowStyles = [
    {
        when: row => row.status === 'accepted',
        style: {
            backgroundColor: '#d1e7dd',
        },
    },
    {
        when: row => row.status === 'pending',
        style: {
        backgroundColor: '#f8d7da',
        },
    },
];
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
    <div style={{display :"flex", flexFlow: "column"}}>
    <h2 style={{marginBottom:"0px", marginTop:"30px", height: "40px", textAlign:"center", background:"rgb(235, 234, 234)", paddingRight:"10px"}}>لیست کامنت های تایید شده</h2>
    <DataTable
    style={{backgroundColor:"f8f8f8"}}
        columns={CommentColumns}
        data={accepted}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
    />
    <div>
    <h2 style={{marginBottom:"0px", marginTop:"30px", height: "40px", textAlign:"center", background:"rgb(235, 234, 234)", paddingRight:"10px"}}>لیست کامنت های تایید نشده</h2>
    <DataTable
    style={{backgroundColor:"f8f8f8"}}
        columns={CommentColumns}
        data={pending}  
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}      
    />
    </div>
    </div>
)
}

export default CommentTable