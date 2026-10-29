import React from 'react';
import {
  FileText,
  School,
  Clock,
  Award,
  User,
  ArrowRight,
  AlertCircle,
  BookOpen
} from 'lucide-react';
import { GeneralInfo, SubjectType, GradeType, ExamType } from '../../types/exam';

interface Step1GeneralInfoProps {
  generalInfo: GeneralInfo;
  onChange: (patch: Partial<GeneralInfo>) => void;
  onNext: () => void;
  readOnly?: boolean;
}

export const Step1GeneralInfo: React.FC<Step1GeneralInfoProps> = ({
  generalInfo,
  onChange,
  onNext,
  readOnly = false
}) => {
  return (
    <div className="space-y-6">
      {readOnly && (
        <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Chế độ xem tổng quan:</strong> Bạn đang xem ở chế độ chỉ đọc. Chỉ tài khoản giáo viên được cấp
              quyền mới có thể sửa thông tin.
            </span>
          </div>
        </div>
      )}

      <fieldset disabled={readOnly} className="space-y-6 border-0 p-0 m-0 min-w-0">
        {/* Banner Intro */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 shadow-xs">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-600 rounded-xl text-white shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Bước 1: Khai báo thông tin đề kiểm tra</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Thiết lập môn học, khối lớp, loại kì thi và thông tin hành chính. YCCĐ được quản lí thống nhất theo
                Chương trình GDPT 2018 (Thông tư 32/2018/TT-BGDĐT). Bộ sách giáo khoa được dùng để tham chiếu mạch tổ
                chức bài học.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Subject & Curriculum Scope */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Môn học & Phạm vi chương trình</span>
            </h4>

            {/* Subject Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Môn học <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => onChange({ subject: 'VatLi' })}
                  className={`py-2.5 px-3 rounded-xl text-sm font-semibold border flex items-center justify-center space-x-2 transition cursor-pointer ${
                    generalInfo.subject === 'VatLi'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>⚡ Vật lí</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ subject: 'Toan' })}
                  className={`py-2.5 px-3 rounded-xl text-sm font-semibold border flex items-center justify-center space-x-2 transition cursor-pointer ${
                    generalInfo.subject === 'Toan'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>📐 Toán học</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ subject: 'Hoa' })}
                  className={`py-2.5 px-3 rounded-xl text-sm font-semibold border flex items-center justify-center space-x-2 transition cursor-pointer ${
                    generalInfo.subject === 'Hoa'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>🧪 Hóa học</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ subject: 'TiengAnh' })}
                  className={`py-2.5 px-3 rounded-xl text-sm font-semibold border flex items-center justify-center space-x-2 transition cursor-pointer ${
                    generalInfo.subject === 'TiengAnh'
                      ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>🌐 Tiếng Anh</span>
                </button>
              </div>
            </div>

            {/* Grade Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Khối lớp <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {([10, 11, 12] as GradeType[]).map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => onChange({ grade: g })}
                    className={`py-2 px-3 rounded-xl text-sm font-semibold border transition cursor-pointer ${
                      generalInfo.grade === g
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Lớp {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Textbook */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                <span>Bộ SGK phân phối chương trình</span>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  Mặc định: SGK KNTT
                </span>
              </label>
              <select
                value={generalInfo.textbook || 'KNTT'}
                onChange={e => onChange({ textbook: e.target.value as any })}
                className="w-full text-sm rounded-xl border-blue-300 bg-blue-50/30 px-3.5 py-2.5 font-semibold text-blue-900 focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 transition"
              >
                <option value="KNTT">Kết nối tri thức với cuộc sống (Mặc định chuẩn)</option>
                <option value="Chung">Chương trình chung GDPT 2018</option>
                <option value="CTST">Chân trời sáng tạo</option>
                <option value="CD">Cánh Diều</option>
              </select>
            </div>

            {/* Semester & School Year */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Học kì</label>
                <select
                  value={generalInfo.semester}
                  onChange={e => onChange({ semester: e.target.value as any })}
                  className="w-full text-sm rounded-xl border-slate-300 bg-slate-50 px-3 py-2.5 focus:border-blue-500 focus:bg-white transition"
                >
                  <option value="HK1">Học kì I</option>
                  <option value="HK2">Học kì II</option>
                  <option value="CaNam">Cả năm</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Năm học</label>
                <input
                  type="text"
                  value={generalInfo.schoolYear}
                  onChange={e => onChange({ schoolYear: e.target.value })}
                  placeholder="2026 - 2027"
                  className="w-full text-sm rounded-xl border-slate-300 bg-slate-50 px-3 py-2.5 focus:border-blue-500 focus:bg-white transition"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Exam & Administrative Info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-2.5">
              <School className="w-4 h-4 text-indigo-600" />
              <span>Thông tin kì thi & Đơn vị</span>
            </h4>

            {/* Exam Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Tên bài kiểm tra / Kì thi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={generalInfo.examName}
                onChange={e => onChange({ examName: e.target.value })}
                placeholder="ĐỀ KIỂM TRA ĐỊNH KÌ GIỮA HỌC KÌ I"
                className="w-full text-sm rounded-xl border-slate-300 bg-slate-50 px-3.5 py-2.5 focus:border-blue-500 focus:bg-white transition font-medium"
              />
            </div>

            {/* Exam Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Hình thức kiểm tra</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'GiuaKy', label: 'Giữa kì' },
                  { id: 'CuoiKy', label: 'Cuối kì' },
                  { id: 'ThuongXuyen', label: 'Thường xuyên' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChange({ examType: item.id as ExamType })}
                    className={`py-2 px-2 text-xs font-medium rounded-xl border transition cursor-pointer ${
                      generalInfo.examType === item.id
                        ? 'bg-blue-50 text-blue-700 border-blue-500 font-semibold'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration & Max Score */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Thời gian (phút)</span>
                </label>
                <input
                  type="number"
                  min={15}
                  max={180}
                  step={5}
                  value={generalInfo.durationMinutes}
                  onChange={e => onChange({ durationMinutes: Number(e.target.value) || 45 })}
                  className="w-full text-sm rounded-xl border-slate-300 bg-slate-50 px-3 py-2.5 focus:border-blue-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-slate-500" />
                  <span>Thang điểm tối đa</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  step={0.5}
                  value={generalInfo.maxScore}
                  onChange={e => onChange({ maxScore: Number(e.target.value) || 10 })}
                  className="w-full text-sm rounded-xl border-slate-300 bg-slate-50 px-3 py-2.5 focus:border-blue-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Department & School */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Sở GD&ĐT / Phòng GD</label>
                <input
                  type="text"
                  value={generalInfo.deptName}
                  onChange={e => onChange({ deptName: e.target.value })}
                  placeholder="SỞ GD&ĐT HÀ NỘI"
                  className="w-full text-sm rounded-xl border-slate-300 bg-slate-50 px-3 py-2 focus:border-blue-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tên trường THPT</label>
                <input
                  type="text"
                  value={generalInfo.schoolName}
                  onChange={e => onChange({ schoolName: e.target.value })}
                  placeholder="TRƯỜNG THPT CHUYÊN..."
                  className="w-full text-sm rounded-xl border-slate-300 bg-slate-50 px-3 py-2 focus:border-blue-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Teacher Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center space-x-1">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Giáo viên ra đề / Nhóm chuyên môn</span>
              </label>
              <input
                type="text"
                value={generalInfo.teacherName}
                onChange={e => onChange({ teacherName: e.target.value })}
                placeholder="Nguyễn Văn A"
                className="w-full text-sm rounded-xl border-slate-300 bg-slate-50 px-3.5 py-2 focus:border-blue-500 focus:bg-white transition"
              />
            </div>
          </div>
        </div>
      </fieldset>

      {/* Next Step Button */}
      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={onNext}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-600/30 transition cursor-pointer"
        >
          <span>Tiếp tục: Chọn phạm vi kiến thức</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

