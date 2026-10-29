import React from 'react';
import { HelpCircle, BookOpen, CheckCircle, Phone, Mail, Award, X } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-xs">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Hướng dẫn Sử dụng & Cơ sở Pháp lí GDPT 2018
              </h3>
              <p className="text-xs text-slate-500">
                Quy định ra đề kiểm tra đánh giá định kì môn Toán & Vật lí THPT
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 leading-relaxed flex-1">
          {/* Section 1 */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-blue-900 flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>1. Cơ sở pháp lý và văn bản áp dụng</span>
            </h4>
            <p>Hệ thống ma trận và bản đặc tả được xây dựng bám sát theo:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>
                <strong>Thông tư 32/2018/TT-BGDĐT</strong> ngày 26/12/2018 của Bộ GD&ĐT ban hành Chương trình Giáo dục
                phổ thông (GDPT 2018) môn Toán và môn Vật lí.
              </li>
              <li>
                <strong>Quyết định số 764/QĐ-BGDĐT</strong> ngày 08/03/2024 của Bộ GD&ĐT quy định cấu trúc định dạng
                đề thi Kỳ thi tốt nghiệp THPT từ năm 2025 (Áp dụng định dạng 3 phần: Trắc nghiệm 4 lựa chọn, Trắc
                nghiệm Đúng/Sai, Trắc nghiệm Trả lời ngắn).
              </li>
              <li>
                <strong>Công văn hướng dẫn nhiệm vụ năm học</strong> của Vụ Giáo dục Trung học về kiểm tra, đánh giá
                định kì ở trường THPT.
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-blue-900 flex items-center space-x-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>2. Quy trình 6 bước xây dựng Ma trận & Đặc tả</span>
            </h4>
            <div className="space-y-2 pl-2">
              <p>
                <strong>Bước 1 - Khai báo thông tin:</strong> Điền tên bài kiểm tra, trường, tổ bộ môn, thời gian,
                môn học (Toán/Vật lí), khối lớp (10, 11, 12).
              </p>
              <p>
                <strong>Bước 2 - Chọn phạm vi kiến thức:</strong> Tích chọn các chương và bài học nằm trong kế hoạch
                dạy học cần kiểm tra.
              </p>
              <p>
                <strong>Bước 3 - Chọn Yêu cầu cần đạt (YCCĐ):</strong> Tích chọn các YCCĐ chuẩn SGK KNTT hoặc tự ý bổ
                sung YCCĐ thủ công, chỉnh sửa câu chữ cho sát thực tế.
              </p>
              <p>
                <strong>Bước 4 - Thiết lập cấu trúc đề & Tỉ lệ nhận thức:</strong> Chọn nhanh 1 trong 3 mẫu đề chuẩn
                hoặc tự điều chỉnh số câu, số điểm từng phần và tỉ lệ nhận thức (NB - TH - VD).
              </p>
              <p>
                <strong>Bước 5 - Phân bổ ma trận câu hỏi:</strong> Tăng/giảm số câu tại các ô giao giữa YCCĐ và phần
                thi; dùng tính năng <em>"Tự động phân bổ"</em> để AI/thuật toán trải đều các câu và ý hỏi.
              </p>
              <p>
                <strong>Bước 6 - Bản đặc tả & Xuất Word:</strong> Xem trước bảng ma trận và bảng đặc tả, kiểm tra đối
                soát 10 tiêu chí và tải file Word (.docx) chuẩn thể thức.
              </p>
            </div>
          </div>

          {/* Section 3: Author Info */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 space-y-2">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-blue-700" />
              <h4 className="text-sm font-bold text-blue-950">Thông tin tác giả & Hỗ trợ chuyên môn</h4>
            </div>
            <p className="font-semibold text-slate-800 text-sm">Thầy Hùng TBS</p>
            <div className="flex flex-wrap items-center gap-4 text-slate-700 pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <Phone className="w-4 h-4 text-blue-600" />
                0907117193
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Mail className="w-4 h-4 text-indigo-600" />
                tailieutoantbs@gmail.com
              </span>
            </div>
            <p className="text-[11px] text-slate-500 pt-1 italic">
              Quý Thầy/Cô có nhu cầu kích hoạt mã bản quyền trải nghiệm dài hạn hoặc góp ý hoàn thiện phần mềm, vui
              lòng liên hệ trực tiếp qua số điện thoại hoặc Zalo trên.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-xs transition cursor-pointer"
          >
            Đã hiểu & Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

