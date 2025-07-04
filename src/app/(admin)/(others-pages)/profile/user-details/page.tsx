import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import UserDetails from "@/components/user details/UserDetails";

export default function page() {
  return (
    <div className="px-6">
      <PageBreadcrumb pageTitle="User Details" />
      <UserDetails />
    </div>
  );
}