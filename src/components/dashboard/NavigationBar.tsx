import { NavLink, useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';

import {
  Package2,
  Settings,
  Grid3x3,
  List,
  LogOut,
  Receipt,
  Backpack,
  Bell
} from "lucide-react";

const NavigationBar = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate('/login');
  };

  return (
    <TooltipProvider>
      <aside className="navigation fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <NavLink
            to='/'
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            {/* <span className="sr-only">Acme Inc</span> */}
          </NavLink>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to="/dashboard/page-one"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                end
              >
                <Grid3x3 className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to="/dashboard/page-two"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <List className="h-5 w-5" />
                <span className="sr-only">Orders</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Orders</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to="/login"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Receipt className="h-5 w-5" />
                <span className="sr-only">Products</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Products</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to="/"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to="/"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Backpack className="h-5 w-5" />
                <span className="sr-only">Analytics</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Analytics</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavLink
                to="/"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right">Notifications</TooltipContent>
          </Tooltip>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={logout}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  );
};

export default NavigationBar;