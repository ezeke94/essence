import React, { useState, useEffect } from 'react';
import {
    Typography, Paper, Box, Select, MenuItem, Button, FormControl, InputLabel,
    Grid, List, ListItem, ListItemText, IconButton, Chip, Autocomplete, TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { startOfWeek, format, addWeeks, subWeeks, isValid, parse } from 'date-fns';
import { getSessionNameById } from '../data/mockData'; // Import helpers

// Session Limits
const MAX_ACADEMIC = 3;
const MAX_BODY = 6;
const MAX_MIND = 6;

function WeeklyPlanPage({ data, updateWeeklyPlan }) {
    const { students, sessions, weeklyPlans } = data;
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
    }, [selectedStudentId, selectedWeekKey, weeklyPlans]);

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
        const count = currentPlan[type]?.length || 0;
        if (type === 'english' || type === 'math' || type === 'science') return count >= MAX_ACADEMIC;
        if (type === 'body') return count >= MAX_BODY;
        if (type === 'mind') return count >= MAX_MIND;
        return false; // No limits for CBCS/LifeSkills in this example
    };

    // Add a session to the plan
    const handleAddSession = (type, sessionId) => {
         if (!sessionId || isLimitReached(type)) return; // Don't add if limit reached or no session selected
         // Prevent duplicates
         if (currentPlan[type]?.includes(sessionId)) return;


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
        const limit = type === 'body' || type === 'mind' ? 6 : (type === 'english' || type === 'math' || type === 'science' ? 3 : null);

        return (
            <Box mb={2}>
                <Typography variant="subtitle1">{label} ({(currentPlan[type]?.length || 0)}{limit ? `/${limit}` : ''})</Typography>
                {limitReached && <Typography color="error" variant="caption">Session limit reached for {label}.</Typography>}
                <Autocomplete
                    size="small"
                    options={available}
                    getOptionLabel={(option) => option.name || ""}
                     onChange={(event, newValue) => {
                        if (newValue) {
                            handleAddSession(type, newValue.id);
                        }
                     }}
                    disabled={!selectedStudentId || limitReached}
                    renderInput={(params) => <TextField {...params} label={`Add ${label} Session`} />}
                    // Clear input after selection if needed by controlling the value externally
                    value={null} // Keep it as a selection trigger, not a state holder for the input itself
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
                <Grid item>
                     <DatePicker
                        label="Week Starting"
                        value={selectedWeek}
                        onChange={(newValue) => setSelectedWeek(startOfWeek(newValue || new Date(), { weekStartsOn: 1 }))}
                        renderInput={(params) => <TextField {...params} helperText="Select any day, snaps to Monday" />}
                    />
                </Grid>
                <Grid item>
                    <Button onClick={() => setSelectedWeek(subWeeks(selectedWeek, 1))}>Prev Week</Button>
                    <Button onClick={() => setSelectedWeek(addWeeks(selectedWeek, 1))}>Next Week</Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                        <InputLabel>Select Student</InputLabel>
                        <Select
                            value={selectedStudentId}
                            label="Select Student"
                            onChange={(e) => setSelectedStudentId(e.target.value)}
                        >
                            <MenuItem value=""><em>Select a Student</em></MenuItem>
                            {students.map(s => <MenuItem key={s.id} value={s.id}>{s.name} (Grade {s.grade})</MenuItem>)}
                        </Select>
                    </FormControl>
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