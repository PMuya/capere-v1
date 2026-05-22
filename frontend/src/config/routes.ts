import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  BarChart3,
  Wallet,
  Settings,
} from "lucide-react";

export const routes = [
  {
    title: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },

  {
    title: "Curriculum",
    icon: BookOpen,
    children: [
      {
        title: "Subjects",
        href: "/dashboard/admin/curriculum/subjects",
       
      },
      {
        title: "Curriculum Builder",
        href: "/dashboard/admin/curriculum/builder",
      
      },
      {
        title: "Timetable",
        href: "/dashboard/admin/curriculum/timetable",
       
      },
    ],
  },

  {
    title: "Examination",
    href: "/dashboard/admin/examination",
    icon: GraduationCap,
    children: [
      {
        title: "Timetable",
        href: "/dashboard/admin/examination/timetable",
       
      },
      {
        title: "Grading",
        href: "/dashboard/admin/examination/grading",
       
      },
      {
        title: "Analysis",
        href: "/dashboard/admin/examination/analysis",
       
      },
    ],
  },

  {
    title: "Analytics",
    href: "/dashboard/admin/analytics",
    icon: BarChart3,
  },

  {
    title: "Finance",
    href: "/dashboard/admin/finance",
    icon: Wallet,
  },

  {
    title: "Settings",
    href: "/dashboard/admin/settings",
    icon: Settings,
  },
];