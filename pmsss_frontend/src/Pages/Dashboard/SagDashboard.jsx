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
  TextField,
  CircularProgress,
} from "@mui/material";
import { Visibility, CheckCircle, Search, Feedback } from "@mui/icons-material";
import Header from "../../components/Dashboard/Header";
import { BACKEND_URL } from "../../utils/constants";
import { updateUserData } from "../../utils/helper";

const steps = [
  "Registered",
  "Verified",
  "Documents Submitted",
  "Automatic Verification",
  "Forwarded to SAG Bureau",
  "Final Verification",
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
  const [warnings, setWarnings] = useState({});
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [approveDialog, setApproveDialog] = useState({ open: false, student: null, document: null });
  const [aiDetectionResult, setAiDetectionResult] = useState({ open: false, url: null, meta: null });
  const [feedbackDialog, setFeedbackDialog] = useState({ open: false, student: null });
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleDetectByAI = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/sag/detect_edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      if (data.success) {
        setAiDetectionResult({ open: true, url: data.url, meta: data.meta_result });
      }
    } catch (error) {
      console.error("Error detecting document edit:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFeedback = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/sag/add_feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: feedbackDialog.student.email, feedback }),
      });
      const data = await response.json();
      if (data.success) {
        setFeedbackDialog({ open: false, student: null });
        setFeedback("");
        updateUserData();
      }
    } catch (error) {
      console.error("Error adding feedback:", error);
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

  const handleOpenFeedbackDialog = (student) => {
    setFeedbackDialog({ open: true, student });
  };

  const handleCloseFeedbackDialog = () => {
    setFeedbackDialog({ open: false, student: null });
    setFeedback("");
  };

  const handleCloseAiDetectionResult = () => {
    setAiDetectionResult({ open: false, url: null, meta: null });
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
                  <TableCell>{student.feedback_given ? student.feedback : "Not Given"}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="default"
                      onClick={() => handleExpandRow(student.id)}
                      sx={{ ml: 2 }}
                    >
                      {expandedRow === student.id ? "Hide" : "Show"} Documents
                    </Button>
                    {
                      !student.feedback_given &&
                      <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Feedback />}
                      onClick={() => handleOpenFeedbackDialog(student)}
                      sx={{ ml: 2 }}
                    >
                      Add Feedback
                    </Button>
                    }
                    
                  </TableCell>
                </TableRow>
                {expandedRow === student.id && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Box sx={{ display: 'flex', overflowX: 'auto', justifyContent: 'space-evenly' }}>
                        {Object.entries(student.documents).map(([key, { url, status }], index) => (
                          <Box key={key} sx={{ minWidth: 400, p: 2, border: '1px solid #ccc', borderRadius: 2, m: 1 }}>
                            <Typography variant="body2">{documentLabels[key]}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, alignItems: 'center' }}>
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
                                onClick={() => handleDetectByAI(url)}
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
      <Dialog open={aiDetectionResult.open} onClose={handleCloseAiDetectionResult} maxWidth="md" fullWidth>
        <DialogTitle>AI Detection Result</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {aiDetectionResult.url && (
                <Box component="img" src={aiDetectionResult.url} alt="AI Detection Result" sx={{ width: '100%', height: 'auto' }} />
              )}
              {aiDetectionResult.meta && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6">Metadata:</Typography>
                  <Typography variant="body2">{JSON.stringify(aiDetectionResult.meta, null, 2)}</Typography>
                </Box>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAiDetectionResult} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={feedbackDialog.open} onClose={handleCloseFeedbackDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add Feedback</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Feedback"
            type="text"
            fullWidth
            variant="outlined"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFeedbackDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddFeedback} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SagDashboard;