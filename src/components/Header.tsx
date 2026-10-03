import React from 'react';
import { Globe, Laptop, ShieldCheck, BookOpen, MessageSquare, Award } from 'lucide-react';
import { TEACHER_INFO } from '../data/lessonData';

interface HeaderProps {
  activeTab: 'chat' | 'lesson' | 'quiz';
  setActiveTab: (tab: 'chat' | 'lesson' | 'quiz') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-indigo-100 shadow-xs">
      {/* Top micro banner: School & Safety Assurance */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center bg-white/20 rounded-full px-2 py-0.5 text-[11px] font-bold tracking-wide">
              {TEACHER_INFO.schoolName}
            </span>
            <span className="hidden sm:inline text-white/90">
              Giáo viên: <strong className="text-white font-bold">{TEACHER_INFO.teacherName}</strong>
            </span>
            <span className="text-white/70 hidden md:inline">•</span>
            <span className="hidden md:inline text-white/90">Môn: <strong>{TEACHER_INFO.subject}</strong></span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-200 bg-emerald-950/20 px-2 py-0.5 rounded-full text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span className="font-semibold text-white">An toàn tuyệt đối:</span>
            <span className="text-white/90">Không thu thập bất kỳ thông tin cá nhân nào</span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo and title */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-indigo-500/20">
            <Globe className="w-6 h-6 animate-spin-slow" />
            <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-900 rounded-full p-0.5 border-2 border-white shadow-xs">
              <Laptop className="w-3.5 h-3.5 text-slate-800" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
                TRỢ LÝ INTERNET – TIN HỌC 6
              </h1>
              <span className="bg-indigo-100 text-indigo-700 text-[11px] font-bold px-2 py-0.5 rounded-full">
                Lớp 6
              </span>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <span>Ôn tập bài học cùng cô</span>
              <span className="text-indigo-600 font-semibold">{TEACHER_INFO.teacherName}</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600">{TEACHER_INFO.schoolName}</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto justify-center">
          <button
            type="button"
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'chat'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Hỏi Trợ Lý</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('lesson')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'lesson'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Nội Dung Bài Học</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'quiz'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Award className="w-4 h-4 text-amber-500" />
            <span>Luyện Tập (Quiz)</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
