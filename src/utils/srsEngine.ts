import { AspirantRank, Badge, Place, QuizQuestion, SRSRecord, Topic, UserRewards } from '../types';
import { haversineDistanceKm, maskPlaceNameInText, shuffle, STATE_CENTROIDS, EXCLUDED_DISTRACTOR_UTS } from './quizEngine';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

// Spaced repetition intervals in days corresponding to mastery levels 0 through 5
export const SRS_INTERVAL_DAYS = [0, 1, 3, 7, 16, 35];

export const ASPIRANT_RANKS: AspirantRank[] = [
  { name: 'District Explorer', minXp: 0, title: 'Level 1 Aspirant', badgeEmoji: '🧭', color: '#64748B' },
  { name: 'Cadre Trainee', minXp: 150, title: 'Level 2 Trainee', badgeEmoji: '📜', color: '#0284C7' },
  { name: 'Sub-Divisional Magistrate', minXp: 400, title: 'Level 3 Officer', badgeEmoji: '⚖️', color: '#0D9488' },
  { name: 'District Collector', minXp: 850, title: 'Level 4 Administrator', badgeEmoji: '🏛️', color: '#E07A3F' },
  { name: 'Surveyor General of India', minXp: 1600, title: 'Master of Indian Geography', badgeEmoji: '🇮🇳', color: '#16A34A' }
];

export function getRankForXp(xp: number): AspirantRank {
  for (let i = ASPIRANT_RANKS.length - 1; i >= 0; i--) {
    if (xp >= ASPIRANT_RANKS[i].minXp) {
      return ASPIRANT_RANKS[i];
    }
  }
  return ASPIRANT_RANKS[0];
}

export function getNextRank(xp: number): { nextRank: AspirantRank | null; neededXp: number; progressPercent: number } {
  const currentRank = getRankForXp(xp);
  const currentIndex = ASPIRANT_RANKS.findIndex((r) => r.name === currentRank.name);
  if (currentIndex >= ASPIRANT_RANKS.length - 1) {
    return { nextRank: null, neededXp: 0, progressPercent: 100 };
  }
  const nextRank = ASPIRANT_RANKS[currentIndex + 1];
  const range = nextRank.minXp - currentRank.minXp;
  const earned = xp - currentRank.minXp;
  const progressPercent = Math.min(100, Math.max(0, Math.round((earned / range) * 100)));
  return { nextRank, neededXp: nextRank.minXp - xp, progressPercent };
}

export const BADGES_CATALOG: Omit<Badge, 'unlocked' | 'unlockedAt' | 'progress'>[] = [
  {
    id: 'first_quiz',
    title: 'First Expedition',
    description: 'Complete your first map training session.',
    emoji: '🎯',
    category: 'speed',
    maxProgress: 1
  },
  {
    id: 'srs_cleared_10',
    title: 'Spaced Repetition Scholar',
    description: 'Review 10 places in the Spaced Repetition Queue.',
    emoji: '🔁',
    category: 'mastery',
    maxProgress: 10
  },
  {
    id: 'streak_3',
    title: 'Consistent Aspirant',
    description: 'Maintain a 3-day active preparation streak.',
    emoji: '🔥',
    category: 'streak',
    maxProgress: 3
  },
  {
    id: 'streak_7',
    title: 'Prelims Warrior',
    description: 'Maintain a 7-day unbroken study streak.',
    emoji: '⚡',
    category: 'streak',
    maxProgress: 7
  },
  {
    id: 'century_hits',
    title: 'Century Club',
    description: 'Achieve 100 accurate location answers.',
    emoji: '💎',
    category: 'mastery',
    maxProgress: 100
  },
  {
    id: 'flawless_quiz',
    title: 'Flawless Execution',
    description: 'Score 100% on a quiz with 10 or more questions.',
    emoji: '🌟',
    category: 'speed',
    maxProgress: 1
  },
  {
    id: 'tiger_guardian',
    title: 'Wild Conservator',
    description: 'Achieve Level 3+ mastery in 8 National Parks & Reserves.',
    emoji: '🐅',
    category: 'topic',
    maxProgress: 8
  },
  {
    id: 'port_captain',
    title: 'Maritime Commander',
    description: 'Achieve Level 3+ mastery in 8 Major Ports of India.',
    emoji: '⚓',
    category: 'topic',
    maxProgress: 8
  },
  {
    id: 'himalayan_climber',
    title: 'Highlander',
    description: 'Achieve Level 3+ mastery in 10 Mountain Passes or Peaks.',
    emoji: '🏔️',
    category: 'topic',
    maxProgress: 10
  },
  {
    id: 'heritage_custodian',
    title: 'Heritage Custodian',
    description: 'Master 8 UNESCO World Heritage Sites to Level 3+.',
    emoji: '🏛️',
    category: 'topic',
    maxProgress: 8
  },
  {
    id: 'grandmaster_25',
    title: 'Bharat Bhugol Pioneer',
    description: 'Reach Level 5 (Permanent Mastered) in 25 places.',
    emoji: '🏆',
    category: 'mastery',
    maxProgress: 25
  }
];

/**
 * Calculates updated SRS record after a review
 */
export function calculateNextReview(
  existing: SRSRecord | undefined,
  topicId: string,
  placeName: string,
  isCorrect: boolean,
  now: number = Date.now()
): SRSRecord {
  const currentMastery = existing ? existing.mastery : 0;
  const currentReps = existing ? existing.reps : 0;
  const currentLapses = existing ? existing.lapses : 0;

  if (isCorrect) {
    const newMastery = Math.min(5, currentMastery + 1);
    const intervalDays = SRS_INTERVAL_DAYS[newMastery];
    const nextReviewAt = now + intervalDays * ONE_DAY_MS;

    return {
      placeKey: `${topicId}|${placeName}`,
      topicId,
      placeName,
      mastery: newMastery,
      intervalDays,
      lastReviewedAt: now,
      nextReviewAt,
      reps: currentReps + 1,
      lapses: currentLapses
    };
  } else {
    // Drop mastery by 1, minimum 0. Schedule immediate review tomorrow (1 day)
    const newMastery = Math.max(0, currentMastery - 1);
    const intervalDays = 1; // repeat tomorrow
    const nextReviewAt = now + ONE_DAY_MS;

    return {
      placeKey: `${topicId}|${placeName}`,
      topicId,
      placeName,
      mastery: newMastery,
      intervalDays,
      lastReviewedAt: now,
      nextReviewAt,
      reps: currentReps + 1,
      lapses: currentLapses + 1
    };
  }
}

/**
 * Returns all places that are currently due for review or struggle items
 */
export function getDuePlaces(
  srsRecords: Record<string, SRSRecord>,
  topics: Topic[],
  now: number = Date.now()
): { topic: Topic; place: Place; record?: SRSRecord; overdueDays: number; priority: number }[] {
  const dueList: { topic: Topic; place: Place; record?: SRSRecord; overdueDays: number; priority: number }[] = [];

  for (const topic of topics) {
    for (const place of topic.places) {
      const key = `${topic.id}|${place.name}`;
      const record = srsRecords[key];

      if (record) {
        // Checked place: is it due?
        if (record.nextReviewAt <= now) {
          const overdueDays = Math.max(0, Math.floor((now - record.nextReviewAt) / ONE_DAY_MS));
          // Priority higher for lower mastery and more days overdue
          const priority = (6 - record.mastery) * 10 + overdueDays * 2 + record.lapses * 3;
          dueList.push({ topic, place, record, overdueDays, priority });
        }
      } else {
        // Unseen place - low default priority so tested items get revised first
        // unless total due items is small
      }
    }
  }

  // Sort by highest priority first (most overdue & most struggled with)
  dueList.sort((a, b) => b.priority - a.priority);
  return dueList;
}

/**
 * Generates an SRS Review Quiz specifically pulling from places due for review
 */
export function generateSRSReviewQuiz(
  duePlaces: { topic: Topic; place: Place; record?: SRSRecord }[],
  topics: Topic[],
  length: number = 10
): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const picked = duePlaces.slice(0, length);

  for (const item of picked) {
    const { topic, place } = item;
    // Mix question types based on weakness: TAP_MAP, IDENTIFY, STATE_MCQ, CLUE
    const types: ('TAP_MAP' | 'IDENTIFY' | 'STATE_MCQ' | 'CLUE')[] = ['TAP_MAP', 'IDENTIFY'];
    if (place.state.trim().length > 0) types.push('STATE_MCQ');
    if (place.fact.length > 20) types.push('CLUE');

    const chosenType = types[Math.floor(Math.random() * types.length)];

    if (chosenType === 'TAP_MAP') {
      questions.push({
        type: 'TAP_MAP',
        topicId: topic.id,
        topicTitle: topic.title,
        prompt: `[SRS Due Review] Tap the location of ${place.name} on the map.`,
        targetPlace: place,
        explanation: `${place.name} (${place.state || 'Offshore'}). ${place.fact}`
      });
    } else if (chosenType === 'IDENTIFY') {
      const distractors = topic.places
        .filter((p) => p.name !== place.name)
        .map((p) => ({
          name: p.name,
          dist: haversineDistanceKm(place.lat, place.lon, p.lat, p.lon)
        }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 3)
        .map((d) => d.name);

      const opts = shuffle([...distractors, place.name]);
      questions.push({
        type: 'IDENTIFY',
        topicId: topic.id,
        topicTitle: topic.title,
        prompt: `[SRS Due Review] Identify the ${topic.noun} highlighted by the marker.`,
        targetPlace: place,
        options: opts,
        correctOptionIndex: opts.indexOf(place.name),
        explanation: `${place.name}: ${place.fact}`
      });
    } else if (chosenType === 'STATE_MCQ') {
      const targetState = place.state;
      const centroid = STATE_CENTROIDS[targetState] || [place.lat, place.lon];
      const candidates = Object.keys(STATE_CENTROIDS)
        .filter((s) => s !== targetState && !EXCLUDED_DISTRACTOR_UTS.has(s))
        .map((s) => ({
          name: s,
          dist: haversineDistanceKm(centroid[0], centroid[1], STATE_CENTROIDS[s][0], STATE_CENTROIDS[s][1])
        }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 8);

      const pickedDists = shuffle(candidates).slice(0, 3).map((c) => c.name);
      const opts = shuffle([...pickedDists, targetState]);

      questions.push({
        type: 'STATE_MCQ',
        topicId: topic.id,
        topicTitle: topic.title,
        prompt: `[SRS Due Review] In which State/UT is ${place.name} situated?`,
        targetPlace: place,
        options: opts,
        correctOptionIndex: opts.indexOf(targetState),
        explanation: `${place.name} is in ${targetState}. ${place.fact}`
      });
    } else {
      const masked = maskPlaceNameInText(place.fact, place.name);
      const dists = shuffle(topic.places.filter((p) => p.name !== place.name)).slice(0, 3).map((p) => p.name);
      const opts = shuffle([...dists, place.name]);

      questions.push({
        type: 'CLUE',
        topicId: topic.id,
        topicTitle: topic.title,
        prompt: `[SRS Due Review] Which ${topic.noun} matches this UPSC exam clue?`,
        targetPlace: place,
        options: opts,
        correctOptionIndex: opts.indexOf(place.name),
        clueText: masked,
        explanation: `${place.name}: ${place.fact}`
      });
    }
  }

  return shuffle(questions);
}

/**
 * Updates streak, computes XP and unlocks eligible badges
 */
export function processRewardsAfterQuiz(
  currentRewards: UserRewards,
  sessionResults: { isCorrect: boolean }[],
  totalCorrectAllTime: number,
  srsRecords: Record<string, SRSRecord>,
  topics: Topic[],
  now: number = Date.now(),
  hintPenalty: number = 0
): {
  updatedRewards: UserRewards;
  newlyUnlockedBadges: Badge[];
  xpEarned: number;
} {
  const todayStr = new Date(now).toISOString().split('T')[0];
  const lastActiveStr = currentRewards.lastActiveDate;

  // Streak logic
  let newStreak = currentRewards.streakDays;
  if (!lastActiveStr) {
    newStreak = 1;
  } else if (lastActiveStr === todayStr) {
    // already active today, keep streak
  } else {
    const yesterday = new Date(now - ONE_DAY_MS).toISOString().split('T')[0];
    if (lastActiveStr === yesterday) {
      newStreak += 1;
    } else {
      newStreak = 1; // broken streak
    }
  }

  // XP calculation
  const sessionCorrect = sessionResults.filter((r) => r.isCorrect).length;
  let xpEarned = sessionCorrect * 15; // +15 XP per correct answer
  if (sessionResults.length >= 5) xpEarned += 50; // +50 XP completion bonus
  if (sessionCorrect === sessionResults.length && sessionResults.length >= 10) xpEarned += 100; // Perfect score bonus
  xpEarned = Math.max(0, xpEarned - hintPenalty); // Deduct hint penalty (min 0)

  const newTotalXp = currentRewards.xp + xpEarned;

  // Badge progress checks
  const updatedBadgeRecords = { ...currentRewards.badges };
  const newlyUnlocked: Badge[] = [];

  // Helper to test and update badge
  function evaluateBadge(
    id: string,
    currentProgressVal: number
  ) {
    const catalogItem = BADGES_CATALOG.find((b) => b.id === id);
    if (!catalogItem) return;

    const existing = updatedBadgeRecords[id] || { unlocked: false, progress: 0 };
    const progress = Math.min(catalogItem.maxProgress, Math.max(existing.progress, currentProgressVal));
    const wasUnlocked = existing.unlocked;
    const isNowUnlocked = progress >= catalogItem.maxProgress;

    updatedBadgeRecords[id] = {
      unlocked: wasUnlocked || isNowUnlocked,
      unlockedAt: wasUnlocked ? existing.unlockedAt : isNowUnlocked ? now : undefined,
      progress
    };

    if (!wasUnlocked && isNowUnlocked) {
      newlyUnlocked.push({
        ...catalogItem,
        unlocked: true,
        unlockedAt: now,
        progress: catalogItem.maxProgress
      });
    }
  }

  // 1. First quiz badge
  evaluateBadge('first_quiz', 1);

  // 2. Streaks
  evaluateBadge('streak_3', newStreak);
  evaluateBadge('streak_7', newStreak);

  // 3. Century hits
  evaluateBadge('century_hits', totalCorrectAllTime + sessionCorrect);

  // 4. Flawless quiz
  if (sessionCorrect === sessionResults.length && sessionResults.length >= 10) {
    evaluateBadge('flawless_quiz', 1);
  }

  // 5. Total SRS Reviews cleared
  const totalReps = Object.values(srsRecords).reduce((acc, r) => acc + (r.reps || 0), 0);
  evaluateBadge('srs_cleared_10', totalReps);

  // 6. Topic specific masteries (places with mastery >= 3)
  const countMasteredInTopic = (topicId: string, minMastery: number = 3) => {
    return Object.values(srsRecords).filter((r) => r.topicId === topicId && r.mastery >= minMastery).length;
  };

  evaluateBadge('tiger_guardian', countMasteredInTopic('national_parks', 3));
  evaluateBadge('port_captain', countMasteredInTopic('major_ports', 3));
  evaluateBadge('himalayan_climber', countMasteredInTopic('mountain_passes', 3) + countMasteredInTopic('mountain_peaks', 3));
  evaluateBadge('heritage_custodian', countMasteredInTopic('unesco_heritage', 3));

  // 7. Grandmaster (mastery 5 in 25 places)
  const totalMastery5 = Object.values(srsRecords).filter((r) => r.mastery >= 5).length;
  evaluateBadge('grandmaster_25', totalMastery5);

  return {
    updatedRewards: {
      xp: newTotalXp,
      streakDays: newStreak,
      lastActiveDate: todayStr,
      badges: updatedBadgeRecords
    },
    newlyUnlockedBadges: newlyUnlocked,
    xpEarned
  };
}
