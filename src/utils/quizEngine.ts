import { FactQuestion, Place, QuestionType, QuizMode, QuizQuestion, Topic } from '../types';

export const STATE_CENTROIDS: Record<string, [number, number]> = {
  'Andhra Pradesh': [15.91, 79.74],
  'Arunachal Pradesh': [28.21, 94.72],
  Assam: [26.20, 92.93],
  Bihar: [25.09, 85.31],
  Chhattisgarh: [21.27, 81.86],
  Goa: [15.29, 74.12],
  Gujarat: [22.25, 71.19],
  Haryana: [29.05, 76.08],
  'Himachal Pradesh': [31.10, 77.17],
  Jharkhand: [23.61, 85.27],
  Karnataka: [15.31, 75.71],
  Kerala: [10.85, 76.27],
  'Madhya Pradesh': [22.97, 78.65],
  Maharashtra: [19.75, 75.71],
  Manipur: [24.66, 93.90],
  Meghalaya: [25.46, 91.36],
  Mizoram: [23.16, 92.93],
  Nagaland: [26.15, 94.56],
  Odisha: [20.95, 85.09],
  Punjab: [31.14, 75.34],
  Rajasthan: [27.02, 74.21],
  Sikkim: [27.53, 88.51],
  'Tamil Nadu': [11.12, 78.65],
  Telangana: [18.11, 79.01],
  Tripura: [23.94, 91.98],
  'Uttar Pradesh': [26.84, 80.94],
  Uttarakhand: [30.06, 79.01],
  'West Bengal': [22.98, 87.85],
  'Jammu & Kashmir': [33.77, 74.52],
  Ladakh: [34.15, 77.57],
  Delhi: [28.70, 77.10],
  'Andaman & Nicobar Islands': [11.74, 92.65],
  Puducherry: [11.94, 79.80]
};

export const EXCLUDED_DISTRACTOR_UTS = new Set([
  'Chandigarh',
  'Dadra & Nagar Haveli',
  'Daman & Diu',
  'Lakshadweep',
  'Delhi',
  'Puducherry'
]);

export function haversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const r = 6371.0;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.asin(Math.sqrt(a));
  return r * c;
}

export function maskPlaceNameInText(text: string, placeName: string): string {
  let result = text;
  const tokens = [placeName];
  if (placeName.includes('(') && placeName.includes(')')) {
    const main = placeName.split('(')[0].trim();
    const sub = placeName.split('(')[1].split(')')[0].trim();
    if (main.length >= 3) tokens.push(main);
    if (sub.length >= 3) tokens.push(sub);
  }

  for (const token of tokens) {
    if (token.length >= 3) {
      const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
      result = result.replace(regex, '________');
    }
  }
  return result;
}

export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateQuiz(
  topic: Topic,
  length: number = 10,
  mode: QuizMode = 'MIXED',
  masteryMap: Record<string, number> = {}
): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const targetCount = Math.min(length, topic.places.length + topic.questions.length);
  if (targetCount <= 0) return [];

  const factBudget =
    mode === 'MAP_ONLY'
      ? 0
      : mode === 'QUESTIONS_ONLY'
      ? Math.min(Math.floor(targetCount * 0.35), topic.questions.length)
      : Math.min(Math.floor(targetCount * 0.25), topic.questions.length);

  const shuffledFacts = shuffle(topic.questions).slice(0, factBudget);
  for (const fq of shuffledFacts) {
    const opts = shuffle([...fq.wrong, fq.correct]);
    questions.push({
      type: 'FACT',
      topicId: topic.id,
      topicTitle: topic.title,
      prompt: fq.question,
      options: opts,
      correctOptionIndex: opts.indexOf(fq.correct),
      explanation: fq.explanation,
      handwrittenQuestion: fq
    });
  }

  const remainingCount = Math.max(0, targetCount - questions.length);
  if (remainingCount <= 0) return shuffle(questions);

  // Weighted selection of places by (6 - mastery)
  const placesWithWeight = topic.places.map((place) => {
    const key = `${topic.id}|${place.name}`;
    const mastery = Math.max(0, Math.min(5, masteryMap[key] || 0));
    const weight = 6 - mastery;
    const u = Math.max(1e-9, Math.random());
    const score = Math.pow(u, 1.0 / weight);
    return { place, score };
  });

  placesWithWeight.sort((a, b) => b.score - a.score);
  const selectedPlaces = placesWithWeight.slice(0, remainingCount).map((p) => p.place);

  const allowedTypes: QuestionType[] =
    mode === 'MAP_ONLY'
      ? ['TAP_MAP', 'IDENTIFY']
      : mode === 'QUESTIONS_ONLY'
      ? ['STATE_MCQ', 'CATEGORY', 'CLUE']
      : ['TAP_MAP', 'IDENTIFY', 'STATE_MCQ', 'CATEGORY', 'CLUE'];

  for (const place of selectedPlaces) {
    const candidates = allowedTypes.filter((t) => {
      if (t === 'STATE_MCQ') return place.state.trim().length > 0;
      if (t === 'CATEGORY') return topic.categories.length > 1;
      return true;
    });

    const chosenType = candidates.length > 0 ? candidates[Math.floor(Math.random() * candidates.length)] : 'TAP_MAP';

    if (chosenType === 'TAP_MAP') {
      questions.push({
        type: 'TAP_MAP',
        topicId: topic.id,
        topicTitle: topic.title,
        prompt: `Tap the location of ${place.name} on the map.`,
        targetPlace: place,
        explanation: `${place.name} is in ${place.state || 'offshore/boundary region'}. ${place.fact}`
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
        prompt: `Identify the ${topic.noun} highlighted with the marker on the map.`,
        targetPlace: place,
        options: opts,
        correctOptionIndex: opts.indexOf(place.name),
        explanation: `${place.name}: ${place.fact}`
      });
    } else if (chosenType === 'STATE_MCQ') {
      const targetState = place.state;
      const centroid = STATE_CENTROIDS[targetState] || [place.lat, place.lon];

      const candidates = Object.keys(STATE_CENTROIDS)
        .filter((s) => s !== targetState)
        .filter((s) => !(targetState === 'Jammu & Kashmir' && s === 'Ladakh'))
        .filter((s) => !(targetState === 'Ladakh' && s === 'Jammu & Kashmir'))
        .filter((s) => !EXCLUDED_DISTRACTOR_UTS.has(s) || s === targetState)
        .map((s) => {
          const c = STATE_CENTROIDS[s];
          return {
            name: s,
            dist: haversineDistanceKm(centroid[0], centroid[1], c[0], c[1])
          };
        })
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 8);

      const pickedDistractors = shuffle(candidates)
        .slice(0, 3)
        .map((c) => c.name);
      const opts = shuffle([...pickedDistractors, targetState]);

      questions.push({
        type: 'STATE_MCQ',
        topicId: topic.id,
        topicTitle: topic.title,
        prompt: `In which State or Union Territory is ${place.name} located?`,
        targetPlace: place,
        options: opts,
        correctOptionIndex: opts.indexOf(targetState),
        explanation: `${place.name} is situated in ${targetState}. ${place.fact}`
      });
    } else if (chosenType === 'CATEGORY') {
      const otherCats = topic.categories.filter((c) => c !== place.category);
      const dists = shuffle(otherCats).slice(0, 3);
      const opts = shuffle([...dists, place.category]);

      questions.push({
        type: 'CATEGORY',
        topicId: topic.id,
        topicTitle: topic.title,
        prompt: `Which category or classification does ${place.name} belong to?`,
        targetPlace: place,
        options: opts,
        correctOptionIndex: opts.indexOf(place.category),
        explanation: `${place.name} is classified as '${place.category}'. ${place.fact}`
      });
    } else if (chosenType === 'CLUE') {
      const masked = maskPlaceNameInText(place.fact, place.name);
      const distractors = shuffle(topic.places.filter((p) => p.name !== place.name))
        .slice(0, 3)
        .map((p) => p.name);
      const opts = shuffle([...distractors, place.name]);

      questions.push({
        type: 'CLUE',
        topicId: topic.id,
        topicTitle: topic.title,
        prompt: `Which ${topic.noun} matches this UPSC exam fact?`,
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

export function generateStateQuiz(
  stateName: string,
  currentTopic: Topic,
  allTopics: Topic[] = [],
  length: number = 10,
  mode: QuizMode = 'MIXED',
  masteryMap: Record<string, number> = {}
): QuizQuestion[] {
  const isMatch = (s: string) => {
    if (!s) return false;
    if (s.toLowerCase() === stateName.toLowerCase()) return true;
    if (
      (stateName === 'Jammu & Kashmir' || stateName === 'Ladakh') &&
      (s === 'Jammu & Kashmir' || s === 'Ladakh')
    ) {
      return true;
    }
    return false;
  };

  const targetStatePlaces: { place: Place; topic: Topic }[] = [];

  // Primary: current topic places in this state
  currentTopic.places.forEach((p) => {
    if (isMatch(p.state)) {
      targetStatePlaces.push({ place: p, topic: currentTopic });
    }
  });

  // Supplement from all other topics if needed to reach target length
  if (targetStatePlaces.length < length && allTopics.length > 0) {
    allTopics.forEach((t) => {
      if (t.id === currentTopic.id) return;
      t.places.forEach((p) => {
        if (isMatch(p.state) && !targetStatePlaces.some((item) => item.place.name === p.name)) {
          targetStatePlaces.push({ place: p, topic: t });
        }
      });
    });
  }

  if (targetStatePlaces.length === 0) {
    return generateQuiz(currentTopic, length, mode, masteryMap);
  }

  const selected = shuffle(targetStatePlaces).slice(0, length);
  const questions: QuizQuestion[] = [];

  const allowedTypes: QuestionType[] =
    mode === 'MAP_ONLY'
      ? ['TAP_MAP', 'IDENTIFY']
      : mode === 'QUESTIONS_ONLY'
      ? ['CATEGORY', 'CLUE', 'STATE_MCQ']
      : ['TAP_MAP', 'IDENTIFY', 'CATEGORY', 'CLUE', 'STATE_MCQ'];

  for (const item of selected) {
    const { place, topic } = item;
    const type = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];

    if (type === 'TAP_MAP') {
      questions.push({
        type: 'TAP_MAP',
        topicId: topic.id,
        topicTitle: `${topic.title} · ${stateName}`,
        prompt: `Tap the location of ${place.name} in ${stateName}.`,
        targetPlace: place,
        explanation: `${place.name} is in ${place.state || stateName}. ${place.fact}`
      });
    } else if (type === 'IDENTIFY') {
      const distractors = topic.places
        .filter((p) => p.name !== place.name)
        .slice(0, 3)
        .map((p) => p.name);

      while (distractors.length < 3 && selected.length > distractors.length + 1) {
        const other = selected.find(
          (s) => s.place.name !== place.name && !distractors.includes(s.place.name)
        );
        if (other) distractors.push(other.place.name);
        else break;
      }
      const opts = shuffle([...distractors, place.name]);
      questions.push({
        type: 'IDENTIFY',
        topicId: topic.id,
        topicTitle: `${topic.title} · ${stateName}`,
        prompt: `Identify this ${topic.noun} located in ${stateName}.`,
        targetPlace: place,
        options: opts,
        correctOptionIndex: opts.indexOf(place.name),
        explanation: `${place.name} (${stateName}): ${place.fact}`
      });
    } else if (type === 'CLUE') {
      const masked = maskPlaceNameInText(place.fact, place.name);
      const distractors = shuffle(
        selected.filter((s) => s.place.name !== place.name).map((s) => s.place.name)
      ).slice(0, 3);
      const opts = shuffle([...distractors, place.name]);
      questions.push({
        type: 'CLUE',
        topicId: topic.id,
        topicTitle: `${topic.title} · ${stateName}`,
        prompt: `Which location in ${stateName} matches this UPSC prelims fact?`,
        targetPlace: place,
        options: opts,
        correctOptionIndex: opts.indexOf(place.name),
        clueText: masked,
        explanation: `${place.name}: ${place.fact}`
      });
    } else {
      const otherCats = topic.categories.filter((c) => c !== place.category);
      const dists = shuffle(otherCats).slice(0, 3);
      const opts = shuffle([...dists, place.category]);
      questions.push({
        type: 'CATEGORY',
        topicId: topic.id,
        topicTitle: `${topic.title} · ${stateName}`,
        prompt: `Which category does ${place.name} in ${stateName} belong to?`,
        targetPlace: place,
        options: opts,
        correctOptionIndex: opts.indexOf(place.category),
        explanation: `${place.name} is classified as '${place.category}'. ${place.fact}`
      });
    }
  }

  return shuffle(questions);
}

