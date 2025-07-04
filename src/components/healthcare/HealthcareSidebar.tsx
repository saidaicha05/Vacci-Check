'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Syringe, 
  Package, 
  AlertTriangle, 
  Calendar,
  FileText,
  RefreshCw,
  User,
  ChevronDown,
  ChevronRight,
  Search,
  History,
  QrCode,
  ShoppingCart,
  Bell,
  Activity,
  Settings,
  LogOut
} from 'lucide-react';

interface MenuItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  submenu?: { label: string; href: string; icon?: React.ComponentType<{ className?: string }> }[];
}

const healthcareMenuItems: MenuItem[] = [
  {
    label: "Tableau de bord",
    href: "/healthcare/dashboard",
    icon: LayoutDashboard
  },
  {
    label: "Patients",
    href: "/healthcare/patients",
    icon: Users,
    submenu: [
      { label: "Rechercher", href: "/healthcare/patients/search", icon: Search },
      { label: "Historique", href: "/healthcare/patients/history", icon: History }
    ]
  },
  {
    label: "Vaccinations",
    href: "/healthcare/vaccines",
    icon: Syringe,
    submenu: [
      { label: "Enregistrer", href: "/healthcare/vaccines/register", icon: Activity },
      { label: "Scanner QR", href: "/healthcare/vaccines/qr-scan", icon: QrCode },
      { label: "Historique", href: "/healthcare/vaccines/history", icon: History }
    ]
  },
  {
    label: "Inventaire",
    href: "/healthcare/inventory",
    icon: Package,
    submenu: [
      { label: "Stocks", href: "/healthcare/inventory/stocks", icon: Package },
      { label: "Commandes", href: "/healthcare/inventory/orders", icon: ShoppingCart },
      { label: "Alertes", href: "/healthcare/inventory/alerts", icon: Bell }
    ]
  },
  {
    label: "Effets secondaires",
    href: "/healthcare/adverse-events",
    icon: AlertTriangle
  },
  {
    label: "Calendrier",
    href: "/healthcare/calendar",
    icon: Calendar
  },
  {
    label: "Rapports",
    href: "/healthcare/reports",
    icon: FileText
  },
  {
    label: "Synchronisation",
    href: "/healthcare/sync",
    icon: RefreshCw
  }
];

export default function HealthcareSidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isMenuOpen = (label: string) => openMenus.includes(label);

  const isActiveRoute = (href: string) => {
    if (href === '/healthcare/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const hasActiveSubmenu = (submenu?: MenuItem['submenu']) => {
    if (!submenu) return false;
    return submenu.some(item => pathname.startsWith(item.href));
  };

  return (
    <div className={`bg-blue-900 text-white transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } min-h-screen flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-blue-800">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold">VaccinCam Pro</h1>
              <p className="text-blue-200 text-sm">Professionnel de santé</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
          >
            <ChevronRight className={`w-5 h-5 transition-transform ${
              isCollapsed ? 'rotate-0' : 'rotate-180'
            }`} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-2 px-2">
          {healthcareMenuItems.map((item) => (
            <li key={item.label}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      hasActiveSubmenu(item.submenu)
                        ? 'bg-blue-800 text-white'
                        : 'hover:bg-blue-800 text-blue-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </div>
                    {!isCollapsed && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        isMenuOpen(item.label) ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>
                  
                  {isMenuOpen(item.label) && !isCollapsed && (
                    <ul className="ml-6 mt-2 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.href}>
                          <Link
                            href={subItem.href}
                            className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                              isActiveRoute(subItem.href)
                                ? 'bg-blue-700 text-white'
                                : 'hover:bg-blue-800 text-blue-200'
                            }`}
                          >
                            {subItem.icon && <subItem.icon className="w-4 h-4" />}
                            <span className="text-sm">{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActiveRoute(item.href)
                      ? 'bg-blue-800 text-white'
                      : 'hover:bg-blue-800 text-blue-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer - User Actions */}
      <div className="border-t border-blue-800 p-2">
        <div className="space-y-2">
          <Link
            href="/healthcare/profile"
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActiveRoute('/healthcare/profile')
                ? 'bg-blue-800 text-white'
                : 'hover:bg-blue-800 text-blue-100'
            }`}
          >
            <User className="w-5 h-5" />
            {!isCollapsed && <span>Profil</span>}
          </Link>
          
          <Link
            href="/healthcare/settings"
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActiveRoute('/healthcare/settings')
                ? 'bg-blue-800 text-white'
                : 'hover:bg-blue-800 text-blue-100'
            }`}
          >
            <Settings className="w-5 h-5" />
            {!isCollapsed && <span>Paramètres</span>}
          </Link>
          
          <button
            onClick={() => {
              // Logique de déconnexion
              console.log('Déconnexion');
            }}
            className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-red-700 text-blue-100"
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </div>
    </div>
  );
}