import React, { useState, useMemo } from 'react';
import { Place, QuizMode, StateBoundary, Topic } from '../types';
import { IndiaMapSvg, MapLayerConfig } from './IndiaMapSvg';
import { IndiaMapCanvas, WebMapMarker } from './IndiaMapCanvas';
import { STATE_CENTROIDS } from '../utils/quizEngine';
import { TeachingModeView } from './TeachingModeView';
import { DetectiveQuizMode } from './DetectiveQuizMode';
import { PlaceDetailModal } from './PlaceDetailModal';
import { DeepDiveQuizModal } from './DeepDiveQuizModal';
import { getComprehensivePlaceDossier } from '../data/comprehensivePlaceDossiers';
import {
  ArrowLeft,
  GraduationCap,
  X,
  MapPin,
  Play,
  Search,
  List,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  Tag,
  Building2,
  Layers,
  Sparkles,
  HelpCircle,
  ExternalLink,
  BookOpen,
  Check,
  Eye,
  Activity,
  Lightbulb
} from 'lucide-react';

interface TopicMapScreenProps {
  topic: Topic;
  states: StateBoundary[];
  masteryMap?: Record<string, number>;
  onBack: () => void;
  onStartQuiz: (topic: Topic, mode: QuizMode, length: number) => void;
  onStartStateQuiz?: (stateName: string, topic: Topic, mode: QuizMode, length: number) => void;
  onRecordDetectiveResult?: (placeKey: string, isCorrect: boolean, score: number) => void;
  allTopics?: Topic[];
  onSelectTopic?: (t: Topic) => void;
  initialMode?: 'MAP' | 'TEACHING' | 'DETECTIVE';
  initialPlace?: Place | null;
  onEarnXpBonus?: (amount?: number) => void;
  onOpenDidYouKnow?: () => void;
}

const CATEGORY_COLORS = [
  '#E07A3F',
  '#2E7D32',
  '#1976D2',
  '#7B1FA2',
  '#C2185B',
  '#D97706',
  '#00796B',
  '#4E342E'
];

export const TopicMapScreen: React.FC<TopicMapScreenProps> = ({
  topic,
  states,
  masteryMap = {},
  onBack,
  onStartQuiz,
  onStartStateQuiz,
  onRecordDetectiveResult,
  allTopics = [],
  onSelectTopic,
  initialMode = 'MAP',
  initialPlace = null,
  onEarnXpBonus,
  onOpenDidYouKnow
}) => {
  // Screen Mode: 'MAP' (interactive map) | 'TEACHING' (deep UPSC syllabus dossier) | 'DETECTIVE' (Guess Who Am I? quiz)
  const [screenMode, setScreenMode] = useState<'MAP' | 'TEACHING' | 'DETECTIVE'>(initialMode);
  const [detectiveTargetPlace, setDetectiveTargetPlace] = useState<string | null>(initialPlace ? initialPlace.name : null);

  // Renderer Toggle: default is SVG interactive vector map
  const [renderMode, setRenderMode] = useState<'svg' | 'canvas'>('svg');

  // Filter & Selection State
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [masteryFilter, setMasteryFilter] = useState<'ALL' | 'MASTERED' | 'LEARNING' | 'WEAK'>('ALL');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(initialPlace);
  const [selectedStateName, setSelectedStateName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showListDrawer, setShowListDrawer] = useState<boolean>(false);
  const [showAllLabels, setShowAllLabels] = useState<boolean>(false);
  const [showDeepDossierModal, setShowDeepDossierModal] = useState<boolean>(false);
  const [isCardCollapsed, setIsCardCollapsed] = useState<boolean>(false);
  const [mapLayers, setMapLayers] = useState<MapLayerConfig>({
    showRivers: false,
    showCoalFields: false,
    showPhysical: false,
    showPolitical: true,
    showInfrastructure: false
  });
  const [showLayerMenu, setShowLayerMenu] = useState<boolean>(false);

  // Quiz Modal State
  const [showTopicQuizModal, setShowTopicQuizModal] = useState<boolean>(false);
  const [showStateQuizModal, setShowStateQuizModal] = useState<boolean>(false);
  const [showDeepDiveQuizModal, setShowDeepDiveQuizModal] = useState<boolean>(false);
  const [quizLength, setQuizLength] = useState<number>(10);
  const [quizMode, setQuizMode] = useState<QuizMode>('MIXED');

  // Topic mastery stats
  const topicMasteryStats = useMemo(() => {
    let mastered = 0;
    let learning = 0;
    let weak = 0;
    topic.places.forEach((p) => {
      const key = `${topic.id}|${p.name}`;
      const m = masteryMap[key] || 0;
      if (m >= 4) mastered++;
      else if (m >= 2) learning++;
      else weak++;
    });
    const total = topic.places.length || 1;
    return {
      mastered,
      learning,
      weak,
      total,
      masteredPct: Math.round((mastered / total) * 100),
      learningPct: Math.round((learning / total) * 100),
      weakPct: Math.round((weak / total) * 100)
    };
  }, [topic, masteryMap]);

  // Category Color Map
  const categoryColorMap = useMemo(() => {
    const map: Record<string, string> = {};
    topic.categories.forEach((cat, idx) => {
      map[cat] = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
    });
    return map;
  }, [topic]);

  // Filter places based on active category, search query, or state filter
  const visiblePlaces = useMemo(() => {
    return topic.places.filter((p) => {
      const matchCat = !selectedCategory || p.category === selectedCategory;
      const matchSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fact.toLowerCase().includes(searchQuery.toLowerCase());

      const key = `${topic.id}|${p.name}`;
      const mastery = masteryMap[key] || 0;
      let matchMastery = true;
      if (masteryFilter === 'MASTERED') matchMastery = mastery >= 4;
      else if (masteryFilter === 'LEARNING') matchMastery = mastery >= 2 && mastery < 4;
      else if (masteryFilter === 'WEAK') matchMastery = mastery < 2;

      return matchCat && matchSearch && matchMastery;
    });
  }, [topic.places, selectedCategory, searchQuery, masteryFilter, masteryMap, topic.id]);

  // Markers for the map
  const markers: WebMapMarker[] = useMemo(() => {
    return visiblePlaces.map((p) => {
      const isSelected = selectedPlace?.name === p.name;
      return {
        id: p.name,
        lat: p.lat,
        lon: p.lon,
        label: p.name,
        color: categoryColorMap[p.category] || '#E07A3F',
        isSelected,
        hasPulseRing: isSelected,
        category: p.category,
        state: p.state
      };
    });
  }, [visiblePlaces, selectedPlace, categoryColorMap]);

  // Set of states to highlight on the map
  const highlightStates = useMemo(() => {
    const set = new Set<string>();
    if (selectedStateName) {
      set.add(selectedStateName);
    }
    if (selectedPlace?.state) {
      set.add(selectedPlace.state);
    }
    return set;
  }, [selectedStateName, selectedPlace]);

  // Smooth camera centering
  const cameraFocus = useMemo(() => {
    if (selectedPlace) {
      return { lat: selectedPlace.lat, lon: selectedPlace.lon, zoom: 3.5 };
    }
    if (selectedStateName) {
      const centroid = STATE_CENTROIDS[selectedStateName];
      if (centroid) {
        return { lat: centroid[0], lon: centroid[1], zoom: 2.8 };
      }
    }
    return null;
  }, [selectedPlace, selectedStateName]);

  // Places belonging to the currently selected state
  const statePlacesInTopic = useMemo(() => {
    if (!selectedStateName) return [];
    return topic.places.filter(
      (p) =>
        p.state.toLowerCase() === selectedStateName.toLowerCase() ||
        ((selectedStateName === 'Jammu & Kashmir' || selectedStateName === 'Ladakh') &&
          (p.state === 'Jammu & Kashmir' || p.state === 'Ladakh'))
    );
  }, [selectedStateName, topic.places]);

  // All places across all 16 topics in this state (for comprehensive state learning)
  const allStatePlaces = useMemo(() => {
    if (!selectedStateName || allTopics.length === 0) return [];
    const list: { place: Place; topicTitle: string; topicEmoji: string }[] = [];
    allTopics.forEach((t) => {
      t.places.forEach((p) => {
        if (
          p.state.toLowerCase() === selectedStateName.toLowerCase() ||
          ((selectedStateName === 'Jammu & Kashmir' || selectedStateName === 'Ladakh') &&
            (p.state === 'Jammu & Kashmir' || p.state === 'Ladakh'))
        ) {
          list.push({ place: p, topicTitle: t.title, topicEmoji: t.emoji });
        }
      });
    });
    return list;
  }, [selectedStateName, allTopics]);

  // Search results for live auto-complete dropdown across all topics & states
  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query || query.length < 2) return { places: [], states: [] };

    const matchingPlaces: { place: Place; topicTitle: string; topicEmoji: string; topicId: string }[] = [];
    const seenNames = new Set<string>();

    // 1. Current topic places first
    topic.places.forEach((p) => {
      if (
        p.name.toLowerCase().includes(query) ||
        p.state.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.fact.toLowerCase().includes(query)
      ) {
        seenNames.add(p.name.toLowerCase());
        matchingPlaces.push({
          place: p,
          topicTitle: topic.title,
          topicEmoji: topic.emoji,
          topicId: topic.id
        });
      }
    });

    // 2. All other topics
    allTopics.forEach((t) => {
      t.places.forEach((p) => {
        if (seenNames.has(p.name.toLowerCase())) return;
        if (
          p.name.toLowerCase().includes(query) ||
          p.state.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.fact.toLowerCase().includes(query)
        ) {
          seenNames.add(p.name.toLowerCase());
          matchingPlaces.push({
            place: p,
            topicTitle: t.title,
            topicEmoji: t.emoji,
            topicId: t.id
          });
        }
      });
    });

    // 3. Matching Topics
    const matchingTopics = allTopics.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.noun.toLowerCase().includes(query) ||
        t.syllabus.toLowerCase().includes(query) ||
        t.blurb.toLowerCase().includes(query)
    );

    // 4. States matching
    const matchingStates = states
      .map((s) => s.name)
      .filter((st) => st.toLowerCase().includes(query));

    return {
      places: matchingPlaces.slice(0, 8),
      topics: matchingTopics.slice(0, 3),
      states: matchingStates.slice(0, 3)
    };
  }, [searchQuery, topic, allTopics, states]);

  // Handle clicking a state boundary on the map
  const handleStateClick = (stateName: string) => {
    if (selectedStateName === stateName) {
      // Toggle off if already selected
      setSelectedStateName(null);
    } else {
      setSelectedStateName(stateName);
      setSelectedPlace(null);
    }
  };

  // Open full dossier modal for any landmark name clicked anywhere in the app
  const handleOpenPlaceByName = (placeName: string) => {
    let target = topic.places.find((p) => p.name.toLowerCase() === placeName.toLowerCase());
    if (!target && allTopics.length > 0) {
      for (const t of allTopics) {
        const hit = t.places.find((p) => p.name.toLowerCase() === placeName.toLowerCase());
        if (hit) {
          target = hit;
          break;
        }
      }
    }
    if (!target) {
      target = {
        name: placeName,
        lat: selectedStateName === 'Telangana' ? 17.42 : 22.5,
        lon: selectedStateName === 'Telangana' ? 78.47 : 82.5,
        state: selectedStateName || 'Telangana',
        category: 'Syllabus Landmark',
        fact: `${placeName} in ${selectedStateName || 'India'} — Essential landmark for UPSC Prelims & Mains Geography.`
      };
    }
    setSelectedPlace(target);
    setSelectedStateName(null);
    setIsCardCollapsed(false);
    setShowDeepDossierModal(false);
  };

  // Flashcard carousel navigation
  const currentPlaceIndex = selectedPlace
    ? visiblePlaces.findIndex((p) => p.name === selectedPlace.name)
    : -1;

  const activeDossier = useMemo(() => {
    if (!selectedPlace) return null;
    return getComprehensivePlaceDossier(
      selectedPlace.name,
      topic.id,
      selectedPlace.state || '',
      selectedPlace.category,
      selectedPlace.lat,
      selectedPlace.lon,
      selectedPlace.fact
    );
  }, [selectedPlace, topic.id]);

  const handleNextPlace = () => {
    if (visiblePlaces.length === 0) return;
    const nextIdx = (currentPlaceIndex + 1) % visiblePlaces.length;
    setSelectedPlace(visiblePlaces[nextIdx]);
  };

  const handlePrevPlace = () => {
    if (visiblePlaces.length === 0) return;
    const prevIdx = (currentPlaceIndex - 1 + visiblePlaces.length) % visiblePlaces.length;
    setSelectedPlace(visiblePlaces[prevIdx]);
  };

  if (screenMode === 'TEACHING') {
    return (
      <div className="relative w-full h-screen min-h-[550px] overflow-hidden bg-[#FAF9F5] flex flex-col">
        {/* Top Floating Control Bar inside Teaching Mode */}
        <div className="flex-none bg-[#FFFDF9] border-b border-[#1F3A4D]/15 px-3 py-2 flex items-center justify-between shadow-sm z-20">
          <button
            onClick={() => setScreenMode('MAP')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#1F3A4D] bg-[#1F3A4D]/5 hover:bg-[#1F3A4D]/10 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Interactive Map</span>
          </button>

          {/* Mode Switcher Segmented Control */}
          <div className="flex items-center bg-[#1F3A4D]/10 p-0.5 rounded-xl font-sans">
            <button
              onClick={() => setScreenMode('MAP')}
              className="px-3 py-1 rounded-lg text-xs font-bold text-[#1F3A4D]/70 hover:text-[#1F3A4D] transition flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Map View</span>
            </button>
            <button
              className="px-3 py-1 rounded-lg text-xs font-bold bg-[#1F3A4D] text-white shadow-sm flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>📖 Teaching Mode</span>
            </button>
            <button
              onClick={() => {
                setDetectiveTargetPlace(null);
                setScreenMode('DETECTIVE');
              }}
              className="px-3 py-1 rounded-lg text-xs font-bold text-[#E07A3F] hover:bg-[#E07A3F]/10 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>🕵️‍♂️ Clue Investigator</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <TeachingModeView
            topic={topic}
            onSelectPlaceForQuiz={(placeName) => {
              setDetectiveTargetPlace(placeName);
              setScreenMode('DETECTIVE');
            }}
            onStartFullDetectiveQuiz={() => {
              setDetectiveTargetPlace(null);
              setScreenMode('DETECTIVE');
            }}
            onSelectPlaceOnMap={(p) => {
              setSelectedPlace(p);
              setScreenMode('MAP');
            }}
          />
        </div>
      </div>
    );
  }

  if (screenMode === 'DETECTIVE') {
    return (
      <DetectiveQuizMode
        topic={topic}
        states={states}
        initialPlaceName={detectiveTargetPlace}
        onClose={() => setScreenMode('MAP')}
        onRecordResult={onRecordDetectiveResult}
      />
    );
  }

  return (
    <div className="relative w-full h-screen min-h-[550px] overflow-hidden bg-[#E6EFF4] flex flex-col">
      {/* Primary Map Viewport (SVG or Canvas) */}
      <div className="w-full h-full flex-1 relative">
        {renderMode === 'svg' ? (
          <IndiaMapSvg
            states={states}
            markers={markers}
            highlightStates={highlightStates}
            selectedStateName={selectedStateName}
            focus={cameraFocus}
            showAllLabels={showAllLabels}
            layerConfig={mapLayers}
            onStateClick={handleStateClick}
            onMarkerTap={(m) => {
              const hit = topic.places.find((p) => p.name === m.id);
              if (hit) {
                setSelectedPlace(hit);
                setSelectedStateName(null);
              }
            }}
            onMapTap={() => {
              setSelectedPlace(null);
              setSelectedStateName(null);
            }}
          />
        ) : (
          <IndiaMapCanvas
            states={states}
            markers={markers}
            highlightStates={highlightStates}
            focus={cameraFocus}
            showAllLabels={showAllLabels}
            onMarkerTap={(m) => {
              const hit = topic.places.find((p) => p.name === m.id);
              if (hit) {
                setSelectedPlace(hit);
                setSelectedStateName(null);
              }
            }}
            onMapTap={() => {
              setSelectedPlace(null);
              setSelectedStateName(null);
            }}
          />
        )}
      </div>

      {/* Top Floating Control Bar */}
      <div className="absolute top-3 left-3 right-3 max-w-4xl mx-auto z-20 flex flex-col gap-2 pointer-events-none">
        {/* Navigation & Topic Header */}
        <div className="pointer-events-auto flex items-center justify-between bg-[#FFFDF9]/95 backdrop-blur-md rounded-2xl p-2 px-3 border border-[#1F3A4D]/15 shadow-md">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onBack}
              className="w-8 h-8 rounded-full bg-[#1F3A4D]/5 hover:bg-[#1F3A4D]/15 flex items-center justify-center text-[#1F3A4D] transition active:scale-95"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Topic Selector or Title */}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base">{topic.emoji}</span>
                {allTopics.length > 0 && onSelectTopic ? (
                  <select
                    value={topic.id}
                    onChange={(e) => {
                      const t = allTopics.find((item) => item.id === e.target.value);
                      if (t) {
                        setSelectedPlace(null);
                        setSelectedCategory(null);
                        setSelectedStateName(null);
                        onSelectTopic(t);
                      }
                    }}
                    className="font-serif-title font-bold text-sm sm:text-base text-[#1F3A4D] bg-transparent border-none outline-none cursor-pointer pr-4"
                  >
                    {allTopics.map((t) => (
                      <option key={t.id} value={t.id} className="text-[#1F3A4D] bg-[#FFFDF9]">
                        {t.title} ({t.places.length})
                      </option>
                    ))}
                  </select>
                ) : (
                  <h2 className="font-serif-title font-bold text-sm sm:text-base text-[#1F3A4D] leading-tight">
                    {topic.title}
                  </h2>
                )}
              </div>
              <p className="text-[11px] text-[#1F3A4D]/65 font-medium">
                {visiblePlaces.length} of {topic.places.length} {topic.noun}s plotted
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Mode Switcher Segmented Control */}
            <div className="flex items-center bg-[#1F3A4D]/10 p-0.5 rounded-xl font-sans">
              <button
                onClick={() => setScreenMode('MAP')}
                className="px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold bg-[#1F3A4D] text-white shadow-sm flex items-center gap-1"
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Map</span>
              </button>
              <button
                onClick={() => setScreenMode('TEACHING')}
                className="px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold text-[#1F3A4D]/80 hover:text-[#1F3A4D] hover:bg-white/60 transition flex items-center gap-1"
                title="Open UPSC Complete Syllabus Teaching Dossier"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                <span>📖 Teaching</span>
              </button>
              <button
                onClick={() => {
                  setDetectiveTargetPlace(null);
                  setScreenMode('DETECTIVE');
                }}
                className="px-2.5 sm:px-3 py-1 rounded-lg text-xs font-bold text-[#E07A3F] hover:bg-[#E07A3F]/15 transition flex items-center gap-1"
                title="Prelims Clue Investigator: Reverse clue-to-pinpoint challenge"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>🕵️‍♂️ Clue Mode</span>
              </button>
            </div>

            {/* Places List Drawer Toggle */}
            <button
              onClick={() => setShowListDrawer((v) => !v)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition ${
                showListDrawer
                  ? 'bg-[#1F3A4D] text-white border-transparent'
                  : 'bg-white/90 text-[#1F3A4D] border-[#1F3A4D]/15 hover:bg-white'
              }`}
              title="Browse list of places"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">List ({visiblePlaces.length})</span>
            </button>

            {/* Did You Know Fact Popup Button */}
            {onOpenDidYouKnow && (
              <button
                onClick={onOpenDidYouKnow}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white/95 hover:bg-white text-[#1F3A4D] border border-[#1F3A4D]/15 shadow-xs transition"
                title="Open Daily Geography Fact Popup"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Fact</span>
              </button>
            )}

            {/* Interactive Map Overlays / Layer Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowLayerMenu((v) => !v)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                  showLayerMenu
                    ? 'bg-[#1F3A4D] text-white border-transparent'
                    : 'bg-white/95 text-[#1F3A4D] border-[#1F3A4D]/15 hover:bg-white shadow-xs'
                }`}
                title="Toggle Map Layers: Physical Geography, Political Boundaries & Infrastructure"
              >
                <Layers className="w-3.5 h-3.5 text-[#E07A3F]" />
                <span className="hidden sm:inline">Layers</span>
                <span className="w-4 h-4 rounded-full bg-[#E07A3F]/15 text-[#E07A3F] text-[10px] flex items-center justify-center font-bold">
                  {(mapLayers.showPhysical ? 1 : 0) +
                    (mapLayers.showRivers ? 1 : 0) +
                    (mapLayers.showCoalFields ? 1 : 0) +
                    (mapLayers.showPolitical ? 1 : 0) +
                    (mapLayers.showInfrastructure ? 1 : 0)}
                </span>
              </button>

              {/* Layer Popover Menu */}
              {showLayerMenu && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-[#FFFDF9] rounded-2xl border border-[#1F3A4D]/15 shadow-2xl p-4 z-40 animate-in fade-in slide-in-from-top-2 duration-150 text-[#1F3A4D]">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1F3A4D]/10">
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-[#E07A3F]" />
                      <span className="font-serif-title font-bold text-xs text-[#1F3A4D]">
                        Map Overlays (UPSC Spatial)
                      </span>
                    </div>
                    <button
                      onClick={() => setShowLayerMenu(false)}
                      className="w-6 h-6 rounded-full hover:bg-black/5 flex items-center justify-center text-xs text-[#1F3A4D]/60"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Layer Checkboxes */}
                  <div className="space-y-2">
                    {/* Layer 1: Physical Relief */}
                    <label className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-black/5 cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={mapLayers.showPhysical}
                        onChange={(e) =>
                          setMapLayers((prev) => ({ ...prev, showPhysical: e.target.checked }))
                        }
                        className="mt-0.5 rounded text-[#E07A3F] focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <span className="font-bold text-xs block text-[#1F3A4D]">
                          🏔️ Mountains & Physiographic Relief
                        </span>
                        <span className="text-[10px] text-[#1F3A4D]/70 block leading-tight">
                          Peninsular plateau, Himalayan ranges, coastal plains & rifts
                        </span>
                      </div>
                    </label>

                    {/* Layer 2: Rivers & Graben Valleys */}
                    <label className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-black/5 cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={mapLayers.showRivers}
                        onChange={(e) =>
                          setMapLayers((prev) => ({ ...prev, showRivers: e.target.checked }))
                        }
                        className="mt-0.5 rounded text-[#E07A3F] focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <span className="font-bold text-xs block text-[#1F3A4D]">
                          🌊 Rivers & Graben Valleys
                        </span>
                        <span className="text-[10px] text-[#1F3A4D]/70 block leading-tight">
                          Damodar, Ganga, Narmada, Godavari, Krishna & Cauvery drainage
                        </span>
                      </div>
                    </label>

                    {/* Layer 3: Coal & Energy Basins */}
                    <label className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-black/5 cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={mapLayers.showCoalFields}
                        onChange={(e) =>
                          setMapLayers((prev) => ({ ...prev, showCoalFields: e.target.checked }))
                        }
                        className="mt-0.5 rounded text-[#E07A3F] focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <span className="font-bold text-xs block text-[#1F3A4D]">
                          ⛏️ Coal & Energy Basins
                        </span>
                        <span className="text-[10px] text-[#1F3A4D]/70 block leading-tight">
                          Gondwana (Jharia, Raniganj, Singrauli) & Tertiary (Neyveli)
                        </span>
                      </div>
                    </label>

                    {/* Layer 4: Infrastructure & Freight Corridors */}
                    <label className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-black/5 cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={mapLayers.showInfrastructure}
                        onChange={(e) =>
                          setMapLayers((prev) => ({ ...prev, showInfrastructure: e.target.checked }))
                        }
                        className="mt-0.5 rounded text-[#E07A3F] focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <span className="font-bold text-xs block text-[#1F3A4D]">
                          🚆 Infrastructure & Freight Corridors
                        </span>
                        <span className="text-[10px] text-[#1F3A4D]/70 block leading-tight">
                          Eastern & Western DFC, HVJ Gas Grid, National Waterways
                        </span>
                      </div>
                    </label>

                    {/* Layer 5: Political State Borders */}
                    <label className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-black/5 cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={mapLayers.showPolitical}
                        onChange={(e) =>
                          setMapLayers((prev) => ({ ...prev, showPolitical: e.target.checked }))
                        }
                        className="mt-0.5 rounded text-[#E07A3F] focus:ring-0 cursor-pointer"
                      />
                      <div>
                        <span className="font-bold text-xs block text-[#1F3A4D]">
                          🏛️ Political State Borders
                        </span>
                        <span className="text-[10px] text-[#1F3A4D]/70 block leading-tight">
                          State jurisdiction outlines and administrative boundaries
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Fast Presets Strip */}
                  <div className="mt-3 pt-2.5 border-t border-[#1F3A4D]/10">
                    <span className="text-[9px] font-bold text-[#1F3A4D]/50 uppercase tracking-wider block mb-1.5">
                      Quick Layer Presets
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() =>
                          setMapLayers({ showPhysical: true, showPolitical: true, showInfrastructure: true })
                        }
                        className="px-2 py-0.5 rounded-lg bg-[#1F3A4D]/5 hover:bg-[#1F3A4D]/10 text-[10px] font-bold text-[#1F3A4D]"
                      >
                        All Overlays
                      </button>
                      <button
                        onClick={() =>
                          setMapLayers({ showPhysical: true, showPolitical: false, showInfrastructure: false })
                        }
                        className="px-2 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[10px] font-bold text-emerald-800"
                      >
                        Physical Only
                      </button>
                      <button
                        onClick={() =>
                          setMapLayers({ showPhysical: false, showPolitical: false, showInfrastructure: true })
                        }
                        className="px-2 py-0.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[10px] font-bold text-blue-800"
                      >
                        Infrastructure
                      </button>
                    </div>
                  </div>

                  {/* Contextual Tip for First-Timers */}
                  <div className="mt-2.5 p-2 rounded-xl bg-amber-50 border border-amber-200/70 text-[10px] text-amber-950">
                    <strong>💡 Aspirant Tip:</strong> Notice how Jharia, Bokaro & Raniganj coalfields sit directly along the blue Damodar River graben basin!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar & Category Filter Strip */}
        <div className="pointer-events-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Search Input with Instant Auto-Complete Dropdown */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-[#1F3A4D]/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={`Search any place (Zoji La, Chandrapur, Koyna...), state, or topic...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-[#FFFDF9]/95 backdrop-blur-md border border-[#1F3A4D]/15 text-xs text-[#1F3A4D] placeholder-[#1F3A4D]/50 outline-none focus:border-[#E07A3F] shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#1F3A4D]/10 hover:bg-[#1F3A4D]/20 text-[#1F3A4D] flex items-center justify-center text-[10px] font-bold transition"
                title="Clear search query"
              >
                ✕
              </button>
            )}

            {/* Auto-suggest Search Results Dropdown */}
            {searchQuery.trim().length >= 2 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#FFFDF9]/98 backdrop-blur-xl rounded-2xl border border-[#1F3A4D]/20 shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
                {searchResults.places.length === 0 && searchResults.states.length === 0 ? (
                  <div className="p-3 text-xs text-[#1F3A4D]/60 text-center font-serif italic">
                    No landmarks or states found matching "{searchQuery}"
                  </div>
                ) : (
                  <div className="p-2 space-y-2 text-[#1F3A4D]">
                    {/* Matching Places */}
                    {searchResults.places.length > 0 && (
                      <div>
                        <span className="text-[10px] font-bold text-[#E07A3F] uppercase tracking-wider block px-2.5 py-1">
                          📍 Syllabus Landmarks ({searchResults.places.length})
                        </span>
                        <div className="space-y-1">
                          {searchResults.places.map((item) => (
                            <button
                              key={`${item.topicId}-${item.place.name}`}
                              onClick={() => {
                                const targetTopic = allTopics.find((t) => t.id === item.topicId);
                                if (targetTopic && targetTopic.id !== topic.id && onSelectTopic) {
                                  onSelectTopic(targetTopic);
                                }
                                setSelectedPlace(item.place);
                                setSelectedStateName(null);
                                setIsCardCollapsed(false);
                                setSearchQuery('');
                              }}
                              className="w-full text-left p-2 rounded-xl hover:bg-[#FFF8F2] border border-transparent hover:border-[#E07A3F]/30 transition flex items-start gap-2.5 cursor-pointer"
                            >
                              <span className="text-base flex-shrink-0 mt-0.5">{item.topicEmoji}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="font-bold text-xs text-[#1F3A4D] truncate">
                                    {item.place.name}
                                  </span>
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#1F3A4D]/5 text-[#1F3A4D]/70 flex-shrink-0">
                                    {item.place.category}
                                  </span>
                                </div>
                                <p className="text-[10px] text-[#1F3A4D]/70 truncate mt-0.5">
                                  📍 {item.place.state || 'India'} · {item.topicTitle} — {item.place.fact}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Matching States */}
                    {searchResults.states.length > 0 && (
                      <div className="pt-1.5 border-t border-[#1F3A4D]/10">
                        <span className="text-[10px] font-bold text-[#1F3A4D]/60 uppercase tracking-wider block px-2.5 py-1">
                          🏛️ States & UTs ({searchResults.states.length})
                        </span>
                        <div className="flex flex-wrap gap-1 px-2 pb-1">
                          {searchResults.states.map((st) => (
                            <button
                              key={st}
                              onClick={() => {
                                setSelectedStateName(st);
                                setSelectedPlace(null);
                                setSearchQuery('');
                              }}
                              className="px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-[11px] font-bold text-amber-900 transition flex items-center gap-1 cursor-pointer"
                            >
                              <span>📍 {st}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Map Overlays Toggle Strip */}
          <div className="pointer-events-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10px] font-bold text-[#1F3A4D]/60 whitespace-nowrap hidden xs:inline">Overlays:</span>
            <button
              onClick={() => setMapLayers((prev) => ({ ...prev, showRivers: !(prev.showRivers ?? true) }))}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition flex items-center gap-1 border ${
                mapLayers.showRivers ?? true
                  ? 'bg-sky-700 text-white border-transparent shadow-2xs'
                  : 'bg-[#FFFDF9]/90 text-sky-900 border-[#1F3A4D]/15 hover:bg-white'
              }`}
              title="Toggle Major Indian Rivers & Damodar Graben Channel"
            >
              <span>🌊 Rivers</span>
              <span className="text-[9px] font-mono opacity-80">({(mapLayers.showRivers ?? true) ? 'ON' : 'OFF'})</span>
            </button>

            <button
              onClick={() => setMapLayers((prev) => ({ ...prev, showCoalFields: !(prev.showCoalFields ?? true) }))}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition flex items-center gap-1 border ${
                mapLayers.showCoalFields ?? true
                  ? 'bg-amber-800 text-white border-transparent shadow-2xs'
                  : 'bg-[#FFFDF9]/90 text-amber-950 border-[#1F3A4D]/15 hover:bg-white'
              }`}
              title="Toggle Gondwana & Tertiary Coal/Lignite Basin Overlays"
            >
              <span>⚡ Coal Basins</span>
              <span className="text-[9px] font-mono opacity-80">({(mapLayers.showCoalFields ?? true) ? 'ON' : 'OFF'})</span>
            </button>

            <button
              onClick={() => setMapLayers((prev) => ({ ...prev, showPhysical: !prev.showPhysical }))}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition flex items-center gap-1 border ${
                mapLayers.showPhysical
                  ? 'bg-emerald-700 text-white border-transparent shadow-2xs'
                  : 'bg-[#FFFDF9]/90 text-emerald-900 border-[#1F3A4D]/15 hover:bg-white'
              }`}
              title="Toggle Physiographic Relief Zones"
            >
              <span>⛰️ Relief</span>
              <span className="text-[9px] font-mono opacity-80">({mapLayers.showPhysical ? 'ON' : 'OFF'})</span>
            </button>

            <button
              onClick={() => setMapLayers((prev) => ({ ...prev, showPolitical: !prev.showPolitical }))}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition flex items-center gap-1 border ${
                mapLayers.showPolitical
                  ? 'bg-purple-700 text-white border-transparent shadow-2xs'
                  : 'bg-[#FFFDF9]/90 text-purple-900 border-[#1F3A4D]/15 hover:bg-white'
              }`}
              title="Toggle State Political Boundaries"
            >
              <span>🏛️ Borders</span>
              <span className="text-[9px] font-mono opacity-80">({mapLayers.showPolitical ? 'ON' : 'OFF'})</span>
            </button>

            <button
              onClick={() => setMapLayers((prev) => ({ ...prev, showInfrastructure: !prev.showInfrastructure }))}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition flex items-center gap-1 border ${
                mapLayers.showInfrastructure
                  ? 'bg-blue-700 text-white border-transparent shadow-2xs'
                  : 'bg-[#FFFDF9]/90 text-blue-900 border-[#1F3A4D]/15 hover:bg-white'
              }`}
              title="Toggle DFC Corridors, Gas Pipelines & NW-1"
            >
              <span>🛤️ Infra</span>
              <span className="text-[9px] font-mono opacity-80">({mapLayers.showInfrastructure ? 'ON' : 'OFF'})</span>
            </button>
          </div>

          {/* Category Filter Chips */}
          {topic.categories.length > 1 && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap backdrop-blur-md border transition ${
                  selectedCategory === null
                    ? 'bg-[#1F3A4D] text-white border-transparent shadow-sm'
                    : 'bg-[#FFFDF9]/90 text-[#1F3A4D] border-[#1F3A4D]/15 hover:bg-white'
                }`}
              >
                All ({topic.places.length})
              </button>
              {topic.categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                const catColor = categoryColorMap[cat] || '#E07A3F';
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(isSelected ? null : cat)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap backdrop-blur-md border transition ${
                      isSelected
                        ? 'bg-[#1F3A4D] text-white border-transparent shadow-sm'
                        : 'bg-[#FFFDF9]/90 text-[#1F3A4D] border-[#1F3A4D]/15 hover:bg-white'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: catColor }} />
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Interactive Topic Mastery Scrubber Bar */}
        <div className="pointer-events-auto bg-[#FFFDF9]/95 backdrop-blur-md rounded-2xl p-2 px-3 border border-[#1F3A4D]/15 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 flex-1">
            <span className="font-bold text-[#1F3A4D] whitespace-nowrap text-[11px]">
              Topic Mastery ({topicMasteryStats.mastered}/{topicMasteryStats.total}):
            </span>
            {/* Multi-tier scrubber */}
            <div className="h-2 rounded-full bg-[#1F3A4D]/10 overflow-hidden flex-1 max-w-xs flex">
              <div
                style={{ width: `${topicMasteryStats.masteredPct}%` }}
                className="h-full bg-emerald-600 transition-all duration-300"
                title={`Mastered: ${topicMasteryStats.mastered}`}
              />
              <div
                style={{ width: `${topicMasteryStats.learningPct}%` }}
                className="h-full bg-amber-500 transition-all duration-300"
                title={`In Review: ${topicMasteryStats.learning}`}
              />
              <div
                style={{ width: `${topicMasteryStats.weakPct}%` }}
                className="h-full bg-rose-400/60 transition-all duration-300"
                title={`Needs Practice: ${topicMasteryStats.weak}`}
              />
            </div>
          </div>

          {/* Interactive filter pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setMasteryFilter('ALL')}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition ${
                masteryFilter === 'ALL'
                  ? 'bg-[#1F3A4D] text-white shadow-xs'
                  : 'bg-[#1F3A4D]/5 text-[#1F3A4D] hover:bg-[#1F3A4D]/10'
              }`}
            >
              All ({topic.places.length})
            </button>
            <button
              onClick={() => setMasteryFilter('MASTERED')}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                masteryFilter === 'MASTERED'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Mastered ({topicMasteryStats.mastered})</span>
            </button>
            <button
              onClick={() => setMasteryFilter('WEAK')}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                masteryFilter === 'WEAK'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Needs Practice ({topicMasteryStats.weak})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Slide-out Places List Drawer */}
      {showListDrawer && (
        <div className="absolute top-24 bottom-6 right-3 w-80 max-w-[85vw] bg-[#FFFDF9]/95 backdrop-blur-lg rounded-2xl border border-[#1F3A4D]/15 shadow-xl z-30 flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-4 duration-200">
          <div className="p-3.5 border-b border-[#1F3A4D]/10 flex items-center justify-between">
            <div>
              <h3 className="font-serif-title font-bold text-sm text-[#1F3A4D]">
                {topic.noun.charAt(0).toUpperCase() + topic.noun.slice(1)} Index
              </h3>
              <p className="text-[11px] text-[#1F3A4D]/60">{visiblePlaces.length} locations available</p>
            </div>
            <button
              onClick={() => setShowListDrawer(false)}
              className="w-7 h-7 rounded-full bg-[#1F3A4D]/5 hover:bg-[#1F3A4D]/10 flex items-center justify-center text-[#1F3A4D]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {visiblePlaces.map((p) => {
              const isSelected = selectedPlace?.name === p.name;
              const masteryKey = `${topic.id}|${p.name}`;
              const stars = masteryMap[masteryKey] || 0;
              const catColor = categoryColorMap[p.category] || '#E07A3F';

              return (
                <div
                  key={p.name}
                  onClick={() => {
                    setSelectedPlace(p);
                    setSelectedStateName(null);
                    setShowListDrawer(false);
                  }}
                  className={`p-2.5 rounded-xl cursor-pointer text-left transition flex items-start justify-between border ${
                    isSelected
                      ? 'bg-[#1F3A4D] text-white border-transparent'
                      : 'bg-white/80 hover:bg-white text-[#1F3A4D] border-[#1F3A4D]/5 hover:border-[#1F3A4D]/15'
                  }`}
                >
                  <div className="flex-1 mr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: catColor }} />
                      <span className="font-bold text-xs">{p.name}</span>
                    </div>
                    <span
                      className={`text-[10px] block mt-0.5 ${
                        isSelected ? 'text-white/70' : 'text-[#1F3A4D]/60'
                      }`}
                    >
                      {p.state ? p.state : 'Border / Offshore'} · {p.category}
                    </span>
                  </div>

                  {/* 5-star mastery dots */}
                  <div className="flex items-center gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <span
                        key={lvl}
                        className={`w-1.5 h-1.5 rounded-full ${
                          lvl <= stars ? 'bg-[#E07A3F]' : isSelected ? 'bg-white/20' : 'bg-[#1F3A4D]/15'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STATE LEARNING & REGION QUIZ PANEL (Triggered on clicking any state boundary) */}
      {selectedStateName && !selectedPlace && (
        <div className="absolute bottom-4 left-4 right-4 max-w-xl mx-auto z-20 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-[#FFFDF9]/95 backdrop-blur-md rounded-[24px] border border-[#E07A3F]/30 shadow-2xl p-4 sm:p-5 relative">
            <button
              onClick={() => setSelectedStateName(null)}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-[#1F3A4D]/5 hover:bg-[#1F3A4D]/10 flex items-center justify-center text-[#1F3A4D] transition"
            >
              <X className="w-4 h-4" />
            </button>

            {/* State Header */}
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#E07A3F]/15 flex items-center justify-center text-[#E07A3F] shadow-inner flex-shrink-0">
                <Building2 className="w-6 h-6" />
              </div>

              <div className="flex-1 pr-6">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif-title font-bold text-lg sm:text-xl text-[#1F3A4D]">
                    {selectedStateName}
                  </h3>
                  <span className="text-[10px] font-bold text-[#E07A3F] bg-[#E07A3F]/10 px-2.5 py-0.5 rounded-full">
                    Indian State / UT
                  </span>
                </div>
                <p className="text-xs text-[#1F3A4D]/75 mt-0.5">
                  {statePlacesInTopic.length} {topic.noun}
                  {statePlacesInTopic.length === 1 ? '' : 's'} in {topic.title} ·{' '}
                  {allStatePlaces.length} total UPSC syllabus landmarks
                </p>
              </div>
            </div>

            {/* Places from current topic in this state */}
            <div className="mt-3.5">
              <span className="text-[10px] font-bold text-[#1F3A4D]/60 uppercase tracking-wider block mb-1.5">
                {topic.title} Locations in {selectedStateName}
              </span>

              {statePlacesInTopic.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {statePlacesInTopic.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => setSelectedPlace(p)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#1F3A4D]/15 hover:border-[#E07A3F] hover:bg-[#FFF8F2] text-xs font-semibold text-[#1F3A4D] shadow-2xs transition active:scale-95"
                    >
                      <MapPin
                        className="w-3.5 h-3.5"
                        style={{ color: categoryColorMap[p.category] || '#E07A3F' }}
                      />
                      <span>{p.name}</span>
                      <span className="text-[10px] text-[#1F3A4D]/50 font-normal">({p.category})</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-[#1F3A4D]/5 text-xs text-[#1F3A4D]/70 font-serif italic">
                  No {topic.noun}s recorded in {selectedStateName} under {topic.title}. Check other syllabus landmarks below!
                </div>
              )}
            </div>

            {/* Places from other syllabus topics in this state (for comprehensive preparation) */}
            <div className="mt-3 pt-3 border-t border-[#1F3A4D]/10">
              <span className="text-[10px] font-bold text-[#1F3A4D]/60 uppercase tracking-wider block mb-1.5">
                All UPSC Syllabus Landmarks in {selectedStateName}
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto no-scrollbar py-1">
                {allStatePlaces.map((item) => (
                  <button
                    key={item.place.name}
                    onClick={() => handleOpenPlaceByName(item.place.name)}
                    className="px-2.5 py-1 rounded-xl bg-white hover:bg-[#FFF8F2] border border-[#1F3A4D]/15 hover:border-[#E07A3F] text-[11px] font-bold text-[#1F3A4D] whitespace-nowrap flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-2xs"
                    title={`Click for full UPSC dossier on ${item.place.name}`}
                  >
                    <span>{item.topicEmoji}</span>
                    <span>{item.place.name}</span>
                    <span className="text-[9px] font-normal text-[#1F3A4D]/60">({item.place.category})</span>
                  </button>
                ))}

                {/* If selectedStateName === 'Telangana', guarantee additional key Telangana landmarks */}
                {selectedStateName === 'Telangana' && (
                  <>
                    {!allStatePlaces.some((item) => item.place.name === 'Hussain Sagar') && (
                      <button
                        onClick={() => handleOpenPlaceByName('Hussain Sagar')}
                        className="px-2.5 py-1 rounded-xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-300 text-[11px] font-bold text-cyan-900 whitespace-nowrap flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-2xs"
                      >
                        <span>🌊</span>
                        <span>Hussain Sagar</span>
                        <span className="text-[9px] font-normal text-cyan-700">(Urban Lake & Qutb Shahi Heritage)</span>
                      </button>
                    )}
                    {!allStatePlaces.some((item) => item.place.name === 'Singareni') && (
                      <button
                        onClick={() => handleOpenPlaceByName('Singareni')}
                        className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-[11px] font-bold text-slate-900 whitespace-nowrap flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-2xs"
                      >
                        <span>⚡</span>
                        <span>Singareni</span>
                        <span className="text-[9px] font-normal text-slate-700">(Godavari Coal Belt SCCL)</span>
                      </button>
                    )}
                    {!allStatePlaces.some((item) => item.place.name === 'Ramagundam') && (
                      <button
                        onClick={() => handleOpenPlaceByName('Ramagundam')}
                        className="px-2.5 py-1 rounded-xl bg-[#FFF8F2] hover:bg-amber-100 border border-amber-300 text-[11px] font-bold text-amber-900 whitespace-nowrap flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-2xs"
                      >
                        <span>☀️</span>
                        <span>Ramagundam</span>
                        <span className="text-[9px] font-normal text-amber-700">(100 MW Floating Solar & NTPC)</span>
                      </button>
                    )}
                    {!allStatePlaces.some((item) => item.place.name === 'Ramappa Temple') && (
                      <button
                        onClick={() => handleOpenPlaceByName('Ramappa Temple')}
                        className="px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-300 text-[11px] font-bold text-purple-900 whitespace-nowrap flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-2xs"
                      >
                        <span>🏛️</span>
                        <span>Ramappa Temple</span>
                        <span className="text-[9px] font-normal text-purple-700">(UNESCO 2021 Floating Bricks)</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* State Action Bar (Quiz this State / Explore) */}
            <div className="mt-4 pt-3 border-t border-[#1F3A4D]/10 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedStateName(null)}
                className="px-3 py-2 rounded-xl bg-[#1F3A4D]/5 hover:bg-[#1F3A4D]/10 text-xs font-semibold text-[#1F3A4D] transition"
              >
                Clear Selection
              </button>

              <button
                onClick={() => setShowStateQuizModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E07A3F] hover:bg-[#d46a30] active:scale-95 text-white font-bold text-xs shadow-sm transition"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Quiz {selectedStateName} Region</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collapsible Bottom Sheet Location Dossier (Triggered on clicking any place pin, does NOT obscure map) */}
      {selectedPlace && (
        <PlaceDetailModal
          place={selectedPlace}
          topic={topic}
          allPlacesInTopic={visiblePlaces}
          categoryColorMap={categoryColorMap}
          onClose={() => setSelectedPlace(null)}
          onSelectPlace={(p) => setSelectedPlace(p)}
          onLaunchClueMode={(placeName) => {
            setDetectiveTargetPlace(placeName);
            setScreenMode('DETECTIVE');
          }}
          onSelectState={(stateName) => {
            setSelectedPlace(null);
            setSelectedStateName(stateName);
          }}
          onLaunchDeepDive={() => setShowDeepDiveQuizModal(true)}
        />
      )}

      {/* Deep Dive Critical Thinking Quiz Modal */}
      {showDeepDiveQuizModal && selectedPlace && (
        <DeepDiveQuizModal
          place={selectedPlace}
          topic={topic}
          onClose={() => setShowDeepDiveQuizModal(false)}
          onEarnXpBonus={(amount) => {
            if (onEarnXpBonus) onEarnXpBonus(amount);
          }}
        />
      )}

      {/* Topic Quiz Configuration Modal */}
      {showTopicQuizModal && (
        <div className="fixed inset-0 bg-[#1F3A4D]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-[26px] p-6 max-w-md w-full border border-[#1F3A4D]/15 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F3A4D]/10">
              <div className="flex items-center gap-2">
                <span className="text-xl">{topic.emoji}</span>
                <h3 className="font-serif-title font-bold text-lg text-[#1F3A4D]">
                  Quiz {topic.title}
                </h3>
              </div>
              <button
                onClick={() => setShowTopicQuizModal(false)}
                className="w-8 h-8 rounded-full bg-[#1F3A4D]/5 hover:bg-[#1F3A4D]/10 flex items-center justify-center text-[#1F3A4D]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quiz Mode Selector */}
            <div className="mt-4">
              <label className="text-xs font-bold text-[#1F3A4D]/75 block mb-2">
                Select Quiz Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { mode: 'MIXED', label: 'Mixed', icon: '⚡' },
                  { mode: 'MAP_ONLY', label: 'Map Only', icon: '🗺️' },
                  { mode: 'QUESTIONS_ONLY', label: 'MCQs Only', icon: '📝' }
                ].map((item) => (
                  <button
                    key={item.mode}
                    onClick={() => setQuizMode(item.mode as QuizMode)}
                    className={`p-3 rounded-2xl border text-center transition ${
                      quizMode === item.mode
                        ? 'bg-[#1F3A4D] text-white border-[#1F3A4D] shadow-sm'
                        : 'bg-white text-[#1F3A4D] border-[#1F3A4D]/15 hover:border-[#1F3A4D]/35'
                    }`}
                  >
                    <span className="text-lg block mb-1">{item.icon}</span>
                    <span className="text-xs font-bold leading-tight block">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count Selector */}
            <div className="mt-4">
              <label className="text-xs font-bold text-[#1F3A4D]/75 block mb-2">
                Number of Questions
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20].map((len) => (
                  <button
                    key={len}
                    onClick={() => setQuizLength(len)}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      quizLength === len
                        ? 'bg-[#E07A3F] text-white border-[#E07A3F] shadow-sm'
                        : 'bg-white text-[#1F3A4D] border-[#1F3A4D]/15 hover:border-[#1F3A4D]/35'
                    }`}
                  >
                    {len} Qs
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={() => {
                setShowTopicQuizModal(false);
                onStartQuiz(topic, quizMode, quizLength);
              }}
              className="mt-6 w-full h-12 rounded-2xl bg-[#E07A3F] hover:bg-[#d46a30] active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Begin Topic Practice</span>
            </button>
          </div>
        </div>
      )}

      {/* State-Specific Regional Quiz Configuration Modal */}
      {showStateQuizModal && selectedStateName && (
        <div className="fixed inset-0 bg-[#1F3A4D]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-[26px] p-6 max-w-md w-full border border-[#1F3A4D]/15 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F3A4D]/10">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏛️</span>
                <div>
                  <h3 className="font-serif-title font-bold text-lg text-[#1F3A4D]">
                    Quiz {selectedStateName} Region
                  </h3>
                  <span className="text-[11px] text-[#1F3A4D]/60 font-medium">
                    Test landmarks and jurisdiction in {selectedStateName}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowStateQuizModal(false)}
                className="w-8 h-8 rounded-full bg-[#1F3A4D]/5 hover:bg-[#1F3A4D]/10 flex items-center justify-center text-[#1F3A4D]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quiz Mode Selector */}
            <div className="mt-4">
              <label className="text-xs font-bold text-[#1F3A4D]/75 block mb-2">
                Select Quiz Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { mode: 'MIXED', label: 'Mixed', icon: '⚡' },
                  { mode: 'MAP_ONLY', label: 'Map Tap Only', icon: '📍' },
                  { mode: 'QUESTIONS_ONLY', label: 'MCQs Only', icon: '📝' }
                ].map((item) => (
                  <button
                    key={item.mode}
                    onClick={() => setQuizMode(item.mode as QuizMode)}
                    className={`p-3 rounded-2xl border text-center transition ${
                      quizMode === item.mode
                        ? 'bg-[#1F3A4D] text-white border-[#1F3A4D] shadow-sm'
                        : 'bg-white text-[#1F3A4D] border-[#1F3A4D]/15 hover:border-[#1F3A4D]/35'
                    }`}
                  >
                    <span className="text-lg block mb-1">{item.icon}</span>
                    <span className="text-xs font-bold leading-tight block">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count Selector */}
            <div className="mt-4">
              <label className="text-xs font-bold text-[#1F3A4D]/75 block mb-2">
                Number of Questions
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 15, 20].map((len) => (
                  <button
                    key={len}
                    onClick={() => setQuizLength(len)}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      quizLength === len
                        ? 'bg-[#E07A3F] text-white border-[#E07A3F] shadow-sm'
                        : 'bg-white text-[#1F3A4D] border-[#1F3A4D]/15 hover:border-[#1F3A4D]/35'
                    }`}
                  >
                    {len} Qs
                  </button>
                ))}
              </div>
            </div>

            {/* Start Regional Quiz Button */}
            <button
              onClick={() => {
                setShowStateQuizModal(false);
                if (onStartStateQuiz) {
                  onStartStateQuiz(selectedStateName, topic, quizMode, quizLength);
                } else {
                  onStartQuiz(topic, quizMode, quizLength);
                }
              }}
              className="mt-6 w-full h-12 rounded-2xl bg-[#E07A3F] hover:bg-[#d46a30] active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start {selectedStateName} Quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
