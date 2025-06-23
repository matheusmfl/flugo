"use client"

import type React from "react"

import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material"
import { Person, Settings, Logout } from "@mui/icons-material"
import { useState } from "react"
import { SIDEBAR_WIDTH } from "./AppSidebar"

export function AppHeader() {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfile = () => {

    handleClose()
  }

  const handleSettings = () => {

    handleClose()
  }

  const handleLogout = () => {
    // TODO: implementar Logout
    console.log("Logout")
    handleClose()
  }

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
        ml: `${SIDEBAR_WIDTH}px`,
        backgroundColor: "white",

        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ px: 3, justifyContent: "flex-end" }}>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>




          <IconButton
            onClick={handleClick}
            sx={{
              p: 0.5,
              ml: 1,
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                backgroundColor: "#22C55E",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              U
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 8,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                mt: 1.5,
                minWidth: 200,
                borderRadius: 2,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1.5,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >

            <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #f0f0f0" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Usuário Admin
              </Typography>
              <Typography variant="body2" color="text.secondary">
                admin@flugo.com
              </Typography>
            </Box>

            <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText>Meu Perfil</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleSettings} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText>Configurações</ListItemText>
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={handleLogout}
              sx={{
                py: 1.5,
                color: "#f44336",
                "&:hover": {
                  backgroundColor: "rgba(244, 67, 54, 0.04)",
                },
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" sx={{ color: "#f44336" }} />
              </ListItemIcon>
              <ListItemText>Sair</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
