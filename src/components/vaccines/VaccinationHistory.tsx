"use client";
import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Shield,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Filter,
  Search,
  Syringe,
  FileText,
  Award,
  TrendingUp,
  User,
  Building,
  Badge,
  CalendarIcon,
} from "lucide-react";

// Simuler le composant PageBreadcrumb
const PageBreadcrumb = ({ pageTitle }) => (
  <div className="bg-gray-50 border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <span>Home</span>
        <span>/</span>
        <span className="text-blue-600 font-medium">{pageTitle}</span>
      </nav>
      <h1 className="text-2xl font-bold text-gray-900 mt-2">{pageTitle}</h1>
    </div>
  </div>
);

export default function VaccinationHistory() {
  const [userData] = useState({
    firstName: "John",
    lastName: "Doe",
    totalVaccinations: 8,
    completedSeries: 3,
    upcomingVaccinations: 1,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const vaccinationHistory = [
    {
      id: 1,
      vaccineName: "COVID-19 Booster",
      manufacturer: "Pfizer-BioNTech",
      date: "2024-01-15",
      center: "Yaoundé Center",
      batchNumber: "FF1234",
      status: "completed",
      nextDue: null,
      certificate: true,
      sideEffects: "None reported",
      administered_by: "Dr. Marie Ngom",
    },
    {
      id: 2,
      vaccineName: "Influenza (Flu)",
      manufacturer: "Sanofi",
      date: "2023-10-20",
      center: "Douala Medical Center",
      batchNumber: "FLU5678",
      status: "completed",
      nextDue: "2024-10-20",
      certificate: true,
      sideEffects: "Mild soreness at injection site",
      administered_by: "Nurse Paul Ekotto",
    },
    {
      id: 3,
      vaccineName: "Hepatitis B (Series 3/3)",
      manufacturer: "GSK",
      date: "2023-08-10",
      center: "Yaoundé Center",
      batchNumber: "HEP9012",
      status: "completed",
      nextDue: null,
      certificate: true,
      sideEffects: "None reported",
      administered_by: "Dr. Jean Mballa",
    },
    {
      id: 4,
      vaccineName: "Yellow Fever",
      manufacturer: "Institut Pasteur",
      date: "2023-06-05",
      center: "International Vaccination Center",
      batchNumber: "YF3456",
      status: "completed",
      nextDue: "2033-06-05",
      certificate: true,
      sideEffects: "Mild fever for 1 day",
      administered_by: "Dr. Claire Fotso",
    },
    {
      id: 5,
      vaccineName: "Meningitis ACWY",
      manufacturer: "Novartis",
      date: "2023-03-12",
      center: "Yaoundé Center",
      batchNumber: "MEN7890",
      status: "completed",
      nextDue: "2028-03-12",
      certificate: true,
      sideEffects: "None reported",
      administered_by: "Nurse Anne Biyong",
    },
    {
      id: 6,
      vaccineName: "Typhoid",
      manufacturer: "Sanofi",
      date: "2023-01-18",
      center: "Travel Health Clinic",
      batchNumber: "TYP1357",
      status: "completed",
      nextDue: "2026-01-18",
      certificate: true,
      sideEffects: "Mild headache",
      administered_by: "Dr. Robert Nana",
    },
  ];

  const upcomingVaccinations = [
    {
      id: 7,
      vaccineName: "Influenza (Flu) 2024",
      scheduledDate: "2024-10-15",
      center: "Yaoundé Center",
      status: "scheduled",
      reminder: true,
    },
  ];

  // Fonction pour générer un PDF individuel
  const generateIndividualPDF = (vaccine) => {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      console.error('jsPDF or jsPDF-AutoTable not loaded');
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Setting font to Times New Roman
    doc.setFont("times", "normal");
    doc.setTextColor(0, 0, 0);

    // Header - Centered, contained within page margins
    doc.setFillColor(0, 100, 0);
    doc.rect(0, 0, 210, 40, "F"); // Green header background
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text("REPUBLIC OF CAMEROON", 105, 15, { align: "center" });
    doc.text("Peace - Work - Fatherland", 105, 25, { align: "center" });
    doc.text("MINISTRY OF PUBLIC HEALTH", 105, 35, { align: "center" });

    // Title
    doc.setTextColor(0, 0, 0);
    doc.setFont("times", "bold");
    doc.setFontSize(18);
    doc.text("VACCINATION CERTIFICATE", 105, 55, { align: "center" });

    let y = 75;

    // Patient Information (each on a new line)
    doc.setFontSize(12);
    doc.setFont("times", "bold");
    doc.text("Patient Name:", 20, y);
    doc.setFont("times", "normal");
    doc.text(`${userData.firstName} ${userData.lastName}`, 60, y);
    y += 10;

    doc.setFont("times", "bold");
    doc.text("Administered By:", 20, y);
    doc.setFont("times", "normal");
    doc.text(vaccine.administered_by, 60, y);
    y += 10;

    doc.setFont("times", "bold");
    doc.text("Vaccination Center:", 20, y);
    doc.setFont("times", "normal");
    doc.text(vaccine.center, 60, y);
    y += 15;

    // Table for other information
    const tableData = [
      ["Vaccine", vaccine.vaccineName],
      ["Manufacturer", vaccine.manufacturer],
      ["Date Administered", new Date(vaccine.date).toLocaleDateString("en-US")],
      ["Batch Number", vaccine.batchNumber],
    ];

    if (vaccine.nextDue) {
      tableData.push(["Next Due", new Date(vaccine.nextDue).toLocaleDateString("en-US")]);
    }

    // Adding table using autoTable
    doc.autoTable({
      startY: y,
      head: [["Field", "Details"]],
      body: tableData,
      theme: 'grid',
      styles: {
        font: "times",
        fontSize: 10,
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [0, 100, 0],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      margin: { left: 20, right: 20 },
    });

    y = doc.lastAutoTable.finalY + 15;

    // Side Effects Section
    doc.setFont("times", "bold");
    doc.text("Side Effects:", 20, y);
    y += 10;

    if (vaccine.sideEffects.toLowerCase().includes("none")) {
      doc.setFont("times", "normal");
      doc.text("None reported", 20, y);
    } else {
      const effects = vaccine.sideEffects.split(",").map((effect) => effect.trim());
      effects.forEach((effect) => {
        doc.setFont("times", "normal");
        doc.text(`• ${effect}`, 25, y);
        y += 8;
      });
    }

    // Footer - Vaccination Center
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.text(`Issued by: ${vaccine.center}`, 190, 280, { align: "right" });

    // Save the PDF
    doc.save(
      `vaccination-certificate-${vaccine.vaccineName.replace(/\s+/g, "-").toLowerCase()}-${userData.firstName.toLowerCase()}.pdf`
    );
  };

  // Fonction pour générer le PDF complet
  const generateCompletePDF = () => {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      console.error('jsPDF or jsPDF-AutoTable not loaded');
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Header
    doc.setFillColor(0, 100, 0);
    doc.rect(0, 0, 210, 50, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.text("REPUBLIC OF CAMEROON", 105, 15, { align: "center" });
    doc.setFontSize(12);
    doc.text("Peace - Work - Fatherland", 105, 25, { align: "center" });
    
    doc.line(20, 30, 190, 30);
    
    doc.text("REPUBLIC OF CAMEROON", 105, 35, { align: "center" });
    doc.text("Peace - Work - Fatherland", 105, 42, { align: "center" });
    
    doc.setFontSize(14);
    doc.text("MINISTRY OF PUBLIC HEALTH", 105, 55, { align: "center" });

    // Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text("COMPLETE VACCINATION HISTORY", 105, 75, { align: "center" });

    // Patient Information
    doc.setFontSize(14);
    doc.text(`Patient: ${userData.firstName} ${userData.lastName}`, 20, 95);

    // Statistics
    doc.setFontSize(12);
    doc.text(`Total Vaccinations: ${userData.totalVaccinations}`, 20, 105);
    doc.text(`Completed Series: ${userData.completedSeries}`, 20, 115);
    doc.text(`Coverage: 98%`, 20, 125);
    doc.text(
      `Generated on: ${new Date().toLocaleDateString("en-US")}`,
      20,
      135
    );

    let yPosition = 155;

    // Upcoming Vaccinations
    if (upcomingVaccinations.length > 0) {
      doc.setFontSize(14);
      doc.text("UPCOMING VACCINATIONS", 20, yPosition);
      yPosition += 15;

      upcomingVaccinations.forEach((vaccine) => {
        doc.setFontSize(12);
        doc.text(`• ${vaccine.vaccineName}`, 25, yPosition);
        yPosition += 8;
        doc.text(
          `  Scheduled: ${new Date(vaccine.scheduledDate).toLocaleDateString("en-US")}`,
          25,
          yPosition
        );
        yPosition += 8;
        doc.text(`  Center: ${vaccine.center}`, 25, yPosition);
        yPosition += 15;
      });
    }

    // Completed Vaccinations
    doc.setFontSize(14);
    doc.text("COMPLETED VACCINATIONS", 20, yPosition);
    yPosition += 15;

    vaccinationHistory.forEach((vaccine, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(12);
      doc.setFont("times", "bold");
      doc.text(`${index + 1}. ${vaccine.vaccineName}`, 20, yPosition);
      yPosition += 8;

      doc.setFont("times", "normal");
      doc.text(`Manufacturer: ${vaccine.manufacturer}`, 25, yPosition);
      yPosition += 6;
      doc.text(
        `Date: ${new Date(vaccine.date).toLocaleDateString("en-US")}`,
        25,
        yPosition
      );
      yPosition += 6;
      doc.text(`Center: ${vaccine.center}`, 25, yPosition);
      yPosition += 6;
      doc.text(`Batch: ${vaccine.batchNumber}`, 25, yPosition);
      yPosition += 6;
      doc.text(`Administered by: ${vaccine.administered_by}`, 25, yPosition);
      yPosition += 6;

      if (vaccine.nextDue) {
        doc.text(
          `Next Due: ${new Date(vaccine.nextDue).toLocaleDateString("en-US")}`,
          25,
          yPosition
        );
        yPosition += 6;
      }

      yPosition += 10;
    });

    // Footer
    if (yPosition < 260) {
      doc.setFontSize(10);
      doc.text(
        "This document was electronically generated and is valid without a signature.",
        20,
        280
      );
    }

    // Save the PDF
    doc.save(
      `vaccination-history-${userData.firstName.toLowerCase()}-${new Date()
        .toISOString()
        .split("T")[0]}.pdf`
    );
  };

  // Load jsPDF and jsPDF-AutoTable dynamically
  const loadJsPDF = () => {
    return new Promise((resolve, reject) => {
      if (window.jspdf && window.jspdf.jsPDF) {
        resolve();
        return;
      }

      // Load jsPDF
      const jsPDFScript = document.createElement("script");
      jsPDFScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      jsPDFScript.async = true;

      // Load jsPDF-AutoTable
      const autoTableScript = document.createElement("script");
      autoTableScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js";
      autoTableScript.async = true;

      let scriptsLoaded = 0;
      const totalScripts = 2;

      const onScriptLoad = () => {
        scriptsLoaded += 1;
        if (scriptsLoaded === totalScripts) {
          if (window.jspdf && window.jspdf.jsPDF) {
            resolve();
          } else {
            reject(new Error('Failed to load jsPDF or jsPDF-AutoTable'));
          }
        }
      };

      const onScriptError = () => {
        reject(new Error('Failed to load one or more scripts'));
      };

      jsPDFScript.onload = onScriptLoad;
      jsPDFScript.onerror = onScriptError;
      autoTableScript.onload = onScriptLoad;
      autoTableScript.onerror = onScriptError;

      document.head.appendChild(jsPDFScript);
      document.head.appendChild(autoTableScript);
    });
  };

  const handleExportAll = async () => {
    try {
      await loadJsPDF();
      generateCompletePDF();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const handleDownloadCertificate = async (vaccine) => {
    try {
      await loadJsPDF();
      generateIndividualPDF(vaccine);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating certificate. Please try again.');
    }
  };

  const filteredHistory = vaccinationHistory.filter((vaccine) => {
    const matchesSearch =
      vaccine.vaccineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaccine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || vaccine.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vaccinations</p>
                <p className="text-3xl font-bold text-gray-900">{userData.totalVaccinations}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Syringe className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Series</p>
                <p className="text-3xl font-bold text-gray-900">{userData.completedSeries}</p>
              </div>
              <div className="w-12/users/john_doe/artifacts/eb7a4689-b284-4fec-a164-5085097d8ada/versions/e1f7a5b2-7c1e-4f7b-9f7a-3c8e9d2b7c9a/VaccinationHistory.jsx h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="times text-sm font-medium text-gray-600">Upcoming Vaccinations</p>
                <p className="text-3xl font-bold text-gray-900">{userData.upcomingVaccinations}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Coverage</p>
                <p className="text-3xl font-bold text-gray-900">98%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 t-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by vaccine or manufacturer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center space-x-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="scheduled">Scheduled</option>
                <option value="overdue">Overdue</option>
              </select>
              <button
                onClick={handleExportAll}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Vaccinations */}
        {upcomingVaccinations.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 bg-amber-50 border-b border-amber-100">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-amber-600" />
                Upcoming Vaccinations
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingVaccinations.map((vaccine) => (
                  <div key={vaccine.id} className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <Syringe className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{vaccine.vaccineName}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(vaccine.scheduledDate).toLocaleDateString("en-US")}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {vaccine.center}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      <Clock className="w-3 h-3 mr-1" />
                      Scheduled
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Completed Vaccinations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-green-50 border-b border-green-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              Completed Vaccinations ({filteredHistory.length})
            </h2>
          </div>
          
          {filteredHistory.length > 0 ? (
            <div className="p-6">
              <div className="space-y-4">
                {filteredHistory.map((vaccine) => (
                  <div key={vaccine.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-\
center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-\
lg font-semibold text-gray-900">{vaccine.vaccineName}</h3>
                            <p className="text-sm text-gray-600{bp
600">{vaccine.manufacturer}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{new Date(vaccine.date).toLocaleDateString("en-US")}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{vaccine.center}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            <span>{vaccine.administered_by}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Batch</span>
                            <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                              {vaccine.batchNumber}
                            </p>
                          </div>
                          {vaccine.nextDue && (
                            <div>
                              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Next Due</span>
                              <p className="text-sm font-medium text-amber-600 mt-1">
                                {new Date(vaccine.nextDue).toLocaleDateString("en-US")}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="mb-4">
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Side Effects</span>
                          <p className="text-sm text-gray-uose
700 mt-1">
                            {vaccine.sideEffects}
                          </p>
                        </div>
                      </div>

                      <div className="ml-4">
                        {vaccine.certificate && (
                          <button
                            onClick={() => handleDownloadCertificate(vaccine)}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                            title="Download Certificate"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Certificate
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg mb-2">
                {searchTerm ? "No results found" : "No vaccinations found"}
              </p>
              <p className="text-gray-500 text-sm">
                {searchTerm && "Try adjusting your search terms"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}