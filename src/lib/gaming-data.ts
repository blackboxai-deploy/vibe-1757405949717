import { User, Game, Achievement, Friend, LeaderboardEntry, Activity } from '@/types/gaming';

// Mock User Data
export const currentUser: User = {
  id: '1',
  username: 'gamerPro2024',
  displayName: 'Gaming Pro',
  avatar: 'https://placehold.co/100x100?text=Gaming+Pro+Avatar+Profile+Picture+Cool+Gamer+Style',
  level: 42,
  xp: 15750,
  totalHours: 1247,
  gamesOwned: 156,
  achievements: [],
  joinDate: '2023-01-15',
  isOnline: true,
  favoriteGenres: ['Action', 'RPG', 'Strategy'],
  recentActivity: []
};

// Mock Games Data
export const mockGames: Game[] = [
  {
    id: '1',
    title: 'Cyber Nexus 2077',
    description: 'An immersive cyberpunk RPG set in a dystopian future with advanced AI and neural implants.',
    genre: ['RPG', 'Action', 'Cyberpunk'],
    platform: ['PC', 'PlayStation', 'Xbox'],
    developer: 'Future Games Studio',
    publisher: 'Mega Corp Entertainment',
    releaseDate: '2024-03-15',
    rating: 4.8,
    price: 59.99,
    images: {
      cover: 'https://placehold.co/300x400?text=Cyber+Nexus+2077+Game+Cover+Cyberpunk+RPG+Futuristic+Neon+City',
      banner: 'https://placehold.co/1200x400?text=Cyber+Nexus+2077+Banner+Cyberpunk+City+Skyline+Neon+Lights',
      screenshots: [
        'https://placehold.co/800x450?text=Cyber+Nexus+Screenshot+Futuristic+City+Combat+Scene',
        'https://placehold.co/800x450?text=Cyber+Nexus+Screenshot+Character+Customization+Neural+Implants'
      ]
    },
    systemRequirements: {
      minimum: 'OS: Windows 10, CPU: Intel i5-8400, RAM: 8GB, GPU: GTX 1060',
      recommended: 'OS: Windows 11, CPU: Intel i7-10700K, RAM: 16GB, GPU: RTX 3070'
    },
    tags: ['Cyberpunk', 'Open World', 'Character Customization', 'Multiplayer'],
    isOwned: true,
    playTime: 87,
    progress: 65,
    lastPlayed: '2024-01-20',
    isFavorite: true
  },
  {
    id: '2',
    title: 'Mystic Realms Online',
    description: 'A fantasy MMORPG with magical worlds, epic quests, and massive multiplayer battles.',
    genre: ['MMORPG', 'Fantasy', 'Adventure'],
    platform: ['PC', 'Mac'],
    developer: 'Enchanted Studios',
    publisher: 'Fantasy World Games',
    releaseDate: '2023-11-08',
    rating: 4.6,
    price: 49.99,
    images: {
      cover: 'https://placehold.co/300x400?text=Mystic+Realms+Online+Fantasy+MMORPG+Magic+Dragon+Castle',
      banner: 'https://placehold.co/1200x400?text=Mystic+Realms+Banner+Fantasy+Landscape+Magic+Castle+Dragons',
      screenshots: [
        'https://placehold.co/800x450?text=Mystic+Realms+Screenshot+Epic+Dragon+Battle+Magic+Spells',
        'https://placehold.co/800x450?text=Mystic+Realms+Screenshot+Fantasy+Village+Magical+Environment'
      ]
    },
    systemRequirements: {
      minimum: 'OS: Windows 10, CPU: Intel i3-6100, RAM: 6GB, GPU: GTX 960',
      recommended: 'OS: Windows 11, CPU: Intel i5-9600K, RAM: 12GB, GPU: GTX 1660'
    },
    tags: ['Fantasy', 'MMORPG', 'Magic', 'Guild System'],
    isOwned: true,
    playTime: 203,
    progress: 42,
    lastPlayed: '2024-01-18',
    isFavorite: false
  },
  {
    id: '3',
    title: 'Stellar Command',
    description: 'A strategic space exploration game with real-time combat and galaxy conquest.',
    genre: ['Strategy', 'Space', 'Simulation'],
    platform: ['PC', 'Mac', 'Linux'],
    developer: 'Cosmic Interactive',
    publisher: 'Space Games Ltd',
    releaseDate: '2024-01-12',
    rating: 4.4,
    price: 39.99,
    images: {
      cover: 'https://placehold.co/300x400?text=Stellar+Command+Space+Strategy+Spaceship+Galaxy+Stars',
      banner: 'https://placehold.co/1200x400?text=Stellar+Command+Banner+Space+Battle+Spaceships+Galaxy',
      screenshots: [
        'https://placehold.co/800x450?text=Stellar+Command+Screenshot+Space+Fleet+Battle+Strategy',
        'https://placehold.co/800x450?text=Stellar+Command+Screenshot+Galaxy+Map+Planet+Exploration'
      ]
    },
    systemRequirements: {
      minimum: 'OS: Windows 10, CPU: Intel i3-7100, RAM: 4GB, GPU: GTX 950',
      recommended: 'OS: Windows 11, CPU: Intel i5-8400, RAM: 8GB, GPU: GTX 1650'
    },
    tags: ['Strategy', 'Space', 'Real-time', 'Multiplayer'],
    isOwned: false,
    inWishlist: true
  },
  {
    id: '4',
    title: 'Racing Legends Pro',
    description: 'The ultimate racing simulation with realistic physics and legendary supercars.',
    genre: ['Racing', 'Simulation', 'Sports'],
    platform: ['PC', 'PlayStation', 'Xbox'],
    developer: 'Speed Dynamics',
    publisher: 'Motorsport Gaming',
    releaseDate: '2023-09-22',
    rating: 4.7,
    price: 69.99,
    images: {
      cover: 'https://placehold.co/300x400?text=Racing+Legends+Pro+Supercar+Racing+Speed+Track',
      banner: 'https://placehold.co/1200x400?text=Racing+Legends+Banner+High+Speed+Racing+Supercars+Track',
      screenshots: [
        'https://placehold.co/800x450?text=Racing+Legends+Screenshot+Supercar+Race+Track+Speed',
        'https://placehold.co/800x450?text=Racing+Legends+Screenshot+Car+Customization+Garage'
      ]
    },
    systemRequirements: {
      minimum: 'OS: Windows 10, CPU: Intel i5-7600, RAM: 8GB, GPU: GTX 1050',
      recommended: 'OS: Windows 11, CPU: Intel i7-9700K, RAM: 16GB, GPU: RTX 2070'
    },
    tags: ['Racing', 'Simulation', 'Realistic Physics', 'Car Customization'],
    isOwned: true,
    playTime: 45,
    progress: 28,
    lastPlayed: '2024-01-15'
  },
  {
    id: '5',
    title: 'Battle Royale Champions',
    description: 'Intense 100-player battle royale with unique abilities and dynamic environments.',
    genre: ['Battle Royale', 'Shooter', 'Action'],
    platform: ['PC', 'PlayStation', 'Xbox', 'Mobile'],
    developer: 'Arena Studios',
    publisher: 'Competitive Gaming Corp',
    releaseDate: '2023-06-10',
    rating: 4.5,
    price: 0, // Free-to-play
    images: {
      cover: 'https://placehold.co/300x400?text=Battle+Royale+Champions+Shooter+Combat+Weapons+Arena',
      banner: 'https://placehold.co/1200x400?text=Battle+Royale+Banner+Combat+Arena+Weapons+Action+Fight',
      screenshots: [
        'https://placehold.co/800x450?text=Battle+Royale+Screenshot+Combat+Arena+Weapons+Action',
        'https://placehold.co/800x450?text=Battle+Royale+Screenshot+Map+Overview+Battle+Zone'
      ]
    },
    systemRequirements: {
      minimum: 'OS: Windows 10, CPU: Intel i3-8100, RAM: 6GB, GPU: GTX 1050',
      recommended: 'OS: Windows 11, CPU: Intel i5-10400, RAM: 12GB, GPU: GTX 1660'
    },
    tags: ['Battle Royale', 'Free-to-Play', 'Competitive', 'Team Play'],
    isOwned: true,
    playTime: 156,
    progress: 0, // No single-player progress
    lastPlayed: '2024-01-21'
  }
];

// Mock Achievements
export const mockAchievements: Achievement[] = [
  {
    id: 'ach1',
    title: 'First Steps',
    description: 'Complete your first gaming session',
    icon: 'https://placehold.co/64x64?text=First+Steps+Achievement+Badge+Gaming+Trophy',
    rarity: 'common',
    unlockedAt: '2024-01-15T10:30:00Z',
    gameId: '1',
    xpReward: 100
  },
  {
    id: 'ach2',
    title: 'Cyber Master',
    description: 'Reach level 50 in Cyber Nexus 2077',
    icon: 'https://placehold.co/64x64?text=Cyber+Master+Achievement+Cyberpunk+Trophy+Level+50',
    rarity: 'rare',
    unlockedAt: '2024-01-18T15:45:00Z',
    gameId: '1',
    xpReward: 500
  },
  {
    id: 'ach3',
    title: 'Speed Demon',
    description: 'Win 10 races in Racing Legends Pro',
    icon: 'https://placehold.co/64x64?text=Speed+Demon+Racing+Achievement+Trophy+Winner',
    rarity: 'uncommon',
    unlockedAt: '2024-01-20T12:20:00Z',
    gameId: '4',
    xpReward: 250
  }
];

// Mock Friends
export const mockFriends: Friend[] = [
  {
    id: 'f1',
    username: 'shadowNinja',
    displayName: 'Shadow Ninja',
    avatar: 'https://placehold.co/64x64?text=Shadow+Ninja+Gaming+Avatar+Profile+Dark+Warrior',
    level: 38,
    isOnline: true,
    currentGame: 'Battle Royale Champions',
    friendsSince: '2023-08-15',
    mutualFriends: 12
  },
  {
    id: 'f2',
    username: 'magicWizard92',
    displayName: 'Magic Wizard',
    avatar: 'https://placehold.co/64x64?text=Magic+Wizard+Gaming+Avatar+Fantasy+Mage+Staff',
    level: 45,
    isOnline: false,
    friendsSince: '2023-05-22',
    mutualFriends: 8
  },
  {
    id: 'f3',
    username: 'raceKingPro',
    displayName: 'Race King',
    avatar: 'https://placehold.co/64x64?text=Race+King+Gaming+Avatar+Racing+Helmet+Speed',
    level: 35,
    isOnline: true,
    currentGame: 'Racing Legends Pro',
    friendsSince: '2023-11-03',
    mutualFriends: 15
  }
];

// Mock Leaderboards
export const mockLeaderboards: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      id: '1',
      username: 'gamerPro2024',
      avatar: 'https://placehold.co/64x64?text=Gaming+Pro+Leaderboard+Avatar+Champion+Gold',
      level: 42
    },
    score: 15750,
    metric: 'Total XP'
  },
  {
    rank: 2,
    user: {
      id: 'f2',
      username: 'magicWizard92',
      avatar: 'https://placehold.co/64x64?text=Magic+Wizard+Leaderboard+Avatar+Silver+Medal',
      level: 45
    },
    score: 14200,
    metric: 'Total XP'
  },
  {
    rank: 3,
    user: {
      id: 'f1',
      username: 'shadowNinja',
      avatar: 'https://placehold.co/64x64?text=Shadow+Ninja+Leaderboard+Avatar+Bronze+Medal',
      level: 38
    },
    score: 12800,
    metric: 'Total XP'
  }
];

// Mock Recent Activity
export const mockRecentActivity: Activity[] = [
  {
    id: 'act1',
    type: 'achievement',
    description: 'Unlocked "Speed Demon" achievement',
    timestamp: '2024-01-20T12:20:00Z',
    gameId: '4',
    achievementId: 'ach3'
  },
  {
    id: 'act2',
    type: 'game_session',
    description: 'Played Battle Royale Champions for 2 hours',
    timestamp: '2024-01-21T18:30:00Z',
    gameId: '5'
  },
  {
    id: 'act3',
    type: 'level_up',
    description: 'Reached level 42!',
    timestamp: '2024-01-19T14:15:00Z'
  }
];

// Helper functions
export const getGameById = (id: string): Game | undefined => {
  return mockGames.find(game => game.id === id);
};

export const getUserFriends = (): Friend[] => {
  return mockFriends;
};

export const getPopularGames = (): Game[] => {
  return mockGames.filter(game => game.rating >= 4.5);
};

export const getRecentlyPlayedGames = (): Game[] => {
  return mockGames
    .filter(game => game.isOwned && game.lastPlayed)
    .sort((a, b) => new Date(b.lastPlayed!).getTime() - new Date(a.lastPlayed!).getTime())
    .slice(0, 5);
};

export const getWishlistGames = (): Game[] => {
  return mockGames.filter(game => game.inWishlist);
};

export const getUserStats = () => {
  const ownedGames = mockGames.filter(game => game.isOwned);
  const totalHours = ownedGames.reduce((sum, game) => sum + (game.playTime || 0), 0);
  const avgRating = ownedGames.reduce((sum, game) => sum + game.rating, 0) / ownedGames.length;
  
  return {
    totalHours,
    gamesOwned: ownedGames.length,
    averageRating: Number(avgRating.toFixed(1)),
    achievementsUnlocked: mockAchievements.length,
    currentLevel: currentUser.level,
    totalXP: currentUser.xp
  };
};