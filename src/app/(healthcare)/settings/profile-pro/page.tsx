"use client";
import React, { useState } from 'react';
import { ArrowLeft, User, Camera, Trash2, Save, Edit, Mail, Phone, BriefcaseMedical, Shield, MapPin, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ProfessionalProfile() {
  const [professionalData, setProfessionalData] = useState({
    nom: "Kwamé",
    prenoms: "Jean Dupont",
    fonction: "medecin",
    numero_licence: "CM12345678",
    telephone: "+237 6 12 34 56 78",
    email: "kwame.jean@example.com",
    hopital: {
      id: 1,
      nom: "Hôpital Central de Yaoundé",
      region: "Centre"
    }
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfessionalData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handlePhotoDelete = () => {
    setProfilePhoto(null);
    setPreviewUrl(null);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!professionalData.nom.trim()) newErrors.nom = 'Nom requis';
    if (!professionalData.prenoms.trim()) newErrors.prenoms = 'Prénoms requis';
    if (!professionalData.numero_licence.trim()) newErrors.numero_licence = 'Numéro de licence requis';
    if (!professionalData.telephone.trim()) newErrors.telephone = 'Téléphone requis';
    if (!professionalData.email.trim()) newErrors.email = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(professionalData.email)) newErrors.email = 'Email invalide';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditToggle = () => {
    if (isEditing) {
      if (validateForm()) {
        console.log("Données mises à jour:", professionalData);
        setIsEditing(false);
        alert('Profil mis à jour avec succès!');
      }
    } else {
      setIsEditing(true);
    }
  };

  const fonctionOptions = [
    { value: 'medecin', label: 'Médecin' },
    { value: 'infirmier', label: 'Infirmier' },
    { value: 'sage_femme', label: 'Sage-femme' },
    { value: 'aide_soignant', label: 'Aide-soignant' }
  ];

  const fieldConfig = [
    { key: 'nom', label: 'Nom', icon: User, type: 'text' },
    { key: 'prenoms', label: 'Prénoms', icon: User, type: 'text' },
    { key: 'numero_licence', label: 'Numéro de licence', icon: Shield, type: 'text' },
    { key: 'telephone', label: 'Téléphone', icon: Phone, type: 'tel' },
    { key: 'email', label: 'Email', icon: Mail, type: 'email' }
  ];

  const inputClasses = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-2";
  const errorClasses = "text-red-500 text-sm mt-1 flex items-center gap-1";

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          
          {/* Content */}
          <div className="p-8">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Profil Professionnel</h1>
                  <p className="text-gray-600 text-sm">Gérez vos informations professionnelles</p>
                </div>
              </div>
              <button
                onClick={handleEditToggle}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4" />
                    Sauvegarder
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4" />
                    Modifier
                  </>
                )}
              </button>
            </div>

            {/* Profile Photo Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 p-6 bg-gray-50/50 rounded-2xl">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden shadow-lg">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Photo de profil" className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-12 w-12 text-blue-500" />
                  )}
                </div>
              </div>
              
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Photo de profil</h3>
                  <p className="text-gray-600 text-sm">
                    {isEditing 
                      ? "Cliquez sur les boutons ci-dessous pour modifier votre photo de profil" 
                      : "Votre photo de profil actuelle"
                    }
                  </p>
                </div>
                
                {isEditing && (
                  <div className="flex flex-wrap gap-3">
                    <label className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:scale-105">
                      <Camera className="h-4 w-4" />
                      {previewUrl ? "Changer la photo" : "Ajouter une photo"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoChange}
                      />
                    </label>
                    
                    {previewUrl && (
                      <button
                        onClick={handlePhotoDelete}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                      >
                        <Trash2 className="h-4 w-4" />
                        Supprimer
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Information Fields */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6">
                <BriefcaseMedical className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-800">Informations professionnelles</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fieldConfig.map((field) => {
                  const IconComponent = field.icon;
                  return (
                    <div key={field.key}>
                      <label className={labelClasses}>
                        <span className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4 text-gray-500" />
                          {field.label}
                        </span>
                      </label>
                      
                      {isEditing ? (
                        <input
                          type={field.type}
                          name={field.key}
                          value={professionalData[field.key]}
                          onChange={handleInputChange}
                          className={inputClasses}
                          placeholder={`Entrez votre ${field.label.toLowerCase()}`}
                        />
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                          <span className="text-gray-900">
                            {professionalData[field.key]}
                          </span>
                        </div>
                      )}
                      
                      {errors[field.key] && (
                        <p className={errorClasses}>
                          <AlertCircle className="h-4 w-4" />
                          {errors[field.key]}
                        </p>
                      )}
                    </div>
                  );
                })}

                {/* Fonction (select) */}
                <div>
                  <label className={labelClasses}>
                    <span className="flex items-center gap-2">
                      <BriefcaseMedical className="h-4 w-4 text-gray-500" />
                      Fonction
                    </span>
                  </label>
                  {isEditing ? (
                    <select
                      name="fonction"
                      value={professionalData.fonction}
                      onChange={handleInputChange}
                      className={inputClasses}
                    >
                      {fonctionOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="text-gray-900">
                        {fonctionOptions.find(f => f.value === professionalData.fonction)?.label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Hôpital et région (non editable) */}
                <div>
                  <label className={labelClasses}>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      Établissement
                    </span>
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="text-gray-900 font-medium">{professionalData.hopital.nom}</p>
                    <p className="text-gray-600 text-sm">Région: {professionalData.hopital.region}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Actions */}
            {isEditing && (
              <div className="flex justify-end gap-3 pt-8 border-t border-gray-200 mt-8">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setErrors({});
                  }}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:scale-105"
                >
                  Annuler
                </button>
                <button
                  onClick={handleEditToggle}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <Save className="h-4 w-4" />
                  Confirmer les modifications
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};