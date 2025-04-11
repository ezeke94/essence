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
const slots = ['session1', 'session2', 'session3', 'session4', 'session5', 'session6'];
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

function TimetablePage({ data, updateTimetable }) {
    const { students, mentors, timetable } = data;
    const [localTimetable, setLocalTimetable] = useState(timetable);
    const [editingCell, setEditingCell] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedSessionType, setSelectedSessionType] = useState('');
    const [filterMentor, setFilterMentor] = useState('');
    const [isAddingSession, setIsAddingSession] = useState(false);

    const getAvailableStudents = (day, slot) => {
        const assignments = Array.isArray(localTimetable[day]?.[slot]) 
            ? localTimetable[day][slot] 
            : [];
        
        // Get all student IDs assigned to any session in this cell
        const assignedStudentIds = assignments
            .flatMap(a => a.studentIds || []);

        // Filter out students who are already assigned to any session in this cell
        return students.filter(student => !assignedStudentIds.includes(student.id));
    };

    const handleCellClick = (day, slot) => {
        setEditingCell({ day, slot });
        
        const assignments = Array.isArray(localTimetable[day]?.[slot]) 
            ? localTimetable[day][slot] 
            : [];
        
        const currentAssignment = assignments.find(
            assignment => assignment?.mentorId === filterMentor
        );

        setSelectedStudents(currentAssignment?.studentIds || []);
        setSelectedSessionType(currentAssignment?.sessionType || '');
    };

    const handleAddSession = (day, slot) => {
        setEditingCell({ day, slot });
        setIsAddingSession(true);
        setSelectedStudents([]);
        setSelectedSessionType('');
    };

    const handleRemoveSession = (day, slot, index) => {
        const updatedTimetable = { ...localTimetable };
        updatedTimetable[day][slot] = updatedTimetable[day][slot].filter(
            (_, i) => i !== index
        );
        setLocalTimetable(updatedTimetable);
        updateTimetable(updatedTimetable);
    };

    const handleSaveAssignment = () => {
        if (!editingCell || !filterMentor) return;
        const { day, slot } = editingCell;
        const updatedTimetable = { ...localTimetable };
        
        if (!updatedTimetable[day]) {
            updatedTimetable[day] = {};
        }
        if (!Array.isArray(updatedTimetable[day][slot])) {
            updatedTimetable[day][slot] = [];
        }

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

    const renderCellContent = (day, slot) => {
        const assignments = Array.isArray(localTimetable[day]?.[slot]) 
            ? localTimetable[day][slot] 
            : [];

        if (editingCell && editingCell.day === day && editingCell.slot === slot && isAddingSession) {
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
                            borderRadius: 1
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
                        {assignment.mentorId === filterMentor && (
                            <Button 
                                size="small" 
                                color="error" 
                                onClick={() => handleRemoveSession(day, slot, index)}
                            >
                                ×
                            </Button>
                        )}
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
        </Box>
    );
}

export default TimetablePage;