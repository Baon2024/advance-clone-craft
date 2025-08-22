import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Gem } from "lucide-react";

const differentiators = [
  {
    icon: Shield,
    title: "Complete Privacy",
    description: "Your employer never knows you're using our service. It's completely confidential."
  },
  {
    icon: Zap,
    title: "Instant Approval", 
    description: "Our AI processes applications in seconds, not days. Get approved instantly."
  },
  {
    icon: Gem,
    title: "Fair Pricing",
    description: "Transparent fees with no hidden charges. You only pay when you use the service."
  }
];

export const DifferentiatorsSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-card">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why We're Different
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-card transition-all duration-300 hover:scale-105">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
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