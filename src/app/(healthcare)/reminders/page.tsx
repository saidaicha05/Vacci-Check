"use client"
import React, { useState, useEffect } from 'react';
import {
    Search, Download, Filter, ChevronDown, Bell, User, Calendar,
    BarChart2, RefreshCw, WifiOff, Barcode, History, FileText, X,
    CheckCircle, MessageSquare, Smartphone, Mail,
    Settings,
    Clock,
    Package
} from 'lucide-react';
import Link from 'next/link';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';

const RemindersListPage = () => {
    // States for filters, search, and modals
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [centerFilter, setCenterFilter] = useState('all');
    const [periodFilter, setPeriodFilter] = useState('all');
    const [vaccineFilter, setVaccineFilter] = useState('all');
    const [expandedReminder, setExpandedReminder] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isOffline, setIsOffline] = useState(false);
    const [lastSync, setLastSync] = useState(new Date().toISOString());
    const [localChanges, setLocalChanges] = useState<string[]>([]);
    const [activeModal, setActiveModal] = useState<'history' | 'config' | 'stats' | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const remindersPerPage = 5;

    // Mock reminder data
    const reminders = [
        {
            id: "REM001",
            patient: "Marie Ngono",
            vaccine: "BCG",
            date: "2025-07-10",
            status: "pending",
            channel: "sms",
            read: false,
            center: "Hôpital Général de Yaoundé",
            region: "Centre"
        },
        {
            id: "REM002",
            patient: "Jean Mbarga",
            vaccine: "Polio",
            date: "2025-07-12",
            status: "sent",
            channel: "push",
            read: true,
            center: "Hôpital Général de Yaoundé",
            region: "Centre"
        },
        {
            id: "REM003",
            patient: "Sophie Biya",
            vaccine: "ROR",
            date: "2025-07-15",
            status: "pending",
            channel: "ussd",
            read: false,
            center: "Centre Médical de Douala",
            region: "Littoral"
        },
        {
            id: "REM004",
            patient: "Paul Biya",
            vaccine: "Hépatite B",
            date: "2025-07-08",
            status: "sent",
            channel: "email",
            read: true,
            center: "Hôpital Général de Yaoundé",
            region: "Centre"
        },
        {
            id: "REM005",
            patient: "Alice Ngo",
            vaccine: "DTC",
            date: "2025-07-20",
            status: "pending",
            channel: "sms",
            read: false,
            center: "Centre Médical de Douala",
            region: "Littoral"
        }
    ];

    // Mock statistics
    const stats = {
        totalProducts: 125,
        activeAlerts: 4,
        expiringSoon: 8,
        openRate: 75,
        conversionRate: 60
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

    // Handle export reminders
    const handleExportReminders = () => {
        const exportData = filteredReminders.map(reminder => ({
            id: reminder.id,
            patient: reminder.patient,
            vaccine: reminder.vaccine,
            date: reminder.date,
            status: reminder.status === 'sent' ? 'Envoyé' : 'En attente',
            channel: reminder.channel,
            read: reminder.read ? 'Lu' : 'Non lu',
            center: reminder.center,
            region: reminder.region
        }));

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `reminders_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);

        setLocalChanges([...localChanges, `Rappels exportés à ${new Date().toLocaleString()}`]);
        setToastMessage('Rappels exportés avec succès');
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Handle resend reminder
    const handleResendReminder = (reminderId: string) => {
        console.log(`Resending reminder ${reminderId}`);
        setLocalChanges([...localChanges, `Rappel ${reminderId} renvoyé à ${new Date().toLocaleString()}`]);
        setToastMessage('Rappel renvoyé avec succès');
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Filter reminders
    const filteredReminders = reminders.filter(reminder => {
        const matchesSearch = reminder.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reminder.vaccine.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCenter = centerFilter === 'all' || reminder.center === centerFilter;
        const matchesVaccine = vaccineFilter === 'all' || reminder.vaccine === vaccineFilter;

        const today = new Date();
        const reminderDate = new Date(reminder.date);
        const matchesPeriod = periodFilter === 'all' ||
            (periodFilter === '7d' && reminderDate <= new Date(today.setDate(today.getDate() + 7))) ||
            (periodFilter === '30d' && reminderDate <= new Date(today.setDate(today.getDate() + 30)));

        return matchesSearch && matchesCenter && matchesVaccine && matchesPeriod;
    });

    // Pagination
    const indexOfLastReminder = currentPage * remindersPerPage;
    const indexOfFirstReminder = indexOfLastReminder - remindersPerPage;
    const currentReminders = filteredReminders.slice(indexOfFirstReminder, indexOfLastReminder);
    const totalPages = Math.ceil(filteredReminders.length / remindersPerPage);

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

    // Configuration modal
    const ConfigModal = ({ onClose }: { onClose: () => void }) => (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Configuration des rappels</h3>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Canaux de notification</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['sms', 'ussd', 'push', 'email'].map((channel) => (
                                <div key={channel} className="flex items-center gap-2">
                                    <input type="checkbox" id={channel} className="w-4 h-4" defaultChecked />
                                    <label htmlFor={channel} className="text-sm capitalize flex items-center gap-1">
                                        {channel === 'sms' && <MessageSquare className="w-4 h-4 text-blue-500" />}
                                        {channel === 'ussd' && <Smartphone className="w-4 h-4 text-green-500" />}
                                        {channel === 'push' && <Bell className="w-4 h-4 text-purple-500" />}
                                        {channel === 'email' && <Mail className="w-4 h-4 text-red-500" />}
                                        {channel}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Fréquence des rappels</label>
                        <select className="w-full p-2 border rounded-lg">
                            <option value="1">1 rappel</option>
                            <option value="2">2 rappels espacés</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Langue du contenu</label>
                        <select className="w-full p-2 border rounded-lg">
                            <option value="fr">Français</option>
                            <option value="en">Anglais</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Contenu du message</label>
                        <textarea
                            className="w-full p-2 border rounded-lg"
                            rows={4}
                            placeholder="Entrez le modèle de message..."
                            defaultValue="Rappel : Votre vaccination {vaccine} est prévue le {date} à {center}."
                        />
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
                                setLocalChanges([...localChanges, `Configuration des rappels modifiée à ${new Date().toLocaleString()}`]);
                                setToastMessage('Configuration enregistrée avec succès');
                                setTimeout(() => setToastMessage(null), 3000);
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

    // Statistics modal
    const StatsModal = ({ onClose }: { onClose: () => void }) => (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold">Statistiques des rappels</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                            <BarChart2 className="w-4 h-4 text-blue-500" />
                            Taux d'ouverture
                        </h4>
                        <p><span className="font-medium">SMS:</span> 80%</p>
                        <p><span className="font-medium">USSD:</span> 65%</p>
                        <p><span className="font-medium">Push:</span> 75%</p>
                        <p><span className="font-medium">Email:</span> 70%</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                            <BarChart2 className="w-4 h-4 text-green-500" />
                            Taux de conversion
                        </h4>
                        <p><span className="font-medium">Global:</span> {stats.conversionRate}%</p>
                        <p><span className="font-medium">Centre:</span> 62%</p>
                        <p><span className="font-medium">Littoral:</span> 58%</p>
                        <p><span className="font-medium">Nord:</span> 55%</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:py-2">
            <div className="max-w-7xl mx-auto">
                {/* Main content header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Gestion des Rappels</h1>
                        <p className="text-gray-600">Suivi des notifications vaccinales</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <button
                            onClick={handleExportReminders}
                            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            <span>Exporter</span>
                        </button>
                        <button
                            onClick={() => setActiveModal('config')}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <Settings className="w-4 h-4" />
                            <span>Configurer</span>
                        </button>
                        <button
                            onClick={() => setActiveModal('stats')}
                            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <BarChart2 className="w-4 h-4" />
                            <span>Statistiques</span>
                        </button>
                    </div>
                </div>


                {/* Search and filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher par patient ou vaccin..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-500" />
                            <select
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={centerFilter}
                                onChange={(e) => setCenterFilter(e.target.value)}
                            >
                                <option value="all">Tous les centres</option>
                                <option value="Hôpital Général de Yaoundé">Hôpital Général de Yaoundé</option>
                                <option value="Centre Médical de Douala">Centre Médical de Douala</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="text-gray-500" />
                            <select
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={periodFilter}
                                onChange={(e) => setPeriodFilter(e.target.value)}
                            >
                                <option value="all">Toutes périodes</option>
                                <option value="7d">7 jours</option>
                                <option value="30d">30 jours</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-500" />
                            <select
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={vaccineFilter}
                                onChange={(e) => setVaccineFilter(e.target.value)}
                            >
                                <option value="all">Tous vaccins</option>
                                <option value="BCG">BCG</option>
                                <option value="Polio">Polio</option>
                                <option value="ROR">ROR</option>
                                <option value="Hépatite B">Hépatite B</option>
                                <option value="DTC">DTC</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Reminders table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50">
                        <div className="col-span-3 font-medium text-gray-700">Patient</div>
                        <div className="col-span-2 font-medium text-gray-700">Vaccin</div>
                        <div className="col-span-2 font-medium text-gray-700">Date</div>
                        <div className="col-span-2 font-medium text-gray-700">Centre</div>
                        <div className="col-span-3 font-medium text-gray-700 text-right">Statut</div>
                    </div>

                    {currentReminders.length > 0 ? (
                        currentReminders.map((reminder) => (
                            <div key={reminder.id} className="border-b border-gray-200 last:border-b-0">
                                <div
                                    className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => setExpandedReminder(expandedReminder === reminder.id ? null : reminder.id)}
                                >
                                    <div className="col-span-3 flex items-center">
                                        <div className="font-medium text-gray-900">{reminder.patient}</div>
                                    </div>
                                    <div className="col-span-2 text-gray-700">{reminder.vaccine}</div>
                                    <div className="col-span-2 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-blue-500" />
                                        <span>{reminder.date}</span>
                                    </div>
                                    <div className="col-span-2 text-gray-700">{reminder.center}</div>
                                    <div className="col-span-3 flex items-center justify-end gap-2">
                                        <span className={`px-2 py-1 text-xs rounded-full border ${reminder.status === 'sent'
                                                ? 'bg-green-50 text-green-700 border-green-200'
                                                : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                            }`}>
                                            {reminder.status === 'sent' ? 'Envoyé' : 'En attente'}
                                        </span>
                                        <ChevronDown
                                            className={`w-4 h-4 text-gray-400 transition-transform ${expandedReminder === reminder.id ? 'rotate-180' : ''}`}
                                        />
                                    </div>
                                </div>

                                {expandedReminder === reminder.id && (
                                    <div className="bg-gray-50 p-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                                    <Bell className="w-4 h-4 text-blue-500" />
                                                    Détails du rappel
                                                </h3>
                                                <div className="space-y-2">
                                                    <p><span className="font-medium">ID:</span> {reminder.id}</p>
                                                    <p><span className="font-medium">Patient:</span> {reminder.patient}</p>
                                                    <p><span className="font-medium">Canal:</span> {reminder.channel.toUpperCase()}</p>
                                                    <p><span className="font-medium">Statut lecture:</span> {reminder.read ? 'Lu' : 'Non lu'}</p>
                                                    <p><span className="font-medium">Région:</span> {reminder.region}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                                    <Settings className="w-4 h-4 text-purple-500" />
                                                    Actions
                                                </h3>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <button
                                                        className="flex items-center gap-2 p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded border border-blue-200 transition-colors"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleResendReminder(reminder.id);
                                                        }}
                                                    >
                                                        <Bell className="w-4 h-4" />
                                                        <span className="text-sm">Renvoyer</span>
                                                    </button>
                                                    <button
                                                        className="flex items-center gap-2 p-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded border border-purple-200 transition-colors"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveModal('stats');
                                                        }}
                                                    >
                                                        <BarChart2 className="w-4 h-4" />
                                                        <span className="text-sm">Statistiques</span>
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
                            <p>Aucun rappel trouvé</p>
                            <p className="text-sm">Essayez de modifier vos critères de recherche</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-6">
                    <div className="text-sm text-gray-500">
                        Affichage de {indexOfFirstReminder + 1} à {Math.min(indexOfLastReminder, filteredReminders.length)} sur {filteredReminders.length} rappels
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

                {activeModal === 'config' && (
                    <ConfigModal
                        onClose={() => setActiveModal(null)}
                    />
                )}

                {activeModal === 'stats' && (
                    <StatsModal
                        onClose={() => setActiveModal(null)}
                    />
                )}

                {/* Toast */}
                {toastMessage && <Toast message={toastMessage} />}
            </div>
        </div>
    );
};

export default RemindersListPage;