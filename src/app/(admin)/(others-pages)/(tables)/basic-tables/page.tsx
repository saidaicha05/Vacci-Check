import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Basic Table",
  description:
    "",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Basic Table1" />
      <div className="space-y-6">
        <ComponentCard title="tableau de base2 1">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  );
}
