import React from 'react';
import { Typography, Paper, Grid, Box, List, ListItem, ListItemText, Divider, Card, CardContent, Chip } from '@mui/material';
import { format, getDay, parseISO, startOfWeek, addDays } from 'date-fns'; // Assuming Sunday is start of week for date-fns
import { getStudentNames, getMentorName, getSessionNameById, getAcademicSessionDetails } from '../data/mockData'; // Import helpers

const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']; // Match mock data keys
const slotLabels = {
    session1: 'Session 1',
    session2: 'Session 2',
    session3: 'Session 3',
    session4: 'Session 4',
    session5: 'Session 5',
    session6: 'Session 6'
};
const sessionTypes = [
    { id: 'body', label: 'Body' },
    { id: 'mind', label: 'Mind' },
    { id: 'math', label: 'Math' },
    { id: 'science', label: 'Science' },
    { id: 'english', label: 'English' },
    { id: 'cbcs', label: 'CBCS' },
    { id: 'lessonPlan', label: 'Lesson Plan' }
];

// Add this helper function before the component
const groupAssignmentsByMentor = (assignments) => {
    return assignments.reduce((acc, assignment) => {
        const existingMentor = acc.find(a => a.mentorId === assignment.mentorId);
        
        if (existingMentor) {
            existingMentor.studentIds = [...new Set([...existingMentor.studentIds, ...assignment.studentIds])];
            existingMentor.sessionTypes = [...new Set([...existingMentor.sessionTypes, assignment.sessionType])];
        } else {
            acc.push({
                mentorId: assignment.mentorId,
                studentIds: assignment.studentIds,
                sessionTypes: [assignment.sessionType]
            });
        }
        return acc;
    }, []);
};

function DashboardPage({ data }) {
    const { students, mentors, timetable, weeklyPlans, sessions } = data;
    const today = new Date();
    const todayName = daysOfWeek[getDay(today)]; // Get 'monday', 'tuesday' etc.
    const todayTimetable = timetable[todayName] || {};

    // Find the current week's plan (assuming keys are start date of week, Monday)
    const startOfThisWeek = format(startOfWeek(today, { weekStartsOn: 1 }), 'yyyy-MM-dd');
    const currentWeekPlan = weeklyPlans[startOfThisWeek] || {};

    // Function to get academic session details
    const getAcademicDetails = (sessionId) => {
        const details = getAcademicSessionDetails(sessionId);
        return details ? `Concepts: ${details.concepts.join(', ')}\nTechniques: ${details.techniques.join(', ')}` : '';
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Dashboard - Today ({format(today, 'eeee, MMMM do yyyy')})
            </Typography>

            <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h5" gutterBottom>Today's Schedule</Typography>
                {Object.entries(slotLabels).map(([sessionKey, sessionLabel]) => {
                    const assignments = Array.isArray(todayTimetable[sessionKey]) 
                        ? todayTimetable[sessionKey] 
                        : [];
                    
                    const groupedAssignments = groupAssignmentsByMentor(assignments);

                    return (
                        <Card key={sessionKey} sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="h6">{sessionLabel}</Typography>
                                {groupedAssignments.length > 0 ? (
                                    <>
                                        {groupedAssignments.map(assignment => (
                                            <Box 
                                                key={assignment.mentorId} 
                                                sx={{ mb: 2 }}
                                            >
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <Typography variant="subtitle2" sx={{ mr: 2 }}>
                                                        Mentor: {getMentorName(assignment.mentorId, mentors)}
                                                    </Typography>
                                                    <Box>
                                                        {assignment.sessionTypes.map(sessionType => (
                                                            <Typography 
                                                                key={sessionType}
                                                                variant="subtitle2" 
                                                                color="primary"
                                                                component="span"
                                                                sx={{ mr: 1 }}
                                                            >
                                                                {sessionTypes.find(t => t.id === sessionType)?.label || ''}
                                                            </Typography>
                                                        ))}
                                                    </Box>
                                                </Box>
                                                <Divider sx={{ my: 1 }}/>
                                                <List dense>
                                                    {(assignment.studentIds || []).map(studentId => {
                                                        const student = students.find(s => s.id === studentId);
                                                        const planned = currentWeekPlan[studentId];
                                                        const todaysAcademic = [
                                                            ...(planned?.english || []),
                                                            ...(planned?.math || []),
                                                            ...(planned?.science || [])
                                                        ].map(id => sessions.academic.find(s => s.id === id))
                                                         .filter(Boolean);

                                                        return (
                                                            <ListItem key={studentId} sx={{ display: 'block' }}>
                                                                <ListItemText
                                                                    primary={student?.name || 'Unknown Student'}
                                                                    secondary={
                                                                        <>
                                                                        {todaysAcademic.length > 0 && (
                                                                            <Box mt={1}>
                                                                                <Box display="flex" alignItems="center">
                                                                                    <Typography variant="caption" sx={{ mr: 1 }}>
                                                                                        Topic:
                                                                                    </Typography>
                                                                                    {todaysAcademic.map(sess => (
                                                                                        <Chip 
                                                                                            key={sess.id} 
                                                                                            label={`${sess.subject}: ${sess.name}`} 
                                                                                            size="small" 
                                                                                            sx={{ mr: 0.5, mb: 0.5 }}
                                                                                        />
                                                                                    ))}
                                                                                </Box>
                                                                                {todaysAcademic.map(sess => (
                                                                                    <Typography 
                                                                                        key={`${sess.id}-details`} 
                                                                                        variant="caption" 
                                                                                        component="pre"
                                                                                        sx={{ 
                                                                                            ml: 1, 
                                                                                            fontStyle: 'italic',
                                                                                            whiteSpace: 'pre-wrap',
                                                                                            margin: '4px 0'
                                                                                        }}
                                                                                    >
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
                {Object.keys(todayTimetable).length === 0 && (
                    <Typography>No assignments scheduled for today.</Typography>
                )}
            </Paper>
        </Box>
    );
}

export default DashboardPage;