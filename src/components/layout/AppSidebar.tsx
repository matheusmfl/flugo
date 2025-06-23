"use client"

import type React from "react"

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography } from "@mui/material"
import { People, ChevronRight } from "@mui/icons-material"
import { usePathname, useRouter } from "next/navigation"
import logo from '@/assets/logo.svg'
import Image from "next/image"

const SIDEBAR_WIDTH = 242

interface MenuItem {
  title: string
  path: string
  icon: React.ComponentType
}

const menuItems: MenuItem[] = [
  {
    title: "Colaboradores",
    path: "/colaboradores",
    icon: People,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,

        }}
      >
        <Image src={logo} alt="logo" />
      </Box>

      <Box sx={{ flex: 1, py: 2 }}>
        <List sx={{ px: 2 }}>
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)

            return (
              <ListItem key={item.title} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 2,

                    color: active ? "#637381" : "#637381",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                    <ListItemIcon
                      sx={{
                        color: active ? "#637381" : "#637381",
                        minWidth: 40,
                      }}
                    >
                      <Icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        fontWeight: active ? 600 : 500,
                        fontSize: "14px",
                        color: active ? "#637381" : "#637381",
                      }}
                    />
                  </Box>

                  <ChevronRight
                    sx={{
                      color: active ? "#637381" : "#637381",
                      fontSize: "20px",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>

      <Box sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
        <Typography variant="caption" color="text.secondary" sx={{ px: 2 }}>
          © 2025 Flugo
        </Typography>
      </Box>
    </Box>
  )

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
          border: "none",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  )
}

export { SIDEBAR_WIDTH }
