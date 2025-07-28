import { NextResponse } from "next/server";
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

export async function GET() {
  try {
    // Path to the companies.json file
    const filePath = path.join(process.cwd(), "data", "companies.json");

    // Read the current data
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data: CompaniesData = JSON.parse(fileContent);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading companies data:", error);
    return NextResponse.json(
      { error: "Failed to load companies data" },
      { status: 500 }
    );
  }
}
