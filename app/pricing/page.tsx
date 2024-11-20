"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, BarChart3, LineChart, PieChart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const plans = [
  {
    name: "Basic Analytics",
    price: 99,
    description: "Essential Spotify podcast metrics",
    features: [
      "Basic Listener Demographics",
      "Episode Performance Tracking",
      "Daily Listener Counts",
      "Basic Geographic Data",
      "7-Day Data History",
      "Basic Export Options",
      "Email Support",
      "Up to 5,000 data points/month",
      "Hourly Data Updates",
      "Standard API Access"
    ],
    icon: BarChart3
  },
  {
    name: "Advanced Analytics",
    price: 199,
    description: "Comprehensive podcast analytics",
    features: [
      "Everything in Basic, plus:",
      "Minute-by-Minute Listener Tracking",
      "Advanced Audience Segmentation",
      "Drop-off Point Analysis",
      "30-Day Data History",
      "Custom Report Builder",
      "Priority Support",
      "Up to 50,000 data points/month",
      "Real-time Updates",
      "Advanced API Access"
    ],
    icon: LineChart,
    popular: true
  },
  {
    name: "Enterprise Analytics",
    price: 499,
    description: "Enterprise-grade analytics",
    features: [
      "Everything in Advanced, plus:",
      "Second-by-Second Analytics",
      "Machine Learning Insights",
      "Predictive Analytics",
      "Unlimited Data History",
      "White-label Reports",
      "Dedicated Account Manager",
      "Unlimited data points",
      "Real-time + Predictive",
      "Full API Access"
    ],
    icon: PieChart
  }
];

export default function PricingPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubscribe = async (plan: typeof plans[0]) => {
    try {
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: plan.price }),
      });

      const { sessionId } = await response.json();

      // If user is not logged in, redirect to auth first
      if (!session) {
        router.push(`/auth?plan=${plan.name}&session_id=${sessionId}`);
      } else {
        router.push(`/connect?session_id=${sessionId}`);
      }
    } catch (error) {
      toast.error("Failed to process subscription");
    }
  };

  return (
    <div className="container mx-auto py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Analytics Plan</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get granular insights into your podcast performance with our comprehensive analytics platform
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card key={plan.name} className={`p-6 relative ${plan.popular ? 'border-primary' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">{plan.name}</h2>
                <div className="mt-2">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full" 
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleSubscribe(plan)}
              >
                Get Started
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}