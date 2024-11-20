"use client";

import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { Radio } from 'lucide-react';
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Only show these links if user is authenticated
  const authenticatedLinks = session ? [
    { href: "/analytics", label: "Analytics" },
    { href: "/episodes", label: "Episodes" },
    { href: "/audience", label: "Audience" },
    { href: "/settings", label: "Settings" },
  ] : [];

  // Always show these links
  const publicLinks = [
    { href: "/pricing", label: "Pricing" },
  ];

  const links = [...publicLinks, ...authenticatedLinks];

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Radio className="h-6 w-6" />
          <span className="font-bold">PodTrack</span>
        </Link>
        <div className="ml-auto flex items-center space-x-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {label}
            </Link>
          ))}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}