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
import { getStudentNames, getMentorName } from '../data/mockData';

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const slots = ['slot1', 'slot2', 'slot3', 'slot4', 'slot5'];
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
    const { students, mentors, timetable } = data;
    const [localTimetable, setLocalTimetable] = useState(timetable);
    const [editingCell, setEditingCell] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedSessionType, setSelectedSessionType] = useState('');
    const [filterMentor, setFilterMentor] = useState('');

    const getAvailableStudents = (day, slot) => {
        const assignments = Array.isArray(localTimetable[day]?.[slot]) 
            ? localTimetable[day][slot] 
            : [];
        
        // Get all assigned student IDs in this slot except current mentor's students
        const assignedStudentIds = assignments
            .filter(a => a.mentorId !== filterMentor)
            .flatMap(a => a.studentIds || []);

        // Return only unassigned students
        return students.filter(student => !assignedStudentIds.includes(student.id));
    };

    const handleCellClick = (day, slot) => {
        setEditingCell({ day, slot });
        
        // Ensure we're working with an array
        const assignments = Array.isArray(localTimetable[day]?.[slot]) 
            ? localTimetable[day][slot] 
            : [];
        
        // Find the assignment for the current filtered mentor
        const currentAssignment = assignments.find(
            assignment => assignment?.mentorId === filterMentor
        );

        // Set the selected values from the current assignment or defaults
        setSelectedStudents(currentAssignment?.studentIds || []);
        setSelectedSessionType(currentAssignment?.sessionType || '');
    };

    const handleSaveAssignment = () => {
        if (!editingCell || !filterMentor) return;
        const { day, slot } = editingCell;
        const updatedTimetable = { ...localTimetable };
        
        // Initialize nested structure if needed
        if (!updatedTimetable[day]) {
            updatedTimetable[day] = {};
        }
        if (!Array.isArray(updatedTimetable[day][slot])) {
            updatedTimetable[day][slot] = [];
        }

        // Remove existing assignment for this mentor
        updatedTimetable[day][slot] = updatedTimetable[day][slot].filter(
            assignment => assignment.mentorId !== filterMentor
        );

        // Add new assignment if valid
        if (selectedStudents.length > 0 && selectedSessionType) {
            updatedTimetable[day][slot].push({
                mentorId: filterMentor,
                studentIds: selectedStudents,
                sessionType: selectedSessionType
            });
        }

        setLocalTimetable(updatedTimetable);
        updateTimetable(updatedTimetable);
        setEditingCell(null);
        setSelectedStudents([]);
        setSelectedSessionType('');
    };

    const handleCancelAssignment = () => {
        setEditingCell(null);
        setSelectedStudents([]);
        setSelectedSessionType('');
    };

    const renderCellContent = (day, slot) => {
        // Ensure assignments is always an array
        const assignments = Array.isArray(localTimetable[day]?.[slot]) 
            ? localTimetable[day][slot] 
            : [];
        
        const assignment = assignments.find(a => a.mentorId === filterMentor);

        if (editingCell && editingCell.day === day && editingCell.slot === slot) {
            const availableStudents = getAvailableStudents(day, slot);
            
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

        if (assignment) {
            const sessionTypeLabel = sessionTypes.find(
                t => t.id === assignment.sessionType
            )?.label;
            return (
                <Box 
                    onClick={() => handleCellClick(day, slot)} 
                    sx={{ cursor: 'pointer', p: 0.5 }}
                >
                    <Typography variant="caption" display="block" color="primary">
                        {sessionTypeLabel}
                    </Typography>
                    <Typography variant="caption" display="block">
                        {getStudentNames(assignment.studentIds, students)}
                    </Typography>
                </Box>
            );
        }

        return (
            <Button 
                size="small" 
                variant="outlined" 
                onClick={() => handleCellClick(day, slot)}
            >
                +
            </Button>
        );
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Timetable Assignment</Typography>
            
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

            <Paper elevation={3}>
                <TableContainer>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Time Slot</TableCell>
                                {days.map(day => <TableCell key={day} align="center" sx={{textTransform: 'capitalize'}}>{day}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {slots.map(slot => (
                                <TableRow key={slot}>
                                    <TableCell component="th" scope="row">Slot {slot.substring(4)}</TableCell>
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
        </Box>
    );
}

export default TimetablePage;