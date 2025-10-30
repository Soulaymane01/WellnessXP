// app/stories/page.tsx
import { getAllStories } from '@/lib/firebase-service'
import Stories from '@/components/stories-component'

export default async function StoriesPage() {
  const stories = await getAllStories()

  return <Stories stories={stories} />
}