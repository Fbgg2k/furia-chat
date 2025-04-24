import React, { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ScrollArea,
  ScrollBar,
} from '@/components/ui/scroll-area';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollAreaComponent } from '@/components/scroll-area';

import { cn } from '@/lib/utils';

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

const SidebarContentComponent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn('w-full h-full', className)}>{children}</div>
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    data-sidebar="menu-button"
    className={cn(
      'flex w-full items-center justify-start gap-2 rounded-md p-2 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground',
      className
    )}
    {...props}
  >
    {children}
  </button>
));

SidebarMenuButton.displayName = 'SidebarMenuButton';

const SidebarMenuItem = ({
  children,
  href,
  isActive,
}: {
  children: React.ReactNode;
  href?: string;
  isActive?: boolean;
}) => (
  <li data-sidebar="menu-item">
    <SidebarMenuButton
      data-active={isActive}
    >
      {children}
    </SidebarMenuButton>
  </li>
);

const SidebarMenu = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <ul className="mt-2 flex w-full flex-col">{children}</ul>
);

const SidebarGroup = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div data-sidebar="group" className="mt-4">
    <span className="text-xs font-medium uppercase text-muted-foreground">
      {label}
    </span>
    <SidebarMenu>{children}</SidebarMenu>
  </div>
);

const Sidebar = ({ children, className }: SidebarProps) => (
  <div
    className={cn(
      'group/sidebar fixed top-0 left-0 z-50 flex h-screen min-h-screen w-[250px] flex-col border-r bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
      className
    )}
  >
    <div className="flex h-screen flex-col">
      <div className="flex flex-col px-4 py-6">
        <SidebarContentComponent>
          <div className="flex w-full h-full items-center gap-2">
            <div className="w-full h-full">{children}</div>
          </div>
        </SidebarContentComponent>
      </div>
      <ScrollAreaComponent className="flex-1">
        <ScrollBar orientation="vertical" />
      </ScrollAreaComponent>
    </div>
  </div>
);

export { Sidebar, SidebarMenuItem, SidebarGroup };