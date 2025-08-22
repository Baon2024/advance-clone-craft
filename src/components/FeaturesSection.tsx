import { Card, CardContent } from "@/components/ui/card";
import { Zap, Target, Gem, Shield, Link2, Phone } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Approval",
    description: "Get approved in minutes, not days. Our AI-powered system analyzes your business instantly."
  },
  {
    icon: Target,
    title: "Flexible Terms", 
    description: "Choose from 1 day to fortnight payment schedules that match your business needs."
  },
  {
    icon: Gem,
    title: "No Hidden Fees",
    description: "Transparent pricing with no surprise charges. You'll know exactly what you pay upfront."
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Bank-level security with 256-bit encryption. Your data is protected at all times."
  },
  {
    icon: Link2,
    title: "Easy Integration", 
    description: "Connect your existing accounting software and payment systems in just a few clicks."
  },
  {
    icon: Phone,
    title: "24/7 Support",
    description: "Our dedicated team is always here to help you maximize your cash flow potential."
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-card">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose PayAdvance?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We've built the most advanced payment acceleration platform to help your business thrive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300 hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};