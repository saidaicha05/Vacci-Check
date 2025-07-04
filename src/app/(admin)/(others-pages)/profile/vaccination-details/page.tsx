import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import VaccinationDetails from "@/components/vaccination-details/VaccinationDetails";

export default function page() {
  return (
    <div className="px-6">
      <PageBreadcrumb pageTitle="Vaccination Details" />
      <VaccinationDetails />
    </div>
  );
}