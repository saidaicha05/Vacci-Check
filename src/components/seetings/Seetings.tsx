"use client";
import React, { useState } from "react";
import {
    ArrowRight,
    User,
    Users,
    Lock,
    Shield,
    Trash2,
    UserX,
    Eye,
    EyeOff,
    Check,
    X,
    AlertTriangle,
    Baby,
    Settings as SettingsIcon,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function Settings() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);

    const familyProfiles = [
        { id: 1, firstName: "Jane", lastName: "Doe", age: 30, relation: "Spouse", isActive: true },
        { id: 2, firstName: "Baby", lastName: "Doe", age: 2, relation: "Child", isActive: true },
    ];

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        // Handle password change logic here
        console.log("Password change requested");
    };

    const handleDeleteAccount = () => {
        // Handle account deletion logic here
        console.log("Account deletion requested");
        setShowDeleteConfirmation(false);
    };

    const handleDeactivateProfile = (profileId) => {
        // Handle profile deactivation logic here
        console.log(`Profile ${profileId} deactivation requested`);
        setShowDeactivateModal(false);
        setSelectedProfile(null);
    };

    const openDeactivateModal = (profile) => {
        setSelectedProfile(profile);
        setShowDeactivateModal(true);
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Account Security Section */}
                <div>
                    <div className="flex">
                        <Link href="/profile" className="p-2">
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                    </Link>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Account Security</h2>
                    </div>

                    {/* Change Password */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
                        <div className="flex items-center space-x-3 mb-6">
                            <Lock className="w-5 h-5 text-brand-600" />
                            <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                        </div>

                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div>
                                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showCurrentPassword ? "text" : "password"}
                                        id="currentPassword"
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-300"
                                        placeholder="Enter current password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-300"
                                    >
                                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        id="newPassword"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-300"
                                        placeholder="Enter new password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-300"
                                    >
                                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-300"
                                        placeholder="Confirm new password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-300"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                            >
                                Update Password
                            </button>
                        </form>
                    </div>
                </div>

                {/* Family Profile Management */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Family Profile Management</h2>

                    <div className="space-y-4">
                        {familyProfiles.map((profile) => (
                            <div key={profile.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${profile.age < 18 ? 'bg-pink-100' : 'bg-gray-100'}`}>
                                            {profile.age < 18 ? (
                                                <Baby className="w-6 h-6 text-pink-600" />
                                            ) : (
                                                <User className="w-6 h-6 text-gray-600" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {profile.firstName} {profile.lastName}
                                            </h3>
                                            <p className="text-gray-500 text-sm">{profile.relation}</p>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${profile.isActive
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {profile.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => openDeactivateModal(profile)}
                                        className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300 transform hover:scale-105"
                                    >
                                        <UserX className="w-5 h-5" />
                                        <span className="font-medium">
                                            {profile.isActive ? 'Deactivate' : 'Reactivate'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Danger Zone */}
                <div>
                    <h2 className="text-2xl font-semibold text-red-600 mb-6">Danger Zone</h2>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-200">
                        <div className="flex items-center space-x-3 mb-4">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                            <h3 className="text-lg font-semibold text-red-600">Delete Account</h3>
                        </div>

                        <p className="text-gray-600 mb-6">
                            Once you delete your account, there is no going back. This action will permanently delete
                            your account and all associated data, including family profiles.
                        </p>

                        <button
                            onClick={() => setShowDeleteConfirmation(true)}
                            className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                            <Trash2 className="w-5 h-5" />
                            <span>Delete Account</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Delete Account Confirmation Modal */}
            {showDeleteConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
                        <div className="flex items-center space-x-3 mb-4">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                            <h3 className="text-xl font-semibold text-gray-900">Confirm Account Deletion</h3>
                        </div>

                        <p className="text-gray-600 mb-6">
                            Are you absolutely sure you want to delete your account? This action cannot be undone
                            and will permanently remove all your data and family profiles.
                        </p>

                        <div className="flex space-x-4">
                            <button
                                onClick={() => setShowDeleteConfirmation(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-medium"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Deactivate Profile Modal */}
            {showDeactivateModal && selectedProfile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
                        <div className="flex items-center space-x-3 mb-4">
                            <UserX className="w-6 h-6 text-orange-600" />
                            <h3 className="text-xl font-semibold text-gray-900">
                                {selectedProfile.isActive ? 'Deactivate' : 'Reactivate'} Profile
                            </h3>
                        </div>

                        <p className="text-gray-600 mb-6">
                            Are you sure you want to {selectedProfile.isActive ? 'deactivate' : 'reactivate'} the profile for{' '}
                            <span className="font-semibold">{selectedProfile.firstName} {selectedProfile.lastName}</span>?
                            {selectedProfile.isActive && ' This will disable access to their vaccination records and appointments.'}
                        </p>

                        <div className="flex space-x-4">
                            <button
                                onClick={() => {
                                    setShowDeactivateModal(false);
                                    setSelectedProfile(null);
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeactivateProfile(selectedProfile.id)}
                                className={`flex-1 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium ${selectedProfile.isActive
                                        ? 'bg-orange-600 hover:bg-orange-700 text-white'
                                        : 'bg-green-600 hover:bg-green-700 text-white'
                                    }`}
                            >
                                {selectedProfile.isActive ? 'Deactivate' : 'Reactivate'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}