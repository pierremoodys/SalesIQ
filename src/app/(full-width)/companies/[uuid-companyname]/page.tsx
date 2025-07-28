import React from "react";

interface CompanyPageProps {
  params: {
    "uuid-companyname": string;
  };
}

export default function CompanyPage({ params }: CompanyPageProps) {
  // Parse UUID and company name from the combined parameter
  const parseCompanyParam = (param: string) => {
    // Split by the first hyphen after the UUID pattern
    // UUID format: c-550e8400-e29b-41d4-a716-446655440001
    const match = param.match(/^(c-[a-f0-9-]+)-(.+)$/);

    if (match) {
      return {
        uuid: match[1],
        companyName: match[2]
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
      };
    }

    // Fallback if parsing fails
    return {
      uuid: null,
      companyName: param
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
    };
  };

  const { uuid, companyName } = parseCompanyParam(params["uuid-companyname"]);

  return (
    <div className="">
      <h1 className="text-2xl font-medium mb-4">Company: {companyName}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {/* Company details will go here */}
        <p className="mb-4">
          Detailed information about {companyName} will be displayed here.
        </p>

        {uuid && (
          <div className="text-sm text-gray-500">
            <strong>UUID:</strong> {uuid}
          </div>
        )}
      </div>
    </div>
  );
}
