import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { BACKEND_URL } from "../../utils/constants";

const DocumentUploadModal = ({ open }) => {
  const [file10th, setFile10th] = useState(null);
  const [file12th, setFile12th] = useState(null);
  const [collegeId, setCollegeId] = useState(null);
  const [force, setForce] = useState(false);
  const [status, setStatus] = useState({
    file10th: "Not Uploaded",
    file12th: "Not Uploaded",
    collegeId: "Not Uploaded",
  });
  const [error, setError] = useState({
    file10th: "",
    file12th: "",
    collegeId: "",
  });
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setEmail(JSON.parse(storedData).data.email);
    }
  }, []);

  const handleFileChange = (event, setFile, fileType) => {
    const file = event.target.files[0];
    setFile(file);
    setStatus((prevStatus) => ({ ...prevStatus, [fileType]: "Uploaded" }));
    setError((prevError) => ({ ...prevError, [fileType]: "" }));
  };

  const handleReset = () => {
    setFile10th(null);
    setFile12th(null);
    setCollegeId(null);
    setStatus({
      file10th: "Not Uploaded",
      file12th: "Not Uploaded",
      collegeId: "Not Uploaded",
    });
    setError({
      file10th: "",
      file12th: "",
      collegeId: "",
    });
    setForce(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file10th", file10th);
    formData.append("file12th", file12th);
    formData.append("collegeId", collegeId);
    formData.append("email", email);
    formData.append("force", force);
    try {
      const response = await fetch(`${BACKEND_URL}/student/upload_docs`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Response:", data);
      setLoading(false);
      if (response.success) {
        /*setStatus({
          file10th: "Upload successful",
          file12th: "Upload successful",
          collegeId: "Upload successful",
        });*/
        setError({
          file10th: "Upload successful",
          file12th: "Upload successful",
          collegeId: "Upload successful",
        });
        window.location.href = "/dashboard/student";
      } else if (data.blur) {
        setError({
          file10th: data.errors?.file10th || "Upload failed",
          file12th: data.errors?.file12th || "Upload failed",
          collegeId: data.errors?.collegeId || "Upload failed",
        });
      }else if (data.force){
        setError({
          file10th: "Upload successful",
          file12th: "Upload successful",
          collegeId: "Upload successful",
        });
        window.location.href = "/dashboard/student";
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setError({
        file10th: "Upload failed",
        file12th: "Upload failed",
        collegeId: "Upload failed",
      });
    }
  };

  const handleForceSubmit = () => {
    setForce(true);
    handleSubmit(new Event('submit'));
  };

  return (
    <Dialog
      open={open}
      onClose={() => {}}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          height: "80%",
          maxHeight: "100%",
          borderRadius: 2,
          p: 2,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h4" component="div">
          Upload Documents
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {["file10th", "file12th", "collegeId"].map((fileType) => (
            <Box
              key={fileType}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "2px dashed #ccc",
                borderRadius: 2,
                p: 2,
                cursor: "pointer",
                "&:hover": {
                  borderColor: "primary.main",
                },
                mb: 2,
                position: "relative",
              }}
            >
              <input
                type="file"
                onChange={(e) =>
                  handleFileChange(
                    e,
                    fileType === "file10th"
                      ? setFile10th
                      : fileType === "file12th"
                      ? setFile12th
                      : setCollegeId,
                    fileType
                  )
                }
                style={{ display: "none" }}
                id={`file-upload-${fileType}`}
                disabled={
                  (fileType === "file10th" && file10th !== null) ||
                  (fileType === "file12th" &&
                    (status.file10th !== "Uploaded" || file12th !== null)) ||
                  (fileType === "collegeId" &&
                    (status.file12th !== "Uploaded" || collegeId !== null))
                }
              />
              <label
                htmlFor={`file-upload-${fileType}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <IconButton color="primary" component="span">
                  <CloudUpload fontSize="large" />
                </IconButton>
                <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                  {fileType === "file10th"
                    ? file10th
                      ? file10th.name
                      : "Upload 10th Class Marksheet"
                    : fileType === "file12th"
                    ? file12th
                      ? file12th.name
                      : "Upload 12th Class Marksheet"
                    : collegeId
                    ? collegeId.name
                    : "Upload College ID"}
                </Typography>
              </label>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Chip
                  label={status[fileType]}
                  color={
                    status[fileType] === "Not Uploaded" ? "default" : "primary"
                  }
                  sx={{ ml: 2 }}
                />
                {status[fileType] === "Uploading..." && !error[fileType] && (
                  <CircularProgress size={24} sx={{ ml: 2 }} />
                )}
                {error[fileType] && (
                  <Alert
                    severity={
                      error[fileType].includes("successful")
                        ? "success"
                        : "error"
                    }
                    sx={{ ml: 2 }}
                  >
                    {error[fileType]}
                  </Alert>
                )}
              </Box>
            </Box>
          ))}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={
              loading ||
              status.file10th !== "Uploaded" ||
              status.file12th !== "Uploaded" ||
              status.collegeId !== "Uploaded"
            }
          >
            {loading ? <CircularProgress size={24} /> : force ? "Submit Again" : "Submit"}
          </Button>
          {Object.values(error).some((err) => err.includes("is blur")) && (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleReset}
              >
                Reset Files
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleForceSubmit}
              >
                Continue with These Files
              </Button>
            </Box>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUploadModal;