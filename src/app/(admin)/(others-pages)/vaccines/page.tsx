import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import VaccinationHistory from "@/components/vaccines/VaccinationHistory";
import { Metadata } from "next";
import React from "react";

export default function page() {
  return (
    <div className="px-6">
      <PageBreadcrumb pageTitle="Vaccines History" />
      <VaccinationHistory />
    </div>
  );
}
