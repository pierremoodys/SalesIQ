import { useQuery } from "@tanstack/react-query";
import type { Notification } from "@/components/ui";

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

interface NotificationsFilters {
  category?: string;
  isRead?: boolean;
  sourceType?: "internal" | "external";
  impactLevel?: string;
}

// Fetch all notifications
async function fetchNotifications(): Promise<NotificationsData> {
  const response = await fetch("/api/notifications");
  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }
  return response.json();
}

// Hook for getting all notifications
export function useNotifications(filters?: NotificationsFilters) {
  return useQuery({
    queryKey: ["notifications", filters],
    queryFn: fetchNotifications,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data) => {
      if (!filters) return data;

      let filteredNotifications = data.notifications;

      // Filter by category
      if (filters.category) {
        filteredNotifications = filteredNotifications.filter(
          (notification) => notification.category === filters.category
        );
      }

      // Filter by read status
      if (filters.isRead !== undefined) {
        filteredNotifications = filteredNotifications.filter(
          (notification) => notification.isRead === filters.isRead
        );
      }

      // Filter by source type
      if (filters.sourceType) {
        filteredNotifications = filteredNotifications.filter(
          (notification) => notification.sourceType === filters.sourceType
        );
      }

      // Filter by impact level
      if (filters.impactLevel) {
        filteredNotifications = filteredNotifications.filter(
          (notification) => notification.type === filters.impactLevel
        );
      }

      return {
        ...data,
        notifications: filteredNotifications,
        metadata: {
          ...data.metadata,
          totalCount: filteredNotifications.length,
          unreadCount: filteredNotifications.filter((n) => !n.isRead).length,
        },
      };
    },
  });
}

// Hook for getting a single notification by ID
export function useNotification(id: string) {
  return useQuery({
    queryKey: ["notification", id],
    queryFn: fetchNotifications,
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    select: (data) => {
      const notification = data.notifications.find((n) => n.id === id);
      if (!notification) {
        throw new Error(`Notification with ID ${id} not found`);
      }
      return notification;
    },
  });
}
