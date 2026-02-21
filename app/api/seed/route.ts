import { NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'
import { seedReels } from '@/lib/seed-data'
import { seedBadges, seedQuizzes, seedStories, seedHealthCenters } from '@/lib/seed-data'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    // Simple password protection (change this!)
    if (password !== 'seed-wellness-2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Seed reels
    for (const reel of seedReels) {
      await adminDb.collection('reels').doc(reel.id).set(reel)
    }
    console.log('✅ Reel seeded')

    // Seed Badges
    for (const badge of seedBadges) {
      await adminDb.collection('badges').doc(badge.id).set(badge)
    }
    console.log('✅ Badges seeded')

    // Seed Quizzes
    for (const quiz of seedQuizzes) {
      await adminDb.collection('quizzes').doc(quiz.id).set(quiz)
    }
    console.log('✅ Quizzes seeded')

    // Seed Stories
    for (const story of seedStories) {
      await adminDb.collection('stories').doc(story.id).set(story)
    }
    console.log('✅ Stories seeded')

    // Seed Health Centers
    for (const center of seedHealthCenters) {
      await adminDb.collection('healthCenters').doc(center.id).set(center)
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