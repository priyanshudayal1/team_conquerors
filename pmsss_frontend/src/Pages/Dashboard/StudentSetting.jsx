import { useState, useEffect } from "react";
import {
  TextField,
  Container,
  Typography,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import {
  Edit as EditIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  School as SchoolIcon,
  AccountBalance as AccountBalanceIcon,
  Code as CodeIcon,
  AttachMoney as AttachMoneyIcon,
  Percent as PercentIcon,
  Phone as PhoneIcon,
  VerifiedUser as VerifiedUserIcon,
} from "@mui/icons-material";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import { updateUserData } from "../../utils/helper";

const StudentSetting = () => {
  const [userData, setUserData] = useState(null);
  const [editField, setEditField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleEditClick = (field) => {
    setEditField(field);
  };

  const handleSaveClick = () => {
    setEditField(null);
    console.log("Updated user details:", userData);
    // Add logic to save the updated details
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
        <Header title={"Settings"} />
        <Container maxWidth="lg">
          <Paper className="p-6">
            <Typography variant="h4" className="mb-6">
              User Settings
            </Typography>
            <Box className="space-y-6">
              <Box className="flex items-center justify-between">
                <Box className="flex items-center">
                  <PersonIcon className="mr-2" />
                  <Typography variant="h6">Name</Typography>
                </Box>
                <Typography>{userData?.data?.name}</Typography>
              </Box>
              <Box className="flex items-center justify-between">
                <Box className="flex items-center">
                  <EmailIcon className="mr-2" />
                  <Typography variant="h6">Email</Typography>
                </Box>
                <Typography>{userData?.data?.email}</Typography>
              </Box>
              <Box className="flex items-center justify-between">
                <Box className="flex items-center">
                  <SchoolIcon className="mr-2" />
                  <Typography variant="h6">College</Typography>
                </Box>
                {editField === "college" ? (
                  <TextField
                    name="college"
                    value={userData?.data?.college}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    onBlur={handleSaveClick}
                    autoFocus
                  />
                ) : (
                  <Box className="flex items-center">
                    <Typography>{userData?.data?.college}</Typography>
                    <IconButton onClick={() => handleEditClick("college")}>
                      <EditIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Box className="flex items-center justify-between">
                <Box className="flex items-center">
                  <AccountBalanceIcon className="mr-2" />
                  <Typography variant="h6">Account Number</Typography>
                </Box>
                {editField === "account_number" ? (
                  <TextField
                    name="account_number"
                    value={userData?.data?.account_number}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    onBlur={handleSaveClick}
                    autoFocus
                  />
                ) : (
                  <Box className="flex items-center">
                    <Typography>{userData?.data?.account_number}</Typography>
                    <IconButton
                      onClick={() => handleEditClick("account_number")}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Box className="flex items-center justify-between">
                <Box className="flex items-center">
                  <CodeIcon className="mr-2" />
                  <Typography variant="h6">IFSC</Typography>
                </Box>
                {editField === "ifsc" ? (
                  <TextField
                    name="ifsc"
                    value={userData?.data?.ifsc}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    onBlur={handleSaveClick}
                    autoFocus
                  />
                ) : (
                  <Box className="flex items-center">
                    <Typography>{userData?.data?.ifsc}</Typography>
                    <IconButton onClick={() => handleEditClick("ifsc")}>
                      <EditIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Box className="flex items-center justify-between">
                <Box className="flex items-center">
                  <PersonIcon className="mr-2" />
                  <Typography variant="h6">Father&apos;s Name</Typography>
                </Box>
                {editField === "father_name" ? (
                  <TextField
                    name="father_name"
                    value={userData?.data?.father_name}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    onBlur={handleSaveClick}
                    autoFocus
                  />
                ) : (
                  <Box className="flex items-center">
                    <Typography>{userData?.data?.father_name}</Typography>
                    <IconButton onClick={() => handleEditClick("father_name")}>
                      <EditIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Box className="flex items-center justify-between">
                <Box className="flex items-center">
                  <AttachMoneyIcon className="mr-2" />
                  <Typography variant="h6">Income</Typography>
                </Box>
                {editField === "income" ? (
                  <TextField
                    name="income"
                    value={userData?.data?.income}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    onBlur={handleSaveClick}
                    autoFocus
                  />
                ) : (
                  <Box className="flex items-center">
                    <Typography>{userData?.data?.income}</Typography>
                    <IconButton onClick={() => handleEditClick("income")}>
                      <EditIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Box className="flex items-center justify-between">
                <Box className="flex items-center">
                  <PercentIcon className="mr-2" />
                  <Typography variant="h6">10th Class Percentage</Typography>
                </Box>
                {editField === "class10_percent" ? (
                  <TextField
                    name="class10_percent"
                    value={userData?.data?.class10_percent}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    onBlur={handleSaveClick}
                    autoFocus
                  />
                ) : (
                  <Box className="flex items-center">
                    <Typography>{userData?.data?.class10_percent}</Typography>
                    <IconButton
                      onClick={() => handleEditClick("class10_percent")}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Box className="flex items-center justify-between">
                <Box className="flex items-center">
                  <PercentIcon className="mr-2" />
                  <Typography variant="h6">12th Class Percentage</Typography>
                </Box>
                {editField === "class12_percent" ? (
                  <TextField
                    name="class12_percent"
                    value={userData?.data?.class12_percent}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    onBlur={handleSaveClick}
                    autoFocus
                  />
                ) : (
                  <Box className="flex items-center">
                    <Typography>{userData?.data?.class12_percent}</Typography>
                    <IconButton
                      onClick={() => handleEditClick("class12_percent")}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Box className="flex items-center justify-between">
                <Box className="flex items-center">
                  <VerifiedUserIcon className="mr-2" />
                  <Typography variant="h6">Status</Typography>
                </Box>
                {editField === "status" ? (
                  <TextField
                    name="status"
                    value={userData?.data?.status}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    onBlur={handleSaveClick}
                    autoFocus
                  />
                ) : (
                  <Box className="flex items-center">
                    <Typography>{userData?.data?.status}</Typography>
                    <IconButton onClick={() => handleEditClick("status")}>
                      <EditIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Box className="flex items-center justify-between">
                <Box className="flex items-center">
                  <PhoneIcon className="mr-2" />
                  <Typography variant="h6">Phone</Typography>
                </Box>
                {editField === "phone" ? (
                  <TextField
                    name="phone"
                    value={userData?.data?.phone}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    onBlur={handleSaveClick}
                    autoFocus
                  />
                ) : (
                  <Box className="flex items-center">
                    <Typography>{userData?.data?.phone}</Typography>
                    <IconButton onClick={() => handleEditClick("phone")}>
                      <EditIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default StudentSetting;