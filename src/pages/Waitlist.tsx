import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Lock, Share2, Copy, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock waitlist data for demonstration
const generateWaitlistData = (userPosition: number, userEmail: string, referralCode: string) => {
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
  
  return waitlistEntries.filter(entry => entry.position > 0);
};

export const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userPosition, setUserPosition] = useState<number>(0);
  const [userReferralCode, setUserReferralCode] = useState<string>("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      // Generate random position (simulate based on referral code)
      const basePosition = Math.floor(Math.random() * 5000) + 1000;
      const position = referralCode ? Math.max(1, basePosition - 100) : basePosition;
      setUserPosition(position);
      
      // Generate user's referral code
      const newReferralCode = `PAY${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setUserReferralCode(newReferralCode);
      
      toast({
        title: "Welcome to the waitlist!",
        description: "We'll notify you as soon as we launch.",
      });
    }, 1000);
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

  if (isSubmitted) {
    const waitlistData = generateWaitlistData(userPosition, email, userReferralCode);
    
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-accent/50 via-background to-background">
        <div className="w-full max-w-2xl space-y-8">
          {/* Success Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">🎉</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              You're on the waitlist!
            </h1>
            <div className="space-y-2">
              <p className="text-muted-foreground text-lg">
                You're position #{userPosition} in line
              </p>
              <Badge variant="outline" className="text-primary border-primary/20 bg-accent">
                <Users className="w-4 h-4 mr-2" />
                {userPosition.toLocaleString()} people ahead of you
              </Badge>
            </div>
          </div>

          {/* Waitlist Position Table */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="text-center text-xl">Waitlist Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {waitlistData.map((entry) => (
                  <div
                    key={entry.position}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      entry.isUser 
                        ? 'bg-gradient-primary/10 border-primary/30 shadow-sm' 
                        : 'bg-muted/30 border-border/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-bold ${entry.isUser ? 'text-primary' : 'text-muted-foreground'}`}>
                        #{entry.position}
                      </span>
                      <span className={`font-mono text-sm ${entry.isUser ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {entry.email}
                      </span>
                    </div>
                    {entry.isUser && (
                      <Badge className="bg-primary text-primary-foreground">
                        You
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Referral Section */}
          <Card className="bg-gradient-card border-border/50 shadow-card">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">
                    Boost Your Position
                  </h3>
                  <p className="text-muted-foreground">
                    For every friend who joins the waitlist with your code, get boosted 100 places in the waitlist
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-4 bg-accent rounded-lg border">
                    <span className="text-sm text-muted-foreground flex-1">Your referral code:</span>
                    <code className="text-lg font-bold text-primary bg-background px-3 py-1 rounded border">
                      {userReferralCode}
                    </code>
                    <Button variant="outline" size="sm" onClick={copyReferralCode}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="hero" className="flex-1" onClick={copyShareLink}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Waitlist Link
                    </Button>
                    <Link to="/" className="flex-1">
                      <Button variant="outline" className="w-full">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-accent/50 via-background to-background">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Join the{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Waitlist
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Be the first to know when we launch and get paid every day.
          </p>
        </div>

        {/* Form */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
          <CardHeader className="text-center pb-4">
            <CardTitle className="sr-only">Waitlist Signup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="referralCode" className="text-foreground font-medium">
                  Referral Code (Optional)
                </Label>
                <Input
                  id="referralCode"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="Enter referral code if you have one"
                  className="h-12"
                />
                <p className="text-sm text-muted-foreground">
                  Have a friend's referral code? Enter it to boost your position!
                </p>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                className="w-full h-12 text-lg"
                disabled={isLoading}
              >
                {isLoading ? "Joining..." : "Join the Waitlist →"}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <Link to="/">
                <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4" />
                  Back to home
                </Button>
              </Link>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4" />
                <span>We respect your privacy. No spam, ever.</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};