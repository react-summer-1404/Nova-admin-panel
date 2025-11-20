import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { CommentManagment } from '../../../core/Services/api/GetUserList'
import { Cell } from 'recharts'
import { Badge } from 'reactstrap'
import DataTable from 'react-data-table-component'

const {data} = useQuery({
    queryKey : ["commentManag"],
    queryFn : () => CommentManagment({
        PageNumber : 1,
        RowsOfPage: 10,
    })
})

const columns = [
    {
        name : "عنوان",
        selector : row => row.title
    },
    {
        name : "متن",
        cell : row => (
            <Badge color={row.accept? 'success' : "warning"}>
                {row.accept ? "تایید نشده" : "تایید شده"}
            </Badge>
        )
    },
    {
        name : "تاریخ",
        selector : row => row.insertDate.slice(0,10)
    }
]

return (
    <DataTable
        title = "لیست کامنت ها"
        columns={columns}
        data={data}
        pagination
    />
)