import { Circle, FileText } from "react-feather";

export default [
  {
    id: "pages",
    title: "صفحات",
    icon: <FileText size={20} />,
    children: [
      {
        id: "blog",
        title: "اخبار",
        icon: <Circle size={12} />,
        children: [
          {
            id: "blogList",
            title: "List",
            permissions: ["admin", "editor"],
            navLink: "/pages/blog/list",
          },
        ],
      },
    ],
  },
];
