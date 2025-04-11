import React, { useState } from 'react';
import {
    Typography,
    Paper,
    Box,
    TextField,
    Button,
    Alert,
    Snackbar
} from '@mui/material';

function SettingsPage({ settings, onUpdateSettings }) {
    const [sessionsPerDay, setSessionsPerDay] = useState(settings?.sessionsPerDay || 5);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateSettings({
            ...settings,
            sessionsPerDay: parseInt(sessionsPerDay)
        });
        setShowSuccess(true);
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', pt: 2 }}>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>

            <Paper sx={{ p: 3, mt: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h6" gutterBottom>
                        Timetable Configuration
                    </Typography>

                    <TextField
                        fullWidth
                        label="Sessions Per Day"
                        type="number"
                        value={sessionsPerDay}
                        onChange={(e) => setSessionsPerDay(e.target.value)}
                        inputProps={{ min: 1, max: 10 }}
                        helperText="Maximum number of sessions that can be scheduled in a day"
                        sx={{ mt: 2 }}
                    />

                    <Button 
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3 }}
                    >
                        Save Changes
                    </Button>
                </form>
            </Paper>

            <Snackbar
                open={showSuccess}
                autoHideDuration={3000}
                onClose={() => setShowSuccess(false)}
            >
                <Alert severity="success" onClose={() => setShowSuccess(false)}>
                    Settings updated successfully
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default SettingsPage;