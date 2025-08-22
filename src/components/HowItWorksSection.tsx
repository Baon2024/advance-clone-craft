import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Calendar, CreditCard, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Salary Documents",
    description: "Simply upload your payslips or employment contract. We verify your income directly with you - no employer involvement needed."
  },
  {
    number: "02", 
    icon: Calendar,
    title: "Choose Your Advance Frequency",
    description: "Decide how often you want salary advances. Weekly, bi-weekly, or monthly - it's entirely up to your needs."
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Set Up Direct Debit Repayment",
    description: "Agree to automatic repayment at month-end. Simple, transparent, and completely between you and PayAdvance."
  }
];

export const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <div className="space-y-2 max-w-2xl mx-auto">
            <p className="text-xl text-muted-foreground">
              Direct connection between you and PayAdvance
            </p>
            <Badge variant="outline" className="text-primary border-primary/20 bg-accent">
              No employer approval required - it's completely private
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="relative bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Step number */}
                    <div className="flex items-center justify-between">
                      <span className="text-5xl font-bold text-primary/20">
                        {step.number}
                      </span>
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-foreground">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
                
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-primary transform -translate-y-1/2 z-10" />
                )}
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="font-medium">No employer permission needed</span>
          </div>
        </div>
      </div>
    </section>
  );
};