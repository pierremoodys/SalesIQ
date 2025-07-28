import React from "react";

export default function NotificationsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-medium mb-4">Notifications</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          {/* Placeholder notifications */}
          <div className="border-b pb-4">
            <h3 className="font-medium">New Company Update</h3>
            <p className="text-gray-600">
              There are new updates for Company XYZ
            </p>
            <span className="text-sm text-gray-400">2 hours ago</span>
          </div>
          <div className="border-b pb-4">
            <h3 className="font-medium">Document Ready</h3>
            <p className="text-gray-600">
              Your requested document is ready for review
            </p>
            <span className="text-sm text-gray-400">5 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
