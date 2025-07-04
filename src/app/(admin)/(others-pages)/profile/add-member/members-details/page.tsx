import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FamilyMemberDetails from "@/components/famillydetails/FamilyMemberDetails";
import React from "react";

export default function FamilyMemberPage({ params }) {
  // Determine page title based on member ID
  const getPageTitle = () => {
    if (params?.id === "1") return "Jane Doe - Membre de la famille";
    if (params?.id === "2") return "Baby Doe - Membre de la famille";
    return "Détails du membre de la famille";
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6">
      <PageBreadcrumb pageTitle={getPageTitle()} />
      <FamilyMemberDetails params={params} />
    </div>
  );
}