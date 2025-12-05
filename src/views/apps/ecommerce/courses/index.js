// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Shop Components
// import Sidebar from './Sidebar'
import Products from "./Products";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../store";

// ** Styles
import "@styles/react/apps/app-ecommerce.scss";
import { Button, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import CoursesListTab from "../../components/tabs/CoursesListTab";
import StatsVertical from "@components/widgets/stats/StatsVertical";
import { Book, Grid,CheckCircle } from "react-feather";
import { useQuery } from "@tanstack/react-query";
import { getProductsCourse } from "../../../../core/Services/api/getCourseList";
import { listMyCourse } from "../../../../core/Services/api/CourseListApi";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

const Shop = () => {
  // ** States
  // const [activeView, setActiveView] = useState('grid')
  // const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate();
  // ** Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.ecommerce);

  // ** Get products
  useEffect(() => {
    dispatch(
      getProducts({
        q: "",
        sortBy: "featured",
        perPage: 9,
        page: 1,
      })
    );
  }, [dispatch]);
  const { data } = useQuery({
    queryKey: ["datalength"],
    queryFn: getProductsCourse,
  });
  console.log("data",data?.courseDtos)
  const { data: myCourse } = useQuery({
    queryKey: ["mycourselength"],
    queryFn: listMyCourse,
  });
  const active = data?.courseDtos.filter(item=>item.active==true)
  return (
    <Fragment>
      <Breadcrumbs
        title="دوره ها"
        data={[{ title: "مدیریت دوره ها" }, { title: "دوره ها" }]}
      />
      <CoursesListTab />
      <StatsHorizontal
        icon={<Book size={21} />}
        color="info"
        stats={data?.totalCount}
        statTitle="مجموع دوره ها"
      />

      <StatsHorizontal
        icon={<Grid size={21} />}
        color="primary"
        stats={myCourse?.totalCount}
        statTitle="تعددا دوره های من"
      />
      <StatsHorizontal
        icon={<CheckCircle size={21} />}
        color="success"
        stats={active?.length}
        statTitle="تعداد دوره های فعال"
      />

      <Button
        color="primary"
        style={{ width: 250 }}
        onClick={() => navigate("/apps/ecommerce/createCourse")}
      >
        افزودن دوره جدید +
      </Button>
    </Fragment>
  );
};
export default Shop;
