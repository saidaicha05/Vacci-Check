"use client"
import React, { useState, useEffect } from 'react';
import {
  AlertTriangle, Search, Settings, Download, Bell, Archive,
  Calendar, Clock, Package, X, ChevronDown, Filter, CheckCircle,
  FileText, RefreshCw, WifiOff, Barcode, History,
  RotateCcw
} from 'lucide-react';
import Link from 'next/link';

const AlertsListPage = () => {
  // States for filters, search, and modals
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOffline, setIsOffline] = useState(false);
  const [lastSync, setLastSync] = useState(new Date().toISOString());
  const [localChanges, setLocalChanges] = useState<string[]>([]);
  const [alerts, setAlerts] = useState([
    {
      id: "ALRT001",
      type: "critical_stock",
      product: "Vaccin BCG",
      details: "Stock restant: 5 unités (seuil: 10)",
      date: "2025-07-07",
      status: "active",
      resolved: false,
      priority: "high",
      location: "Entrepôt A"
    },
    {
      id: "ALRT002",
      type: "expired_product",
      product: "Vaccin Polio",
      details: "Date d'expiration: 2025-06-30",
      date: "2025-07-06",
      status: "active",
      resolved: false,
      priority: "urgent",
      location: "Entrepôt B"
    },
    {
      id: "ALRT003",
      type: "inventory_discrepancy",
      product: "Vaccin ROR",
      details: "Différence: 20 unités manquantes",
      date: "2025-07-05",
      status: "active",
      resolved: false,
      priority: "medium",
      location: "Entrepôt A"
    },
    {
      id: "ALRT004",
      type: "late_order",
      product: "Vaccin Hépatite B",
      details: "Commande #CMD123 en retard de 3 jours",
      date: "2025-07-04",
      status: "active",
      resolved: false,
      priority: "high",
      location: "Fournisseur"
    },
    {
      id: "ALRT005",
      type: "critical_stock",
      product: "Vaccin DTC",
      details: "Stock restant: 8 unités (seuil: 15)",
      date: "2025-07-03",
      status: "resolved",
      resolved: true,
      priority: "high",
      location: "Entrepôt C"
    }
  ]);
  const alertsPerPage = 5;
  const [activeModal, setActiveModal] = useState<'threshold' | 'archives' | 'history' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mock statistics
  const stats = {
    totalProducts: 125,
    activeAlerts: alerts.filter(a => !a.resolved).length,
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
    // Simulate barcode scanning
    console.log('Initiating barcode scan');
    setToastMessage('Scanner de code-barres lancé');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter alerts
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' ||
      (activeFilter === 'critical_stock' && alert.type === 'critical_stock') ||
      (activeFilter === 'expired_product' && alert.type === 'expired_product') ||
      (activeFilter === 'inventory_discrepancy' && alert.type === 'inventory_discrepancy') ||
      (activeFilter === 'late_order' && alert.type === 'late_order');

    return matchesSearch && matchesFilter && !alert.resolved;
  });

  // Pagination
  const indexOfLastAlert = currentPage * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = filteredAlerts.slice(indexOfFirstAlert, indexOfLastAlert);
  const totalPages = Math.ceil(filteredAlerts.length / alertsPerPage);

  // Handle mark as resolved
  const handleMarkResolved = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true, status: 'resolved' } : alert
    ));
    setLocalChanges([...localChanges, `Alerte ${alertId} marquée comme résolue à ${new Date().toLocaleString()}`]);
    setToastMessage('Alerte marquée comme résolue avec succès');
    setTimeout(() => setToastMessage(null), 3000);
    setExpandedAlert(null);
  };

  // Handle export alert
  const handleExportAlert = (alert: any) => {
    const exportData = {
      id: alert.id,
      type: getAlertTypeLabel(alert.type),
      product: alert.product,
      details: alert.details,
      date: alert.date,
      location: alert.location,
      priority: alert.priority
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `alert_${alert.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    setLocalChanges([...localChanges, `Alerte ${alert.id} exportée à ${new Date().toLocaleString()}`]);
    setToastMessage('Alerte exportée avec succès');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle send notification
  const handleSendNotification = (alert: any) => {
    console.log(`Sending push notification for alert ${alert.id}`);
    setLocalChanges([...localChanges, `Notification envoyée pour alerte ${alert.id} à ${new Date().toLocaleString()}`]);
    setToastMessage('Notification push envoyée avec succès');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toast component
  const Toast = ({ message }: { message: string }) => (
    <div className="fixed top-40 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
      <CheckCircle className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );

  // Threshold configuration modal
  const ThresholdModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Configurer les seuils d'alerte</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Seuil de stock minimum</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg"
              placeholder="Ex: 10 unités"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Délai d'alerte d'expiration</label>
            <select className="w-full p-2 border rounded-lg">
              <option value="30">30 jours avant expiration</option>
              <option value="60">60 jours avant expiration</option>
              <option value="90">90 jours avant expiration</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <input type="checkbox" id="pushNotifications" className="w-4 h-4" />
            <label htmlFor="pushNotifications" className="text-sm">
              Activer les notifications push
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
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => {
                setLocalChanges([...localChanges, `Seuils d'alerte modifiés à ${new Date().toLocaleString()}`]);
                setToastMessage('Seuils configurés avec succès');
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

  // Archives modal
  const ArchivesModal = ({ onClose }: { onClose: () => void }) => {
    const resolvedAlerts = alerts.filter(alert => alert.resolved);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold">Alertes résolues</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Alerte</th>
                  <th className="text-left py-2">Type</th>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Lieu</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {resolvedAlerts.map((alert) => (
                  <tr key={alert.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">
                      <div className="font-medium">{alert.product}</div>
                      <div className="text-xs text-gray-500">{alert.id}</div>
                    </td>
                    <td className="py-2">{getAlertTypeLabel(alert.type)}</td>
                    <td className="py-2">{alert.date}</td>
                    <td className="py-2">{alert.location}</td>
                    <td className="py-2">
                      <button 
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          setAlerts(alerts.map(a => 
                            a.id === alert.id ? { ...a, resolved: false, status: 'active' } : a
                          ));
                          setLocalChanges([...localChanges, `Alerte ${alert.id} réactivée à ${new Date().toLocaleString()}`]);
                          setToastMessage('Alerte réactivée avec succès');
                          setTimeout(() => setToastMessage(null), 3000);
                        }}
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span className="text-sm">Réactiver</span>
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

  // Get alert type label
  const getAlertTypeLabel = (type: string) => {
    switch (type) {
      case 'critical_stock': return 'Stock critique';
      case 'expired_product': return 'Produit périmé';
      case 'inventory_discrepancy': return 'Disparité inventaire';
      case 'late_order': return 'Commande en retard';
      default: return type;
    }
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-2">
      <div className="max-w-7xl mx-auto">

        {/* Main content header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Gestion des Alertes</h1>
            <p className="text-gray-600">Suivi des alertes liées aux stocks</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => setActiveModal('archives')}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              <Archive className="w-4 h-4" />
              <span>Alertes résolues</span>
            </button>
            <button
              onClick={() => setActiveModal('threshold')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Configurer seuils</span>
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
        {/* Stat */}
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray conversion error: TypeError: Cannot read properties of undefined (reading 'type')
gray-400" />
              <input
                type="text"
                placeholder="Rechercher par produit ou ID alerte..."
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
                <option value="all">Toutes les alertes</option>
                <option value="critical_stock">Stocks critiques</option>
                <option value="expired_product">Produits périmés</option>
                <option value="inventory_discrepancy">Disparités</option>
                <option value="late_order">Commandes en retard</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alerts table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50">
            <div className="col-span-3 font-medium text-gray-700">Alerte</div>
            <div className="col-span-2 font-medium text-gray-700">Type</div>
            <div className="col-span-2 font-medium text-gray-700">Date</div>
            <div className="col-span-2 font-medium text-gray-700">Lieu</div>
            <div className="col-span-3 font-medium text-gray-700 text-right">Priorité</div>
          </div>

          {currentAlerts.length > 0 ? (
            currentAlerts.map((alert) => (
              <div key={alert.id} className="border-b border-gray-200 last:border-b-0">
                <div
                  className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                >
                  <div className="col-span-3 flex items-center">
                    <div className="font-medium text-gray-900">{alert.product}</div>
                  </div>
                  <div className="col-span-2 text-gray-700">
                    {getAlertTypeLabel(alert.type)}
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>{alert.date}</span>
                  </div>
                  <div className="col-span-2 text-gray-700">{alert.location}</div>
                  <div className="col-span-3 flex items-center justify-end gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(alert.priority)}`}>
                      {alert.priority === 'urgent' ? 'Urgent' : alert.priority === 'high' ? 'Élevé' : 'Moyen'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${expandedAlert === alert.id ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>

                {expandedAlert === alert.id && (
                  <div className="bg-gray-50 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          Détails de l'alerte
                        </h3>
                        <div className="space-y-2">
                          <p><span className="font-medium">ID:</span> {alert.id}</p>
                          <p><span className="font-medium">Détails:</span> {alert.details}</p>
                          <p><span className="font-medium">Date:</span> {alert.date}</p>
                          <p><span className="font-medium">Lieu:</span> {alert.location}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <Settings className="w-4 h-4 text-blue-500" />
                          Actions
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            className="flex items-center gap-2 p-2 bg-green-50 hover:bg-green-100 text-green-700 rounded border border-green-200 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkResolved(alert.id);
                            }}
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">Marquer comme résolu</span>
                          </button>
                          <button
                            className="flex items-center gap-2 p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded border border-blue-200 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExportAlert(alert);
                            }}
                          >
                            <Download className="w-4 h-4" />
                            <span className="text-sm">Exporter</span>
                          </button>
                          <button
                            className="flex items-center gap-2 p-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded border border-purple-200 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSendNotification(alert);
                            }}
                          >
                            <Bell className="w-4 h-4" />
                            <span className="text-sm">Envoyer notification</span>
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
              <p>Aucune alerte trouvée</p>
              <p className="text-sm">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Affichage de {indexOfFirstAlert + 1} à {Math.min(indexOfLastAlert, filteredAlerts.length)} sur {filteredAlerts.length} alertes
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
        {activeModal === 'threshold' && (
          <ThresholdModal
            onClose={() => setActiveModal(null)}
          />
        )}

        {activeModal === 'archives' && (
          <ArchivesModal
            onClose={() => setActiveModal(null)}
          />
        )}

        {activeModal === 'history' && (
          <HistoryModal
            onClose={() => setActiveModal(null)}
          />
        )}

        {/* Toast */}
        {toastMessage && <Toast message={toastMessage} />}
      </div>
    </div>
  );
};

export default AlertsListPage;