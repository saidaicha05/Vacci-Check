"use client";
import React, { useState } from 'react';
import { User, Calendar, Phone, Mail, MapPin, Shield, AlertCircle, ChevronRight, ChevronLeft, Check, ArrowLeft } from 'lucide-react';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import Link from 'next/link';

const MultiStepFamilyRegistration = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        relationship: '',
        bloodType: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelationship: '',
        allergies: '',
        medicalConditions: '',
        currentMedications: '',
        primaryPhysician: '',
        physicianPhone: '',
        insuranceProvider: '',
        insurancePolicyNumber: '',
        previousVaccinations: '',
        notes: ''
    });

    const [errors, setErrors] = useState({});

    const steps = [
        {
            number: 1,
            title: "Informations personnelles",
            icon: User,
            description: "Données de base du membre de la famille"
        },
        {
            number: 2,
            title: "Contact & Urgence",
            icon: Phone,
            description: "Coordonnées et contact d'urgence"
        },
        {
            number: 3,
            title: "Informations médicales",
            icon: Shield,
            description: "Historique médical et assurance"
        }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const validateStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
            if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
            if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date de naissance requise';
            if (!formData.gender) newErrors.gender = 'Genre requis';
            if (!formData.relationship) newErrors.relationship = 'Relation requise';
        }

        if (step === 2) {
            if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Adresse email invalide';
            }
            if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
                newErrors.phone = 'Numéro de téléphone invalide';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 3));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = () => {
        if (validateStep(currentStep)) {
            console.log('Formulaire soumis:', formData);
            alert('Membre de la famille enregistré avec succès!');
        }
    };

    const inputClasses = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm";
    const labelClasses = "block text-sm font-medium text-gray-700 mb-2";
    const errorClasses = "text-red-500 text-sm mt-1 flex items-center gap-1";

    const StepIndicator = () => (
        <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                    <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'mr-8' : ''}`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${currentStep > step.number
                            ? 'bg-green-500 text-white'
                            : currentStep === step.number
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-500'
                            }`}>
                            {currentStep > step.number ? <Check className="h-5 w-5" /> : step.number}
                        </div>
                        <div className="mt-2 text-center">
                            <p className={`text-sm font-medium ${currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'
                                }`}>
                                {step.title}
                            </p>
                        </div>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`w-16 h-0.5 mb-6 transition-all duration-300 ${currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                            }`} />
                    )}
                </div>
            ))}
        </div>
    );

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <User className="h-6 w-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">Informations personnelles</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className={labelClasses}>Prénom *</label>
                    <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={inputClasses}
                        placeholder="Entrez le prénom"
                    />
                    {errors.firstName && (
                        <p className={errorClasses}>
                            <AlertCircle className="h-4 w-4" />
                            {errors.firstName}
                        </p>
                    )}
                </div>

                <div>
                    <label className={labelClasses}>Nom *</label>
                    <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={inputClasses}
                        placeholder="Entrez le nom"
                    />
                    {errors.lastName && (
                        <p className={errorClasses}>
                            <AlertCircle className="h-4 w-4" />
                            {errors.lastName}
                        </p>
                    )}
                </div>

                <div>
                    <label className={labelClasses}>Date de naissance *</label>
                    <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className={inputClasses}
                    />
                    {errors.dateOfBirth && (
                        <p className={errorClasses}>
                            <AlertCircle className="h-4 w-4" />
                            {errors.dateOfBirth}
                        </p>
                    )}
                </div>

                <div>
                    <label className={labelClasses}>Genre *</label>
                    <select
                        value={formData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className={inputClasses}
                    >
                        <option value="">Sélectionnez le genre</option>
                        <option value="male">Masculin</option>
                        <option value="female">Féminin</option>
                        <option value="other">Autre</option>
                        <option value="prefer-not-to-say">Préfère ne pas dire</option>
                    </select>
                    {errors.gender && (
                        <p className={errorClasses}>
                            <AlertCircle className="h-4 w-4" />
                            {errors.gender}
                        </p>
                    )}
                </div>

                <div>
                    <label className={labelClasses}>Relation avec vous *</label>
                    <select
                        value={formData.relationship}
                        onChange={(e) => handleInputChange('relationship', e.target.value)}
                        className={inputClasses}
                    >
                        <option value="">Sélectionnez la relation</option>
                        <option value="spouse">Époux/Épouse</option>
                        <option value="child">Enfant</option>
                        <option value="parent">Parent</option>
                        <option value="sibling">Frère/Sœur</option>
                        <option value="grandparent">Grand-parent</option>
                        <option value="grandchild">Petit-enfant</option>
                        <option value="other">Autre</option>
                    </select>
                    {errors.relationship && (
                        <p className={errorClasses}>
                            <AlertCircle className="h-4 w-4" />
                            {errors.relationship}
                        </p>
                    )}
                </div>

                <div>
                    <label className={labelClasses}>Groupe sanguin</label>
                    <select
                        value={formData.bloodType}
                        onChange={(e) => handleInputChange('bloodType', e.target.value)}
                        className={inputClasses}
                    >
                        <option value="">Sélectionnez le groupe sanguin</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <Phone className="h-6 w-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">Contact & Urgence</h2>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClasses}>Adresse email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={inputClasses}
                            placeholder="Entrez l'adresse email"
                        />
                        {errors.email && (
                            <p className={errorClasses}>
                                <AlertCircle className="h-4 w-4" />
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className={labelClasses}>Numéro de téléphone</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className={inputClasses}
                            placeholder="Entrez le numéro de téléphone"
                        />
                        {errors.phone && (
                            <p className={errorClasses}>
                                <AlertCircle className="h-4 w-4" />
                                {errors.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label className={labelClasses}>Adresse</label>
                    <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className={inputClasses}
                        placeholder="Entrez l'adresse complète"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className={labelClasses}>Ville</label>
                        <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className={inputClasses}
                            placeholder="Entrez la ville"
                        />
                    </div>

                    <div>
                        <label className={labelClasses}>État/Province</label>
                        <input
                            type="text"
                            value={formData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            className={inputClasses}
                            placeholder="Entrez l'état/province"
                        />
                    </div>

                    <div>
                        <label className={labelClasses}>Code postal</label>
                        <input
                            type="text"
                            value={formData.zipCode}
                            onChange={(e) => handleInputChange('zipCode', e.target.value)}
                            className={inputClasses}
                            placeholder="Entrez le code postal"
                        />
                    </div>
                </div>
            </div>

            {/* Emergency Contact */}
            <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Contact d'urgence</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className={labelClasses}>Nom du contact</label>
                        <input
                            type="text"
                            value={formData.emergencyContactName}
                            onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                            className={inputClasses}
                            placeholder="Nom du contact d'urgence"
                        />
                    </div>

                    <div>
                        <label className={labelClasses}>Téléphone du contact</label>
                        <input
                            type="tel"
                            value={formData.emergencyContactPhone}
                            onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                            className={inputClasses}
                            placeholder="Téléphone du contact"
                        />
                    </div>

                    <div>
                        <label className={labelClasses}>Relation</label>
                        <input
                            type="text"
                            value={formData.emergencyContactRelationship}
                            onChange={(e) => handleInputChange('emergencyContactRelationship', e.target.value)}
                            className={inputClasses}
                            placeholder="Relation avec le contact"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <Shield className="h-6 w-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-800">Informations médicales</h2>
            </div>

            <div className="space-y-6">
                <div>
                    <label className={labelClasses}>Allergies connues</label>
                    <textarea
                        value={formData.allergies}
                        onChange={(e) => handleInputChange('allergies', e.target.value)}
                        className={inputClasses}
                        rows="3"
                        placeholder="Listez les allergies connues (médicaments, aliments, etc.)"
                    />
                </div>

                <div>
                    <label className={labelClasses}>Conditions médicales</label>
                    <textarea
                        value={formData.medicalConditions}
                        onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                        className={inputClasses}
                        rows="3"
                        placeholder="Listez les conditions chroniques ou problèmes de santé"
                    />
                </div>

                <div>
                    <label className={labelClasses}>Médicaments actuels</label>
                    <textarea
                        value={formData.currentMedications}
                        onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                        className={inputClasses}
                        rows="3"
                        placeholder="Listez les médicaments actuels et dosages"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClasses}>Médecin traitant</label>
                        <input
                            type="text"
                            value={formData.primaryPhysician}
                            onChange={(e) => handleInputChange('primaryPhysician', e.target.value)}
                            className={inputClasses}
                            placeholder="Nom du médecin traitant"
                        />
                    </div>

                    <div>
                        <label className={labelClasses}>Téléphone du médecin</label>
                        <input
                            type="tel"
                            value={formData.physicianPhone}
                            onChange={(e) => handleInputChange('physicianPhone', e.target.value)}
                            className={inputClasses}
                            placeholder="Téléphone du médecin"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClasses}>Assurance santé</label>
                        <input
                            type="text"
                            value={formData.insuranceProvider}
                            onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                            className={inputClasses}
                            placeholder="Nom de la compagnie d'assurance"
                        />
                    </div>

                    <div>
                        <label className={labelClasses}>Numéro de police</label>
                        <input
                            type="text"
                            value={formData.insurancePolicyNumber}
                            onChange={(e) => handleInputChange('insurancePolicyNumber', e.target.value)}
                            className={inputClasses}
                            placeholder="Numéro de police d'assurance"
                        />
                    </div>
                </div>

                <div>
                    <label className={labelClasses}>Vaccinations précédentes</label>
                    <textarea
                        value={formData.previousVaccinations}
                        onChange={(e) => handleInputChange('previousVaccinations', e.target.value)}
                        className={inputClasses}
                        rows="4"
                        placeholder="Listez les vaccinations précédentes avec dates approximatives"
                    />
                </div>

                <div>
                    <label className={labelClasses}>Notes additionnelles</label>
                    <textarea
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        className={inputClasses}
                        rows="3"
                        placeholder="Informations supplémentaires ou considérations spéciales"
                    />
                </div>
            </div>
        </div>
    );

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return renderStep1();
            case 2:
                return renderStep2();
            case 3:
                return renderStep3();
            default:
                return renderStep1();
        }
    };

    return (
        <div className="min-h-screen">
            <PageBreadcrumb pageTitle="Add Member" />
            <div className="max-w-4xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
                    {/* Header */}
                    {/* <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
                        <div className="flex items-center gap-3">
                            <Link href="/profile">
                                <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-brand-600 hover:scale-110 transition-all duration-300" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Ajouter un membre de la famille</h1>
                                <p className="text-blue-100 text-sm">Enregistrez un nouveau membre pour le suivi des vaccinations</p>
                            </div>
                        </div>
                    </div> */}

                    <div className="p-8">
                        <Link href="/profile" className="p-2  rounded-xl transition-colors duration-200">
                            <ArrowLeft className="h-5 w-5 text-gray-600" />
                        </Link>
                        {/* Step Indicator */}
                        <StepIndicator />

                        {/* Form Content */}
                        <div className="mb-8">
                            {renderCurrentStep()}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${currentStep === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105'
                                    }`}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Précédent
                            </button>

                            {currentStep < 3 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Suivant
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    <Check className="h-4 w-4" />
                                    Enregistrer le membre
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiStepFamilyRegistration;