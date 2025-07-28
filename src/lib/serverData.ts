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
  uuid: string;
  name: string;
  description: string;
  logoUrl?: string;
  tracked: boolean;
  tags: CompanyTag[];
}

interface CompaniesData {
  companies: Company[];
}

export async function getCompaniesFromFile(): Promise<Company[]> {
  try {
    const filePath = path.join(process.cwd(), "data", "companies.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data: CompaniesData = JSON.parse(fileContent);
    return data.companies;
  } catch (error) {
    console.error("Error reading companies from file:", error);
    throw error;
  }
}
