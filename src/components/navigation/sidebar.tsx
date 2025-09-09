"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/gaming-data";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: "🎮",
    description: "Gaming overview and stats"
  },
  {
    title: "Library",
    href: "/library",
    icon: "📚",
    description: "Your game collection"
  },
  {
    title: "Discover",
    href: "/discover",
    icon: "🔍",
    description: "Find new games"
  },
  {
    title: "Profile",
    href: "/profile",
    icon: "👤",
    description: "Your gaming profile"
  },
  {
    title: "Friends",
    href: "/friends",
    icon: "👥",
    description: "Gaming friends and social"
  },
  {
    title: "Leaderboards",
    href: "/leaderboards",
    icon: "🏆",
    description: "Rankings and competitions"
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-slate-950/95 backdrop-blur-xl border-r border-purple-500/20 z-40">
      {/* Header */}
      <div className="p-6 border-b border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            GH
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Gaming Hub
          </h1>
        </div>
        
        {/* User Profile Section */}
        <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-purple-500/10">
          <Avatar className="h-10 w-10 border-2 border-purple-500/20">
            <AvatarImage src={currentUser.avatar} alt={currentUser.displayName} />
            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white">
              {currentUser.displayName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {currentUser.displayName}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
                Level {currentUser.level}
              </Badge>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Online" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-12 text-left transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-500/30 shadow-lg shadow-purple-500/10"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent"
                )}
              >
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs opacity-70">{item.description}</div>
                </div>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Gaming Stats */}
      <div className="absolute bottom-6 left-4 right-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-purple-500/10">
          <h3 className="text-sm font-medium text-white mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Total Hours</span>
              <span className="text-purple-400 font-medium">{currentUser.totalHours}h</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Games Owned</span>
              <span className="text-cyan-400 font-medium">{currentUser.gamesOwned}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Current XP</span>
              <span className="text-yellow-400 font-medium">{currentUser.xp.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}