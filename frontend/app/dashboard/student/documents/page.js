'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Header from '@/components/Dashboard/Header';
import Sidebar from '@/components/Dashboard/Sidebar';
import DocumentCard from '@/components/Dashboard/DocumentCard';

const documents = [
  { id: 1, name: 'Passport' },
  { id: 2, name: 'Aadhaar Card' },
  { id: 3, name: 'Marksheet' },
];

const StudentDocument = () => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleView = (document) => {
    console.log('View document:', document);
  };

  const handleEdit = (document) => {
    console.log('Edit document:', document);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 p-10 bg-gray-100">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={{ ...doc, getRootProps, getInputProps }}
              onView={() => handleView(doc)}
              onEdit={() => handleEdit(doc)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDocument;