"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue>({
  open: false,
  setOpen: () => {},
});

function Sheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

function SheetTrigger({
  children,
  asChild,
  className,
}: {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}) {
  const { setOpen } = React.useContext(SheetContext);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: () => setOpen(true),
    });
  }

  return (
    <button className={className} onClick={() => setOpen(true)}>
      {children}
    </button>
  );
}

function SheetContent({
  children,
  side = "right",
  className,
}: {
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
}) {
  const { open, setOpen } = React.useContext(SheetContext);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      {/* Panel */}
      <div
        className={cn(
          "fixed z-50 top-0 h-full w-[300px] bg-[hsl(230,25%,8%)] border-l border-[hsl(230,20%,20%)] shadow-xl p-6 transition-transform duration-300",
          side === "right" ? "right-0" : "left-0",
          className
        )}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </>
  );
}

function SheetClose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { setOpen } = React.useContext(SheetContext);
  return (
    <button className={className} onClick={() => setOpen(false)}>
      {children}
    </button>
  );
}

export { Sheet, SheetTrigger, SheetContent, SheetClose };
