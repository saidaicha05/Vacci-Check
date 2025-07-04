// app/(healthcare)/dashboard/page.tsx
'use client';

import React from 'react';
import { 
  Users, 
  Syringe, 
  Package, 
  AlertTriangle,
  TrendingUp,
  Calendar,
  Clock,
  MapPin,
  Activity
} from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface RecentActivity {
  id: string;
  type: 'vaccination' | 'stock' | 'patient';
  description: string;
  time: string;
  status: 'completed' | 'pending' | 'alert';
}

interface UpcomingAppointment {
  id: string;
  patientName: string;
  vaccine: string;
  time: string;
  status: 'confirmed' | 'pending';
}

export default function HealthcareDashboard() {
  const stats: StatCard[] = [
    {
      title: "Patients vaccinés aujourd'hui",
      value: "24",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Vaccins administrés",
      value: "89",
      change: "+8%",
      changeType: "positive",
      icon: Syringe,
      color: "bg-green-500"
    },
    {
      title: "Stock total",
      value: "456",
      change: "-5%",
      changeType: "negative",
      icon: Package,
      color: "bg-orange-500"
    },
    {
      title: "Alertes actives",
      value: "3",
      change: "+2",
      changeType: "negative",
      icon: AlertTriangle,
      color: "bg-red-500"
    }
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      type: "vaccination",
      description: "Vaccination ROR - Marie Ngono",
      time: "Il y a 15 min",
      status: "completed"
    },
    {
      id: "2",
      type: "stock",
      description: "Stock vaccin Polio faible (8 doses)",
      time: "Il y a 30 min",
      status: "alert"
    },
    {
      id: "3",
      type: "patient",
      description: "Nouveau patient enregistré - Jean Mbarga",
      time: "Il y a 45 min",
      status: "completed"
    },
    {
      id: "4",
      type: "vaccination",
      description: "Rappel vaccin BCG - Fatima Ali",
      time: "Il y a 1h",
      status: "pending"
    }
  ];

  const upcomingAppointments: UpcomingAppointment[] = [
    {
      id: "1",
      patientName: "Paul Etame",
      vaccine: "Hépatite B",
      time: "14:30",
      status: "confirmed"
    },
    {
      id: "2",
      patientName: "Sylvie Moukoko",
      vaccine: "ROR",
      time: "15:15",
      status: "pending"
    },
    {
      id: "3",
      patientName: "Ibrahim Sanda",
      vaccine: "Polio",
      time: "16:00",
      status: "confirmed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'alert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-2">
          Vue d'ensemble de vos activités de vaccination
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`w-4 h-4 mr-1 ${
                    stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Activités récentes
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      {activity.type === 'vaccination' && <Syringe className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'stock' && <Package className="w-4 h-4 text-orange-600" />}
                      {activity.type === 'patient' && <Users className="w-4 h-4 text-green-600" />}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                    {activity.status === 'completed' && 'Terminé'}
                    {activity.status === 'pending' && 'En attente'}
                    {activity.status === 'alert' && 'Alerte'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Rendez-vous à venir
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {appointment.patientName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {appointment.vaccine}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {appointment.time}
                    </p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Syringe className="w-8 h-8 text-blue-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Enregistrer une vaccination</p>
              <p className="text-sm text-gray-500">Nouveau vaccin administré</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="w-8 h-8 text-green-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Rechercher un patient</p>
              <p className="text-sm text-gray-500">Consulter un dossier</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Package className="w-8 h-8 text-orange-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Gérer les stocks</p>
              <p className="text-sm text-gray-500">Inventaire des vaccins</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
