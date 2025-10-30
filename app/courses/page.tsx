// app/reels/page.tsx
import { getAllReels } from '@/lib/firebase-service' // You need to add this function
import Reels from '@/components/reels-component'

export default async function ReelsPage() {
  const reels = await getAllReels() // Or use your reelsData temporarily

  return <Reels reels={reels} />
}