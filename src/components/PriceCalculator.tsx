"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

interface PriceCalculatorProps {
  className?: string
}

export default function PriceCalculator({ className = "" }: PriceCalculatorProps) {
  const [salary, setSalary] = useState([2000])
  const [interval, setInterval] = useState([30])

  // Calculate monthly payment based on salary and interval
  const calculateMonthlyPayment = () => {
    const monthlySalary = salary[0]
    const intervalDays = interval[0]
    const dailyAmount = monthlySalary / 31 // 10% of annual salary spread over year
    return (dailyAmount * intervalDays).toFixed(0)
  }

  const formatSalary = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getIntervalText = (days: number) => {
    if (days === 1) return "Day"
    if (days === 7) return "Weekly"
    if (days === 14) return "Fortnight"
    if (days === 30) return "Monthly"
    return `Every ${days} days`
  }

  return (
    <Card
      className={`border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl transform hover:scale-105 transition-transform duration-300 ${className}`}
    >
      <CardContent className="p-8 space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-black text-purple-900">Payment Calculator 💰</h3>
          <p className="text-purple-700 font-medium">Control Your Cashflow</p>
        </div>

        {/* Salary Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-lg font-bold text-purple-800">Monthly Salary</label>
            <span className="text-xl font-black text-pink-600 bg-pink-100 px-4 py-2 rounded-full">
              {formatSalary(salary[0])}
            </span>
          </div>
          <Slider value={salary} onValueChange={setSalary} max={15000} min={500} step={500} className="w-full" />
          <div className="flex justify-between text-sm text-purple-600 font-medium">
            <span>£500</span>
            <span>£15,000</span>
          </div>
        </div>

        {/* Interval Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-lg font-bold text-purple-800">Payment Frequency</label>
            <span className="text-xl font-black text-pink-600 bg-pink-100 px-4 py-2 rounded-full">
              {getIntervalText(interval[0])}
            </span>
          </div>
          <Slider value={interval} onValueChange={setInterval} max={30} min={1} step={1} className="w-full" />
          <div className="flex justify-between text-sm text-purple-600 font-medium">
            <span>Daily</span>
            <span>Monthly</span>
          </div>
        </div>

        {/* Payment Preview */}
        <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 p-6 rounded-2xl border-2 border-purple-300 text-center space-y-2">
          <p className="text-purple-700 font-bold text-lg">Estimated Payment</p>
          <p className="text-4xl font-black text-purple-900">£{calculateMonthlyPayment()}</p>
          <p className="text-purple-600 font-medium">per {getIntervalText(interval[0]).toLowerCase()}</p>
        </div>

        
      </CardContent>
    </Card>
  )
}