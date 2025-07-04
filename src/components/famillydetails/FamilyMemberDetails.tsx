"use client";
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  User, 
  Camera, 
  Trash2, 
  Save, 
  Edit, 
  Mail, 
  Calendar, 
  MapPin, 
  Hash, 
  AlertCircle, 
  Baby, 
  Heart, 
  Users 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FamilyMemberDetails({ params }) {
  const router = useRouter();
  const memberId = params?.id;

  // Family members data that matches the Profile component
  const familyMembers = {
    1: {
      id: 1,
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      dob: "1995-05-15",
      city: "Yaoundé",
      neighborhood: "Melen",
      age: 30,
      relation: "Spouse",
      bloodGroup: "A+",
      vaccinationCenter: "Yaoundé Center",
      phoneNumber: "+237 6XX XXX XXX",
      emergencyContact: "John Doe (+237 6XX XXX XXX)"
    },
    2: {
      id: 2,
      firstName: "Baby",
      lastName: "Doe",
      email: "",
      dob: "2023-06-10",
      city: "Yaoundé",
      neighborhood: "Melen",
      age: 2,
      relation: "Child",
      bloodGroup: "O+",
      vaccinationCenter: "Yaoundé Pediatric Center",
      phoneNumber: "",
      emergencyContact: "John Doe (+237 6XX XXX XXX)"
    }
  };

  const [memberData, setMemberData] = useState(null);
  const [originalMemberData, setOriginalMemberData] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (memberId && familyMembers[memberId]) {
      const member = familyMembers[memberId];
      setMemberData(member);
      setOriginalMemberData({ ...member });
    } else {
      router.push('/profile');
    }
  }, [memberId, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData(prev => ({ ...prev, [name]: value }));
    
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
    
    if (!memberData.firstName.trim()) newErrors.firstName = 'Prénom requis';
    if (!memberData.lastName.trim()) newErrors.lastName = 'Nom requis';
    if (memberData.email && !/\S+@\S+\.\S+/.test(memberData.email)) newErrors.email = 'Email invalide';
    if (!memberData.dob) newErrors.dob = 'Date de naissance requise';
    if (!memberData.city.trim()) newErrors.city = 'Ville requise';
    if (!memberData.neighborhood.trim()) newErrors.neighborhood = 'Quartier requis';
    if (!memberData.age || memberData.age < 1) newErrors.age = 'Âge valide requis';
    if (!memberData.relation.trim()) newErrors.relation = 'Relation requise';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditToggle = () => {
    if (isEditing) {
      if (validateForm()) {
        console.log("Sauvegarde des données du membre:", memberData, "Photo de profil:", profilePhoto);
        setIsEditing(false);
        setOriginalMemberData({ ...memberData });
        alert('Profil du membre de la famille mis à jour avec succès!');
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setMemberData({ ...originalMemberData });
    setIsEditing(false);
    setErrors({});
    setProfilePhoto(null);
    setPreviewUrl(null);
  };

  const handleDeleteMember = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${memberData.firstName} ${memberData.lastName} de vos profils familiaux?`)) {
      console.log("Suppression du membre de la famille:", memberData.id);
      alert('Membre de la famille supprimé avec succès!');
      router.push('/profile');
    }
  };

  if (!memberData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des détails du membre...</p>
        </div>
      </div>
    );
  }

  const isChild = memberData.age < 18;

  const fieldConfig = [
    { key: 'firstName', label: 'Prénom', icon: User, type: 'text' },
    { key: 'lastName', label: 'Nom', icon: User, type: 'text' },
    { key: 'relation', label: 'Relation', icon: Users, type: 'text' },
    { key: 'email', label: 'Email', icon: Mail, type: 'email', optional: true },
    { key: 'phoneNumber', label: 'Numéro de téléphone', icon: Hash, type: 'tel', optional: true },
    { key: 'dob', label: 'Date de naissance', icon: Calendar, type: 'date' },
    { key: 'age', label: 'Âge', icon: Hash, type: 'number' },
    { key: 'bloodGroup', label: 'Groupe sanguin', icon: Heart, type: 'text' },
    { key: 'city', label: 'Ville', icon: MapPin, type: 'text' },
    { key: 'neighborhood', label: 'Quartier', icon: MapPin, type: 'text' },
    { key: 'vaccinationCenter', label: 'Centre de vaccination', icon: MapPin, type: 'text' },
    { key: 'emergencyContact', label: 'Contact d\'urgence', icon: User, type: 'text' }
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
                <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {memberData.firstName} {memberData.lastName}
                  </h1>
                  <p className="text-gray-600 text-sm flex items-center gap-2">
                    {isChild ? (
                      <>
                        <Baby className="h-4 w-4 text-pink-500" />
                        Membre de la famille - {memberData.relation}
                      </>
                    ) : (
                      <>
                        <User className="h-4 w-4 text-blue-500" />
                        Membre de la famille - {memberData.relation}
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDeleteMember}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-medium rounded-xl transition-all duration-200 hover:scale-105"
                >
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </button>
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
            </div>

            {/* Profile Photo Section */}
            <div className={`flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 p-6 rounded-2xl ${
              isChild ? 'bg-pink-50/50' : 'bg-gray-50/50'
            }`}>
              <div className="flex-shrink-0">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center overflow-hidden shadow-lg ${
                  isChild 
                    ? 'bg-gradient-to-br from-pink-100 to-pink-200' 
                    : 'bg-gradient-to-br from-blue-100 to-blue-200'
                }`}>
                  {previewUrl ? (
                    <img src={previewUrl} alt="Photo de profil" className="w-full h-full object-cover" />
                  ) : (
                    isChild ? (
                      <Baby className="h-12 w-12 text-pink-500" />
                    ) : (
                      <User className="h-12 w-12 text-blue-500" />
                    )
                  )}
                </div>
              </div>
              
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Photo de profil</h3>
                  <p className="text-gray-600 text-sm">
                    {isEditing 
                      ? "Cliquez sur les boutons ci-dessous pour modifier la photo de profil" 
                      : "Photo de profil actuelle"
                    }
                  </p>
                </div>
                
                {isEditing && (
                  <div className="flex flex-wrap gap-3">
                    <label className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 hover:scale-105 ${
                      isChild 
                        ? 'bg-pink-50 hover:bg-pink-100 text-pink-700' 
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                    }`}>
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
                {isChild ? (
                  <Baby className="h-5 w-5 text-pink-500" />
                ) : (
                  <User className="h-5 w-5 text-blue-500" />
                )}
                <h2 className="text-lg font-semibold text-gray-800">Détails du profil</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fieldConfig.map((field) => {
                  const IconComponent = field.icon;
                  const fieldValue = memberData[field.key] || '';
                  
                  if (field.optional && !fieldValue && !isEditing) {
                    return null;
                  }

                  return (
                    <div key={field.key}>
                      <label className={labelClasses}>
                        <span className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4 text-gray-500" />
                          {field.label}
                          {field.optional && <span className="text-gray-400 text-xs">(Optionnel)</span>}
                        </span>
                      </label>
                      
                      {isEditing ? (
                        field.key === 'relation' ? (
                          <select
                            name={field.key}
                            value={fieldValue}
                            onChange={handleInputChange}
                            className={inputClasses}
                          >
                            <option value="">Sélectionner la relation</option>
                            <option value="Spouse">Époux/Épouse</option>
                            <option value="Child">Enfant</option>
                            <option value="Parent">Parent</option>
                            <option value="Sibling">Frère/Sœur</option>
                            <option value="Grandparent">Grand-parent</option>
                            <option value="Grandchild">Petit-enfant</option>
                            <option value="Other">Autre</option>
                          </select>
                        ) : field.key === 'bloodGroup' ? (
                          <select
                            name={field.key}
                            value={fieldValue}
                            onChange={handleInputChange}
                            className={inputClasses}
                          >
                            <option value="">Sélectionner le groupe sanguin</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            name={field.key}
                            value={fieldValue}
                            onChange={handleInputChange}
                            className={inputClasses}
                            placeholder={`Entrez ${field.label.toLowerCase()}`}
                          />
                        )
                      ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                          <span className="text-gray-900">
                            {field.type === 'date' && fieldValue 
                              ? new Date(fieldValue).toLocaleDateString('fr-FR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                              : fieldValue || 'Non spécifié'
                            }
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
              </div>
            </div>

            {/* Additional Actions */}
            {isEditing && (
              <div className="flex justify-end gap-3 pt-8 border-t border-gray-200 mt-8">
                <button
                  onClick={handleCancel}
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
}