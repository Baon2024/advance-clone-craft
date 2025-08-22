import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-hero">
      <div className="container mx-auto">
        <div className="text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Get Paid Every 2 days?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of businesses that have transformed their cash flow with PayAdvance. Start your application today and get approved in minutes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link to="/waitlist">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-6 shadow-elegant">
                Get Started Now →
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-white/20 text-white hover:bg-white/10">
              Schedule Demo
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 pt-8 text-white/80">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>No commitment required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Setup in under 5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Get funds same day</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};