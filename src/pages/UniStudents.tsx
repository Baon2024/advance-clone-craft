import { Header } from "@/components/Header";
import { HeroSectionStudent } from "@/components/HeroSectionStudent";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { PricingSection } from "@/components/PricingSection";
import { StatsSection } from "@/components/StatsSection";
import { DifferentiatorsSection } from "@/components/DifferentiatorsSection";
import { ContactSection } from "@/components/ContactSection";
import { CTASection } from "@/components/CTASection";
import { Waitlist2Component } from "@/components/waitlist2Component";

const UniStudents = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSectionStudent />
      </main>
    </div>
  );
};

export default UniStudents;
