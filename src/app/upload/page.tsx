import React from 'react';

export default function UploadPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-medium mb-4">Upload Files</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-900">Drop files here or click to upload</p>
          <p className="mt-1 text-sm text-gray-500">
            Support for document files (.pdf, .doc, .docx)
          </p>
          <button
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0a1264] hover:bg-[#0a1264]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0a1264]"
          >
            Select Files
          </button>
        </div>
      </div>
    </div>
  );
} 