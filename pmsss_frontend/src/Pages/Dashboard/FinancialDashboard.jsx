import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import Header from '../../components/Dashboard/Header';
import { BACKEND_URL } from '../../utils/constants';

const steps = [
  "Registered",
  "Verified",
  "Documents Submitted",
  "Automatic Verification",
  "Final Verification",
  "Forwarded to SAG Bureau",
  "Forwarded to Financial Bureau",
  "Scholarship Approval",
  "Disbursed",
];

const FinancialDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [transactionId, setTransactionId] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    // Fetch student information from the backend
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setApplications(parsedData?.data?.list_of_students || []);
      console.log("User data found", parsedData);
    } else {
      console.log("No user data found");
      window.location.href = "/login";
    }
  }, []);

  const handleTransactionIdChange = (event) => {
    setTransactionId(event.target.value);
  };

  const handleUpdateStatus = async (applicationId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/financial/update_status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ applicationId, transactionId }),
      });
      const data = await response.json();
      if (data.success) {
        setApplications((prevApplications) =>
          prevApplications.map((application) =>
            application.id === applicationId ? { ...application, status: 'Updated' } : application
          )
        );
        setTransactionId('');
      } else {
        console.error('Failed to update status:', data.message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusByIndex = (index) => {
    return steps[index] || "Unknown Status";
  };

  return (
    <Box sx={{ p: 3 }}>
      <Header title="Financial Bureau Dashboard" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Bank Account</TableCell>
              <TableCell>IFSC Code</TableCell>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.email}>
                <TableCell>{application.name}</TableCell>
                <TableCell>{application.account_number}</TableCell>
                <TableCell>{application.ifsc}</TableCell>
                <TableCell>
                  <TextField
                    value={selectedApplication === application.id ? transactionId : ''}
                    onChange={handleTransactionIdChange}
                    disabled={selectedApplication !== application.id}
                  />
                </TableCell>
                <TableCell>{getStatusByIndex(application.status)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setSelectedApplication(application.id);
                      handleUpdateStatus(application.id);
                    }}
                    disabled={application.status === 'Updated'}
                  >
                    Update Status
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FinancialDashboard;