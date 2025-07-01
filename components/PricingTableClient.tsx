"use client";

import { PricingTable, ClerkProvider } from "@clerk/clerk-react";

export default function PricingTableClient() {
  // Access environment variables using the NEXT_PUBLIC_ prefix in client components
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.error("Missing Clerk publishable key");
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <PricingTable />
    </ClerkProvider>
  );
}
