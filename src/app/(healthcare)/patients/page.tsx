"use client"
import React, { useState } from 'react';
import {
  Users, Search, Plus, Frown, Smile, Meh,
  Calendar, Bell, Syringe, ChevronDown, Filter,
  X, Smartphone, MessageSquare, Phone, Edit,
  Printer, Share2, Trash2, FileText, File, Download,
  Archive, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

const PatientsListPage = () => {
  // États pour la gestion des filtres et recherches
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedPatient, setExpandedPatient] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 5;

  // États pour la gestion des modals
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<'reminder' | 'vaccine' | 'record' | 'options' | 'archives' | null>(null);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderMethod, setReminderMethod] = useState('app');
  const [selectedVaccine, setSelectedVaccine] = useState('');
  const [vaccineLot, setVaccineLot] = useState('');

  // Données mock des patients
  const allPatients = [
    {
      id: "CM001234",
      name: "Marie Ngono",
      age: 2,
      gender: "F",
      lastVaccine: "ROR",
      lastVisit: "2023-07-15",
      nextDue: "2023-09-10",
      status: "up_to_date",
      archived: false,
      vaccines: [
        { name: "BCG", date: "2023-01-10", status: "completed" },
        { name: "Polio", date: "2023-03-05", status: "completed" },
        { name: "ROR", date: "2023-07-15", status: "completed" }
      ]
    },
    {
      id: "CM001235",
      name: "Jean Mbarga",
      age: 1,
      gender: "M",
      lastVaccine: "Polio",
      lastVisit: "2023-06-20",
      nextDue: "2023-08-15",
      status: "pending",
      archived: false,
      vaccines: [
        { name: "BCG", date: "2023-02-15", status: "completed" },
        { name: "Polio", date: "2023-06-20", status: "completed" }
      ]
    },
    {
      id: "CM001236",
      name: "Sophie Biya",
      age: 3,
      gender: "F",
      lastVaccine: "Hépatite B",
      lastVisit: "2023-05-10",
      nextDue: "2023-07-30",
      status: "overdue",
      archived: false,
      vaccines: [
        { name: "BCG", date: "2023-01-05", status: "completed" },
        { name: "Polio", date: "2023-03-10", status: "completed" },
        { name: "Hépatite B", date: "2023-05-10", status: "completed" }
      ]
    },
    {
      id: "CM001237",
      name: "Paul Biya",
      age: 5,
      gender: "M",
      lastVaccine: "Polio",
      lastVisit: "2023-04-10",
      nextDue: "2023-06-30",
      status: "up_to_date",
      archived: true,
      vaccines: [
        { name: "BCG", date: "2023-01-05", status: "completed" },
        { name: "Polio", date: "2023-04-10", status: "completed" }
      ]
    },
    {
      id: "CM001238",
      name: "Alice Ngo",
      age: 4,
      gender: "F",
      lastVaccine: "ROR",
      lastVisit: "2023-03-15",
      nextDue: "2023-05-30",
      status: "up_to_date",
      archived: false,
      vaccines: [
        { name: "BCG", date: "2023-01-10", status: "completed" },
        { name: "Polio", date: "2023-02-15", status: "completed" },
        { name: "ROR", date: "2023-03-15", status: "completed" }
      ]
    },
    {
      id: "CM001239",
      name: "David Fotso",
      age: 2,
      gender: "M",
      lastVaccine: "Hépatite B",
      lastVisit: "2023-02-20",
      nextDue: "2023-04-30",
      status: "up_to_date",
      archived: false,
      vaccines: [
        { name: "BCG", date: "2023-01-05", status: "completed" },
        { name: "Polio", date: "2023-01-20", status: "completed" },
        { name: "Hépatite B", date: "2023-02-20", status: "completed" }
      ]
    }
  ];

  // Filtrer les patients
  const filteredPatients = allPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = activeFilter === 'all' ||
      (activeFilter === 'up_to_date' && patient.status === 'up_to_date') ||
      (activeFilter === 'pending' && patient.status === 'pending') ||
      (activeFilter === 'overdue' && patient.status === 'overdue');

    return matchesSearch && matchesFilter && !patient.archived;
  });

  // Pagination
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  // Composant Modal pour programmer un rappel
  const ReminderModal = ({ patient, onClose }: { patient: any, onClose: () => void }) => (
    <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Programmer un rappel pour {patient.name}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date du rappel</label>
            <input
              type="date"
              className="w-full p-2 border rounded-lg"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Méthode de notification</label>
            <div className="grid grid-cols-3 gap-2">
              {['app', 'sms', 'ussd'].map((method) => (
                <button
                  key={method}
                  className={`p-2 border rounded-lg flex flex-col items-center ${
                    reminderMethod === method ? 'bg-blue-50 border-blue-300' : 'border-gray-200'
                  }`}
                  onClick={() => setReminderMethod(method)}
                >
                  {method === 'app' && <Smartphone className="w-5 h-5 text-blue-500" />}
                  {method === 'sms' && <MessageSquare className="w-5 h-5 text-green-500" />}
                  {method === 'ussd' && <Phone className="w-5 h-5 text-purple-500" />}
                  <span className="text-xs mt-1 capitalize">{method}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button 
              className="px-4 py-2 border rounded-lg text-gray-700"
              onClick={onClose}
            >
              Annuler
            </button>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => {
                // Logique d'enregistrement
                onClose();
              }}
            >
              Programmer
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Composant Modal pour nouveau vaccin
  const VaccineModal = ({ patient, onClose }: { patient: any, onClose: () => void }) => {
    const vaccines = ['BCG', 'Polio', 'ROR', 'Hépatite B', 'DTC-Hib-HepB'];
    
    return (
      <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <h3 className="text-xl font-bold mb-4">Nouvelle vaccination pour {patient.name}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Vaccin administré</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={selectedVaccine}
                onChange={(e) => setSelectedVaccine(e.target.value)}
              >
                <option value="">Sélectionner un vaccin</option>
                {vaccines.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Numéro de lot</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={vaccineLot}
                onChange={(e) => setVaccineLot(e.target.value)}
                placeholder="Ex: POL-2023-045"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <input type="checkbox" id="adverseEffect" className="w-4 h-4" />
              <label htmlFor="adverseEffect" className="text-sm">
                Signaler un effet indésirable
              </label>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <button 
                className="px-4 py-2 border rounded-lg text-gray-700"
                onClick={onClose}
              >
                Annuler
              </button>
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={() => {
                  // Logique d'enregistrement
                  onClose();
                }}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Composant Modal pour dossier complet
  const FullRecordModal = ({ patient, onClose }: { patient: any, onClose: () => void }) => (
    <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold">Dossier complet - {patient.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Section Informations */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Informations patient
            </h4>
            <div className="space-y-2">
              <p><span className="font-medium">ID:</span> {patient.id}</p>
              <p><span className="font-medium">Âge:</span> {patient.age} ans</p>
              <p><span className="font-medium">Genre:</span> {patient.gender === 'F' ? 'Féminin' : 'Masculin'}</p>
              <p><span className="font-medium">Dernière visite:</span> {patient.lastVisit}</p>
            </div>
          </div>
          
          {/* Section Vaccination */}
          <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Syringe className="w-4 h-4" />
              Historique vaccinal
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Vaccin</th>
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Lot</th>
                    <th className="text-left py-2">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.vaccines.map((v: any, i: number) => (
                    <tr key={i} className="border-b">
                      <td className="py-2">{v.name}</td>
                      <td className="py-2">{v.date}</td>
                      <td className="py-2">POL-2023-0{i+1}</td>
                      <td className="py-2">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Complété
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Section Rappels */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Rappels programmés
            </h4>
            <div className="space-y-3">
              <div className="p-2 bg-blue-50 rounded border border-blue-200">
                <p className="font-medium">Polio</p>
                <p className="text-sm">15/09/2023</p>
                <p className="text-xs text-blue-600">Notification par SMS</p>
              </div>
            </div>
          </div>
          
          {/* Section Documents */}
          <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Documents associés
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 border rounded-lg hover:bg-gray-100 flex items-center gap-2">
                <File className="w-5 h-5 text-blue-500" />
                <span>Carnet vaccinal</span>
              </button>
              <button className="p-3 border rounded-lg hover:bg-gray-100 flex items-center gap-2">
                <Download className="w-5 h-5 text-green-500" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Composant Dropdown pour plus d'options
  const MoreOptionsDropdown = ({ patient, onClose }: { patient: any, onClose: () => void }) => (
    <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-start justify-end pt-16 pr-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-56 overflow-hidden">
        <div className="py-1">
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
            <Printer className="w-4 h-4 text-gray-600" />
            <span>Imprimer carnet</span>
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-gray-600" />
            <span>Partager dossier</span>
          </button>
          <div className="border-t my-1"></div>
          <button 
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600"
            onClick={() => {
              // Logique d'archivage
              onClose();
            }}
          >
            <Archive className="w-4 h-4" />
            <span>Archiver dossier</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Composant Modal pour les archives
  const ArchivesModal = ({ onClose }: { onClose: () => void }) => {
    const archivedPatients = allPatients.filter(patient => patient.archived);
    
    return (
      <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold">Dossiers archivés</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Patient</th>
                  <th className="text-left py-2">Âge/Genre</th>
                  <th className="text-left py-2">Dernier vaccin</th>
                  <th className="text-left py-2">Date archivage</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {archivedPatients.map((patient) => (
                  <tr key={patient.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-xs text-gray-500">{patient.id}</div>
                    </td>
                    <td className="py-2">
                      {patient.age} an{patient.age > 1 ? 's' : ''} • {patient.gender}
                    </td>
                    <td className="py-2">
                      <div className="flex items-center gap-1">
                        <Syringe className="w-3 h-3 text-blue-500" />
                        <span>{patient.lastVaccine}</span>
                      </div>
                      <div className="text-xs text-gray-500">{patient.lastVisit}</div>
                    </td>
                    <td className="py-2">2023-06-15</td>
                    <td className="py-2">
                      <button 
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          // Logique de désarchivage
                        }}
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span className="text-sm">Désarchiver</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up_to_date':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'overdue':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header avec titre et actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Liste des Patients</h1>
            <p className="text-gray-600">Gestion des dossiers patients et suivi vaccinal</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => setActiveModal('archives')}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              <Archive className="w-4 h-4" />
              <span>Archives</span>
            </button>
            <Link
              href="/patients/new"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau patient</span>
            </Link>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom ou ID patient..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                <option value="all">Tous les patients</option>
                <option value="up_to_date">À jour</option>
                <option value="pending">En attente</option>
                <option value="overdue">En retard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tableau des patients */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* En-tête du tableau */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50">
            <div className="col-span-3 font-medium text-gray-700">Patient</div>
            <div className="col-span-2 font-medium text-gray-700">Âge/Genre</div>
            <div className="col-span-3 font-medium text-gray-700">Dernier vaccin</div>
            <div className="col-span-2 font-medium text-gray-700">Prochain rappel</div>
            <div className="col-span-2 font-medium text-gray-700 text-right">Statut</div>
          </div>

          {/* Liste des patients */}
          {currentPatients.length > 0 ? (
            currentPatients.map((patient) => (
              <div key={patient.id} className="border-b border-gray-200 last:border-b-0">
                {/* Ligne principale */}
                <div
                  className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setExpandedPatient(expandedPatient === patient.id ? null : patient.id)}
                >
                  <div className="col-span-3 flex items-center">
                    <div className="font-medium text-gray-900">{patient.name}</div>
                  </div>
                  <div className="col-span-2 text-gray-700">
                    {patient.age} an{patient.age > 1 ? 's' : ''} • {patient.gender}
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <Syringe className="w-4 h-4 text-blue-500" />
                    <span>{patient.lastVaccine}</span>
                    <span className="text-xs text-gray-500">{patient.lastVisit}</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span>{patient.nextDue}</span>
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(patient.status)}`}>
                      {patient.status === 'up_to_date' ? 'À jour' :
                        patient.status === 'pending' ? 'En attente' : 'En retard'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${expandedPatient === patient.id ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>

                {/* Détails expansibles */}
                {expandedPatient === patient.id && (
                  <div className="bg-gray-50 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Historique vaccinal */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Syringe className="w-4 h-4 text-blue-500" />
                          Historique vaccinal
                        </h3>
                        <div className="space-y-2">
                          {patient.vaccines.map((vaccine: any, idx: number) => (
                            <div key={idx} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                              <div>
                                <span className="font-medium">{vaccine.name}</span>
                                <span className="text-xs text-gray-500 ml-2">{vaccine.date}</span>
                              </div>
                              <span className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-700">
                                Administré
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions rapides */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Bell className="w-4 h-4 text-yellow-500" />
                          Actions
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            className="flex items-center gap-2 p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded border border-blue-200 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPatient(patient);
                              setActiveModal('reminder');
                            }}
                          >
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">Programmer rappel</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPatient(patient);
                              setActiveModal('vaccine');
                            }}
                            className="flex items-center gap-2 p-2 bg-green-50 hover:bg-green-100 text-green-700 rounded border border-green-200 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            <span className="text-sm">Nouveau vaccin</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPatient(patient);
                              setActiveModal('record');
                            }}
                            className="flex items-center gap-2 p-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded border border-purple-200 transition-colors"
                          >
                            <Users className="w-4 h-4" />
                            <span className="text-sm">Dossier complet</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPatient(patient);
                              setActiveModal('options');
                            }}
                            className="flex items-center gap-2 p-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded border border-gray-200 transition-colors"
                          >
                            <span className="text-sm">Plus d'options</span>
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <Search className="mx-auto w-8 h-8 mb-2" />
              <p>Aucun patient trouvé</p>
              <p className="text-sm">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Affichage de {indexOfFirstPatient + 1} à {Math.min(indexOfLastPatient, filteredPatients.length)} sur {filteredPatients.length} patients
          </div>
          <div className="flex gap-2">
            <button 
              className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Précédent
            </button>
            <button 
              className={`px-3 py-1 border rounded ${
                currentPage === 1 
                  ? 'bg-blue-50 text-blue-600 border-blue-200' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            {totalPages > 1 && (
              <button 
                className={`px-3 py-1 border rounded ${
                  currentPage === 2 
                    ? 'bg-blue-50 text-blue-600 border-blue-200' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
            )}
            {totalPages > 2 && currentPage > 2 && currentPage < totalPages && (
              <button className="px-3 py-1 border border-gray-300 rounded text-gray-700">
                {currentPage}
              </button>
            )}
            <button 
              className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Suivant
            </button>
          </div>
        </div>

        {/* Modals */}
        {activeModal === 'reminder' && (
          <ReminderModal
            patient={selectedPatient}
            onClose={() => setActiveModal(null)}
          />
        )}

        {activeModal === 'vaccine' && (
          <VaccineModal
            patient={selectedPatient}
            onClose={() => setActiveModal(null)}
          />
        )}

        {activeModal === 'record' && (
          <FullRecordModal
            patient={selectedPatient}
            onClose={() => setActiveModal(null)}
          />
        )}

        {activeModal === 'options' && (
          <MoreOptionsDropdown
            patient={selectedPatient}
            onClose={() => setActiveModal(null)}
          />
        )}

        {activeModal === 'archives' && (
          <ArchivesModal
            onClose={() => setActiveModal(null)}
          />
        )}
      </div>
    </div>
  );
};

export default PatientsListPage;