import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface AffectedCompany {
  uuid: string;
  name: string;
}

interface Notification {
  id: string;
  type: string;
  category: string;
  title: string;
  description: string;
  source: string;
  sourceType: "internal" | "external";
  date: string;
  isNew: boolean;
  isRead: boolean;
  affectedCompanies: AffectedCompany[];
  tags: string[];
  impact: "positive" | "negative" | "neutral";
}

interface NotificationsData {
  notifications: Notification[];
  metadata: {
    totalCount: number;
    unreadCount: number;
    categories: string[];
    impactLevels: string[];
    lastUpdated: string;
  };
}

export async function GET() {
  try {
    // Path to the notifications.json file
    const filePath = path.join(process.cwd(), "data", "notifications.json");

    // Read the current data
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data: NotificationsData = JSON.parse(fileContent);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading notifications data:", error);
    return NextResponse.json(
      { error: "Failed to load notifications data" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { notificationId, isRead } = await request.json();

    // Path to the notifications.json file
    const filePath = path.join(process.cwd(), "data", "notifications.json");

    // Read current data
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data: NotificationsData = JSON.parse(fileContent);

    // Find and update the notification
    const notificationIndex = data.notifications.findIndex(
      (notification) => notification.id === notificationId
    );

    if (notificationIndex === -1) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }

    // Update the notification
    data.notifications[notificationIndex].isRead = isRead;
    data.notifications[notificationIndex].isNew = false; // Mark as not new when read

    // Update metadata
    data.metadata.unreadCount = data.notifications.filter(
      (n) => !n.isRead
    ).length;
    data.metadata.lastUpdated = new Date().toISOString();

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json(
      { error: "Failed to update notification" },
      { status: 500 }
    );
  }
}
