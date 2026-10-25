export interface LeaderboardEntry {
  id: string;
  name: string;
  avatarEmoji: string;
  state: string;
  xp: number;
  streakDays: number;
  badgeTitle: string;
  isCurrentUser?: boolean;
}

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lead-1',
    name: 'Radhika Sharma',
    avatarEmoji: '👩‍🎓',
    state: 'Rajasthan',
    xp: 2850,
    streakDays: 14,
    badgeTitle: 'IAS Map Wizard 🏆'
  },
  {
    id: 'lead-2',
    name: 'Ananya Verma',
    avatarEmoji: '👩‍🏫',
    state: 'Uttar Pradesh',
    xp: 2420,
    streakDays: 11,
    badgeTitle: 'Gondwana Specialist ⛏️'
  },
  {
    id: 'lead-3',
    name: 'Aarav Patel',
    avatarEmoji: '👨‍🎓',
    state: 'Gujarat',
    xp: 2180,
    streakDays: 9,
    badgeTitle: 'River Basin Master 🌊'
  },
  {
    id: 'lead-4',
    name: 'Priya Nair',
    avatarEmoji: '👩‍🔬',
    state: 'Kerala',
    xp: 1950,
    streakDays: 8,
    badgeTitle: 'Passes Navigator 🏔️'
  },
  {
    id: 'lead-5',
    name: 'Rohan Gupta',
    avatarEmoji: '👨‍💼',
    state: 'Madhya Pradesh',
    xp: 1720,
    streakDays: 7,
    badgeTitle: 'Prelims Detective 🕵️‍♂️'
  },
  {
    id: 'lead-6',
    name: 'Kavya Iyer',
    avatarEmoji: '👩‍💻',
    state: 'Tamil Nadu',
    xp: 1540,
    streakDays: 6,
    badgeTitle: 'Tertiary Lignite Expert 🍂'
  },
  {
    id: 'lead-7',
    name: 'Aditya Singh',
    avatarEmoji: '👨‍🏫',
    state: 'Bihar',
    xp: 1380,
    streakDays: 5,
    badgeTitle: 'Physiography Scholar ⛰️'
  },
  {
    id: 'lead-8',
    name: 'Sneha Kulkarni',
    avatarEmoji: '👩‍⚕️',
    state: 'Maharashtra',
    xp: 1210,
    streakDays: 4,
    badgeTitle: 'Ramsar Guardian 🌿'
  },
  {
    id: 'lead-9',
    name: 'Vikram Deshmukh',
    avatarEmoji: '👨‍✈️',
    state: 'Maharashtra',
    xp: 1050,
    streakDays: 3,
    badgeTitle: 'Coastal Ports Master 🚢'
  },
  {
    id: 'lead-10',
    name: 'Rahul Meena',
    avatarEmoji: '👨‍🎓',
    state: 'Rajasthan',
    xp: 890,
    streakDays: 2,
    badgeTitle: 'Active Cadet 🎯'
  }
];
