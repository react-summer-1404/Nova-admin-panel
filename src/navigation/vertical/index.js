import { Mail, Home, Airplay, Circle, Users, BookOpen } from "react-feather";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "userManage",
    title: "مدیریت کاربران",
    icon: <Users size={20} />,
    navLink: "/userManagement",
  },
  {
    id: "secondPage",
    title: "Second Page",
    icon: <Mail size={20} />,
    navLink: "/second-page",
  },
  {
    id: "smaplePage",
    title: "Sample Page",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
    ],
  },
  {
    id: "coursePage",
    title: "مدیریت دوره ها",
    icon: <BookOpen size={20} />,
    
    children: [
      {
        id: "courses",
        title: "لیست دوره ها",
        icon: <Circle size={12} />,
        navLink: "/courses/list",
      },
    ],
  },
];
