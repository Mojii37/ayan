import React, { useState } from 'react';
import { Box, Paper, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ContentList } from './ContentList';
import { ContentForm } from './ContentForm';
import { Content, ContentFormData } from '../../../types/content';

export const ContentManagement: React.FC = () => {
  const [tab, setTab] = useState('list');
  const [contents] = useState<Content[]>([]);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const handleSubmit = async (data: ContentFormData) => {
    console.log('Form submitted:', data);
    setTab('list');
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="content management tabs">
            <Tab label="لیست محتوا" value="list" />
            <Tab label="ایجاد محتوای جدید" value="create" />
          </TabList>
        </Box>
        <TabPanel value="list">
          <ContentList
            contents={contents}
            onEdit={(id) => console.log('Edit:', id)}
            onDelete={(id) => console.log('Delete:', id)}
          />
        </TabPanel>
        <TabPanel value="create">
          <ContentForm onSubmit={handleSubmit} />
        </TabPanel>
      </TabContext>
    </Paper>
  );
};