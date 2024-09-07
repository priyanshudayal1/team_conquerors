import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BACKEND_URL } from "../utils/constants";


function Login() {
  const [role, setRole] = useState("student");
  const [responseMessage, setResponseMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      role: "student",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username/Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${BACKEND_URL}/student/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.username,
            password: values.password,
          }),
        });
        const data = await response.json();
        if (data.success) {
          setResponseMessage("Login Successful");
          sessionStorage.setItem("data", data.data);
          window.location.href = "/dashboard/student";
        } else {
          setResponseMessage("Invalid Credentials");
        }
      } catch (error) {
        console.error("Error:", error);
        setResponseMessage("An error occurred. Please try again.");
      }
    },
  });

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    formik.setFieldValue("role", event.target.value);
  };

  const getHeading = () => {
    switch (role) {
      case "student":
        return "Student Login";
      case "SAG burea":
        return "SAG Burea Login";
      case "Financial burea":
        return "Financial Burea Login";
      default:
        return "Login Page";
    }
  };

  return (
    <div>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
          padding: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {getHeading()}
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          style={{ width: "100%", maxWidth: 400 }}
        >
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username/Email"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            margin="normal"
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={role}
              onChange={handleRoleChange}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="SAG burea">SAG Burea</MenuItem>
              <MenuItem value="Financial burea">Financial Burea</MenuItem>
            </Select>
          </FormControl>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Login
          </Button>
        </form>
        {responseMessage && (
          <Typography variant="body1" color="error" sx={{ mt: 2 }}>
            {responseMessage}
          </Typography>
        )}
      </Box>
      <Footer />
    </div>
  );
}

export default Login;