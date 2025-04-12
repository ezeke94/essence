import React, { useState } from 'react';
import { 
    Typography, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Box, 
    Select, 
    MenuItem, 
    Button, 
    FormControl, 
    InputLabel, 
    Chip, 
    OutlinedInput,
    Grid 
} from '@mui/material';
import { getStudentNames } from '../data/mockData';

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const sessionTypes = [
    { id: 'body', label: 'Body' },
    { id: 'mind', label: 'Mind' },
    { id: 'math', label: 'Math' },
    { id: 'science', label: 'Science' },
    { id: 'english', label: 'English' },
    { id: 'cbcs', label: 'CBCS' },
    { id: 'lessonPlan', label: 'Lesson Plan' }
];

function TimetablePage({ data, updateTimetable }) {
    const { students, mentors, timetable, settings } = data;
    const [filterMentor, setFilterMentor] = useState('');
    const [editingCell, setEditingCell] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedSessionType, setSelectedSessionType] = useState('');
    const [isAddingSession, setIsAddingSession] = useState(false);

    // Generate slots dynamically based on settings
    const slots = Array.from(
        { length: settings?.sessionsPerDay || 5 }, 
        (_, i) => `session${i + 1}`
    );

    // Get mentor-specific timetable
    const getMentorTimetable = (mentorId) => {
        const mentorTimetable = {};
        
        // Initialize empty timetable structure
        days.forEach(day => {
            mentorTimetable[day] = {};
            slots.forEach(slot => {
                mentorTimetable[day][slot] = [];
            });
        });

        // Fill with mentor's sessions
        days.forEach(day => {
            slots.forEach(slot => {
                const cellSessions = timetable[day]?.[slot] || [];
                const mentorSessions = cellSessions.filter(
                    session => session.mentorId === mentorId
                );
                if (mentorSessions.length > 0) {
                    mentorTimetable[day][slot] = mentorSessions;
                }
            });
        });

        return mentorTimetable;
    };

    // Get currently visible timetable based on selected mentor
    const visibleTimetable = filterMentor ? getMentorTimetable(filterMentor) : {};

    const handleAddSession = (day, slot) => {
        setEditingCell({ day, slot });
        setIsAddingSession(true);
        setSelectedStudents([]);
        setSelectedSessionType('');
    };

    const handleRemoveSession = (day, slot, index) => {
        const updatedTimetable = { ...timetable };
        updatedTimetable[day][slot] = updatedTimetable[day][slot].filter(
            (_, i) => i !== index
        );
        updateTimetable(updatedTimetable);
    };

    // Update handleSaveAssignment to maintain other mentors' sessions
    const handleSaveAssignment = () => {
        if (!editingCell || !filterMentor) return;
        const { day, slot } = editingCell;
        const updatedTimetable = { ...timetable };
        
        // Initialize if needed
        if (!updatedTimetable[day]) {
            updatedTimetable[day] = {};
        }
        if (!Array.isArray(updatedTimetable[day][slot])) {
            updatedTimetable[day][slot] = [];
        }

        // Keep existing sessions (removed the filter that was removing current mentor's sessions)
        
        // Add new session if there are selected students
        if (selectedStudents.length > 0 && selectedSessionType) {
            updatedTimetable[day][slot].push({
                mentorId: filterMentor,
                studentIds: selectedStudents,
                sessionType: selectedSessionType
            });
        }

        updateTimetable(updatedTimetable);
        setEditingCell(null);
        setIsAddingSession(false);
        setSelectedStudents([]);
        setSelectedSessionType('');
    };

    const handleCancelAssignment = () => {
        setEditingCell(null);
        setIsAddingSession(false);
        setSelectedStudents([]);
        setSelectedSessionType('');
    };

    // Update renderCellContent to only show current mentor's sessions
    const renderCellContent = (day, slot) => {
        const assignments = visibleTimetable[day]?.[slot] || [];

        if (editingCell && editingCell.day === day && editingCell.slot === slot && isAddingSession) {
            const availableStudents = students.filter(student => 
                !assignments.flatMap(a => a.studentIds || []).includes(student.id)
            );
            
            return (
                <Box p={1} border={1} borderColor="primary.main" borderRadius={1}>
                    <FormControl fullWidth margin="dense" size="small">
                        <InputLabel>Session Type</InputLabel>
                        <Select
                            value={selectedSessionType}
                            label="Session Type"
                            onChange={(e) => setSelectedSessionType(e.target.value)}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {sessionTypes.map(type => (
                                <MenuItem key={type.id} value={type.id}>{type.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="dense" size="small">
                        <InputLabel>Students</InputLabel>
                        <Select
                            multiple
                            value={selectedStudents}
                            onChange={(e) => setSelectedStudents(
                                typeof e.target.value === 'string' 
                                    ? e.target.value.split(',') 
                                    : e.target.value
                            )}
                            input={<OutlinedInput label="Students" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip 
                                            key={value} 
                                            label={students.find(s => s.id === value)?.name || '?'} 
                                            size="small" 
                                        />
                                    ))}
                                </Box>
                            )}
                        >
                            {availableStudents.map(s => (
                                <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box mt={1} display="flex" justifyContent="space-between">
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="small" 
                            onClick={handleSaveAssignment}
                        >
                            Save
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            size="small" 
                            onClick={handleCancelAssignment}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            );
        }

        return (
            <Box>
                {assignments.map((assignment, index) => (
                    <Box 
                        key={`${assignment.mentorId}-${index}`}
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            mb: 1,
                            p: 0.5,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            bgcolor: 'background.paper'
                        }}
                    >
                        <Box>
                            <Typography variant="caption" display="block" color="primary">
                                {sessionTypes.find(t => t.id === assignment.sessionType)?.label}
                            </Typography>
                            <Typography variant="caption" display="block">
                                {getStudentNames(assignment.studentIds, students)}
                            </Typography>
                        </Box>
                        <Button 
                            size="small" 
                            color="error" 
                            onClick={() => handleRemoveSession(day, slot, index)}
                        >
                            ×
                        </Button>
                    </Box>
                ))}
                {filterMentor && (
                    <Button 
                        size="small" 
                        variant="outlined" 
                        fullWidth
                        onClick={() => handleAddSession(day, slot)}
                        sx={{ mt: 1 }}
                    >
                        + Add Session
                    </Button>
                )}
            </Box>
        );
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Timetable Assignment</Typography>
            
            {/* Mentor selector */}
            <Box mb={3}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                        <FormControl 
                            fullWidth 
                            size="small" 
                            sx={{ minWidth: 220 }}
                        >
                            <InputLabel>Select Mentor</InputLabel>
                            <Select
                                value={filterMentor}
                                label="Select Mentor"
                                onChange={(e) => setFilterMentor(e.target.value)}
                            >
                                <MenuItem value=""><em>Choose a mentor</em></MenuItem>
                                {mentors.map(m => (
                                    <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            {/* Show timetable only when mentor is selected */}
            {filterMentor ? (
                <Paper elevation={3}>
                    <TableContainer>
                        <Table size="small" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Time Session</TableCell>
                                    {days.map(day => <TableCell key={day} align="center" sx={{textTransform: 'capitalize'}}>{day}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {slots.map(slot => (
                                    <TableRow key={slot}>
                                        <TableCell component="th" scope="row">Session {slot.substring(7)}</TableCell>
                                        {days.map(day => (
                                            <TableCell 
                                                key={`${day}-${slot}`} 
                                                align="center" 
                                                sx={{ minWidth: 150, verticalAlign: 'top', border: 1, borderColor: 'divider'}}
                                            >
                                                {renderCellContent(day, slot)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            ) : (
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                    Please select a mentor to view or edit their timetable
                </Typography>
            )}
        </Box>
    );
}

export default TimetablePage;