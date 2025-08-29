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
import { getNextWaitlistPosition, addRefereeToWaitlistNoReferralCode } from "@/pages/helperFunction";




const paymentFrequencies = [
  "day",
  "2 days", 
  "7 days",
  "14 days",
  "_ days"
];

export const HeroSectionParent = () => {
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
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentFrequencyIndex((prev) => (prev + 1) % paymentFrequencies.length);
        setIsAnimating(false);
      }, 150); // Half of the animation duration
    }, 2000); // Change every 3 seconds

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
    e.preventDefault();

    let referralBonus;
    let referrerIdentity;
    let referrerIdentityId;
    let referrerIdentityWaitingPosition;
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    //check whether email has already been added


    setIsLoading(true);

    //create new referralCode
    const newReferralCode = `PAY${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setUserReferralCode(newReferralCode);

    let nextWaitlistPosition = await getNextWaitlistPosition();
    let currentWaitlistNumber = nextWaitlistPosition - 1;

    if (!referralCode) {
        //logic that is unique for no referal code condition

        let result = await addRefereeToWaitlistNoReferralCode(email, newReferralCode, nextWaitlistPosition, "Parent")//don't need to return anything
        if (!result.success) {
           // handle error
           console.error("Insertion failed:", result.error);
           
           toast({
               title: "Failed to add you to the waitlist!",
               description: "Please try again",
            });
        } else {
          // handle success
          console.log("Insertion succeeded:", result.data);
          setUserPosition(nextWaitlistPosition);
          setIsLoading(false);
          setIsSubmitted(true);
          toast({
            title: "Welcome to the waitlist!",
            description: "We'll notify you as soon as we launch.",
          });
        }
        return;
    } else if (referralCode) {
      console.log("referralCode is: ", referralCode)

    
      //check referral code if valid
    let { data: referrer, error } = await supabase
    .from('waitlist_salary_advance')
    .select("*")
    .eq('referral_code', referralCode)

    if (error || !referrer || referrer.length === 0) {
      console.log("not a valid referral code from database: ", error);

      toast({
               title: "Your referral code is not valid!",
              description: "Adding you to waitlist without referral boost",
        });

      //need to then do non-referral code workflow. 
      let result = await addRefereeToWaitlistNoReferralCode(email, newReferralCode, nextWaitlistPosition, "Parent")//don't need to return anything
        
      if (result) {
            setUserPosition(nextWaitlistPosition);
        setIsLoading(false);
        setIsSubmitted(true);
        
        toast({
            title: "Welcome to the waitlist!",
            description: "We'll notify you as soon as we launch.",
        });
        return;

        } else {
             toast({
               title: "Failed to add you to the waitlist!",
              description: "Please try again",
        });
        return;
        }


    } else if (referrer) {
      
      console.log("valid referral code, belongs to: ", referrer[0].email)

      toast({
        title: "Referral Code Identified!",
        description: `referral code belongs to: ${referrer[0].email}`,
      });

      await sleep(3000)

      referralBonus = true;
      referrerIdentity = referrer[0].email
      referrerIdentityId = referrer[0].id
      referrerIdentityWaitingPosition = referrer[0].waitlist_position
      
    


      
      
        //if they've used referral bonus, need to boost them by 25 places
        //and boost code person belonged to by 100
        let nextWaitlistPositionBonus = nextWaitlistPosition - 25;
        console.log("nextWaitlistPositionBonus is: ", nextWaitlistPositionBonus)

        if (nextWaitlistPositionBonus <= 0) {
          console.log("nextWaitlistPositionBonus is smallert than 0, so just adding to end as normal without doing it")

          
          let result = await addRefereeToWaitlistNoReferralCode(email, newReferralCode, nextWaitlistPosition, "Parent")//don't need to return anything
        
      if (result) {
            setUserPosition(nextWaitlistPosition);
        setIsLoading(false);
        setIsSubmitted(true);
        
        toast({
            title: "Welcome to the waitlist!",
            description: "We'll notify you as soon as we launch.",
        });
        return;

        } else {
             toast({
               title: "Failed to add you to the waitlist!",
              description: "Please try again",
        });
        return;
        }
          
        }


        //extract every row of waitlist from where the new referee will be added, and bump them down by 1.
        for (let x = nextWaitlistPositionBonus; x <= currentWaitlistNumber; x++) {


          let { data: bonus, error } = await supabase
          .from('waitlist_salary_advance')
          .select("*")
          .eq('waitlist_position', x)
          .limit(1)

          console.log("data from getting waiting_list position for update for bonus is: ", bonus)


          //return;

          if (bonus) {

            let id = bonus[0].id
            console.log("id is: ", id);
            console.log("bonus.[0].waiting_list is: ", bonus[0].waitlist_position);
            let newPosition = bonus[0].waitlist_position + 1;
            console.log("newPosition is: ", newPosition)

            const { data, error } = await supabase
           .from('waitlist_salary_advance')
           .update({ waitlist_position: newPosition })
           .eq('id', id)
           .select()

           if (data) {
          console.log(`row ${x} updated!`)
            }
          
        }}
        //then update referred position to the vacant space.

        const { data: data2, error: error2 } = await supabase
            .from('waitlist_salary_advance')
            .insert([
              { email: email, referral_code: newReferralCode, waitlist_position: nextWaitlistPositionBonus, landing_page_referral: "Parent" },
            ])
            .select()
            console.log(`position should be ${nextWaitlistPositionBonus}`)

            setUserPosition(nextWaitlistPositionBonus);
        
        //return;

        //then do same, but back 100 for referrer
        let updatedReferrerPosition = referrerIdentityWaitingPosition - 100;

        if (updatedReferrerPosition <= 0) {
          console.log("updatedReferrerPosition is smallert than 0, so returning without doing it")

          
        return;
        }
          
        

         for (let x = updatedReferrerPosition; x <= currentWaitlistNumber; x++) {


          let { data: bonus, error } = await supabase
          .from('waitlist_salary_advance')
          .select("*")
          .eq('waitlist_position', x)
          .limit(1)

          console.log("data from getting waiting_list position for update for bonus is: ", bonus)


          //return;

          if (bonus) {

            let id = bonus[0].id
            console.log("id is: ", id);
            console.log("bonus.[0].waiting_list is: ", bonus[0].waitlist_position);
            let newPosition = bonus[0].waitlist_position + 1;
            console.log("newPosition is: ", newPosition)

            const { data, error } = await supabase
           .from('waitlist_salary_advance')
           .update({ waitlist_position: newPosition })
           .eq('id', id)
           .select()

           if (data) {
          console.log(`row ${x} updated!`)

          //then update referred position
            
          }
          }}

          //then insert referrer in their new position, 100 up from their current
         const { data, error } = await supabase
           .from('waitlist_salary_advance')
           .update({ waitlist_position: updatedReferrerPosition })
           .eq('id', referrerIdentityId )
           .select()

            console.log(`position should be ${nextWaitlistPositionBonus}`)
        
            console.log("updated both referrer and referee positions!")

            setIsLoading(false);
            setIsSubmitted(true);
            setUsedReferralCode(true)
      
      
      toast({
        title: "Welcome to the waitlist!",
        description: "We'll notify you as soon as we launch.",
      });

      return;
      } 
    }

};

  const copyShareLink = () => {
    const shareUrl = `${window.location.origin}/waitlist?ref=${userReferralCode}`;
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
        {!isSubmitted ? (
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Call to Action - Left Side */}
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <Badge
                variant="outline"
                className="text-purple-700 border-purple-300 bg-purple-100 px-6 py-3 rounded-full text-lg animate-bounce"
              >
                🚀 Protect their living budget
              </Badge>

              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-black text-purple-900 leading-tight transform hover:scale-105 transition-transform duration-300">
                  Children about to start{" "}
                  <span className="text-pink-600 underline decoration-wavy decoration-pink-400">University?</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-purple-800 leading-relaxed">
                  Decide how often to help out: every{" "}
                  <span className="text-pink-600 bg-pink-200 px-3 py-1 rounded-full transition-all duration-500 transform hover:scale-110">
                    {paymentFrequencies[currentFrequencyIndex]}
                  </span>
                </h2>
              </div>

              <p className="text-xl text-purple-700 max-w-2xl lg:max-w-none leading-relaxed font-medium">
                Teach them responsible budgeting, whilst protecting them from scams ✨
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
            <div className="flex-shrink-0 w-full lg:w-auto">
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
                    <Input
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Referral code (optional) 🎁"
                      className="h-14 border-purple-300 focus:border-pink-400 text-lg rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 font-medium"
                    />
                  </div>

                  <Button
                    onClick={handleSubmit}
                    className="w-full h-14 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 text-white text-lg rounded-2xl shadow-lg font-bold transform hover:scale-105 transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "Joining... 🎉" : "Join the Waitlist 🚀"}
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
                <h2 className="text-4xl font-black text-purple-900">You're on the waitlist!</h2>
                <p className="text-xl text-purple-700 font-bold">Position #{userPosition.toLocaleString()} 🎯</p>
              </div>

               {usedReferralCode && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">🚀 You've been boosted 25 places from a referral code!</p>
                  </div>
                )}

              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black text-purple-900 text-center lg:text-left mb-6">
                    Waitlist Positions 📊
                  </h3>

                  <div className="space-y-2 max-h-[280px] overflow-y-auto pr-2">
                    {waitlistData.map((entry) => (
                      <div
                        key={entry.position}
                        className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 ${
                          entry.isUser
                            ? "bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300 shadow-lg transform scale-105"
                            : "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 hover:border-purple-200"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`font-black text-xl ${entry.isUser ? "text-purple-800" : "text-gray-600"}`}>
                            #{entry.position}
                          </span>
                          <span
                            className={`font-mono text-sm font-medium ${
                              entry.isUser ? "text-purple-700" : "text-gray-500"
                            }`}
                          >
                            {entry.email}
                          </span>
                        </div>
                        {entry.isUser && (
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-4 py-2 rounded-full animate-pulse">
                            You 🎯
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Referral Code - Right Side */}
            <div className="flex-shrink-0 w-full lg:w-96 space-y-8">
              <div className="h-32 lg:block hidden"></div>

              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl">
                <CardContent className="p-8 space-y-6">
                  <div className="text-center space-y-4">
                    <p className="text-purple-700 font-bold text-xl">Your referral code 🎁</p>
                    <div className="flex items-center gap-3">
                      <code className="flex-1 text-xl font-bold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-6 py-4 rounded-2xl border-2 border-purple-300">
                        {userReferralCode}
                      </code>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={copyReferralCode}
                        className="rounded-2xl border-purple-300 text-purple-600 hover:bg-purple-50 font-bold bg-transparent"
                      >
                        <Copy className="w-5 h-5" />
                      </Button>
                    </div>
                    <p className="text-sm text-purple-600 font-medium">
                      Share with friends to boost your position! Each referral moves you up 50 spots! 🚀
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  )
};