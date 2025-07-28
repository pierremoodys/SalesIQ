export async function fetchCompanies() {
  try {
    const response = await fetch("/api/companies");

    if (!response.ok) {
      throw new Error("Failed to fetch companies");
    }

    const data = await response.json();
    return data.companies;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
}

export async function updateCompanyTracking(
  companyId: string,
  tracked: boolean
) {
  try {
    const response = await fetch(`/api/companies/${companyId}/tracking`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tracked }),
    });

    if (!response.ok) {
      throw new Error("Failed to update company tracking");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating company tracking:", error);
    throw error;
  }
}
