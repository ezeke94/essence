import React, { useState } from 'react';
import { 
    Typography, 
    Paper, 
    Box, 
    Chip, 
    Stack, 
    TextField, 
    Avatar, 
    Card, 
    Grid, 
    Modal, 
    IconButton, 
    Tabs, 
    Tab, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem 
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';
import { format, startOfWeek, endOfWeek } from 'date-fns';

function StudentCard({ student, mentors, onViewDetails }) {
    const primaryMentor = mentors?.find(m => m.id === student.primaryMentorId);
    const mentorDisplayName = primaryMentor?.name || 'Not Assigned';

    return (
        <Card 
            onClick={() => onViewDetails(student)}
            sx={{ 
                display: 'flex', 
                flexDirection: 'row',
                p: 3,
                alignItems: 'flex-start',
                height: '100%',
                width: '100%',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                boxShadow: 1,
                cursor: 'pointer',
                '&:hover': {
                    boxShadow: 3,
                    bgcolor: 'action.hover'
                },
                '& > *': {
                    minWidth: 0
                }
            }}
        >
            <Avatar
                sx={{
                    width: 80,
                    height: 80,
                    mr: 3,
                    bgcolor: 'primary.main',
                    fontSize: '2rem',
                    flexShrink: 0
                }}
            >
                {student.name.charAt(0)}
            </Avatar>

            <Box sx={{ 
                flexGrow: 1,
                width: '100%',
                minWidth: 0
            }}>
                <Grid container spacing={4}>
                    {/* Basic Info */}
                    <Grid item xs={12} md={4}>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {student.name}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                Primary Mentor: {mentorDisplayName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                <b>Contact:</b> {student.demographics.contact}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Behavior Details */}
                    <Grid item xs={12} md={8}>
                        <Box>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <b>Triggers:</b> {student.abc.antecedent}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <b>Behaviour:</b> {student.abc.behaviour}
                            </Typography>
                            <Typography variant="body2">
                                <b>Management:</b> {student.abc.consequence}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
}

function StudentDetailsModal({ open, student, onClose, reports }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Paper sx={{ 
                width: '90%', 
                maxWidth: 900, 
                maxHeight: '90vh',
                overflow: 'auto',
                p: 3 
            }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                    <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                        <Tab label="Details" icon={<PersonIcon />} />
                        <Tab label="Progress Record" icon={<AssessmentIcon />} />
                    </Tabs>
                </Box>

                {activeTab === 0 && (
                    <>
                        <Typography variant="h5" gutterBottom>{student.name}</Typography>
                        
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Typography variant="subtitle1" gutterBottom>Demographics</Typography>
                                <Typography variant="body2">DOB: {student.demographics.dob}</Typography>
                                <Typography variant="body2">Address: {student.demographics.address}</Typography>
                                <Typography variant="body2">Contact: {student.demographics.contact}</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>A-B-C Model</Typography>
                                <Box sx={{ pl: 2 }}>
                                    <Typography variant="body2" paragraph>
                                        <b>Antecedent (Triggers):</b> {student.abc.antecedent}
                                    </Typography>
                                    <Typography variant="body2" paragraph>
                                        <b>Behaviour:</b> {student.abc.behaviour}
                                    </Typography>
                                    <Typography variant="body2" paragraph>
                                        <b>Consequence:</b> {student.abc.consequence}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>Academic & Activity Levels</Typography>
                                <Box display="flex" gap={1} flexWrap="wrap">
                                    <Chip label={`English: Grade ${student.grades.english}`} />
                                    <Chip label={`Math: Grade ${student.grades.math}`} />
                                    <Chip label={`Science: Grade ${student.grades.science}`} />
                                    <Chip label={`Mind Batch: ${student.batches.mind}`} color="secondary"/>
                                    <Chip label={`CBCS: ${student.batches.cbcs}`} color="secondary"/>
                                    <Chip label={`Life Skills: ${student.batches.lifeSkills}`} color="secondary"/>
                                </Box>
                            </Grid>
                        </Grid>
                    </>
                )}

                {activeTab === 1 && (
                    <ProgressRecord
                        student={student}
                        reports={reports}
                    />
                )}
            </Paper>
        </Modal>
    );
}

function ProgressRecord({ student, reports }) {
    const [selectedWeek, setSelectedWeek] = useState(new Date());

    const isWithinSelectedWeek = (date, weekOf) => {
        const start = startOfWeek(weekOf);
        const end = endOfWeek(weekOf);
        const checkDate = new Date(date);
        return checkDate >= start && checkDate <= end;
    };

    const filteredReports = reports?.filter(report => {
        const isCorrectStudent = report.studentId === student.id;
        const isPublished = report.isPublished;
        const isInWeek = isWithinSelectedWeek(report.date, selectedWeek);
        return isCorrectStudent && isPublished && isInWeek;
    }) || [];

    const handlePreviousWeek = () => {
        const prevWeek = new Date(selectedWeek);
        prevWeek.setDate(prevWeek.getDate() - 7);
        setSelectedWeek(prevWeek);
    };

    const handleNextWeek = () => {
        const nextWeek = new Date(selectedWeek);
        nextWeek.setDate(nextWeek.getDate() + 7);
        setSelectedWeek(nextWeek);
    };

    return (
        <Box>
            <Box sx={{ 
                mb: 3, 
                mt: 2, 
                display: 'flex', 
                alignItems: 'center',
                gap: 2
            }}>
                <IconButton onClick={handlePreviousWeek}>
                    <ChevronLeftIcon />
                </IconButton>
                <Typography>
                    Week {format(selectedWeek, 'w, yyyy')}
                </Typography>
                <IconButton onClick={handleNextWeek}>
                    <ChevronRightIcon />
                </IconButton>
            </Box>

            {filteredReports.length === 0 ? (
                <Typography>No published reports for this week.</Typography>
            ) : (
                <Stack spacing={3}>
                    {filteredReports.map(report => (
                        <Paper 
                            key={report.id} 
                            elevation={1}
                            sx={{ p: 2 }}
                        >
                            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                                {format(new Date(report.date), 'EEEE, dd MMMM yyyy')}
                            </Typography>
                            
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                    Overall Demeanor
                                </Typography>
                                <Typography>
                                    {report.demeanor}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                    Completed Sessions
                                </Typography>
                                <Box display="flex" gap={1} flexWrap="wrap">
                                    {Object.entries(report.completedSessions || {}).map(([category, session]) => 
                                        session?.sessionId ? (
                                            <Chip
                                                key={category}
                                                label={`${category}: ${session.details}`}
                                                sx={{ m: 0.5 }}
                                            />
                                        ) : null
                                    )}
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                </Stack>
            )}
        </Box>
    );
}

function StudentsPage({ students, mentors, reports }) {  // Add mentors to props
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMentor, setSelectedMentor] = useState('');

    const filteredStudents = students.filter(student => {
        const searchLower = searchQuery.toLowerCase();
        const primaryMentor = mentors.find(m => m.id === student.primaryMentorId);
        const mentorName = primaryMentor?.name.toLowerCase() || '';
        
        // Filter by search query
        const matchesSearch = student.name.toLowerCase().includes(searchLower) ||
                            student.demographics.contact.includes(searchQuery) ||
                            mentorName.includes(searchLower);

        // Filter by selected mentor
        const matchesMentor = !selectedMentor || student.primaryMentorId === selectedMentor;

        return matchesSearch && matchesMentor;
    });

    return (
        <Box sx={{ p: 3, maxWidth: '100%' }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Student Database
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3, width: '100%' }}>
                    {/* Search Bar */}
                    <Grid item xs={12}>
                        <Paper sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            minWidth: '500px', // Double the minimum width
                        }}>
                            <IconButton sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <TextField
                                sx={{ 
                                    ml: 1, 
                                    flex: 1,
                                    width: '100%'
                                }}
                                placeholder="Search by student name, mentor name or contact number"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                variant="standard"
                                InputProps={{ disableUnderline: true }}
                                fullWidth
                            />
                        </Paper>
                    </Grid>

                    {/* Mentor Filter */}
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth sx={{ minWidth: '250px' }}>
                            <InputLabel>Filter by Mentor</InputLabel>
                            <Select
                                value={selectedMentor}
                                label="Filter by Mentor"
                                onChange={(e) => setSelectedMentor(e.target.value)}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 300,
                                            minWidth: '250px'
                                        }
                                    }
                                }}
                            >
                                <MenuItem value="">All Mentors</MenuItem>
                                {mentors.map(mentor => (
                                    <MenuItem 
                                        key={mentor.id} 
                                        value={mentor.id}
                                        sx={{ whiteSpace: 'normal', minWidth: '250px' }}
                                    >
                                        {mentor.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
                {filteredStudents.length === 0 ? (
                    <Grid item xs={12}>
                        <Typography variant="body1" color="text.secondary" align="center">
                            No students found matching your criteria
                        </Typography>
                    </Grid>
                ) : (
                    filteredStudents.map((student) => (
                        <Grid item key={student.id} xs={12} sx={{ width: '100%' }}>
                            <StudentCard 
                                student={student} 
                                mentors={mentors}
                                onViewDetails={() => setSelectedStudent(student)}
                            />
                        </Grid>
                    ))
                )}
            </Grid>

            {selectedStudent && (
                <StudentDetailsModal
                    open={Boolean(selectedStudent)}
                    student={selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                    reports={reports?.filter(r => r.isPublished)}
                />
            )}
        </Box>
    );
}

export default StudentsPage;