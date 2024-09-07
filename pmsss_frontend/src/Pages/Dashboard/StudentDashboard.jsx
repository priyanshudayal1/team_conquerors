import { Stepper, Step, StepLabel } from '@mui/material';
import dashboardImg from '../../../public/dashboardImg.jpg';
import Header from '../../components/Dashboard/Header';
import Sidebar from '../../components/Dashboard/Sidebar';

const steps = [
    'Registration',
    'Documents Submitted',
    'Automatic Verification',
    'Final Verification',
    'Forwarded to SAG Bureau',
    'Forwarded to Financial Bureau',
    'Scholarship Approval',
    'Disbursed',
];

const StudentDashboard = () => {
    

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Sidebar />
            <div className="flex-1 p-10 bg-gray-100">
                <Header/>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="flex justify-center">
                        <img
                            src={dashboardImg}
                            alt="Students"
                            className="rounded-lg shadow-md"
                        />
                    </div>

                    {/* Progress Tracker */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Progress Tracker</h2>
                        <Stepper activeStep={0} orientation="vertical">
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel>
                                        <span className={`text-sm ${index === 0 ? 'text-blue-500' : 'text-gray-500'}`}>
                                            {label}
                                        </span>
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
