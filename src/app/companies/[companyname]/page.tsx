import React from 'react';

interface CompanyPageProps {
  params: {
    companyname: string;
  };
}

export default function CompanyPage({ params }: CompanyPageProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-medium mb-4">Company: {params.companyname}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {/* Company details will go here */}
        <p>Detailed information about {params.companyname} will be displayed here.</p>
      </div>
    </div>
  );
} 