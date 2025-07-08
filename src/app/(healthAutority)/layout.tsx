"use client";
import HealthAuthoritySidebar from "@/components/healthAutority/HealthAuthoritySidebar";
import HealthcareHeader from "@/components/healthcare/HealthcareHeader";
import HealthcareSidebar from "@/components/healthcare/HealthcareSidebar";
import { SidebarProvider, useSidebar } from "@/context/SidebarContextPro";
import Backdrop from "@/layout/Backdrop";
import React, { ReactNode } from "react";

interface HealthcareLayoutProps {
  children: ReactNode;
}

// Composant interne qui utilise le hook
const HealthcareLayoutContent: React.FC<HealthcareLayoutProps> = ({ children }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  
  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <HealthAuthoritySidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        {/* Header */}
        <HealthcareHeader />
        {/* Page Content */}
        <div className=" mx-auto max-w-[--breakpoint-2xl] md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Composant principal qui fournit le contexte
const HealthcareLayout: React.FC<HealthcareLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <HealthcareLayoutContent>
        {children}
      </HealthcareLayoutContent>
    </SidebarProvider>
  );
};

export default HealthcareLayout;