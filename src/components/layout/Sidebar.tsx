import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSidebar } from '@/contexts/SidebarContext';
import { useTheme } from '@/components/theme/ThemeProvider';
import {
  LayoutDashboard,
  Users,
  Building2,
  GraduationCap,
  Award,
  FileText,
  Archive,
  Stethoscope,
  Settings,
  LogOut,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  Search,
  Home,
  Star,
  Share2,
  HelpCircle,
  FileCode,
  CreditCard,
  User,
  ChevronsUpDown,
  Moon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

// Navigation Groups
const generalItems = [
  { path: '/dashboard', label: 'Home', icon: Home },
  { path: '/search', label: 'Search', icon: Search, special: true }, // Placeholder for search function
];

const managementItems = [
  { path: '/personnel', label: 'All personnel', icon: Users },
  { path: '/promotions', label: 'Promotions', icon: Award },
  { path: '/certificates', label: 'Certificates', icon: Star }, // Using Star to mimic "Starred"
];

const organizationItems = [
  { path: '/departments', label: 'Departments', icon: Building2 },
  { path: '/grades', label: 'Grades & Bodies', icon: GraduationCap },
  { path: '/archives', label: 'Archives', icon: Archive },
];

export function SidebarContent({
  isCollapsed,
  setIsCollapsed,
  hideToggle = false
}: {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  hideToggle?: boolean;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate('/');
  };

  const NavItem = ({ item, isActive }: { item: any, isActive: boolean }) => (
    <NavLink
      to={item.path}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        "hover:bg-primary/10 hover:text-primary",
        isActive ? "bg-accent/50 text-accent-foreground" : "text-muted-foreground",
        isCollapsed && "justify-center px-2"
      )}
      onClick={(e) => {
        if (item.special) {
          e.preventDefault();
          // Trigger global search here if implemented, or navigate to search page
          document.querySelector<HTMLInputElement>('input[type="search"]')?.focus();
        }
      }}
      title={isCollapsed ? item.label : undefined}
    >
      <item.icon className="h-4 w-4 shrink-0" />
      {!isCollapsed && <span>{item.label}</span>}
    </NavLink>
  );

  return (
    <div className="flex h-full flex-col bg-background border-r">
      {/* Header / Workspace Switcher */}
      <div className="flex h-14 items-center gap-2 px-3 border-b border-border/40">
        {!isCollapsed && (
          <Button variant="ghost" className="flex-1 justify-between px-2 h-9 font-normal hover:bg-primary/10">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground">
                <span className="text-xs font-bold">E</span>
              </div>
              <span className="truncate text-sm font-medium">EPS HR Assist</span>
            </div>
            <ChevronsUpDown className="h-3 w-3 opacity-50" />
          </Button>
        )}
        {isCollapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
            <span className="text-sm font-bold">E</span>
          </div>
        )}

        {!isCollapsed && !hideToggle && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 ml-auto text-muted-foreground"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 px-3 py-3">
        <div className="space-y-6">
          {/* General */}
          <div className="space-y-1">
            {generalItems.map((item) => (
              <NavItem key={item.path} item={item} isActive={location.pathname === item.path} />
            ))}
          </div>

          {/* Management */}
          <div className="space-y-2">
            {!isCollapsed && (
              <h4 className="px-2 text-xs font-medium text-muted-foreground mb-1">Management</h4>
            )}
            <div className="space-y-1">
              {managementItems.map((item) => (
                <NavItem key={item.path} item={item} isActive={location.pathname === item.path} />
              ))}
            </div>
          </div>

          {/* Organization */}
          <div className="space-y-2">
            {!isCollapsed && (
              <h4 className="px-2 text-xs font-medium text-muted-foreground mb-1">Organization</h4>
            )}
            <div className="space-y-1">
              {organizationItems.map((item) => (
                <NavItem key={item.path} item={item} isActive={location.pathname === item.path} />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Footer / User Profile */}
      <div className="mt-auto p-3 border-t border-border/40 space-y-2">
        {/* Toggle (only visible when collapsed effectively replaces the top alignment in some layouts, but we keep top toggle for now. 
            Actually, the requested design has toggle at top right. We did that. 
        */}

        {isCollapsed && !hideToggle && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 mx-auto mb-2 text-muted-foreground"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Share / Upgrade placeholder (Optional - included for matching design) */}
        {!isCollapsed && (
          <div className="rounded-lg bg-muted/50 p-3 mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium">System Status</span>
              <Badge variant="outline" className="text-[10px] h-4 px-1 bg-green-500/10 text-green-600 border-green-200">Online</Badge>
            </div>
            <div className="text-[10px] text-muted-foreground">
              Your HR system is running smoothly.
            </div>
          </div>
        )}

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={cn(
              "w-full h-auto px-2 py-2 justify-start hover:bg-accent/50",
              isCollapsed && "justify-center px-0"
            )}>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted border">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              {!isCollapsed && (
                <div className="ml-2 flex flex-col items-start overflow-hidden text-left">
                  <span className="w-full truncate text-sm font-medium">Admin User</span>
                  <span className="w-full truncate text-xs text-muted-foreground">admin@eps.dz</span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-60" sideOffset={8}>
            <div className="flex items-center gap-2 p-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted border">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium">Admin User</span>
                <span className="text-xs text-muted-foreground">admin@eps.dz</span>
              </div>
            </div>
            <DropdownMenuSeparator />

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Moon className="mr-2 h-4 w-4" />
                Appearance
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="w-56">
                <div className="grid grid-cols-3 gap-2 p-2">
                  <div
                    className={cn(
                      "cursor-pointer rounded-md border-2 p-1 hover:bg-accent hover:text-accent-foreground",
                      theme === 'light' ? "border-primary" : "border-transparent"
                    )}
                    onClick={() => setTheme("light")}
                  >
                    <div className="h-8 w-full rounded bg-[#ffffff] shadow-sm mb-1" />
                    <div className="text-[10px] text-center font-medium">Light</div>
                  </div>
                  <div
                    className={cn(
                      "cursor-pointer rounded-md border-2 p-1 hover:bg-accent hover:text-accent-foreground",
                      theme === 'dark' ? "border-primary" : "border-transparent"
                    )}
                    onClick={() => setTheme("dark")}
                  >
                    <div className="h-8 w-full rounded bg-[#09090b] shadow-sm mb-1" />
                    <div className="text-[10px] text-center font-medium">Dark</div>
                  </div>
                  <div
                    className={cn(
                      "cursor-pointer rounded-md border-2 p-1 hover:bg-accent hover:text-accent-foreground",
                      theme === 'system' ? "border-primary" : "border-transparent"
                    )}
                    onClick={() => setTheme("system")}
                  >
                    <div className="h-8 w-full rounded bg-gradient-to-br from-white to-black shadow-sm mb-1" />
                    <div className="text-[10px] text-center font-medium">System</div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={theme} onValueChange={(val) => setTheme(val as "light" | "dark" | "system")}>
                  <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { isCollapsed, setIsCollapsed } = useSidebar();

  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 hidden h-screen transition-all duration-300 md:block border-r bg-background",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <SidebarContent isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
    </aside>
  );
}
