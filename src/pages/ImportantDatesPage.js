import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  Divider
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function ImportantDatesPage({ students, dates = [], onUpdateDates }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [newDate, setNewDate] = useState({
    name: '',
    startDate: null,
    endDate: null,
    studentsInvolved: []
  });

  const handleSelectAllStudents = () => {
    const allStudentIds = students.map(student => student.id);
    setNewDate(prev => ({
      ...prev,
      studentsInvolved: prev.studentsInvolved.length === students.length ? [] : allStudentIds
    }));
  };

  const handleSubmit = () => {
    if (newDate.name && newDate.startDate && newDate.endDate) {
      const formattedDate = {
        ...newDate,
        startDate: newDate.startDate.toISOString(),
        endDate: newDate.endDate.toISOString()
      };
      onUpdateDates([...dates, formattedDate]);
      setNewDate({
        name: '',
        startDate: null,
        endDate: null,
        studentsInvolved: []
      });
      setOpenDialog(false);
    }
  };

  const handleDelete = (index) => {
    const updatedDates = dates.filter((_, i) => i !== index);
    onUpdateDates(updatedDates);
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Important Dates</Typography>
        <Button 
          variant="contained" 
          onClick={() => setOpenDialog(true)}
        >
          Add New Date
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S. No.</TableCell>
              <TableCell>Name of the date</TableCell>
              <TableCell>Date range</TableCell>
              <TableCell>Students Involved</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(dates || []).map((date, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{date.name}</TableCell>
                <TableCell>
                  {date.startDate === date.endDate 
                    ? new Date(date.startDate).toLocaleDateString()
                    : `${new Date(date.startDate).toLocaleDateString()} - ${new Date(date.endDate).toLocaleDateString()}`
                  }
                </TableCell>
                <TableCell>
                  {date.studentsInvolved.length === students.length ? (
                    "ALL"
                  ) : (
                    date.studentsInvolved
                      .map(id => students?.find(s => s.id === id)?.name)
                      .filter(Boolean)
                      .join(', ')
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    color="error" 
                    onClick={() => handleDelete(index)}
                    size="small"
                    aria-label="delete date"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Important Date</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={newDate.name}
              onChange={(e) => setNewDate(prev => ({ ...prev, name: e.target.value }))}
            />
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={newDate.startDate}
                onChange={(date) => setNewDate(prev => ({ ...prev, startDate: date }))}
                slotProps={{ textField: { fullWidth: true } }}
              />
              
              <DatePicker
                label="End Date"
                value={newDate.endDate}
                onChange={(date) => setNewDate(prev => ({ ...prev, endDate: date }))}
                slotProps={{ textField: { fullWidth: true } }}
                minDate={newDate.startDate}
              />
            </LocalizationProvider>

            <FormControl fullWidth>
              <InputLabel>Students Involved</InputLabel>
              <Select
                multiple
                value={newDate.studentsInvolved}
                onChange={(e) => setNewDate(prev => ({ 
                  ...prev, 
                  studentsInvolved: e.target.value 
                }))}
                renderValue={(selected) => selected
                  .map(id => students.find(s => s.id === id)?.name)
                  .join(', ')}
              >
                <MenuItem>
                  <Checkbox 
                    checked={newDate.studentsInvolved.length === students.length}
                    indeterminate={newDate.studentsInvolved.length > 0 && 
                                  newDate.studentsInvolved.length < students.length}
                    onChange={handleSelectAllStudents}
                  />
                  <ListItemText primary="Select All" />
                </MenuItem>
                <Divider />
                {students.map((student) => (
                  <MenuItem key={student.id} value={student.id}>
                    <Checkbox checked={newDate.studentsInvolved.includes(student.id)} />
                    <ListItemText primary={student.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ImportantDatesPage;