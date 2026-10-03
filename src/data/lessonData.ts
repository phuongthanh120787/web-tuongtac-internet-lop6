/**
 * Tài liệu học tập chính thức môn Tin học 6 - Bài: "Internet"
 * Giáo viên: Bùi Thị Phương Thanh
 * Trường: THCS Quang Trung
 */

export interface LessonSection {
  id: string;
  title: string;
  icon: string;
  summary: string;
  points: string[];
}

export const TEACHER_INFO = {
  teacherName: "Bùi Thị Phương Thanh",
  schoolName: "Trường THCS Quang Trung",
  subject: "Tin học 6",
  topic: "Bài học: Internet",
  targetAudience: "Học sinh lớp 6",
  outOfScopeResponse: "Câu hỏi này chưa có trong nội dung bài học. Em hãy xem lại tài liệu hoặc hỏi giáo viên.",
};

export const LESSON_CONTENT_TEXT = `
BÀI HỌC: INTERNET (TIN HỌC 6)
Giáo viên: Bùi Thị Phương Thanh - Trường THCS Quang Trung.

1. KHÁI NIỆM INTERNET:
- Internet là mạng liên kết các mạng máy tính trên phạm vi toàn cầu.
- Các máy tính hoặc mạng máy tính có thể kết nối vào Internet thông qua nhà cung cấp dịch vụ Internet (viết tắt là ISP - Internet Service Provider).
- Người sử dụng Internet có thể tiếp cận và chia sẻ thông tin một cách nhanh chóng, thuận tiện, không phụ thuộc vào vị trí địa lí hay khoảng cách không gian.

2. CÁC ĐẶC ĐIỂM CHÍNH CỦA INTERNET:
- Quy mô toàn cầu: Phủ khắp thế giới, kết nối hàng triệu mạng máy tính và thiết bị thông minh của các cơ quan, trường học, gia đình, cá nhân.
- Không có chủ sở hữu: Không có bất kì cá nhân, tổ chức hay cơ quan nào làm chủ sở hữu toàn bộ mạng Internet. Mỗi mạng thành phần do một tổ chức hoặc cá nhân quản lí độc lập.
- Bình đẳng và mở: Mọi người đều có quyền tham gia, truy cập và chia sẻ thông tin theo quy định.
- Giao tiếp nhanh chóng, thuận tiện: Cung cấp phương thức truyền tải thông tin (văn bản, âm thanh, hình ảnh, video) gần như tức thời.
- Kho thông tin khổng lồ: Là kho tài nguyên tri thức khổng lồ và không ngừng được cập nhật, phát triển từng giây.

3. INTERNET ĐƯỢC SỬ DỤNG ĐỂ LÀM GÌ? (LỢI ÍCH VÀ ỨNG DỤNG):
- Giao tiếp, kết nối: Gửi thư điện tử (email), nhắn tin trò chuyện, gọi video, sử dụng mạng xã hội.
- Học tập và nghiên cứu: Tìm kiếm tài liệu ôn tập, học trực tuyến (E-learning), làm bài tập trên mạng, tra cứu từ điển, khám phá tri thức khoa học.
- Cập nhật thông tin, tin tức: Đọc báo điện tử, xem dự báo thời tiết, tra cứu bản đồ, tin tức xã hội.
- Giải trí: Nghe nhạc, xem phim, chơi trò chơi trực tuyến lành mạnh, đọc truyện tranh, xem video giáo dục.
- Kinh doanh và dịch vụ công: Mua bán hàng hóa qua mạng (thương mại điện tử), thanh toán trực tuyến, làm thủ tục hành chính công qua mạng.

4. ĐIỀU EM CẦN GHI NHỚ SAU BÀI HỌC (TÓM TẮT TRỌNG TÂM):
- Internet là mạng liên kết các mạng máy tính trên quy mô toàn cầu.
- Mạng Internet không thuộc quyền sở hữu của bất kì cá nhân hay tổ chức nào.
- Internet đem lại rất nhiều lợi ích thiết thực cho con người trong học tập, làm việc, giao tiếp và giải trí.
- Học sinh cần sử dụng Internet an toàn, văn minh, phân bổ thời gian hợp lí và tuyệt đối không chia sẻ thông tin cá nhân quan trọng cho người lạ.

5. THUẬT NGỮ BỔ TRỢ TRONG BÀI:
- ISP (Internet Service Provider): Nhà cung cấp dịch vụ Internet (như VNPT, Viettel, FPT...), cung cấp kết nối mạng cho người dùng.
- Mạng máy tính: Tập hợp các máy tính được nối với nhau bằng các thiết bị mạng để trao đổi thông tin và chia sẻ tài nguyên phần cứng, phần mềm.
- Chủ sở hữu Internet: Không có cơ quan nào làm chủ; mỗi mạng thành phần do đơn vị quản lí của mạng đó chịu trách nhiệm.
- Thông tin giáo viên: Cô Bùi Thị Phương Thanh là giáo viên dạy Tin học lớp 6 tại Trường THCS Quang Trung.
`;

export const SUGGESTED_QUESTIONS = [
  {
    id: 1,
    query: "Internet là gì?",
    shortLabel: "Internet là gì?",
    icon: "Globe",
    category: "Khái niệm",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    query: "Internet có những đặc điểm nào?",
    shortLabel: "Đặc điểm của Internet",
    icon: "Sparkles",
    category: "Đặc điểm",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 3,
    query: "Internet được sử dụng để làm gì?",
    shortLabel: "Internet dùng làm gì?",
    icon: "Laptop",
    category: "Ứng dụng",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    query: "Em cần ghi nhớ điều gì sau bài học?",
    shortLabel: "Ghi nhớ sau bài học",
    icon: "BookmarkCheck",
    category: "Ghi nhớ",
    color: "from-amber-500 to-orange-500",
  },
];

// Đáp án chuẩn mực và trực quan cho 4 câu hỏi trọng tâm của bài
export const STANDARD_ANSWERS: Record<string, string> = {
  "internet_la_gi": `🌐 **Theo bài học Tin học 6 của cô Bùi Thị Phương Thanh:**

• **Internet** là mạng liên kết các mạng máy tính trên phạm vi **toàn cầu**.
• Máy tính hoặc mạng máy tính có thể tham gia vào Internet bằng cách kết nối với **nhà cung cấp dịch vụ Internet (ISP)**.
• Nhờ có Internet, người sử dụng có thể tiếp cận và chia sẻ thông tin một cách **nhanh chóng, thuận tiện**, không bị giới hạn bởi khoảng cách địa lí.`,

  "dac_diem_internet": `⭐ **Các đặc điểm chính của mạng Internet gồm có:**

1. **Phủ khắp thế giới (Quy mô toàn cầu):** Kết nối hàng triệu mạng máy tính và thiết bị thông minh trên toàn thế giới.
2. **Không có một chủ sở hữu duy nhất:** Không có bất kì cá nhân, tổ chức hay quốc gia nào làm chủ toàn bộ Internet. Mỗi mạng thành phần do tổ chức hoặc cá nhân quản lí riêng.
3. **Bình đẳng và mở:** Mọi người dùng đều có quyền kết nối, truy cập và chia sẻ thông tin theo quy định.
4. **Giao tiếp thuận tiện, nhanh chóng:** Truyền tải dữ liệu (văn bản, hình ảnh, âm thanh, video) với tốc độ cao, gần như ngay tức thì.
5. **Kho tài nguyên khổng lồ:** Lưu trữ khối lượng thông tin khổng lồ và liên tục được phát triển, cập nhật từng giây.`,

  "dung_de_lam_gi": `🚀 **Internet được sử dụng vào rất nhiều công việc thiết thực hàng ngày:**

• **Giao tiếp, liên lạc:** Gửi thư điện tử (email), nhắn tin, gọi thoại, gọi video, tham gia mạng xã hội.
• **Học tập và nghiên cứu:** Tìm kiếm tài liệu, học bài trực tuyến (E-learning), làm bài tập, tra từ điển và khám phá kiến thức khoa học.
• **Cập nhật thông tin:** Đọc báo điện tử, xem dự báo thời tiết, tra cứu bản đồ, tin tức thời sự.
• **Giải trí lành mạnh:** Nghe nhạc, xem phim, chơi trò chơi điện tử trí tuệ, đọc sách báo.
• **Kinh doanh và dịch vụ công:** Mua sắm qua mạng (thương mại điện tử), thanh toán trực tuyến, làm thủ tục hành chính công.`,

  "ghi_nho_sau_bai_hoc": `📝 **Những điều em cần ghi nhớ sau bài học "Internet":**

1. **Internet** là mạng liên kết các mạng máy tính trên phạm vi **toàn cầu**.
2. **Mạng Internet không thuộc quyền sở hữu** của bất kì cá nhân hay tổ chức nào.
3. Internet mang lại **rất nhiều lợi ích** cho con người trong học tập, làm việc, giao tiếp và giải trí.
4. Khi sử dụng Internet, học sinh cần **an toàn và văn minh**, bảo vệ thông tin cá nhân và sắp xếp thời gian biểu hợp lí.`,
};

export const LESSON_SECTIONS: LessonSection[] = [
  {
    id: "concept",
    title: "1. Khái niệm Internet",
    icon: "Globe",
    summary: "Mạng liên kết các mạng máy tính toàn cầu thông qua ISP.",
    points: [
      "Internet là mạng liên kết các mạng máy tính trên phạm vi toàn cầu.",
      "Người dùng kết nối vào Internet thông qua nhà cung cấp dịch vụ Internet (ISP).",
      "Tiếp cận và chia sẻ thông tin nhanh chóng, tiện lợi, không phụ thuộc vị trí địa lí.",
    ],
  },
  {
    id: "features",
    title: "2. Đặc điểm của Internet",
    icon: "Sparkles",
    summary: "Toàn cầu, không ai sở hữu duy nhất, kho tài nguyên mở khổng lồ.",
    points: [
      "Quy mô toàn cầu, kết nối hàng triệu mạng máy tính trên thế giới.",
      "Không có một tổ chức hay cá nhân nào làm chủ sở hữu Internet.",
      "Bình đẳng, mọi người đều có thể tham gia và chia sẻ thông tin.",
      "Phương thức giao tiếp, truyền tải thuận tiện và nhanh chóng.",
      "Kho tài nguyên thông tin khổng lồ và không ngừng phát triển.",
    ],
  },
  {
    id: "usage",
    title: "3. Ứng dụng & Lợi ích",
    icon: "Laptop",
    summary: "Học tập, giao tiếp, tìm kiếm thông tin, giải trí và kinh doanh.",
    points: [
      "Giao tiếp: Email, nhắn tin, gọi video, mạng xã hội.",
      "Học tập: Tìm kiếm tài liệu, học online, làm bài tập.",
      "Thông tin: Đọc báo, xem thời tiết, tra cứu bản đồ số.",
      "Giải trí: Nghe nhạc, xem phim, trò chơi lành mạnh.",
      "Kinh doanh & Dịch vụ: Mua sắm, thanh toán điện tử.",
    ],
  },
  {
    id: "takeaway",
    title: "4. Em cần ghi nhớ",
    icon: "BookmarkCheck",
    summary: "4 trọng tâm kiến thức bắt buộc phải nhớ sau bài học.",
    points: [
      "Internet là mạng liên kết các mạng máy tính toàn cầu.",
      "Không có ai làm chủ sở hữu toàn bộ mạng Internet.",
      "Internet đem lại nhiều lợi ích thiết thực trong đời sống.",
      "Cần sử dụng Internet an toàn, bảo vệ thông tin cá nhân.",
    ],
  },
];

// Bộ câu hỏi trắc nghiệm ôn tập vui vẻ cho học sinh lớp 6
export interface QuizItem {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0: A, 1: B, 2: C, 3: D
  positiveFeedback: string;
  explanation: string;
  hint: string;
}

export const QUIZ_QUESTIONS: QuizItem[] = [
  {
    id: 1,
    question: "Internet là gì?",
    options: [
      "A. Là một máy tính cá nhân rất mạnh đặt tại trường học.",
      "B. Là mạng liên kết các mạng máy tính trên quy mô toàn cầu.",
      "C. Là phần mềm dùng để soạn thảo văn bản và tính toán.",
      "D. Là một trò chơi điện tử trực tuyến nhiều người chơi.",
    ],
    correctAnswer: 1, // B
    positiveFeedback: "🎉 Hoan hô! Em trả lời hoàn toàn chính xác! Em đã nắm rất vững khái niệm cơ bản của bài học.",
    explanation: "Theo bài học Tin học 6: Internet là mạng liên kết các mạng máy tính trên phạm vi toàn cầu.",
    hint: "💡 Gợi ý: Hãy chú ý từ khóa 'mạng liên kết các mạng máy tính' và phạm vi phủ sóng của Internet trên khắp thế giới.",
  },
  {
    id: 2,
    question: "Ai là người làm chủ sở hữu toàn bộ mạng Internet?",
    options: [
      "A. Không có cá nhân hay tổ chức nào làm chủ sở hữu mạng Internet.",
      "B. Giám đốc nhà cung cấp mạng viễn thông lớn nhất thế giới.",
      "C. Các công ty công nghệ lớn nhất tại Mỹ.",
      "D. Một trường đại học nổi tiếng thế giới.",
    ],
    correctAnswer: 0, // A
    positiveFeedback: "🌟 Xuất sắc! Đây là một đặc điểm rất quan trọng của mạng Internet mà em đã ghi nhớ rất tốt!",
    explanation: "Đặc điểm của Internet: Không có một cá nhân, tổ chức hay cơ quan nào làm chủ sở hữu toàn bộ mạng Internet. Mỗi mạng thành phần do tổ chức, cá nhân đó tự quản lí độc lập.",
    hint: "💡 Gợi ý: Internet là mạng lưới toàn cầu được tạo thành từ hàng triệu mạng con kết nối lại, không thuộc quyền riêng của bất kì ai.",
  },
  {
    id: 3,
    question: "Người dùng có thể kết nối thiết bị của mình vào Internet thông qua đơn vị nào?",
    options: [
      "A. Cửa hàng bán sách giáo khoa và đồ dùng học tập.",
      "B. Bưu điện chuyển phát thư tay truyền thống.",
      "C. Nhà cung cấp dịch vụ Internet (ISP).",
      "D. Đội bảo vệ và quản trị tòa nhà.",
    ],
    correctAnswer: 2, // C
    positiveFeedback: "👏 Rất giỏi! Em đã nhớ chính xác vai trò của nhà cung cấp dịch vụ Internet (ISP).",
    explanation: "Theo bài học: Các máy tính hoặc mạng máy tính muốn tham gia vào Internet phải thông qua nhà cung cấp dịch vụ Internet (ISP - Internet Service Provider) như VNPT, Viettel, FPT...",
    hint: "💡 Gợi ý: Em hãy nhớ lại thuật ngữ viết tắt tiếng Anh 'ISP' (Internet Service Provider) mà cô giáo đã giảng.",
  },
  {
    id: 4,
    question: "Hoạt động nào sau đây là ứng dụng hữu ích của Internet trong học tập?",
    options: [
      "A. Tìm kiếm tài liệu tham khảo và tham gia lớp học trực tuyến.",
      "B. Ngồi chơi game suốt cả ngày lẫn đêm không làm bài tập.",
      "C. Đọc lén tin nhắn riêng tư và tài khoản của bạn khác.",
      "D. Chia sẻ mật khẩu tài khoản cá nhân của mình cho người lạ.",
    ],
    correctAnswer: 0, // A
    positiveFeedback: "✨ Tuyệt vời! Em đã nhận diện rất chuẩn xác lợi ích tích cực của Internet đối với việc học tập!",
    explanation: "Internet giúp học sinh tra cứu tài liệu học tập, học trực tuyến (E-learning), làm bài tập và mở rộng chân trời tri thức.",
    hint: "💡 Gợi ý: Hoạt động học tập cần mang tính xây dựng, giúp em mở mang kiến thức và học tập tiến bộ.",
  },
  {
    id: 5,
    question: "Học sinh lớp 6 cần ghi nhớ điều gì quan trọng nhất để sử dụng Internet an toàn?",
    options: [
      "A. Luôn cung cấp họ tên, số điện thoại, mật khẩu cho bất kì ai hỏi trên mạng.",
      "B. Sử dụng an toàn, văn minh và tuyệt đối không tiết lộ thông tin cá nhân.",
      "C. Dành toàn bộ thời gian rảnh rỗi để lướt mạng xã hội.",
      "D. Không cần trao đổi hay hỏi ý kiến thầy cô, cha mẹ khi gặp điều bất thường.",
    ],
    correctAnswer: 1, // B
    positiveFeedback: "🏆 Thật đáng khen ngợi! Kỹ năng bảo vệ an toàn thông tin cá nhân là bài học vô cùng quan trọng đối với học sinh lớp 6!",
    explanation: "Lời dặn sau bài học: Học sinh phải sử dụng Internet an toàn, văn minh, có thời gian biểu hợp lí và bảo vệ bí mật thông tin cá nhân (không tiết lộ họ tên, SĐT, địa chỉ, mật khẩu).",
    hint: "💡 Gợi ý: Hãy nghĩ đến nguyên tắc bảo vệ quyền riêng tư và những thông tin nhạy cảm của bản thân trên môi trường mạng.",
  },
  {
    id: 6,
    question: "Đặc điểm nào sau đây KHÔNG PHẢI là đặc điểm của mạng Internet?",
    options: [
      "A. Phủ khắp thế giới (quy mô toàn cầu).",
      "B. Là kho thông tin khổng lồ và không ngừng cập nhật.",
      "C. Có một người duy nhất làm chủ sở hữu và điều hành tất cả.",
      "D. Cung cấp phương thức giao tiếp thuận tiện và nhanh chóng.",
    ],
    correctAnswer: 2, // C
    positiveFeedback: "🎯 Quá chuẩn! Em đã phát hiện ra điểm mâu thuẫn rất nhanh. Internet là mạng mở phi tập trung, không ai độc quyền làm chủ.",
    explanation: "Đặc điểm của Internet: Không có chủ sở hữu duy nhất. Khẳng định 'có một người duy nhất làm chủ sở hữu' là hoàn toàn sai.",
    hint: "💡 Gợi ý: Xem lại bài học xem có ai hay cơ quan nào độc quyền làm chủ sở hữu mạng Internet toàn cầu không nhé.",
  },
  {
    id: 7,
    question: "Ví dụ nào dưới đây là ứng dụng của Internet trong giải trí lành mạnh?",
    options: [
      "A. Nghe các bản nhạc thiếu nhi yêu thích hoặc xem phim tài liệu khoa học.",
      "B. Thức thâu đêm để chơi game bạo lực.",
      "C. Truy cập vào những trang web không phù hợp với lứa tuổi.",
      "D. Tải các phần mềm không rõ nguồn gốc gây hỏng máy tính.",
    ],
    correctAnswer: 0, // A
    positiveFeedback: "🌈 Hoàn toàn chính xác! Giải trí lành mạnh giúp tinh thần thoải mái và tiếp thu thêm điều bổ ích!",
    explanation: "Ứng dụng giải trí lành mạnh của Internet bao gồm nghe nhạc, xem phim giáo dục, đọc sách báo điện tử có ích cho lứa tuổi học sinh.",
    hint: "💡 Gợi ý: Hãy chọn hoạt động vừa đem lại niềm vui vừa an toàn, phù hợp với lứa tuổi học sinh lớp 6.",
  },
];

/**
 * Hàm phân tích câu hỏi dựa trên nội dung bài học.
 * Đảm bảo 100% đúng quy định:
 * "Chatbox CHỈ được trả lời dựa trên nội dung bài học mà giáo viên cung cấp.
 * Không được tự suy luận hoặc bổ sung kiến thức ngoài tài liệu.
 * Nếu câu hỏi không có thông tin trong tài liệu, trả lời:
 * 'Câu hỏi này chưa có trong nội dung bài học. Em hãy xem lại tài liệu hoặc hỏi giáo viên.'"
 */
export function answerQuestionFromLesson(rawQuestion: string): string {
  if (!rawQuestion || typeof rawQuestion !== "string") {
    return TEACHER_INFO.outOfScopeResponse;
  }

  const q = rawQuestion.trim().toLowerCase();

  // Câu 1: Internet là gì
  if (
    (q.includes("internet là gì") || q.includes("khái niệm internet") || q.includes("định nghĩa internet") || q === "internet la gi" || (q.includes("internet") && q.includes("là gì"))) &&
    !q.includes("đặc điểm") && !q.includes("dùng để") && !q.includes("sử dụng") && !q.includes("ghi nhớ")
  ) {
    return STANDARD_ANSWERS["internet_la_gi"];
  }

  // Câu 2: Đặc điểm của Internet
  if (
    q.includes("đặc điểm") || q.includes("dac diem") || 
    q.includes("tính chất") || q.includes("tính đặc trưng") ||
    (q.includes("internet có") && q.includes("đặc điểm nào"))
  ) {
    return STANDARD_ANSWERS["dac_diem_internet"];
  }

  // Câu 3: Internet được sử dụng để làm gì? / Lợi ích / Ứng dụng
  if (
    q.includes("sử dụng để làm gì") || q.includes("dung de lam gi") ||
    q.includes("sử dụng làm gì") || q.includes("lợi ích") ||
    q.includes("ứng dụng") || q.includes("dùng để làm gì") ||
    q.includes("lợi ích của internet") || q.includes("tác dụng của internet")
  ) {
    return STANDARD_ANSWERS["dung_de_lam_gi"];
  }

  // Câu 4: Em cần ghi nhớ điều gì sau bài học? / Ghi nhớ / Tóm tắt
  if (
    q.includes("ghi nhớ") || q.includes("ghi nho") ||
    q.includes("sau bài học") || q.includes("tóm tắt") ||
    q.includes("bài học rút ra") || q.includes("cần nhớ điều gì") ||
    q.includes("kết luận")
  ) {
    return STANDARD_ANSWERS["ghi_nho_sau_bai_hoc"];
  }

  // Hỏi về ai làm chủ / chủ sở hữu
  if (
    q.includes("chủ sở hữu") || q.includes("ai làm chủ") ||
    q.includes("ai quản lý internet") || q.includes("ai là chủ") ||
    q.includes("ai sở hữu internet")
  ) {
    return `⭐ **Về quyền sở hữu mạng Internet (Theo bài học):**

• **Không có một cơ quan, tổ chức hay cá nhân nào làm chủ sở hữu toàn bộ mạng Internet.**
• Mạng Internet được tạo thành từ hàng triệu mạng máy tính kết nối lại với nhau.
• Mỗi mạng thành phần do một cơ quan, tổ chức, doanh nghiệp hoặc cá nhân tự quản lí độc lập.`;
  }

  // Hỏi về ISP / Nhà cung cấp dịch vụ Internet
  if (
    q.includes("isp") || q.includes("nhà cung cấp dịch vụ internet") ||
    q.includes("nha cung cap") || q.includes("kết nối vào internet bằng cách nào")
  ) {
    return `🌐 **Về nhà cung cấp dịch vụ Internet (ISP):**

• **ISP** là viết tắt của tiếng Anh: *Internet Service Provider* (Nhà cung cấp dịch vụ Internet).
• Muốn tham gia vào mạng Internet, máy tính hoặc mạng máy tính cần đăng kí kết nối thông qua một **nhà cung cấp dịch vụ Internet (ISP)** (ví dụ: VNPT, Viettel, FPT...).`;
  }

  // Hỏi về mạng máy tính
  if (
    q.includes("mạng máy tính là gì") || q.includes("khái niệm mạng máy tính") ||
    q.includes("mang may tinh la gi")
  ) {
    return `💻 **Khái niệm mạng máy tính (Trong bài học):**

• Mạng máy tính là tập hợp từ hai hay nhiều máy tính được kết nối với nhau để chia sẻ dữ liệu và các thiết bị (như máy in, bộ nhớ).
• Mạng Internet chính là **mạng liên kết các mạng máy tính** trên phạm vi toàn cầu.`;
  }

  // Hỏi về giáo viên hoặc trường học
  if (
    q.includes("giáo viên") || q.includes("cô thanh") || q.includes("phương thanh") ||
    q.includes("trường") || q.includes("quang trung") || q.includes("bùi thị phương thanh")
  ) {
    return `👩‍🏫 **Thông tin về bài học:**
• **Giáo viên biên soạn:** Cô Bùi Thị Phương Thanh
• **Trường:** THCS Quang Trung
• **Môn:** Tin học 6
• **Mục đích:** Hỗ trợ các em học sinh lớp 6 ôn tập bài học "Internet" một cách hiệu quả và chính xác nhất!`;
  }

  // Hỏi về trắc nghiệm hoặc bài tập ôn
  if (
    q.includes("trắc nghiệm") || q.includes("trac nghiem") ||
    q.includes("thử câu hỏi trắc nghiệm") || q.includes("làm trắc nghiệm")
  ) {
    return `🎯 **Thử thách trắc nghiệm ôn tập bài Internet:**

Cô đã mở hộp câu hỏi trắc nghiệm trực quan ở ngay bên trên! 

Em hãy đọc kĩ đề bài và bấm chọn phương án **A, B, C hoặc D** nhé. Nếu chọn đúng sẽ có lời khen ngợi và giải thích, nếu chọn chưa đúng sẽ có gợi ý để em làm lại!`;
  }

  // Chào hỏi thân thiện
  if (
    q === "xin chào" || q === "chào bạn" || q === "chào cô" || q === "hello" || q === "hi" ||
    q === "chào" || q === "chào trợ lý" || q === "alo"
  ) {
    return `Chào em! Cô là Trợ lý ôn tập môn Tin học 6 cho bài học **"Internet"** của cô Bùi Thị Phương Thanh (Trường THCS Quang Trung).

Em có thể bấm vào các câu hỏi gợi ý bên trên hoặc gõ câu hỏi liên quan đến bài học để cô giải đáp nhé!`;
  }

  // Nếu câu hỏi KHÔNG CÓ trong tài liệu:
  return TEACHER_INFO.outOfScopeResponse;
}
