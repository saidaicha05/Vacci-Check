'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  RefreshCw, 
  User, 
  Settings,
  LogOut,
  ChevronDown,
  Wifi,
  WifiOff,
  Clock,
  MapPin,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'stock' | 'appointment' | 'sync' | 'adverse';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface HealthcareHeaderProps {
  userInfo?: {
    name: string;
    role: string;
    facility: string;
    avatar?: string;
  };
}

export default function HealthcareHeader({ 
  userInfo = {
    name: "Dr. Marie Dupont",
    role: "Médecin",
    facility: "Centre de Santé de Douala",
    avatar: "/api/placeholder/40/40"
  }
}: HealthcareHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [lastSync, setLastSync] = useState('Il y a 5 minutes');
  const [isSyncing, setIsSyncing] = useState(false);

  // Notifications fictives
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'stock',
      title: 'Stock faible',
      message: 'Vaccin ROR : 5 doses restantes',
      time: '2 min',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'appointment',
      title: 'Rendez-vous',
      message: 'Patient Jean Mbarga - 14h30',
      time: '15 min',
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'sync',
      title: 'Synchronisation',
      message: 'Données synchronisées avec DHIS2',
      time: '1 h',
      read: true,
      priority: 'low'
    },
    {
      id: '4',
      type: 'adverse',
      title: 'Effet secondaire',
      message: 'Nouveau signalement à vérifier',
      time: '2 h',
      read: false,
      priority: 'high'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSync = async () => {
    setIsSyncing(true);
    // Simulation de synchronisation
    setTimeout(() => {
      setIsSyncing(false);
      setLastSync('À l\'instant');
    }, 3000);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'stock':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'appointment':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'sync':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'adverse':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Section gauche - Recherche */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher un patient, vaccin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Section droite - Actions et profil */}
        <div className="flex items-center space-x-4">
          {/* Status de connexion */}
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <div className="flex items-center space-x-1 text-green-600">
                <Wifi className="w-4 h-4" />
                <span className="text-sm">En ligne</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-red-600">
                <WifiOff className="w-4 h-4" />
                <span className="text-sm">Hors ligne</span>
              </div>
            )}
          </div>

          {/* Synchronisation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className={`p-2 rounded-lg transition-colors ${
                isSyncing 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Synchroniser avec DHIS2"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            </button>
            <span className="text-xs text-gray-500">
              Sync: {lastSync}
            </span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      Aucune notification
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={`p-3 border-l-4 ${getPriorityColor(notification.priority)} ${
                          !notification.read ? 'bg-blue-50' : 'bg-white'
                        } hover:bg-gray-50 cursor-pointer transition-colors`}
                      >
                        <div className="flex items-start space-x-3">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className={`text-sm font-medium ${
                                !notification.read ? 'text-gray-900' : 'text-gray-600'
                              }`}>
                                {notification.title}
                              </p>
                              <span className="text-xs text-gray-500">
                                {notification.time}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-3 border-t border-gray-200">
                  <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800">
                    Voir toutes les notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Menu utilisateur */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {userInfo.avatar ? (
                  <img
                    src={userInfo.avatar}
                    alt={userInfo.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800">{userInfo.name}</p>
                  <p className="text-xs text-gray-500">{userInfo.role}</p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-3 border-b border-gray-200">
                  <p className="font-medium text-gray-800">{userInfo.name}</p>
                  <p className="text-sm text-gray-600">{userInfo.role}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <p className="text-xs text-gray-500">{userInfo.facility}</p>
                  </div>
                </div>
                <div className="py-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <User className="w-4 h-4" />
                    <span>Mon profil</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Paramètres</span>
                  </button>
                </div>
                <div className="border-t border-gray-200 py-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}