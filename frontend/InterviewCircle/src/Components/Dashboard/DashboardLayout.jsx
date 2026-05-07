import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/Components/ui/sidebar";
import {
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconPlus,
  IconBook,
  IconChartBar,
  IconCalendar,
  IconLogout,
  IconBolt
} from "@tabler/icons-react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 transition-colors text-white" />,
    },
    {
      label: "Question Bank",
      href: "/questions",
      icon: <IconBook className="h-5 w-5 shrink-0 transition-colors text-white" />,
    },
    {
      label: "Create Interview",
      href: "/setup",
      icon: <IconPlus className="h-5 w-5 shrink-0 transition-colors text-white" />,
    },
    {
      label: "Analytics",
      href: "#",
      icon: <IconChartBar className="h-5 w-5 shrink-0 transition-colors text-white" />,
    },
    {
      label: "Schedule",
      href: "#",
      icon: <IconCalendar className="h-5 w-5 shrink-0 transition-colors text-white" />,
    },
    {
      label: "My Profile",
      href: "#",
      icon: <IconUserBolt className="h-5 w-5 shrink-0 transition-colors text-white" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="h-5 w-5 shrink-0 transition-colors text-white" />,
    },
    {
      label: "Logout",
      href: "/login",
      icon: <IconLogout className="h-5 w-5 shrink-0 transition-colors text-white" />,
    },
  ];

  return (
    <div className={cn(
      "flex flex-col md:flex-row bg-transparent w-full flex-1 mx-auto overflow-hidden relative",
      "h-screen"
    )}>
      {/* Decorative Glows - Persistent across dashboard routes */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] pointer-events-none z-0"></div>

      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-slate-950/40 backdrop-blur-2xl border-r border-white/10 z-20">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink 
                  key={idx} 
                  link={link} 
                  className={cn(
                    "hover:bg-white/5 rounded-xl transition-colors px-2 py-2",
                    location.pathname === link.href && "bg-indigo-600/20 text-indigo-400"
                  )}
                  onClick={(e) => {
                    if (link.href === "#") e.preventDefault();
                    if (link.href !== "#") navigate(link.href);
                  }}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Alex Johnson",
                href: "#",
                icon: (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-[10px] text-white">
                    AJ
                  </div>
                ),
              }} />
          </div>
        </SidebarBody>
      </Sidebar>
      
      <main className="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
         <Outlet />
      </main>
    </div>
  );
}

const Logo = () => {
  return (
    <Link
      to="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-indigo-600 flex items-center justify-center">
        <IconBolt size={14} className="text-white" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold whitespace-pre text-white text-lg tracking-tight">
        InterviewCircle
      </motion.span>
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link
      to="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-indigo-600 flex items-center justify-center">
        <IconBolt size={14} className="text-white" />
      </div>
    </Link>
  );
};

const IconBolt = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
