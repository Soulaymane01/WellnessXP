// app/stories/page.tsx
import { getAllStories } from '@/lib/firebase-service'
import Stories from '@/components/stories-component'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Histoires Interactives | WellnessXP',
  description: 'Plongez dans des histoires interactives pour apprendre tout en s\'amusant.',
}

export default async function StoriesPage() {
  const stories = await getAllStories()

  return <Stories stories={stories} />
}