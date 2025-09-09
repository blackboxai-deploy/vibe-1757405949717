"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  currentUser, 
  mockRecentActivity, 
  mockFriends,
  getRecentlyPlayedGames,
  getUserStats 
} from "@/lib/gaming-data";
import Link from "next/link";

export default function DashboardPage() {
  const recentGames = getRecentlyPlayedGames();
  const stats = getUserStats();
  const onlineFriends = mockFriends.filter(friend => friend.isOnline);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-900/50 via-slate-900/50 to-cyan-900/50 rounded-2xl p-8 border border-purple-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Welcome back, {currentUser.displayName}!
            </h1>
            <p className="text-slate-400 text-lg">Ready for your next gaming adventure?</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">{currentUser.level}</div>
            <div className="text-sm text-slate-400">Current Level</div>
          </div>
        </div>
      </div>

      {/* Gaming Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              🎮 <span>Total Hours</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400">{stats.totalHours}h</div>
            <p className="text-sm text-slate-400 mt-1">Time spent gaming</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              📚 <span>Game Library</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyan-400">{stats.gamesOwned}</div>
            <p className="text-sm text-slate-400 mt-1">Games in collection</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-yellow-500/20 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              🏆 <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">{stats.achievementsUnlocked}</div>
            <p className="text-sm text-slate-400 mt-1">Unlocked trophies</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-green-500/20 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              ⭐ <span>Avg Rating</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">{stats.averageRating}</div>
            <p className="text-sm text-slate-400 mt-1">Game ratings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recently Played Games */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Recently Played</CardTitle>
                  <CardDescription>Continue your gaming sessions</CardDescription>
                </div>
                <Link href="/library">
                  <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentGames.map((game) => (
                <div key={game.id} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-purple-500/30 transition-colors">
                  <img 
                    src={game.images.cover} 
                    alt={game.title}
                    className="w-16 h-20 rounded-lg object-cover border border-slate-600/50"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-white mb-1">{game.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {game.genre.slice(0, 2).map((genre) => (
                        <Badge key={genre} variant="secondary" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>🕒 {game.playTime}h played</span>
                      <span>📈 {game.progress}% complete</span>
                    </div>
                    {game.progress && (
                      <Progress value={game.progress} className="mt-2 h-2" />
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                    Play
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Online Friends */}
          <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                👥 <span>Friends Online</span>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  {onlineFriends.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {onlineFriends.map((friend) => (
                <div key={friend.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                  <div className="relative">
                    <Avatar className="h-8 w-8 border border-slate-600">
                      <AvatarImage src={friend.avatar} alt={friend.displayName} />
                      <AvatarFallback className="bg-slate-700 text-white text-xs">
                        {friend.displayName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{friend.displayName}</p>
                    <p className="text-xs text-slate-400 truncate">{friend.currentGame || 'Online'}</p>
                  </div>
                </div>
              ))}
              <Link href="/friends">
                <Button variant="outline" size="sm" className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                  View All Friends
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-slate-900/50 border-yellow-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                ⚡ <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockRecentActivity.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-white">{activity.description}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              <Link href="/profile">
                <Button variant="outline" size="sm" className="w-full border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
                  View Full Activity
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-purple-900/30 via-slate-900/50 to-cyan-900/30 border-purple-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
          <CardDescription>Jump into your favorite gaming activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/discover">
              <Button className="w-full h-20 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 flex flex-col gap-2">
                <span className="text-2xl">🔍</span>
                <span>Discover Games</span>
              </Button>
            </Link>
            <Link href="/library">
              <Button className="w-full h-20 bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 flex flex-col gap-2">
                <span className="text-2xl">📚</span>
                <span>My Library</span>
              </Button>
            </Link>
            <Link href="/leaderboards">
              <Button className="w-full h-20 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/30 flex flex-col gap-2">
                <span className="text-2xl">🏆</span>
                <span>Leaderboards</span>
              </Button>
            </Link>
            <Link href="/friends">
              <Button className="w-full h-20 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 flex flex-col gap-2">
                <span className="text-2xl">👥</span>
                <span>Friends</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}