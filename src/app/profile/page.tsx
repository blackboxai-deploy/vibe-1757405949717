"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  currentUser, 
  mockAchievements, 
  mockRecentActivity,
  getUserStats,
  mockGames
} from "@/lib/gaming-data";

export default function ProfilePage() {
  const stats = getUserStats();
  const ownedGames = mockGames.filter(game => game.isOwned);
  
  // Calculate additional stats
  const favoriteGenres = ownedGames.reduce((acc, game) => {
    game.genre.forEach(genre => {
      acc[genre] = (acc[genre] || 0) + (game.playTime || 0);
    });
    return acc;
  }, {} as Record<string, number>);
  
  const topGenres = Object.entries(favoriteGenres)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([genre, hours]) => ({ genre, hours }));

  const totalPlayTime = ownedGames.reduce((sum, game) => sum + (game.playTime || 0), 0);
  const completionRate = ownedGames.length > 0 ? 
    ownedGames.reduce((sum, game) => sum + (game.progress || 0), 0) / ownedGames.length : 0;

  // XP progress to next level
  const xpToNextLevel = (currentUser.level + 1) * 1000; // Simple formula
  const currentLevelXP = currentUser.level * 1000;
  const progressToNextLevel = ((currentUser.xp - currentLevelXP) / (xpToNextLevel - currentLevelXP)) * 100;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-purple-900/50 via-slate-900/50 to-cyan-900/50 border-purple-500/20 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="h-32 w-32 border-4 border-purple-500/30">
              <AvatarImage src={currentUser.avatar} alt={currentUser.displayName} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-2xl">
                {currentUser.displayName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {currentUser.displayName}
              </h1>
              <p className="text-slate-400 text-lg mb-4">@{currentUser.username}</p>
              
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    Level {currentUser.level}
                  </Badge>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-slate-400">Online</span>
                </div>
                <div className="text-sm text-slate-400">
                  Member since {new Date(currentUser.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </div>
              </div>

              {/* XP Progress */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex justify-between text-sm text-white mb-2">
                  <span>Level {currentUser.level} Progress</span>
                  <span>{currentUser.xp.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP</span>
                </div>
                <Progress value={Math.min(progressToNextLevel, 100)} className="h-3" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Edit Profile
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700">
                Share Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-slate-900/50 border border-slate-700/50 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300">
            Overview
          </TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300">
            Achievements ({mockAchievements.length})
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300">
            Activity
          </TabsTrigger>
          <TabsTrigger value="stats" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300">
            Statistics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
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
                <p className="text-sm text-slate-400 mt-1">Time gaming</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  📚 <span>Games Owned</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-cyan-400">{stats.gamesOwned}</div>
                <p className="text-sm text-slate-400 mt-1">In library</p>
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
                <p className="text-sm text-slate-400 mt-1">Unlocked</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-green-500/20 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  📊 <span>Completion</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-400">{Math.round(completionRate)}%</div>
                <p className="text-sm text-slate-400 mt-1">Average progress</p>
              </CardContent>
            </Card>
          </div>

          {/* Favorite Genres */}
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Favorite Genres</CardTitle>
              <CardDescription>Based on your play time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topGenres.map((item, index) => (
                  <div key={item.genre} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-white font-medium">{item.genre}</span>
                        <span className="text-slate-400 text-sm">{item.hours}h</span>
                      </div>
                      <Progress 
                        value={(item.hours / Math.max(...Object.values(favoriteGenres))) * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAchievements.map((achievement) => (
              <Card key={achievement.id} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={achievement.icon} 
                      alt={achievement.title}
                      className="w-16 h-16 rounded-lg border border-slate-600/50"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{achievement.title}</h3>
                      <Badge className={`text-xs ${
                        achievement.rarity === 'common' ? 'bg-gray-500/20 text-gray-300 border-gray-500/30' :
                        achievement.rarity === 'uncommon' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                        achievement.rarity === 'rare' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                        achievement.rarity === 'epic' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                        'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                      }`}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{achievement.description}</p>
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>+{achievement.xpReward} XP</span>
                    <span>{new Date(achievement.unlockedAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription>Your gaming activity timeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      activity.type === 'achievement' ? 'bg-yellow-400' :
                      activity.type === 'game_session' ? 'bg-purple-400' :
                      activity.type === 'level_up' ? 'bg-green-400' :
                      'bg-cyan-400'
                    }`} />
                    <div className="flex-1">
                      <p className="text-white font-medium mb-1">{activity.description}</p>
                      <p className="text-sm text-slate-400">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Gaming Patterns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Average session</span>
                  <span className="text-white font-medium">2.3 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Most active day</span>
                  <span className="text-white font-medium">Saturday</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Preferred time</span>
                  <span className="text-white font-medium">Evening</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Games per month</span>
                  <span className="text-white font-medium">3.2</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Platform Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-400">PC</span>
                    <span className="text-white">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-400">PlayStation</span>
                    <span className="text-white">15%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-400">Xbox</span>
                    <span className="text-white">7%</span>
                  </div>
                  <Progress value={7} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}