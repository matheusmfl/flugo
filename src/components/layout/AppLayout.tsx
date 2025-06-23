"use client"

import type React from "react"

import { Box } from "@mui/material"
import { AppSidebar, SIDEBAR_WIDTH } from "./AppSidebar"
import { AppHeader } from "./AppHeader"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>

      <AppSidebar />


      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
        }}
      >

        <AppHeader />


        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 8,
            backgroundColor: "#fafafa",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
