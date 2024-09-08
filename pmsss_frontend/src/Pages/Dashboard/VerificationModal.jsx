import { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

const VerificationModal = ({ open }) => {
  const [mobile, setMobile] = useState('');
  const [aadhar, setAadhar] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/verifystudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile, aadhar }),
      });
      const data = await response.json();
      console.log('Verification successful:', data);
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Verify Student
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Aadhaar Number"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Verify
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default VerificationModal;