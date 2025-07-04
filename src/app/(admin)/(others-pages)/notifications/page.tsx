import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import NotificationsPage from "@/components/notifications/Notifications";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Notifications",
  description:
    "",
  // other metadata
};
export default function page() {
  return (
    <div className="px-6">
      <PageBreadcrumb pageTitle="Notifications" />
      <NotificationsPage />
    </div>
  );
}
