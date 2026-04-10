import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10" as any,
  typescript: true,
});

export const PLANS = {
  FREE: {
    name: "Free",
    maxMenuItems: 20,
    analytics: false,
    staffManagement: false,
  },
  PRO: {
    name: "Pro",
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    maxMenuItems: Infinity,
    analytics: true,
    staffManagement: true,
  },
  ENTERPRISE: {
    name: "Enterprise",
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    maxMenuItems: Infinity,
    analytics: true,
    staffManagement: true,
    customDomain: true,
    whiteLabel: true,
  },
} as const;
