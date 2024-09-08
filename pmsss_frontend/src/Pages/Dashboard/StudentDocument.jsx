import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import DocumentCard from "../../components/Dashboard/DocumentCard";
import { updateUserData } from "../../utils/helper";
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

const StudentDocument = () => {
  const [userData, setUserData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      // Assuming userData contains documents in a JSON object
      const docs = parsedData.data.documents || {};
      const docsArray = Object.keys(docs).map(key => ({ id: key, name: key, file: docs[key].url }));
      setDocuments(docsArray);
      console.log("User documents:", docsArray);
    } else {
      console.log("No user data found");
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleView = (document) => {
    setSelectedDocument(document);
  };

  const handleClose = () => {
    setSelectedDocument(null);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-100">
        <Header title={"Document"} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <DocumentCard
                key={index}
                document={{ ...doc, getRootProps, getInputProps }}
                onView={() => handleView(doc)}
                onEdit={null} // Disable edit functionality
              />
            ))
          ) : (
            <Typography variant="h6" align="center" color="textSecondary">
              No documents available
            </Typography>
          )}
        </div>
      </div>
      {selectedDocument && (
        <Dialog open={true} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">{selectedDocument.name}</Typography>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <Box
              component="img"
              src={selectedDocument.file}
              alt={selectedDocument.name}
              sx={{ width: '100%', height: 'auto' }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StudentDocument;