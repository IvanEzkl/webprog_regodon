import { Typography, Box, Paper, Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';

function ReportsPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Reports</Typography>
      <Stack spacing={3}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Quarterly Sales</Typography>
          <BarChart
            series={[
              { data: [35, 44, 24, 34], label: 'Series 1' },
              { data: [51, 6, 49, 30], label: 'Series 2' },
            ]}
            height={320}
            xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
          />
        </Paper>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Paper sx={{ p: 3, flex: 1 }}>
            <Typography variant="h6" gutterBottom>Distribution</Typography>
            <PieChart
              series={[{
                data: [
                  { id: 0, value: 10, label: 'Series A' },
                  { id: 1, value: 15, label: 'Series B' },
                  { id: 2, value: 20, label: 'Series C' },
                ],
              }]}
              height={300}
            />
          </Paper>

          <Paper sx={{ p: 3, flex: 2 }}>
            <Typography variant="h6" gutterBottom>Monthly Trend</Typography>
            <LineChart
              series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
              xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], scaleType: 'band' }]}
              height={300}
            />
          </Paper>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ReportsPage;
