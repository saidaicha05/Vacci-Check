"use client";
import React, { useState } from 'react';
import {
  Package, Search, Filter, AlertTriangle, CheckCircle, XCircle,
  Calendar, Download, RefreshCw, Plus, Edit, Eye, Trash2,
  BarChart3, Truck, Clock, X, FileText, ChevronDown, Bell,
  MapPin, User, Phone, Mail, Building, AlertCircle
} from 'lucide-react';

const SupplyPage = () => {
  // États pour la gestion des filtres et recherches
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // États pour la gestion des modals
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [activeModal, setActiveModal] = useState<'details' | 'new' | 'calendar' | null>(null);
  const [newOrder, setNewOrder] = useState({
    product: '',
    supplier: '',
    quantity: '',
    expectedDelivery: '',
    urgency: 'normal',
    justification: ''
  });

  // Données mock des commandes
  const allOrders = [
    {
      id: "CMD-2024-001",
      product: "Vaccin BCG",
      productId: "VAC001",
      supplier: "Institut Pasteur",
      quantity: 100,
      orderedDate: "2024-01-05",
      expectedDelivery: "2024-01-20",
      status: "pending",
      urgency: "normal",
      notes: "Commande standard",
      justification: "Renouvellement stock de routine",
      orderBy: "Dr. Mballa",
      supplierContact: {
        phone: "+237 222 345 678",
        email: "commandes@pasteur.cm",
        address: "Yaoundé, Cameroun"
      }
    },
    {
      id: "CMD-2024-002",
      product: "Vaccin Polio",
      productId: "VAC002",
      supplier: "Sanofi Pasteur",
      quantity: 50,
      orderedDate: "2024-01-08",
      expectedDelivery: "2024-01-15",
      status: "shipped",
      urgency: "urgent",
      notes: "Stock critique",
      justification: "Rupture de stock imminente",
      orderBy: "Dr. Nkomo",
      supplierContact: {
        phone: "+237 233 456 789",
        email: "orders@sanofi.cm",
        address: "Douala, Cameroun"
      }
    },
    {
      id: "CMD-2024-003",
      product: "Seringues 0.5ml",
      productId: "SYR001",
      supplier: "Terumo",
      quantity: 500,
      orderedDate: "2024-01-10",
      expectedDelivery: "2024-01-25",
      status: "preparing",
      urgency: "normal",
      notes: "",
      justification: "Augmentation des activités de vaccination",
      orderBy: "Mme Fouda",
      supplierContact: {
        phone: "+237 244 567 890",
        email: "supply@terumo.cm",
        address: "Yaoundé, Cameroun"
      }
    },
    {
      id: "CMD-2024-004",
      product: "Vaccin ROR",
      productId: "VAC003",
      supplier: "MSD",
      quantity: 30,
      orderedDate: "2024-01-12",
      expectedDelivery: "2024-01-18",
      status: "delivered",
      urgency: "urgent",
      notes: "Livraison partielle: 20 unités",
      justification: "Campagne de vaccination urgente",
      orderBy: "Dr. Atangana",
      supplierContact: {
        phone: "+237 255 678 901",
        email: "orders@msd.cm",
        address: "Douala, Cameroun"
      }
    },
    {
      id: "CMD-2024-005",
      product: "Paracétamol 500mg",
      productId: "MED001",
      supplier: "Pharma Cameroun",
      quantity: 200,
      orderedDate: "2024-01-15",
      expectedDelivery: "2024-01-30",
      status: "pending",
      urgency: "normal",
      notes: "",
      justification: "Renouvellement stock mensuel",
      orderBy: "Dr. Essomba",
      supplierContact: {
        phone: "+237 266 789 012",
        email: "ventes@pharma.cm",
        address: "Yaoundé, Cameroun"
      }
    },
    {
      id: "CMD-2024-006",
      product: "Antiseptique",
      productId: "MED002",
      supplier: "Laboratoire Central",
      quantity: 20,
      orderedDate: "2024-01-18",
      expectedDelivery: "2024-01-22",
      status: "shipped",
      urgency: "critical",
      notes: "Stock épuisé",
      justification: "Rupture de stock - urgence absolue",
      orderBy: "Dr. Mballa",
      supplierContact: {
        phone: "+237 277 890 123",
        email: "urgence@labcentral.cm",
        address: "Douala, Cameroun"
      }
    },
    {
      id: "CMD-2024-007",
      product: "Pansements stériles",
      productId: "SUP001",
      supplier: "Johnson & Johnson",
      quantity: 100,
      orderedDate: "2024-01-20",
      expectedDelivery: "2024-02-05",
      status: "preparing",
      urgency: "normal",
      notes: "",
      justification: "Préparation pour campagne de soins",
      orderBy: "Mme Fouda",
      supplierContact: {
        phone: "+237 288 901 234",
        email: "supply@jnj.cm",
        address: "Yaoundé, Cameroun"
      }
    },
    {
      id: "CMD-2024-008",
      product: "Vaccin Hépatite B",
      productId: "VAC004",
      supplier: "GSK",
      quantity: 80,
      orderedDate: "2024-01-22",
      expectedDelivery: "2024-02-10",
      status: "pending",
      urgency: "normal",
      notes: "Commande programmée",
      justification: "Planification trimestrielle",
      orderBy: "Dr. Nkomo",
      supplierContact: {
        phone: "+237 299 012 345",
        email: "orders@gsk.cm",
        address: "Douala, Cameroun"
      }
    }
  ];

  // Produits disponibles pour les nouvelles commandes
  const availableProducts = [
    { id: "VAC001", name: "Vaccin BCG" },
    { id: "VAC002", name: "Vaccin Polio" },
    { id: "VAC003", name: "Vaccin ROR" },
    { id: "VAC004", name: "Vaccin Hépatite B" },
    { id: "VAC005", name: "Vaccin DTC-Hib-HepB" },
    { id: "SYR001", name: "Seringues 0.5ml" },
    { id: "SYR002", name: "Seringues 1ml" },
    { id: "MED001", name: "Paracétamol 500mg" },
    { id: "MED002", name: "Antiseptique" },
    { id: "SUP001", name: "Pansements stériles" }
  ];

  // Fournisseurs disponibles
  const suppliers = [
    "Institut Pasteur",
    "Sanofi Pasteur",
    "MSD",
    "GSK",
    "Terumo",
    "Pharma Cameroun",
    "Laboratoire Central",
    "Johnson & Johnson"
  ];

  // Fonctions utilitaires
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilDelivery = (deliveryDate: string) => {
    const today = new Date();
    const delivery = new Date(deliveryDate);
    const diffTime = delivery.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 border-yellow-300 text-yellow-700';
      case 'preparing': return 'bg-blue-100 border-blue-300 text-blue-700';
      case 'shipped': return 'bg-orange-100 border-orange-300 text-orange-700';
      case 'delivered': return 'bg-green-100 border-green-300 text-green-700';
      default: return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'normal': return 'bg-green-100 border-green-300 text-green-700';
      case 'urgent': return 'bg-orange-100 border-orange-300 text-orange-700';
      case 'critical': return 'bg-red-100 border-red-300 text-red-700';
      default: return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'preparing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const isOrderLate = (order: any) => {
    const today = new Date();
    const expectedDelivery = new Date(order.expectedDelivery);
    return today > expectedDelivery && order.status !== 'delivered';
  };

  const getOverdueOrders = () => {
    return allOrders.filter(order => isOrderLate(order));
  };

  const generateOrderPDF = (order: any) => {
    // Simulation de génération PDF
    const orderData = {
      id: order.id,
      product: order.product,
      supplier: order.supplier,
      quantity: order.quantity,
      date: order.orderedDate,
      justification: order.justification,
      orderBy: order.orderBy
    };
    
    console.log('Génération du bon de commande PDF:', orderData);
    alert(`Bon de commande ${order.id} généré avec succès !`);
  };

  // Filtrer les commandes
  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Statistiques
  const totalOrders = allOrders.length;
  const pendingOrders = allOrders.filter(order => order.status === 'pending').length;
  const preparingOrders = allOrders.filter(order => order.status === 'preparing').length;
  const shippedOrders = allOrders.filter(order => order.status === 'shipped').length;
  const deliveredOrders = allOrders.filter(order => order.status === 'delivered').length;
  const overdueOrders = getOverdueOrders().length;

  // Soumission nouvelle commande
  const handleSubmitOrder = () => {
    if (!newOrder.product || !newOrder.supplier || !newOrder.quantity || !newOrder.expectedDelivery || !newOrder.justification) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newOrderData = {
      ...newOrder,
      id: `CMD-2024-${String(allOrders.length + 1).padStart(3, '0')}`,
      productId: availableProducts.find(p => p.name === newOrder.product)?.id || '',
      orderedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      notes: '',
      orderBy: 'Utilisateur actuel'
    };

    console.log('Nouvelle commande créée:', newOrderData);
    alert(`Commande ${newOrderData.id} créée avec succès !`);

    // Reset du formulaire
    setNewOrder({
      product: '',
      supplier: '',
      quantity: '',
      expectedDelivery: '',
      urgency: 'normal',
      justification: ''
    });
    setActiveModal(null);
  };

  // Composant Modal pour les détails
  const OrderDetailsModal = ({ order, onClose }: { order: any, onClose: () => void }) => (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold">Détails de la commande - {order.id}</h3>
            {isOrderLate(order) && (
              <div className="flex items-center gap-2 mt-2 text-red-600">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">Commande en retard</span>
              </div>
            )}
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informations de base */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 border-b pb-2">Informations de la commande</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Produit</label>
              <div className="p-2 bg-gray-50 rounded border">{order.product} ({order.productId})</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fournisseur</label>
              <div className="p-2 bg-gray-50 rounded border">{order.supplier}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de commande</label>
              <div className="p-2 bg-gray-50 rounded border">{formatDate(order.orderedDate)}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Commandé par</label>
              <div className="p-2 bg-gray-50 rounded border flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                {order.orderBy}
              </div>
            </div>
          </div>
          
          {/* Statut et urgence */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 border-b pb-2">Statut et priorité</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <div className={`p-2 rounded border flex items-center gap-2 ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                {order.status === 'pending' ? 'En attente' :
                 order.status === 'preparing' ? 'En préparation' :
                 order.status === 'shipped' ? 'Expédiée' : 'Livrée'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Urgence</label>
              <div className={`p-2 rounded border ${getUrgencyColor(order.urgency)}`}>
                {order.urgency === 'normal' ? 'Normale' : 
                 order.urgency === 'urgent' ? 'Urgente' : 'Critique'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantité commandée</label>
              <div className="p-2 bg-gray-50 rounded border">{order.quantity} unités</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Livraison prévue</label>
              <div className="p-2 bg-gray-50 rounded border flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-500" />
                {formatDate(order.expectedDelivery)}
                {getDaysUntilDelivery(order.expectedDelivery) <= 3 && (
                  <span className="text-red-500 ml-2">
                    ({getDaysUntilDelivery(order.expectedDelivery)} jours)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact fournisseur */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Building className="w-4 h-4" />
            Contact fournisseur
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>{order.supplierContact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>{order.supplierContact.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{order.supplierContact.address}</span>
            </div>
          </div>
        </div>
        
        {/* Justification */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Justification</label>
          <div className="p-3 bg-gray-50 rounded border text-sm">{order.justification}</div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <div className="p-3 bg-yellow-50 rounded border text-sm">{order.notes}</div>
          </div>
        )}
        
        {/* Historique */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Historique des mises à jour</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Commande créée</span>
              </div>
              <span className="text-gray-500">{formatDate(order.orderedDate)}</span>
            </div>
            
            {order.status === 'preparing' && (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>En préparation chez le fournisseur</span>
                </div>
                <span className="text-gray-500">{formatDate(order.orderedDate)}</span>
              </div>
            )}
            
            {order.status === 'shipped' && (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Expédiée par le fournisseur</span>
                </div>
                <span className="text-gray-500">{formatDate(order.orderedDate)}</span>
              </div>
            )}
            
            {order.status === 'delivered' && (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Livrée</span>
                </div>
                <span className="text-gray-500">{formatDate(order.orderedDate)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => generateOrderPDF(order)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Télécharger bon de commande
          </button>
          {order.status !== 'delivered' && (
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Actualiser statut
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Composant Modal pour nouvelle commande
  const NewOrderModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold">Nouvelle commande</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Produit *</label>
            <select
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={newOrder.product}
              onChange={(e) => setNewOrder({...newOrder, product: e.target.value})}
            >
              <option value="">Sélectionnez un produit</option>
              {availableProducts.map((product) => (
                <option key={product.id} value={product.name}>
                  {product.name} ({product.id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fournisseur *</label>
            <select
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={newOrder.supplier}
              onChange={(e) => setNewOrder({...newOrder, supplier: e.target.value})}
            >
              <option value="">Sélectionnez un fournisseur</option>
              {suppliers.map((supplier) => (
                <option key={supplier} value={supplier}>
                  {supplier}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quantité *</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={newOrder.quantity}
              onChange={(e) => setNewOrder({...newOrder, quantity: e.target.value})}
              placeholder="Nombre d'unités"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date de livraison prévue *</label>
            <input
              type="date"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={newOrder.expectedDelivery}
              onChange={(e) => setNewOrder({...newOrder, expectedDelivery: e.target.value})}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Urgence</label>
            <select
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={newOrder.urgency}
              onChange={(e) => setNewOrder({...newOrder, urgency: e.target.value})}
            >
              <option value="normal">Normale</option>
              <option value="urgent">Urgente</option>
              <option value="critical">Critique</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Justification *</label>
          <textarea
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            value={newOrder.justification}
            onChange={(e) => setNewOrder({...newOrder, justification: e.target.value})}
            placeholder="Expliquez la raison de cette commande..."
          />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleSubmitOrder}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Créer la commande
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );

  // Composant Modal pour le calendrier
  const CalendarModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold">Calendrier des livraisons</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          {allOrders
            .filter(order => order.status !== 'delivered')
            .sort((a, b) => new Date(a.expectedDelivery).getTime() - new Date(b.expectedDelivery).getTime())
            .map((order) => (
              <div key={order.id} className={`p-4 rounded-lg border-l-4 ${
                isOrderLate(order) ? 'border-red-500 bg-red-50' :
                getDaysUntilDelivery(order.expectedDelivery) <= 3 ? 'border-orange-500 bg-orange-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{order.product}</h4>
                    <p className="text-sm text-gray-600">{order.supplier} - {order.quantity} unités</p>
                    <p className="text-sm text-gray-600">Commande: {order.id}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{formatDate(order.expectedDelivery)}</span>
                    </div>
                    <div className={`text-sm px-2 py-1 rounded ${
                      isOrderLate(order) ? 'bg-red-100 text-red-700' :
                      getDaysUntilDelivery(order.expectedDelivery) <= 3 ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {isOrderLate(order) ? 'En retard' :
                       getDaysUntilDelivery(order.expectedDelivery) === 0 ? 'Aujourd\'hui' :
                       getDaysUntilDelivery(order.expectedDelivery) === 1 ? 'Demain' :
                       `Dans ${getDaysUntilDelivery(order.expectedDelivery)} jours`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header avec statistiques */}
      <div className="bg-white shadow-sm border-b rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Approvisionnements</h1>
              <p className="text-gray-600">Suivi des commandes et réapprovisionnements</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setActiveModal('calendar')}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Calendrier
              </button>
              <button
                onClick={() => setActiveModal('new')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Nouvelle commande
              </button>
            </div>
          </div>

          {/* Cartes de statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Total commandes</p>
                  <p className="text-2xl font-bold text-blue-700">{totalOrders}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600">En attente</p>
                  <p className="text-2xl font-bold text-yellow-700">{pendingOrders}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">En préparation</p>
                  <p className="text-2xl font-bold text-blue-700">{preparingOrders}</p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600">Expédiées</p>
                  <p className="text-2xl font-bold text-orange-700">{shippedOrders}</p>
                </div>
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Livrées</p>
                  <p className="text-2xl font-bold text-green-700">{deliveredOrders}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600">En retard</p>
                  <p className="text-2xl font-bold text-red-700">{overdueOrders}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alertes pour commandes en retard */}
      {overdueOrders > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="font-medium text-red-700">
                Attention : {overdueOrders} commande{overdueOrders > 1 ? 's' : ''} en retard
              </span>
            </div>
            <div className="mt-2 text-sm text-red-600">
              Vérifiez le statut de vos commandes et contactez les fournisseurs si nécessaire.
            </div>
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Liste des commandes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold mb-4">Commandes en cours</h2>
                
                {/* Filtres et recherche */}
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Rechercher une commande..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">Tous les statuts</option>
                      <option value="pending">En attente</option>
                      <option value="preparing">En préparation</option>
                      <option value="shipped">Expédiées</option>
                      <option value="delivered">Livrées</option>
                    </select>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tableau des commandes */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commande</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fournisseur</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantité</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Livraison</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{order.id}</span>
                            {isOrderLate(order) && (
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{formatDate(order.orderedDate)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{order.product}</div>
                          <div className="text-sm text-gray-500">{order.productId}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{order.supplier}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{order.quantity}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status === 'pending' ? 'En attente' :
                             order.status === 'preparing' ? 'En préparation' :
                             order.status === 'shipped' ? 'Expédiée' : 'Livrée'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{formatDate(order.expectedDelivery)}</div>
                          <div className={`text-xs ${
                            isOrderLate(order) ? 'text-red-600' :
                            getDaysUntilDelivery(order.expectedDelivery) <= 3 ? 'text-orange-600' :
                            'text-gray-500'
                          }`}>
                            {isOrderLate(order) ? 'En retard' :
                             getDaysUntilDelivery(order.expectedDelivery) === 0 ? 'Aujourd\'hui' :
                             getDaysUntilDelivery(order.expectedDelivery) === 1 ? 'Demain' :
                             `${getDaysUntilDelivery(order.expectedDelivery)} jours`}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setActiveModal('details');
                              }}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => generateOrderPDF(order)}
                              className="text-green-600 hover:text-green-800"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-6 border-t">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-700">
                      Affichage {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredOrders.length)} sur {filteredOrders.length} commandes
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                      >
                        Précédent
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 border rounded ${
                            currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                      >
                        Suivant
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Panneau latéral - Livraisons à venir */}
          <div className="space-y-6">
            {/* Livraisons imminentes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Livraisons imminentes</h3>
              <div className="space-y-3">
                {allOrders
                  .filter(order => order.status !== 'delivered' && getDaysUntilDelivery(order.expectedDelivery) <= 7)
                  .sort((a, b) => getDaysUntilDelivery(a.expectedDelivery) - getDaysUntilDelivery(b.expectedDelivery))
                  .slice(0, 5)
                  .map((order) => (
                    <div key={order.id} className={`p-3 rounded-lg border-l-4 ${
                      isOrderLate(order) ? 'border-red-500 bg-red-50' :
                      getDaysUntilDelivery(order.expectedDelivery) <= 3 ? 'border-orange-500 bg-orange-50' :
                      'border-blue-500 bg-blue-50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">{order.product}</h4>
                          <p className="text-xs text-gray-600">{order.supplier}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">{formatDate(order.expectedDelivery)}</div>
                          <div className={`text-xs font-medium ${
                            isOrderLate(order) ? 'text-red-600' :
                            getDaysUntilDelivery(order.expectedDelivery) <= 3 ? 'text-orange-600' :
                            'text-blue-600'
                          }`}>
                            {isOrderLate(order) ? 'En retard' :
                             getDaysUntilDelivery(order.expectedDelivery) === 0 ? 'Aujourd\'hui' :
                             getDaysUntilDelivery(order.expectedDelivery) === 1 ? 'Demain' :
                             `${getDaysUntilDelivery(order.expectedDelivery)}j`}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Historique récent */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Historique récent</h3>
              <div className="space-y-3">
                {allOrders
                  .filter(order => order.status === 'delivered')
                  .sort((a, b) => new Date(b.orderedDate).getTime() - new Date(a.orderedDate).getTime())
                  .slice(0, 3)
                  .map((order) => (
                    <div key={order.id} className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">{order.product}</h4>
                          <p className="text-xs text-gray-600">{order.supplier}</p>
                          <p className="text-xs text-gray-500">{order.quantity} unités</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-green-600 font-medium flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Livrée
                          </div>
                          <div className="text-xs text-gray-500">{formatDate(order.expectedDelivery)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setActiveModal('new')}
                  className="w-full flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Nouvelle commande
                </button>
                <button
                  onClick={() => setActiveModal('calendar')}
                  className="w-full flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Voir calendrier
                </button>
                <button className="w-full flex items-center gap-2 p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                  <FileText className="w-4 h-4" />
                  Rapport mensuel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'details' && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => {
            setActiveModal(null);
            setSelectedOrder(null);
          }}
        />
      )}

      {activeModal === 'new' && (
        <NewOrderModal
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'calendar' && (
        <CalendarModal
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
};

export default SupplyPage;