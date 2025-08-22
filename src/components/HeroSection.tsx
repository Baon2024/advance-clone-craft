import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-fintech.jpg";
import { CheckCircle, Zap, Shield } from "lucide-react";

const paymentFrequencies = [
  "day",
  "2 days", 
  "7 days",
  "14 days",
  "_ days"
];

export const HeroSection = () => {
  const [currentFrequencyIndex, setCurrentFrequencyIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentFrequencyIndex((prev) => (prev + 1) % paymentFrequencies.length);
        setIsAnimating(false);
      }, 150); // Half of the animation duration
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/50 via-background to-background" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <Badge variant="outline" className="text-primary border-primary/20 bg-accent">
              🚀 Transform Your Cash Flow
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Get paid every{" "}
                <span 
                  className={`bg-gradient-primary bg-clip-text text-transparent transition-all duration-300 ${
                    isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  }`}
                >
                  {paymentFrequencies[currentFrequencyIndex]}
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Don't wait 30-90 days for payments. Get instant access to your earned revenue and accelerate your business growth today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/waitlist">
                <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                  Join the Waitlist →
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="w-5 h-5 text-primary" />
                <span>Instant approval</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span>Secure & trusted</span>
              </div>
            </div>
          </div>

          {/* Right content - Hero image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={heroImage}
                alt="Modern payment processing dashboard"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-primary rounded-full opacity-20 blur-xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-hero rounded-full opacity-10 blur-2xl animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
};