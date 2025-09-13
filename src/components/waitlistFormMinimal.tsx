"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpRight, Check } from "lucide-react"
import { supabase } from "@/hooks/use-supabase"

export function WaitlistFormMinimal() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const { data, error } = await supabase
      .from('waitlist_salary_advance')
      .insert([
        { email: email, referral_code: null, waitlist_position: null, landing_page_referral: "student, debit, variant 1" },
      ])
      .select();
    
    if (error) {
      console.log("error from waitlist entry insertion is:", error);
    }
  
    console.log("data from waitlist entry insertion is:", data);

    setIsSubmitted(true)
    setIsLoading(false)
    //add in real code for adding to waitlist database

  }

  

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-6">
          <div className="w-12 h-12 bg-gray-900 rounded-full mx-auto flex items-center justify-center">
            <Check className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-light text-gray-900">Registered</h3>
            <p className="text-gray-600 font-light">We'll be in touch soon.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-light text-gray-900">Participate</h2>
        <p className="text-gray-600 font-light">Join our research study</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            type="email"
            placeholder="email@cam.ac.uk"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-14 text-lg border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-gray-900 focus:ring-0 placeholder:text-gray-400 font-light"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-14 bg-gray-900 hover:bg-gray-800 text-white font-light text-lg rounded-none group transition-all duration-300"
          disabled={isLoading}
        >
          <span>{isLoading ? "Submitting" : "Submit Application"}</span>
          <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Button>

        <div className="text-xs text-gray-400 font-mono tracking-wider">CONFIDENTIAL / CAMBRIDGE ETHICS APPROVED</div>
      </form>

      <div className="space-y-6 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-light text-gray-900">Next Steps</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-gray-900 text-white text-xs font-mono flex items-center justify-center rounded-full flex-shrink-0 mt-0.5">
              1
            </div>
            <p className="text-gray-600 font-light">We'll reach out to you, setup a video call</p>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-gray-900 text-white text-xs font-mono flex items-center justify-center rounded-full flex-shrink-0 mt-0.5">
              2
            </div>
            <p className="text-gray-600 font-light">Provide your salary amount, proof, and desired frequency</p>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-gray-900 text-white text-xs font-mono flex items-center justify-center rounded-full flex-shrink-0 mt-0.5">
              3
            </div>
            <p className="text-gray-600 font-light">First payment hits your bank account</p>
          </div>
        </div>
      </div>
    </div>
  )
}
