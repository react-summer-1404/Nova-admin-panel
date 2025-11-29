// ** Custom Components
import AvatarGroup from "@components/avatar-group";
import { Link } from "react-router-dom";

// ** Images
import defaultpPic from "../../../../assets/images/defalt.png";
// ** Icons Imports
import { MoreVertical, Edit, Trash } from "react-feather";

// ** Reactstrap Imports
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

const TableHover = (props) => {
  const { store, products, dispatch, activeView, getProducts } = props;

  return (
    <Table hover responsive style={{marginTop:20}}>
      <thead>
        <tr>
          <th>عکس دوره</th>
          <th>عنوان</th>
          <th>توضیح کوتاه دوره</th>
          <th>قیمت</th>
          <th> استاد دوره</th>
          <th>وضعیت</th>
          <th>وضعیت انقضا</th>
          <th>اقدام</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((item) => (
          <tr key={item.id}>
            <td>
            <Link to={`/apps/ecommerce/product-detail/${item.id}`}>

              <img
                className="me-75 rounded"
                src={item.image || defaultpPic}
                alt={item.name}
                height="30"
                width="30"
              />
            </Link>

            </td>
            {/* <Link to={`/apps/ecommerce/product-detail/${item.id}`}> */}
            <td className="fw-bold text-black">{item.name}</td>
            {/* </Link> */}
            
            <td>
            <p style={{ color: '#7367f0' }}>{item.miniDescribe}</p>
            </td>
            <td>
            <p >{item.price}</p>
            </td>
            <td>
              <span>{item.fullName}</span>
            </td>
            <td>
              {item.active ? (
                <Badge pill color="light-success" className="me-1">
                  فعال
                </Badge>
              ) : (
                <Badge pill color="light-danger" className="me-1">
                  غیر فعال
                </Badge>
              )}
            </td>
            <td>
              {item.isExpire ? (
                <Badge pill color="light-danger" className="me-1" >
                  نامعتبر
                </Badge>
              ) : (
                <Badge pill color="light-success" className="me-1">
                 معتبر
                </Badge>
              )}
            </td>
           
            <td>
              <UncontrolledDropdown>
                <DropdownToggle
                  className="icon-btn hide-arrow"
                  color="transparent"
                  size="sm"
                  caret
                >
                  <MoreVertical size={15} />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                    <Edit className="me-50" size={15} />{" "}
                    <span className="align-middle">Edit</span>
                  </DropdownItem>
                  <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                    <Trash className="me-50" size={15} />{" "}
                    <span className="align-middle">Delete</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableHover;
