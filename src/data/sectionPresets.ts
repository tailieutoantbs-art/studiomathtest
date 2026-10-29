import { SectionPreset, Section } from '../types/exam';

export const SECTION_PRESETS: SectionPreset[] = [
  {
    id: 'thpt_toan',
    name: 'THPT Toán',
    shortDesc: '12 TN = 3 điểm • 4 ĐS = 4 điểm • 6 TLN = 3 điểm',
    badge: 'Chuẩn Bộ GD&ĐT 2025',
    sections: [
      {
        id: 'sec-1',
        title: 'Trắc nghiệm',
        shortTitle: 'Trắc nghiệm',
        type: 'multiple_choice',
        enabled: true,
        questionCount: 12,
        subItemsPerQuestion: 1,
        pointsPerItem: 0.25,
        totalPoints: 3,
        description: '12 câu trắc nghiệm 4 phương án A, B, C, D (0.25 đ/câu = 3.0đ)'
      },
      {
        id: 'sec-2',
        title: 'Đúng sai',
        shortTitle: 'Đúng sai',
        type: 'true_false',
        enabled: true,
        questionCount: 4,
        subItemsPerQuestion: 4,
        pointsPerItem: 1,
        totalPoints: 4,
        description: '4 câu trắc nghiệm Đúng - Sai, mỗi câu 4 lệnh hỏi a, b, c, d (1.0 đ/câu = 4.0đ)'
      },
      {
        id: 'sec-3',
        title: 'Trả lời ngắn',
        shortTitle: 'Trả lời ngắn',
        type: 'short_answer',
        enabled: true,
        questionCount: 6,
        subItemsPerQuestion: 1,
        pointsPerItem: 0.5,
        totalPoints: 3,
        description: '6 câu trắc nghiệm trả lời ngắn (0.5 đ/câu = 3.0đ)'
      },
      {
        id: 'sec-4',
        title: 'Tự luận',
        shortTitle: 'Tự luận',
        type: 'essay',
        enabled: false,
        questionCount: 0,
        subItemsPerQuestion: 1,
        pointsPerItem: 1,
        totalPoints: 0,
        description: 'Phần thi tự luận'
      }
    ]
  },
  {
    id: 'thpt_ly',
    name: 'THPT Lý',
    shortDesc: '18 TN = 4,5 điểm • 4 ĐS = 4 điểm • 6 TLN = 1,5 điểm',
    badge: 'Chuẩn Bộ GD&ĐT 2025',
    sections: [
      {
        id: 'sec-1',
        title: 'Trắc nghiệm',
        shortTitle: 'Trắc nghiệm',
        type: 'multiple_choice',
        enabled: true,
        questionCount: 18,
        subItemsPerQuestion: 1,
        pointsPerItem: 0.25,
        totalPoints: 4.5,
        description: '18 câu trắc nghiệm 4 phương án A, B, C, D (0.25 đ/câu = 4.5đ)'
      },
      {
        id: 'sec-2',
        title: 'Đúng sai',
        shortTitle: 'Đúng sai',
        type: 'true_false',
        enabled: true,
        questionCount: 4,
        subItemsPerQuestion: 4,
        pointsPerItem: 1,
        totalPoints: 4,
        description: '4 câu trắc nghiệm Đúng - Sai, mỗi câu 4 lệnh hỏi a, b, c, d (1.0 đ/câu = 4.0đ)'
      },
      {
        id: 'sec-3',
        title: 'Trả lời ngắn',
        shortTitle: 'Trả lời ngắn',
        type: 'short_answer',
        enabled: true,
        questionCount: 6,
        subItemsPerQuestion: 1,
        pointsPerItem: 0.25,
        totalPoints: 1.5,
        description: '6 câu trắc nghiệm trả lời ngắn (0.25 đ/câu = 1.5đ)'
      },
      {
        id: 'sec-4',
        title: 'Tự luận',
        shortTitle: 'Tự luận',
        type: 'essay',
        enabled: false,
        questionCount: 0,
        subItemsPerQuestion: 1,
        pointsPerItem: 1,
        totalPoints: 0,
        description: 'Phần thi tự luận'
      }
    ]
  },
  {
    id: 'thpt_hoa',
    name: 'THPT Hóa học',
    shortDesc: '18 TN = 4,5 điểm • 4 ĐS = 4 điểm • 6 TLN = 1,5 điểm',
    badge: 'Chuẩn Bộ GD&ĐT 2025',
    sections: [
      {
        id: 'sec-1',
        title: 'Trắc nghiệm nhiều lựa chọn',
        shortTitle: 'Trắc nghiệm',
        type: 'multiple_choice',
        enabled: true,
        questionCount: 18,
        subItemsPerQuestion: 1,
        pointsPerItem: 0.25,
        totalPoints: 4.5,
        description: '18 câu trắc nghiệm 4 phương án A, B, C, D (0.25 đ/câu = 4.5đ)'
      },
      {
        id: 'sec-2',
        title: 'Đúng sai',
        shortTitle: 'Đúng sai',
        type: 'true_false',
        enabled: true,
        questionCount: 4,
        subItemsPerQuestion: 4,
        pointsPerItem: 1,
        totalPoints: 4,
        description: '4 câu trắc nghiệm Đúng - Sai, mỗi câu 4 lệnh hỏi a, b, c, d (1.0 đ/câu = 4.0đ)'
      },
      {
        id: 'sec-3',
        title: 'Trả lời ngắn',
        shortTitle: 'Trả lời ngắn',
        type: 'short_answer',
        enabled: true,
        questionCount: 6,
        subItemsPerQuestion: 1,
        pointsPerItem: 0.25,
        totalPoints: 1.5,
        description: '6 câu trắc nghiệm trả lời ngắn (0.25 đ/câu = 1.5đ)'
      },
      {
        id: 'sec-4',
        title: 'Tự luận',
        shortTitle: 'Tự luận',
        type: 'essay',
        enabled: false,
        questionCount: 0,
        subItemsPerQuestion: 1,
        pointsPerItem: 1,
        totalPoints: 0,
        description: 'Phần thi tự luận'
      }
    ]
  },
  {
    id: 'thpt_tienganh',
    name: 'THPT Tiếng Anh',
    shortDesc: '40 câu TN 4 lựa chọn = 10 điểm (0.25 đ/câu)',
    badge: 'Chuẩn Bộ GD&ĐT 2025',
    sections: [
      {
        id: 'sec-1',
        title: 'Trắc nghiệm nhiều lựa chọn',
        shortTitle: 'Trắc nghiệm',
        type: 'multiple_choice',
        enabled: true,
        questionCount: 40,
        subItemsPerQuestion: 1,
        pointsPerItem: 0.25,
        totalPoints: 10,
        description: '40 câu trắc nghiệm 4 phương án A, B, C, D (0.25 đ/câu = 10.0đ)'
      },
      {
        id: 'sec-2',
        title: 'Đúng sai',
        shortTitle: 'Đúng sai',
        type: 'true_false',
        enabled: false,
        questionCount: 0,
        subItemsPerQuestion: 4,
        pointsPerItem: 1,
        totalPoints: 0,
        description: 'Phần thi Đúng - Sai (không dùng trong cấu trúc thi TN THPT Tiếng Anh 2025)'
      },
      {
        id: 'sec-3',
        title: 'Trả lời ngắn',
        shortTitle: 'Trả lời ngắn',
        type: 'short_answer',
        enabled: false,
        questionCount: 0,
        subItemsPerQuestion: 1,
        pointsPerItem: 0.25,
        totalPoints: 0,
        description: 'Phần thi trả lời ngắn (không dùng trong cấu trúc thi TN THPT Tiếng Anh 2025)'
      },
      {
        id: 'sec-4',
        title: 'Tự luận / Viết',
        shortTitle: 'Tự luận',
        type: 'essay',
        enabled: false,
        questionCount: 0,
        subItemsPerQuestion: 1,
        pointsPerItem: 1,
        totalPoints: 0,
        description: 'Phần thi tự luận / viết'
      }
    ]
  },
  {
    id: 'kt_dinh_ky',
    name: 'KT định kỳ',
    shortDesc: '12 TN = 3 điểm • 2 ĐS = 2 điểm • 4 TLN = 2 điểm • 3 TL = 3 điểm',
    badge: 'Kiểm tra trường (Có Tự luận)',
    sections: [
      {
        id: 'sec-1',
        title: 'Trắc nghiệm',
        shortTitle: 'Trắc nghiệm',
        type: 'multiple_choice',
        enabled: true,
        questionCount: 12,
        subItemsPerQuestion: 1,
        pointsPerItem: 0.25,
        totalPoints: 3,
        description: '12 câu trắc nghiệm 4 phương án A, B, C, D (0.25 đ/câu = 3.0đ)'
      },
      {
        id: 'sec-2',
        title: 'Đúng sai',
        shortTitle: 'Đúng sai',
        type: 'true_false',
        enabled: true,
        questionCount: 2,
        subItemsPerQuestion: 4,
        pointsPerItem: 1,
        totalPoints: 2,
        description: '2 câu trắc nghiệm Đúng - Sai, mỗi câu 4 lệnh hỏi a, b, c, d (1.0 đ/câu = 2.0đ)'
      },
      {
        id: 'sec-3',
        title: 'Trả lời ngắn',
        shortTitle: 'Trả lời ngắn',
        type: 'short_answer',
        enabled: true,
        questionCount: 4,
        subItemsPerQuestion: 1,
        pointsPerItem: 0.5,
        totalPoints: 2,
        description: '4 câu trắc nghiệm trả lời ngắn (0.5 đ/câu = 2.0đ)'
      },
      {
        id: 'sec-4',
        title: 'Tự luận',
        shortTitle: 'Tự luận',
        type: 'essay',
        enabled: true,
        questionCount: 3,
        subItemsPerQuestion: 1,
        pointsPerItem: 1,
        totalPoints: 3,
        description: '3 câu tự luận (1.0 đ/câu = 3.0đ)'
      }
    ]
  }
];

export function getSectionsPreset(presetId: string): Section[] {
  const preset = SECTION_PRESETS.find(p => p.id === presetId);
  return preset ? JSON.parse(JSON.stringify(preset.sections)) : JSON.parse(JSON.stringify(SECTION_PRESETS[1].sections));
}

