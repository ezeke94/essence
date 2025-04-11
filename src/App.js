import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  CssBaseline, 
  AppBar, 
  Typography, 
  Select, 
  MenuItem, 
  FormControl,
  useMediaQuery,
  IconButton,
  useTheme
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MenuIcon from '@mui/icons-material/Menu';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { enGB } from 'date-fns/locale';

import DashboardPage from './pages/DashboardPage';
import TimetablePage from './pages/TimetablePage';
import StudentsPage from './pages/StudentsPage';
import DailyReportPage from './pages/DailyReportPage';
import WeeklyPlanPage from './pages/WeeklyPlanPage';
import DailyReportsManagementPage from './pages/DailyReportsManagementPage';
import SettingsPage from './pages/SettingsPage';
import MentorsPage from './pages/MentorsPage';
import * as mockData from './data/mockData';

const drawerWidth = 240;

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#3B82F6', // Modern blue
        light: '#60A5FA',
        dark: '#2563EB',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#8B5CF6', // Modern purple
        light: '#A78BFA',
        dark: '#7C3AED',
        contrastText: '#FFFFFF',
      },
      background: {
        default: '#F8FAFC', // Light gray background
        paper: '#FFFFFF',
      },
      text: {
        primary: '#1E293B', // Slate gray
        secondary: '#64748B',
      }
    },
    shape: {
      borderRadius: 12
    },
    shadows: [
      'none',
      '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      // ...rest of shadows remain unchanged
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            fontWeight: 500
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
          }
        }
      }
    }
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedCenter, setSelectedCenter] = React.useState('Hephzi');
  const [appData, setAppData] = React.useState({
      mentors: mockData.mentors,
      students: mockData.students,
      sessions: mockData.sessions,
      timetable: mockData.initialTimetable,
      weeklyPlans: mockData.initialWeeklyPlans,
      dailyReports: mockData.initialDailyReports,
      settings: {
          sessionsPerDay: 5
      }
  });

  const updateWeeklyPlan = (newPlans) => {
    setAppData(prev => ({ ...prev, weeklyPlans: newPlans }));
  };
  const addDailyReport = (newReport) => {
    setAppData(prev => ({ ...prev, dailyReports: [...prev.dailyReports, newReport] }));
  };
  const updateSettings = (newSettings) => {
    setAppData(prev => ({ ...prev, settings: newSettings }));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        p: 2 
      }}>
        <img 
          src="/images/logo3.png" 
          alt="Logo" 
          style={{ 
            height: '40px',
            width: 'auto'
          }} 
        />
      </Box>
      <List>
        {[
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
          { text: 'Timetable', icon: <CalendarMonthIcon />, path: '/timetable' },
          { text: 'Weekly Plan', icon: <EventNoteIcon />, path: '/weekly-plan' },
          { text: 'Students', icon: <PeopleIcon />, path: '/students' },
          { text: 'Mentors', icon: <PeopleAltIcon />, path: '/mentors' },
          { text: 'Daily Report Entry', icon: <AssessmentIcon />, path: '/daily-report' },
          { text: 'Reports Management', icon: <ManageSearchIcon />, path: '/reports-management' },
          { text: 'Settings', icon: <SettingsIcon />, path: '/settings' }
        ].map((item) => (
          <ListItem 
            key={item.text} 
            disablePadding 
            component={Link} 
            to={item.path}
            onClick={() => isMobile && setMobileOpen(false)}
            sx={{ 
              color: 'inherit', 
              textDecoration: 'none',
              '& .MuiListItemButton-root': {
                borderRadius: '8px',
                mx: 1,
                '&:hover': {
                  bgcolor: 'primary.light',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main'
                  }
                }
              }
            }}
          >
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider 
        dateAdapter={AdapterDateFns}
        adapterLocale={enGB}
        dateFormats={{
          fullDate: 'dd/MM/yyyy',
          keyboardDate: 'dd/MM/yyyy',
          shortDate: 'dd/MM/yyyy',
          normalDate: 'dd/MM/yyyy',
        }}
      >
        <Router>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar 
              position="fixed" 
              sx={{ 
                zIndex: (theme) => theme.zIndex.drawer + 1,
                bgcolor: 'background.paper',
                color: 'text.primary',
                boxShadow: '0px 1px 4px rgba(0,0,0,0.1)',
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {isMobile && (
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      onClick={handleDrawerToggle}
                    >
                      <MenuIcon />
                    </IconButton>
                  )}
                  {!isMobile && (
                    <img 
                      src="/images/logo3.png" 
                      alt="Logo" 
                      style={{ 
                        height: '40px',
                        width: 'auto',
                        marginRight: '16px'
                      }} 
                    />
                  )}
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={selectedCenter}
                      onChange={(e) => setSelectedCenter(e.target.value)}
                      sx={{ 
                        bgcolor: 'background.paper',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'divider'
                        }
                      }}
                    >
                      <MenuItem value="Hephzi">Hephzi</MenuItem>
                      <MenuItem value="Harlur">Harlur</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography variant="body2">
                    Logged in as Centre Head
                  </Typography>
                </Box>
              </Toolbar>
            </AppBar>
            
            <Drawer
              variant={isMobile ? 'temporary' : 'permanent'}
              open={isMobile ? mobileOpen : true}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true
              }}
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { 
                  width: drawerWidth, 
                  boxSizing: 'border-box',
                  bgcolor: 'background.paper',
                  borderRight: '1px solid',
                  borderColor: 'divider',
                  '& .MuiListItemButton-root': {
                    '&:hover': {
                      bgcolor: 'primary.light',
                      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                        color: 'primary.contrastText'
                      }
                    },
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                        color: 'primary.contrastText'
                      },
                      '&:hover': {
                        bgcolor: 'primary.dark'
                      }
                    }
                  }
                },
              }}
            >
              {drawer}
            </Drawer>

            <Box 
              component="main" 
              sx={{ 
                flexGrow: 1, 
                p: 3,
                bgcolor: '#f8fafc',
                minHeight: '100vh'
              }}
            >
              <Toolbar />
              <Routes>
                 <Route path="/" element={<DashboardPage data={appData} />} />
                 <Route 
                   path="/timetable" 
                   element={
                     <TimetablePage 
                       data={{
                         students: appData.students,
                         mentors: appData.mentors,
                         timetable: appData.timetable,
                         settings: appData.settings
                       }}
                       updateTimetable={(newTimetable) => 
                         setAppData(prev => ({ ...prev, timetable: newTimetable }))
                       }
                     />
                   } 
                 />
                 <Route path="/weekly-plan" element={<WeeklyPlanPage data={appData} updateWeeklyPlan={updateWeeklyPlan}/>} />
                 <Route 
                   path="/students" 
                   element={
                     <StudentsPage 
                       students={appData.students} 
                       mentors={appData.mentors} 
                       reports={appData.dailyReports?.filter(r => r.isPublished)}
                     />
                   } 
                 />
                 <Route path="/daily-report" element={<DailyReportPage data={appData} addDailyReport={addDailyReport}/>} />
                 <Route 
                   path="/reports-management" 
                   element={
                     <DailyReportsManagementPage 
                       students={appData.students} 
                       mentors={appData.mentors} 
                     />
                   } 
                 />
                 <Route 
                   path="/settings" 
                   element={
                     <SettingsPage 
                       settings={appData.settings}
                       onUpdateSettings={updateSettings}
                     />
                   } 
                 />
                 <Route 
                   path="/mentors" 
                   element={
                     <MentorsPage 
                       mentors={appData.mentors}
                       students={appData.students}
                     />
                   } 
                 />
              </Routes>
            </Box>
          </Box>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;