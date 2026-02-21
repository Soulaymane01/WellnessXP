// app/reels/page.tsx
import { getAllReels } from '@/lib/firebase-service'
import Reels from '@/components/reels-component'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cours & Reels | WellnessXP',
  description: 'Apprenez rapidement avec nos vidéos éducatives courtes et impactantes.',
}

export default async function ReelsPage() {
  const reels = await getAllReels() // Or use your reelsData temporarily

  return <Reels reels={reels} />
}