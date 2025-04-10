import React, { useState } from 'react';
import { Typography, Paper, List, ListItem, ListItemText, ListItemButton, Collapse, Box, Divider, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function StudentDetails({ student }) {
  return (
    <Box sx={{ p: 2, borderTop: '1px solid #eee' }}>
      <Typography variant="h6">Details for {student.name}</Typography>
      <Divider sx={{ my: 1 }}/>
      <Typography variant="subtitle1" gutterBottom>Demographics</Typography>
      <Typography variant="body2">DOB: {student.demographics.dob}</Typography>
      <Typography variant="body2">Address: {student.demographics.address}</Typography>
      <Typography variant="body2">Contact: {student.demographics.contact}</Typography>
      <Divider sx={{ my: 1 }}/>
      <Typography variant="subtitle1" gutterBottom>A-B-C Model</Typography>
      <Typography variant="body2"><b>Antecedent (Triggers):</b> {student.abc.antecedent}</Typography>
      <Typography variant="body2"><b>Behaviour:</b> {student.abc.behaviour}</Typography>
      <Typography variant="body2"><b>Consequence (Management):</b> {student.abc.consequence}</Typography>
      <Divider sx={{ my: 1 }}/>
      <Typography variant="subtitle1" gutterBottom>Grade Levels & Batches</Typography>
      <Box display="flex" gap={2} flexWrap="wrap">
        <Chip label={`English: Grade ${student.grades.english}`} />
        <Chip label={`Math: Grade ${student.grades.math}`} />
        <Chip label={`Science: Grade ${student.grades.science}`} />
        <Chip label={`Mind Batch: ${student.batches.mind}`} color="secondary"/>
        <Chip label={`CBCS Batch: ${student.batches.cbcs}`} color="secondary"/>
        <Chip label={`Life Skills Batch: ${student.batches.lifeSkills}`} color="secondary"/>
      </Box>
      {/* Add editing capabilities here if needed */}
    </Box>
  );
}


function StudentsPage({ students }) {
  const [openStudentId, setOpenStudentId] = useState(null);
  const [filterGrade, setFilterGrade] = useState('');

  const handleStudentClick = (id) => {
    setOpenStudentId(openStudentId === id ? null : id);
  };

  const filteredStudents = filterGrade
    ? students.filter(s => s.grade === parseInt(filterGrade))
    : students;

   const uniqueGrades = [...new Set(students.map(s => s.grade))].sort((a, b) => a - b);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Student Database</Typography>

       <FormControl sx={{ mb: 2, minWidth: 120 }} size="small">
            <InputLabel>Filter by Grade</InputLabel>
            <Select
                value={filterGrade}
                label="Filter by Grade"
                onChange={(e) => setFilterGrade(e.target.value)}
            >
                <MenuItem value=""><em>All Grades</em></MenuItem>
                {uniqueGrades.map(grade => (
                     <MenuItem key={grade} value={grade}>Grade {grade}</MenuItem>
                ))}
            </Select>
        </FormControl>

      <Paper elevation={3}>
        <List>
          {filteredStudents.map((student) => (
            <React.Fragment key={student.id}>
              <ListItemButton onClick={() => handleStudentClick(student.id)}>
                <ListItemText primary={student.name} secondary={`Grade ${student.grade}`} />
                {openStudentId === student.id ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openStudentId === student.id} timeout="auto" unmountOnExit>
                <StudentDetails student={student} />
              </Collapse>
              <Divider component="li" />
            </React.Fragment>
          ))}
           {filteredStudents.length === 0 && (
                <ListItem><ListItemText primary="No students match the filter." /></ListItem>
           )}
        </List>
      </Paper>
    </Box>
  );
}

export default StudentsPage;