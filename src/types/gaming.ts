// Gaming Hub - TypeScript Type Definitions

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  level: number;
  xp: number;
  totalHours: number;
  gamesOwned: number;
  achievements: Achievement[];
  joinDate: string;
  isOnline: boolean;
  favoriteGenres: string[];
  recentActivity: Activity[];
}

export interface Game {
  id: string;
  title: string;
  description: string;
  genre: string[];
  platform: string[];
  developer: string;
  publisher: string;
  releaseDate: string;
  rating: number;
  price: number;
  images: {
    cover: string;
    banner: string;
    screenshots: string[];
  };
  systemRequirements: {
    minimum: string;
    recommended: string;
  };
  tags: string[];
  isOwned?: boolean;
  playTime?: number;
  progress?: number;
  lastPlayed?: string;
  isFavorite?: boolean;
  inWishlist?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  unlockedAt: string;
  gameId: string;
  xpReward: number;
}

export interface Activity {
  id: string;
  type: 'achievement' | 'game_session' | 'friend_added' | 'level_up' | 'game_completed';
  description: string;
  timestamp: string;
  gameId?: string;
  achievementId?: string;
}

export interface Friend {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  level: number;
  isOnline: boolean;
  currentGame?: string;
  friendsSince: string;
  mutualFriends: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: {
    id: string;
    username: string;
    avatar: string;
    level: number;
  };
  score: number;
  metric: string;
}

export interface GamingStats {
  totalHours: number;
  gamesCompleted: number;
  averageRating: number;
  favoriteGenre: string;
  longestSession: number;
  currentStreak: number;
  perfectGames: number;
  multiplayerHours: number;
}

export interface GameSession {
  id: string;
  gameId: string;
  startTime: string;
  endTime?: string;
  duration: number;
  achievements: string[];
  isActive: boolean;
}

export interface Notification {
  id: string;
  type: 'achievement' | 'friend_request' | 'game_update' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}