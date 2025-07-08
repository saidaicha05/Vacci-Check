"use client"
import React, { useState } from 'react';
import { 
  Syringe, Calendar, Filter, Download, 
  Search, FileText, MapPin, Clock,
  ChevronDown, Eye, X, Check,
  Building2, User, BarChart3
} from 'lucide-react';
import Link from 'next/link';

const VaccineHistoryPage = () => {
  // États pour les filtres
  const [filters, setFilters] = useState({
    patientSearch: '',
    vaccineType: '',
    dateFrom: '',
    dateTo: '',
    healthCenter: '',
    status: 'all'
  });

  // États pour l'affichage
  const [viewMode, setViewMode] = useState('list'); // 'list' ou 'timeline'
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Données simulées
  const vaccines = [
    { id: 1, name: 'BCG', type: 'Tuberculose', color: 'bg-blue-500' },
    { id: 2, name: 'Polio', type: 'Poliomyélite', color: 'bg-green-500' },
    { id: 3, name: 'ROR', type: 'Rougeole-Oreillons-Rubéole', color: 'bg-red-500' },
    { id: 4, name: 'DTC', type: 'Diphtérie-Tétanos-Coqueluche', color: 'bg-purple-500' },
    { id: 5, name: 'Hépatite B', type: 'Hépatite B', color: 'bg-orange-500' }
  ];

  const healthCenters = [
    'Hôpital Central de Yaoundé',
    'Hôpital Général de Douala',
    'Centre de Santé Intégré de Garoua',
    'Hôpital de District de Bamenda',
    'Centre de Santé de Maroua'
  ];

  const vaccineHistory = [
    {
      id: 1,
      patientName: 'Marie Ngono',
      patientAge: '2 ans',
      vaccineId: 1,
      vaccineName: 'BCG',
      date: '2021-05-16',
      healthCenter: 'Hôpital Central de Yaoundé',
      lot: 'BCG2021-045',
      administeredBy: 'Dr. Kamga',
      nextDue: null,
      status: 'completed'
    },
    {
      id: 2,
      patientName: 'Jean Mballa',
      patientAge: '6 mois',
      vaccineId: 2,
      vaccineName: 'Polio',
      date: '2024-01-15',
      healthCenter: 'Hôpital Général de Douala',
      lot: 'POL2024-012',
      administeredBy: 'Inf. Nkomo',
      nextDue: '2024-03-15',
      status: 'completed'
    },
    {
      id: 3,
      patientName: 'Fatima Alim',
      patientAge: '9 mois',
      vaccineId: 3,
      vaccineName: 'ROR',
      date: '2024-02-20',
      healthCenter: 'Centre de Santé Intégré de Garoua',
      lot: 'ROR2024-008',
      administeredBy: 'Dr. Moussa',
      nextDue: null,
      status: 'completed'
    },
    {
      id: 4,
      patientName: 'Paul Ekani',
      patientAge: '4 mois',
      vaccineId: 4,
      vaccineName: 'DTC',
      date: '2024-03-10',
      healthCenter: 'Hôpital de District de Bamenda',
      lot: 'DTC2024-033',
      administeredBy: 'Inf. Tabi',
      nextDue: '2024-05-10',
      status: 'completed'
    }
  ];

  // Gestion des filtres
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filtrage des données
  const filteredHistory = vaccineHistory.filter(record => {
    const matchesPatient = record.patientName.toLowerCase().includes(filters.patientSearch.toLowerCase());
    const matchesVaccine = !filters.vaccineType || record.vaccineId.toString() === filters.vaccineType;
    const matchesCenter = !filters.healthCenter || record.healthCenter === filters.healthCenter;
    const matchesDate = (!filters.dateFrom || record.date >= filters.dateFrom) &&
                       (!filters.dateTo || record.date <= filters.dateTo);
    
    return matchesPatient && matchesVaccine && matchesCenter && matchesDate;
  });

  // Export PDF
  const handleExport = () => {
    console.log('Export PDF des données filtrées');
    // Simulation d'export
    alert('Export PDF généré avec succès!');
  };

  // Statistiques de couverture
  const coverageStats = {
    total: vaccineHistory.length,
    completed: vaccineHistory.filter(v => v.status === 'completed').length,
    pending: vaccineHistory.filter(v => v.nextDue && new Date(v.nextDue) > new Date()).length,
    overdue: vaccineHistory.filter(v => v.nextDue && new Date(v.nextDue) < new Date()).length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* En-tête */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Syringe className="text-blue-600" />
              Historique Vaccinal
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                Filtres
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>

          {/* Statistiques de couverture */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-600">Total Vaccinations</p>
                  <p className="text-2xl font-bold text-blue-800">{coverageStats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-green-600">Complétées</p>
                  <p className="text-2xl font-bold text-green-800">{coverageStats.completed}</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-yellow-600">En attente</p>
                  <p className="text-2xl font-bold text-yellow-800">{coverageStats.pending}</p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <X className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm text-red-600">En retard</p>
                  <p className="text-2xl font-bold text-red-800">{coverageStats.overdue}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filtres */}
          {showFilters && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rechercher un patient</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      name="patientSearch"
                      value={filters.patientSearch}
                      onChange={handleFilterChange}
                      placeholder="Nom du patient..."
                      className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type de vaccin</label>
                  <select
                    name="vaccineType"
                    value={filters.vaccineType}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Tous les vaccins</option>
                    {vaccines.map(vaccine => (
                      <option key={vaccine.id} value={vaccine.id}>{vaccine.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Centre de santé</label>
                  <select
                    name="healthCenter"
                    value={filters.healthCenter}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Tous les centres</option>
                    {healthCenters.map(center => (
                      <option key={center} value={center}>{center}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                  <input
                    type="date"
                    name="dateFrom"
                    value={filters.dateFrom}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                  <input
                    type="date"
                    name="dateTo"
                    value={filters.dateTo}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Mode d'affichage */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-lg text-sm ${
                viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Liste
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1 rounded-lg text-sm ${
                viewMode === 'timeline' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Chronologie
            </button>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {viewMode === 'list' ? (
            /* Vue liste */
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-900">Patient</th>
                    <th className="text-left p-4 font-medium text-gray-900">Vaccin</th>
                    <th className="text-left p-4 font-medium text-gray-900">Date</th>
                    <th className="text-left p-4 font-medium text-gray-900">Centre</th>
                    <th className="text-left p-4 font-medium text-gray-900">Lot</th>
                    <th className="text-left p-4 font-medium text-gray-900">Administré par</th>
                    <th className="text-left p-4 font-medium text-gray-900">Prochain rappel</th>
                    <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((record) => {
                    const vaccine = vaccines.find(v => v.id === record.vaccineId);
                    return (
                      <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">{record.patientName}</p>
                              <p className="text-sm text-gray-500">{record.patientAge}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${vaccine?.color}`}></div>
                            <span className="font-medium">{record.vaccineName}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{new Date(record.date).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{record.healthCenter}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                            {record.lot}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">{record.administeredBy}</span>
                        </td>
                        <td className="p-4">
                          {record.nextDue ? (
                            <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                              {new Date(record.nextDue).toLocaleDateString('fr-FR')}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">Aucun</span>
                          )}
                        </td>
                        <td className="p-4">
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            /* Vue chronologie */
            <div className="p-6">
              <div className="space-y-6">
                {filteredHistory.map((record, index) => {
                  const vaccine = vaccines.find(v => v.id === record.vaccineId);
                  return (
                    <div key={record.id} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${vaccine?.color}`}></div>
                        {index < filteredHistory.length - 1 && (
                          <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900">{record.patientName}</h3>
                            <p className="text-sm text-gray-500">{record.patientAge}</p>
                          </div>
                          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {new Date(record.date).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p><span className="font-medium">Vaccin:</span> {record.vaccineName}</p>
                            <p><span className="font-medium">Centre:</span> {record.healthCenter}</p>
                          </div>
                          <div>
                            <p><span className="font-medium">Lot:</span> {record.lot}</p>
                            <p><span className="font-medium">Administré par:</span> {record.administeredBy}</p>
                          </div>
                        </div>
                        {record.nextDue && (
                          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                            <span className="font-medium">Prochain rappel:</span> {new Date(record.nextDue).toLocaleDateString('fr-FR')}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VaccineHistoryPage;