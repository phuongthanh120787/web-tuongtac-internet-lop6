import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Bot, 
  User, 
  Sparkles, 
  ShieldAlert, 
  Info,
  Globe,
  Laptop,
  Award
} from 'lucide-react';
import { TEACHER_INFO, answerQuestionFromLesson } from '../data/lessonData';
import { SuggestedQuestions } from './SuggestedQuestions';
import { InteractiveSingleQuiz } from './InteractiveSingleQuiz';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isOutOfScope?: boolean;
}

interface ChatBoxProps {
  onOpenLesson: () => void;
  initialQuestion?: string | null;
  onClearInitialQuestion?: () => void;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ 
  onOpenLesson, 
  initialQuestion, 
  onClearInitialQuestion 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Chào các em học sinh lớp 6! 👋

Cô là **Trợ lý Tin học 6**, giúp các em ôn tập bài học **"Internet"** theo tài liệu giảng dạy của cô **${TEACHER_INFO.teacherName}** (${TEACHER_INFO.schoolName}).

✨ Các em có thể bấm vào **4 câu hỏi gợi ý** ở dưới hoặc gõ câu hỏi vào ô bên dưới rồi bấm **"Hỏi"** để ôn bài nhé!

🔒 *Lưu ý an toàn: Trợ lý chỉ trả lời kiến thức trong bài học và tuyệt đối không hỏi bất kỳ thông tin cá nhân nào của các em.*`,
      timestamp: 'Bắt đầu phiên học',
    },
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [showSingleQuiz, setShowSingleQuiz] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle incoming initialQuestion from other tabs
  useEffect(() => {
    if (initialQuestion && initialQuestion.trim()) {
      handleSubmitQuestion(initialQuestion);
      onClearInitialQuestion?.();
    }
  }, [initialQuestion]);

  // Handle Text-to-Speech
  const handleToggleSpeak = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt của em chưa hỗ trợ giọng đọc âm thanh.');
      return;
    }

    if (speakingId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown characters for pleasant speech
    const cleanText = text
      .replace(/[*#_~`]/g, '')
      .replace(/🌐|⭐|🚀|📝|💻|👋|✨|🔒/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95; // Slightly slower for clear 6th-grade comprehension

    utterance.onend = () => {
      setSpeakingId(null);
    };

    utterance.onerror = () => {
      setSpeakingId(null);
    };

    setSpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Handle Copy answer
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Reset conversation
  const handleResetChat = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'assistant',
        text: `Phiên học đã được làm mới! Các em hãy chọn một câu hỏi gợi ý hoặc nhập câu hỏi về bài "Internet" để cô hỗ trợ nhé.`,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Submit question
  const handleSubmitQuestion = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    // If the student specifically asked for multiple-choice quiz
    const lower = trimmed.toLowerCase();
    if (lower.includes('trắc nghiệm') || lower.includes('thử trắc nghiệm') || lower.includes('quiz')) {
      setShowSingleQuiz(true);
    }

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      // Call server backend
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: trimmed }),
      });

      if (!response.ok) {
        throw new Error('Mạng bị lỗi');
      }

      const data = await response.json();
      const rawAnswer = data.answer || TEACHER_INFO.outOfScopeResponse;
      const isOutOfScope = rawAnswer.includes('chưa có trong nội dung bài học');

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: rawAnswer,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isOutOfScope,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      // Offline/Local deterministic fallback
      console.warn('API error, using local curriculum fallback:', err);
      const fallbackAnswer = answerQuestionFromLesson(trimmed);
      const isOutOfScope = fallbackAnswer.includes('chưa có trong nội dung bài học');

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: fallbackAnswer,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isOutOfScope,
      };

      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Format message text with bold and line breaks
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Process bold markers like **bold**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className={`${line.trim() === '' ? 'h-2' : 'min-h-[1.25rem] leading-relaxed'}`}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-slate-900">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={pIdx}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-145px)] min-h-[550px] max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-200/90 overflow-hidden">
      {/* Chat header toolbar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <span>Hộp Thoại Ôn Tập Tin Học 6</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
              Chỉ trả lời đúng tài liệu bài học của cô Phương Thanh
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowSingleQuiz((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-950 bg-gradient-to-r from-amber-200 to-amber-300 hover:from-amber-300 hover:to-amber-400 border border-amber-400/80 px-3 py-1.5 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Award className="w-3.5 h-3.5 text-amber-800" />
            <span>Thử câu hỏi trắc nghiệm</span>
          </button>

          <button
            type="button"
            onClick={onOpenLesson}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-lg transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Xem bài học</span>
          </button>

          <button
            type="button"
            onClick={handleResetChat}
            className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg transition-colors"
            title="Làm mới cuộc trò chuyện"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Làm mới</span>
          </button>
        </div>
      </div>

      {/* Message stream container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-white via-slate-50/40 to-slate-50/70">
        {/* Interactive Single Quiz Widget when toggled or requested */}
        {showSingleQuiz && (
          <div className="animate-fadeIn">
            <InteractiveSingleQuiz onClose={() => setShowSingleQuiz(false)} />
          </div>
        )}
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-2xl flex items-center justify-center shadow-xs ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : msg.isOutOfScope
                    ? 'bg-amber-500 text-white'
                    : 'bg-gradient-to-tr from-indigo-600 to-blue-500 text-white'
                }`}
              >
                {isUser ? (
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : msg.isOutOfScope ? (
                  <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </div>

              {/* Message Content */}
              <div className={`flex flex-col max-w-[85%] sm:max-w-[78%] ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`relative px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl text-xs sm:text-sm font-medium ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-xs shadow-xs'
                      : msg.isOutOfScope
                      ? 'bg-amber-50 text-amber-950 border border-amber-200/80 rounded-tl-xs shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-xs'
                  }`}
                >
                  {/* Warning banner for out of scope */}
                  {msg.isOutOfScope && (
                    <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs mb-2 pb-1.5 border-b border-amber-200">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                      <span>Thông báo từ quy định bài học</span>
                    </div>
                  )}

                  <div className="space-y-1">{renderFormattedText(msg.text)}</div>

                  {/* Actions for assistant messages */}
                  {!isUser && (
                    <div className="mt-3 pt-2 flex items-center justify-between gap-2 border-t border-slate-100 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 font-semibold text-indigo-600">
                        <Sparkles className="w-3 h-3" /> Tin học 6
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleToggleSpeak(msg.id, msg.text)}
                          className={`p-1 rounded-md transition-colors ${
                            speakingId === msg.id
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'hover:bg-slate-100 text-slate-500 hover:text-slate-700'
                          }`}
                          title={speakingId === msg.id ? 'Dừng đọc' : 'Nghe đọc câu trả lời'}
                        >
                          {speakingId === msg.id ? (
                            <VolumeX className="w-3.5 h-3.5 text-red-500" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="p-1 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
                          title="Sao chép nội dung"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            </div>
          );
        })}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-2xl bg-indigo-600 text-white flex items-center justify-center animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-xs shadow-xs flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">
                Cô trợ lý đang tra cứu bài học...
              </span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Quick Tray */}
      <div className="px-4 py-2 bg-slate-50/90 border-t border-slate-100">
        <SuggestedQuestions
          disabled={isLoading}
          onSelectQuestion={(q) => handleSubmitQuestion(q)}
          onOpenSingleQuiz={() => setShowSingleQuiz(true)}
        />
      </div>

      {/* Chat input box */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitQuestion(inputQuestion);
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              disabled={isLoading}
              placeholder="Nhập câu hỏi về bài Internet... (Ví dụ: Internet là gì?)"
              className="w-full px-4 py-3 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium rounded-2xl border border-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-3 focus:ring-indigo-100 transition-all disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={!inputQuestion.trim() || isLoading}
            className="flex items-center justify-center gap-1.5 px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-sm shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex-shrink-0"
          >
            <span>Hỏi</span>
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Safety & Educational Footnote */}
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-indigo-500" />
            <Laptop className="w-3 h-3 text-blue-500" />
            <span>Môn Tin học 6 • THCS Quang Trung</span>
          </div>
          <span className="hidden sm:inline text-slate-400">
            Cô Bùi Thị Phương Thanh
          </span>
        </div>
      </div>
    </div>
  );
};
