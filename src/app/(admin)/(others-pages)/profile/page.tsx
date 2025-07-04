import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Profile from "@/components/profile/Profile";

export default function page() {
  return (
    <div className="px-6">
      <PageBreadcrumb pageTitle="Profile" />
      <Profile />
    </div>
  );
}