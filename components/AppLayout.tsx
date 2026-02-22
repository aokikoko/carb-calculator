"use client";

import { useI18n } from "@/lib/i18n";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Calculator, Zap, Settings, Home, Activity } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-50 font-sans overflow-hidden">
      {/* Sidebar - Global BG */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800 shrink-0">
          <Zap className="h-6 w-6 text-orange-500 mr-2" />
          <span className="font-bold text-lg tracking-tight text-white">FITMETRICS HUB</span>
        </div>
        
        <ScrollArea className="flex-1 py-6 px-3">
          <div className="space-y-6">
            <div>
              <h3 className="px-3 text-xs font-semibold text-zinc-500 tracking-wider mb-2 uppercase">
                {t.nutritionTools}
              </h3>
              <nav className="space-y-1">
                <Button
                  asChild
                  variant="ghost"
                  className={cn(
                    "w-full justify-start rounded-md h-10 px-3 transition-colors",
                    pathname === "/"
                      ? "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 hover:text-orange-500 relative after:absolute after:left-0 after:top-0 after:bottom-0 after:w-0.5 after:bg-orange-500"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                  )}
                >
                  <Link href="/">
                    <Calculator className="h-4 w-4 mr-3" />
                    {t.title}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className={cn(
                    "w-full justify-start rounded-md h-10 px-3 transition-colors",
                    pathname === "/macro-calculator"
                      ? "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 hover:text-orange-500 relative after:absolute after:left-0 after:top-0 after:bottom-0 after:w-0.5 after:bg-orange-500"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                  )}
                >
                  <Link href="#">
                    <Activity className="h-4 w-4 mr-3 opacity-70" />
                    {t.macroCalculator}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className={cn(
                    "w-full justify-start rounded-md h-10 px-3 transition-colors",
                    pathname === "/creatine-dosage"
                      ? "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 hover:text-orange-500 relative after:absolute after:left-0 after:top-0 after:bottom-0 after:w-0.5 after:bg-orange-500"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                  )}
                >
                  <Link href="#">
                    <Settings className="h-4 w-4 mr-3 opacity-70" />
                    {t.creatineDosage}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className={cn(
                    "w-full justify-start rounded-md h-10 px-3 transition-colors",
                    pathname === "/whey-protein-planner"
                      ? "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 hover:text-orange-500 relative after:absolute after:left-0 after:top-0 after:bottom-0 after:w-0.5 after:bg-orange-500"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                  )}
                >
                  <Link href="#">
                    <Settings className="h-4 w-4 mr-3 opacity-70" />
                    {t.wheyProtein}
                  </Link>
                </Button>
              </nav>
            </div>
          </div>
        </ScrollArea>
      </aside>

      {/* Main Content Area - Content BG */}
      <main className="flex-1 flex flex-col bg-zinc-900 overflow-hidden relative">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-zinc-800 bg-zinc-900 shrink-0 relative z-10">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-zinc-400 hover:text-zinc-200">{t.home}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-zinc-600" />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="text-zinc-400 hover:text-zinc-200">{t.nutrition}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-zinc-600" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-zinc-200 font-medium">{t.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center space-x-4">
            <LanguageToggle />
          </div>
        </header>

        {/* Page Content */}
        <ScrollArea className="flex-1 h-full">
          <div className="p-8">
            {children}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
