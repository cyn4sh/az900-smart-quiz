import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-svh bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(45,212,191,0.14),transparent_60%)]"
      />
      <div className="relative mx-auto flex min-h-svh w-full max-w-lg flex-col px-4 py-6">
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
