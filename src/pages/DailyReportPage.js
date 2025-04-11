import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box, Select, MenuItem, Button, FormControl, InputLabel, Grid, TextField, Autocomplete, Divider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format, startOfWeek, isValid } from 'date-fns';
import { addReport } from './DailyReportsManagementPage';

function DailyReportPage({ data, onReportSubmitted }) {
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
            completedSessions: {
                body: completedBody.sessionId ? {
                    sessionId: completedBody.sessionId,
                    details: completedBody.details
                } : null,
                mind: completedMind.sessionId ? {
                    sessionId: completedMind.sessionId,
                    details: completedMind.details
                } : null,
                english: completedEnglish.sessionId ? {
                    sessionId: completedEnglish.sessionId,
                    details: completedEnglish.details
                } : null,
                math: completedMath.sessionId ? {
                    sessionId: completedMath.sessionId,
                    details: completedMath.details
                } : null,
                science: completedScience.sessionId ? {
                    sessionId: completedScience.sessionId,
                    details: completedScience.details
                } : null,
                cbcs: completedCbcs.sessionId ? {
                    sessionId: completedCbcs.sessionId,
                    details: completedCbcs.details
                } : null,
                lifeSkills: completedLifeSkills.sessionId ? {
                    sessionId: completedLifeSkills.sessionId,
                    details: completedLifeSkills.details
                } : null
            }
        };

        console.log('Saving report:', report);
        const savedReport = addReport(report);
        console.log('Saved report:', savedReport);

        if (onReportSubmitted) {
            onReportSubmitted(savedReport);
        }

        alert('Report Submitted Successfully!');
        resetForm();
    };

    const resetForm = () => {
        setSelectedStudentId('');
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
            <Grid container direction="column" spacing={1} sx={{ mb: 3 }}> {/* Added margin bottom */}
                <Grid item>
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
                        sx={{ minWidth: 220 }}
                        renderInput={(params) => <TextField {...params} label={`${label} Session`} />}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Details / Observations"
                        variant="standard"
                        fullWidth
                        multiline
                        minRows={1}
                        maxRows={4}
                        value={state.details}
                        onChange={(e) => setState(prev => ({ ...prev, details: e.target.value }))}
                        disabled={!state.sessionId || !selectedStudentId}
                        sx={{
                            width: '100%',
                            '& .MuiInputBase-root': {
                                width: '100%',
                                overflow: 'auto'
                            },
                            '& .MuiInputBase-input': {
                                width: '100%',
                                minHeight: '24px'
                            }
                        }}
                    />
                </Grid>
            </Grid>
        );
    };


    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
            <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ mb: 4, fontWeight: 'medium', color: 'primary.main' }}
            >
                Daily Report Entry
            </Typography>

            {/* Filters Section */}
            <Paper 
                elevation={2} 
                sx={{ 
                    p: 3, 
                    mb: 3, 
                    backgroundColor: 'background.paper',
                    borderRadius: 2
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                        <DatePicker
                            label="Date"
                            value={selectedDate}
                            onChange={(newValue) => setSelectedDate(newValue)}
                            renderInput={(params) => 
                                <TextField 
                                    {...params} 
                                    fullWidth 
                                    size="small"
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl 
                            fullWidth 
                            required 
                            size="small"
                            sx={{ minWidth: 220 }}  // Added default minimum width
                        >
                            <InputLabel>Student</InputLabel>
                            <Select
                                value={selectedStudentId}
                                label="Student"
                                onChange={(e) => setSelectedStudentId(e.target.value)}
                            >
                                <MenuItem value=""><em>Select Student</em></MenuItem>
                                {students.map(s => (
                                    <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl 
                            fullWidth 
                            required 
                            size="small"
                            sx={{ minWidth: 220 }}  // Added default minimum width
                        >
                            <InputLabel>Reporting Mentor</InputLabel>
                            <Select
                                value={selectedMentorId}
                                label="Reporting Mentor"
                                onChange={(e) => setSelectedMentorId(e.target.value)}
                            >
                                <MenuItem value=""><em>Select Mentor</em></MenuItem>
                                {mentors.map(m => (
                                    <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* Main Content */}
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 4,
                    backgroundColor: 'background.paper',
                    borderRadius: 2
                }}
            >
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {/* Overall Demeanor Section */}
                        <Grid item xs={12} sx={{ width: '100%' }}>
                            <TextField
                                label="Overall Demeanor / General Notes"
                                fullWidth
                                multiline
                                minRows={4}
                                maxRows={8}
                                value={demeanor}
                                onChange={(e) => setDemeanor(e.target.value)}
                                disabled={!selectedStudentId}
                                sx={{ 
                                    width: '100%',
                                    backgroundColor: 'background.default',
                                    '& .MuiOutlinedInput-root': {
                                        width: '100%',
                                        '&.Mui-disabled': {
                                            backgroundColor: 'action.disabledBackground'
                                        }
                                    },
                                    '& .MuiInputBase-root': {
                                        width: '100%',
                                        resize: 'vertical',
                                        overflow: 'auto'
                                    },
                                    '& .MuiInputBase-inputMultiline': {
                                        width: '100%'
                                    }
                                }}
                            />
                        </Grid>

                        {/* New container for Completed Sessions & Details */}
                        <Grid item xs={12} sx={{ width: '100%' }}>
                            <Box sx={{ mt: 4 }}>
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
                                <Box sx={{ width: '100%' }}>
                                    {/* Body & Mind Section */}
                                    <Box sx={{ mb: 4, width: '100%' }}>
                                        <Typography 
                                            variant="subtitle1" 
                                            sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}
                                        >
                                            Body & Mind
                                        </Typography>
                                        {renderSessionInput('Body', 'body', completedBody, setCompletedBody)}
                                        {renderSessionInput('Mind', 'mind', completedMind, setCompletedMind)}
                                    </Box>

                                    {/* Additional Activities Section */}
                                    <Box sx={{ mb: 4, width: '100%' }}>
                                        <Typography 
                                            variant="subtitle1" 
                                            sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}
                                        >
                                            Additional Activities
                                        </Typography>
                                        {renderSessionInput('CBCS', 'cbcs', completedCbcs, setCompletedCbcs)}
                                        {renderSessionInput('Life Skills', 'lifeSkills', completedLifeSkills, setCompletedLifeSkills)}
                                    </Box>

                                    {/* Intellect Section */}
                                    <Box sx={{ mb: 4, width: '100%' }}>
                                        <Typography 
                                            variant="subtitle1" 
                                            sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary' }}
                                        >
                                            Intellect (Academic)
                                        </Typography>
                                        {renderSessionInput('English', 'english', completedEnglish, setCompletedEnglish)}
                                        {renderSessionInput('Math', 'math', completedMath, setCompletedMath)}
                                        {renderSessionInput('Science', 'science', completedScience, setCompletedScience)}
                                    </Box>
                                </Box>
                            </Box>
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
                </Box>
            </Paper>
        </Box>
    );
}

export default DailyReportPage;