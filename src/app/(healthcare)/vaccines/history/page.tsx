"use client"
import React, { useState, useMemo } from 'react';
import { 
  Syringe, Calendar, Filter, Download, 
  Search, FileText, MapPin, Clock,
  ChevronDown, Eye, X, Check,
  Building2, User, BarChart3, PieChart,
  Map
} from 'lucide-react';

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

  // Régions du Cameroun
  const cameroonRegions = useMemo(() => [
    'Adamaoua',
    'Centre',
    'Est',
    'Extrême-Nord',
    'Littoral',
    'Nord',
    'Nord-Ouest',
    'Ouest',
    'Sud',
    'Sud-Ouest'
  ], []);

  // Simuler la région actuelle du professionnel de santé (à remplacer par la vraie donnée)
  const [currentRegion, setCurrentRegion] = useState('Littoral');

  // Centres de santé par région
  const healthCentersByRegion = useMemo(() => ({
    'Adamaoua': [
      'Hôpital Régional de Ngaoundéré',
      'Centre de Santé de Meiganga'
    ],
    'Centre': [
      'Hôpital Central de Yaoundé',
      'Hôpital Général de Yaoundé'
    ],
    'Est': [
      'Hôpital Régional de Bertoua',
      'Centre Médical d\'Abong-Mbang'
    ],
    'Extrême-Nord': [
      'Hôpital Régional de Maroua',
      'Hôpital de District de Mokolo'
    ],
    'Littoral': [
      'Hôpital Général de Douala',
      'Hôpital Laquintinie de Douala',
      'Centre Hospitalier de Bonassama'
    ],
    'Nord': [
      'Hôpital Régional de Garoua',
      'Centre Médical de Guider'
    ],
    'Nord-Ouest': [
      'Hôpital Régional de Bamenda',
      'Hôpital de District de Wum'
    ],
    'Ouest': [
      'Hôpital Régional de Bafoussam',
      'Hôpital de District de Dschang'
    ],
    'Sud': [
      'Hôpital Régional d\'Ebolowa',
      'Hôpital de District de Kribi'
    ],
    'Sud-Ouest': [
      'Hôpital Régional de Buéa',
      'Hôpital de District de Limbe'
    ]
  }), []);

  // Données simulées
  const vaccines = useMemo(() => [
    { id: 1, name: 'BCG', type: 'Tuberculose', color: 'bg-blue-500' },
    { id: 2, name: 'Polio', type: 'Poliomyélite', color: 'bg-green-500' },
    { id: 3, name: 'ROR', type: 'Rougeole-Oreillons-Rubéole', color: 'bg-red-500' },
    { id: 4, name: 'DTC', type: 'Diphtérie-Tétanos-Coqueluche', color: 'bg-purple-500' },
    { id: 5, name: 'Hépatite B', type: 'Hépatite B', color: 'bg-orange-500' }
  ], []);

  const vaccineHistory = useMemo(() => [
    {
      id: 1,
      patientId: 101,
      patientName: 'Marie Ngono',
      patientAge: '2 ans',
      vaccineId: 1,
      vaccineName: 'BCG',
      date: '2021-05-16',
      healthCenter: 'Hôpital Général de Douala',
      region: 'Littoral',
      lot: 'BCG2021-045',
      administeredBy: 'Dr. Kamga',
      nextDue: null,
      status: 'completed'
    },
    {
      id: 2,
      patientId: 102,
      patientName: 'Jean Mballa',
      patientAge: '6 mois',
      vaccineId: 2,
      vaccineName: 'Polio',
      date: '2024-01-15',
      healthCenter: 'Hôpital Général de Douala',
      region: 'Littoral',
      lot: 'POL2024-012',
      administeredBy: 'Inf. Nkomo',
      nextDue: '2024-03-15',
      status: 'completed'
    },
    {
      id: 3,
      patientId: 103,
      patientName: 'Fatima Alim',
      patientAge: '9 mois',
      vaccineId: 3,
      vaccineName: 'ROR',
      date: '2024-02-20',
      healthCenter: 'Hôpital Régional de Bamenda',
      region: 'Nord-Ouest',
      lot: 'ROR2024-008',
      administeredBy: 'Dr. Moussa',
      nextDue: null,
      status: 'completed'
    },
    {
      id: 4,
      patientId: 104,
      patientName: 'Paul Ekani',
      patientAge: '4 mois',
      vaccineId: 4,
      vaccineName: 'DTC',
      date: '2024-03-10',
      healthCenter: 'Hôpital de District de Bamenda',
      region: 'Nord-Ouest',
      lot: 'DTC2024-033',
      administeredBy: 'Inf. Tabi',
      nextDue: '2024-05-10',
      status: 'completed'
    }
  ], []);

  // Filtrage des données
  const filteredHistory = useMemo(() => {
    return vaccineHistory.filter(record => {
      const matchesPatient = record.patientName.toLowerCase().includes(filters.patientSearch.toLowerCase());
      const matchesVaccine = !filters.vaccineType || record.vaccineId.toString() === filters.vaccineType;
      const matchesCenter = !filters.healthCenter || record.healthCenter === filters.healthCenter;
      const matchesDate = (!filters.dateFrom || record.date >= filters.dateFrom) &&
                         (!filters.dateTo || record.date <= filters.dateTo);
      const matchesRegion = record.region === currentRegion;
      
      return matchesPatient && matchesVaccine && matchesCenter && matchesDate && matchesRegion;
    });
  }, [vaccineHistory, filters, currentRegion]);

  // Gestion des filtres
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Export PDF
  const handleExport = () => {
    console.log('Export PDF des données filtrées');
    alert('Export PDF généré avec succès!');
  };

  // Statistiques des vaccins
  const vaccineStats = useMemo(() => {
    const stats = {};
    vaccines.forEach(vaccine => {
      stats[vaccine.id] = {
        name: vaccine.name,
        count: 0,
        color: vaccine.color
      };
    });

    filteredHistory.forEach(record => {
      stats[record.vaccineId].count++;
    });

    return Object.values(stats).sort((a, b) => b.count - a.count);
  }, [filteredHistory, vaccines]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* En-tête avec région actuelle */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Syringe className="text-blue-600" />
                Historique Vaccinal - Région {currentRegion}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <Map className="w-4 h-4" />
                <span>Centres de santé disponibles: {healthCentersByRegion[currentRegion].join(', ')}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  value={currentRegion}
                  onChange={(e) => setCurrentRegion(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  {cameroonRegions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>

          {/* Statistiques des vaccins */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Graphique des vaccins les plus administrés */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <PieChart className="text-blue-600" />
                Vaccins administrés dans la région
              </h2>
              {vaccineStats.length > 0 ? (
                <div className="space-y-3">
                  {vaccineStats.map((stat) => (
                    <div key={stat.name} className="flex items-center">
                      <div className="w-32 flex-shrink-0">
                        <span className="text-sm font-medium">{stat.name}</span>
                      </div>
                      <div className="flex-1 flex items-center">
                        <div 
                          className={`h-4 ${stat.color} rounded-full`} 
                          style={{ 
                            width: `${filteredHistory.length > 0 ? (stat.count / filteredHistory.length) * 100 : 0}%` 
                          }}
                        ></div>
                        <span className="text-sm text-gray-600 ml-2">
                          {stat.count} {filteredHistory.length > 0 ? 
                            `(${Math.round((stat.count / filteredHistory.length) * 100)}%)` : ''}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Aucune donnée disponible pour cette région</p>
              )}
            </div>

            {/* Dernières vaccinations */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="text-green-600" />
                Dernières vaccinations
              </h2>
              {filteredHistory.length > 0 ? (
                <div className="space-y-3">
                  {filteredHistory
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 5)
                    .map(record => (
                      <div key={record.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${vaccines.find(v => v.id === record.vaccineId)?.color}`}></div>
                          <div>
                            <p className="font-medium">{record.patientName}</p>
                            <p className="text-sm text-gray-600">{record.vaccineName}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(record.date).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-500">Aucune vaccination récente</p>
              )}
            </div>
          </div>

          {/* Filtres */}
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
                  {healthCentersByRegion[currentRegion]?.map(center => (
                    <option key={center} value={center}>{center}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Historique complet des vaccinations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="text-green-600" />
              Historique des vaccinations pour la région {currentRegion}
            </h2>
          </div>
          
          {filteredHistory.length > 0 ? (
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              Aucune vaccination trouvée pour cette région avec les filtres actuels
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VaccineHistoryPage;