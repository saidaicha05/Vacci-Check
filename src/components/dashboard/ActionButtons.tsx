import React from 'react';
import { Syringe, Bell, MapPin, Calendar, FileText, Settings } from 'lucide-react';

interface ActionButtonsProps {
  language: 'en' | 'fr';
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ language }) => {
  const translations = {
    en: {
      title: "Quick Actions",
      vaccines: "Vaccines",
      vaccinesDesc: "Manage vaccination records",
      reminders: "Reminders",
      remindersDesc: "Set up vaccination alerts",
      healthCenters: "Health Centers",
      healthCentersDesc: "Find nearby clinics",
      schedule: "Schedule",
      scheduleDesc: "Book appointments",
      reports: "Reports",
      reportsDesc: "View vaccination history",
      settings: "Settings",
      settingsDesc: "Account preferences"
    },
    fr: {
      title: "Actions Rapides",
      vaccines: "Vaccins",
      vaccinesDesc: "Gérer les dossiers de vaccination",
      reminders: "Rappels",
      remindersDesc: "Configurer les alertes de vaccination",
      healthCenters: "Centres de Santé",
      healthCentersDesc: "Trouver des cliniques près de chez vous",
      schedule: "Planifier",
      scheduleDesc: "Prendre rendez-vous",
      reports: "Rapports",
      reportsDesc: "Voir l'historique des vaccinations",
      settings: "Paramètres",
      settingsDesc: "Préférences du compte"
    }
  };

  const t = translations[language];

  const actionItems = [
    {
      key: 'vaccines',
      title: t.vaccines,
      description: t.vaccinesDesc,
      icon: Syringe,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      link: '/vaccines'
    },
    {
      key: 'reminders',
      title: t.reminders,
      description: t.remindersDesc,
      icon: Bell,
      color: 'from-amber-500 to-amber-600',
      hoverColor: 'hover:from-amber-600 hover:to-amber-700',
      link: '/reminders'
    },
    {
      key: 'healthCenters',
      title: t.healthCenters,
      description: t.healthCentersDesc,
      icon: MapPin,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      link: '/health-centers'
    },
    {
      key: 'schedule',
      title: t.schedule,
      description: t.scheduleDesc,
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
      link: '/schedule'
    },
    {
      key: 'reports',
      title: t.reports,
      description: t.reportsDesc,
      icon: FileText,
      color: 'from-indigo-500 to-indigo-600',
      hoverColor: 'hover:from-indigo-600 hover:to-indigo-700',
      link: '/reports'
    },
    {
      key: 'settings',
      title: t.settings,
      description: t.settingsDesc,
      icon: Settings,
      color: 'from-gray-500 to-gray-600',
      hoverColor: 'hover:from-gray-600 hover:to-gray-700',
      link: '/settings'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">{t.title}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actionItems.map((item) => {
          const IconComponent = item.icon;
          
          return (
            <a
              key={item.key}
              href={item.link}
              className={`group relative overflow-hidden bg-gradient-to-br ${item.color} ${item.hoverColor} rounded-xl p-6 text-white transition-all duration-300 hover:shadow-lg hover:scale-105 transform`}
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                </div>
                
                <p className="text-white/90 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              {/* Decorative background element */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-colors"></div>
              <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/5 rounded-full blur-lg"></div>
            </a>
          );
        })}
      </div>
    </div>
  );
};