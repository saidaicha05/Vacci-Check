"use client"
import React, { useState } from 'react';
import { 
  User, Calendar, Smartphone, MapPin, 
  Plus, Save, ChevronDown, X, 
  ClipboardList, Syringe, QrCode,
  MessageSquare,
  Phone
} from 'lucide-react';
import Link from 'next/link';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';

const NewPatientPage = () => {
  // États pour les informations du patient
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    phone: '',
    address: '',
    city: '',
    region: 'Extrême-Nord',
    hasSmartphone: false,
    preferredContact: 'app',
    nationalId: ''
  });

  // États pour la gestion du formulaire
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrScannerOpen, setQrScannerOpen] = useState(false);

  // Régions du Cameroun
  const regions = [
    'Adamaoua', 'Centre', 'Est', 'Extrême-Nord',
    'Littoral', 'Nord', 'Nord-Ouest', 'Ouest',
    'Sud', 'Sud-Ouest'
  ];

  // Gestion des changements de formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulation d'envoi des données
      console.log('Données du patient:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirection après succès (à remplacer par votre logique réelle)
      alert('Patient enregistré avec succès!');
      // router.push('/patients');
    } catch (error) {
      console.error("Erreur d'enregistrement:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simulation de scan QR
  const handleQRScan = () => {
    setQrScannerOpen(true);
    // Simulation de scan après 1.5s
    setTimeout(() => {
      setFormData({
        ...formData,
        firstName: 'Marie',
        lastName: 'Ngono',
        birthDate: '2021-05-15',
        gender: 'F',
        nationalId: 'CM001234'
      });
      setQrScannerOpen(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* En-tête avec étapes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <User className="text-blue-600" />
              Nouveau Patient
            </h1>
            <Link href="/patients" className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </Link>
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
                  {step === 1 && 'Informations'}
                  {step === 2 && 'Contact'}
                  {step === 3 && 'Vérification'}
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit}>
            {/* Étape 1: Informations de base */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Informations personnelles</h2>
                  <button
                    type="button"
                    onClick={handleQRScan}
                    className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm"
                  >
                    <QrCode className="w-4 h-4" />
                    Scanner QR
                  </button>
                </div>

                {qrScannerOpen && (
                  <div className="bg-gray-100 p-8 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="animate-pulse flex flex-col items-center">
                      <QrCode className="w-16 h-16 text-blue-500 mb-2" />
                      <p className="text-gray-600">Recherche du QR code...</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Genre *</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Sélectionner</option>
                      <option value="M">Masculin</option>
                      <option value="F">Féminin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro d'identification national</label>
                    <input
                      type="text"
                      name="nationalId"
                      value={formData.nationalId}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Optionnel"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Étape 2: Contact et localisation */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Coordonnées et localisation</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Possède un smartphone</label>
                    <div className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        name="hasSmartphone"
                        checked={formData.hasSmartphone}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm text-gray-700">Oui</label>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Région *</label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      {regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Méthode de contact préférée *</label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, preferredContact: 'app'})}
                        className={`p-2 border rounded-lg flex flex-col items-center ${
                          formData.preferredContact === 'app' ? 'bg-blue-50 border-blue-300' : 'border-gray-200'
                        }`}
                      >
                        <Smartphone className="w-5 h-5 text-blue-500" />
                        <span className="text-xs mt-1">Application</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, preferredContact: 'sms'})}
                        className={`p-2 border rounded-lg flex flex-col items-center ${
                          formData.preferredContact === 'sms' ? 'bg-green-50 border-green-300' : 'border-gray-200'
                        }`}
                      >
                        <MessageSquare className="w-5 h-5 text-green-500" />
                        <span className="text-xs mt-1">SMS</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, preferredContact: 'ussd'})}
                        className={`p-2 border rounded-lg flex flex-col items-center ${
                          formData.preferredContact === 'ussd' ? 'bg-purple-50 border-purple-300' : 'border-gray-200'
                        }`}
                      >
                        <Phone className="w-5 h-5 text-purple-500" />
                        <span className="text-xs mt-1">USSD</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Étape 3: Vérification */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Vérification des informations</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <ClipboardList className="text-blue-600" />
                    <p className="text-blue-800">Veuillez vérifier attentivement les informations avant de soumettre</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-500" />
                      Informations personnelles
                    </h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Nom complet:</span> {formData.firstName} {formData.lastName}</p>
                      <p><span className="font-medium">Date de naissance:</span> {formData.birthDate || 'Non spécifié'}</p>
                      <p><span className="font-medium">Genre:</span> {formData.gender === 'M' ? 'Masculin' : formData.gender === 'F' ? 'Féminin' : 'Non spécifié'}</p>
                      <p><span className="font-medium">ID National:</span> {formData.nationalId || 'Non spécifié'}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-500" />
                      Coordonnées
                    </h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Téléphone:</span> {formData.phone || 'Non spécifié'}</p>
                      <p><span className="font-medium">Smartphone:</span> {formData.hasSmartphone ? 'Oui' : 'Non'}</p>
                      <p><span className="font-medium">Adresse:</span> {formData.address || 'Non spécifié'}</p>
                      <p><span className="font-medium">Localité:</span> {formData.city}, {formData.region}</p>
                      <p><span className="font-medium">Contact préféré:</span> 
                        {formData.preferredContact === 'app' && ' Application'}
                        {formData.preferredContact === 'sms' && ' SMS'}
                        {formData.preferredContact === 'ussd' && ' USSD'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-900 mb-2">Calendrier vaccinal recommandé</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <Syringe className="w-4 h-4 text-yellow-600" />
                    <span>BCG à la naissance, Polio à 6 semaines, ROR à 9 mois</span>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation entre les étapes */}
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

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400"
                >
                  {isSubmitting ? (
                    'Enregistrement...'
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Enregistrer le patient
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPatientPage;