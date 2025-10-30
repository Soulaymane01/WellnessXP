// app/stories/[id]/page.tsx
import { getStoryById } from '@/lib/firebase-service'
import StoryPlayer from '@/components/story-player'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { id } = await params
  const story = await getStoryById(id)

  if (!story) {
    notFound()
  }

  return <StoryPlayer story={story} />
}