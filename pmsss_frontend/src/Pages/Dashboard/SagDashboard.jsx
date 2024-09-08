import React, { useState, useEffect } from "react";
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
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Visibility, CheckCircle, Search } from "@mui/icons-material";
import Header from "../../components/Dashboard/Header";
import { BACKEND_URL } from "../../utils/constants";

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

const documentLabels = {
  file10th: "Class 10th Marksheet",
  file12th: "Class 12th Marksheet",
  collegeId: "College ID",
};

const SagDashboard = () => {
  const [students, setStudents] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [editStatuses, setEditStatuses] = useState({});
  const [warnings, setWarnings] = useState({});
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [approveDialog, setApproveDialog] = useState({ open: false, student: null, document: null });

  useEffect(() => {
    // Fetch student information from the backend
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setStudents(parsedData?.data?.list_of_students || []);
      console.log("User data found", parsedData);
    } else {
      console.log("No user data found");
      window.location.href = "/login";
    }
  }, []);

  const handleEditCheck = async (documentId, studentId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/sag/give_feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ documentId }),
      });
      const data = await response.json();
      setEditStatuses((prevStatuses) => ({
        ...prevStatuses,
        [studentId]: data.edited ? "Edited" : "Not Edited",
      }));
      setWarnings((prevWarnings) => ({
        ...prevWarnings,
        [studentId]: data.edited ? "Warning: Document has been edited." : "",
      }));
    } catch (error) {
      console.error("Error checking document edit:", error);
    }
  };

  const handleApprove = async (student, document) => {
    try {
      const response = await fetch(`${BACKEND_URL}/sag/approve_doc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: student.email, documentName: document }),
      });
      const data = await response.json();
      if (data.success) {
        setStudents((prevStudents) =>
          prevStudents.map((s) =>
            s.id === student.id ? { ...s, documents: { ...s.documents, [document]: { ...s.documents[document], status: "approved" } } } : s
          )
        );
      }
    } catch (error) {
      console.error("Error approving student:", error);
    }
  };

  const getStatusByIndex = (index) => {
    return steps[index] || "Unknown Status";
  };

  const handleExpandRow = (studentId) => {
    setExpandedRow(expandedRow === studentId ? null : studentId);
  };

  const handleViewDocument = (url) => {
    setSelectedDocument(url);
  };

  const handleCloseModal = () => {
    setSelectedDocument(null);
  };

  const handleOpenApproveDialog = (student, document) => {
    setApproveDialog({ open: true, student, document });
  };

  const handleCloseApproveDialog = () => {
    setApproveDialog({ open: false, student: null, document: null });
  };

  const handleConfirmApprove = () => {
    handleApprove(approveDialog.student, approveDialog.document);
    handleCloseApproveDialog();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Header title="SAG Bureau Dashboard" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>College</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Document Status</TableCell>
              <TableCell>Feedback</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <React.Fragment key={student.id}>
                <TableRow>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.college}</TableCell>
                  <TableCell>{student.dob}</TableCell>
                  <TableCell>{getStatusByIndex(student.status)}</TableCell>
                  <TableCell>{editStatuses[student.id]}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditCheck(student.email, student.id)}
                    >
                      Check Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleOpenApproveDialog(student, "all")}
                      sx={{ ml: 2 }}
                      disabled={student.verified}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="default"
                      onClick={() => handleExpandRow(student.id)}
                      sx={{ ml: 2 }}
                    >
                      {expandedRow === student.id ? "Hide" : "Show"} Documents
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedRow === student.id && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Box sx={{ display: 'flex', overflowX: 'auto' }}>
                        {Object.entries(student.documents).map(([key, { url, status }], index) => (
                          <Box key={index} sx={{ minWidth: 300, p: 2, border: '1px solid #ccc', borderRadius: 2, m: 1 }}>
                            <Typography variant="body2">{documentLabels[key]}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                              <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<Visibility />}
                                onClick={() => handleViewDocument(url)}
                              >
                                View
                              </Button>
                              <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<Search />}
                              >
                                Detect by AI
                              </Button>
                              {status === "approved" ? (
                                <Typography variant="body2" color="success.main">
                                  Approved
                                </Typography>
                              ) : (
                                <Button
                                  variant="outlined"
                                  color="success"
                                  startIcon={<CheckCircle />}
                                  onClick={() => handleOpenApproveDialog(student, key)}
                                >
                                  Approve
                                </Button>
                              )}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {Object.values(warnings).map((warning, index) => (
        warning && (
          <Alert key={index} severity="warning" sx={{ mt: 2 }}>
            {warning}
          </Alert>
        )
      ))}
      <Dialog open={Boolean(selectedDocument)} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>Document View</DialogTitle>
        <DialogContent>
          {selectedDocument && (
            <Box component="img" src={selectedDocument} alt="Document" sx={{ width: '100%', height: 'auto' }} />
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={approveDialog.open} onClose={handleCloseApproveDialog}>
        <DialogTitle>Confirm Approval</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to approve {documentLabels[approveDialog.document]} for {approveDialog.student?.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseApproveDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmApprove} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SagDashboard;