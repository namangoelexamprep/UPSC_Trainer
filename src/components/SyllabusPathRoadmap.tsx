import React from 'react';
import { Topic } from '../types';
import { Compass, CheckCircle2, Lock, ChevronRight, Sparkles, MapPin, Award } from 'lucide-react';

interface SyllabusPathRoadmapProps {
  topics: Topic[];
  masteryMap: Record<string, number>;
  onSelectTopic: (topic: Topic) => void;
}

export const SyllabusPathRoadmap: React.FC<SyllabusPathRoadmapProps> = ({
  topics = [],
  masteryMap = {},
  onSelectTopic
}) => {
  if (topics.length === 0) return null;

  return (
    <div className="my-6 bg-[#FFFDF9] rounded-[26px] border border-[#1F3A4D]/15 shadow-sm p-4 sm:p-6 text-[#1F3A4D]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1F3A4D]/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#E07A3F] text-white flex items-center justify-center font-bold text-base shadow-xs">
            🗺️
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E07A3F] block">
              Structured Journey for UPSC GS Paper 1 & 3
            </span>
            <h3 className="font-serif-title font-bold text-base sm:text-lg text-[#1F3A4D]">
              UPSC Syllabus Path Roadmap
            </h3>
          </div>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
          {topics.length} Syllabus Modules
        </span>
      </div>

      {/* Roadmap Steps (Timeline / Journey View) */}
      <div className="relative pl-6 sm:pl-8 space-y-4 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#1F3A4D]/15">
        {topics.map((topic, idx) => {
          const places = topic.places || [];
          let masterySum = 0;
          places.forEach((p) => {
            const key = `${topic.id}|${p.name}`;
            masterySum += masteryMap[key] || 0;
          });
          const avgMastery = places.length > 0 ? masterySum / places.length : 0;
          const percent = Math.min(100, Math.max(0, Math.round((avgMastery / 5) * 100)));
          const isMastered = percent >= 80;
          const isInProgress = percent > 0 && percent < 80;

          return (
            <div key={topic.id} className="relative group">
              {/* Journey Node Circle */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                  isMastered
                    ? 'bg-emerald-600 border-white text-white'
                    : isInProgress
                    ? 'bg-amber-500 border-white text-white'
                    : 'bg-white border-[#1F3A4D]/30 text-[#1F3A4D]/60'
                }`}
              >
                {isMastered ? '✓' : idx + 1}
              </div>

              {/* Step Card */}
              <div
                onClick={() => onSelectTopic(topic)}
                className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#1F3A4D]/10 hover:border-[#E07A3F]/50 shadow-2xs hover:shadow-md transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#1F3A4D]/5 flex items-center justify-center text-xl flex-shrink-0 mt-0.5">
                    {topic.emoji}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-serif-title font-bold text-sm sm:text-base text-[#1F3A4D] truncate">
                        {topic.title}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1F3A4D]/8 text-[#1F3A4D]">
                        {places.length} {topic.noun}s
                      </span>
                      {isMastered && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          Mastered 🏆
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#1F3A4D]/75 mt-0.5 leading-relaxed truncate">
                      {topic.syllabus}
                    </p>
                  </div>
                </div>

                {/* Progress & Action */}
                <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-auto">
                  <div className="w-24 sm:w-28">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#1F3A4D]/70 mb-1">
                      <span>Mastery</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-black/5 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isMastered ? 'bg-emerald-600' : isInProgress ? 'bg-amber-500' : 'bg-[#1F3A4D]/30'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <span className="p-2 rounded-xl bg-[#1F3A4D]/5 group-hover:bg-[#E07A3F] group-hover:text-white text-[#1F3A4D] transition">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
