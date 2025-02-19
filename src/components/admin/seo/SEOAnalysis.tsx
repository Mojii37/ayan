import React, { ReactElement } from 'react';
import {
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  CircularProgress,
} from '@mui/material';
import { CheckCircle, Error, Warning } from '@mui/icons-material';
import type { SEOAnalysis as SEOAnalysisType, SEOIssue } from '../../../types/seo';

interface SEOAnalysisProps {
  analysis: SEOAnalysisType;
}

const priorityColors: Record<SEOIssue['priority'], string> = {
  high: '#f44336',
  medium: '#ff9800',
  low: '#4caf50',
};

const typeIcons: Record<SEOIssue['type'], ReactElement> = {
  error: <Error color="error" />,
  warning: <Warning color="warning" />,
  success: <CheckCircle color="success" />,
};

const priorityLabels: Record<SEOIssue['priority'], string> = {
  high: 'بالا',
  medium: 'متوسط',
  low: 'پایین',
};

export const SEOAnalysis: React.FC<SEOAnalysisProps> = ({ analysis }) => {
  const getScoreColor = (score: number): 'success' | 'warning' | 'error' => {
    if (score >= 80) return 'success';
    if (score >= 50) return 'warning';
    return 'error';
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box sx={{ position: 'relative', display: 'inline-flex', mr: 2 }}>
          <CircularProgress
            variant="determinate"
            value={analysis.score}
            size={60}
            color={getScoreColor(analysis.score)}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" component="div" color="text.secondary">
              {`${analysis.score}%`}
            </Typography>
          </Box>
        </Box>
        <Typography variant="h6">نتیجه تحلیل SEO</Typography>
      </Box>

      <List>
        {analysis.issues.map((issue, index) => (
          <ListItem
            key={`${issue.type}-${index}`}
            sx={{
              mb: 2,
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            <ListItemIcon>{typeIcons[issue.type]}</ListItemIcon>
            <ListItemText
              primary={issue.message}
              secondary={
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" gutterBottom>
                    راه‌حل: {issue.howToFix}
                  </Typography>
                  <Chip
                    label={`اولویت: ${priorityLabels[issue.priority]}`}
                    size="small"
                    sx={{
                      bgcolor: `${priorityColors[issue.priority]}20`,
                      color: priorityColors[issue.priority],
                    }}
                  />
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SEOAnalysis;