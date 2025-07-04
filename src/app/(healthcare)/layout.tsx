// app/(healthcare)/layout.tsx
import HealthcareSidebar from '@/components/healthcare/HealthcareSidebar';
import HealthcareHeader from '@/components/healthcare/HealthcareHeader';

export default function HealthcareLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <HealthcareSidebar />
      <div className="flex-1 flex flex-col">
        <HealthcareHeader />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}