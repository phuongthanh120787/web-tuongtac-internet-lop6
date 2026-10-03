import React, { useState } from 'react';
import { Header } from './components/Header';
import { ChatBox } from './components/ChatBox';
import { LessonReference } from './components/LessonReference';
import { QuizSection } from './components/QuizSection';
import { ShieldCheck, Heart, Sparkles, Globe, Laptop } from 'lucide-react';
import { TEACHER_INFO } from './data/lessonData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'lesson' | 'quiz'>('chat');
  const [autoQuestion, setAutoQuestion] = useState<string | null>(null);

  const handleAskQuestionFromOutside = (question: string) => {
    setActiveTab('chat');
    setAutoQuestion(question);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-['Nunito',sans-serif] text-slate-800">
      {/* Top Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-4 sm:py-6">
        {activeTab === 'chat' && (
          <div className="animate-fadeIn">
            <ChatBox 
              onOpenLesson={() => setActiveTab('lesson')}
              initialQuestion={autoQuestion}
              onClearInitialQuestion={() => setAutoQuestion(null)}
            />
          </div>
        )}

        {activeTab === 'lesson' && (
          <div className="animate-fadeIn">
            <LessonReference onAskQuestion={handleAskQuestionFromOutside} />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="animate-fadeIn">
            <QuizSection onAskQuestion={handleAskQuestionFromOutside} />
          </div>
        )}
      </main>

      {/* Educational Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200/80 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 font-bold text-indigo-600">
              <Globe className="w-4 h-4" />
              <span>TRỢ LÝ INTERNET – TIN HỌC 6</span>
            </div>
            <span>•</span>
            <span>Trường THCS Quang Trung</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Cô Bùi Thị Phương Thanh</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-medium text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cam kết an toàn: Không yêu cầu hay thu thập bất kì thông tin cá nhân nào</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
