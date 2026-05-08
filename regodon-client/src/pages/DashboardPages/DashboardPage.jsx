import {
  Typography, Grid, Card, CardContent, Box, Paper,
  List, ListItem, ListItemText, ListItemAvatar,
  Divider, Avatar, Chip, Stack, LinearProgress
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const stats = [
  {
    label: 'Total Users',
    value: '1,234',
    change: '+8.2%',
    up: true,
    icon: <PeopleIcon fontSize="large" />,
    color: '#27324a',
    progress: 72,
  },
  {
    label: 'Revenue',
    value: '$45,678',
    change: '+12.5%',
    up: true,
    icon: <AttachMoneyIcon fontSize="large" />,
    color: '#2e7d32',
    progress: 85,
  },
  {
    label: 'Orders',
    value: '567',
    change: '-3.1%',
    up: false,
    icon: <ShoppingCartIcon fontSize="large" />,
    color: '#e65100',
    progress: 45,
  },
  {
    label: 'Growth',
    value: '+12.5%',
    change: '+2.4%',
    up: true,
    icon: <TrendingUpIcon fontSize="large" />,
    color: '#6a1b9a',
    progress: 60,
  },
];

const recentActivity = [
  { id: 1, user: 'Jon Snow', action: 'Placed an order', time: '2 mins ago', initials: 'JS', color: '#27324a' },
  { id: 2, user: 'Cersei Lannister', action: 'Updated profile', time: '5 mins ago', initials: 'CL', color: '#2e7d32' },
  { id: 3, user: 'Arya Stark', action: 'Submitted report', time: '10 mins ago', initials: 'AS', color: '#6a1b9a' },
  { id: 4, user: 'Daenerys Targaryen', action: 'Logged in', time: '15 mins ago', initials: 'DT', color: '#e65100' },
  { id: 5, user: 'Harvey Roxie', action: 'Created account', time: '20 mins ago', initials: 'HR', color: '#00695c' },
];

function DashboardPage() {
  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back — here's what's happening today.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mb: 5 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                  <Avatar sx={{ bgcolor: stat.color, width: 52, height: 52 }}>
                    {stat.icon}
                  </Avatar>
                  <Chip
                    size="small"
                    icon={stat.up ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                    label={stat.change}
                    color={stat.up ? 'success' : 'error'}
                    variant="outlined"
                  />
                </Stack>
                <Typography variant="h3" fontWeight={700} sx={{ mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  {stat.label}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={stat.progress}
                  sx={{
                    borderRadius: 4,
                    height: 6,
                    bgcolor: 'rgba(0,0,0,0.06)',
                    '& .MuiLinearProgress-bar': { bgcolor: stat.color, borderRadius: 4 },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper>
        <Box sx={{ p: 2.5, borderBottom: '1px solid rgba(196,217,255,0.5)' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" fontWeight={600}>Recent Activity</Typography>
              <Typography variant="caption" color="text.secondary">Last 5 actions across all users</Typography>
            </Box>
            <Chip label="Live" size="small" color="success" />
          </Stack>
        </Box>
        <List disablePadding>
          {recentActivity.map((item, index) => (
            <Box key={item.id}>
              <ListItem sx={{ py: 2.5, px: 3 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: item.color, fontSize: 14, width: 40, height: 40 }}>
                    {item.initials}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="body2" fontWeight={600}>{item.user}</Typography>}
                  secondary={item.action}
                />
                <Stack alignItems="flex-end" spacing={0.5}>
                  <Chip label="Active" size="small" color="success" />
                  <Typography variant="caption" color="text.secondary">{item.time}</Typography>
                </Stack>
              </ListItem>
              {index < recentActivity.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default DashboardPage;
