import React from "react";
import Settings from "@/components/seetings/Seetings";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function page() {
  return (
    <div className="px-6">
      <PageBreadcrumb pageTitle="Settings" />
      <Settings />
    </div>
  );
}