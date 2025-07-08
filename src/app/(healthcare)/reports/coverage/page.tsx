"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, Filter, BarChart2, CheckCircle, Search, X, FileText } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CoverageReportPage = () => {
  // States for filters, map, and modals
  const [regionFilter, setRegionFilter] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');
  const [vaccineFilter, setVaccineFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mapData, setMapData] = useState<any>(null);

  // Mock data for vaccination coverage
  const coverageData = [
    { region: 'Centre', vaccine: 'BCG', age: '0-1', coverage: 85, whoTarget: 90 },
    { region: 'Centre', vaccine: 'Polio', age: '0-1', coverage: 78, whoTarget: 90 },
    { region: 'Littoral', vaccine: 'BCG', age: '0-1', coverage: 92, whoTarget: 90 },
    { region: 'Littoral', vaccine: 'Polio', age: '0-1', coverage: 88, whoTarget: 90 },
    { region: 'Nord', vaccine: 'BCG', age: '0-1', coverage: 65, whoTarget: 90 },
    { region: 'Nord', vaccine: 'Polio', age: '0-1', coverage: 60, whoTarget: 90 },
    { region: 'Centre', vaccine: 'BCG', age: '1-5', coverage: 80, whoTarget: 85 },
    { region: 'Littoral', vaccine: 'BCG', age: '1-5', coverage: 90, whoTarget: 85 },
    { region: 'Nord', vaccine: 'BCG', age: '1-5', coverage: 55, whoTarget: 85 }
  ];

  // Memoize filteredData to prevent re-creation on every render
  const filteredData = useMemo(() => {
    return coverageData.filter(data => {
      const matchesSearch = data.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.vaccine.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = regionFilter === 'all' || data.region === regionFilter;
      const matchesAge = ageFilter === 'all' || data.age === ageFilter;
      const matchesVaccine = vaccineFilter === 'all' || data.vaccine === vaccineFilter;
      return matchesSearch && matchesRegion && matchesAge && matchesVaccine;
    });
  }, [searchQuery, regionFilter, ageFilter, vaccineFilter]);

  // Risk zones detection (coverage below WHO target)
  const riskZones = filteredData.filter(data => data.coverage < data.whoTarget);

  // Chart.js data for visualization
  const chartData = {
    labels: filteredData.map(data => `${data.region} (${data.vaccine})`),
    datasets: [
      {
        label: 'Couverture vaccinale (%)',
        data: filteredData.map(data => data.coverage),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Objectif OMS (%)',
        data: filteredData.map(data => data.whoTarget),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  // Map data loading
  useEffect(() => {
    setMapData({
      type: 'FeatureCollection',
      features: filteredData.map(data => ({
        type: 'Feature',
        properties: {
          region: data.region,
          coverage: data.coverage,
          vaccine: data.vaccine,
          age: data.age,
          risk: data.coverage < data.whoTarget
        },
        geometry: {
          type: 'Point',
          coordinates: [Math.random() * 10, Math.random() * 10] // Mock coordinates
        }
      }))
    });
  }, [filteredData]);

  // Handle export
  const handleExport = () => {
    const exportData = filteredData.map(data => ({
      region: data.region,
      vaccine: data.vaccine,
      age: data.age,
      coverage: data.coverage,
      whoTarget: data.whoTarget,
      riskZone: data.coverage < data.whoTarget ? 'Oui' : 'Non'
    }));
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `coverage_report_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setToastMessage('Rapport exporté avec succès');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toast component
  const Toast = ({ message }: { message: string }) => (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
      <CheckCircle className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Main content header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Couverture vaccinale</h1>
            <p className="text-gray-600">Cartographie interactive et comparaison avec les objectifs OMS</p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Exporter</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par région ou vaccin..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
              >
                <option value="all">Toutes les régions</option>
                <option value="Centre">Centre</option>
                <option value="Littoral">Littoral</option>
                <option value="Nord">Nord</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
              >
                <option value="all">Tous les âges</option>
                <option value="0-1">0-1 an</option>
                <option value="1-5">1-5 ans</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={vaccineFilter}
                onChange={(e) => setVaccineFilter(e.target.value)}
              >
                <option value="all">Tous les vaccins</option>
                <option value="BCG">BCG</option>
                <option value="Polio">Polio</option>
              </select>
            </div>
          </div>
        </div>

        {/* Interactive Map (Mock) and Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              Carte interactive
            </h3>
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">
                Carte interactive (Mock - Intégrer Leaflet ou autre bibliothèque de cartographie)
              </p>
              {mapData && (
                <ul className="mt-4 text-sm">
                  {mapData.features.map((feature: any, index: number) => (
                    <li key={index} className={`p-2 ${feature.properties.risk ? 'bg-red-50' : 'bg-green-50'}`}>
                      {feature.properties.region} - {feature.properties.vaccine} ({feature.properties.age}): {feature.properties.coverage}% 
                      {feature.properties.risk && ' (Zone à risque)'}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-blue-500" />
              Comparaison avec objectifs OMS
            </h3>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Couverture vaccinale vs Objectifs OMS' }
                },
                scales: {
                  y: { beginAtZero: true, max: 100 }
                }
              }}
            />
          </div>
        </div>

        {/* Risk Zones */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-500" />
            Zones à risque
          </h3>
          {riskZones.length > 0 ? (
            <div className="space-y-2">
              {riskZones.map((zone, index) => (
                <div key={index} className="p-3 bg-red-50 rounded border border-red-200">
                  <p><span className="font-medium">Région:</span> {zone.region}</p>
                  <p><span className="font-medium">Vaccin:</span> {zone.vaccine}</p>
                  <p><span className="font-medium">Âge:</span> {zone.age}</p>
                  <p><span className="font-medium">Couverture:</span> {zone.coverage}% (Objectif OMS: {zone.whoTarget}%)</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Aucune zone à risque détectée</p>
          )}
        </div>

        {/* Toast */}
        {toastMessage && <Toast message={toastMessage} />}
      </div>
    </div>
  );
};

export default CoverageReportPage;