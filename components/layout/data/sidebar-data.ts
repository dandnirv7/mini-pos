import {
  IconChecklist,
  IconLayoutDashboard,
  IconUsers,
} from "@tabler/icons-react";
import { Command } from "lucide-react";
import { SidebarData } from "../types";

export const sidebarData: SidebarData = {
  user: {
    name: "satnaing",
    email: "satnaingdev@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Mini POS",
      logo: Command,
      plan: "Free",
    },
  ],
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: IconLayoutDashboard,
        },
        {
          title: "Product",
          url: "/dashboard/product",
          icon: IconChecklist,
        },
        {
          title: "Users",
          url: "/dashboard/users",
          icon: IconUsers,
        },
      ],
    },
  ],
};
