// ** React Import
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// ** Custom Components

// ** Images

// ** Icons Imports
import { MoreVertical, Edit, Trash, XSquare, Check, Eye } from "react-feather";

// ** APIs Imports

// ** Reactstrap Imports
import { Table } from "reactstrap";
import toast from "react-hot-toast";
import instance from "../../../../core/interseptor/Interseptor";

const CommentTable = ({ dataId, apiData, thList, title }) => {
  // ** States
  const [data, setData] = useState();
  const [replyData, setReplyData] = useState([]);

  const { id } = useParams();

  // ** Get News Comment
  useEffect(() => {
    instance.get(`/News/GetNewsComments?NewsId=${id}`).then(async (res) => {
      setData(res.data);
      // ** Get News Reply Comment
      const replies = await Promise.all(
        res.data.map(c => 
          instance
            .get(`/News/GetRepliesComments?Id=${c.id}`)
            .then((r) => r.data)
        )
      );
      setReplyData(replies.flat());
    });
  }, [id]);

  const navigate = useNavigate();

  return (
    <Table responsive>
      <thead>
        <tr>
          {thList?.map((item) => {
            return <th key={item.id}>{item}</th>;
          })}
        </tr>
      </thead>
      {data?.map((item, index) => {
        return (
          <tbody>
            <tr>
              <td>{item?.userFullName}</td>
              <td>{item?.title}</td>
              <td>{item?.describe}</td>
              <td>
                {replyData?.find(r => r.parentId === item.id) ? (
                  <Eye size={20} />
                ) : (
                  ""
                )}
              </td>
            </tr>
          </tbody>
        );
      })}
    </Table>
  );
};

export default CommentTable;
