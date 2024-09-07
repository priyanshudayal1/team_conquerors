import React from 'react'
import Header from '@/components/Dashboard/Header'
import Sidebar from '@/components/Dashboard/Sidebar'
const StudentProfile = () => {
    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Sidebar />
            <div className="flex-1 p-10 bg-gray-100">
                <Header />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


                </div>
            </div>
        </div>
    )
}

export default StudentProfile
