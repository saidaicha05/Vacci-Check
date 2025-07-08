"use client"
import React, { useState } from 'react';
import {
  Search, Filter, ChevronDown, FileText, CheckCircle, X, Clock,
  File, MessageSquare
} from 'lucide-react';

const AdverseEventsMyReportsPage = () => {
  // States for filters, search, and table
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const reportsPerPage = 5;

  // Mock report data
  const reports = [
    {
      id: "AER001",
      patient: "Anonyme",
      symptoms: ["Fièvre", "Rash cutané"],
      severity: 3,
      date: "2025-07-07",
      status: "investigation",
      feedback: "Analyse en cours par l'équipe régionale",
      documents: ["photo_rash.jpg"],
      submittedBy: "Dr. Marie Ngono"
    },
    {
      id: "AER002",
      patient: "Jean Mbarga",
      symptoms: ["Nausée", "Maux de tête"],
      severity: 2,
      date: "2025-07-06",
      status: "resolved",
      feedback: "Effet mineur, aucune action supplémentaire requise",
      documents: [],
      submittedBy: "Dr. Sophie Biya"
    },
    {
      id: "AER003",
      patient: "Anonyme",
      symptoms: ["Réaction allergique"],
      severity: 4,
      date: "2025-07-05",
      status: "investigation",
      feedback: "Rapport envoyé au comité national",
      documents: ["rapport_medical.pdf"],
      submittedBy: "Dr. Paul Biya"
    },
    {
      id: "AER004",
      patient: "Alice Ngo",
      symptoms: ["Fatigue", "Douleur locale"],
      severity: 2,
      date: "2025-07-04",
      status: "resolved",
      feedback: "Résolution confirmée après suivi",
      documents: [],
      submittedBy: "Dr. Marie Ngono"
    },
    {
      id: "AER005",
      patient: "Anonyme",
      symptoms: ["Fièvre", "Autres"],
      severity: 3,
      date: "2025-07-03",
      status: "investigation",
      feedback: "En attente de résultats de laboratoire",
      documents: ["photo_symptome.jpg", "analyse.pdf"],
      submittedBy: "Dr. Sophie Biya"
    }
  ];

  // Filter reports
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' ||
      (statusFilter === 'investigation' && report.status === 'investigation') ||
      (statusFilter === 'resolved' && report.status === 'resolved');

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  // Handle document download
  const handleDownloadDocument = (document: string) => {
    console.log(`Downloading document: ${document}`);
    setToastMessage(`Téléchargement de ${document} initié`);
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Mes signalements</h1>
            <p className="text-gray-600">Suivi des effets indésirables rapportés</p>
          </div>
        </div>

        {/* Search and filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par patient, ID ou symptôme..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="text-gray-500" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="investigation">En investigation</option>
                <option value="resolved">Résolu</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50">
            <div className="col-span-3 font-medium text-gray-700">Patient</div>
            <div className="col-span-2 font-medium text-gray-700">Symptômes</div>
            <div className="col-span-2 font-medium text-gray-700">Date</div>
            <div className="col-span-2 font-medium text-gray-700">Statut</div>
            <div className="col-span-3 font-medium text-gray-700 text-right">Documents</div>
          </div>

          {currentReports.length > 0 ? (
            currentReports.map((report) => (
              <div key={report.id} className="border-b border-gray-200 last:border-b-0">
                <div
                  className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
                >
                  <div className="col-span-3 flex items-center">
                    <div className="font-medium text-gray-900">{report.patient}</div>
                  </div>
                  <div className="col-span-2 text-gray-700">
                    {report.symptoms.join(', ')}
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>{report.date}</span>
                  </div>
                  <div className="col-span-2 text-gray-700">
                    <span className={`px-2 py-1 text-xs rounded-full border ${
                      report.status === 'resolved' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                    }`}>
                      {report.status === 'resolved' ? 'Résolu' : 'En investigation'}
                    </span>
                  </div>
                  <div className="col-span-3 flex items-center justify-end gap-2">
                    <span>{report.documents.length} doc(s)</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${expandedReport === report.id ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>

                {expandedReport === report.id && (
                  <div className="bg-gray-50 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-500" />
                          Détails du signalement
                        </h3>
                        <div className="space-y-2">
                          <p><span className="font-medium">ID:</span> {report.id}</p>
                          <p><span className="font-medium">Gravité:</span> {report.severity}/5</p>
                          <p><span className="font-medium">Soumis par:</span> {report.submittedBy}</p>
                          <p><span className="font-medium">Feedback:</span> {report.feedback}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <File className="w-4 h-4 text-purple-500" />
                          Documents joints
                        </h3>
                        <div className="space-y-2">
                          {report.documents.length > 0 ? (
                            report.documents.map((doc, index) => (
                              <button
                                key={index}
                                className="flex items-center gap-2 p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded border border-blue-200 transition-colors w-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDownloadDocument(doc);
                                }}
                              >
                                <File className="w-4 h-4" />
                                <span className="text-sm">{doc}</span>
                              </button>
                            ))
                          ) : (
                            <p className="text-sm text-gray-500">Aucun document joint</p>
                          )}
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
              <p>Aucun signalement trouvé</p>
              <p className="text-sm">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Affichage de {indexOfFirstReport + 1} à {Math.min(indexOfLastReport, filteredReports.length)} sur {filteredReports.length} signalements
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

        {/* Toast */}
        {toastMessage && <Toast message={toastMessage} />}
      </div>
    </div>
  );
};

export default AdverseEventsMyReportsPage;