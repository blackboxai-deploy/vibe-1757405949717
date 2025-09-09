"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockGames } from "@/lib/gaming-data";
import Link from "next/link";

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");

  // Filter and sort games
  const ownedGames = mockGames.filter(game => game.isOwned);
  
  const filteredGames = ownedGames.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesGenre = genreFilter === "all" || game.genre.includes(genreFilter);
    return matchesSearch && matchesGenre;
  });

  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        if (!a.lastPlayed) return 1;
        if (!b.lastPlayed) return -1;
        return new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime();
      case "playtime":
        return (b.playTime || 0) - (a.playTime || 0);
      case "rating":
        return b.rating - a.rating;
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const allGenres = Array.from(new Set(ownedGames.flatMap(game => game.genre)));

  const totalHours = ownedGames.reduce((sum, game) => sum + (game.playTime || 0), 0);
  const completedGames = ownedGames.filter(game => (game.progress || 0) >= 100).length;
  const averageProgress = ownedGames.reduce((sum, game) => sum + (game.progress || 0), 0) / ownedGames.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/50 via-slate-900/50 to-cyan-900/50 rounded-2xl p-8 border border-purple-500/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Game Library
        </h1>
        <p className="text-slate-400 text-lg">Manage and play your game collection</p>
      </div>

      {/* Library Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-sm">
              📚 <span>Total Games</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{ownedGames.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-sm">
              🎮 <span>Hours Played</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-400">{totalHours}h</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-green-500/20 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-sm">
              ✅ <span>Completed</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{completedGames}</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-yellow-500/20 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2 text-sm">
              📊 <span>Avg Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{Math.round(averageProgress)}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
              />
            </div>
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger className="w-40 bg-slate-800/50 border-slate-600 text-white">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="all">All Genres</SelectItem>
                {allGenres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-slate-800/50 border-slate-600 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="recent">Recently Played</SelectItem>
                <SelectItem value="playtime">Play Time</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedGames.map((game) => (
          <Card key={game.id} className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 group">
            <div className="relative">
              <img 
                src={game.images.cover} 
                alt={game.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="absolute top-3 right-3">
                <Badge className={`${
                  game.isFavorite ? 'bg-red-500/20 text-red-300 border-red-500/30' : 'bg-slate-700/70 text-slate-300 border-slate-600/50'
                }`}>
                  {game.isFavorite ? '❤️ Favorite' : '⭐ ' + game.rating}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                {game.progress !== undefined && (
                  <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-2">
                    <div className="flex justify-between text-xs text-white mb-1">
                      <span>Progress</span>
                      <span>{game.progress}%</span>
                    </div>
                    <Progress value={game.progress} className="h-2" />
                  </div>
                )}
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg group-hover:text-purple-400 transition-colors">
                {game.title}
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                {game.genre.slice(0, 2).map((genre) => (
                  <Badge key={genre} variant="secondary" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {genre}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex justify-between items-center text-sm text-slate-400 mb-4">
                <span>🕒 {game.playTime}h played</span>
                <span>📅 {game.lastPlayed ? new Date(game.lastPlayed).toLocaleDateString() : 'Never'}</span>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                  Play Now
                </Button>
                <Link href={`/discover/${game.id}`}>
                  <Button variant="outline" className="border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700">
                    Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="py-12 text-center">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-white mb-2">No games found</h3>
            <p className="text-slate-400 mb-4">Try adjusting your search or filters</p>
            <Link href="/discover">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Discover New Games
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}