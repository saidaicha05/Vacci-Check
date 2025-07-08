"use client"
import React, { useState } from 'react';
import {
    Calendar, Syringe, Bell, Plus,
    ChevronLeft, ChevronRight, Clock, Users,
    AlertTriangle, CheckCircle, X, Eye,
    MapPin, User, Building2, Filter
} from 'lucide-react';
import Link from 'next/link';

const VaccineCalendarPage = () => {
    // État pour la date actuelle
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState('month'); // 'month', 'week', 'day'
    const [showCampaignModal, setShowCampaignModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Données simulées pour les vaccinations programmées
    const vaccinationEvents = [
        {
            id: 1,
            type: 'individual',
            patientName: 'Marie Ngono',
            patientAge: '2 ans',
            vaccine: 'ROR',
            date: '2024-07-10',
            time: '09:00',
            healthCenter: 'Hôpital Central de Yaoundé',
            status: 'scheduled',
            priority: 'normal',
            reminder: true
        },
        {
            id: 2,
            type: 'individual',
            patientName: 'Jean Mballa',
            patientAge: '4 mois',
            vaccine: 'DTC',
            date: '2024-07-12',
            time: '10:30',
            healthCenter: 'Hôpital Général de Douala',
            status: 'overdue',
            priority: 'high',
            reminder: true
        },
        {
            id: 3,
            type: 'campaign',
            title: 'Campagne Polio',
            description: 'Campagne de vaccination contre la poliomyélite',
            date: '2024-07-15',
            time: '08:00',
            location: 'Région du Nord',
            targetPopulation: '0-5 ans',
            expectedCount: 1200,
            status: 'scheduled',
            priority: 'high'
        },
        {
            id: 4,
            type: 'individual',
            patientName: 'Fatima Alim',
            patientAge: '9 mois',
            vaccine: 'ROR',
            date: '2024-07-18',
            time: '14:00',
            healthCenter: 'Centre de Santé Intégré de Garoua',
            status: 'scheduled',
            priority: 'normal',
            reminder: true
        },
        {
            id: 5,
            type: 'campaign',
            title: 'Campagne Rougeole',
            description: 'Vaccination de masse contre la rougeole',
            date: '2024-07-20',
            time: '07:00',
            location: 'Région de l\'Extrême-Nord',
            targetPopulation: '9 mois - 15 ans',
            expectedCount: 2500,
            status: 'scheduled',
            priority: 'high'
        }
    ];

    // Programmes EPI du Cameroun
    const epiPrograms = [
        {
            vaccine: 'BCG',
            schedule: 'À la naissance',
            color: 'bg-blue-500',
            description: 'Tuberculose'
        },
        {
            vaccine: 'Polio',
            schedule: '6, 10, 14 semaines',
            color: 'bg-green-500',
            description: 'Poliomyélite'
        },
        {
            vaccine: 'DTC',
            schedule: '6, 10, 14 semaines',
            color: 'bg-purple-500',
            description: 'Diphtérie-Tétanos-Coqueluche'
        },
        {
            vaccine: 'ROR',
            schedule: '9 mois',
            color: 'bg-red-500',
            description: 'Rougeole-Oreillons-Rubéole'
        },
        {
            vaccine: 'Hépatite B',
            schedule: '6, 10, 14 semaines',
            color: 'bg-orange-500',
            description: 'Hépatite B'
        }
    ];

    // Navigation dans le calendrier
    const navigateCalendar = (direction) => {
        const newDate = new Date(currentDate);
        if (viewMode === 'month') {
            newDate.setMonth(currentDate.getMonth() + direction);
        } else if (viewMode === 'week') {
            newDate.setDate(currentDate.getDate() + (direction * 7));
        } else {
            newDate.setDate(currentDate.getDate() + direction);
        }
        setCurrentDate(newDate);
    };

    // Obtenir les événements pour une date donnée
    const getEventsForDate = (date) => {
        const dateStr = date.toISOString().split('T')[0];
        return vaccinationEvents.filter(event => event.date === dateStr);
    };

    // Générer les jours du mois
    const generateMonthDays = () => {
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const days = [];
        const currentDateObj = new Date(startDate);

        for (let i = 0; i < 42; i++) {
            const dayEvents = getEventsForDate(currentDateObj);
            days.push({
                date: new Date(currentDateObj),
                isCurrentMonth: currentDateObj.getMonth() === currentDate.getMonth(),
                events: dayEvents
            });
            currentDateObj.setDate(currentDateObj.getDate() + 1);
        }

        return days;
    };

    // Statistiques des rappels
    const reminderStats = {
        today: vaccinationEvents.filter(e => e.date === new Date().toISOString().split('T')[0]).length,
        thisWeek: vaccinationEvents.filter(e => {
            const eventDate = new Date(e.date);
            const today = new Date();
            const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            return eventDate >= today && eventDate <= weekFromNow;
        }).length,
        overdue: vaccinationEvents.filter(e => e.status === 'overdue').length,
        campaigns: vaccinationEvents.filter(e => e.type === 'campaign').length
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-4">
                {/* En-tête */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <Calendar className="text-blue-600" />
                            Calendrier Vaccinal
                        </h1>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowCampaignModal(true)}
                                className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                            >
                                <Plus className="w-4 h-4" />
                                Nouvelle Campagne
                            </button>
                        </div>
                    </div>

                    {/* Statistiques des rappels */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-600" />
                                <div>
                                    <p className="text-sm text-blue-600">Aujourd'hui</p>
                                    <p className="text-2xl font-bold text-blue-800">{reminderStats.today}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center gap-2">
                                <Bell className="w-5 h-5 text-green-600" />
                                <div>
                                    <p className="text-sm text-green-600">Cette semaine</p>
                                    <p className="text-2xl font-bold text-green-800">{reminderStats.thisWeek}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                                <div>
                                    <p className="text-sm text-red-600">En retard</p>
                                    <p className="text-2xl font-bold text-red-800">{reminderStats.overdue}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-purple-600" />
                                <div>
                                    <p className="text-sm text-purple-600">Campagnes</p>
                                    <p className="text-2xl font-bold text-purple-800">{reminderStats.campaigns}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation du calendrier */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigateCalendar(-1)}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-semibold text-gray-900">
                                {currentDate.toLocaleDateString('fr-FR', {
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </h2>
                            <button
                                onClick={() => navigateCalendar(1)}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('month')}
                                className={`px-3 py-1 rounded-lg text-sm ${viewMode === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                                    }`}
                            >
                                Mois
                            </button>
                            <button
                                onClick={() => setViewMode('week')}
                                className={`px-3 py-1 rounded-lg text-sm ${viewMode === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                                    }`}
                            >
                                Semaine
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                    {/* Calendrier principal */}
                    <div className="xl:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            {viewMode === 'month' && (
                                <div className="grid grid-cols-7 gap-1">
                                    {/* En-têtes des jours */}
                                    {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map((day) => (
                                        <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
                                            {day}
                                        </div>
                                    ))}

                                    {/* Jours du mois */}
                                    {generateMonthDays().map((day, index) => (
                                        <div
                                            key={index}
                                            className={`min-h-[100px] p-2 border border-gray-100 ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                                                } ${day.date.toDateString() === new Date().toDateString() ? 'bg-blue-50 border-blue-200' : ''
                                                }`}
                                        >
                                            <div className="font-medium text-sm text-gray-900 mb-1">
                                                {day.date.getDate()}
                                            </div>
                                            <div className="space-y-1">
                                                {day.events.slice(0, 3).map((event) => (
                                                    <div
                                                        key={event.id}
                                                        onClick={() => setSelectedEvent(event)}
                                                        className={`text-xs p-1 rounded cursor-pointer ${event.type === 'campaign' ? 'bg-purple-100 text-purple-800' :
                                                            event.status === 'overdue' ? 'bg-red-100 text-red-800' :
                                                                'bg-green-100 text-green-800'
                                                            }`}
                                                    >
                                                        {event.type === 'campaign' ? event.title : `${event.patientName} - ${event.vaccine}`}
                                                    </div>
                                                ))}
                                                {day.events.length > 3 && (
                                                    <div className="text-xs text-gray-500">
                                                        +{day.events.length - 3} autre(s)
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {viewMode === 'week' && (
                                <div className="space-y-4">
                                    {/* Vue semaine simplifiée */}
                                    {Array.from({ length: 7 }, (_, i) => {
                                        const date = new Date(currentDate);
                                        date.setDate(date.getDate() - date.getDay() + i);
                                        const dayEvents = getEventsForDate(date);

                                        return (
                                            <div key={i} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h3 className="font-medium text-gray-900">
                                                        {date.toLocaleDateString('fr-FR', {
                                                            weekday: 'long',
                                                            day: 'numeric',
                                                            month: 'long'
                                                        })}
                                                    </h3>
                                                    <span className="text-sm text-gray-500">
                                                        {dayEvents.length} événement(s)
                                                    </span>
                                                </div>
                                                <div className="space-y-2">
                                                    {dayEvents.map((event) => (
                                                        <div
                                                            key={event.id}
                                                            onClick={() => setSelectedEvent(event)}
                                                            className={`p-3 rounded-lg border cursor-pointer ${event.type === 'campaign' ? 'bg-purple-50 border-purple-200' :
                                                                event.status === 'overdue' ? 'bg-red-50 border-red-200' :
                                                                    'bg-green-50 border-green-200'
                                                                }`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <p className="font-medium text-sm">
                                                                        {event.type === 'campaign' ? event.title : `${event.patientName} - ${event.vaccine}`}
                                                                    </p>
                                                                    <p className="text-xs text-gray-600">
                                                                        {event.time} - {event.type === 'campaign' ? event.location : event.healthCenter}
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    {event.reminder && <Bell className="w-4 h-4 text-orange-500" />}
                                                                    {event.status === 'overdue' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Panneau latéral */}
                    <div className="space-y-6">
                        {/* Prochains rappels */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Bell className="w-5 h-5 text-orange-500" />
                                Prochains rappels
                            </h3>
                            <div className="space-y-3">
                                {vaccinationEvents.filter(e => e.reminder && e.type === 'individual').slice(0, 5).map((event) => (
                                    <div
                                        key={event.id}
                                        onClick={() => setSelectedEvent(event)}
                                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                                    >
                                        <div className={`w-3 h-3 rounded-full ${event.status === 'overdue' ? 'bg-red-500' : 'bg-green-500'
                                            }`}></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">{event.patientName}</p>
                                            <p className="text-xs text-gray-600">{event.vaccine} - {event.date}</p>
                                        </div>
                                        <div className="text-blue-600 hover:text-blue-800">
                                            <Eye className="w-4 h-4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Programme EPI */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Syringe className="w-5 h-5 text-blue-500" />
                                Programme EPI Cameroun
                            </h3>
                            <div className="space-y-3">
                                {epiPrograms.map((program, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                        <div className={`w-4 h-4 rounded-full ${program.color}`}></div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">{program.vaccine}</p>
                                            <p className="text-xs text-gray-600">{program.description}</p>
                                            <p className="text-xs text-blue-600">{program.schedule}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Campagnes actives */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Users className="w-5 h-5 text-purple-500" />
                                Campagnes actives
                            </h3>
                            <div className="space-y-3">
                                {vaccinationEvents.filter(e => e.type === 'campaign').map((campaign) => (
                                    <div key={campaign.id} className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <p className="text-sm font-medium text-purple-900">{campaign.title}</p>
                                            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                                {campaign.date}
                                            </span>
                                        </div>
                                        <p className="text-xs text-purple-700 mb-1">{campaign.description}</p>
                                        <div className="flex items-center gap-2 text-xs text-purple-600">
                                            <MapPin className="w-3 h-3" />
                                            <span>{campaign.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-purple-600">
                                            <Users className="w-3 h-3" />
                                            <span>{campaign.targetPopulation} - {campaign.expectedCount} personnes</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal des détails d'événement */}
                {selectedEvent && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {selectedEvent.type === 'campaign' ? 'Détails de la campagne' : 'Détails de la vaccination'}
                                </h3>
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {selectedEvent.type === 'campaign' ? (
                                    <>
                                        <div>
                                            <p className="font-medium text-gray-900">{selectedEvent.title}</p>
                                            <p className="text-sm text-gray-600">{selectedEvent.description}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="font-medium text-gray-700">Date</p>
                                                <p className="text-gray-600">{selectedEvent.date}</p>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-700">Heure</p>
                                                <p className="text-gray-600">{selectedEvent.time}</p>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-700">Lieu</p>
                                                <p className="text-gray-600">{selectedEvent.location}</p>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-700">Population cible</p>
                                                <p className="text-gray-600">{selectedEvent.targetPopulation}</p>
                                            </div>
                                        </div>
                                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                                            <p className="text-sm font-medium text-purple-900">Objectif</p>
                                            <p className="text-sm text-purple-700">{selectedEvent.expectedCount} personnes</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <p className="font-medium text-gray-900">{selectedEvent.patientName}</p>
                                            <p className="text-sm text-gray-600">{selectedEvent.patientAge}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="font-medium text-gray-700">Vaccin</p>
                                                <p className="text-gray-600">{selectedEvent.vaccine}</p>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-700">Date</p>
                                                <p className="text-gray-600">{selectedEvent.date}</p>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-700">Heure</p>
                                                <p className="text-gray-600">{selectedEvent.time}</p>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-700">Statut</p>
                                                <p className={`text-sm ${selectedEvent.status === 'overdue' ? 'text-red-600' : 'text-green-600'
                                                    }`}>
                                                    {selectedEvent.status === 'overdue' ? 'En retard' : 'Programmé'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                            <p className="text-sm font-medium text-blue-900">Centre de santé</p>
                                            <p className="text-sm text-blue-700">{selectedEvent.healthCenter}</p>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setSelectedEvent(null)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Fermer
                                </button>
                                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    Modifier
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal de nouvelle campagne */}
                {showCampaignModal && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Nouvelle campagne</h3>
                                <button
                                    onClick={() => setShowCampaignModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre de la campagne</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Ex: Campagne Polio 2024"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        rows="3"
                                        placeholder="Description de la campagne..."
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                        <input
                                            type="date"
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                                        <input
                                            type="time"
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Ex: Région du Nord"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Population cible</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Ex: 0-5 ans"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre attendu</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Ex: 1200"
                                    />
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowCampaignModal(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                    >
                                        Créer la campagne
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VaccineCalendarPage;