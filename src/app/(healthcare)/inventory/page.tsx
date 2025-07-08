"use client";
import React, { useState } from 'react';
import {
  Package, Search, Filter, AlertTriangle, CheckCircle, XCircle,
  Calendar, Download, RefreshCw, Plus, Edit, Eye, Trash2,
  BarChart3, TrendingDown, TrendingUp, Clock, X, FileText,
  Syringe, Pill, Thermometer, Bandage, Archive, ChevronDown
} from 'lucide-react';

const InventoryPage = () => {
  // États pour la gestion des filtres et recherches
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const itemsPerPage = 10;

  // États pour la gestion des modals
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<'details' | 'update' | 'export' | 'add' | null>(null);
  const [updateQuantity, setUpdateQuantity] = useState('');
  const [updateReason, setUpdateReason] = useState('');

  // Données mock de l'inventaire
  const allInventoryItems = [
    {
      id: "VAC001",
      name: "Vaccin BCG",
      category: "vaccine",
      lot: "BCG-2024-001",
      expiryDate: "2024-12-15",
      quantity: 45,
      threshold: 20,
      status: "normal",
      supplier: "Institut Pasteur",
      unitPrice: 15000,
      location: "Frigo A - Étagère 1",
      temperature: "2-8°C",
      lastUpdated: "2024-01-10"
    },
    {
      id: "VAC002",
      name: "Vaccin Polio",
      category: "vaccine",
      lot: "POL-2024-045",
      expiryDate: "2024-08-30",
      quantity: 8,
      threshold: 15,
      status: "alert",
      supplier: "Sanofi Pasteur",
      unitPrice: 12000,
      location: "Frigo A - Étagère 2",
      temperature: "2-8°C",
      lastUpdated: "2024-01-08"
    },
    {
      id: "VAC003",
      name: "Vaccin ROR",
      category: "vaccine",
      lot: "ROR-2024-023",
      expiryDate: "2024-07-20",
      quantity: 3,
      threshold: 10,
      status: "critical",
      supplier: "MSD",
      unitPrice: 18000,
      location: "Frigo B - Étagère 1",
      temperature: "2-8°C",
      lastUpdated: "2024-01-05"
    },
    {
      id: "VAC004",
      name: "Vaccin Hépatite B",
      category: "vaccine",
      lot: "HEP-2024-067",
      expiryDate: "2025-03-15",
      quantity: 67,
      threshold: 25,
      status: "normal",
      supplier: "GSK",
      unitPrice: 16000,
      location: "Frigo A - Étagère 3",
      temperature: "2-8°C",
      lastUpdated: "2024-01-12"
    },
    {
      id: "VAC005",
      name: "Vaccin DTC-Hib-HepB",
      category: "vaccine",
      lot: "DTC-2024-089",
      expiryDate: "2024-09-10",
      quantity: 12,
      threshold: 20,
      status: "alert",
      supplier: "Institut Pasteur",
      unitPrice: 22000,
      location: "Frigo B - Étagère 2",
      temperature: "2-8°C",
      lastUpdated: "2024-01-09"
    },
    {
      id: "SYR001",
      name: "Seringues 0.5ml",
      category: "supplies",
      lot: "SYR-2024-001",
      expiryDate: "2026-12-31",
      quantity: 500,
      threshold: 100,
      status: "normal",
      supplier: "Terumo",
      unitPrice: 150,
      location: "Armoire A - Étagère 1",
      temperature: "Température ambiante",
      lastUpdated: "2024-01-11"
    },
    {
      id: "SYR002",
      name: "Seringues 1ml",
      category: "supplies",
      lot: "SYR-2024-002",
      expiryDate: "2026-12-31",
      quantity: 45,
      threshold: 100,
      status: "alert",
      supplier: "Terumo",
      unitPrice: 200,
      location: "Armoire A - Étagère 2",
      temperature: "Température ambiante",
      lastUpdated: "2024-01-10"
    },
    {
      id: "MED001",
      name: "Paracétamol 500mg",
      category: "medication",
      lot: "PAR-2024-034",
      expiryDate: "2025-06-30",
      quantity: 200,
      threshold: 50,
      status: "normal",
      supplier: "Pharma Cameroun",
      unitPrice: 50,
      location: "Armoire B - Étagère 1",
      temperature: "Température ambiante",
      lastUpdated: "2024-01-08"
    },
    {
      id: "MED002",
      name: "Antiseptique",
      category: "supplies",
      lot: "ANT-2024-012",
      expiryDate: "2024-06-15",
      quantity: 2,
      threshold: 10,
      status: "critical",
      supplier: "Laboratoire Central",
      unitPrice: 3000,
      location: "Armoire C - Étagère 1",
      temperature: "Température ambiante",
      lastUpdated: "2024-01-07"
    },
    {
      id: "SUP001",
      name: "Pansements stériles",
      category: "supplies",
      lot: "PAN-2024-056",
      expiryDate: "2025-12-31",
      quantity: 150,
      threshold: 30,
      status: "normal",
      supplier: "Johnson & Johnson",
      unitPrice: 500,
      location: "Armoire A - Étagère 3",
      temperature: "Température ambiante",
      lastUpdated: "2024-01-09"
    }
  ];

  // Filtrer les éléments
  const filteredItems = allInventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lot.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeFilter === 'all' || item.category === activeFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Tri des éléments
  const sortedItems = [...filteredItems].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === 'expiryDate') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    if (sortBy === 'quantity' || sortBy === 'threshold') {
      aValue = parseInt(aValue);
      bValue = parseInt(bValue);
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  // Statistiques
  const totalItems = allInventoryItems.length;
  const criticalItems = allInventoryItems.filter(item => item.status === 'critical').length;
  const alertItems = allInventoryItems.filter(item => item.status === 'alert').length;
  const normalItems = allInventoryItems.filter(item => item.status === 'normal').length;

  // Composant Modal pour les détails
  const DetailsModal = ({ item, onClose }: { item: any, onClose: () => void }) => (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold">Détails - {item.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Produit</label>
              <div className="p-2 bg-gray-50 rounded border">{item.id}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de lot</label>
              <div className="p-2 bg-gray-50 rounded border">{item.lot}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fournisseur</label>
              <div className="p-2 bg-gray-50 rounded border">{item.supplier}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix unitaire</label>
              <div className="p-2 bg-gray-50 rounded border">{item.unitPrice.toLocaleString()} FCFA</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emplacement</label>
              <div className="p-2 bg-gray-50 rounded border">{item.location}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Température de stockage</label>
              <div className="p-2 bg-gray-50 rounded border">{item.temperature}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dernière mise à jour</label>
              <div className="p-2 bg-gray-50 rounded border">{item.lastUpdated}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Valeur totale</label>
              <div className="p-2 bg-gray-50 rounded border font-medium">
                {(item.quantity * item.unitPrice).toLocaleString()} FCFA
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium mb-2">Historique des mouvements</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Réception initiale</span>
              <span className="text-green-600">+{item.quantity + 20}</span>
            </div>
            <div className="flex justify-between">
              <span>Utilisation - Vaccination</span>
              <span className="text-red-600">-15</span>
            </div>
            <div className="flex justify-between">
              <span>Ajustement inventaire</span>
              <span className="text-blue-600">-5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Composant Modal pour mise à jour
  const UpdateModal = ({ item, onClose }: { item: any, onClose: () => void }) => (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Mise à jour stock - {item.name}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Quantité actuelle</label>
            <div className="p-2 bg-gray-50 rounded border">{item.quantity}</div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Nouvelle quantité</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg"
              value={updateQuantity}
              onChange={(e) => setUpdateQuantity(e.target.value)}
              placeholder="Entrez la nouvelle quantité"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Motif de la modification</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={updateReason}
              onChange={(e) => setUpdateReason(e.target.value)}
            >
              <option value="">Sélectionnez un motif</option>
              <option value="reception">Réception de stock</option>
              <option value="utilisation">Utilisation/Consommation</option>
              <option value="peremption">Retrait pour péremption</option>
              <option value="inventaire">Ajustement inventaire</option>
              <option value="autre">Autre</option>
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
              onClick={() => {
                // Logique de mise à jour
                onClose();
              }}
            >
              Mettre à jour
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Composant Modal pour export
  const ExportModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Exporter l'inventaire</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Format d'export</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="format" value="pdf" className="mr-2" defaultChecked />
                <FileText className="w-4 h-4 mr-2 text-red-500" />
                <span>PDF</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="format" value="excel" className="mr-2" />
                <FileText className="w-4 h-4 mr-2 text-green-500" />
                <span>Excel</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Données à inclure</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm">Informations de base</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm">Quantités et seuils</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Données financières</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Historique des mouvements</span>
              </label>
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
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={() => {
                // Logique d'export
                onClose();
              }}
            >
              Exporter
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Fonction pour obtenir l'icône de catégorie
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vaccine':
        return <Syringe className="w-4 h-4 text-blue-500" />;
      case 'medication':
        return <Pill className="w-4 h-4 text-green-500" />;
      case 'supplies':
        return <Package className="w-4 h-4 text-purple-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'alert':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'critical':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Fonction pour obtenir l'icône de statut
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'critical':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  // Fonction pour calculer les jours jusqu'à expiration
  const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header avec titre et actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Inventaire</h1>
            <p className="text-gray-600">Gestion des stocks de vaccins et matériel médical</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => setActiveModal('export')}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </button>
            <button
              onClick={() => {
                // Logique de mise à jour manuelle
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Mise à jour</span>
            </button>
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total produits</p>
                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stock normal</p>
                <p className="text-2xl font-bold text-green-600">{normalItems}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En alerte</p>
                <p className="text-2xl font-bold text-yellow-600">{alertItems}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-full">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critiques</p>
                <p className="text-2xl font-bold text-red-600">{criticalItems}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, lot ou ID..."
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
                <option value="all">Toutes catégories</option>
                <option value="vaccine">Vaccins</option>
                <option value="medication">Médicaments</option>
                <option value="supplies">Fournitures</option>
              </select>

              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tous statuts</option>
                <option value="normal">Normal</option>
                <option value="alert">Alerte</option>
                <option value="critical">Critique</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tableau d'inventaire */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* En-tête du tableau */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50">
            <div className="col-span-3 font-medium text-gray-700">Produit</div>
            <div className="col-span-2 font-medium text-gray-700">Lot / Expiration</div>
            <div className="col-span-2 font-medium text-gray-700">Quantité</div>
            <div className="col-span-2 font-medium text-gray-700">Seuil</div>
            <div className="col-span-2 font-medium text-gray-700">Statut</div>
            <div className="col-span-1 font-medium text-gray-700 text-center">Actions</div>
          </div>

          {/* Liste des produits */}
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50">
                <div className="col-span-3 flex items-center gap-3">
                  {getCategoryIcon(item.category)}
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.id}</div>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <div className="font-medium text-gray-900">{item.lot}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(item.expiryDate)}
                    {getDaysUntilExpiry(item.expiryDate) <= 30 && (
                      <span className="text-red-500">
                        ({getDaysUntilExpiry(item.expiryDate)}j)
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="col-span-2 flex items-center">
                  <div className="text-lg font-bold text-gray-900">{item.quantity}</div>
                  <div className="ml-2 text-sm text-gray-500">unités</div>
                </div>
                
                <div className="col-span-2 flex items-center">
                  <div className="text-sm text-gray-700">{item.threshold}</div>
                  <div className="ml-2 text-xs text-gray-500">min</div>
                </div>
                
                <div className="col-span-2 flex items-center">
                  <div className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full border ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                    <span>
                      {item.status === 'normal' ? 'Normal' :
                        item.status === 'alert' ? 'Alerte' : 'Critique'}
                    </span>
                  </div>
                </div>
                
                <div className="col-span-1 flex items-center justify-center gap-1">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setActiveModal('details');
                    }}
                    className="p-1 text-gray-500 hover:text-blue-600"
                    title="Voir détails"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setActiveModal('update');
                    }}
                    className="p-1 text-gray-500 hover:text-green-600"
                    title="Modifier"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              Aucun produit trouvé avec ces critères de recherche
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center p-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredItems.length)} sur {filteredItems.length} produits
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 border rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Précédent
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 border rounded ${currentPage === pageNum ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="px-3 py-1">...</span>
                  )}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {totalPages}
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  Suivant
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bouton d'ajout en bas à droite */}
        <button
          onClick={() => setActiveModal('add')}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Modals */}
      {activeModal === 'details' && selectedItem && (
        <DetailsModal item={selectedItem} onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'update' && selectedItem && (
        <UpdateModal item={selectedItem} onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'export' && (
        <ExportModal onClose={() => setActiveModal(null)} />
      )}

      {/* Modal d'ajout (similaire au modal de mise à jour mais avec des champs vides) */}
      {activeModal === 'add' && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Ajouter un nouveau produit</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nom du produit</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Entrez le nom du produit"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Catégorie</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option value="">Sélectionnez</option>
                    <option value="vaccine">Vaccin</option>
                    <option value="medication">Médicament</option>
                    <option value="supplies">Fourniture</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Numéro de lot</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Entrez le numéro de lot"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Quantité</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Quantité initiale"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Seuil d'alerte</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Seuil minimum"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Date d'expiration</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button 
                  className="px-4 py-2 border rounded-lg text-gray-700"
                  onClick={() => setActiveModal(null)}
                >
                  Annuler
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => {
                    // Logique d'ajout
                    setActiveModal(null);
                  }}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;