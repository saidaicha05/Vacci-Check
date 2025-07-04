import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import HospitalLocatorSafe from "@/components/health-centers/HospitalSafe";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Health Centers",
  description:
    "",
  // other metadata
};
export default function page() {
  return (
    <div className="px-6">
      <PageBreadcrumb pageTitle="Health Centers" />
      <HospitalLocatorSafe />
    </div>
  );
}
