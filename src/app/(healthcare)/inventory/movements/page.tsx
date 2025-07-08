"use client"
import React, { useState, useEffect } from 'react';
import {
    Search, Download, Filter, ChevronDown, Package, Clock, User,
    ArrowUpCircle, ArrowDownCircle, Calendar, BarChart2, RefreshCw,
    WifiOff, Barcode, History, FileText, X, CheckCircle,
    AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

const MovementsListPage = () => {
    // States for filters, search, and modals
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('');
    const [expandedMovement, setExpandedMovement] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isOffline, setIsOffline] = useState(false);
    const [lastSync, setLastSync] = useState(new Date().toISOString());
    const [localChanges, setLocalChanges] = useState<string[]>([]);
    const [activeModal, setActiveModal] = useState<'history' | 'report' | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const movementsPerPage = 5;

    // Mock movement data
    const movements = [
        {
            id: "MOV001",
            date: "2025-07-07 14:30",
            type: "entry",
            product: "Vaccin BCG",
            quantity: 50,
            lot: "BCG-2025-001",
            responsible: "Marie Ngono",
            reason: "Réapprovisionnement",
            location: "Entrepôt A"
        },
        {
            id: "MOV002",
            date: "2025-07-06 09:15",
            type: "exit",
            product: "Vaccin Polio",
            quantity: 20,
            lot: "POL-2025-002",
            responsible: "Jean Mbarga",
            reason: "Campagne de vaccination",
            location: "Entrepôt B"
        },
        {
            id: "MOV003",
            date: "2025-07-05 16:45",
            type: "entry",
            product: "Vaccin ROR",
            quantity: 30,
            lot: "ROR-2025-003",
            responsible: "Sophie Biya",
            reason: "Livraison fournisseur",
            location: "Entrepôt A"
        },
        {
            id: "MOV004",
            date: "2025-07-04 11:20",
            type: "exit",
            product: "Vaccin Hépatite B",
            quantity: 15,
            lot: "HEPB-2025-004",
            responsible: "Paul Biya",
            reason: "Distribution clinique",
            location: "Entrepôt C"
        },
        {
            id: "MOV005",
            date: "2025-07-03 13:50",
            type: "entry",
            product: "Vaccin DTC",
            quantity: 40,
            lot: "DTC-2025-005",
            responsible: "Alice Ngo",
            reason: "Réapprovisionnement",
            location: "Entrepôt A"
        }
    ];

    // Mock statistics
    const stats = {
        totalProducts: 125,
        activeAlerts: 4,
        expiringSoon: 8
    };

    // Handle offline status
    useEffect(() => {
        const handleOnlineStatus = () => setIsOffline(!navigator.onLine);
        window.addEventListener('online', handleOnlineStatus);
        window.addEventListener('offline', handleOnlineStatus);
        return () => {
            window.removeEventListener('online', handleOnlineStatus);
            window.removeEventListener('offline', handleOnlineStatus);
        };
    }, []);

    // Handle manual sync
    const handleSync = () => {
        setLastSync(new Date().toISOString());
        setLocalChanges([]);
        setToastMessage('Synchronisation avec le serveur réussie');
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Handle barcode scan
    const handleBarcodeScan = () => {
        console.log('Initiating barcode scan');
        setToastMessage('Scanner de code-barres lancé');
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Handle export movements
    const handleExportMovements = () => {
        const exportData = filteredMovements.map(movement => ({
            id: movement.id,
            date: movement.date,
            type: movement.type === 'entry' ? 'Entrée' : 'Sortie',
            product: movement.product,
            quantity: movement.quantity,
            lot: movement.lot,
            responsible: movement.responsible,
            reason: movement.reason,
            location: movement.location
        }));

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `movements_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);

        setLocalChanges([...localChanges, `Mouvements exportés à ${new Date().toLocaleString()}`]);
        setToastMessage('Mouvements exportés avec succès');
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Handle monthly report
    const handleGenerateReport = () => {
        console.log('Generating monthly consumption report');
        setLocalChanges([...localChanges, `Rapport mensuel généré à ${new Date().toLocaleString()}`]);
        setToastMessage('Rapport mensuel généré avec succès');
        setTimeout(() => setToastMessage(null), 3000);
        setActiveModal(null);
    };

    // Filter movements
    const filteredMovements = movements.filter(movement => {
        const matchesSearch = movement.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movement.lot.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movement.responsible.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = activeFilter === 'all' ||
            (activeFilter === 'entry' && movement.type === 'entry') ||
            (activeFilter === 'exit' && movement.type === 'exit');

        const matchesDate = !dateFilter || movement.date.split(' ')[0] === dateFilter;

        return matchesSearch && matchesFilter && matchesDate;
    });

    // Pagination
    const indexOfLastMovement = currentPage * movementsPerPage;
    const indexOfFirstMovement = indexOfLastMovement - movementsPerPage;
    const currentMovements = filteredMovements.slice(indexOfFirstMovement, indexOfLastMovement);
    const totalPages = Math.ceil(filteredMovements.length / movementsPerPage);

    // Toast component
    const Toast = ({ message }: { message: string }) => (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-5 h-5" />
            <span>{message}</span>
        </div>
    );

    // History modal
    const HistoryModal = ({ onClose }: { onClose: () => void }) => (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold">Historique des modifications locales</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-3">
                    {localChanges.length > 0 ? (
                        localChanges.map((change, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded border border-gray-200">
                                <p className="text-sm">{change}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 text-center">Aucune modification locale</p>
                    )}
                </div>
            </div>
        </div>
    );

    // Report modal
    const ReportModal = ({ onClose }: { onClose: () => void }) => (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Générer un rapport mensuel</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Mois</label>
                        <input
                            type="month"
                            className="w-full p-2 border rounded-lg"
                            defaultValue={new Date().toISOString().slice(0, 7)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Type de rapport</label>
                        <select className="w-full p-2 border rounded-lg">
                            <option value="consumption">Consommation</option>
                            <option value="stock">Stock</option>
                            <option value="all">Complet</option>
                        </select>
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
                            onClick={handleGenerateReport}
                        >
                            Générer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Main content header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Journal des Mouvements</h1>
                        <p className="text-gray-600">Suivi des entrées et sorties de stock</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <button
                            onClick={handleExportMovements}
                            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            <span>Exporter</span>
                        </button>
                        <button
                            onClick={() => setActiveModal('report')}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <FileText className="w-4 h-4" />
                            <span>Rapport mensuel</span>
                        </button>
                    </div>
                </div>
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div>
                                <h2 className="text-lg font-medium text-gray-900">Centre de santé: Hôpital Général de Yaoundé</h2>
                                <p className="text-sm text-gray-500">
                                    Dernière synchronisation: {new Date(lastSync).toLocaleString()}
                                    {isOffline && (
                                        <span className="ml-2 text-red-500 flex items-center gap-1">
                                            <WifiOff className="w-4 h-4" /> Hors ligne
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleSync}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                <span>Synchroniser</span>
                            </button>
                            <button
                                onClick={() => setActiveModal('history')}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                            >
                                <History className="w-4 h-4" />
                                <span>Historique</span>
                            </button>
                            <button
                                onClick={handleBarcodeScan}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                            >
                                <Barcode className="w-4 h-4" />
                                <span>Scanner</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer (placed after header) */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                            <Package className="w-5 h-5 text-blue-500" />
                            <div>
                                <p className="font-medium text-gray-900">{stats.totalProducts}</p>
                                <p className="text-sm text-gray-500">Produits en stock</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            <div>
                                <p className="font-medium text-gray-900">{stats.activeAlerts}</p>
                                <p className="text-sm text-gray-500">Alertes actives</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-yellow-500" />
                            <div>
                                <p className="font-medium text-gray-900">{stats.expiringSoon}</p>
                                <p className="text-sm text-gray-500">Produits proches de péremption</p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Search and filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher par produit, lot ou responsable..."
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
                                <option value="all">Tous les mouvements</option>
                                <option value="entry">Entrées</option>
                                <option value="exit">Sorties</option>
                            </select>
                        </div>

                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="date"
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Movements table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50">
                        <div className="col-span-3 font-medium text-gray-700">Produit</div>
                        <div className="col-span-2 font-medium text-gray-700">Type</div>
                        <div className="col-span-2 font-medium text-gray-700">Date</div>
                        <div className="col-span-2 font-medium text-gray-700">Quantité</div>
                        <div className="col-span-3 font-medium text-gray-700">Responsable</div>
                    </div>

                    {currentMovements.length > 0 ? (
                        currentMovements.map((movement) => (
                            <div key={movement.id} className="border-b border-gray-200 last:border-b-0">
                                <div
                                    className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => setExpandedMovement(expandedMovement === movement.id ? null : movement.id)}
                                >
                                    <div className="col-span-3 flex items-center">
                                        <div className="font-medium text-gray-900">{movement.product}</div>
                                    </div>
                                    <div className="col-span-2 flex items-center gap-2">
                                        {movement.type === 'entry' ? (
                                            <ArrowUpCircle className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <ArrowDownCircle className="w-4 h-4 text-red-500" />
                                        )}
                                        <span>{movement.type === 'entry' ? 'Entrée' : 'Sortie'}</span>
                                    </div>
                                    <div className="col-span-2 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-blue-500" />
                                        <span>{movement.date}</span>
                                    </div>
                                    <div className="col-span-2 text-gray-700">{movement.quantity}</div>
                                    <div className="col-span-3 flex items-center justify-between">
                                        <span>{movement.responsible}</span>
                                        <ChevronDown
                                            className={`w-4 h-4 text-gray-400 transition-transform ${expandedMovement === movement.id ? 'rotate-180' : ''}`}
                                        />
                                    </div>
                                </div>

                                {expandedMovement === movement.id && (
                                    <div className="bg-gray-50 p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                                    <Package className="w-4 h-4 text-blue-500" />
                                                    Détails du mouvement
                                                </h3>
                                                <div className="space-y-2">
                                                    <p><span className="font-medium">ID:</span> {movement.id}</p>
                                                    <p><span className="font-medium">Numéro de lot:</span> {movement.lot}</p>
                                                    <p><span className="font-medium">Motif:</span> {movement.reason}</p>
                                                    <p><span className="font-medium">Lieu:</span> {movement.location}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                                    <BarChart2 className="w-4 h-4 text-purple-500" />
                                                    Statistiques
                                                </h3>
                                                <div className="space-y-2">
                                                    <p><span className="font-medium">Mouvements ce mois:</span> 25</p>
                                                    <p><span className="font-medium">Consommation moyenne:</span> 15 unités/jour</p>
                                                    <button
                                                        className="flex items-center gap-2 p-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded border border-purple-200 transition-colors"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveModal('report');
                                                        }}
                                                    >
                                                        <FileText className="w-4 h-4" />
                                                        <span className="text-sm">Voir tendances</span>
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
                            <p>Aucun mouvement trouvé</p>
                            <p className="text-sm">Essayez de modifier vos critères de recherche</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-6">
                    <div className="text-sm text-gray-500">
                        Affichage de {indexOfFirstMovement + 1} à {Math.min(indexOfLastMovement, filteredMovements.length)} sur {filteredMovements.length} mouvements
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
                            className={`px-3 py-1 border rounded ${currentPage === 1
                                    ? 'bg-blue-50 text-blue-600 border-blue-200'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                            onClick={() => setCurrentPage(1)}
                        >
                            1
                        </button>
                        {totalPages > 1 && (
                            <button
                                className={`px-3 py-1 border rounded ${currentPage === 2
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
                {activeModal === 'history' && (
                    <HistoryModal
                        onClose={() => setActiveModal(null)}
                    />
                )}

                {activeModal === 'report' && (
                    <ReportModal
                        onClose={() => setActiveModal(null)}
                    />
                )}

                {/* Toast */}
                {toastMessage && <Toast message={toastMessage} />}
            </div>
        </div>
    );
};

export default MovementsListPage;