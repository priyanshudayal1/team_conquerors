import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const DocumentUploadModal = ({ open }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('document', file);

    try {
      const response = await fetch('/uploadDocument', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Document upload successful:', data);
    } catch (error) {
      console.error('Document upload failed:', error);
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
          width: '50%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Upload Documents
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="file"
            onChange={handleFileChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Upload
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default DocumentUploadModal;