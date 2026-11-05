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

export interface DeepWorkSessionRecord {
  id: string;
  date: string; // YYYY-MM-DD
  durationMinutes: number;
  moduleName: string;
  completedAt: number;
  mode: 'POMODORO_25' | 'PRELIMS_45' | 'MAINS_60' | 'CUSTOM' | 'OPEN';
  notes?: string;
}

export interface DailyFocusStats {
  date: string;
  totalMinutes: number;
  targetMinutes: number;
  sessionsCompleted: number;
  modulesStudied: Record<string, number>; // moduleName -> minutes
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

export type PYQTheme =
  | 'ALL'
  | 'RIVERS_DRAINAGE'
  | 'RIVERS_BASINS'
  | 'PROTECTED_AREAS'
  | 'ECOLOGY_PROTECTED'
  | 'FORESTS_WILDLIFE'
  | 'MINERALS_ENERGY'
  | 'MOUNTAINS_PASSES'
  | 'GLACIERS_PEAKS'
  | 'PORTS_INFRA'
  | 'PLACES_IN_NEWS'
  | 'ISLANDS_COASTAL'
  | 'OCEANS_COASTS'
  | 'AGRICULTURE_SOILS'
  | 'PHYSICAL_GEOLOGY';

export interface PYQCoordinate {
  placeName: string;
  state: string;
  lat: number;
  lon: number;
  topicId?: string;
  note?: string;
}

export interface UPSCPYQuestion {
  id: string;
  year: number;
  exam: 'Civil Services Prelims' | 'CDS' | 'CAPF';
  theme: PYQTheme;
  themeLabel: string;
  questionText: string;
  statements?: string[];
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  officialKeyNote: string;
  eliminationTechnique: string;
  detailedExplanation: string;
  prelimsTrapAlert: string;
  difficulty:
    | 'Direct Recall'
    | 'Standard Prelims'
    | 'High-Difficulty Trap'
    | 'Challenging'
    | 'Challenging Prelims'
    | 'Moderate Prelims'
    | 'High-Yield Prelims'
    | 'Fundamental Prelims';
  associatedCoordinates: PYQCoordinate[];
}

export interface ExamSimulationResult {
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  grossMarks: number;
  negativePenalty: number;
  netScore: number;
  maxScore: number;
  accuracyRate: number;
  estimatedPercentile: number;
  themeBreakdown: Record<string, { total: number; correct: number; incorrect: number }>;
  timeSpentSeconds: number;
}

export interface MainsDiagramTemplate {
  id: string;
  title: string;
  paper: 'GS Paper 1' | 'GS Paper 3' | 'GS Paper 1 & 3';
  theme: string;
  difficulty:
    | 'Beginner (30s Outline)'
    | 'Easy (1 min)'
    | 'Intermediate (1 min)'
    | 'Intermediate (1.5 mins)'
    | 'Advanced (2 mins)';
  prompt: string;
  recommendedTimeSeconds: number;
  keyChecklistItems: string[];
  modelDiagramDescription: string;
  referencePoints: { name: string; x: number; y: number; label: string }[];
}

export interface MainsModelAnswer {
  id: string;
  year: number;
  paper: 'GS Paper 1' | 'GS Paper 3' | 'GS Paper 1 & 3';
  topicTheme: string;
  question: string;
  wordLimit: 150 | 250;
  marks: 10 | 15;
  introduction: string;
  coreBodyPoints: {
    heading: string;
    points: string[];
  }[];
  mapDiagramStrategy: string;
  associatedCoordinates: PYQCoordinate[];
  governmentSchemesAndPolicies: string[];
  conclusion: string;
  syllabusKeywords: string[];
}

export interface GeomorphologicalProvince {
  id: string;
  name: string;
  division: 'Peninsular Plateau' | 'Himalayan Mountain System' | 'Indo-Gangetic Plain' | 'Coastal Plains' | 'Islands' | 'Great Indian Desert';
  geologicalAge: string;
  rockSystems: string[];
  subDivisions: string[];
  highestPeak?: { name: string; elevationMeters: number; lat: number; lon: number };
  majorDrainageBasins: string[];
  economicMinerals: string[];
  prelimsHighYieldFacts: string[];
  mainsSignificance: string;
}

