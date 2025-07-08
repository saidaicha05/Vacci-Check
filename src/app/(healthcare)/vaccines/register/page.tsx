"use client"
import React, { useState } from 'react';
import { 
  Syringe, Search, Calendar, AlertTriangle, 
  Save, X, User, CheckCircle, Clock,
  Package, MapPin, Phone, Smartphone
} from 'lucide-react';
import Link from 'next/link';

const VaccineRegisterPage = () => {
  // États pour la recherche de patient
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  // États pour l'enregistrement de vaccination
  const [vaccineData, setVaccineData] = useState({
    vaccineId: '',
    batchNumber: '',
    administrationDate: '',
    administrationTime: '',
    location: '',
    administrator: '',
    nextDueDate: '',
    notes: '',
    adverseReaction: false,
    reactionDescription: ''
  });

  // États pour la gestion du formulaire
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Calendrier vaccinal (exemple)
  const vaccines = [
    {
      id: 'bcg',
      name: 'BCG',
      description: 'Bacille Calmette-Guérin (Tuberculose)',
      ageRecommended: 'À la naissance',
      schedule: 'Dose unique'
    },
    {
      id: 'polio1',
      name: 'Polio 1',
      description: 'Poliomyélite - Première dose',
      ageRecommended: '6 semaines',
      schedule: '1ère dose'
    },
    {
      id: 'polio2',
      name: 'Polio 2',
      description: 'Poliomyélite - Deuxième dose',
      ageRecommended: '10 semaines',
      schedule: '2ème dose'
    },
    {
      id: 'polio3',
      name: 'Polio 3',
      description: 'Poliomyélite - Troisième dose',
      ageRecommended: '14 semaines',
      schedule: '3ème dose'
    },
    {
      id: 'ror',
      name: 'ROR',
      description: 'Rougeole, Oreillons, Rubéole',
      ageRecommended: '9 mois',
      schedule: 'Dose unique'
    }
  ];

  // Recherche de patients
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.length > 2) {
      const results = patients.filter(patient =>
        patient.firstName.toLowerCase().includes(term.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(term.toLowerCase()) ||
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
    setSearchResults([]);
    setSearchTerm('');
  };

  // Gestion des changements de formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVaccineData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
      // router.push('/vaccines');
    } catch (error) {
      console.error("Erreur d'enregistrement:", error);
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
              <Syringe className="text-green-600" />
              Enregistrer une vaccination
            </h1>
            <Link href="/vaccines" className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </Link>
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
                  {step === 1 && 'Patient'}
                  {step === 2 && 'Vaccin'}
                  {step === 3 && 'Confirmation'}
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit}>
            {/* Étape 1: Sélection du patient */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Sélection du patient</h2>

                {/* Recherche de patient */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Rechercher un patient (nom, prénom, ID national)"
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
                              {patient.firstName} {patient.lastName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Né(e) le {patient.birthDate} • {patient.gender === 'M' ? 'Masculin' : 'Féminin'}
                            </p>
                            <p className="text-sm text-gray-600">
                              ID: {patient.nationalId} • {patient.phone}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-green-600">Dernier: {patient.lastVaccine}</p>
                            <p className="text-sm text-orange-600">À venir: {patient.nextDue}</p>
                          </div>
                        </div>
                      </div>
                    ))}
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
                        <p className="font-medium">{selectedPatient.firstName} {selectedPatient.lastName}</p>
                        <p className="text-sm text-gray-600">
                          {selectedPatient.gender === 'M' ? 'Masculin' : 'Féminin'} • Né(e) le {selectedPatient.birthDate}
                        </p>
                        <p className="text-sm text-gray-600">ID: {selectedPatient.nationalId}</p>
                      </div>
                      <div>
                        <p className="text-sm flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {selectedPatient.phone}
                        </p>
                        <p className="text-sm flex items-center gap-1">
                          <Smartphone className="w-3 h-3" />
                          {selectedPatient.hasSmartphone ? 'Smartphone disponible' : 'Pas de smartphone'}
                        </p>
                        <p className="text-sm text-green-600">Prochain vaccin recommandé: {selectedPatient.nextDue}</p>
                      </div>
                    </div>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vaccin administré *</label>
                    <select
                      name="vaccineId"
                      value={vaccineData.vaccineId}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de lot *</label>
                    <div className="relative">
                      <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="batchNumber"
                        value={vaccineData.batchNumber}
                        onChange={handleChange}
                        className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Ex: LOT123456"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date d'administration *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        name="administrationDate"
                        value={vaccineData.administrationDate}
                        onChange={handleChange}
                        className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Heure d'administration</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="time"
                        name="administrationTime"
                        value={vaccineData.administrationTime}
                        onChange={handleChange}
                        className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lieu d'administration</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={vaccineData.location}
                        onChange={handleChange}
                        className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Ex: Centre de santé de Douala"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Administrateur</label>
                    <input
                      type="text"
                      name="administrator"
                      value={vaccineData.administrator}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Nom de l'agent de santé"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prochaine vaccination prévue</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        name="nextDueDate"
                        value={vaccineData.nextDueDate}
                        onChange={handleChange}
                        className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      name="notes"
                      value={vaccineData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Observations particulières..."
                    />
                  </div>
                </div>

                {/* Signalement d'effet indésirable */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      name="adverseReaction"
                      checked={vaccineData.adverseReaction}
                      onChange={handleChange}
                      className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                    />
                    <label className="text-sm font-medium text-red-800">
                      Effet indésirable observé
                    </label>
                  </div>
                  {vaccineData.adverseReaction && (
                    <textarea
                      name="reactionDescription"
                      value={vaccineData.reactionDescription}
                      onChange={handleChange}
                      rows={2}
                      className="w-full mt-2 p-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Décrire l'effet indésirable observé..."
                    />
                  )}
                </div>
              </div>
            )}

            {/* Étape 3: Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Confirmation de l'enregistrement</h2>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" />
                    <p className="text-green-800">Veuillez vérifier attentivement les informations avant de soumettre</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-500" />
                      Informations du patient
                    </h3>
                    {selectedPatient && (
                      <div className="space-y-2">
                        <p><span className="font-medium">Nom:</span> {selectedPatient.firstName} {selectedPatient.lastName}</p>
                        <p><span className="font-medium">Date de naissance:</span> {selectedPatient.birthDate}</p>
                        <p><span className="font-medium">Genre:</span> {selectedPatient.gender === 'M' ? 'Masculin' : 'Féminin'}</p>
                        <p><span className="font-medium">ID National:</span> {selectedPatient.nationalId}</p>
                        <p><span className="font-medium">Téléphone:</span> {selectedPatient.phone}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      <Syringe className="w-4 h-4 text-green-500" />
                      Informations du vaccin
                    </h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Vaccin:</span> {vaccines.find(v => v.id === vaccineData.vaccineId)?.name || 'Non spécifié'}</p>
                      <p><span className="font-medium">Lot:</span> {vaccineData.batchNumber || 'Non spécifié'}</p>
                      <p><span className="font-medium">Date:</span> {vaccineData.administrationDate || 'Non spécifié'}</p>
                      <p><span className="font-medium">Heure:</span> {vaccineData.administrationTime || 'Non spécifié'}</p>
                      <p><span className="font-medium">Lieu:</span> {vaccineData.location || 'Non spécifié'}</p>
                      <p><span className="font-medium">Administrateur:</span> {vaccineData.administrator || 'Non spécifié'}</p>
                      <p><span className="font-medium">Prochaine vaccination:</span> {vaccineData.nextDueDate || 'Non spécifié'}</p>
                    </div>
                  </div>
                </div>

                {vaccineData.adverseReaction && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-medium text-red-900 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Effet indésirable signalé
                    </h3>
                    <p className="text-sm text-red-800">{vaccineData.reactionDescription}</p>
                  </div>
                )}

                {vaccineData.notes && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-900 mb-2">Notes</h3>
                    <p className="text-sm text-blue-800">{vaccineData.notes}</p>
                  </div>
                )}
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
                  disabled={currentStep === 1 && !selectedPatient}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300"
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
                      Enregistrer la vaccination
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

export default VaccineRegisterPage;