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
      name: "Shadcn Admin",
      logo: Command,
      plan: "Vite + ShadcnUI",
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
          title: "Products",
          url: "/dashboard/products",
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
