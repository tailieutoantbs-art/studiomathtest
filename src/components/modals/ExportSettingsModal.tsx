import React from 'react';
import { Settings, Palette, Check, X } from 'lucide-react';
import { ExportSettings } from '../../types/exam';

interface ExportSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ExportSettings;
  onChange: (patch: Partial<ExportSettings>) => void;
}

const COLOR_PRESETS = [
  { id: '#1E3A8A', name: 'Xanh Navy (Bộ GD&ĐT)', hex: '#1E3A8A' },
  { id: '#0F766E', name: 'Xanh Lục bảo (Toán học)', hex: '#0F766E' },
  { id: '#7C3AED', name: 'Tím Tri thức (Hiện đại)', hex: '#7C3AED' },
  { id: '#1E293B', name: 'Than chì (Thanh lịch in ấn)', hex: '#1E293B' },
  { id: '#0369A1', name: 'Xanh Lam biển', hex: '#0369A1' }
];

export const ExportSettingsModal: React.FC<ExportSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onChange
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-xs">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Cài đặt Định dạng Xuất file Word (.docx)
              </h3>
              <p className="text-xs text-slate-500">
                Tùy chỉnh font chữ, khổ giấy, màu sắc tiêu đề và bố cục in ấn
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

        {/* Form Body */}
        <div className="p-6 space-y-5 text-xs">
          {/* Font Family */}
          <div>
            <label className="block font-semibold text-slate-800 mb-2">
              Font chữ tài liệu (Văn bản hành chính)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['Times New Roman', 'Arial', 'Calibri'].map(font => (
                <button
                  key={font}
                  type="button"
                  onClick={() => onChange({ fontFamily: font })}
                  className={`py-2 px-3 rounded-xl border font-medium text-center transition cursor-pointer ${
                    settings.fontFamily === font
                      ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span style={{ fontFamily: font }}>{font}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Orientation */}
          <div>
            <label className="block font-semibold text-slate-800 mb-2">Hướng trang giấy mặc định</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onChange({ orientation: 'landscape' })}
                className={`py-2.5 px-3 rounded-xl border flex items-center justify-center space-x-2 transition cursor-pointer ${
                  settings.orientation === 'landscape'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>Khổ ngang (Landscape - Khuyên dùng)</span>
              </button>
              <button
                type="button"
                onClick={() => onChange({ orientation: 'portrait' })}
                className={`py-2.5 px-3 rounded-xl border flex items-center justify-center space-x-2 transition cursor-pointer ${
                  settings.orientation === 'portrait'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span>Khổ dọc (Portrait)</span>
              </button>
            </div>
          </div>

          {/* Primary Color Palette */}
          <div>
            <label className="block font-semibold text-slate-800 mb-2 flex items-center space-x-1.5">
              <Palette className="w-4 h-4 text-slate-500" />
              <span>Màu sắc chủ đạo tiêu đề bảng</span>
            </label>
            <div className="space-y-2">
              {COLOR_PRESETS.map(color => {
                const isSelected = settings.primaryColor === color.id;
                return (
                  <div
                    key={color.id}
                    onClick={() => onChange({ primaryColor: color.id })}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition ${
                      isSelected
                        ? 'bg-slate-50 border-blue-500 ring-1 ring-blue-500'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="w-5 h-5 rounded-md shadow-xs" style={{ backgroundColor: color.hex }} />
                      <span className="font-semibold text-slate-800">{color.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Header option */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.includeHeader}
                onChange={e => onChange({ includeHeader: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700 font-medium">
                Tự động chèn tiêu đề Quốc hiệu và Đơn vị trường/Sở ở đầu trang
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-xs transition cursor-pointer"
          >
            Lưu cài đặt
          </button>
        </div>
      </div>
    </div>
  );
};

