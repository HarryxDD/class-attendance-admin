import {
  AiOutlineBarChart,
  AiOutlineProject,
  AiOutlineTeam,
  AiOutlineUser,
  AiOutlineUserSwitch,
} from "react-icons/ai";

import routesConfig from "../config/route";

import { BsChatDots } from "react-icons/bs";

export const adminLinks = [
  {
    title: "Pages",
    links: [
      {
        name: "attendance",
        icon: <AiOutlineUserSwitch />,
        link: routesConfig.attendance,
      },
      // {
      //   name: "employees",
      //   icon: <AiOutlineTeam />,
      //   link: routesConfig.employees,
      // },
      // {
      //   name: "chart",
      //   icon: <AiOutlineBarChart />,
      //   link: routesConfig.chart,
      // },
      // {
      //   name: "Me",
      //   icon: <AiOutlineUser />,
      //   link: routesConfig.profile,
      // },
      // {
      //   name: "Task",
      //   icon: <AiOutlineProject />,
      //   link: routesConfig.task,
      // },
      // {
      //   name: "Chat",
      //   icon: <BsChatDots />,
      //   link: routesConfig.chat,
      // },
    ],
  },
];

export var memberLinks = [
  {
    title: "Pages",
    links: [
      {
        name: "attendance",
        icon: <AiOutlineProject />,
        link: routesConfig.attendance,
      },
      {
        name: "students",
        icon: <AiOutlineUserSwitch />,
        link: routesConfig.students,
      },
      // {
      //   name: "Me",
      //   icon: <AiOutlineUser />,
      //   link: routesConfig.profile,
      // },
      // {
      //   name: "Task",
      //   icon: <AiOutlineProject />,
      //   link: routesConfig.task,
      // },
      // {
      //   name: "Chat",
      //   icon: <BsChatDots />,
      //   link: routesConfig.chat,
      // },
    ],
  },
];
