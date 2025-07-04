// app/(healthcare)/page.tsx
import { redirect } from 'next/navigation'

export default function HealthcarePage() {
  // Redirection automatique vers le dashboard
  redirect('/dashboard')
}