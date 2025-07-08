"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  AlertTriangle,
  Package,
  BarChart3,
  Database,
  MapPin,
  Settings,
  ChevronDown,
  Shield,
  UserCheck,
  ClipboardList,
  Bell,
  TrendingUp,
  FileCheck,
  Eye,
  Gavel,
  Calendar,
  Globe,
} from "lucide-react";
import { useSidebar } from "@/context/SidebarContextPro";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; new?: boolean }[];
};

const HealthAuthoritySidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const navItems: NavItem[] = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      name: "Dashboard",
      path: "/dashboard-authority",
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      name: "Établissements",
      subItems: [
        { name: "Tous les établissements", path: "/establishments" },
        { name: "Demandes d'agrément", path: "/establishments/applications", new: true },
        { name: "Inspections", path: "/establishments/inspections" },
        { name: "Licences", path: "/establishments/licenses" },
      ],
    },
    {
      icon: <UserCheck className="w-5 h-5" />,
      name: "Professionnels",
      subItems: [
        { name: "Annuaire", path: "/professionals" },
        { name: "Certifications", path: "/professionals/certifications" },
        { name: "Formations", path: "/professionals/training" },
      ],
    },
    {
      icon: <Package className="w-5 h-5" />,
      name: "Vaccins",
      subItems: [
        { name: "Homologation", path: "/vaccines/approval" },
        { name: "Distribution", path: "/vaccines/distribution" },
        { name: "Traçabilité", path: "/vaccines/tracking" },
        { name: "Rappels", path: "/vaccines/recalls" },
      ],
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      name: "Pharmacovigilance",
      subItems: [
        { name: "Événements signalés", path: "/adverse-events" },
        { name: "Analyses", path: "/adverse-events/analysis" },
        { name: "Alertes", path: "/adverse-events/alerts" },
      ],
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      name: "Surveillance Épidémiologique",
      subItems: [
        { name: "Couverture vaccinale", path: "/surveillance/coverage" },
        { name: "Maladies évitables", path: "/surveillance/diseases" },
        { name: "Épidémies", path: "/surveillance/outbreaks" },
      ],
    },
    {
      icon: <FileText className="w-5 h-5" />,
      name: "Rapports",
      subItems: [
        { name: "Rapports officiels", path: "/reports/official" },
        { name: "Statistiques", path: "/reports/statistics" },
        { name: "Données publiques", path: "/reports/public-data" },
      ],
    },
    {
      icon: <Gavel className="w-5 h-5" />,
      name: "Conformité",
      subItems: [
        { name: "Audits", path: "/compliance/audits" },
        { name: "Sanctions", path: "/compliance/sanctions" },
        { name: "Réglementation", path: "/compliance/regulations" },
      ],
    },
  ];

  const othersItems: NavItem[] = [
    {
      icon: <Bell className="w-5 h-5" />,
      name: "Notifications",
      path: "/notifications",
    },
    {
      icon: <Database className="w-5 h-5" />,
      name: "Intégration",
      subItems: [
        { name: "API", path: "/integration/api" },
        { name: "Synchronisation", path: "/integration/sync" },
        { name: "Exports", path: "/integration/exports" },
      ],
    },
    {
      icon: <Settings className="w-5 h-5" />,
      name: "Administration",
      subItems: [
        { name: "Utilisateurs", path: "/admin/users" },
        { name: "Permissions", path: "/admin/permissions" },
        { name: "Configuration", path: "/admin/config" },
        { name: "Logs système", path: "/admin/logs" },
      ],
    },
  ];

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={index}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group w-full ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text flex-1 text-left">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-blue-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      {subItem.new && (
                        <span
                          className={`ml-auto ${
                            isActive(subItem.path)
                              ? "menu-dropdown-badge-active"
                              : "menu-dropdown-badge-inactive"
                          } menu-dropdown-badge`}
                        >
                          new
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Section - Hidden on mobile */}
      {!isMobileOpen && (
        <div
          className={`py-4 flex ${
            !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
          }`}
        >
          <Link href="/" className="flex items-center gap-3">
            {isExpanded || isHovered ? (
              <>
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Santé<span className="text-emerald-500">Gov</span>
                </h1>
              </>
            ) : (
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
            )}
          </Link>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-3 flex flex-col flex-1 overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="flex-1 space-y-6">
          {/* Main Section */}
          <div>
            <div className="mb-4">
              {(isExpanded || isHovered || isMobileOpen) && (
                <h3 className="text-xs font-light text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3">
                  Principal
                </h3>
              )}
            </div>
            {renderMenuItems(navItems, "main")}
          </div>

          {/* Others Section */}
          <div>
            <div className="mb-4">
              {(isExpanded || isHovered || isMobileOpen) && (
                <h3 className="text-xs font-light text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3">
                  Outils
                </h3>
              )}
            </div>
            {renderMenuItems(othersItems, "others")}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default HealthAuthoritySidebar;