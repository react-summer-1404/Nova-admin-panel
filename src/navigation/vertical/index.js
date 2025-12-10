import { Clock, Home, Airplay, Circle, Users, BookOpen ,Briefcase ,User, MessageSquare } from "react-feather";
// ** Navigation imports
import pages from "./pages"

// ** Merge & Export
export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "users",
    title: "مدیریت کاربران",
    icon: <User size={20} />,
    navLink: "/list",
  },
  
  
  {
    id: "eCommerce",
    title: "مدیریت دوره ها",
    icon: <BookOpen size={20} />,
    children: [
      {
        id: "shop",
        title: "لیست دوره ها",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/courses",
      },
      {
        id: "checkout",
        title: "ساخت دوره",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/createCourse",
      },
      {
        id: "techList",
        title: " تکنولوژی دوره ها",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/techManagement",
      },
      {
        id: "statusList",
        title: " وضعیت دوره ها",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/statusManagement",
      },
      {
        id: "statusList",
        title: " سطح دوره ها",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/levelManagement",
      },
      {
        id: "statusList",
        title: "لیست کاربران",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/useList",
      },
      {
        id: "classList",
        title: "لیست کلاس ها",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/classList",
      },
      {
        id: "classList",
        title: "ترم ها",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/termList",
      },
      {
        id: "TermList",
        title: "  تسک ها",
        icon: <Circle size={12} />,
        navLink: "/apps/ecommerce/TaskList",
      },
    ],
  },
  ...pages,
  {
    id:"schedules",
    title:"مدیریت  بازه های زمانی",
    icon:<Clock size={12}/>,
    navLink: "/schedule",
    children:[
      {
        id: "AdminSchedule",
        title: "بازه زمانی ادمین",
        icon: <Circle size={12} />,
        navLink: "/schedule/adminSchedule",
      },
      {
        id: "StudentSchedule",
        title: "بازه زمانی کاربر",
        icon: <Circle size={12} />,
        navLink: "/schedule/studentSchedule",
      },
    ]
  },
  {
    id: "departmentList",
    title: "دپارتمان",
    icon: <Briefcase  size={12} />,
    navLink: "/apps/ecommerce/Department",
  },
  {
    id: "buildings",
    title: "ساختمان ها ",
    icon: <Home size={20} />,
    navLink: "/building",
  },
  {
    id: "chat",
    title: "پیام ها ",
    icon: <MessageSquare size={20} />,
    navLink: "/chat",
  },
  
];
