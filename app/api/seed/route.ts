import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase-config'
import { collection, doc, setDoc } from 'firebase/firestore'
import { seedReels } from '@/lib/seed-data'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    // Simple password protection (change this!)
    if (password !== 'seed-wellness-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Seed Badges
    for (const reels of seedReels) {
      await setDoc(doc(db, 'reels', reels.id), reels)
    }
    console.log('✅ reels seeded')

    // Seed Badges
    for (const badge of seedBadges) {
      await setDoc(doc(db, 'badges', badge.id), badge)
    }
    console.log('✅ Badges seeded')

    // Seed Quizzes
    for (const quiz of seedQuizzes) {
      await setDoc(doc(db, 'quizzes', quiz.id), quiz)
    }
    console.log('✅ Quizzes seeded')

    // Seed Stories
    for (const story of seedStories) {
      await setDoc(doc(db, 'stories', story.id), story)
    }
    console.log('✅ Stories seeded')

    // Seed Health Centers
    for (const center of seedHealthCenters) {
      await setDoc(doc(db, 'health_centers', center.id), center)
    }
    console.log('✅ Health Centers seeded')

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully!',
      collections: {
        badges: seedBadges.length,
        quizzes: seedQuizzes.length,
        stories: seedStories.length,
        health_centers: seedHealthCenters.length,
      },
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 })
  }
}