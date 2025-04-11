import React from 'react';
import {
    Box,
    Card,
    Grid,
    Typography,
    Avatar,
    Chip,
    IconButton,
    Paper,
    TextField
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';

function MentorCard({ mentor, students }) {
    // Add null check and default value for assignedStudents
    const assignedStudents = students.filter(s => 
        mentor.assignedStudents?.includes(s.id) || false
    );

    return (
        <Card sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'row',
            gap: 3,
            width: '100%',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            boxShadow: 1
        }}>
            <Avatar
                sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'primary.main',
                    fontSize: '2rem'
                }}
            >
                {mentor.name?.charAt(0) || '?'}
            </Avatar>

            <Box sx={{ flex: 1 }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {mentor.name || 'Unknown'}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {mentor.role || 'Role not specified'}
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <EmailIcon color="action" fontSize="small" />
                            <Typography variant="body2">{mentor.email || 'No email provided'}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PhoneIcon color="action" fontSize="small" />
                            <Typography variant="body2">{mentor.contact || 'No contact provided'}</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <PeopleIcon color="action" fontSize="small" />
                            <Typography variant="body2">
                                Assigned Students: {assignedStudents?.length || 0}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {assignedStudents?.length > 0 ? (
                                assignedStudents.map(student => (
                                    <Chip
                                        key={student.id}
                                        label={student.name}
                                        size="small"
                                        variant="outlined"
                                    />
                                ))
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    No students assigned
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
}

function MentorsPage({ mentors, students }) {
    const [searchQuery, setSearchQuery] = React.useState('');

    const filteredMentors = mentors.filter(mentor => 
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.contact.includes(searchQuery)
    );

    return (
        <Box sx={{ p: 3, width: '100%' }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Mentors
            </Typography>

            <Paper sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                mb: 3
            }}>
                <IconButton sx={{ p: '10px' }}>
                    <SearchIcon />
                </IconButton>
                <TextField
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search mentors by name, email or contact"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    fullWidth
                />
            </Paper>

            <Grid container spacing={3}>
                {filteredMentors.map(mentor => (
                    <Grid item key={mentor.id} xs={12}>
                        <MentorCard mentor={mentor} students={students} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default MentorsPage;