"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUp, Star, Flame } from "lucide-react"

interface WaitlistCounterTickerProps {
  count: number
  variant?: "ticker" | "milestone" | "competitive" | "celebration"
}

export default function WaitlistCounterTicker({ count, variant = "ticker" }: WaitlistCounterTickerProps) {
  const [displayCount, setDisplayCount] = useState(0)
  const [showMilestone, setShowMilestone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = Math.ceil(count / 80)
      const interval = setInterval(() => {
        setDisplayCount((prev) => {
          if (prev >= count) {
            clearInterval(interval)
            // Check for milestone
            if (count % 1000 === 0 || count % 500 === 0) {
              setShowMilestone(true)
              setTimeout(() => setShowMilestone(false), 3000)
            }
            return count
          }
          return Math.min(prev + increment, count)
        })
      }, 25)
      return () => clearInterval(interval)
    }, 200)
    return () => clearTimeout(timer)
  }, [count])

  const variants = {
    ticker: (
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">LIVE</span>
          </div>
          <div className="font-black text-xl tabular-nums">{displayCount.toLocaleString()}</div>
          <ArrowUp className="w-4 h-4 animate-bounce" />
        </div>
      </div>
    ),
    milestone: (
      <div className="relative">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
          <CardContent className="p-6 text-center">
            <div className="space-y-3">
              <Star className="w-8 h-8 text-yellow-500 mx-auto" />
              <div className="text-3xl font-black text-purple-900">{displayCount.toLocaleString()}</div>
              <div className="text-purple-700 font-bold">Amazing! We're growing fast! 🚀</div>
            </div>
          </CardContent>
        </Card>
        {showMilestone && (
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl animate-ping opacity-75"></div>
        )}
      </div>
    ),
    competitive: (
      <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-2xl p-6 shadow-2xl">
        <div className="text-center space-y-3">
          <Flame className="w-8 h-8 text-yellow-300 mx-auto animate-pulse" />
          <div className="text-2xl font-black">🔥 {displayCount.toLocaleString()} people can't be wrong!</div>
          <div className="text-sm opacity-90 font-medium">Join the fastest-growing waitlist</div>
        </div>
      </div>
    ),
    celebration: (
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-3xl p-8 shadow-2xl">
        <div className="text-center text-white space-y-4">
          <div className="text-6xl">🎉</div>
          <div className="text-3xl font-black">{displayCount.toLocaleString()}+ Members!</div>
          <div className="text-lg font-bold opacity-90">Welcome to the community!</div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-2 left-4 text-2xl animate-bounce delay-100">✨</div>
          <div className="absolute top-4 right-6 text-xl animate-bounce delay-300">🎊</div>
          <div className="absolute bottom-4 left-8 text-lg animate-bounce delay-500">🌟</div>
          <div className="absolute bottom-2 right-4 text-xl animate-bounce delay-700">🎈</div>
        </div>
      </div>
    ),
  }

  return variants[variant]
}