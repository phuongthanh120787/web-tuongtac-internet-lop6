import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  Award,
  BookOpen,
  Volume2
} from 'lucide-react';
import { QUIZ_QUESTIONS, QuizItem } from '../data/lessonData';

interface InteractiveSingleQuizProps {
  onClose?: () => void;
  onAskInChat?: (text: string) => void;
}

export const InteractiveSingleQuiz: React.FC<InteractiveSingleQuizProps> = ({
  onClose,
  onAskInChat,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState<number[]>([]); // Track wrong attempts so they can be greyed out if desired, but NOT reveal the correct one

  const currentQuestion: QuizItem = QUIZ_QUESTIONS[currentIdx % QUIZ_QUESTIONS.length];

  const handleSelectOption = (idx: number) => {
    if (isAnswered && selectedOption === currentQuestion.correctAnswer) {
      return; // Already answered correctly
    }

    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx !== currentQuestion.correctAnswer) {
      if (!wrongAttempts.includes(idx)) {
        setWrongAttempts((prev) => [...prev, idx]);
      }
    }
  };

  const handleRetry = () => {
    // Reset selected option and answered state so student can try again
    // Crucial: We do NOT reveal which one is the correct answer!
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setWrongAttempts([]);
    setCurrentIdx((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
  };

  const isCorrect = isAnswered && selectedOption === currentQuestion.correctAnswer;
  const isWrong = isAnswered && selectedOption !== null && selectedOption !== currentQuestion.correctAnswer;

  return (
    <div className="bg-white rounded-2xl border-2 border-indigo-200 p-4 sm:p-5 shadow-sm space-y-4">
      {/* Quiz Top bar */}
      <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-xs">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-indigo-700">
                Thử Câu Hỏi Trắc Nghiệm
              </span>
              <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Câu {((currentIdx % QUIZ_QUESTIONS.length) + 1)}/{QUIZ_QUESTIONS.length}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Kiểm tra nhanh kiến thức bài "Internet"
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors font-semibold"
          >
            Đóng
          </button>
        )}
      </div>

      {/* Question Content */}
      <div className="bg-slate-50/80 rounded-xl p-3 sm:p-4 border border-slate-200">
        <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
          {currentQuestion.question}
        </h4>
      </div>

      {/* 4 Options: A, B, C, D */}
      <div className="space-y-2">
        {currentQuestion.options.map((optionText, optIdx) => {
          const isThisSelected = selectedOption === optIdx;
          const hasTriedAndWasWrong = wrongAttempts.includes(optIdx);

          let buttonStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';

          if (isAnswered) {
            if (isThisSelected) {
              if (isCorrect) {
                // Correct answer: highlight vibrant green
                buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-300';
              } else {
                // Wrong answer selected: highlight soft red
                buttonStyle = 'border-rose-400 bg-rose-50 text-rose-950 font-semibold ring-2 ring-rose-200';
              }
            } else if (hasTriedAndWasWrong) {
              // Previously attempted wrong answer: muted so student doesn't repeat
              buttonStyle = 'border-slate-200 bg-slate-100 text-slate-400 line-through opacity-70';
            }
          }

          return (
            <button
              key={optIdx}
              type="button"
              disabled={isCorrect || hasTriedAndWasWrong}
              onClick={() => handleSelectOption(optIdx)}
              className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed ${buttonStyle}`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${
                  isThisSelected && isCorrect
                    ? 'bg-emerald-600 text-white'
                    : isThisSelected && isWrong
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="leading-snug">{optionText}</span>
              </div>

              {isAnswered && isThisSelected && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 ml-2" />
              )}
              {isAnswered && isThisSelected && isWrong && (
                <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* FEEDBACK SECTION */}
      {/* 1. When CORRECT: Positive feedback & Explanation */}
      {isCorrect && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-950 space-y-2.5 animate-fadeIn">
          <div className="flex items-center gap-2 font-black text-sm text-emerald-800">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{currentQuestion.positiveFeedback}</span>
          </div>

          <div className="text-xs sm:text-sm leading-relaxed text-emerald-900 bg-white/70 p-3 rounded-lg border border-emerald-100">
            <strong className="block text-emerald-800 mb-0.5">📖 Giải thích bài học:</strong>
            {currentQuestion.explanation}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-emerald-700 font-medium">
              Em đã hoàn thành xuất sắc câu hỏi này!
            </span>
            <button
              type="button"
              onClick={handleNextQuestion}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <span>Thử câu hỏi khác</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. When WRONG: Hint & Allow Retry WITHOUT revealing the answer */}
      {isWrong && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-950 space-y-2.5 animate-fadeIn">
          <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-800">
            <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Chưa chính xác rồi em ơi! Em hãy đọc gợi ý dưới đây và thử lại nhé:</span>
          </div>

          <div className="text-xs sm:text-sm leading-relaxed text-amber-900 bg-white/80 p-3 rounded-lg border border-amber-200">
            <span className="font-semibold text-amber-800">{currentQuestion.hint}</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-amber-700 font-medium">
              (Đáp án đúng chưa được tiết lộ, em hãy suy nghĩ kỹ nhé!)
            </span>

            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại câu này</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
