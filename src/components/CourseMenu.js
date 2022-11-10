import React from 'react'
import CourseThumbnail from './CourseThumbnail'
import { Tab, Tabs } from '@mui/material';

export default function CourseMenu(props) {
  const { courseList } = props;
  return (
    <Tabs
      value={0}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      sx={{
        marginX: "-2rem",
        "& .MuiTabScrollButton-root": {
          width: "2rem",
        },
        "& .MuiTabs-scrollButtons.Mui-disabled": {
          opacity: 0.3,
        },
        "& .MuiTabs-indicator": {
          display: "none",
        },
      }}
    >
      {courseList.map(card => (
        <Tab
          label={<CourseThumbnail {...card} />}
          sx={{ padding: 0 }}
        />
      ))}
    </Tabs>
  )
};
