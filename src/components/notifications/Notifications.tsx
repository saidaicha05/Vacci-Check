"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "../ui/modal";
import Alert from "@/components/ui/alert/Alert";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface Notification {
  id: string;
  userName: string;
  userImage: string;
  action: string;
  project: string;
  timestamp: string;
  isRead: boolean;
  isArchived: boolean;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      userName: "Terry Franci",
      userImage: "/images/user/user-02.jpg",
      action: "demande une permission pour modifier",
      project: "Projet - Nganter App",
      timestamp: "2025-06-20T12:07:00Z",
      isRead: false,
      isArchived: false,
    },
    {
      id: "2",
      userName: "Alena Franci",
      userImage: "/images/user/user-03.jpg",
      action: "demande une permission pour modifier",
      project: "Projet - Nganter App",
      timestamp: "2025-06-20T12:04:00Z",
      isRead: false,
      isArchived: false,
    },
    {
      id: "3",
      userName: "Jocelyn Kenter",
      userImage: "/images/user/user-04.jpg",
      action: "demande une permission pour modifier",
      project: "Projet - Nganter App",
      timestamp: "2025-06-20T11:57:00Z",
      isRead: false,
      isArchived: false,
    },
    {
      id: "4",
      userName: "Brandon Philips",
      userImage: "/images/user/user-05.jpg",
      action: "demande une permission pour modifier",
      project: "Projet - Nganter App",
      timestamp: "2025-06-20T11:12:00Z",
      isRead: false,
      isArchived: false,
    },
  ]);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [archivedModalOpen, setArchivedModalOpen] = useState(false);

  const toggleSelectNotification = (id: string) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]
    );
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markSelectedAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) =>
        selectedNotifications.includes(notif.id)
          ? { ...notif, isRead: true }
          : notif
      )
    );
    setSelectedNotifications([]);
  };

  const archiveNotification = (id: string) => {
    const archivedNotif = notifications.find((notif) => notif.id === id);
    if (archivedNotif) {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, isArchived: true } : notif
        )
      );
      setSuccessMessage(
        `Notification de ${archivedNotif.userName} archivée avec succès !`
      );
      setSuccessAlertOpen(true);
      setTimeout(() => {
        setSuccessAlertOpen(false);
        setSuccessMessage("");
      }, 3000);
    }
  };

  const archiveSelectedNotifications = () => {
    const count = selectedNotifications.length;
    setNotifications((prev) =>
      prev.map((notif) =>
        selectedNotifications.includes(notif.id)
          ? { ...notif, isArchived: true }
          : notif
      )
    );
    setSuccessMessage(`${count} notification${count > 1 ? "s" : ""} archivée${count > 1 ? "s" : ""} avec succès !`);
    setSuccessAlertOpen(true);
    setSelectedNotifications([]);
    setTimeout(() => {
      setSuccessAlertOpen(false);
      setSuccessMessage("");
    }, 3000);
  };

  const activeNotifications = notifications.filter((notif) => !notif.isArchived);
  const archivedNotifications = notifications.filter((notif) => notif.isArchived);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto relative">
        {successAlertOpen && (
          <div className="fixed top-40 right-4 z-50 max-w-sm">
            <Alert
              variant="success"
              title="Succès"
              message={successMessage}
              showLink={false}
            />
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          {/* <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            All notifications
          </h1> */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setArchivedModalOpen(true)}
              className="flex text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
              title="Voir les notifications archivées"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4V9H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 15C5 16.6569 6.34315 18 8 18H16C17.6569 18 19 16.6569 19 15V9C19 7.34315 17.6569 6 16 6H8C6.34315 6 5 7.34315 5 9V15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg> Archived
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Notifications reçues ({activeNotifications.length})
              </h2>
              {selectedNotifications.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={markSelectedAsRead}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Marquer comme lues ({selectedNotifications.length})
                  </button>
                  <button
                    onClick={archiveSelectedNotifications}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm flex items-center gap-2"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 4V9H9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 15C5 16.6569 6.34315 18 8 18H16C17.6569 18 19 16.6569 19 15V9C19 7.34315 17.6569 6 16 6H8C6.34315 6 5 7.34315 5 9V15Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Archiver ({selectedNotifications.length})
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="max-h-[600px] overflow-y-auto">
            {activeNotifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                <div className="mb-4">🔔</div>
                <p>Aucune notification disponible.</p>
              </div>
            ) : (
              activeNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex items-start gap-3 p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    notif.isRead ? "bg-gray-100 dark:bg-gray-800" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notif.id)}
                    onChange={() => toggleSelectNotification(notif.id)}
                    className="mt-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <div className="flex-1">
                    <div className="flex gap-3">
                      <span className="relative block w-10 h-10 rounded-full">
                        <Image
                          width={40}
                          height="40"
                          src={notif.userImage}
                          alt={notif.userName}
                          className="w-full overflow-hidden rounded-full"
                        />
                        <span
                          className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-[1.5px] border-white ${
                            notif.isRead ? "bg-gray-400" : "bg-success-500"
                          } dark:border-gray-900`}
                        ></span>
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium text-gray-800 dark:text-white/90">
                            {notif.userName}
                          </span>{" "}
                          {notif.action}{" "}
                          <span className="font-medium text-gray-800 dark:text-white/90">
                            {notif.project}
                          </span>
                        </p>
                        <p className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span>Projet</span>
                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                          <span>
                            {formatDistanceToNow(new Date(notif.timestamp), {
                              addSuffix: true,
                              locale: fr,
                            })}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {!notif.isRead && (
                        <button
                          onClick={() => markAsRead(notif.id)}
                          className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200"
                        >
                          Marquer comme lue
                        </button>
                      )}
                      <button
                        onClick={() => archiveNotification(notif.id)}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                      >
                        Archiver
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <Modal
          isOpen={archivedModalOpen}
          onClose={() => setArchivedModalOpen(false)}
          className="max-w-lg p-6"
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Notifications archivées ({archivedNotifications.length})
            </h3>
            <div className="max-h-[400px] overflow-y-auto">
              {archivedNotifications.length === 0 ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Aucune notification archivée.
                </p>
              ) : (
                archivedNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`flex items-start gap-3 p-4 border-b border-gray-200 dark:border-gray-700 ${
                      notif.isRead ? "bg-gray-100 dark:bg-gray-800" : ""
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex gap-3">
                        <span className="relative block w-10 h-10 rounded-full">
                          <Image
                            width={40}
                            height={40}
                            src={notif.userImage}
                            alt={notif.userName}
                            className="w-full overflow-hidden rounded-full"
                          />
                          <span
                            className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-[1.5px] border-white ${
                              notif.isRead ? "bg-gray-400" : "bg-success-500"
                            } dark:border-gray-900`}
                          ></span>
                        </span>
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-medium text-gray-800 dark:text-white/90">
                              {notif.userName}
                            </span>{" "}
                            {notif.action}{" "}
                            <span className="font-medium text-gray-800 dark:text-white/90">
                              {notif.project}
                            </span>
                          </p>
                          <p className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>Projet</span>
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span>
                              {formatDistanceToNow(new Date(notif.timestamp), {
                                addSuffix: true,
                                locale: fr,
                              })}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default NotificationsPage;
