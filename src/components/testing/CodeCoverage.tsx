// src/components/testing/CodeCoverage.tsx
import React from 'react';
import {
  Paper,
  Box,
  Typography,
  LinearProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface CoverageData {
  lines: number;
  functions: number;
  branches: number;
  statements: number;
  files: Array<{
    path: string;
    lines: number;
    functions: number;
    branches: number;
    statements: number;
  }>;
}

interface CodeCoverageProps {
  data: CoverageData;
}

export const CodeCoverage: React.FC<CodeCoverageProps> = ({ data }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        پوشش کد
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              خطوط کد ({data.lines}%)
            </Typography>
            <LinearProgress
              variant="determinate"
              value={data.lines}
              color={data.lines >= 80 ? 'success' : 'warning'}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              توابع ({data.functions}%)
            </Typography>
            <LinearProgress
              variant="determinate"
              value={data.functions}
              color={data.functions >= 80 ? 'success' : 'warning'}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              شاخه‌ها ({data.branches}%)
            </Typography>
            <LinearProgress
              variant="determinate"
              value={data.branches}
              color={data.branches >= 80 ? 'success' : 'warning'}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              دستورات ({data.statements}%)
            </Typography>
            <LinearProgress
              variant="determinate"
              value={data.statements}
              color={data.statements >= 80 ? 'success' : 'warning'}
            />
          </Box>
        </Grid>
      </Grid>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>مسیر فایل</TableCell>
              <TableCell align="right">خطوط</TableCell>
              <TableCell align="right">توابع</TableCell>
              <TableCell align="right">شاخه‌ها</TableCell>
              <TableCell align="right">دستورات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.files.map(file => (
              <TableRow key={file.path}>
                <TableCell component="th" scope="row">
                  {file.path}
                </TableCell>
                <TableCell align="right">{file.lines}%</TableCell>
                <TableCell align="right">{file.functions}%</TableCell>
                <TableCell align="right">{file.branches}%</TableCell>
                <TableCell align="right">{file.statements}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
