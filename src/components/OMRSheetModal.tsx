import React from 'react';
import { X, CheckCircle2, Bookmark, Flag, Sparkles } from 'lucide-react';
import { UPSCPYQuestion } from '../types';

interface OMRSheetModalProps {
  questions: UPSCPYQuestion[];
  userAnswers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  flaggedQuestions: Set<string>;
  currentIndex: number;
  onSelectQuestion: (index: number) => void;
  onBubbleAnswer: (questionId: string, option: 'A' | 'B' | 'C' | 'D') => void;
  onClose: () => void;
  onSubmitExam: () => void;
}

export const OMRSheetModal: React.FC<OMRSheetModalProps> = ({
  questions,
  userAnswers,
  flaggedQuestions,
  currentIndex,
  onSelectQuestion,
  onBubbleAnswer,
  onClose,
  onSubmitExam
}) => {
  const attemptedCount = Object.keys(userAnswers).length;
  const flaggedCount = flaggedQuestions.size;
  const unattemptedCount = questions.length - attemptedCount;

  return (
    <div className="fixed inset-0 z-50 bg-[#1F3A4D]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] rounded-[28px] border-2 border-[#1F3A4D]/25 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#1F3A4D] animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#1F3A4D]/10 bg-gradient-to-r from-[#FAF5EE] via-[#FFFDF9] to-[#F5ECE0] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1F3A4D] text-white flex items-center justify-center font-bold text-base shadow-sm">
              📝
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#E07A3F] block">
                UPSC Civil Services Prelims
              </span>
              <h3 className="font-serif-title font-bold text-base sm:text-lg text-[#1F3A4D]">
                Digital OMR Answer Sheet
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1F3A4D]/5 hover:bg-[#1F3A4D]/15 flex items-center justify-center text-[#1F3A4D] transition"
            title="Close OMR Sheet"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Counter Pills */}
        <div className="px-5 py-3 bg-[#FAF7F0] border-b border-[#1F3A4D]/10 flex items-center justify-between flex-wrap gap-2 text-xs font-semibold">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-800">
              <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
              <span>Attempted: <strong>{attemptedCount}</strong></span>
            </span>
            <span className="flex items-center gap-1.5 text-amber-800">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span>Flagged: <strong>{flaggedCount}</strong></span>
            </span>
            <span className="flex items-center gap-1.5 text-[#1F3A4D]/60">
              <span className="w-3 h-3 rounded-full border-2 border-[#1F3A4D]/40 inline-block" />
              <span>Unattempted: <strong>{unattemptedCount}</strong></span>
            </span>
          </div>

          <span className="text-[11px] font-mono font-bold text-[#E07A3F]">
            Penalty: -0.66 per error
          </span>
        </div>

        {/* Scrollable OMR Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {questions.map((q, idx) => {
              const selectedOpt = userAnswers[q.id];
              const isFlagged = flaggedQuestions.has(q.id);
              const isCurrent = currentIndex === idx;

              return (
                <div
                  key={q.id}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
                    isCurrent
                      ? 'bg-amber-50/80 border-[#E07A3F] shadow-xs ring-2 ring-[#E07A3F]/20'
                      : selectedOpt
                      ? 'bg-emerald-50/50 border-emerald-300'
                      : 'bg-white border-[#1F3A4D]/10 hover:border-[#1F3A4D]/30'
                  }`}
                >
                  {/* Question Number & Quick Jump */}
                  <div
                    onClick={() => {
                      onSelectQuestion(idx);
                      onClose();
                    }}
                    className="flex items-center gap-2 cursor-pointer group"
                    title={`Jump to Question ${idx + 1}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-[#1F3A4D]/10 group-hover:bg-[#1F3A4D] group-hover:text-white flex items-center justify-center font-mono font-bold text-xs transition">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-[#1F3A4D]/60 block leading-tight truncate">
                        {q.year} · {q.themeLabel.split('&')[0].trim()}
                      </span>
                    </div>
                  </div>

                  {/* OMR Bubbles A, B, C, D */}
                  <div className="flex items-center gap-1.5">
                    {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                      const isBubbled = selectedOpt === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => onBubbleAnswer(q.id, opt)}
                          className={`w-7 h-7 rounded-full text-xs font-bold font-mono flex items-center justify-center transition active:scale-90 border ${
                            isBubbled
                              ? 'bg-[#1F3A4D] text-white border-[#1F3A4D] shadow-inner font-extrabold ring-2 ring-emerald-500/50'
                              : 'bg-white text-[#1F3A4D] border-[#1F3A4D]/30 hover:border-[#E07A3F] hover:bg-amber-50/50'
                          }`}
                          title={`Select option ${opt}`}
                        >
                          {opt}
                        </button>
                      );
                    })}

                    {isFlagged && (
                      <span className="text-amber-600 text-xs ml-1" title="Flagged for review">
                        🚩
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer with Submit Button */}
        <div className="p-4 sm:p-5 border-t border-[#1F3A4D]/10 bg-white flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-[#1F3A4D]/20 text-[#1F3A4D] font-bold text-xs hover:bg-black/5 transition"
          >
            Back to Question
          </button>

          <button
            onClick={() => {
              onClose();
              onSubmitExam();
            }}
            className="px-6 py-2.5 rounded-xl bg-[#E07A3F] hover:bg-[#d46a30] active:scale-95 text-white font-bold text-xs flex items-center gap-2 shadow-md transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Submit Official OMR Test ({attemptedCount}/{questions.length})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
