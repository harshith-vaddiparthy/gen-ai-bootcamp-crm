"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  ActivityIcon,
  BadgeDollarSignIcon,
  BotIcon,
  BriefcaseBusinessIcon,
  Building2Icon,
  ChartNoAxesCombinedIcon,
  CircleGaugeIcon,
  ClipboardListIcon,
  ContactIcon,
  HandshakeIcon,
  LayoutDashboardIcon,
  ListChecksIcon,
  Settings2Icon,
  SparklesIcon,
  TargetIcon,
  UsersRoundIcon,
} from "lucide-react"

const data = {
  user: {
    name: "Avery Jones",
    email: "avery@pulsecrm.ai",
    avatar: "",
  },
  teams: [
    {
      name: "PulseCRM Sales",
      logo: <CircleGaugeIcon />,
      plan: "Revenue team",
    },
    {
      name: "Mid-Market Pod",
      logo: <TargetIcon />,
      plan: "Active pipeline",
    },
    {
      name: "Expansion Desk",
      logo: <BadgeDollarSignIcon />,
      plan: "Customer growth",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon />,
      isActive: true,
      items: [
        {
          title: "Forecast pulse",
          url: "/dashboard/forecast",
        },
        {
          title: "Team activity",
          url: "/dashboard/activity",
        },
        {
          title: "AI recommendations",
          url: "/dashboard/ai-recommendations",
        },
      ],
    },
    {
      title: "Leads",
      url: "/leads",
      icon: <UsersRoundIcon />,
      items: [
        {
          title: "New queue",
          url: "/leads",
        },
        {
          title: "Qualified",
          url: "/leads",
        },
        {
          title: "Imports",
          url: "/leads",
        },
      ],
    },
    {
      title: "Contacts",
      url: "/contacts",
      icon: <ContactIcon />,
      items: [
        {
          title: "All contacts",
          url: "/contacts",
        },
        {
          title: "Decision makers",
          url: "/contacts",
        },
        {
          title: "Champions",
          url: "/contacts",
        },
      ],
    },
    {
      title: "Accounts",
      url: "/accounts",
      icon: <Building2Icon />,
      items: [
        {
          title: "Named accounts",
          url: "/accounts",
        },
        {
          title: "Health review",
          url: "/accounts",
        },
        {
          title: "Expansion",
          url: "/accounts",
        },
      ],
    },
    {
      title: "Deals",
      url: "/deals",
      icon: <HandshakeIcon />,
      items: [
        {
          title: "Pipeline",
          url: "/deals",
        },
        {
          title: "At risk",
          url: "/deals",
        },
        {
          title: "Closing this month",
          url: "/deals",
        },
      ],
    },
    {
      title: "Tasks",
      url: "/tasks",
      icon: <ListChecksIcon />,
      items: [
        {
          title: "Due today",
          url: "/tasks",
        },
        {
          title: "Overdue",
          url: "/tasks",
        },
        {
          title: "Delegated",
          url: "/tasks",
        },
      ],
    },
    {
      title: "Sales Copilot",
      url: "/copilot",
      icon: <BotIcon />,
      items: [
        {
          title: "Summaries",
          url: "/copilot",
        },
        {
          title: "Follow-ups",
          url: "/copilot",
        },
        {
          title: "Structure notes",
          url: "/copilot",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: <Settings2Icon />,
      items: [
        {
          title: "Workspace",
          url: "/settings",
        },
        {
          title: "Team",
          url: "/settings",
        },
        {
          title: "AI setup",
          url: "/settings",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Closing this month",
      url: "/deals",
      icon: <ChartNoAxesCombinedIcon />,
    },
    {
      name: "Stale opportunities",
      url: "/deals",
      icon: <ActivityIcon />,
    },
    {
      name: "Copilot review queue",
      url: "/copilot",
      icon: <SparklesIcon />,
    },
    {
      name: "Manager task board",
      url: "/tasks",
      icon: <ClipboardListIcon />,
    },
    {
      name: "Expansion pipeline",
      url: "/accounts",
      icon: <BriefcaseBusinessIcon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
