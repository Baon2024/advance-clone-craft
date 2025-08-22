import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "2.5%",
    description: "Perfect for getting started with salary advances",
    features: [
      "Weekly advance option",
      "Up to £500 per advance", 
      "Basic customer support",
      "Mobile app access",
      "Automatic repayment"
    ],
    popular: false
  },
  {
    name: "Professional", 
    price: "1.9%",
    description: "For regular users who want more flexibility",
    features: [
      "Daily, weekly, or bi-weekly advances",
      "Up to £2,000 per advance",
      "Priority customer support", 
      "Advanced budgeting tools",
      "Flexible repayment options",
      "No minimum balance required"
    ],
    popular: true
  },
  {
    name: "Premium",
    price: "1.2%", 
    description: "Maximum flexibility and lowest fees",
    features: [
      "Any frequency you choose",
      "Up to £5,000 per advance",
      "Dedicated account manager",
      "Premium financial insights",
      "Multiple repayment schedules", 
      "Emergency advance access",
      "Investment opportunities"
    ],
    popular: false
  }
];

export const PricingSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-card">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Only pay a small percentage when you use the service. No monthly fees, no hidden charges.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-elegant scale-105' : 'border-border/50'} bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-primary text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </CardTitle>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">
                    {plan.price}
                    <span className="text-lg text-muted-foreground font-normal"> per advance</span>
                  </div>
                  <p className="text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.popular ? "hero" : "outline"} 
                  className="w-full"
                  size="lg"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center text-muted-foreground">
          <p>All plans include bank-level security and instant approval. Cancel anytime.</p>
        </div>
      </div>
    </section>
  );
};