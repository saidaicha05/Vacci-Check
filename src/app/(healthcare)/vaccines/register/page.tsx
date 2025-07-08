"use client"
import React, { useState } from 'react';
import { 
  Syringe, Search, Calendar, AlertTriangle, 
  Save, X, User, CheckCircle, Clock,
  Package, MapPin, Phone, Smartphone,
  QrCode, Camera, Edit, RefreshCw,
  Upload, Eye,
  Plus,
  List,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const VaccineRegisterPage = () => {
  // États pour la recherche de patient
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // États pour le scanner QR
  const [scannerActive, setScannerActive] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  // États pour l'enregistrement de vaccination
  const [vaccineData, setVaccineData] = useState({
    citoyen_id: '',
    type_vaccin_id: '',
    lot_vaccin_id: '',
    hopital_id: '',
    professionnel_id: '',
    date_vaccination: '',
    heure_vaccination: '',
    dose_numero: '',
    poids_enfant: '',
    bras_vaccine: '',
    statut: 'complete',
    observations: ''
  });

  // États pour la gestion du formulaire
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputMethod, setInputMethod] = useState('manual'); // 'manual' ou 'qr'

  // Données simulées des patients
  const patients = [
    {
      id: 1,
      firstName: 'Marie',
      lastName: 'Ngono',
      birthDate: '2021-05-15',
      gender: 'F',
      phone: '+237 671 234 567',
      nationalId: 'CM001234',
      hasSmartphone: true,
      lastVaccine: 'BCG',
      nextDue: 'Polio 1'
    },
    {
      id: 2,
      firstName: 'Jean',
      lastName: 'Mballa',
      birthDate: '2020-12-10',
      gender: 'M',
      phone: '+237 698 765 432',
      nationalId: 'CM005678',
      hasSmartphone: false,
      lastVaccine: 'Polio 2',
      nextDue: 'ROR'
    }
  ];

  // Types de vaccins disponibles
  const vaccines = [
    {
      id: 1,
      name: 'BCG',
      description: 'Bacille Calmette-Guérin (Tuberculose)',
      ageRecommended: 'À la naissance',
      schedule: 'Dose unique'
    },
    {
      id: 2,
      name: 'Polio 1',
      description: 'Poliomyélite - Première dose',
      ageRecommended: '6 semaines',
      schedule: '1ère dose'
    },
    {
      id: 3,
      name: 'Polio 2',
      description: 'Poliomyélite - Deuxième dose',
      ageRecommended: '10 semaines',
      schedule: '2ème dose'
    }
  ];

  // Lots de vaccins disponibles
  const vaccineLots = [
    { id: 1, numero: 'LOT2024-001', type_vaccin_id: 1, date_expiration: '2024-12-31' },
    { id: 2, numero: 'LOT2024-002', type_vaccin_id: 2, date_expiration: '2024-11-30' },
    { id: 3, numero: 'LOT2024-003', type_vaccin_id: 3, date_expiration: '2024-10-31' }
  ];

  // Hôpitaux disponibles
  const hospitals = [
    { id: 1, name: 'Centre de santé de Douala' },
    { id: 2, name: 'Hôpital Laquintinie' },
    { id: 3, name: 'Centre de santé de Waza' }
  ];

  // Professionnels de santé
  const healthProfessionals = [
    { id: 1, name: 'Dr. Amadou Sall' },
    { id: 2, name: 'Inf. Hadjara Bello' },
    { id: 3, name: 'Dr. Marie Dubois' }
  ];

  // Données simulées de résultat de scan QR
  const mockScanResult = {
    patientId: 1,
    patientInfo: {
      firstName: 'Amina',
      lastName: 'Bello',
      birthDate: '2022-03-20',
      gender: 'F',
      nationalId: 'CM009876'
    },
    vaccineInfo: {
      type_vaccin_id: 1,
      lot_vaccin_id: 1,
      date_vaccination: new Date().toISOString().split('T')[0],
      heure_vaccination: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      dose_numero: 1,
      hopital_id: 1,
      professionnel_id: 1
    }
  };

  // Simulation du scan QR
  const handleStartScan = () => {
    setScannerActive(true);
    setIsScanning(true);
    
    // Simulation de scan après 3 secondes
    setTimeout(() => {
      setScanResult(mockScanResult);
      setSelectedPatient(patients.find(p => p.id === mockScanResult.patientId));
      setVaccineData(prev => ({
        ...prev,
        citoyen_id: mockScanResult.patientId.toString(),
        ...mockScanResult.vaccineInfo
      }));
      setIsScanning(false);
      setScannerActive(false);
      setCurrentStep(2);
    }, 3000);
  };

  // Arrêt du scan
  const handleStopScan = () => {
    setScannerActive(false);
    setIsScanning(false);
  };

  // Nouveau scan
  const handleNewScan = () => {
    setScanResult(null);
    setSelectedPatient(null);
    setVaccineData({
      citoyen_id: '',
      type_vaccin_id: '',
      lot_vaccin_id: '',
      hopital_id: '',
      professionnel_id: '',
      date_vaccination: '',
      heure_vaccination: '',
      dose_numero: '',
      poids_enfant: '',
      bras_vaccine: '',
      statut: 'complete',
      observations: ''
    });
    setCurrentStep(1);
  };

  // Recherche de patients par ID
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.length > 0) {
      const results = patients.filter(patient =>
        patient.id.toString().includes(term) ||
        patient.nationalId.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Sélection d'un patient
  const selectPatient = (patient) => {
    setSelectedPatient(patient);
    setVaccineData(prev => ({
      ...prev,
      citoyen_id: patient.id.toString()
    }));
    setSearchResults([]);
    setSearchTerm('');
  };

  // Gestion des changements de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVaccineData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Données de vaccination:', {
        patient: selectedPatient,
        vaccine: vaccineData
      });
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Vaccination enregistrée avec succès!');
      // Reset form
      handleNewScan();
    } catch (error) {
      console.error("Erreur d'enregistrement:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Obtenir les lots pour le vaccin sélectionné
  const getAvailableLots = () => {
    return vaccineLots.filter(lot => 
      lot.type_vaccin_id === parseInt(vaccineData.type_vaccin_id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-2">
        {/* Titre principal */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <Syringe className="inline mr-2" />
            Enregistrement d'un nouveau vaccin
          </h1>
        </div>

        {/* Contenu principal */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Syringe className="text-green-600" />
              Nouvelle vaccination
            </h2>
          </div>

          {/* Sélection de la méthode de saisie */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Méthode de saisie</h3>
            <div className="flex gap-4">
              <button
                onClick={() => setInputMethod('manual')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  inputMethod === 'manual' 
                    ? 'bg-green-50 border-green-500 text-green-700' 
                    : 'border-gray-300 text-gray-700'
                }`}
              >
                <Edit className="w-4 h-4" />
                Saisie manuelle
              </button>
              <button
                onClick={() => setInputMethod('qr')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  inputMethod === 'qr' 
                    ? 'bg-blue-50 border-blue-500 text-blue-700' 
                    : 'border-gray-300 text-gray-700'
                }`}
              >
                <QrCode className="w-4 h-4" />
                Scanner QR Code
              </button>
            </div>
          </div>

          {/* Barre de progression */}
          <div className="flex mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                <div className={`text-xs mt-2 ${
                  currentStep >= step ? 'text-green-600 font-medium' : 'text-gray-500'
                }`}>
                  {step === 1 && (inputMethod === 'qr' ? 'Scanner QR' : 'Patient')}
                  {step === 2 && 'Vaccin'}
                  {step === 3 && 'Confirmation'}
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit}>
            {/* Étape 1: Sélection du patient ou scan QR */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {inputMethod === 'qr' ? (
                  // Interface QR Scanner
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Scanner le QR code du carnet vaccinal
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Positionnez le QR code du carnet vaccinal devant la caméra
                      </p>
                    </div>

                    {/* Interface caméra */}
                    <div className="bg-gray-100 rounded-lg p-8 flex flex-col items-center justify-center min-h-96 border-2 border-dashed border-gray-300">
                      {!scannerActive ? (
                        <div className="text-center">
                          <QrCode className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-4">Prêt à scanner</p>
                          <button
                            type="button"
                            onClick={handleStartScan}
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                          >
                            <Camera className="w-5 h-5" />
                            Démarrer le scan
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          {isScanning ? (
                            <div className="animate-pulse">
                              <div className="w-64 h-64 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <div className="w-32 h-32 border-4 border-blue-600 border-dashed rounded-lg flex items-center justify-center">
                                  <QrCode className="w-16 h-16 text-blue-600" />
                                </div>
                              </div>
                              <p className="text-blue-600 mb-2">Recherche du QR code...</p>
                              <div className="flex justify-center gap-2">
                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-green-600">
                              <CheckCircle className="w-24 h-24 mx-auto mb-4" />
                              <p className="mb-4">QR code détecté avec succès!</p>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={handleStopScan}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                          >
                            Arrêter
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Options alternatives */}
                    <div className="border-t pt-6">
                      <h3 className="text-md font-medium text-gray-900 mb-4">Autres options</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button 
                          type="button"
                          className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <Upload className="w-5 h-5 text-gray-600" />
                          <div className="text-left">
                            <p className="font-medium">Importer une image</p>
                            <p className="text-sm text-gray-600">Sélectionner une photo du carnet</p>
                          </div>
                        </button>
                        <button 
                          type="button"
                          onClick={() => setInputMethod('manual')}
                          className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                          <Edit className="w-5 h-5 text-gray-600" />
                          <div className="text-left">
                            <p className="font-medium">Saisie manuelle</p>
                            <p className="text-sm text-gray-600">Enregistrer manuellement</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Interface saisie manuelle
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Recherche du patient</h2>

                    {/* Recherche de patient par ID */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Rechercher un patient par ID ou ID national"
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    {/* Résultats de recherche */}
                    {searchResults.length > 0 && (
                      <div className="border border-gray-200 rounded-lg bg-white">
                        {searchResults.map((patient) => (
                          <div
                            key={patient.id}
                            onClick={() => selectPatient(patient)}
                            className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  ID: {patient.id} - {patient.firstName} {patient.lastName}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  ID National: {patient.nationalId}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-green-600">Dernier vaccin: {patient.lastVaccine}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Patient sélectionné */}
                {selectedPatient && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Patient sélectionné
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">ID: {selectedPatient.id} - {selectedPatient.firstName} {selectedPatient.lastName}</p>
                        <p className="text-sm text-gray-600">
                          {selectedPatient.gender === 'M' ? 'Masculin' : 'Féminin'} • Né(e) le {selectedPatient.birthDate}
                        </p>
                        <p className="text-sm text-gray-600">ID National: {selectedPatient.nationalId}</p>
                      </div>
                      <div>
                        <p className="text-sm flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {selectedPatient.phone}
                        </p>
                        <p className="text-sm text-green-600">Prochain vaccin recommandé: {selectedPatient.nextDue}</p>
                      </div>
                    </div>
                    {inputMethod === 'qr' && (
                      <div className="mt-4 flex gap-2">
                        <button
                          type="button"
                          onClick={handleNewScan}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Nouveau scan
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Bouton suivant */}
                {selectedPatient && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2"
                    >
                      Suivant
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Étape 2: Informations du vaccin */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Informations du vaccin</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type de vaccin *</label>
                    <select
                      name="type_vaccin_id"
                      value={vaccineData.type_vaccin_id}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      <option value="">Sélectionner un vaccin</option>
                      {vaccines.map(vaccine => (
                        <option key={vaccine.id} value={vaccine.id}>
                          {vaccine.name} - {vaccine.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lot de vaccin *</label>
                    <select
                      name="lot_vaccin_id"
                      value={vaccineData.lot_vaccin_id}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                      disabled={!vaccineData.type_vaccin_id}
                    >
                      <option value="">Sélectionner un lot</option>
                      {getAvailableLots().map(lot => (
                        <option key={lot.id} value={lot.id}>
                          {lot.numero} (Exp: {lot.date_expiration})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de vaccination *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        name="date_vaccination"
                        value={vaccineData.date_vaccination}
                        onChange={handleChange}
                        className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Heure de vaccination *</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="time"
                        name="heure_vaccination"
                        value={vaccineData.heure_vaccination}
                        onChange={handleChange}
                        className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de dose *</label>
                    <input
                      type="number"
                      name="dose_numero"
                      value={vaccineData.dose_numero}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="1, 2, 3..."
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Poids de l'enfant (kg)</label>
                    <input
                      type="number"
                      name="poids_enfant"
                      value={vaccineData.poids_enfant}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Ex: 3.5"
                      step="0.1"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bras vacciné</label>
                    <select
                      name="bras_vaccine"
                      value={vaccineData.bras_vaccine}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Sélectionner</option>
                      <option value="gauche">Gauche</option>
                      <option value="droit">Droit</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hôpital</label>
                    <select
                      name="hopital_id"
                      value={vaccineData.hopital_id}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Sélectionner un hôpital</option>
                      {hospitals.map(hospital => (
                        <option key={hospital.id} value={hospital.id}>
                          {hospital.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Professionnel de santé</label>
                    <select
                      name="professionnel_id"
                      value={vaccineData.professionnel_id}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Sélectionner un professionnel</option>
                      {healthProfessionals.map(prof => (
                        <option key={prof.id} value={prof.id}>
                          {prof.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                    <select
                      name="statut"
                      value={vaccineData.statut}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="complete">Complète</option>
                      <option value="annule">Annulée</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Observations</label>
                    <textarea
                      name="observations"
                      value={vaccineData.observations}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Remarques, température, réactions..."
                    ></textarea>
                  </div>
                </div>

                {/* Boutons navigation */}
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:bg-green-400"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Enregistrer la vaccination
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Étape 3: Confirmation */}
            {currentStep === 3 && (
              <div className="text-center space-y-6">
                <div className="text-green-600">
                  <CheckCircle className="w-16 h-16 mx-auto" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Vaccination enregistrée avec succès!</h2>
                <p className="text-gray-600">
                  La vaccination a été enregistrée dans le dossier médical du patient.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg text-left max-w-md mx-auto">
                  <h3 className="font-medium text-gray-900 mb-2">Récapitulatif</h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Patient:</span> {selectedPatient.firstName} {selectedPatient.lastName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Vaccin:</span> {vaccines.find(v => v.id === parseInt(vaccineData.type_vaccin_id))?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Date:</span> {vaccineData.date_vaccination} à {vaccineData.heure_vaccination}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Dose:</span> {vaccineData.dose_numero}
                  </p>
                </div>
                <div className="flex justify-center gap-4 pt-6">
                  <button
                    type="button"
                    onClick={handleNewScan}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Nouvel enregistrement
                  </button>
                  <Link
                    href="/vaccines"
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <List className="w-4 h-4" />
                    Voir les vaccinations
                  </Link>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default VaccineRegisterPage;