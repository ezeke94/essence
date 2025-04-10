import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, CssBaseline, AppBar, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EventNoteIcon from '@mui/icons-material/EventNote'; // Weekly Plan
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


import DashboardPage from './pages/DashboardPage';
import TimetablePage from './pages/TimetablePage';
import StudentsPage from './pages/StudentsPage';
import DailyReportPage from './pages/DailyReportPage';
import WeeklyPlanPage from './pages/WeeklyPlanPage';
import * as mockData from './data/mockData'; // Import mock data

const drawerWidth = 240;

function App() {
  // In a real app, data fetching and state management (Context, Redux, Zustand) would go here
  const [appData, setAppData] = React.useState({
      mentors: mockData.mentors,
      students: mockData.students,
      sessions: mockData.sessions,
      timetable: mockData.initialTimetable,
      weeklyPlans: mockData.initialWeeklyPlans,
      dailyReports: mockData.initialDailyReports
  });

  // Functions to update state would be passed down or handled via context
  const updateTimetable = (newTimetable) => {
    setAppData(prev => ({ ...prev, timetable: newTimetable }));
  };
   const updateWeeklyPlan = (newPlans) => {
     setAppData(prev => ({ ...prev, weeklyPlans: newPlans }));
   };
   const addDailyReport = (newReport) => {
     setAppData(prev => ({ ...prev, dailyReports: [...prev.dailyReports, newReport] }));
   };


  const drawer = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {[
            { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
            { text: 'Timetable', icon: <CalendarMonthIcon />, path: '/timetable' },
            { text: 'Weekly Plan', icon: <EventNoteIcon />, path: '/weekly-plan' },
            { text: 'Students', icon: <PeopleIcon />, path: '/students' },
            { text: 'Daily Report', icon: <AssessmentIcon />, path: '/daily-report' },
          ].map((item) => (
            <ListItem key={item.text} disablePadding component={Link} to={item.path} sx={{ color: 'inherit', textDecoration: 'none' }}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                Centre Head Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
          >
            {drawer}
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Routes>
               <Route path="/" element={<DashboardPage data={appData} />} />
               <Route path="/timetable" element={<TimetablePage data={appData} updateTimetable={updateTimetable}/>} />
               <Route path="/weekly-plan" element={<WeeklyPlanPage data={appData} updateWeeklyPlan={updateWeeklyPlan}/>} />
               <Route path="/students" element={<StudentsPage students={appData.students} />} />
               <Route path="/daily-report" element={<DailyReportPage data={appData} addDailyReport={addDailyReport}/>} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </LocalizationProvider>
  );
}

export default App;