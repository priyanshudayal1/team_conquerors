import { Stepper, Step, StepLabel } from "@mui/material";
import dashboardImg from "../../../public/dashboardImg.jpg";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useEffect, useState } from "react";
import VerificationModal from "./VerificationModal";
import DocumentUploadModal from "./DocumentUpload";
import { updateUserData } from "../../utils/helper";

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

const StudentDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isDocumentUploadModalOpen, setIsDocumentUploadModalOpen] =
    useState(false);

  const openVerificationModal = () => {
    setIsVerificationModalOpen(true);
  };

  useEffect(() => {
    updateUserData();
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      console.log("No user data found");
    }
  }, [isDocumentUploadModalOpen,isVerificationModalOpen]);

  useEffect(() => {
    if (userData?.status === 0) {
      openVerificationModal();
      updateUserData();
    } else if (userData?.status === 1) {
      setIsVerificationModalOpen(false);
      setIsDocumentUploadModalOpen(true);
      console.log("Verified");
      updateUserData();
    } else if (userData?.status === 2) {
      setIsDocumentUploadModalOpen(false);
      console.log("Documents submitted");
      updateUserData();
    }
  }, [userData, isDocumentUploadModalOpen,isVerificationModalOpen]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-100">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <img
              src={dashboardImg}
              alt="Students"
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Progress Tracker</h2>
            <Stepper
              activeStep={(userData?.status ?? -1) + 1}
              orientation="vertical"
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>
                    <span
                      className={`text-sm ${
                        index === 0 ? "text-blue-500" : "text-gray-500"
                      }`}
                    >
                      {label}
                    </span>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
        </div>
      </div>
      <VerificationModal open={isVerificationModalOpen} />
      <DocumentUploadModal open={isDocumentUploadModalOpen} />
    </div>
  );
};

export default StudentDashboard;
