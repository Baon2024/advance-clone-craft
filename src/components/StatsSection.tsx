import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { number: "50,000+", label: "Happy Customers" },
  { number: "£10M+", label: "Advances Processed" },
  { number: "99.9%", label: "Uptime Guarantee" },
  { number: "4.9★", label: "Customer Rating" }
];

export const StatsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Revolutionizing Salary Access
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              PayAdvance was founded with a simple mission: give hardworking people access to their earned wages when they need them most, without involving their employers.
            </p>
            <p>
              We believe financial flexibility shouldn't depend on your employer's policies or approval processes. Our direct relationship model means you maintain complete privacy while gaining unprecedented control over your cash flow.
            </p>
            <p>
              Using advanced AI and secure banking partnerships, we've created the fastest, most reliable salary advance platform in the UK. No paperwork, no waiting, no employer involvement - just instant access to your earned wages.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-border/50 text-center hover:shadow-card transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};