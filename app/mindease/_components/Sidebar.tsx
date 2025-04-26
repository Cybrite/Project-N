import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const items = [
  { title: "Home",     url: "#", icon: Home },
  { title: "Inbox",    url: "#", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search",   url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
]

export function AppSidebar() {
  return (
    /* Make the sidebar a relative container so the trigger can be absolutely positioned */
    <Sidebar className="fixed inset-y-0 left-0  w-[18%]  z-40  border-r overflow-hidden mr-2 cursor-default">
      {/* Scrollable menu */}
      <SidebarContent className="h-full overflow-y-auto pr-4">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="shrink-0" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ► TRIGGER FLOATING TO THE RIGHT EDGE ◄ */}
      <SidebarTrigger
        /* absolute so it sits outside scroll flow; inset-y to span full height */
        className="
          absolute inset-y-0 right-0
          flex items-center justify-center
          w-8    /* trigger width */
          bg-background/80 backdrop-blur
          border-l
        "
      />
    </Sidebar>
  )
}


