
"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Import dynamique pour éviter les erreurs SSR
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

interface VaccinationCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  vaccines: string[];
  distance: number;
  travelTime: string;
  rating: number;
  appointmentRequired: boolean;
  lat: number;
  lng: number;
  type: "public" | "private" | "clinic";
}

interface UserLocation {
  lat: number;
  lng: number;
}

const VaccinationCenterLocatorSafe: React.FC = () => {
  const [userLocation, setUserLocation] = useState<UserLocation>({ lat: 4.0511, lng: 9.7679 });
  const [centers, setCenters] = useState<VaccinationCenter[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<VaccinationCenter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchRadius, setSearchRadius] = useState(5);
  const [isClient, setIsClient] = useState(false);
  const [geolocationSupported, setGeolocationSupported] = useState(false);

  // Données d'exemple des centres de vaccination
  const mockCenters: Omit<VaccinationCenter, "distance" | "travelTime">[] = [
    {
      id: "1",
      name: "Centre de Vaccination Central de Douala",
      address: "Boulevard de la Liberté, Douala, Cameroun",
      phone: "+237 233 4411",
      vaccines: ["Pfizer", "Moderna", "AstraZeneca"],
      rating: 4.2,
      appointmentRequired: true,
      lat: 4.0511,
      lng: 9.7679,
      type: "public"
    },
    {
      id: "2",
      name: "Clinique de Vaccination des Spécialités",
      address: "Rue de la Paix, Bonanjo, Douala",
      phone: "+237 233 1567",
      vaccines: ["Pfizer", "Johnson & Johnson"],
      rating: 4.5,
      appointmentRequired: false,
      lat: 4.0495,
      lng: 9.7680,
      type: "private"
    },
    {
      id: "3",
      name: "Centre de Vaccination Général de Douala",
      address: "Avenue Ahidjo, Douala",
      phone: "+237 233 4589",
      vaccines: ["Moderna", "AstraZeneca"],
      rating: 3.8,
      appointmentRequired: true,
      lat: 4.0475,
      lng: 9.7710,
      type: "public"
    },
    {
      id: "4",
      name: "Centre Médical Saint-Luc",
      address: "Quartier Akwa, Douala",
      phone: "+237 233 7890",
      vaccines: ["Pfizer", "Moderna"],
      rating: 4.1,
      appointmentRequired: false,
      lat: 4.0520,
      lng: 9.7650,
      type: "clinic"
    },
    {
      id: "5",
      name: "Centre de Vaccination Laquintinie",
      address: "Boulevard du 20 Mai, Douala",
      phone: "+237 233 6734",
      vaccines: ["AstraZeneca", "Johnson & Johnson"],
      rating: 4.0,
      appointmentRequired: true,
      lat: 4.0540,
      lng: 9.7720,
      type: "public"
    }
  ];

  useEffect(() => {
    setIsClient(true);
    setGeolocationSupported("geolocation" in navigator);
    calculateDistances(userLocation);
    setLoading(false);
  }, []);

  const tryGetUserLocation = async () => {
    if (!geolocationSupported) {
      setError("La géolocalisation n'est pas supportée par ce navigateur.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: false,
            timeout: 15000,
            maximumAge: 300000, // 5 minutes
          }
        );
      });

      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      
      setUserLocation(location);
      calculateDistances(location);
    } catch (geolocationError: any) {
      let errorMessage = "Position par défaut utilisée (Douala).";
      
      if (geolocationError?.code) {
        switch (geolocationError.code) {
          case 1:
            errorMessage = "Accès à la géolocalisation refusé. Position par défaut utilisée.";
            break;
          case 2:
            errorMessage = "Position non disponible. Position par défaut utilisée.";
            break;
          case 3:
            errorMessage = "Délai de géolocalisation dépassé. Position par défaut utilisée.";
            break;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const calculateDistances = (userLoc: UserLocation) => {
    const centersWithDistance = mockCenters
      .map((center) => ({
        ...center,
        distance: calculateDistance(userLoc.lat, userLoc.lng, center.lat, center.lng),
        travelTime: calculateTravelTime(
          calculateDistance(userLoc.lat, userLoc.lng, center.lat, center.lng)
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    setCenters(centersWithDistance);
  };

  const calculateTravelTime = (distance: number): string => {
    const timeInMinutes = Math.round((distance / 30) * 60);
    if (timeInMinutes < 60) {
      return `${timeInMinutes} min`;
    }
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    return `${hours}h ${minutes}min`;
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "public": return "Public";
      case "private": return "Privé";
      case "clinic": return "Clinique";
      default: return type;
    }
  };

  const getDirections = (center: VaccinationCenter) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}&travelmode=driving`;
    window.open(url, "_blank");
  };

  // Interface de chargement améliorée
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Centres de vaccination à proximité
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Trouvez les centres de vaccination les plus proches de votre position
          </p>
          {error && (
            <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg dark:bg-yellow-900/20 dark:border-yellow-600 dark:text-yellow-400">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Contrôles */}
        <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Rayon de recherche:
              </label>
              <select
                value={searchRadius}
                onChange={(e) => {
                  setSearchRadius(Number(e.target.value));
                  calculateDistances(userLocation);
                }}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value={2}>2 km</option>
                <option value={5}> 5 km</option>
                <option value={10}>10 km</option>
                <option value={20}>20 km</option>
              </select>
            </div>
            
            {geolocationSupported && (
              <button
                onClick={tryGetUserLocation}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50"
              >
                {loading ? "Localisation..." : "📍 Ma position"}
              </button>
            )}
            
            {!geolocationSupported && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Géolocalisation non supportée
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Carte */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="h-96 lg:h-[600px]">
              {isClient ? (
                <MapContainer
                  center={[userLocation.lat, userLocation.lng]}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Marqueur de l'utilisateur */}
                  <Marker position={[userLocation.lat, userLocation.lng]}>
                    <Popup>
                      <div className="text-center">
                        <strong>📍 Votre position</strong>
                        <br />
                        <small>Lat: {userLocation.lat.toFixed(4)}, Lng: {userLocation.lng.toFixed(4)}</small>
                      </div>
                    </Popup>
                  </Marker>

                  {/* Marqueurs des centres */}
                  {centers.map((center) => (
                    <Marker
                      key={center.id}
                      position={[center.lat, center.lng]}
                      eventHandlers={{
                        click: () => setSelectedCenter(center),
                      }}
                    >
                      <Popup>
                        <div className="p-2 min-w-[200px]">
                          <h3 className="font-semibold text-lg mb-2">{center.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{center.address}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            <span className={`text-xs px-2 py-1 rounded ${
                              center.type === "public"
                                ? "bg-green-100 text-green-800"
                                : center.type === "private"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                            }`}>
                              {getTypeLabel(center.type)}
                            </span>
                            {center.appointmentRequired && (
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                Rendez-vous requis
                              </span>
                            )}
                          </div>
                          <div className="text-sm space-y-1">
                            <p><strong>📞</strong> {center.phone}</p>
                            <p><strong>📏</strong> {center.distance.toFixed(1)} km</p>
                            <p><strong>🚗</strong> {center.travelTime}</p>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                  <p className="text-gray-500 dark:text-gray-400">Chargement de la carte...</p>
                </div>
              )}
            </div>
          </div>

          {/* Liste des centres */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Établissements trouvés ({centers.length}) - Rayon de {searchRadius} km
              </h2>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {centers.length === 0 ? (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  <div className="mb-4">💉</div>
                  <p>Aucun centre de vaccination trouvé.</p>
                  <p className="text-sm mt-2">Veuillez réessayer plus tard.</p>
                </div>
              ) : (
                centers.map((center) => (
                  <div
                    key={center.id}
                    className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedCenter?.id === center.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
                    }`}
                    onClick={() => setSelectedCenter(center)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {center.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(center.rating)
                                ? "text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                          ({center.rating})
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      📍 {center.address}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        center.type === "public"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : center.type === "private"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                      }`}>
                        {getTypeLabel(center.type)}
                      </span>
                      {center.appointmentRequired && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full dark:bg-red-900 dark:text-red-200">
                          💉 Rendez-vous requis
                        </span>
                      )}
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                        <strong>Vaccins disponibles:</strong>
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {center.vaccines.map((vaccine, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded dark:bg-gray-700 dark:text-gray-300"
                          >
                            {vaccine}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <div><strong>📞</strong> {center.phone}</div>
                        <div><strong>📏</strong> {center.distance.toFixed(1)} km • <strong>🚗</strong> {center.travelTime}</div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          getDirections(center);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <span>🗺️</span>
                        Itinéraire
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaccinationCenterLocatorSafe;