"use client"
import React, { useState, useEffect } from 'react';

const ToastExample = () => {
  const [toasts, setToasts] = useState([]);

  // Fonction pour ajouter une notification
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Suppression automatique après 3 secondes
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  // Fonction pour supprimer une notification
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Styles pour les différents types de toast
  const toastStyles = {
    info: 'bg-blue-100 text-blue-800 border border-blue-200',
    success: 'bg-green-100 text-green-800 border border-green-200',
    error: 'bg-red-100 text-red-800 border border-red-200',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Système de Notifications Simple</h1>
      
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => showToast('Ceci est une info', 'info')}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Info
        </button>
        <button 
          onClick={() => showToast('Opération réussie!', 'success')}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Succès
        </button>
        <button 
          onClick={() => showToast('Une erreur est survenue', 'error')}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Erreur
        </button>
        <button 
          onClick={() => showToast('Attention! Ceci est un avertissement', 'warning')}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Avertissement
        </button>
      </div>

      {/* Conteneur des toasts */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            className={`${toastStyles[toast.type]} p-4 rounded-lg shadow-md flex items-start justify-between min-w-[250px]`}
          >
            <span>{toast.message}</span>
            <button 
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToastExample;