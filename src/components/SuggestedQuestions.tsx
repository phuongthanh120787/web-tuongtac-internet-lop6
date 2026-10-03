import React from 'react';
import { Globe, Sparkles, Laptop, BookmarkCheck, ArrowRight } from 'lucide-react';
import { SUGGESTED_QUESTIONS } from '../data/lessonData';

interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void;
  onOpenSingleQuiz?: () => void;
  disabled?: boolean;
}

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({
  onSelectQuestion,
  onOpenSingleQuiz,
  disabled = false,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-5 h-5 text-blue-500" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-indigo-500" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-emerald-500" />;
      case 'BookmarkCheck':
        return <BookmarkCheck className="w-5 h-5 text-amber-500" />;
      default:
        return <Globe className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3 sm:p-4 shadow-xs space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
          <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700">
            4 Câu Hỏi Gợi Ý Bấm Nhanh
          </h3>
        </div>

        {onOpenSingleQuiz && (
          <button
            type="button"
            disabled={disabled}
            onClick={onOpenSingleQuiz}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <span>🎯 Thử câu hỏi trắc nghiệm</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {SUGGESTED_QUESTIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelectQuestion(item.query)}
            className="group relative flex items-center justify-between text-left p-3 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/5 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center transition-colors">
                <span className="text-xs font-black text-slate-500 group-hover:text-indigo-600">
                  {item.id}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  {getIcon(item.icon)}
                  <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {item.query}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  Chủ đề: {item.category}
                </span>
              </div>
            </div>

            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
