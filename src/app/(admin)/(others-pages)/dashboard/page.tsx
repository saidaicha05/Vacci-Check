"use client";
import { FamilyProfiles } from "@/components/dashboard/FamilyProfiles";
import { VaccineOverview } from "@/components/dashboard/VaccineOverview";
import { ArrowRight, User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Shield, Syringe } from "lucide-react";

export default function Dashboard() {
  const [language, setLanguage] = useState<"en" | "fr">("en");

  const translations = {
    en: {
      welcome: "Welcome back",
      subtitle: "Stay on top of your family's health with confidence",
    },
    fr: {
      welcome: "Bon retour",
      subtitle: "Gardez le contrôle de la santé de votre famille en toute confiance",
    },
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        {/* Welcome Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-brand-500 to-brand-600 rounded-3xl shadow-2xl mb-8">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-4xl font-bold">{t.welcome}!</h2>
                  <span className="text-2xl">👋</span>
                </div>
                <p className="text-lg opacity-90">{t.subtitle}</p>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/profile">
                  <button className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span className="font-medium">Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Stats Cards (Inside Header) */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm opacity-90">{language === "en" ? "Up to Date" : "À Jour"}</span>
                </div>
                <p className="font-medium mt-1 text-2xl">87%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center space-x-2">
                  <Syringe className="w-5 h-5" />
                  <span className="text-sm opacity-90">{language === "en" ? "Total Vaccines" : "Vaccins Totaux"}</span>
                </div>
                <p className="font-medium mt-1 text-2xl">47</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm opacity-90">{language === "en" ? "Next Reminder" : "Prochain Rappel"}</span>
                </div>
                <p className="font-medium mt-1 text-2xl">4 {language === "en" ? "days" : "jours"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content (Horizontal Layout) */}
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <div className="w-2/4">
            <VaccineOverview language={language} />
          </div>
          <div className="w-2/4">
            <FamilyProfiles language={language} />
          </div>
        </div>
      </div>
    </div>
  );
}