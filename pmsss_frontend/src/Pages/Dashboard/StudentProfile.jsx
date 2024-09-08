import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  AccountBalance as AccountBalanceIcon,
  AccountCircle as AccountCircleIcon,
  School as SchoolIcon,
  AttachMoney as AttachMoneyIcon,
  VerifiedUser as VerifiedUserIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import { updateUserData } from "../../utils/helper";
import userIcon from '../../../public/userIcon.png';

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

const StudentProfile = () => {
  const [userData, setUserData] = useState(null);
  const getStatusByIndex = (index) => {
    return steps[index] || "Unknown Status";
  };

  useEffect(() => {
    updateUserData();
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      console.log("No user data found");
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-100">
        <Header title={"Student Profile"} />
        <Box sx={{ mt: 4 }}>
          {userData ? (
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                    boxShadow: 3,
                  }}
                >
                  <Avatar
                    sx={{ width: 100, height: 100, mb: 2 }}
                    alt={userData?.data?.name}
                    src={userIcon}
                  />
                  <Typography variant="h5" component="div">
                    {userData?.data?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <EmailIcon sx={{ mr: 1 }} />
                    {userData?.data?.email}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      Personal Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          <PhoneIcon sx={{ mr: 1 }} />
                          <strong>Phone:</strong> {userData?.data?.phone}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          <AccountBalanceIcon sx={{ mr: 1 }} />
                          <strong>Account Number:</strong>{" "}
                          {userData?.data?.account_number}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          <AccountBalanceIcon sx={{ mr: 1 }} />
                          <strong>IFSC:</strong> {userData?.data?.ifsc}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          <AccountCircleIcon sx={{ mr: 1 }} />
                          <strong>Father's Name:</strong>{" "}
                          {userData?.data?.father_name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      Academic Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          <SchoolIcon sx={{ mr: 1 }} />
                          <strong>Class 10 Percentage:</strong>{" "}
                          {userData?.data?.class10_percent}%
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          <SchoolIcon sx={{ mr: 1 }} />
                          <strong>Class 12 Percentage:</strong>{" "}
                          {userData?.data?.class12_percent}%
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          <AttachMoneyIcon sx={{ mr: 1 }} />
                          <strong>Income:</strong> ₹{userData?.data?.income}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          <VerifiedUserIcon sx={{ mr: 1 }} />
                          <strong>Status:</strong>{" "}
                          {getStatusByIndex(userData?.data?.status)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ) : (
            <Typography variant="body1" color="text.secondary">
              No user data found
            </Typography>
          )}
        </Box>
      </div>
    </div>
  );
};

export default StudentProfile;