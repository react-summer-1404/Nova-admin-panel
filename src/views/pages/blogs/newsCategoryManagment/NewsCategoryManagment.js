// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** Store & Actions
// import { getUser } from '../store'
import { useSelector, useDispatch } from "react-redux";

// import Apis
import { GetNewsCategories } from "../../../../core/Services/api/News/GetNewsCategories/index";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Alert,
  InputGroupText,
  Input,
  InputGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

// ** User View Components
// import BlogsDetailTab from './../../../apps/components/tabs/BlogsDetailTab'
// import PlanCard from './PlanCard'
import BlogsDetailInfoCard from "../../../apps/components/cards/BlogsDetailInfoCard";

// ** Styles
import "@styles/react/apps/app-users.scss";
import NewsCategoryManagmentTables from "../../../apps/components/table/blogTable/newsCategoryManagmentTableComponents";
import { Book, Search } from "react-feather";
import { useQuery } from "@tanstack/react-query";
import NewsCategoryManagmentInputGroup from "../../../forms/form-elements/input-groups/InputGroupBasic.js";

const NewsCategoryManagment = () => {
  // ** Store Vars
  // const store = useSelector(state => state.users)
  // const dispatch = useDispatch()

  // ** Hooks
  const { id } = useParams();

  // ** Get suer on mount
  // useEffect(() => {
  //   dispatch(getUser(parseInt(id)))
  // }, [dispatch])

  const [active, setActive] = useState("1");
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const { data } = useQuery({
    queryKey: ["newsCategories"],
    queryFn: GetNewsCategories,
  });
  const [categories, setCategories] = useState([]);
  const [newsCategoryId, setNewsCategoryId] = useState(data?.id);
  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const NewsCategoryManagmentThList = ["نام دسته بندی", "عنوان گوگل", "عملیات"];

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <StatsHorizontal
            icon={<Book size={21} />}
            color="primary"
            stats={categories?.length}
            statTitle="مجموع دسته بندی ها"
          />
          <Button.Ripple
            className="w-100"
            color="primary"
            onClick={() => {
              setAddCategoryModal(!addCategoryModal);
            }}
          >
            افزودن دسته بندی خبر
          </Button.Ripple>
          <Modal
            isOpen={addCategoryModal}
            toggle={() => setAddCategoryModal(!addCategoryModal)}
          >
            <ModalHeader toggle={() => setAddCategoryModal(!addCategoryModal)}>
              ویرایش دسته بندی
            </ModalHeader>
            <ModalBody>
              <Col sm="12">
                <NewsCategoryManagmentInputGroup newsCategoryId={newsCategoryId} setNewsCategoryId={setNewsCategoryId}  />
              </Col>
            </ModalBody>
          </Modal>
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <NewsCategoryManagmentTables
            thList={NewsCategoryManagmentThList}
            apiData={categories}
            dataId={newsCategoryId}
          />
        </Col>
      </Row>
    </div>
  );
};
export default NewsCategoryManagment;