import { AppLayout } from "@/components/layout/AppLayout"
import { Box, Typography, Grid, Card, CardContent } from "@mui/material"
import { People, Business, TrendingUp, Assignment } from "@mui/icons-material"

export default function DashboardPage() {
  return (
    <AppLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: "#333", mb: 3 }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: "rgba(34, 197, 94, 0.1)",
                      color: "#22C55E",
                    }}
                  >
                    <People />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      24
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Colaboradores
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      color: "#3B82F6",
                    }}
                  >
                    <Business />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      7
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Departamentos
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: "rgba(245, 158, 11, 0.1)",
                      color: "#F59E0B",
                    }}
                  >
                    <TrendingUp />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      92%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Taxa Ativa
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: "rgba(139, 92, 246, 0.1)",
                      color: "#8B5CF6",
                    }}
                  >
                    <Assignment />
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      156
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tarefas
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </AppLayout>
  )
}
