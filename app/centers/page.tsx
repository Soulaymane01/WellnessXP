// app/centers/page.tsx
import { getAllHealthCenters } from '@/lib/firebase-service'
import Centers from '@/components/centers-component'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Centres de Santé | WellnessXP',
  description: 'Trouvez des centres de santé adaptés aux jeunes au Maroc pour bénéficier de soins gratuits et confidentiels.',
}

export default async function CentersPage() {
  const centers = await getAllHealthCenters()

  return <Centers initialCenters={centers} />
}