import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box, Select, MenuItem, Button, FormControl, InputLabel, Grid, TextField, Autocomplete, Divider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, startOfWeek, isValid } from 'date-fns';
import { getSessionNameById } from '../data/mockData'; // Import helper

function DailyReportPage({ data, addDailyReport }) {
    const { students, mentors, sessions, weeklyPlans } = data; // Add weeklyPlans
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [selectedMentorId, setSelectedMentorId] = useState(''); // Who is filling the report
    const [demeanor, setDemeanor] = useState('');

    // State for completed sessions
    const [completedBody, setCompletedBody] = useState({ sessionId: '', details: '' });
    const [completedMind, setCompletedMind] = useState({ sessionId: '', details: '' });
    const [completedEnglish, setCompletedEnglish] = useState({ sessionId: '', details: '' });
    const [completedMath, setCompletedMath] = useState({ sessionId: '', details: '' });
    const [completedScience, setCompletedScience] = useState({ sessionId: '', details: '' });
    const [completedCbcs, setCompletedCbcs] = useState({ sessionId: '', details: '' });
    const [completedLifeSkills, setCompletedLifeSkills] = useState({ sessionId: '', details: '' });

    const [plannedSessions, setPlannedSessions] = useState({
        english: [], math: [], science: [], body: [], mind: [], cbcs: [], lifeSkills: []
    });

    // Load planned sessions for the selected student and date
    useEffect(() => {
        if (selectedStudentId && isValid(selectedDate)) {
             const weekStartKey = format(startOfWeek(selectedDate, { weekStartsOn: 1 }), 'yyyy-MM-dd');
             const weekPlan = weeklyPlans[weekStartKey];
             const studentPlan = weekPlan?.[selectedStudentId];
             setPlannedSessions(studentPlan || { english: [], math: [], science: [], body: [], mind: [], cbcs: [], lifeSkills: [] });
        } else {
            setPlannedSessions({ english: [], math: [], science: [], body: [], mind: [], cbcs: [], lifeSkills: [] });
        }
    }, [selectedStudentId, selectedDate, weeklyPlans]);


    const getSessionOptions = (type) => {
         // Combine planned sessions for the week with general sessions of that type
         const student = students.find(s => s.id === selectedStudentId);
         if (!student) return [];

         const plannedIds = plannedSessions[type] || [];
         let options = [];

         if (type === 'english' || type === 'math' || type === 'science') {
             options = sessions.academic.filter(s =>
                 s.subject.toLowerCase() === type &&
                 s.grade === student.grades[type] &&
                 (plannedIds.includes(s.id) || !plannedIds.length) // Show planned or all if none planned
             );
         } else {
             options = sessions[type].filter(s => plannedIds.includes(s.id) || !plannedIds.length);
         }

        // Add an option for "None" or "Not Applicable"
        return [{ id: '', name: 'None / Not Applicable' }, ...options];
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedStudentId || !selectedMentorId || !isValid(selectedDate)) {
            alert("Please select Date, Student, and Mentor.");
            return;
        }

        const report = {
            date: format(selectedDate, 'yyyy-MM-dd'),
            studentId: selectedStudentId,
            mentorId: selectedMentorId,
            demeanor: demeanor,
            sessionsCompleted: {
                body: completedBody.sessionId ? completedBody : null,
                mind: completedMind.sessionId ? completedMind : null,
                intellect: {
                    english: completedEnglish.sessionId ? completedEnglish : null,
                    math: completedMath.sessionId ? completedMath : null,
                    science: completedScience.sessionId ? completedScience : null,
                },
                cbcs: completedCbcs.sessionId ? completedCbcs : null,
                lifeSkills: completedLifeSkills.sessionId ? completedLifeSkills : null,
            }
        };

        addDailyReport(report); // Call function passed from App.js to update state
        alert('Report Submitted!');
        // Reset form (optional)
        setSelectedStudentId('');
        // setSelectedMentorId(''); // Keep mentor maybe?
        setDemeanor('');
        setCompletedBody({ sessionId: '', details: '' });
        setCompletedMind({ sessionId: '', details: '' });
        setCompletedEnglish({ sessionId: '', details: '' });
        setCompletedMath({ sessionId: '', details: '' });
        setCompletedScience({ sessionId: '', details: '' });
        setCompletedCbcs({ sessionId: '', details: '' });
        setCompletedLifeSkills({ sessionId: '', details: '' });
    };

    // Helper to render session selection and details input
    const renderSessionInput = (label, type, state, setState) => {
        const options = getSessionOptions(type);
        const selectedOption = options.find(opt => opt.id === state.sessionId) || null;

        return (
            <Grid container spacing={1} alignItems="flex-end" mb={2}>
                <Grid item xs={12} sm={5}>
                    <Autocomplete
                        size="small"
                        options={options}
                        getOptionLabel={(option) => option.name}
                        value={selectedOption}
                        onChange={(event, newValue) => {
                            setState(prev => ({ ...prev, sessionId: newValue?.id || '' }));
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        disabled={!selectedStudentId}
                        sx={{ minWidth: 220 }}  // Default width applied
                        renderInput={(params) => <TextField {...params} label={`${label} Session`} />}
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <TextField
                        label="Details / Observations"
                        variant="standard"
                        fullWidth
                        multiline
                        minRows={1}
                        size="small"
                        value={state.details}
                        onChange={(e) => setState(prev => ({ ...prev, details: e.target.value }))}
                        disabled={!state.sessionId || !selectedStudentId}
                    />
                </Grid>
            </Grid>
        );
    };


    return (
        <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{ 
                maxWidth: 1200, 
                mx: 'auto', 
                p: 3 
            }}
        >
            <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                    mb: 4,
                    fontWeight: 'medium',
                    color: 'primary.main'
                }}
            >
                Daily Report Entry
            </Typography>

            <Paper 
                elevation={3} 
                sx={{ 
                    p: 4,
                    backgroundColor: 'background.paper',
                    borderRadius: 2
                }}
            >
                <Grid container spacing={4}>
                    {/* Top Section: Date, Student & Reporting Mentor */}
                    <Grid item xs={12} container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <DatePicker
                                label="Date"
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                renderInput={(params) => 
                                    <TextField 
                                        {...params} 
                                        fullWidth 
                                        sx={{ backgroundColor: 'background.default' }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth required sx={{ minWidth: 220 }}>
                                <InputLabel>Student</InputLabel>
                                <Select
                                    value={selectedStudentId}
                                    label="Student"
                                    onChange={(e) => setSelectedStudentId(e.target.value)}
                                    sx={{ 
                                        backgroundColor: 'background.default',
                                        '& .MuiSelect-select': {
                                            padding: '16px',
                                            minHeight: '56px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            '& em': {
                                                fontStyle: 'normal',
                                                color: 'text.secondary',
                                                padding: '2px 0'
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value="" sx={{ py: 1.5 }}>
                                        <em>Select Student</em>
                                    </MenuItem>
                                    {students.map(s => 
                                        <MenuItem key={s.id} value={s.id} sx={{ py: 1.5 }}>
                                            {s.name}
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth required sx={{ minWidth: 220 }}>
                                <InputLabel>Reporting Mentor</InputLabel>
                                <Select
                                    value={selectedMentorId}
                                    label="Reporting Mentor"
                                    onChange={(e) => setSelectedMentorId(e.target.value)}
                                    sx={{ 
                                        backgroundColor: 'background.default',
                                        '& .MuiSelect-select': {
                                            padding: '16px',
                                            minHeight: '56px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            '& em': {
                                                fontStyle: 'normal',
                                                color: 'text.secondary',
                                                padding: '2px 0'
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value="" sx={{ py: 1.5 }}>
                                        <em>Select Mentor</em>
                                    </MenuItem>
                                    {mentors.map(m => 
                                        <MenuItem key={m.id} value={m.id} sx={{ py: 1.5 }}>
                                            {m.name}
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    {/* Overall Demeanor Section */}
                    <Grid item xs={12}>
                        <TextField
                            label="Overall Demeanor / General Notes"
                            fullWidth
                            multiline
                            rows={3}
                            value={demeanor}
                            onChange={(e) => setDemeanor(e.target.value)}
                            disabled={!selectedStudentId}
                            sx={{ 
                                backgroundColor: 'background.default',
                                '& .MuiOutlinedInput-root': {
                                    '&.Mui-disabled': {
                                        backgroundColor: 'action.disabledBackground'
                                    }
                                }
                            }}
                        />
                    </Grid>

                    {/* Completed Sessions & Details */}
                    <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                mb: 3,
                                fontWeight: 'medium',
                                color: 'primary.main'
                            }}
                        >
                            Completed Sessions & Details
                        </Typography>
                    </Grid>

                    {/* Grouping the sections in a Grid container with three columns */}
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}
                                >
                                    Body & Mind
                                </Typography>
                                {renderSessionInput('Body', 'body', completedBody, setCompletedBody)}
                                {renderSessionInput('Mind', 'mind', completedMind, setCompletedMind)}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}
                                >
                                    Additional Activities
                                </Typography>
                                {renderSessionInput('CBCS', 'cbcs', completedCbcs, setCompletedCbcs)}
                                {renderSessionInput('Life Skills', 'lifeSkills', completedLifeSkills, setCompletedLifeSkills)}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography 
                                    variant="subtitle1" 
                                    sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}
                                >
                                    Intellect (Academic)
                                </Typography>
                                {renderSessionInput('English', 'english', completedEnglish, setCompletedEnglish)}
                                {renderSessionInput('Math', 'math', completedMath, setCompletedMath)}
                                {renderSessionInput('Science', 'science', completedScience, setCompletedScience)}
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                disabled={!selectedStudentId || !selectedMentorId}
                                sx={{ 
                                    minWidth: 200,
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontSize: '1.1rem'
                                }}
                            >
                                Submit Daily Report
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}

export default DailyReportPage;