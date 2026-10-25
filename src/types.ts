export interface StateBoundary {
  name: string;
  rings: [number, number][][]; // [lon, lat] pairs
}

export interface Place {
  name: string;
  lat: number;
  lon: number;
  state: string;
  category: string;
  fact: string;
}

export interface FactQuestion {
  question: string;
  correct: string;
  wrong: string[];
  explanation: string;
}

export interface Topic {
  id: string;
  title: string;
  emoji: string;
  color: string;
  syllabus: string;
  noun: string;
  blurb: string;
  categories: string[];
  places: Place[];
  questions: FactQuestion[];
}

export type QuestionType =
  | 'TAP_MAP'
  | 'IDENTIFY'
  | 'STATE_MCQ'
  | 'CATEGORY'
  | 'CLUE'
  | 'FACT';

export type QuizMode = 'MIXED' | 'MAP_ONLY' | 'QUESTIONS_ONLY' | 'SRS_DUE';

export interface QuizQuestion {
  type: QuestionType;
  topicId: string;
  topicTitle: string;
  prompt: string;
  targetPlace?: Place;
  options?: string[];
  correctOptionIndex?: number;
  explanation: string;
  clueText?: string;
  handwrittenQuestion?: FactQuestion;
}

export interface QuizResultItem {
  question: QuizQuestion;
  userOptionIndex?: number;
  userTapLat?: number;
  userTapLon?: number;
  isCorrect: boolean;
  distanceKm?: number;
  hintsUsed?: number;
  hintPenalty?: number;
}

export interface SRSRecord {
  placeKey: string; // "topicId|placeName"
  topicId: string;
  placeName: string;
  mastery: number; // 0..5
  intervalDays: number;
  lastReviewedAt: number; // timestamp ms
  nextReviewAt: number; // timestamp ms
  reps: number;
  lapses: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: 'mastery' | 'streak' | 'topic' | 'speed';
  unlocked: boolean;
  unlockedAt?: number;
  progress: number;
  maxProgress: number;
}

export interface AspirantRank {
  name: string;
  minXp: number;
  title: string;
  badgeEmoji: string;
  color: string;
}

export interface UserRewards {
  xp: number;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  badges: Record<string, { unlocked: boolean; unlockedAt?: number; progress: number }>;
}

export interface UPSCCoalStage {
  stage: string;
  carbon: string;
  moisture: string;
  calorific: string;
  notes: string;
  places: string;
}

export interface UPSCGeologicalEpoch {
  name: string;
  share: string;
  agePeriod: string;
  riftBasins: string[];
  characteristics: string;
  distribution: string;
}

export interface UPSCWhyFoundThere {
  title: string;
  geologicalContext: string;
  tectonicProcess: string;
}

export interface UPSCIndiaStanding {
  reservesRank: string;
  reservesFigure: string;
  productionRank: string;
  productionFigure: string;
  importVolume: string;
  importRationale: {
    coking: string;
    thermal: string;
  };
  sourceCountries: string[];
  exportFootprint: string;
}

export interface UPSCEconomicLinkage {
  sector: string;
  sharePct: string;
  role: string;
  forwardBackwardLinkage: string;
}

export interface UPSCReformPolicy {
  actPolicy: string;
  year: string;
  keyProvision: string;
  impact: string;
}

export interface UPSCEnvironmentalIssue {
  topic: string;
  details: string;
  governmentInitiative: string;
}

export interface UPSCPrelimsTrap {
  statement: string;
  isTrue: boolean;
  trapReason: string;
  prelimsTip: string;
}

export interface UPSCTopicTheory {
  topicId: string;
  conceptTitle: string;
  tagline: string;
  definition: string;
  coalificationStages?: UPSCCoalStage[];
  geologicalEpochs?: UPSCGeologicalEpoch[];
  whyFoundThere: UPSCWhyFoundThere[];
  indiaStanding: UPSCIndiaStanding;
  economicAndIndustrialUses: UPSCEconomicLinkage[];
  reformsAndPolicy: UPSCReformPolicy[];
  environmentalIssues: UPSCEnvironmentalIssue[];
  prelimsTraps: UPSCPrelimsTrap[];
}

export interface UPSCPlaceDossier {
  placeName: string;
  topicId: string;
  state: string;
  lat: number;
  lon: number;
  category: string;
  geologicalBasin: string;
  whoAmIRiddle: string;
  hint1: string; // Geological / Basin clue (-25 pts)
  hint2: string; // Administrative / Landmark / UPSC specific clue (-50 pts)
  fact1Core: string; // Unlocked on correct guess
  fact2MapSpatial: string; // Unlocked on map locate
  fact3MainsAdvanced: string; // Unlocked on clicking Mains analysis
  upscRelevanceTag: string;
  distractors: string[]; // 3 other place names
}

