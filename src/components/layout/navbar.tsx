"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronDown, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_ITEMS } from "@/config/site";
import { cn } from "@/lib/utils";

function isNavActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function DesktopDropdown({ item }: { item: (typeof NAV_ITEMS)[number] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = isNavActive(pathname, item.href);

  if (!("children" in item) || !item.children?.length) {
    return (
      <Link
        href={item.href}
        className={cn(
          "text-sm font-semibold uppercase tracking-wider transition-colors hover:text-isdrc-green",
          isActive
            ? "border-b-2 border-isdrc-navy pb-0.5 text-isdrc-navy"
            : "text-primary"
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={cn(
          "flex items-center gap-1 text-sm font-semibold uppercase tracking-wider transition-colors hover:text-isdrc-green",
          isActive
            ? "border-b-2 border-isdrc-navy pb-0.5 text-isdrc-navy"
            : "text-primary"
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 min-w-[220px] pt-3">
          <div className="overflow-hidden rounded-sm border border-border bg-white shadow-xl">
            {"children" in item &&
              item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block px-4 py-3 text-sm font-medium uppercase tracking-wide text-gray-700 transition-colors hover:bg-gray-50 hover:text-isdrc-navy"
                >
                  {child.label}
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileNavItem({
  item,
  onClose,
}: {
  item: (typeof NAV_ITEMS)[number];
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  if (!("children" in item) || !item.children?.length) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="block border-b border-border py-3 text-sm font-semibold uppercase tracking-wider text-primary"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between py-3 text-sm font-semibold uppercase tracking-wider text-primary"
        aria-expanded={expanded}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            expanded && "rotate-180"
          )}
        />
      </button>
      {expanded && (
        <div className="mb-2 ml-4 flex flex-col gap-1">
          {"children" in item &&
            item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className="py-2 text-sm text-muted-foreground hover:text-isdrc-navy"
              >
                {child.label}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

export function Navbar({
  siteName,
  logoUrl,
}: {
  siteName: string;
  logoUrl: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 overflow-visible border-b border-border bg-white shadow-sm">
      <nav
        className="relative mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 overflow-visible px-4 md:h-24 md:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="relative z-20 flex h-full min-w-0 shrink-0 items-center"
          aria-label={`${siteName} home`}
        >
          <Image
            src={logoUrl}
            alt={`${siteName} logo`}
            width={720}
            height={280}
            className="h-28 w-auto max-w-[min(100%,320px)] object-contain object-left sm:h-32 sm:max-w-[400px] md:h-36 md:max-w-[480px]"
            priority
          />
        </Link>

        <div className="hidden items-center gap-8 pr-4 lg:flex">
          {NAV_ITEMS.map((item) => (
            <DesktopDropdown key={item.href} item={item} />
          ))}
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:bg-accent lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-white p-0">
            <div className="flex items-center justify-between gap-3 border-b border-border p-4">
              <Image
                src={logoUrl}
                alt={`${siteName} logo`}
                width={280}
                height={100}
                className="h-14 w-auto max-w-55 object-contain"
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:bg-accent"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col p-4" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => (
                <MobileNavItem
                  key={item.href}
                  item={item}
                  onClose={() => setMobileOpen(false)}
                />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
