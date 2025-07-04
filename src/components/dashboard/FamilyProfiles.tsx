import React from 'react';
import { Users, Plus, Edit3, User } from 'lucide-react';

interface FamilyProfilesProps {
  language: 'en' | 'fr';
}

export const FamilyProfiles: React.FC<FamilyProfilesProps> = ({ language }) => {
  const translations = {
    en: {
      title: "Family Profiles",
      addMember: "Member",
      edit: "Edit",
      viewProfile: "View Profile",
      members: "members",
      lastUpdated: "Last updated"
    },
    fr: {
      title: "Profils Familiaux",
      addMember: "Ajouter Membre",
      edit: "Modifier",
      viewProfile: "Voir Profil",
      members: "membres",
      lastUpdated: "Dernière mise à jour"
    }
  };

  const t = translations[language];

  const familyMembers = [
    {
      id: 1,
      name: "John Doe",
      role: "Father",
      age: 45,
      vaccinesUpToDate: 8,
      totalVaccines: 10,
      lastUpdated: "2025-06-15",
      avatar: "JD"
    },
    {
      id: 2,
      name: "Jane Doe",
      role: "Mother",
      age: 42,
      vaccinesUpToDate: 9,
      totalVaccines: 10,
      lastUpdated: "2025-06-10",
      avatar: "JA"
    },
    {
      id: 3,
      name: "Michael Doe",
      role: "Son",
      age: 16,
      vaccinesUpToDate: 12,
      totalVaccines: 15,
      lastUpdated: "2025-06-18",
      avatar: "MD"
    },
    // {
    //   id: 4,
    //   name: "Emily Doe",
    //   role: "Daughter",
    //   age: 12,
    //   vaccinesUpToDate: 10,
    //   totalVaccines: 12,
    //   lastUpdated: "2025-06-20",
    //   avatar: "ED"
    // }
  ];

  const getVaccineStatusColor = (upToDate: number, total: number) => {
    const percentage = (upToDate / total) * 100;
    if (percentage === 100) return 'text-green-600';
    if (percentage >= 80) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-500/10 rounded-lg">
            <Users className="w-5 h-5 text-brand-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{t.title}</h2>
        </div>
        
        <button className="flex items-center gap-2 px-3 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" />
          {t.addMember}
        </button>
      </div>

      <div className="space-y-3">
        {familyMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-all hover:bg-gray-100/70"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {member.avatar}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-gray-900 truncate">{member.name}</h3>
                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                  {member.role}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Age: {member.age}</span>
                <span className={`font-medium ${getVaccineStatusColor(member.vaccinesUpToDate, member.totalVaccines)}`}>
                  {member.vaccinesUpToDate}/{member.totalVaccines} vaccins
                </span>
              </div>
              
              <div className="text-xs text-gray-500 mt-1">
                {t.lastUpdated}: {member.lastUpdated}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
              {/* <button className="p-2 text-gray-400 hover:text-brand-500 hover:bg-brand-50 rounded-lg transition-colors">
                <User className="w-4 h-4" />
              </button> */}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="text-center text-sm text-gray-500">
          {familyMembers.length} {t.members}
        </div>
      </div>
    </div>
  );
};