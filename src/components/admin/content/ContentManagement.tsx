// src/components/admin/content/ContentManagement.tsx
import React, { useState } from 'react';
import { 
  Tabs, 
  Tab, 
  Box, 
  Typography 
} from '@mui/material';
import ContentList from './ContentList';
import ContentForm from './ContentForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const ContentManagement: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="content management tabs"
        >
          <Tab label="لیست محتوا" />
          <Tab label="ایجاد محتوای جدید" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ContentList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ContentForm />
      </TabPanel>
    </Box>
  );