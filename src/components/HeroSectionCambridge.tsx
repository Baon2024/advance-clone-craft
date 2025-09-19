import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-fintech.jpg";
import {
  CheckCircle,
  Zap,
  Shield,
  Lock,
  Users,
  Copy,
  Share2,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { supabase } from "@/hooks/use-supabase";
import { getNextWaitlistPosition, addRefereeToWaitlistNoReferralCode, getCurrentWaitlistTotal, checkWhetherEmailAlreadyWaitlisted } from "@/pages/helperFunction";
import WaitlistCounterTicker from "./waiterCounterTicker";





const paymentFrequencies = [
  "daily",
  "weekly", 
  "fortnightly",
  "custom"
];

export const HeroSectionCambridge = () => {
  const [currentFrequencyIndex, setCurrentFrequencyIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userPosition, setUserPosition] = useState<number>(0);
  const [userReferralCode, setUserReferralCode] = useState<string>("");
  const [usedReferralCode, setUsedReferralCode ] = useState(false);
  const [ waitlistData, setWaitlistData ] = useState([])
  const [ waitlistCount, setWaitlistCount ] = useState(0)
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentFrequencyIndex((prev) => (prev + 1) % paymentFrequencies.length);
        setIsAnimating(false);
      }, 150); // Half of the animation duration
    }, 2000); // Change every 3 seconds

    getCurrentWaitlistTotal(setWaitlistCount)
    console.log("currentWaitlistTotal after setting is: ", waitlistCount)

    return () => clearInterval(interval);
  }, []);

  const sleep = (interval) => new Promise((resolve) => setTimeout(resolve, interval))

  const generateWaitlistData = (userPosition: number, userEmail: string, referralCode: string, usedReferralCode: boolean) => {
  const mockEmails = [
    "alex.smith@email.com",
    "sarah.jones@email.com", 
    "mike.wilson@email.com",
    "emma.davis@email.com",
    "john.brown@email.com",
    "lisa.taylor@email.com",
    "david.white@email.com",
    "anna.green@email.com",
    "chris.black@email.com",
    "sophie.grey@email.com"
  ];

  const blurEmail = (email: string) => {
    const [username, domain] = email.split('@');
    const blurredUsername = username.substring(0, 2) + '***' + username.slice(-1);
    return `${blurredUsername}@${domain}`;
  };



  const waitlistEntries = [];

  //need to be dynamic, so shows them at end of list if no referralCode, otherwise shows two after them;
  console.log("usedReferralCode is: ", usedReferralCode);
  if (usedReferralCode) {
    for (let i = userPosition - 2; i <= userPosition + 2; i++) {
    if (i === userPosition) {
      waitlistEntries.push({
        position: i,
        email: userEmail,
        isUser: true,
        referralCode: referralCode || 'N/A'
      });
    } else if (i > 0) {
      const emailIndex = (i - 1) % mockEmails.length;
      waitlistEntries.push({
        position: i,
        email: blurEmail(mockEmails[emailIndex]),
        isUser: false,
        referralCode: 'N/A'
      });
    }
  }
  } else if (!usedReferralCode) {

    for (let i = userPosition - 4; i <= userPosition; i++) {
    if (i === userPosition) {
      waitlistEntries.push({
        position: i,
        email: userEmail,
        isUser: true,
        referralCode: referralCode || 'N/A'
      });
    } else if (i > 0) {
      const emailIndex = (i - 1) % mockEmails.length;
      waitlistEntries.push({
        position: i,
        email: blurEmail(mockEmails[emailIndex]),
        isUser: false,
        referralCode: 'N/A'
      });
    }
  }
  }
  
  
  
  return waitlistEntries.filter(entry => entry.position > 0);
};



const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const { data, error } = await supabase
      .from('waitlist_salary_advance')
      .insert([
        { email: email, referral_code: null, waitlist_position: null, landing_page_referral: "Cambridge, debit" },
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

  const copyShareLink = () => {
    const shareUrl = `${window.location.origin}/Cambridge`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "Share this link with friends to boost your position.",
    });
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(userReferralCode);
    toast({
      title: "Referral code copied!",
      description: "Share this code with friends to get boosted in the waitlist.",
    });
  };



  useEffect(() => {
  if (isSubmitted) {
    setWaitlistData(
      generateWaitlistData(userPosition, email, userReferralCode, usedReferralCode)
    );
  } else {
    setWaitlistData([]);
  }
}, [isSubmitted, userPosition, email, userReferralCode, usedReferralCode]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold text-pink-500 tracking-tight font-coiny mb-4">
            <strong>Payday</strong>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-500 mx-auto rounded-full"></div>
        </div>
        {!isSubmitted ? (
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Call to Action - Left Side */}
            
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <Badge
                variant="outline"
                className="text-purple-700 border-purple-300 bg-purple-100 px-6 py-3 rounded-full text-lg animate-bounce"
              >
                🚀 Fixing money
              </Badge>

              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-black text-purple-900 leading-tight transform hover:scale-105 transition-transform duration-300">
                  Get paid as you earn - not weeks later
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-purple-800 leading-relaxed">
                  Choose {" "}
                  <span className="text-green-600 bg-white-200 px-3 py-1 rounded-full transition-all duration-500 transform hover:scale-110">
                    {paymentFrequencies[currentFrequencyIndex]}
                  </span>
                  payments 📅
                </h2>
              </div>

              <p className="text-xl text-purple-700 max-w-2xl lg:max-w-none leading-relaxed font-medium">
                No employer approval required ✨
                No risk - We’re paying you before you ever pay us
              </p>

              {/* Fun indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4">
                <div className="flex items-center gap-2 text-purple-700 bg-white/50 px-4 py-2 rounded-full shadow-sm">
                  <CheckCircle className="w-5 h-5 text-pink-600" />
                  <span className="font-semibold">No hidden fees</span>
                </div>
                <div className="flex items-center gap-2 text-purple-700 bg-white/50 px-4 py-2 rounded-full shadow-sm">
                  <Zap className="w-5 h-5 text-pink-600" />
                  <span className="font-semibold">Instant approval</span>
                </div>
                <div className="flex items-center gap-2 text-purple-700 bg-white/50 px-4 py-2 rounded-full shadow-sm">
                  <Shield className="w-5 h-5 text-pink-600" />
                  <span className="font-semibold">Secure & trusted</span>
                </div>
              </div>
            </div>

            

            {/* Waitlist Form - Right Side */}
            <div className="flex-shrink-0 w-full lg:w-auto space-y-6">

              <div className="flex justify-center">
                  <WaitlistCounterTicker count={waitlistCount} variant="ticker" />
                </div>

              <Card className="max-w-lg border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl transform hover:scale-105 transition-transform duration-300">
                <CardContent className="p-10 space-y-8">
                  <div className="space-y-6">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address ✉️"
                      className="h-14 border-purple-300 focus:border-pink-400 text-lg rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 font-medium"
                    />
                    
                  </div>

                  <Button
                    onClick={handleSubmit}
                    className="w-full h-14 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 text-white text-lg rounded-2xl shadow-lg font-bold transform hover:scale-105 transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "Joining... 🎉" : "Join the Launchlist 🚀"}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-sm text-purple-600 font-medium">
                    <CheckCircle className="w-4 h-4" />
                    <span>We respect your privacy. No spam, ever! 💜</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Success State */
          <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
            {/* Waitlist Status - Left Side */}
            <div className="flex-1 space-y-8">
              <div className="space-y-6 text-center lg:text-left">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto lg:mx-0 shadow-lg animate-bounce">
                  <span className="text-3xl">🎉</span>
                </div>
                <h2 className="text-4xl font-black text-purple-900">You're on the launchlist! 🎯</h2>
              </div>

               

              
            </div>

            {/* Referral Code - Right Side */}
            <div className="flex-shrink-0 w-full lg:w-96 space-y-8">
              <div className="h-32 lg:block hidden"></div>

              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl">
                <CardContent className="p-8 space-y-6">
                  <div className="text-center space-y-4">
                    <p className="text-purple-700 font-bold text-xl">Share 🎁</p>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={copyShareLink}
                        className="rounded-2xl border-purple-300 text-purple-600 hover:bg-purple-50 font-bold bg-transparent"
                      >
                        <Copy className="w-5 h-5" />
                      </Button>
                    </div>
                    <p className="text-sm text-purple-600 font-medium">
                      Share with friends !🚀
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
      </div>
    </section>
  )
};