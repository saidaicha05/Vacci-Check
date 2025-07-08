"use client"
import React, { useState } from 'react';
import { 
  QrCode, Camera, Search, AlertTriangle, 
  Save, X, User, CheckCircle, Edit,
  Syringe, Calendar, Package, RefreshCw,
  Upload, FileText, Eye
} from 'lucide-react';
import Link from 'next/link';

const VaccineQRScanPage = () => {
  // États pour le scanner QR
  const [scannerActive, setScannerActive] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  // États pour la validation des données
  const [validationData, setValidationData] = useState({
    patientInfo: {
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      nationalId: '',
      motherName: ''
    },
    vaccinations: []
  });

  // États pour la gestion du formulaire
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Données simulées de résultat de scan
  const mockScanResult = {
    patientInfo: {
      firstName: 'Amina',
      lastName: 'Bello',
      birthDate: '2022-03-20',
      gender: 'F',
      nationalId: 'CM009876',
      motherName: 'Fatima Bello'
    },
    vaccinations: [
      {
        id: 1,
        vaccineName: 'BCG',
        date: '2022-03-21',
        batchNumber: 'BCG2022-001',
        location: 'Centre de santé Waza',
        administrator: 'Inf. Hadjara'
      },
      {
        id: 2,
        vaccineName: 'Polio 1',
        date: '2022-05-01',
        batchNumber: 'POL2022-045',
        location: 'Centre de santé Waza',
        administrator: 'Inf. Hadjara'
      },
      {
        id: 3,
        vaccineName: 'Polio 2',
        date: '2022-06-12',
        batchNumber: 'POL2022-087',
        location: 'Centre de santé Waza',
        administrator: 'Dr. Amadou'
      }
    ]
  };

  // Simulation du scan QR
  const handleStartScan = () => {
    setScannerActive(true);
    setIsScanning(true);
    
    // Simulation de scan après 3 secondes
    setTimeout(() => {
      setScanResult(mockScanResult);
      setValidationData(mockScanResult);
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
    setValidationData({
      patientInfo: {
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: '',
        nationalId: '',
        motherName: ''
      },
      vaccinations: []
    });
    setCurrentStep(1);
    setEditMode(false);
  };

  // Gestion des changements dans les données patient
  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setValidationData(prev => ({
      ...prev,
      patientInfo: {
        ...prev.patientInfo,
        [name]: value
      }
    }));
  };

  // Gestion des changements dans les vaccinations
  const handleVaccinationChange = (index, field, value) => {
    setValidationData(prev => ({
      ...prev,
      vaccinations: prev.vaccinations.map((vaccination, i) => 
        i === index ? { ...vaccination, [field]: value } : vaccination
      )
    }));
  };

  // Suppression d'une vaccination
  const removeVaccination = (index) => {
    setValidationData(prev => ({
      ...prev,
      vaccinations: prev.vaccinations.filter((_, i) => i !== index)
    }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Données validées:', validationData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Carnet vaccinal intégré avec succès!');
      // router.push('/vaccines');
    } catch (error) {
      console.error("Erreur d'intégration:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* En-tête */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <QrCode className="text-blue-600" />
              Scanner QR Code - Carnet vaccinal
            </h1>
            {/* <Link href="/vaccines" className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </Link> */}
          </div>

          {/* Barre de progression */}
          <div className="flex mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                <div className={`text-xs mt-2 ${
                  currentStep >= step ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}>
                  {step === 1 && 'Scanner'}
                  {step === 2 && 'Validation'}
                  {step === 3 && 'Confirmation'}
                </div>
              </div>
            ))}
          </div>

          {/* Contenu principal */}
          <div>
            {/* Étape 1: Scanner QR Code */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Scanner le QR code du carnet vaccinal
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Positionnez le QR code du carnet vaccinal papier devant la caméra
                  </p>
                </div>

                {/* Interface caméra */}
                <div className="bg-gray-100 rounded-lg p-8 flex flex-col items-center justify-center min-h-96 border-2 border-dashed border-gray-300">
                  {!scannerActive ? (
                    <div className="text-center">
                      <QrCode className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Prêt à scanner</p>
                      <button
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
                    <button className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Upload className="w-5 h-5 text-gray-600" />
                      <div className="text-left">
                        <p className="font-medium">Importer une image</p>
                        <p className="text-sm text-gray-600">Sélectionner une photo du carnet</p>
                      </div>
                    </button>
                    <Link href="/vaccines/register" className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Edit className="w-5 h-5 text-gray-600" />
                      <div className="text-left">
                        <p className="font-medium">Saisie manuelle</p>
                        <p className="text-sm text-gray-600">Enregistrer manuellement</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Étape 2: Validation des données */}
            {currentStep === 2 && scanResult && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Validation des données scannées</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                      {editMode ? 'Arrêter' : 'Modifier'}
                    </button>
                    <button
                      onClick={handleNewScan}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-700"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Nouveau scan
                    </button>
                  </div>
                </div>

                {/* Informations du patient */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Informations du patient
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                      <input
                        type="text"
                        name="firstName"
                        value={validationData.patientInfo.firstName}
                        onChange={handlePatientChange}
                        disabled={!editMode}
                        className={`w-full p-2 border border-gray-300 rounded-lg ${
                          editMode ? 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        name="lastName"
                        value={validationData.patientInfo.lastName}
                        onChange={handlePatientChange}
                        disabled={!editMode}
                        className={`w-full p-2 border border-gray-300 rounded-lg ${
                          editMode ? 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                      <input
                        type="date"
                        name="birthDate"
                        value={validationData.patientInfo.birthDate}
                        onChange={handlePatientChange}
                        disabled={!editMode}
                        className={`w-full p-2 border border-gray-300 rounded-lg ${
                          editMode ? 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                      <select
                        name="gender"
                        value={validationData.patientInfo.gender}
                        onChange={handlePatientChange}
                        disabled={!editMode}
                        className={`w-full p-2 border border-gray-300 rounded-lg ${
                          editMode ? 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50'
                        }`}
                      >
                        <option value="">Sélectionner</option>
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ID National</label>
                      <input
                        type="text"
                        name="nationalId"
                        value={validationData.patientInfo.nationalId}
                        onChange={handlePatientChange}
                        disabled={!editMode}
                        className={`w-full p-2 border border-gray-300 rounded-lg ${
                          editMode ? 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la mère</label>
                      <input
                        type="text"
                        name="motherName"
                        value={validationData.patientInfo.motherName}
                        onChange={handlePatientChange}
                        disabled={!editMode}
                        className={`w-full p-2 border border-gray-300 rounded-lg ${
                          editMode ? 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'bg-gray-50'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Historique des vaccinations */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-medium text-green-900 mb-3 flex items-center gap-2">
                    <Syringe className="w-4 h-4" />
                    Historique des vaccinations ({validationData.vaccinations.length})
                  </h3>
                  <div className="space-y-4">
                    {validationData.vaccinations.map((vaccination, index) => (
                      <div key={vaccination.id} className="bg-white border border-green-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{vaccination.vaccineName}</h4>
                          {editMode && (
                            <button
                              onClick={() => removeVaccination(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                            <input
                              type="date"
                              value={vaccination.date}
                              onChange={(e) => handleVaccinationChange(index, 'date', e.target.value)}
                              disabled={!editMode}
                              className={`w-full p-2 text-sm border border-gray-300 rounded ${
                                editMode ? 'focus:ring-2 focus:ring-green-500 focus:border-green-500' : 'bg-gray-50'
                              }`}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Numéro de lot</label>
                            <input
                              type="text"
                              value={vaccination.batchNumber}
                              onChange={(e) => handleVaccinationChange(index, 'batchNumber', e.target.value)}
                              disabled={!editMode}
                              className={`w-full p-2 text-sm border border-gray-300 rounded ${
                                editMode ? 'focus:ring-2 focus:ring-green-500 focus:border-green-500' : 'bg-gray-50'
                              }`}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Lieu</label>
                            <input
                              type="text"
                              value={vaccination.location}
                              onChange={(e) => handleVaccinationChange(index, 'location', e.target.value)}
                              disabled={!editMode}
                              className={`w-full p-2 text-sm border border-gray-300 rounded ${
                                editMode ? 'focus:ring-2 focus:ring-green-500 focus:border-green-500' : 'bg-gray-50'
                              }`}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Administrateur</label>
                            <input
                              type="text"
                              value={vaccination.administrator}
                              onChange={(e) => handleVaccinationChange(index, 'administrator', e.target.value)}
                              disabled={!editMode}
                              className={`w-full p-2 text-sm border border-gray-300 rounded ${
                                editMode ? 'focus:ring-2 focus:ring-green-500 focus:border-green-500' : 'bg-gray-50'
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Messages de validation */}
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800">
                      {validationData.vaccinations.length} vaccination(s) détectée(s) avec succès
                    </span>
                  </div>
                  {validationData.vaccinations.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-800">
                        Vérifiez attentivement les dates et numéros de lot avant de continuer
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Étape 3: Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Confirmation d'intégration</h2>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" />
                    <p className="text-green-800">
                      Les données du carnet vaccinal seront intégrées dans le système numérique
                    </p>
                  </div>
                </div>

                {/* Résumé final */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-500" />
                      Informations du patient
                    </h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Nom:</span> {validationData.patientInfo.firstName} {validationData.patientInfo.lastName}</p>
                      <p><span className="font-medium">Date de naissance:</span> {validationData.patientInfo.birthDate}</p>
                      <p><span className="font-medium">Genre:</span> {validationData.patientInfo.gender === 'M' ? 'Masculin' : 'Féminin'}</p>
                      <p><span className="font-medium">ID National:</span> {validationData.patientInfo.nationalId}</p>
                      <p><span className="font-medium">Nom de la mère:</span> {validationData.patientInfo.motherName}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      <Syringe className="w-4 h-4 text-green-500" />
                      Vaccinations à intégrer
                    </h3>
                    <div className="space-y-2">
                      {validationData.vaccinations.map((vaccination, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{vaccination.vaccineName} - {vaccination.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Actions après intégration</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Le patient sera automatiquement créé dans le système</li>
                    <li>• L'historique vaccinal sera mis à jour</li>
                    <li>• Les prochaines vaccinations seront programmées</li>
                    <li>• Un rappel sera envoyé selon les préférences du patient</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Précédent
                </button>
              ) : (
                <div></div>
              )}

              {currentStep === 2 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Valider et continuer
                </button>
              ) : currentStep === 3 ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400"
                >
                  {isSubmitting ? (
                    'Intégration...'
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Intégrer le carnet vaccinal
                    </>
                  )}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaccineQRScanPage;