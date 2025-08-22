import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { PricingSection } from "@/components/PricingSection";
import { StatsSection } from "@/components/StatsSection";
import { DifferentiatorsSection } from "@/components/DifferentiatorsSection";
import { ContactSection } from "@/components/ContactSection";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <StatsSection />
        <DifferentiatorsSection />
        <ContactSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Index;
