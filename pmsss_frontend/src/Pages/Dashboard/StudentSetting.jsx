import { useState } from 'react';
import { TextField, Container, Typography, Paper, IconButton, Box } from '@mui/material';
import { Edit } from '@mui/icons-material';
import Header from '../../components/Dashboard/Header';
import Sidebar from '../../components/Dashboard/Sidebar';

const StudentSetting = () => {
  const [userDetails, setUserDetails] = useState({
    username: 'john_doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    dob: '1990-01-01',
  });

  const [editField, setEditField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleEditClick = (field) => {
    setEditField(field);
  };

  const handleSaveClick = () => {
    setEditField(null);
    console.log('Updated user details:', userDetails);
    // Add logic to save the updated details
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-100">
        <Header />
        <Container maxWidth="">
          <Paper className="p-6">
            <Typography variant="h4" className="mb-6">User Settings</Typography>
            <Box className="space-y-6">
              <Box className="flex items-center justify-between">
                <Typography variant="h6">Username</Typography>
                <Typography>{userDetails.username}</Typography>
              </Box>
              <Box className="flex items-center justify-between">
                <Typography variant="h6">First Name</Typography>
                {editField === 'firstName' ? (
                  <TextField
                    name="firstName"
                    value={userDetails.firstName}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    onBlur={handleSaveClick}
                    autoFocus
                  />
                ) : (
                  <Box className="flex items-center">
                    <Typography>{userDetails.firstName}</Typography>
                    <IconButton onClick={() => handleEditClick('firstName')}>
                      <Edit />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Box className="flex items-center justify-between">
                <Typography variant="h6">Last Name</Typography>
                {editField === 'lastName' ? (
                  <TextField
                    name="lastName"
                    value={userDetails.lastName}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    onBlur={handleSaveClick}
                    autoFocus
                  />
                ) : (
                  <Box className="flex items-center">
                    <Typography>{userDetails.lastName}</Typography>
                    <IconButton onClick={() => handleEditClick('lastName')}>
                      <Edit />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Box className="flex items-center justify-between">
                <Typography variant="h6">Email</Typography>
                <Typography>{userDetails.email}</Typography>
              </Box>
              <Box className="flex items-center justify-between">
                <Typography variant="h6">Phone</Typography>
                {editField === 'phone' ? (
                  <TextField
                    name="phone"
                    value={userDetails.phone}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    onBlur={handleSaveClick}
                    autoFocus
                  />
                ) : (
                  <Box className="flex items-center">
                    <Typography>{userDetails.phone}</Typography>
                    <IconButton onClick={() => handleEditClick('phone')}>
                      <Edit />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Box className="flex items-center justify-between">
                <Typography variant="h6">Date of Birth</Typography>
                <Typography>{userDetails.dob}</Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default StudentSetting;