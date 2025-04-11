import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Paper, 
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Button,
    Stack,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PublishIcon from '@mui/icons-material/Publish';
import UnpublishedIcon from '@mui/icons-material/Unpublished';

// Reports state management
let reports = [];

const getReports = () => reports;

const addReport = (report) => {
    const newReport = {
        ...report,
        id: `report-${Date.now()}`,
        isPublished: false,
        createdAt: new Date().toISOString(),
        completedSessions: {
            body: report.completedBody,
            mind: report.completedMind,
            english: report.completedEnglish,
            math: report.completedMath,
            science: report.completedScience,
            cbcs: report.completedCbcs,
            lifeSkills: report.completedLifeSkills
        }
    };
    console.log('Adding new report:', newReport);
    reports.push(newReport);
    saveToLocalStorage();
    return newReport;
};

const updateReport = (reportId, updates) => {
    reports = reports.map(report => 
        report.id === reportId ? { ...report, ...updates } : report
    );
    saveToLocalStorage();
};

const loadFromLocalStorage = () => {
    const savedReports = localStorage.getItem('dailyReports');
    if (savedReports) {
        reports = JSON.parse(savedReports);
    }
};

const saveToLocalStorage = () => {
    localStorage.setItem('dailyReports', JSON.stringify(reports));
};

function ViewReportDialog({ open, onClose, report, students, mentors }) {
    if (!report) return null;

    const student = students.find(s => s.id === report.studentId);
    const mentor = mentors.find(m => m.id === report.mentorId);

    const renderCompletedSessions = () => {
        if (!report.completedSessions) return null;

        return Object.entries(report.completedSessions)
            .filter(([_, session]) => session !== null)
            .map(([category, session]) => (
                <Box key={category} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                        {session.details}
                    </Typography>
                </Box>
            ));
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Daily Report - {format(new Date(report.date), 'dd MMMM yyyy')}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">Student</Typography>
                    <Typography variant="body1">{student?.name}</Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">Mentor</Typography>
                    <Typography variant="body1">{mentor?.name}</Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary">Overall Demeanor</Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {report.demeanor || 'No demeanor notes provided'}
                    </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Completed Sessions
                    </Typography>
                    {renderCompletedSessions()}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

function DailyReportsManagementPage({ students, mentors }) {
    const [localReports, setLocalReports] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState(new Date());
    const [selectedMentor, setSelectedMentor] = useState('');
    const [viewingReport, setViewingReport] = useState(null);

    // Load reports on component mount
    useEffect(() => {
        loadFromLocalStorage();
        setLocalReports(getReports());
    }, []);

    const handlePublishReport = (reportId, isPublished) => {
        updateReport(reportId, { isPublished });
        setLocalReports(getReports());
    };

    const handleViewReport = (report) => {
        setViewingReport(report);
    };

    const filteredReports = localReports.filter(report => {
        const reportDate = new Date(report.date);
        const weekStart = startOfWeek(selectedWeek);
        const weekEnd = endOfWeek(selectedWeek);
        
        return reportDate >= weekStart && 
               reportDate <= weekEnd && 
               (!selectedMentor || report.mentorId === selectedMentor);
    });

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Daily Reports Management
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <DatePicker
                        label="Select Week"
                        value={selectedWeek}
                        onChange={setSelectedWeek}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Mentor</InputLabel>
                        <Select
                            value={selectedMentor}
                            label="Mentor"
                            onChange={(e) => setSelectedMentor(e.target.value)}
                        >
                            <MenuItem value="">All Mentors</MenuItem>
                            {mentors.map(mentor => (
                                <MenuItem key={mentor.id} value={mentor.id}>
                                    {mentor.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </Paper>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Student</TableCell>
                            <TableCell>Mentor</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredReports.map((report) => (
                            <TableRow key={`${report.date}-${report.studentId}`}>
                                <TableCell>{format(new Date(report.date), 'dd/MM/yyyy')}</TableCell>
                                <TableCell>
                                    {students.find(s => s.id === report.studentId)?.name}
                                </TableCell>
                                <TableCell>
                                    {mentors.find(m => m.id === report.mentorId)?.name}
                                </TableCell>
                                <TableCell>
                                    {report.isPublished ? 'Published' : 'Draft'}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleViewReport(report)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton 
                                        onClick={() => handlePublishReport(report.id, !report.isPublished)}
                                        color={report.isPublished ? "error" : "primary"}
                                    >
                                        {report.isPublished ? <UnpublishedIcon /> : <PublishIcon />}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <ViewReportDialog
                open={Boolean(viewingReport)}
                onClose={() => setViewingReport(null)}
                report={viewingReport}
                students={students}
                mentors={mentors}
            />
        </Box>
    );
}

// Initialize data from localStorage
loadFromLocalStorage();

export default DailyReportsManagementPage;
export { addReport, getReports, updateReport };