'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SeedPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleSeed = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to seed database' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 bg-card p-8 rounded-lg border">
        <div>
          <h1 className="text-2xl font-bold mb-2">Seed Database</h1>
          <p className="text-sm text-muted-foreground">
            This will populate Firebase with initial data for badges, quizzes, stories, and health
            centers.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            type="password"
            placeholder="Enter seed password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={handleSeed} disabled={loading || !password} className="w-full">
            {loading ? 'Seeding...' : 'Seed Database'}
          </Button>
        </div>
    </div>
    </div>
  )
}

