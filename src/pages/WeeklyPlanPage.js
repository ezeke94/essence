import React, { useState, useEffect } from 'react';
import {
    Typography, Paper, Box, Select, MenuItem, Button, FormControl, InputLabel,
    Grid, List, ListItem, ListItemText, IconButton, Autocomplete, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { startOfWeek, format, addWeeks, subWeeks, isValid } from 'date-fns';
import { getSessionNameById } from '../data/mockData'; // Import helpers

// Add this function after the imports
const calculateStudentSessionCounts = (studentId, timetable) => {
    const sessionCounts = {
        english: 0,
        math: 0,
        science: 0,
        body: 0,
        mind: 0,
        cbcs: 0,
        lifeSkills: 0
    };

    // Loop through each day
    Object.values(timetable).forEach(daySchedule => {
        // Loop through each session slot
        Object.values(daySchedule).forEach(sessions => {
            if (!Array.isArray(sessions)) return;
            
            // Count each session type for the student
            sessions.forEach(session => {
                if (session.studentIds.includes(studentId)) {
                    sessionCounts[session.sessionType] = 
                        (sessionCounts[session.sessionType] || 0) + 1;
                }
            });
        });
    });

    return sessionCounts;
};

function WeeklyPlanPage({ data, updateWeeklyPlan }) {
    const { students, sessions, weeklyPlans, timetable } = data;
    const [selectedWeek, setSelectedWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 })); // Start on Monday
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [currentPlan, setCurrentPlan] = useState({}); // Plan for the selected student and week

    const selectedWeekKey = format(selectedWeek, 'yyyy-MM-dd');

    // Load plan when student or week changes
    useEffect(() => {
        if (selectedStudentId && isValid(selectedWeek)) {
            const weekPlan = weeklyPlans[selectedWeekKey] || {};
            setCurrentPlan(weekPlan[selectedStudentId] || {
                english: [], math: [], science: [], body: [], mind: [], cbcs: [], lifeSkills: []
            });
        } else {
            setCurrentPlan({}); // Reset if no student/week selected
        }
    }, [selectedStudentId, selectedWeek, weeklyPlans]);

    // Get available sessions based on type and student's grade (for academic)
    const getAvailableSessions = (type) => {
        const student = students.find(s => s.id === selectedStudentId);
        if (!student) return [];

        switch (type) {
            case 'english':
            case 'math':
            case 'science':
                return sessions.academic.filter(s => s.subject.toLowerCase() === type && s.grade === student.grades[type]);
            case 'body': return sessions.body;
            case 'mind': return sessions.mind;
            case 'cbcs': return sessions.cbcs; // Assuming batches might influence this, but keeping it simple
            case 'lifeSkills': return sessions.lifeSkills; // Same assumption for Life Skills
            default: return [];
        }
    };

    // Check if session limit is reached
    const isLimitReached = (type) => {
        if (!selectedStudentId) return false;
        
        const currentCount = currentPlan[type]?.length || 0;
        const sessionCounts = calculateStudentSessionCounts(selectedStudentId, timetable);
        
        // If no sessions scheduled in timetable, don't allow any in weekly plan
        if (!sessionCounts[type]) return true;
        
        return currentCount >= sessionCounts[type];
    };

    // Add a session to the plan
    const handleAddSession = (type, sessionId) => {
        if (!sessionId || isLimitReached(type)) return;
        if (currentPlan[type]?.includes(sessionId)) return;

        const sessionCounts = calculateStudentSessionCounts(selectedStudentId, timetable);
        if (!sessionCounts[type]) return; // Don't add if no sessions scheduled

        const updatedPlan = {
            ...currentPlan,
            [type]: [...(currentPlan[type] || []), sessionId]
        };
        setCurrentPlan(updatedPlan);
    };

    // Remove a session from the plan
    const handleRemoveSession = (type, sessionId) => {
        const updatedPlan = {
            ...currentPlan,
            [type]: (currentPlan[type] || []).filter(id => id !== sessionId)
        };
        setCurrentPlan(updatedPlan);
    };

    // Save the current student's plan for the week
    const handleSaveChanges = () => {
        if (!selectedStudentId || !isValid(selectedWeek)) return;

        const updatedWeeklyPlans = {
            ...weeklyPlans,
            [selectedWeekKey]: {
                ...(weeklyPlans[selectedWeekKey] || {}),
                [selectedStudentId]: currentPlan
            }
        };
        updateWeeklyPlan(updatedWeeklyPlans); // Update global state
        alert('Plan saved!'); // Simple feedback
    };

    const renderSessionSelector = (type, label) => {
        const available = getAvailableSessions(type);
        const limitReached = isLimitReached(type);
        const sessionCounts = selectedStudentId ? 
            calculateStudentSessionCounts(selectedStudentId, timetable) : 
            { [type]: 0 };

        return (
            <Box mb={2}>
                <Typography variant="subtitle1">
                    {label} ({(currentPlan[type]?.length || 0)}/{sessionCounts[type] || 0})
                </Typography>
                {limitReached && (
                    <Typography color="error" variant="caption">
                        Maximum {sessionCounts[type]} sessions allowed for {label}
                    </Typography>
                )}
                {sessionCounts[type] === 0 && (
                    <Typography color="error" variant="caption">
                        No {label} sessions scheduled in timetable
                    </Typography>
                )}
                <Autocomplete
                    size="small"
                    options={available}
                    getOptionLabel={(option) => option.name || ""}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            handleAddSession(type, newValue.id);
                        }
                    }}
                    disabled={!selectedStudentId || limitReached || sessionCounts[type] === 0}
                    renderInput={(params) => 
                        <TextField 
                            {...params} 
                            label={`Add ${label} Session`}
                            fullWidth
                            sx={{ minWidth: '100%' }}
                        />
                    }
                    value={null}
                    sx={{ minWidth: '100%' }}
                />
                <List dense>
                    {(currentPlan[type] || []).map(sessionId => (
                        <ListItem
                            key={sessionId}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveSession(type, sessionId)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={getSessionNameById(sessionId)} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Weekly Session Plan</Typography>

            <Grid container spacing={2} alignItems="center" mb={3}>
                <Grid item xs={12} md={4}>
                     <DatePicker
                        label="Week Starting"
                        value={selectedWeek}
                        onChange={(newValue) => setSelectedWeek(startOfWeek(newValue || new Date(), { weekStartsOn: 1 }))}
                        renderInput={(params) => 
                            <TextField 
                                {...params} 
                                helperText="Select any day, snaps to Monday"
                                fullWidth
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth size="small" sx={{ minWidth: '250px' }}>
                        <InputLabel>Select Student</InputLabel>
                        <Select
                            value={selectedStudentId}
                            label="Select Student"
                            onChange={(e) => setSelectedStudentId(e.target.value)}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 300,
                                        minWidth: '250px'
                                    }
                                }
                            }}
                        >
                            <MenuItem value=""><em>Select a Student</em></MenuItem>
                            {students.map(s => (
                                <MenuItem 
                                    key={s.id} 
                                    value={s.id} 
                                    sx={{ 
                                        whiteSpace: 'normal',
                                        minWidth: '250px'
                                    }}
                                >
                                    {s.name} (Grade {s.grade})
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4} sx={{ display: 'flex', gap: 1 }}>
                    <Button 
                        fullWidth 
                        variant="outlined"
                        onClick={() => setSelectedWeek(subWeeks(selectedWeek, 1))}
                    >
                        Prev Week
                    </Button>
                    <Button 
                        fullWidth 
                        variant="outlined"
                        onClick={() => setSelectedWeek(addWeeks(selectedWeek, 1))}
                    >
                        Next Week
                    </Button>
                </Grid>
            </Grid>

            {selectedStudentId && isValid(selectedWeek) ? (
                <Paper elevation={3} sx={{ p: 2 }}>
                     <Typography variant="h6" gutterBottom>
                        Planning for: {students.find(s=> s.id === selectedStudentId)?.name} - Week of {format(selectedWeek, 'MMMM do, yyyy')}
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Academic (Intellect)</Typography>
                            {renderSessionSelector('english', 'English')}
                            {renderSessionSelector('math', 'Math')}
                            {renderSessionSelector('science', 'Science')}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6">Activities</Typography>
                            {renderSessionSelector('body', 'Body')}
                            {renderSessionSelector('mind', 'Mind')}
                            {renderSessionSelector('cbcs', 'CBCS')}
                            {renderSessionSelector('lifeSkills', 'Life Skills')}
                        </Grid>
                    </Grid>
                    <Box mt={3} textAlign="right">
                        <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                            Save Changes for {students.find(s=> s.id === selectedStudentId)?.name}
                        </Button>
                    </Box>
                </Paper>
            ) : (
                <Typography>Please select a valid week and student to view or edit the plan.</Typography>
            )}
        </Box>
    );
}

export default WeeklyPlanPage;