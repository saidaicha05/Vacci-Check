"use client";

import React, { useState } from 'react';
import { 
  Search, Plus, Filter, Calendar, Phone, MapPin, Clock,
  AlertTriangle, CheckCircle, Eye, Syringe, MessageSquare,
  QrCode, User, Download, RotateCcw, Bell, Target, Users,
  Activity, TrendingUp, UserPlus, Send, Wifi, WifiOff
} from 'lucide-react';

export default function HealthProfessionalDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [activeTab, setActiveTab] = useState('patients');
  const [showQRModal, setShowQRModal] = useState(false);
  const [showNewPatientForm, setShowNewPatientForm] = useState(false);

  // Données simulées
  const patients = [
    {
      id: "1",
      name: "Marie Ngono",
      age: 2,
      phone: "+237 690 123 456",
      location: "Douala, Bassa",
      status: "up-to-date",
      nextVaccine: "MMR - Mar 15, 2025",
      lastVisit: "2 days ago",
      guardian: "Sylvie Ngono"
    },
    // ... autres patients
  ];

  const urgentVaccinations = [
    { id: "1", patient: "Fatima Ali", vaccine: "Polio", daysOverdue: 45 },
    // ... autres vaccinations urgentes
  ];

  const campaigns = [
    { id: "1", name: "Polio Drive", progress: 85 },
    // ... autres campagnes
  ];

  const stats = [
    { title: "Patients enregistrés", value: "1,247", change: "+23", icon: Users },
    { title: "Vaccins à jour", value: "1,089", change: "+5.2%", icon: CheckCircle },
    { title: "Vaccins en retard", value: "84", change: "-12", icon: AlertTriangle },
    { title: "Nouveaux patients", value: "156", change: "+18%", icon: UserPlus }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'patients':
        return (
          <div className="space-y-4">
            {/* Barre de recherche et filtres */}
            <div className="flex flex-col md:flex-row gap-3 p-4 bg-white rounded-lg shadow">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un patient..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <select 
                  className="px-3 py-2 border rounded-lg"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">Tous les patients</option>
                  <option value="up-to-date">À jour</option>
                  <option value="due">En retard</option>
                </select>
                <button 
                  className="px-3 py-2 border rounded-lg flex items-center gap-2"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                  <Filter size={16} /> Filtres
                </button>
              </div>
            </div>

            {/* Liste des patients */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {patients.map(patient => (
                <div key={patient.id} className="p-4 border-b hover:bg-gray-50">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <User className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{patient.name}</h3>
                          <p className="text-sm text-gray-500">{patient.age} ans • {patient.location}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          patient.status === 'up-to-date' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {patient.status === 'up-to-date' ? 'À jour' : 'En retard'}
                        </span>
                      </div>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-gray-400" />
                          <span>{patient.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-gray-400" />
                          <span>Dernière visite: {patient.lastVisit}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-gray-400" />
                          <span>Prochain vaccin: {patient.nextVaccine}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'urgent':
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-medium flex items-center gap-2">
                <AlertTriangle className="text-red-500" /> Vaccinations urgentes
              </h2>
            </div>
            <div className="divide-y">
              {urgentVaccinations.map(item => (
                <div key={item.id} className="p-4 hover:bg-red-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{item.patient}</h3>
                      <p className="text-sm text-gray-600">{item.vaccine}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-600">{item.daysOverdue} jours</p>
                      <button className="mt-1 px-3 py-1 bg-red-500 text-white text-sm rounded">
                        Contacter
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'campaigns':
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="font-medium flex items-center gap-2">
                <Target className="text-blue-500" /> Campagnes en cours
              </h2>
            </div>
            <div className="divide-y">
              {campaigns.map(campaign => (
                <div key={campaign.id} className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{campaign.name}</h3>
                    <span className="font-bold text-blue-600">{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Tableau de bord professionnel</h1>
          <p className="text-gray-600">Gestion des patients et vaccinations</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              isOfflineMode ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {isOfflineMode ? <WifiOff size={18} /> : <Wifi size={18} />}
            {isOfflineMode ? 'Hors ligne' : 'En ligne'}
          </button>
          <button 
            onClick={() => setShowNewPatientForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
          >
            <Plus size={18} /> Nouveau patient
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-light">{stat.value}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <stat.icon className="text-blue-500" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Onglets */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab('patients')}
          className={`px-4 py-2 font-medium ${activeTab === 'patients' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Patients
        </button>
        <button
          onClick={() => setActiveTab('urgent')}
          className={`px-4 py-2 font-medium ${activeTab === 'urgent' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Vaccinations urgentes
        </button>
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-4 py-2 font-medium ${activeTab === 'campaigns' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
        >
          Campagnes
        </button>
      </div>

      {/* Contenu */}
      {renderTabContent()}

      {/* Modal Nouveau Patient */}
      {showNewPatientForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-medium">Enregistrer un nouveau patient</h2>
              <button onClick={() => setShowNewPatientForm(false)} className="text-gray-500">
                &times;
              </button>
            </div>
            <div className="p-4">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom complet</label>
                  <input type="text" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date de naissance</label>
                  <input type="date" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Téléphone</label>
                  <input type="tel" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Localisation</label>
                  <input type="text" className="w-full p-2 border rounded-lg" />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowNewPatientForm(false)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal QR Code */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Scanner QR Code</h2>
              <button onClick={() => setShowQRModal(false)} className="text-gray-500">
                &times;
              </button>
            </div>
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg aspect-square flex items-center justify-center mb-4">
              <div className="text-center p-4">
                <QrCode className="mx-auto text-gray-400 mb-2" size={48} />
                <p className="text-gray-500">Placez le QR code dans le cadre</p>
              </div>
            </div>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg">
              Activer la caméra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}