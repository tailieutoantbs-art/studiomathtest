import React from 'react';
import {
  FileSignature,
  Layers,
  CheckSquare,
  Sliders,
  Grid,
  FileCheck
} from 'lucide-react';

interface StepperProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  completedSteps: number[];
}

export const STEPS = [
  { id: 1, name: 'Khai báo đề', icon: FileSignature, desc: 'Thông tin trường & kì thi' },
  { id: 2, name: 'Phạm vi kiến thức', icon: Layers, desc: 'Chọn chương & bài học' },
  { id: 3, name: 'Chọn YCCĐ', icon: CheckSquare, desc: 'Yêu cầu cần đạt & Mức độ' },
  { id: 4, name: 'Cấu trúc đề', icon: Sliders, desc: 'Phần thi & Tỉ lệ điểm' },
  { id: 5, name: 'Phân bổ câu hỏi', icon: Grid, desc: 'Ma trận số câu & Tự động' },
  { id: 6, name: 'Bản đặc tả & Xuất', icon: FileCheck, desc: 'Kiểm tra & Xuất Word' }
];

export const Stepper: React.FC<StepperProps> = ({ currentStep, onSelectStep, completedSteps }) => {
  return (
    <div className="bg-white border-b border-slate-200 px-3 sm:px-4 py-2 sm:py-3 shadow-xs">
      <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-none">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between gap-1 sm:gap-2 min-w-[700px] lg:min-w-0">
            {STEPS.map(step => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = completedSteps.includes(step.id);

              return (
                <li key={step.id} className="flex-1 min-w-[105px] sm:min-w-0">
                  <button
                    onClick={() => onSelectStep(step.id)}
                    className={`w-full group flex flex-col items-center py-2 px-1 sm:px-2 rounded-xl transition border text-left cursor-pointer ${
                      isActive
                        ? 'bg-blue-50/80 border-blue-500 shadow-xs'
                        : isCompleted
                        ? 'hover:bg-slate-50 border-slate-200 text-slate-700'
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-bold transition ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/40'
                            : isCompleted
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-xs font-semibold sm:text-sm whitespace-nowrap ${
                          isActive ? 'text-blue-900' : isCompleted ? 'text-slate-900' : 'text-slate-500'
                        }`}
                      >
                        {step.id}. {step.name}
                      </span>
                    </div>
                    <span className="hidden md:block text-[11px] text-slate-500 mt-0.5 truncate max-w-full">
                      {step.desc}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

