import { Stepper, Step, StepLabel } from "@mui/material";
import image from "../../../public/studentDashboard.png";
import Sidebar from "../../components/Dashboard/Sidebar";
import { useEffect, useState } from "react";
import VerificationModal from "./VerificationModal";
import DocumentUploadModal from "./DocumentUpload";
import { updateUserData } from "../../utils/helper";
import Header from "../../components/Dashboard/Header";
import {
  CheckCircle as CheckCircleIcon,
  Verified as VerifiedIcon,
  Description as DescriptionIcon,
  Autorenew as AutorenewIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Forward as ForwardIcon,
  AccountBalance as AccountBalanceIcon,
  ThumbUp as ThumbUpIcon,
  Payment as PaymentIcon,
} from "@mui/icons-material";

const stepIcons = [
  <CheckCircleIcon />,
  <VerifiedIcon />,
  <DescriptionIcon />,
  <AutorenewIcon />,
  <AssignmentTurnedInIcon />,
  <ForwardIcon />,
  <AccountBalanceIcon />,
  <ThumbUpIcon />,
  <PaymentIcon />,
];

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
  }, [isDocumentUploadModalOpen, isVerificationModalOpen]);

  useEffect(() => {
    if (userData?.data?.status === 0) {
      openVerificationModal();
      updateUserData();
    } else if (userData?.data?.status === 1) {
      setIsVerificationModalOpen(false);
      setIsDocumentUploadModalOpen(true);
      console.log("Verified");
      updateUserData();
    } else if (userData?.data?.status === 2) {
      setIsDocumentUploadModalOpen(false);
      console.log("Documents submitted");
      updateUserData();
    }
  }, [userData, isDocumentUploadModalOpen, isVerificationModalOpen]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-100">
        <Header title="Student Dashboard" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <img
              src={image}
              alt="Students"
              className="rounded-lg shadow-md transition-transform transform hover:scale-105"
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold mb-4">Progress Tracker</h2>
            <Stepper
              activeStep={(userData?.data?.status ?? -1) + 1}
              orientation="vertical"
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel icon={stepIcons[index]}>
                    <span
                      className={`text-md ${
                        index < (userData?.data?.status ?? -1) + 1
                          ? "text-green-500"
                          : index === (userData?.data?.status ?? -1) + 1
                          ? "text-blue-500"
                          : "text-gray-500"
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
