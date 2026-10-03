import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { LESSON_CONTENT_TEXT, TEACHER_INFO, answerQuestionFromLesson } from './src/data/lessonData';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Setup Gemini SDK if API key is provided
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // System instruction for Gemini model with strict guardrails
  const SYSTEM_INSTRUCTION = `
Bạn là "TRỢ LÝ INTERNET – TIN HỌC 6", hỗ trợ học sinh lớp 6 trường THCS Quang Trung ôn tập bài học "Internet" do cô Bùi Thị Phương Thanh giảng dạy.

NỘI DUNG TÀI LIỆU BÀI HỌC CHÍNH THỨC DUY NHẤT:
${LESSON_CONTENT_TEXT}

QUY TẮC BẮT BUỘC TUYỆT ĐỐI (KHÔNG ĐƯỢC PHÉP VI PHẠM):
1. Bạn CHỈ được trả lời dựa trên nội dung bài học được cung cấp ở trên.
2. Tuyệt đối KHÔNG được tự suy luận hoặc bổ sung kiến thức ngoài tài liệu.
3. Nếu câu hỏi KHÔNG CÓ THÔNG TIN trong tài liệu trên (ví dụ: câu hỏi về toán học, địa lý, người nổi tiếng, kiến thức công nghệ ngoài bài, trò chơi, cuộc sống riêng tư...), bạn PHẢI trả lời DUY NHẤT câu sau:
"Câu hỏi này chưa có trong nội dung bài học. Em hãy xem lại tài liệu hoặc hỏi giáo viên."
4. KHÔNG yêu cầu học sinh cung cấp: họ tên, số điện thoại, email, địa chỉ, mật khẩu hay bất kì thông tin cá nhân nào.
5. Giọng điệu thân thiện, trong sáng, ngắt dòng rõ ràng, gạch đầu dòng dễ nhìn, phù hợp với học sinh lớp 6.
6. Nếu học sinh chào hỏi thông thường, hãy chào lại thân thiện và mời em hỏi về bài học "Internet".
`;

  // API endpoint for chat
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { question } = req.body;
      if (!question || typeof question !== 'string' || !question.trim()) {
        return res.status(400).json({ error: 'Câu hỏi không được để trống.' });
      }

      const cleanQuestion = question.trim();

      // Check if we can directly answer using exact pattern matching for zero latency
      // This is ideal for common questions or when offline
      const directAnswer = answerQuestionFromLesson(cleanQuestion);
      const isKnownQuestion = directAnswer !== TEACHER_INFO.outOfScopeResponse;

      // If Gemini is available, use it for natural phrasing while strictly adhering to the lesson
      if (ai) {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: cleanQuestion,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.2, // Low temperature for high adherence to lesson facts
            },
          });

          const answerText = response.text?.trim();
          if (answerText) {
            return res.json({ answer: answerText });
          }
        } catch (apiError) {
          console.error('Gemini API call failed, falling back to curriculum rules:', apiError);
          // Fall back to rule-based engine
          return res.json({ answer: directAnswer });
        }
      }

      // If no AI key or AI failed, use curriculum matcher
      return res.json({ answer: directAnswer });
    } catch (err: any) {
      console.error('Server error in /api/chat:', err);
      // Even in error, return safe fallback
      return res.json({
        answer: TEACHER_INFO.outOfScopeResponse,
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(apiKey),
      school: 'THCS Quang Trung',
      teacher: 'Bùi Thị Phương Thanh',
    });
  });

  // Mount Vite or static files
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Educational App listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
