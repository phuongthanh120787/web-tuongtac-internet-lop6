import React, { useState } from 'react';
import { 
  Globe, 
  Sparkles, 
  Laptop, 
  BookmarkCheck, 
  Search, 
  BookOpen, 
  MessageSquare,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { LESSON_SECTIONS, TEACHER_INFO } from '../data/lessonData';

interface LessonReferenceProps {
  onAskQuestion: (question: string) => void;
}

export const LessonReference: React.FC<LessonReferenceProps> = ({ onAskQuestion }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSections = LESSON_SECTIONS.filter((sec) =>
    sec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sec.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sec.points.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-5 h-5 text-blue-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-indigo-600" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-emerald-600" />;
      case 'BookmarkCheck':
        return <BookmarkCheck className="w-5 h-5 text-amber-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-indigo-600" />;
    }
  };

  const getQuestionForSection = (id: string) => {
    switch (id) {
      case 'concept':
        return 'Internet là gì?';
      case 'features':
        return 'Internet có những đặc điểm nào?';
      case 'usage':
        return 'Internet được sử dụng để làm gì?';
      case 'takeaway':
        return 'Em cần ghi nhớ điều gì sau bài học?';
      default:
        return 'Internet là gì?';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner introduction */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                Sách Giáo Khoa Tin Học 6
              </span>
              <span className="bg-emerald-400 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full">
                Chính thức
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Tài Liệu Ôn Tập Bài "Internet"
            </h2>
            <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-xl font-medium">
              Biên soạn bởi cô <strong>{TEACHER_INFO.teacherName}</strong> – {TEACHER_INFO.schoolName}. 
              Toàn bộ câu trả lời của trợ lý đều bám sát 100% nội dung tài liệu chuẩn này.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end gap-2 bg-white/10 p-3 rounded-2xl backdrop-blur-xs">
            <GraduationCap className="w-6 h-6 text-amber-300" />
            <span className="text-xs font-bold text-white text-right">Môn Tin Học 6</span>
          </div>
        </div>

        {/* Search input */}
        <div className="mt-5 relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm kiến thức trong bài học..."
            className="w-full pl-10 pr-4 py-2.5 bg-white text-slate-900 placeholder:text-slate-400 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-xs"
          />
        </div>
      </div>

      {/* Sections list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSections.map((sec) => (
          <div
            key={sec.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
                    {getSectionIcon(sec.icon)}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {sec.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs font-semibold text-indigo-600 mb-3 bg-indigo-50/80 px-2.5 py-1 rounded-lg">
                {sec.summary}
              </p>

              <ul className="space-y-2 mb-4">
                {sec.points.map((point, pIdx) => (
                  <li key={pIdx} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Trọng tâm ôn thi</span>
              <button
                type="button"
                onClick={() => onAskQuestion(getQuestionForSection(sec.id))}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Hỏi trợ lý về mục này</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bonus Knowledge Box: ISP & Mạng máy tính */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">
            Thuật Ngữ Bổ Trợ Quan Trọng Trong Bài
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200">
            <strong className="text-indigo-600 font-bold block mb-1">
              ISP (Internet Service Provider):
            </strong>
            <p className="text-slate-600 text-xs leading-relaxed">
              Nhà cung cấp dịch vụ Internet (như VNPT, Viettel, FPT...), là đơn vị kết nối máy tính của người dùng vào hệ thống mạng Internet toàn cầu.
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200">
            <strong className="text-indigo-600 font-bold block mb-1">
              Mạng máy tính (Computer Network):
            </strong>
            <p className="text-slate-600 text-xs leading-relaxed">
              Là hai hoặc nhiều máy tính được kết nối với nhau để trao đổi dữ liệu và chia sẻ tài nguyên (như máy in, dữ liệu, phần mềm).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
