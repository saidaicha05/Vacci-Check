"use client"
import React, { useState } from 'react';
import { User, FileText, Image, CheckCircle, X } from 'lucide-react';

const AdverseEventsReportPage = () => {
  // Form states
  const [patientId, setPatientId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mock symptom options (WHO-standardized)
  const symptomOptions = [
    'Fièvre',
    'Nausée',
    'Rash cutané',
    'Douleur locale',
    'Fatigue',
    'Maux de tête',
    'Réaction allergique',
    'Autres'
  ];

  // Handle symptom selection
  const handleSymptomToggle = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom) 
        : [...prev, symptom]
    );
  };

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log({
      patientId,
      patientName,
      symptoms,
      severity,
      description,
      photo: photo ? photo.name : null
    });
    setToastMessage('Rapport d\'effet indésirable soumis avec succès');
    setTimeout(() => setToastMessage(null), 3000);
    
    // Reset form
    setPatientId('');
    setPatientName('');
    setSymptoms([]);
    setSeverity('');
    setDescription('');
    setPhoto(null);
  };

  // Toast component
  const Toast = ({ message }: { message: string }) => (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
      <CheckCircle className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Main content header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Signaler un effet indésirable</h1>
            <p className="text-gray-600">Formulaire standardisé OMS pour la pharmacovigilance</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patient Identification */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Identification du patient (optionnel)
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">ID du patient</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Entrez l'ID du patient"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Nom du patient</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Entrez le nom du patient"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Symptoms and Severity */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Description des symptômes
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Symptômes observés</label>
                    <div className="grid grid-cols-2 gap-2">
                      {symptomOptions.map((symptom) => (
                        <div key={symptom} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={symptom}
                            className="w-4 h-4"
                            checked={symptoms.includes(symptom)}
                            onChange={() => handleSymptomToggle(symptom)}
                          />
                          <label htmlFor={symptom} className="text-sm">{symptom}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Gravité (1-5)</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value)}
                      required
                    >
                      <option value="">Sélectionner la gravité</option>
                      {[1, 2, 3, 4, 5].map((level) => (
                        <option key={level} value={level}>{level} - {level === 1 ? 'Mineur' : level === 5 ? 'Critique' : 'Modéré'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                Détails supplémentaires
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Description détaillée</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Décrivez les symptômes en détail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Photo des manifestations cutanées (optionnel)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      className="p-2 border border-gray-300 rounded-lg"
                      onChange={handlePhotoUpload}
                    />
                    {photo && (
                      <span className="text-sm text-gray-600">{photo.name}</span>
                    )}
                    <Image className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                onClick={() => {
                  setPatientId('');
                  setPatientName('');
                  setSymptoms([]);
                  setSeverity('');
                  setDescription('');
                  setPhoto(null);
                }}
              >
                Réinitialiser
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Soumettre le rapport
              </button>
            </div>
          </form>
        </div>

        {/* Toast */}
        {toastMessage && <Toast message={toastMessage} />}
      </div>
    </div>
  );
};

export default AdverseEventsReportPage;