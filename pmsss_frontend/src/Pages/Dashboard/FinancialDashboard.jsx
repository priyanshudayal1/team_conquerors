import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Header from '../../components/Dashboard/Header';
import { BACKEND_URL } from '../../utils/constants';
import { updateUserData } from '../../utils/helper';

const steps = [
  "Registered",
  "Verified",
  "Documents Submitted",
  "Automatic Verification",
  "Final Verification",
  "Forwarded to SAG Bureau",
  "Forwarded to Financial Bureau",
  "Scholarship Approved",
  "Disbursed",
];

const FinancialDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [transactionId, setTransactionId] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [transactionDialog, setTransactionDialog] = useState({ open: false, application: null });
  const [disburseDialog, setDisburseDialog] = useState({ open: false, application: null });

  useEffect(() => {
    updateUserData();
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
      const email = applicationId;
      const response = await fetch(`${BACKEND_URL}/financial/update_status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, transactionId }),
      });
      const data = await response.json();
      if (data.success) {
        setApplications((prevApplications) =>
          prevApplications.map((application) =>
            application.id === applicationId ? { ...application, status: 'Updated' } : application
          )
        );
        setTransactionId('');
        updateUserData();
        window.location.reload();
      } else {
        console.error('Failed to update status:', data.message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleAddTransactionId = async () => {
    try {
      console.log("transactionDialog", transactionDialog)
      const response = await fetch(`${BACKEND_URL}/financial/transaction_done`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ email: transactionDialog.application.email, transaction: transactionId }),
      });
      const data = await response.json();
      if (data.success) {
        setTransactionDialog({ open: false, application: null });
        setTransactionId('');
        updateUserData();
        window.location.reload();
      } else {
        console.error('Failed to add transaction ID:', data.message);
      }
    } catch (error) {
      console.error('Error adding transaction ID:', error);
    }
  };

  const handleDisburse = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/financial/disburse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: disburseDialog.application.email }),
      });
      const data = await response.json();
      if (data.success) {
        setDisburseDialog({ open: false, application: null });
        updateUserData();
        window.location.reload();
      } else {
        console.error('Failed to disburse:', data.message);
      }
    } catch (error) {
      console.error('Error disbursing:', error);
    }
  };

  const getStatusByIndex = (index) => {
    return steps[index] || "Unknown Status";
  };

  const handleOpenTransactionDialog = (application) => {
    setTransactionDialog({ open: true, application });
  };

  const handleCloseTransactionDialog = () => {
    setTransactionDialog({ open: false, application: null });
    setTransactionId('');
  };

  const handleOpenDisburseDialog = (application) => {
    setDisburseDialog({ open: true, application });
  };

  const handleCloseDisburseDialog = () => {
    setDisburseDialog({ open: false, application: null });
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
              <TableCell>Feedback</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No students found
                </TableCell>
              </TableRow>
            ) : (
              applications.map((application) => (
                <TableRow key={application.email}>
                  <TableCell>{application.name}</TableCell>
                  <TableCell>{application.account_number}</TableCell>
                  <TableCell>{application.ifsc}</TableCell>
                  <TableCell>
                    {application.transaction_id ? (
                      console.log("transaction_id", application.transaction_id),
                      application.transaction_id
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenTransactionDialog(application)}
                      >
                        Add Transaction ID
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{getStatusByIndex(application.status)}</TableCell>
                  <TableCell>{ application.feedback_given ? application.feedback : "Not Given"}</TableCell>
                  <TableCell>
                    {application.status === 7 ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleOpenDisburseDialog(application)}
                      >
                        Disburse
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setSelectedApplication(application.id);
                          handleUpdateStatus(application.email);
                        }}
                        disabled={application.status === 'Updated'}
                      >
                        Update Status
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={transactionDialog.open} onClose={handleCloseTransactionDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add Transaction ID</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Transaction ID"
            type="text"
            fullWidth
            variant="outlined"
            value={transactionId}
            onChange={handleTransactionIdChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTransactionDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTransactionId} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={disburseDialog.open} onClose={handleCloseDisburseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Disbursement</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to disburse the scholarship to {disburseDialog.application?.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDisburseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDisburse} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FinancialDashboard;