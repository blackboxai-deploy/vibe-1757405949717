"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockGames, getPopularGames, getWishlistGames, type Game } from "@/lib/gaming-data";
import Link from "next/link";

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const popularGames = getPopularGames();
  const wishlistGames = getWishlistGames();
  const newReleases = mockGames.filter(game => {
    const releaseDate = new Date(game.releaseDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return releaseDate > thirtyDaysAgo;
  });

  // Filter and sort all games
  const filteredGames = mockGames.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesGenre = genreFilter === "all" || game.genre.includes(genreFilter);
    return matchesSearch && matchesGenre;
  });

  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      case "release_date":
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const allGenres = Array.from(new Set(mockGames.flatMap(game => game.genre)));

  const GameCard = ({ game }: { game: Game }) => (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 group">
      <div className="relative">
        <img 
          src={game.images.cover} 
          alt={game.title}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
            ⭐ {game.rating}
          </Badge>
          {game.price === 0 && (
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              FREE
            </Badge>
          )}
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg group-hover:text-purple-400 transition-colors">
          {game.title}
        </CardTitle>
        <CardDescription className="text-slate-400 line-clamp-2">
          {game.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-2">
          {game.genre.slice(0, 3).map((genre) => (
            <Badge key={genre} variant="secondary" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
              {genre}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex justify-between items-center mb-4">
          <div className="text-slate-400 text-sm">
            <div>{game.developer}</div>
            <div>{new Date(game.releaseDate).toLocaleDateString()}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">
              {game.price === 0 ? 'Free' : `$${game.price}`}
            </div>
            <div className="text-sm text-slate-400">{game.platform.join(', ')}</div>
          </div>
        </div>
        
        <div className="flex gap-2">
          {game.isOwned ? (
            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              ✓ In Library
            </Button>
          ) : (
            <>
              <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                {game.price === 0 ? 'Get Free' : 'Buy Now'}
              </Button>
              <Button 
                variant="outline" 
                className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
              >
                {game.inWishlist ? '❤️' : '🤍'}
              </Button>
            </>
          )}
          <Link href={`/discover/${game.id}`}>
            <Button variant="outline" className="border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700">
              Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/50 via-slate-900/50 to-cyan-900/50 rounded-2xl p-8 border border-purple-500/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Discover Games
        </h1>
        <p className="text-slate-400 text-lg">Find your next gaming adventure</p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-slate-900/50 border border-slate-700/50 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300">
            All Games
          </TabsTrigger>
          <TabsTrigger value="popular" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300">
            Popular
          </TabsTrigger>
          <TabsTrigger value="new" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300">
            New Releases
          </TabsTrigger>
          <TabsTrigger value="wishlist" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-300">
            Wishlist ({wishlistGames.length})
          </TabsTrigger>
        </TabsList>

        {/* All Games Tab */}
        <TabsContent value="all" className="space-y-6">
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
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                    <SelectItem value="release_date">Newest First</SelectItem>
                    <SelectItem value="title">A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </TabsContent>

        {/* Popular Games Tab */}
        <TabsContent value="popular" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </TabsContent>

        {/* New Releases Tab */}
        <TabsContent value="new" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newReleases.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </TabsContent>

        {/* Wishlist Tab */}
        <TabsContent value="wishlist" className="space-y-6">
          {wishlistGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="py-12 text-center">
                <div className="text-4xl mb-4">🤍</div>
                <h3 className="text-xl font-semibold text-white mb-2">Your wishlist is empty</h3>
                <p className="text-slate-400 mb-4">Add games to your wishlist to keep track of ones you want to play</p>
                <Button 
                  onClick={() => document.querySelector('[value="all"]')?.click()}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Browse Games
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}