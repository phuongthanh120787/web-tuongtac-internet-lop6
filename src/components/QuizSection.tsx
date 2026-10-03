import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  MessageSquare,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/lessonData';

interface QuizSectionProps {
  onAskQuestion: (question: string) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ onAskQuestion }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const score = calculateScore();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-7 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Award className="w-5 h-5 text-amber-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
              Góc Luyện Tập Vui Vẻ
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Trắc Nghiệm Nhanh: Bài Học Internet
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 mt-1">
            5 câu hỏi trắc nghiệm kiểm tra nhanh mức độ hiểu bài của em!
          </p>
        </div>

        {/* Score pill or status */}
        <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl flex items-center gap-3">
          <div className="text-center">
            <span className="text-xs text-purple-200 font-semibold block">Đã làm</span>
            <span className="text-lg font-black text-white">{answeredCount}/5</span>
          </div>
          {submitted && (
            <div className="border-l border-white/20 pl-3 text-center">
              <span className="text-xs text-amber-300 font-bold block">Điểm số</span>
              <span className="text-lg font-black text-amber-300">{score}/5 ⭐</span>
            </div>
          )}
        </div>
      </div>

      {/* Submitted results summary banner */}
      {submitted && (
        <div
          className={`p-5 rounded-2xl border ${
            score >= 4
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          } flex flex-col sm:flex-row items-center justify-between gap-3`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${score >= 4 ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base">
                {score === 5
                  ? 'Xuất sắc! Em đã nắm vững 100% bài học!'
                  : score >= 3
                  ? 'Rất tốt! Em đã hiểu bài khá chắc chắn.'
                  : 'Em hãy đọc lại tài liệu bài học của cô giáo và làm lại nhé!'}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Em đạt được <strong>{score}/5</strong> điểm trắc nghiệm.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetQuiz}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm lại bài</span>
          </button>
        </div>
      )}

      {/* Questions list */}
      <div className="space-y-4">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const selected = selectedAnswers[q.id];
          const isCorrect = submitted && selected === q.correctAnswer;
          const isWrong = submitted && selected !== undefined && selected !== q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs transition-all ${
                submitted
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : isWrong
                    ? 'border-red-300 bg-red-50/20'
                    : 'border-slate-200'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 font-extrabold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {q.question}
                  </h4>
                </div>

                {submitted && (
                  <div>
                    {isCorrect && (
                      <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đúng
                      </span>
                    )}
                    {isWrong && (
                      <span className="inline-flex items-center gap-1 text-red-600 text-xs font-bold bg-red-50 px-2 py-0.5 rounded-full">
                        <XCircle className="w-3.5 h-3.5" /> Sai
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2 mt-2">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selected === optIdx;
                  const isThisCorrect = q.correctAnswer === optIdx;

                  let optClass = 'border-slate-200 bg-slate-50/60 hover:bg-indigo-50/50 hover:border-indigo-200 text-slate-700';

                  if (isThisSelected) {
                    optClass = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold ring-2 ring-indigo-200';
                  }

                  if (submitted) {
                    if (isThisCorrect) {
                      optClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-200';
                    } else if (isThisSelected && !isThisCorrect) {
                      optClass = 'border-red-400 bg-red-50 text-red-950 font-medium ring-2 ring-red-200';
                    } else {
                      optClass = 'border-slate-200 opacity-60 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${optClass}`}
                    >
                      <span>{opt}</span>
                      {submitted && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-2" />
                      )}
                      {submitted && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation when submitted */}
              {submitted && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                    <span><strong>Giải thích:</strong> {q.explanation}</span>
                  </div>

                  {isWrong && (
                    <button
                      type="button"
                      onClick={() => onAskQuestion(q.question)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-1 rounded-md transition-colors"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Hỏi cô về câu này</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3 pt-2">
        {!submitted ? (
          <button
            type="button"
            disabled={answeredCount === 0}
            onClick={() => setSubmitted(true)}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-sm rounded-2xl shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            Nộp bài chấm điểm ({answeredCount}/5)
          </button>
        ) : (
          <button
            type="button"
            onClick={handleResetQuiz}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm rounded-2xl shadow-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Làm lại trắc nghiệm</span>
          </button>
        )}
      </div>
    </div>
  );
};
