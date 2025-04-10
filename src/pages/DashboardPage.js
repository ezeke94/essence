import React from 'react';
import { Typography, Paper, Grid, Box, List, ListItem, ListItemText, Divider, Card, CardContent, Chip } from '@mui/material';
import { format, getDay, parseISO, startOfWeek, addDays } from 'date-fns'; // Assuming Sunday is start of week for date-fns
import { getStudentNames, getMentorName, getSessionNameById, getAcademicSessionDetails } from '../data/mockData'; // Import helpers

const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']; // Match mock data keys
const slotLabels = { slot1: 'Slot 1', slot2: 'Slot 2', slot3: 'Slot 3', slot4: 'Slot 4', slot5: 'Slot 5'};

function DashboardPage({ data }) {
  const { students, mentors, timetable, weeklyPlans, sessions } = data;
  const today = new Date();
  const todayName = daysOfWeek[getDay(today)]; // Get 'monday', 'tuesday' etc.
  const todayTimetable = timetable[todayName] || {};

  // Find the current week's plan (assuming keys are start date of week, Monday)
   // Adjust startOfWeek to ensure Monday is the first day if needed
  const startOfThisWeek = format(startOfWeek(today, { weekStartsOn: 1 }), 'yyyy-MM-dd');
  const currentWeekPlan = weeklyPlans[startOfThisWeek] || {};


  // Function to get planned sessions for a student today
  const getTodaysPlannedSessions = (studentId) => {
      const studentPlan = currentWeekPlan[studentId];
      if (!studentPlan) return [];

      // Distribute sessions across the week - THIS IS A SIMPLIFICATION
      // A real app needs a more robust way to know *which* specific session is planned for *today*
      // For this prototype, we'll just list some possibilities based on the week's plan.
      const potentialSessions = [
          ...(studentPlan.english || []),
          ...(studentPlan.math || []),
          ...(studentPlan.science || []),
          ...(studentPlan.body || []),
          ...(studentPlan.mind || []),
          ...(studentPlan.cbcs || []),
          ...(studentPlan.lifeSkills || [])
      ];
      // Just show first few as example for today
      return potentialSessions.slice(0, 3).map(id => getSessionNameById(id));
  }

   // Function to get academic session details
   const getAcademicDetails = (sessionId) => {
       const details = getAcademicSessionDetails(sessionId);
       return details ? `Concepts: ${details.concepts.join(', ')}. Techniques: ${details.techniques.join(', ')}` : '';
   }


  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard - Today ({format(today, 'eeee, MMMM do yyyy')})
      </Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Today's Schedule</Typography>
        {Object.entries(slotLabels).map(([slotKey, slotLabel]) => {
            // Get all assignments for this slot (now it's an array)
            const assignments = Array.isArray(todayTimetable[slotKey]) 
                ? todayTimetable[slotKey] 
                : [];

            return (
                <Card key={slotKey} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{slotLabel}</Typography>
                        {assignments.length > 0 ? (
                            <>
                                {assignments.map(assignment => (
                                    <Box key={assignment.mentorId} sx={{ mb: 2 }}>
                                        <Typography variant="subtitle2">
                                            Mentor: {getMentorName(assignment.mentorId, mentors)}
                                        </Typography>
                                        <Divider sx={{ my: 1 }}/>
                                        <Typography variant="body2">Assigned Students & Planned Activities:</Typography>
                                        <List dense>
                                            {(assignment.studentIds || []).map(studentId => {
                                                const student = students.find(s => s.id === studentId);
                                                const planned = currentWeekPlan[studentId];
                                                const todaysAcademic = [
                                                    ...(planned?.english || []),
                                                    ...(planned?.math || []),
                                                    ...(planned?.science || [])
                                                ].map(id => sessions.academic.find(s => s.id === id)).filter(Boolean);

                                                return (
                                                    <ListItem key={studentId} sx={{ display: 'block' }}>
                                                        <ListItemText
                                                            primary={student?.name || 'Unknown Student'}
                                                            secondary={
                                                                <>
                                                                {todaysAcademic.length > 0 && (
                                                                    <Box mt={1}>
                                                                        <Typography variant="caption" display="block">Potential Academic Focus:</Typography>
                                                                        {todaysAcademic.map(sess => (
                                                                            <Chip key={sess.id} label={`${sess.subject}: ${sess.name}`} size="small" sx={{ mr: 0.5, mb: 0.5 }}/>
                                                                        ))}
                                                                        {todaysAcademic.map(sess => (
                                                                            <Typography key={`${sess.id}-details`} variant="caption" display="block" sx={{ ml: 1, fontStyle: 'italic' }}>
                                                                                {getAcademicDetails(sess.id)}
                                                                            </Typography>
                                                                        ))}
                                                                    </Box>
                                                                )}
                                                                </>
                                                            }
                                                        />
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    </Box>
                                ))}
                            </>
                        ) : (
                            <Typography>Unassigned</Typography>
                        )}
                    </CardContent>
                </Card>
            );
        })}
        {Object.keys(todayTimetable).length === 0 && <Typography>No assignments scheduled for today.</Typography>}
      </Paper>
    </Box>
  );
}

export default DashboardPage;