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

// Company API functions
export async function updateCompanyTracking(
  companyId: string,
  isTracked: boolean
): Promise<void> {
  const response = await fetch(`/api/companies/${companyId}/tracking`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tracked: isTracked }),
  });

  if (!response.ok) {
    throw new Error("Failed to update company tracking");
  }
}

// Notification API functions
export async function updateNotificationReadStatus(
  notificationId: string,
  isRead: boolean
): Promise<void> {
  const response = await fetch("/api/notifications", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ notificationId, isRead }),
  });

  if (!response.ok) {
    throw new Error("Failed to update notification read status");
  }
}
