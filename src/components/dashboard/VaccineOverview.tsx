import React from 'react';
import { Calendar, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface VaccineOverviewProps {
  language: 'en' | 'fr';
}

export const VaccineOverview: React.FC<VaccineOverviewProps> = ({ language }) => {
  const translations = {
    en: {
      title: "Vaccine Overview",
      upcomingReminders: "Upcoming Reminders",
      nextVaccine: "Next Vaccine",
      status: "Status",
      pending: "Pending",
      upToDate: "Up to Date",
      overdue: "Overdue",
      noReminders: "No upcoming reminders",
      daysLeft: "days left"
    },
    fr: {
      title: "Aperçu des Vaccins",
      upcomingReminders: "Rappels à Venir",
      nextVaccine: "Prochain Vaccin",
      status: "Statut",
      pending: "En attente",
      upToDate: "À jour",
      overdue: "En retard",
      noReminders: "Aucun rappel à venir",
      daysLeft: "jours restants"
    }
  };

  const t = translations[language];

  const upcomingVaccines = [
    {
      name: "Polio",
      date: "2025-06-25",
      person: "John Doe",
      status: "pending",
      daysUntil: 4
    },
    {
      name: "COVID-19 Booster",
      date: "2025-07-15",
      person: "Jane Doe",
      status: "pending",
      daysUntil: 24
    },
    {
      name: "Hepatitis B",
      date: "2025-08-10",
      person: "Michael Doe",
      status: "upToDate",
      daysUntil: 50
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'upToDate':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'upToDate':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'overdue':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return t.pending;
      case 'upToDate':
        return t.upToDate;
      case 'overdue':
        return t.overdue;
      default:
        return t.pending;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-brand-500/10 rounded-lg">
          <Calendar className="w-5 h-5 text-brand-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{t.title}</h2>
      </div>

      {upcomingVaccines.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {t.upcomingReminders}
          </h3>
          
          {upcomingVaccines.map((vaccine, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-gray-900">{vaccine.name}</h4>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(vaccine.status)}`}>
                    {getStatusIcon(vaccine.status)}
                    {getStatusText(vaccine.status)}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="mb-1">
                    <span className="font-medium">{t.nextVaccine}:</span> {vaccine.date}
                  </p>
                  <p>
                    <span className="font-medium">Patient:</span> {vaccine.person}
                  </p>
                </div>
              </div>
              
              <div className="text-right ml-4">
                <div className="text-lg font-semibold text-brand-500">
                  {vaccine.daysUntil}
                </div>
                <div className="text-xs text-gray-500">
                  {t.daysLeft}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="text-gray-600">{t.noReminders}</p>
        </div>
      )}
    </div>
  );
};