"use client"
import React, { useState } from 'react';
import { 
  Syringe, Package, AlertTriangle, Users,
  QrCode, Smartphone, MessageSquare,
  Database, WifiOff, RefreshCw, Search,
  Plus, Eye, Bell, MapPin, Calendar,
  Activity, Clock, CheckCircle
} from 'lucide-react';

const HealthWorkerDashboard = () => {
  const [isOffline] = useState(false);
  const [activeTab, setActiveTab] = useState('vaccinations');
  
  // Données mock alignées sur le cahier des charges
  const todayVaccinations = [
    {
      id: "CM001234",
      name: "Marie Ngono",
      vaccine: "ROR",
      method: "qr",
      time: "10:30",
      location: "Centre de Douala",
      status: "completed"
    },
    {
      id: "CM001235",
      name: "Jean Mbarga",
      vaccine: "Polio",
      method: "manual",
      time: "11:15",
      status: "pending"
    },
    {
      id: "CM001236",
      name: "Sophie Biya",
      vaccine: "Hépatite B",
      method: "qr",
      time: "14:00",
      status: "scheduled"
    }
  ];

  const vaccineStock = [
    { name: "Polio", stock: 8, threshold: 20, status: "critical" },
    { name: "ROR", stock: 45, threshold: 60, status: "normal" },
    { name: "Hépatite B", stock: 10, threshold: 15, status: "normal" },
    { name: "BCG", stock: 12, threshold: 25, status: "low" }
  ];

  const quickActions = [
    { icon: QrCode, label: "Scanner QR", color: "bg-blue-500" },
    { icon: Plus, label: "Nouvelle entrée", color: "bg-green-500" },
    { icon: Search, label: "Rechercher", color: "bg-purple-500" },
    { icon: AlertTriangle, label: "Signaler effet", color: "bg-red-500" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'scheduled':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'scheduled':
        return <Calendar size={16} className="text-blue-500" />;
      default:
        return <Activity size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header avec message de bienvenue */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Bonjour, Dr. Kameni 👋
              </h1>
              <p className="text-gray-600 text-lg mb-1">
                Bienvenue sur votre tableau de bord vaccinal
              </p>
              <p className="text-sm text-gray-500">
                Centre de Santé de Douala • {new Date().toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                {isOffline ? (
                  <div className="flex items-center gap-2 text-red-600">
                    <WifiOff size={16} />
                    <span>Hors ligne</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <Database size={16} />
                    <span>Connecté</span>
                  </div>
                )}
              </div>
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                <RefreshCw size={16} />
                <span>Synchroniser</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Syringe className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">23</p>
                <p className="text-sm text-gray-600">Vaccinations aujourd'hui</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-600">Patients ce mois</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Bell className="text-yellow-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-sm text-gray-600">Rappels cette semaine</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="text-red-600" size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">2</p>
                <p className="text-sm text-gray-600">Alertes stock</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section principale avec layout en grille */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Colonne 1: Vaccinations du jour */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-900 mb-6">
                <Syringe size={20} />
                Vaccinations programmées aujourd'hui
              </h2>
              
              {/* Tableau des vaccinations */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-medium text-gray-700">Patient</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-700">Vaccin</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-700">Heure</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-700">Statut</th>
                      <th className="text-left py-3 px-2 font-medium text-gray-700">Méthode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayVaccinations.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2">
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.id}</p>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <span className="font-medium text-blue-600">{item.vaccine}</span>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-gray-700">{item.time}</span>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(item.status)}
                            <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(item.status)}`}>
                              {item.status === 'completed' ? 'Terminé' : 
                               item.status === 'pending' ? 'En cours' : 'Programmé'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          {item.method === 'qr' ? (
                            <div className="flex items-center gap-1">
                              <QrCode size={14} className="text-blue-500" />
                              <span className="text-xs text-gray-600">QR Code</span>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-600">Manuel</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Graphique des stocks */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-900 mb-6">
                <Package size={20} />
                Niveaux de stock vaccinaux
              </h2>
              
              <div className="space-y-4">
                {vaccineStock.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          item.status === 'critical' ? 'bg-red-100 text-red-800' : 
                          item.status === 'low' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.status === 'critical' ? 'CRITIQUE' : 
                           item.status === 'low' ? 'FAIBLE' : 'NORMAL'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-lg">{item.stock}</span>
                        <span className="text-sm text-gray-500">/{item.threshold} doses</span>
                      </div>
                    </div>
                    
                    {/* Barre de progression horizontale */}
                    <div className="relative w-full bg-gray-200 rounded-full h-4">
                      <div 
                        className={`h-4 rounded-full transition-all duration-300 ${
                          item.status === 'critical' ? 'bg-gradient-to-r from-red-500 to-red-400' : 
                          item.status === 'low' ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' : 
                          'bg-gradient-to-r from-green-500 to-green-400'
                        }`}
                        style={{ width: `${Math.max((item.stock / item.threshold) * 100, 8)}%` }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-700">
                          {Math.round((item.stock / item.threshold) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne 2: Sidebar avec alertes et suivi */}
          <div className="space-y-6">
            
            {/* Alertes prioritaires */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-900 mb-4">
                <AlertTriangle size={20} />
                Alertes prioritaires
              </h2>
              
              <div className="space-y-3">
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-red-600 mt-1 flex-shrink-0" size={16} />
                    <div>
                      <p className="font-medium text-red-900 text-sm">Stock Polio critique</p>
                      <p className="text-xs text-red-700 mt-1">8 doses restantes</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <Clock className="text-yellow-600 mt-1 flex-shrink-0" size={16} />
                    <div>
                      <p className="font-medium text-yellow-900 text-sm">Stock BCG faible</p>
                      <p className="text-xs text-yellow-700 mt-1">12 doses restantes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Suivi des patients */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-900 mb-4">
                <Users size={20} />
                Suivi patients
              </h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Bell size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-900 text-sm">5 rappels cette semaine</p>
                      <p className="text-xs text-blue-700 mt-1">
                        Prochain: Jean Mbarga (15 juillet)
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-900 text-sm">Taux de couverture</p>
                      <p className="text-xs text-green-700 mt-1">94% ce mois</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activité récente */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-900 mb-4">
                <Activity size={20} />
                Activité récente
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Vaccination ROR</p>
                    <p className="text-xs text-gray-500">Marie Ngono - 10:30</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Nouveau patient</p>
                    <p className="text-xs text-gray-500">Sophie Biya - 09:45</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Stock mis à jour</p>
                    <p className="text-xs text-gray-500">BCG - 08:30</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthWorkerDashboard;