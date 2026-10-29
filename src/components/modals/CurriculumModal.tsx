import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle,
  Plus,
  Trash2,
  X,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { SubjectType, GradeType, CognitionLevel, getSubjectName } from '../../types/exam';
import { CURRICULUM_DATABASE } from '../../data/curriculum';
import { useAuth } from '../../context/AuthContext';

interface CurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CurriculumModal: React.FC<CurriculumModalProps> = ({ isOpen, onClose }) => {
  const { user, isAdmin } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>('VatLi');
  const [selectedGrade, setSelectedGrade] = useState<GradeType>(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<'ALL' | CognitionLevel>('ALL');

  if (!isOpen) return null;

  const currentChapters = CURRICULUM_DATABASE.filter(
    ch => ch.subject === selectedSubject && ch.grade === selectedGrade
  );

  const allYccds: {
    id: string;
    level: CognitionLevel;
    content: string;
    chapterName: string;
    lessonName: string;
    source: string;
  }[] = [];

  for (const ch of currentChapters) {
    for (const ls of ch.lessons) {
      for (const y of ls.yccds) {
        allYccds.push({
          id: y.id,
          level: y.defaultLevel,
          content: y.officialText,
          chapterName: ch.name,
          lessonName: ls.name,
          source: y.source
        });
      }
    }
  }

  const filteredYccds = allYccds.filter(y => {
    const matchLevel = levelFilter === 'ALL' || y.level === levelFilter;
    if (!matchLevel) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      y.content.toLowerCase().includes(q) ||
      y.id.toLowerCase().includes(q) ||
      y.chapterName.toLowerCase().includes(q) ||
      y.lessonName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[88vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-900">
                  Kho Cơ sở dữ liệu Yêu cầu cần đạt (YCCĐ) — SGK Kết nối tri thức
                </h3>
                {isAdmin ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-purple-600" />
                    Quản trị viên (Toàn quyền)
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-blue-600" />
                    Giáo viên tra cứu
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Chuẩn GDPT 2018 (Thông tư 32/2018/TT-BGDĐT) • Tra cứu, lọc theo bài học & Quản lý kho chuẩn
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

        {/* Toolbar Filter */}
        <div className="p-4 bg-slate-100/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Subject Toggle */}
            <div className="flex bg-white rounded-xl border border-slate-300 p-0.5">
              <button
                type="button"
                onClick={() => setSelectedSubject('VatLi')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  selectedSubject === 'VatLi' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Vật lí
              </button>
              <button
                type="button"
                onClick={() => setSelectedSubject('Toan')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  selectedSubject === 'Toan' ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Toán
              </button>
              <button
                type="button"
                onClick={() => setSelectedSubject('Hoa')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  selectedSubject === 'Hoa' ? 'bg-emerald-600 text-white' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Hóa học
              </button>
              <button
                type="button"
                onClick={() => setSelectedSubject('TiengAnh')}
                className={`px-2.5 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  selectedSubject === 'TiengAnh' ? 'bg-purple-600 text-white' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Tiếng Anh
              </button>
            </div>

            {/* Grade Toggle */}
            <div className="flex bg-white rounded-xl border border-slate-300 p-0.5">
              {([10, 11, 12] as GradeType[]).map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGrade(g)}
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                    selectedGrade === g ? 'bg-indigo-600 text-white' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Lớp {g}
                </button>
              ))}
            </div>

            {/* Level Filter */}
            <div className="flex bg-white rounded-xl border border-slate-300 p-0.5">
              <button
                type="button"
                onClick={() => setLevelFilter('ALL')}
                className={`px-2 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                  levelFilter === 'ALL' ? 'bg-slate-800 text-white font-bold' : 'text-slate-700'
                }`}
              >
                Đủ mức
              </button>
              <button
                type="button"
                onClick={() => setLevelFilter('NB')}
                className={`px-2 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                  levelFilter === 'NB' ? 'bg-blue-600 text-white font-bold' : 'text-slate-700'
                }`}
              >
                NB
              </button>
              <button
                type="button"
                onClick={() => setLevelFilter('TH')}
                className={`px-2 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                  levelFilter === 'TH' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-700'
                }`}
              >
                TH
              </button>
              <button
                type="button"
                onClick={() => setLevelFilter('VD')}
                className={`px-2 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                  levelFilter === 'VD' ? 'bg-amber-600 text-white font-bold' : 'text-slate-700'
                }`}
              >
                VD
              </button>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b border-slate-100 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm nội dung YCCĐ, mã định danh, bài học hoặc chương..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:border-blue-500"
            />
          </div>
          <span className="text-xs text-slate-500 whitespace-nowrap px-2">
            Hiển thị: <strong>{filteredYccds.length}</strong>/{allYccds.length} YCCĐ
          </span>
        </div>

        {/* YCCDs List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {filteredYccds.length === 0 ? (
            <div className="p-12 text-center text-slate-400">Không tìm thấy YCCĐ nào với bộ lọc hiện tại.</div>
          ) : (
            filteredYccds.map(item => {
              const badgeStyle =
                item.level === 'NB'
                  ? 'bg-blue-100 text-blue-800 border-blue-200'
                  : item.level === 'TH'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  : 'bg-amber-100 text-amber-800 border-amber-200';

              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white transition space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {item.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeStyle}`}>
                        {item.level}
                      </span>
                      <span className="text-xs font-semibold text-slate-800">
                        {item.chapterName} • {item.lessonName}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        Chuẩn SGK KNTT
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-400 font-normal">{item.source}</span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed font-normal">{item.content}</p>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Kho dữ liệu SGK KNTT: {allYccds.length} YCCĐ chính thức cho môn{' '}
            {getSubjectName(selectedSubject)} {selectedGrade}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

