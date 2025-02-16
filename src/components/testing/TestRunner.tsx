import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  LinearProgress,
  Chip,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
} from '@mui/material';
import {
  PlayArrow,
  Stop,
  CheckCircle,
  Error,
  Warning,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { TestSuite, TestStatus } from '../../types/testing';

const statusIcons: Record<TestStatus, JSX.Element> = {
  passed: <CheckCircle color="success" />,
  failed: <Error color="error" />,
  pending: <Warning color="warning" />,
  skipped: <ExpandMore color="disabled" />,
};

interface TestRunnerProps {
  suites: TestSuite[];
  onRunTests: () => Promise<void>;
  onStopTests: () => void;
}

export const TestRunner: React.FC<TestRunnerProps> = ({
  suites,
  onRunTests,
  onStopTests,
}) => {
  const [running, setRunning] = useState(false);
  const [selectedSuite, setSelectedSuite] = useState<string | null>(null);
  const [expandedTests, setExpandedTests] = useState<Set<string>>(new Set());

  const handleRunTests = async () => {
    setRunning(true);
    try {
      await onRunTests();
    } finally {
      setRunning(false);
    }
  };

  const toggleSuite = (suiteId: string) => {
    setSelectedSuite(selectedSuite === suiteId ? null : suiteId);
  };

  const toggleTest = (testId: string) => {
    const newExpanded = new Set(expandedTests);
    if (expandedTests.has(testId)) {
      newExpanded.delete(testId);
    } else {
      newExpanded.add(testId);
    }
    setExpandedTests(newExpanded);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">اجرای تست‌ها</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color={running ? 'error' : 'primary'}
              startIcon={running ? <Stop /> : <PlayArrow />}
              onClick={running ? onStopTests : handleRunTests}
            >
              {running ? 'توقف تست‌ها' : 'اجرای تست‌ها'}
            </Button>
          </Box>
        </Box>

        {running && <LinearProgress sx={{ mb: 3 }} />}

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4" color="success.main">
                {suites.reduce((acc, suite) => acc + suite.passedTests, 0)}
              </Typography>
              <Typography color="textSecondary">موفق</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4" color="error.main">
                {suites.reduce((acc, suite) => acc + suite.failedTests, 0)}
              </Typography>
              <Typography color="textSecondary">ناموفق</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4" color="text.secondary">
                {suites.reduce((acc, suite) => acc + suite.skippedTests, 0)}
              </Typography>
              <Typography color="textSecondary">رد شده</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h4">
                {suites.reduce(
                  (acc, suite) =>
                    acc +
                    (suite.duration ? Math.round(suite.duration / 1000) : 0),
                  0
                )}
                s
              </Typography>
              <Typography color="textSecondary">زمان کل</Typography>
            </Paper>
          </Grid>
        </Grid>

        {suites.map((suite) => (
          <Paper key={suite.id} sx={{ mb: 2 }}>
            <Box
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => toggleSuite(suite.id)}
            >
              <IconButton size="small">
                {selectedSuite === suite.id ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              <Typography variant="subtitle1" sx={{ ml: 2, flex: 1 }}>
                {suite.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Chip
                  size="small"
                  label={`${suite.passedTests}/${suite.totalTests}`}
                  color={
                    suite.failedTests > 0
                      ? 'error'
                      : suite.passedTests === suite.totalTests
                      ? 'success'
                      : 'warning'
                  }
                />
                <Typography variant="body2" color="text.secondary">
                  {suite.duration
                    ? `${(suite.duration / 1000).toFixed(2)}s`
                    : ''}
                </Typography>
              </Box>
            </Box>

            <Collapse in={selectedSuite === suite.id}>
              <List dense>
                {suite.testCases.map((test) => (
                  <React.Fragment key={test.id}>
                    <ListItem
                      button
                      onClick={() => toggleTest(test.id)}
                      sx={{ pl: 4 }}
                    >
                      <ListItemIcon>{statusIcons[test.status]}</ListItemIcon>
                      <ListItemText
                        primary={test.name}
                        secondary={`${test.duration}ms | ${test.assertions} assertions`}
                      />
                      {test.error && <ExpandMore />}
                    </ListItem>
                    {test.error && (
                      <Collapse in={expandedTests.has(test.id)}>
                        <Alert severity="error" sx={{ mx: 4, my: 1 }}>
                          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                            {test.error}
                          </pre>
                          {test.stackTrace && (
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="caption" component="pre">
                                {test.stackTrace}
                              </Typography>
                            </Box>
                          )}
                        </Alert>
                      </Collapse>
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Collapse>
          </Paper>
        ))}
      </Paper>
    </Box>
  );
};