"use client";
import React, { useState } from "react";
import { 
  ArrowRight, 
  User,
  Plus,
  Baby,
  Settings,
  Syringe,
} from "lucide-react";
import Link from "next/link";

export default function Profile() {
  const [userData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    dob: "1990-01-01",
    city: "Yaoundé",
    neighborhood: "Melen",
    vaccinationCenter: "Yaoundé Center",
    bloodGroup: "O+",
    age: 35,
  });

  const profiles = [
    { 
      id: 1, 
      firstName: "Jane", 
      lastName: "Doe", 
      age: 30, 
      dob: "1995-05-15", 
      relation: "Spouse" 
    },
    { 
      id: 2, 
      firstName: "Baby", 
      lastName: "Doe", 
      age: 2, 
      dob: "2023-06-10", 
      relation: "Child" 
    },
  ];

  return (
    <div className="min-h-scree">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* My Profile Section */}
        <div>
          {/* Personal Information */}
          <Link href="/profile/user-details">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100 hover:bg-gray-50 hover:shadow-xl transition-all duration-300 transform">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-brand-600" />
                  <span className="font-medium text-gray-900">Personal Information</span>
                </div>
                <ArrowRight className="w-5 h-5 text-brand-600 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Vaccination Information */}
          <Link href="/profile/vaccination-details">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100 hover:bg-gray-50 hover:shadow-xl transition-all duration-300 transform">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Syringe className="w-5 h-5 text-brand-600" />
                  <span className="font-medium text-gray-900">Vaccination Information</span>
                </div>
                <ArrowRight className="w-5 h-5 text-brand-600 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Settings */}
          <Link href="/profile/settings">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100 hover:bg-gray-50 hover:shadow-xl transition-all duration-300 transform">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-brand-600" />
                  <span className="font-medium text-gray-900">Settings</span>
                </div>
                <ArrowRight className="w-5 h-5 text-brand-600 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>

        {/* Family Profiles */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Family Profiles</h2>
            <Link href="/profile/add-member" className="text-brand-600 hover:text-brand-700 hover:scale-105 font-medium flex items-center space-x-2 transition-all duration-300 transform">
              <Plus className="w-5 h-5 transition-transform duration-300 hover:rotate-90" />
              <span>Add Member</span>
            </Link>
          </div>

          <div className="space-y-6">
            {profiles.map((profile) => (
              <Link key={profile.id} href={`/profile/add-member/members-details/${profile.id}`}>
                <div className="mb-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 transform cursor-pointer">
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${profile.age < 18 ? 'bg-pink-100 hover:bg-pink-200' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        {profile.age < 18 ? (
                          <Baby className="w-6 h-6 text-pink-600" />
                        ) : (
                          <User className="w-6 h-6 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {profile.firstName} {profile.lastName}
                        </h3>
                        <p className="text-gray-500 text-sm">{profile.relation}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-brand-600 hover:text-brand-700 hover:scale-110 transition-all duration-300 transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}