import React, { useState } from 'react';
import { Place, Topic } from '../types';
import { getComprehensivePlaceDossier, DeepPlaceDossier } from '../data/comprehensivePlaceDossiers';
import { Award, CheckCircle2, ChevronRight, GraduationCap, ShieldAlert, Sparkles, X, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DeepDiveQuizModalProps {
  place: Place;
  topic: Topic;
  onClose: () => void;
  onEarnXpBonus: (amount: number) => void;
}

export const DeepDiveQuizModal: React.FC<DeepDiveQuizModalProps> = ({
  place,
  topic,
  onClose,
  onEarnXpBonus
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const dossier: DeepPlaceDossier = getComprehensivePlaceDossier(
    place.name,
    topic.id,
    place.state || '',
    place.category,
    place.lat,
    place.lon,
    place.fact
  );

  // Generate 4 rigorous multi-part critical thinking questions based on dossier
  const questions = [
    {
      id: 1,
      part: 'Part A: Geological Genesis & Epoch',
      prompt: `Which geological formation and chronological epoch best explains the genesis of ${dossier.name}?`,
      options: [
        dossier.geologicalEpoch || 'Gondwana Supergroup / Tertiary Coastal Basin',
        'Cenozoic Alluvial Silt Deposition only',
        'Archean Volcanic Basalt Traps without organic material',
        'Quaternary Glacial Moraine Deposits'
      ],
      correctIndex: 0,
      explanation: dossier.geologicalGenesis.slice(0, 220) + '...'
    },
    {
      id: 2,
      part: 'Part B: Economic Value Chain & PSU',
      prompt: `What is the primary economic and strategic utility of ${dossier.name} in India's industrial growth?`,
      options: [
        dossier.economicSignificance?.slice(0, 90) || 'Crucial for metallurgical steel and energy security',
        'Solely utilized for export to neighboring countries without domestic industrial benefit',
        'Reserved exclusively for atomic energy research',
        'Inactive historical monument with no current commercial extraction'
      ],
      correctIndex: 0,
      explanation: dossier.economicAndStrategicSignificance.slice(0, 220) + '...'
    },
    {
      id: 3,
      part: 'Part C: Environmental & Governance Challenges',
      prompt: `According to UPSC GS Paper 3 environmental governance, which key issue directly affects ${dossier.name}?`,
      options: [
        dossier.mainsIssuesAndEnvironment.slice(0, 90) || 'Subterranean fires, artesian aquifer depressurization, and CEPI pollution',
        'Zero environmental challenges due to pristine ecological preservation',
        'Severe coral reef bleaching along the inland river basin',
        'Volcanic ash deposition and tsunami risks'
      ],
      correctIndex: 0,
      explanation: dossier.mainsIssuesAndEnvironment.slice(0, 220) + '...'
    },
    {
      id: 4,
      part: 'Part D: Prelims Trap & Statement Verification',
      prompt: `Consider the following statements regarding ${dossier.name}. Which statement is factually accurate for UPSC Prelims?`,
      options: [
        dossier.upscPrelimsTraps[0] || 'Requires precise mapping of state boundaries and geological classification.',
        'It is located in the Indo-Gangetic alluvial plains far away from peninsular shields.',
        'It produces zero mineral output and relies entirely on imports.',
        'It was nationalized in the 21st century by international maritime treaties.'
      ],
      correctIndex: 0,
      explanation: 'UPSC Prelims demands accurate matching of state jurisdiction, basin drainage, and formation epoch.'
    }
  ];

  const handleSelectOption = (qId: number, optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qId]: optIdx });
  };

  const handleVerifyAll = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    if (correctCount >= 3) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      onEarnXpBonus(50);
    }
  };

  const correctTotal = questions.filter((q) => selectedAnswers[q.id] === q.correctIndex).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] rounded-[28px] border-2 border-[#E07A3F] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#1F3A4D]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#1F3A4D]/10 bg-gradient-to-r from-amber-50 via-[#FFFDF9] to-orange-50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E07A3F] text-white flex items-center justify-center font-bold text-xl shadow-md">
              🎯
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E07A3F] font-mono">
                Advanced Master Class
              </span>
              <h2 className="font-serif-title font-bold text-lg sm:text-xl text-[#1F3A4D]">
                Deep Dive Critical Thinking Quiz: {dossier.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1F3A4D]/5 hover:bg-[#1F3A4D]/10 flex items-center justify-center text-[#1F3A4D] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quiz Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {!isSubmitted ? (
            <div className="space-y-6">
              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950">
                💡 <strong>UPSC Mains & Prelims Multi-Part Challenge:</strong> Answer all 4 critical-thinking parts correctly to prove advanced mastery of {dossier.name} and earn <strong>+50 XP Bonus</strong>!
              </div>

              {questions.map((q, idx) => (
                <div key={q.id} className="bg-white rounded-2xl p-4 border border-[#1F3A4D]/15 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1F3A4D]/10 text-[#1F3A4D] font-mono uppercase">
                      {q.part}
                    </span>
                    <span className="text-xs font-semibold text-[#1F3A4D]/60">Question {idx + 1} of 4</span>
                  </div>

                  <h3 className="font-serif-title font-bold text-sm sm:text-base text-[#1F3A4D]">
                    {q.prompt}
                  </h3>

                  <div className="space-y-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[q.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition flex items-start gap-2.5 ${
                            isSelected
                              ? 'bg-[#1F3A4D] text-white border-[#1F3A4D] shadow-sm'
                              : 'bg-white hover:bg-black/5 text-[#1F3A4D] border-[#1F3A4D]/15'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                            isSelected ? 'bg-[#E07A3F] text-white' : 'bg-black/5 text-[#1F3A4D]/70'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-relaxed">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <button
                onClick={handleVerifyAll}
                disabled={Object.keys(selectedAnswers).length < 4}
                className={`w-full h-12 rounded-2xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 ${
                  Object.keys(selectedAnswers).length < 4
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#E07A3F] hover:bg-[#d46a30] text-white active:scale-[0.99]'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Submit Deep Dive Answers</span>
              </button>
            </div>
          ) : (
            <div className="text-center py-6 space-y-5 animate-in fade-in duration-200">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-3xl shadow-md">
                {correctTotal >= 3 ? '🏆' : '📈'}
              </div>

              <div>
                <h3 className="font-serif-title font-bold text-2xl text-[#1F3A4D]">
                  {correctTotal >= 3 ? 'Mastery Verified!' : 'Good Effort! Review Explanations'}
                </h3>
                <p className="text-xs text-[#1F3A4D]/75 mt-1">
                  You scored <strong>{correctTotal} / 4</strong> correct parts in this Deep Dive session.
                </p>
              </div>

              {correctTotal >= 3 && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center justify-center gap-2 max-w-md mx-auto">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>+50 XP Bonus Added to Your Cadet Profile!</span>
                </div>
              )}

              <div className="space-y-3 text-left max-w-lg mx-auto pt-2">
                <h4 className="font-serif-title font-bold text-sm text-[#1F3A4D]">Expert Explanation & Breakdown:</h4>
                {questions.map((q, idx) => {
                  const isCorrect = selectedAnswers[q.id] === q.correctIndex;
                  return (
                    <div key={q.id} className={`p-3 rounded-2xl border text-xs ${
                      isCorrect ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' : 'bg-rose-50/70 border-rose-200 text-rose-950'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5 mb-1">
                        <span>{isCorrect ? '✓' : '✗'} Part {String.fromCharCode(65 + idx)}</span>
                      </div>
                      <p className="opacity-90 leading-relaxed">{q.explanation}</p>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={onClose}
                className="w-full max-w-xs mx-auto py-3 rounded-xl bg-[#1F3A4D] hover:bg-[#152734] text-white font-bold text-sm shadow-md transition"
              >
                Return to Map
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
