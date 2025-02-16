import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  TextField,
  Snackbar,
} from '@mui/material';
import {
  ExpandMore,
  ContentCopy,
  PlayArrow,
} from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { APIEndpoint, APIGroup } from '../../types/api-docs';

// تعریف interface برای پاسخ API
interface APIResponse {
  status: number;
  data: unknown;
  message?: string;
}

interface Props {
  groups: APIGroup[];
  onTest?: (endpoint: APIEndpoint, params: Record<string, unknown>) => Promise<APIResponse>;
}

export const APIDocumentation: React.FC<Props> = ({ groups, onTest }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);
  const [testParams, setTestParams] = useState<{ [key: string]: unknown }>({});
  const [copySnackbar, setCopySnackbar] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopySnackbar(true);
  };

  const renderRequestExample = (endpoint: APIEndpoint) => {
    const code = `fetch('${endpoint.path}', {
  method: '${endpoint.method}',
  headers: {
    'Content-Type': 'application/json'${endpoint.authentication ? ",\n    'Authorization': 'Bearer <token>'" : ''}
  }${endpoint.requestBody ? `,\n  body: JSON.stringify(${JSON.stringify(endpoint.examples?.request || {}, null, 2)})` : ''}
})
  .then(response => response.json())
  .catch(error => console.error('Error:', error));`;

    return (
      <Box sx={{ position: 'relative' }}>
        <Button
          size="small"
          startIcon={<ContentCopy />}
          sx={{ position: 'absolute', top: 8, right: 8 }}
          onClick={() => handleCopyCode(code)}
        >
          کپی
        </Button>
        <SyntaxHighlighter language="javascript" style={tomorrow}>
          {code}
        </SyntaxHighlighter>
      </Box>
    );
  };

  const renderResponseExample = (endpoint: APIEndpoint) => {
    if (!endpoint.examples?.response) return null;

    return (
      <SyntaxHighlighter language="json" style={tomorrow}>
        {JSON.stringify(endpoint.examples.response, null, 2)}
      </SyntaxHighlighter>
    );
  };

  const handleTest = async (endpoint: APIEndpoint) => {
    if (!onTest) return;

    try {
      const response = await onTest(endpoint, testParams);
      setTestParams({
        ...testParams,
        [`${endpoint.path}:response`]: JSON.stringify(response, null, 2),
      });
    } catch (error) {
      setTestParams({
        ...testParams,
        [`${endpoint.path}:error`]: (error as Error).message,
      });
    }
  };

  return (
    <Box>
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {groups.map((group, index) => (
            <Tab key={group.name} label={group.name} value={index} />
          ))}
        </Tabs>
      </Paper>

      {groups[activeTab].endpoints.map(endpoint => (
        <Accordion
          key={endpoint.path}
          expanded={expandedEndpoint === endpoint.path}
          onChange={() =>
            setExpandedEndpoint(
              expandedEndpoint === endpoint.path ? null : endpoint.path
            )
          }
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                label={endpoint.method}
                color={
                  endpoint.method === 'GET'
                    ? 'success'
                    : endpoint.method === 'POST'
                      ? 'primary'
                      : endpoint.method === 'PUT'
                        ? 'warning'
                        : 'error'
                }
                size="small"
              />
              <Typography>{endpoint.path}</Typography>
              {endpoint.authentication && (
                <Chip label="نیاز به احراز هویت" size="small" />
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>{endpoint.description}</Typography>

            {endpoint.parameters && endpoint.parameters.length > 0 && (
              <>
                <Typography variant="subtitle2" gutterBottom>
                  پارامترها
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>نام</TableCell>
                        <TableCell>نوع</TableCell>
                        <TableCell>اجباری</TableCell>
                        <TableCell>توضیحات</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {endpoint.parameters.map(param => (
                        <TableRow key={param.name}>
                          <TableCell>{param.name}</TableCell>
                          <TableCell>{param.type}</TableCell>
                          <TableCell>
                            {param.required ? (
                              <Chip label="بله" size="small" color="error" />
                            ) : (
                              <Chip label="خیر" size="small" />
                            )}
                          </TableCell>
                          <TableCell>{param.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}

            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                نمونه درخواست
              </Typography>
              {renderRequestExample(endpoint)}
            </Box>

            {endpoint.examples?.response && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  نمونه پاسخ
                </Typography>
                {renderResponseExample(endpoint)}
              </Box>
            )}

            {onTest && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  تست API
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  {endpoint.parameters?.map(param => (
                    <TextField
                      key={param.name}
                      label={param.name}
                      size="small"
                      value={testParams[param.name] || ''}
                      onChange={e =>
                        setTestParams({
                          ...testParams,
                          [param.name]: e.target.value,
                        })
                      }
                    />
                  ))}
                  <Button
                    variant="contained"
                    startIcon={<PlayArrow />}
                    onClick={() => handleTest(endpoint)}
                  >
                    ارسال درخواست
                  </Button>
                </Box>
                {testParams[`${endpoint.path}:response`] && (
                  <SyntaxHighlighter language="json" style={tomorrow}>
                    {testParams[`${endpoint.path}:response`]}
                  </SyntaxHighlighter>
                )}
                {testParams[`${endpoint.path}:error`] && (
                  <Typography color="error">
                    {testParams[`${endpoint.path}:error`]}
                  </Typography>
                )}
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      ))}

      <Snackbar
        open={copySnackbar}
        autoHideDuration={2000}
        onClose={() => setCopySnackbar(false)}
        message="کد در کلیپ‌بورد کپی شد"
      />
    </Box>
  );
};