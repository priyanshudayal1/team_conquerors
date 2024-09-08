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
} from "@mui/material";
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

const SagDashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editStatus, setEditStatus] = useState(null);
  const [warning, setWarning] = useState("");

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

  const handleEditCheck = async (documentId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/sag/give_feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ documentId }),
      });
      const data = await response.json();
      if (data.edited) {
        setEditStatus("Edited");
        setWarning("Warning: Document has been edited.");
      } else {
        setEditStatus("Not Edited");
        setWarning("");
      }
    } catch (error) {
      console.error("Error checking document edit:", error);
    }
  };

  const handleApprove = async (studentId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/sag/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId }),
      });
      const data = await response.json();
      if (data.success) {
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === studentId ? { ...student, verified: true } : student
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
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.college}</TableCell>
                <TableCell>{student.dob}</TableCell>
                <TableCell>
                  {getStatusByIndex(student.status)}
                </TableCell>
                <TableCell>{editStatus}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditCheck(student.email)}
                  >
                    Check Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleApprove(student.id)}
                    sx={{ ml: 2 }}
                    disabled={student.verified}
                  >
                    Approve
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {warning && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          {warning}
        </Alert>
      )}
    </Box>
  );
};

export default SagDashboard;