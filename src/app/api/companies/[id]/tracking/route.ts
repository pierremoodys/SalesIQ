import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface CompanyTag {
  type: string;
  label: string;
  value: string;
  icon: string;
}

interface Company {
  id: string;
  name: string;
  description: string;
  logoUrl?: string;
  tracked: boolean;
  tags: CompanyTag[];
}

interface CompaniesData {
  companies: Company[];
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { tracked } = await request.json();
    const resolvedParams = await params;
    const companyId = resolvedParams.id;

    // Path to the companies.json file
    const filePath = path.join(process.cwd(), "data", "companies.json");

    // Read the current data
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data: CompaniesData = JSON.parse(fileContent);

    // Find and update the company
    const companyIndex = data.companies.findIndex(
      (company) => company.id === companyId
    );

    if (companyIndex === -1) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // Update the tracked status
    data.companies[companyIndex].tracked = tracked;

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      company: data.companies[companyIndex],
    });
  } catch (error) {
    console.error("Error updating company tracking:", error);
    return NextResponse.json(
      { error: "Failed to update company tracking" },
      { status: 500 }
    );
  }
}
