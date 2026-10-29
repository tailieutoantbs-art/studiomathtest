import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Stepper } from './components/layout/Stepper';
import { LicenseBanner } from './components/layout/LicenseBanner';
import { Step1GeneralInfo } from './components/steps/Step1GeneralInfo';
import { Step2Scope } from './components/steps/Step2Scope';
import { Step3YCCD } from './components/steps/Step3YCCD';
import { Step4Structure } from './components/steps/Step4Structure';
import { Step5Matrix } from './components/steps/Step5Matrix';
import { Step6Export } from './components/steps/Step6Export';

// Modals
import { SavedExamsModal } from './components/modals/SavedExamsModal';
import { CurriculumModal } from './components/modals/CurriculumModal';
import { ExportSettingsModal } from './components/modals/ExportSettingsModal';
import { HelpModal } from './components/modals/HelpModal';
import { ActivationModal } from './components/modals/ActivationModal';
import { CloudExamsModal } from './components/modals/CloudExamsModal';
import { OnlineStorageModal } from './components/modals/OnlineStorageModal';
import { AdminModal } from './components/modals/AdminModal';
import { AuthGate } from './components/auth/AuthGate';

// Types & Services
import { ExamProject, GeneralInfo, Section, Allocation, TargetRatio, ExportSettings, YCCDSelection } from './types/exam';
import { validateProject } from './services/matrixEngine';
import { exportExamToWord } from './services/docxExporter';
import {
  loadProjects,
  saveProject,
  deleteProject,
  duplicateProject,
  getCurrentProjectId
} from './services/storageService';
import {
  SAMPLE_PHYSICS_10,
  SAMPLE_MATH_10,
  SAMPLE_MATH_12,
  SAMPLE_CHEMISTRY_10,
  SAMPLE_ENGLISH_10
} from './data/sampleExams';
import { getSectionsPreset } from './data/sectionPresets';

export const App: React.FC = () => {
  const { canEdit, isGuest } = useAuth();

  // Current Step (1 - 6)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Completed Steps Tracker
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  // Project state
  const [project, setProject] = useState<ExamProject>(() => {
    const all = loadProjects();
    const currId = getCurrentProjectId();
    const found = all.find(p => p.id === currId);
    return found ? JSON.parse(JSON.stringify(found)) : JSON.parse(JSON.stringify(SAMPLE_PHYSICS_10));
  });

  const [savedProjects, setSavedProjects] = useState<ExamProject[]>(() => loadProjects());
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Modal visibility states
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isActivationModalOpen, setIsActivationModalOpen] = useState(false);
  const [activationInitialTab, setActivationInitialTab] = useState<'code' | 'request'>('code');
  const [isCloudExamsModalOpen, setIsCloudExamsModalOpen] = useState(false);
  const [isOnlineStorageModalOpen, setIsOnlineStorageModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Validation issues
  const validationIssues = useMemo(() => validateProject(project), [project]);

  // Reload saved projects list
  const reloadSavedProjects = useCallback(() => {
    const list = loadProjects();
    setSavedProjects(list);
  }, []);

  // Auto-save debounced
  useEffect(() => {
    const timer = setTimeout(() => {
      saveProject(project);
      reloadSavedProjects();
      const timeStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
      setSaveStatus(`Đã lưu lúc ${timeStr}`);
    }, 800);

    return () => clearTimeout(timer);
  }, [project, reloadSavedProjects]);

  // Manual save
  const handleManualSave = () => {
    saveProject(project);
    reloadSavedProjects();
    const timeStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setSaveStatus(`Đã lưu lúc ${timeStr}`);
    alert('Đã lưu thành công ma trận vào bộ nhớ trình duyệt!');
  };

  // Step 1: General Info change
  const handleGeneralInfoChange = (patch: Partial<GeneralInfo>) => {
    setProject(prev => {
      const nextInfo = { ...prev.generalInfo, ...patch };
      // If subject changes, reset chapters and adjust presets
      let nextSections = prev.sections;
      let nextScope = {
        selectedChapterIds: prev.selectedChapterIds,
        selectedLessonIds: prev.selectedLessonIds,
        yccdSelections: prev.yccdSelections,
        allocations: prev.allocations
      };

      if (patch.subject && patch.subject !== prev.generalInfo.subject) {
        let presetId = 'thpt_ly';
        if (patch.subject === 'Toan') presetId = 'thpt_toan';
        else if (patch.subject === 'Hoa') presetId = 'thpt_hoa';
        else if (patch.subject === 'TiengAnh') presetId = 'thpt_tienganh';
        nextSections = getSectionsPreset(presetId);
        nextScope = {
          selectedChapterIds: [],
          selectedLessonIds: [],
          yccdSelections: {},
          allocations: []
        };
      }
      return {
        ...prev,
        ...nextScope,
        generalInfo: nextInfo,
        sections: nextSections,
        updatedAt: new Date().toISOString()
      };
    });
  };

  // Step 2: Scope change
  const handleUpdateScope = (chapterIds: string[], lessonIds: string[]) => {
    setProject(prev => ({
      ...prev,
      selectedChapterIds: chapterIds,
      selectedLessonIds: lessonIds,
      updatedAt: new Date().toISOString()
    }));
  };

  // Step 3: YCCD selections change
  const handleChangeYccdSelections = (selections: Record<string, YCCDSelection>) => {
    setProject(prev => ({
      ...prev,
      yccdSelections: selections,
      updatedAt: new Date().toISOString()
    }));
  };

  // Step 4: Sections & Target ratio change
  const handleChangeSections = (sections: Section[]) => {
    setProject(prev => ({
      ...prev,
      sections,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleChangeTargetRatio = (ratio: TargetRatio) => {
    setProject(prev => ({
      ...prev,
      targetRatio: ratio,
      updatedAt: new Date().toISOString()
    }));
  };

  // Step 5: Allocations change
  const handleChangeAllocations = (allocations: Allocation[]) => {
    setProject(prev => ({
      ...prev,
      allocations,
      updatedAt: new Date().toISOString()
    }));
  };

  // Step 6: Export settings change
  const handleUpdateExportSettings = (settingsPatch: Partial<ExportSettings>) => {
    setProject(prev => ({
      ...prev,
      exportSettings: {
        ...prev.exportSettings,
        ...settingsPatch
      },
      updatedAt: new Date().toISOString()
    }));
  };

  // Step Navigation
  const goToNextStep = () => {
    setCompletedSteps(prev => (prev.includes(currentStep) ? prev : [...prev, currentStep]));
    setCurrentStep(prev => Math.min(6, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Word Export handler
  const handleExportWord = async () => {
    setIsExporting(true);
    try {
      await exportExamToWord(project);
    } catch (err: any) {
      console.error('Word export error:', err);
      alert('Có lỗi xảy ra khi tạo tệp Word: ' + (err?.message || 'Vui lòng kiểm tra lại dữ liệu'));
    } finally {
      setIsExporting(false);
    }
  };

  // Sample loading
  const handleLoadSample = (sampleKey: 'physics10' | 'math10' | 'math12' | 'chemistry10' | 'english10') => {
    let chosen: ExamProject = SAMPLE_PHYSICS_10;
    if (sampleKey === 'math10') chosen = SAMPLE_MATH_10;
    if (sampleKey === 'math12') chosen = SAMPLE_MATH_12;
    if (sampleKey === 'chemistry10') chosen = SAMPLE_CHEMISTRY_10;
    if (sampleKey === 'english10') chosen = SAMPLE_ENGLISH_10;

    const cloned = JSON.parse(JSON.stringify(chosen));
    cloned.id = `project-${Date.now()}`;
    cloned.createdAt = new Date().toISOString();
    cloned.updatedAt = new Date().toISOString();

    setProject(cloned);
    saveProject(cloned);
    reloadSavedProjects();
    setCurrentStep(1);
    setCompletedSteps([1, 2, 3, 4, 5, 6]);
    alert(`Đã nạp thành công mẫu: ${cloned.generalInfo.examName}!`);
  };

  // New Exam Creation
  const handleNewExam = () => {
    if (confirm('Bạn có muốn tạo mới một ma trận và bản đặc tả đề thi? (Các thay đổi hiện tại đã được tự động lưu)')) {
      const sub = project.generalInfo.subject;
      let presetId = 'thpt_ly';
      if (sub === 'Toan') presetId = 'thpt_toan';
      else if (sub === 'Hoa') presetId = 'thpt_hoa';
      else if (sub === 'TiengAnh') presetId = 'thpt_tienganh';

      const isMath = sub === 'Toan';
      const newProj: ExamProject = {
        id: `project-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        generalInfo: {
          schoolName: 'TRƯỜNG THPT...',
          deptName: 'SỞ GD&ĐT... - TỔ BỘ MÔN',
          subject: sub,
          grade: project.generalInfo.grade,
          textbook: 'KNTT',
          semester: 'HK1',
          examType: 'GiuaKy',
          examName: 'ĐỀ KIỂM TRA ĐỊNH KÌ GIỮA HỌC KÌ I',
          schoolYear: '2026 - 2027',
          durationMinutes: isMath ? 90 : 50,
          maxScore: 10,
          teacherName: 'Tổ Chuyên môn',
          dateCreated: new Date().toISOString().split('T')[0]
        },
        selectedChapterIds: [],
        selectedLessonIds: [],
        yccdSelections: {},
        sections: getSectionsPreset(presetId),
        allocations: [],
        targetRatio: { NB: 40, TH: 30, VD: 30, basis: 'points' },
        exportSettings: {
          orientation: 'landscape',
          primaryColor: '#1E3A8A',
          fontFamily: 'Times New Roman',
          includeHeader: true,
          exportFormat: 'both',
          paperSize: 'A4'
        }
      };
      setProject(newProj);
      saveProject(newProj);
      reloadSavedProjects();
      setCurrentStep(1);
      setCompletedSteps([1]);
    }
  };

  const handleSelectProjectFromModal = (selected: ExamProject) => {
    setProject(JSON.parse(JSON.stringify(selected)));
    setCurrentStep(1);
    setIsSavedModalOpen(false);
  };

  const handleDuplicateProject = (p: ExamProject) => {
    const duplicated = duplicateProject(p);
    reloadSavedProjects();
    setProject(duplicated);
    setIsSavedModalOpen(false);
    alert(`Đã tạo bản sao: "${duplicated.generalInfo.examName}" thành công!`);
  };

  const handleDeleteProject = (id: string) => {
    deleteProject(id);
    reloadSavedProjects();
    if (project.id === id) {
      const remaining = loadProjects();
      if (remaining.length > 0) {
        setProject(JSON.parse(JSON.stringify(remaining[0])));
      } else {
        setProject(JSON.parse(JSON.stringify(SAMPLE_PHYSICS_10)));
      }
    }
  };

  if (!canEdit) {
    return <AuthGate />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 selection:bg-blue-600 selection:text-white">
      {/* 1. TOP HEADER */}
      <Header
        project={project}
        validationIssues={validationIssues}
        onSave={handleManualSave}
        onOpenSavedModal={() => {
          reloadSavedProjects();
          setIsSavedModalOpen(true);
        }}
        onOpenCurriculumModal={() => setIsCurriculumModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        onOpenHelpModal={() => setIsHelpModalOpen(true)}
        onLoadSample={handleLoadSample}
        onExportWord={handleExportWord}
        onLoadExam={handleSelectProjectFromModal}
        onNewExam={handleNewExam}
        onOpenActivationModal={() => {
          setActivationInitialTab('code');
          setIsActivationModalOpen(true);
        }}
        onOpenCloudExamsModal={() => setIsCloudExamsModalOpen(true)}
        onOpenOnlineStorageModal={() => setIsOnlineStorageModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onNavigateStep={setCurrentStep}
        isExporting={isExporting}
        saveStatus={saveStatus}
      />

      {/* 2. LICENSE BANNER (FOR GUESTS / EXPIRED USERS) */}
      <LicenseBanner
        onOpenActivationModal={tab => {
          setActivationInitialTab(tab || 'code');
          setIsActivationModalOpen(true);
        }}
      />

      {/* 3. STEPPER BAR (6 STEPS) */}
      <Stepper
        currentStep={currentStep}
        onSelectStep={handleSelectStep}
        completedSteps={completedSteps}
      />

      {/* 4. MAIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-5 sm:p-8 transition-all">
          {currentStep === 1 && (
            <Step1GeneralInfo
              generalInfo={project.generalInfo}
              onChange={handleGeneralInfoChange}
              onNext={goToNextStep}
              readOnly={!canEdit && !isGuest}
            />
          )}

          {currentStep === 2 && (
            <Step2Scope
              project={project}
              onUpdateSelection={handleUpdateScope}
              onNext={goToNextStep}
              onPrev={goToPrevStep}
            />
          )}

          {currentStep === 3 && (
            <Step3YCCD
              project={project}
              onChangeYccdSelections={handleChangeYccdSelections}
              onUpdateScope={handleUpdateScope}
              onNext={goToNextStep}
              onPrev={goToPrevStep}
            />
          )}

          {currentStep === 4 && (
            <Step4Structure
              project={project}
              onChangeSections={handleChangeSections}
              onChangeTargetRatio={handleChangeTargetRatio}
              onNext={goToNextStep}
              onPrev={goToPrevStep}
            />
          )}

          {currentStep === 5 && (
            <Step5Matrix
              project={project}
              onChangeAllocations={handleChangeAllocations}
              onNext={goToNextStep}
              onPrev={goToPrevStep}
            />
          )}

          {currentStep === 6 && (
            <Step6Export
              project={project}
              onUpdateExportSettings={handleUpdateExportSettings}
              onExportWord={handleExportWord}
              isExporting={isExporting}
              onJumpToStep={handleSelectStep}
              onPrev={goToPrevStep}
            />
          )}
        </div>
      </main>

      {/* 5. FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            STUDIO &quot;MATH TEST&quot; - Hệ thống Xây dựng Ma Trận & Bản Đặc Tả Đề Kiểm Tra Định Kì (GDPT 2018 - Cấu trúc 2025)
          </p>
          <p>
            Phát triển & Cố vấn chuyên môn: <strong className="text-blue-700">Thầy Hùng TBS</strong> • Hotline/Zalo:{' '}
            <strong className="text-slate-800">0907117193</strong> • Email:{' '}
            <span className="font-mono">tailieutoantbs@gmail.com</span>
          </p>
          <p className="text-[11px] text-slate-400">
            Bản quyền thuộc về STUDIO &quot;MATH TEST&quot; - Thầy Hùng TBS. Thiết kế chuẩn khung ma trận & bản đặc tả của Bộ Giáo dục và Đào tạo.
          </p>
        </div>
      </footer>

      {/* MODALS */}
      <SavedExamsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedProjects={savedProjects}
        currentProjectId={project.id}
        onSelectProject={handleSelectProjectFromModal}
        onDuplicateProject={handleDuplicateProject}
        onDeleteProject={handleDeleteProject}
        onReloadAllProjects={reloadSavedProjects}
      />

      <CurriculumModal
        isOpen={isCurriculumModalOpen}
        onClose={() => setIsCurriculumModalOpen(false)}
      />

      <ExportSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={project.exportSettings}
        onChange={handleUpdateExportSettings}
      />

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      <ActivationModal
        isOpen={isActivationModalOpen}
        onClose={() => setIsActivationModalOpen(false)}
        initialTab={activationInitialTab}
      />

      <CloudExamsModal
        isOpen={isCloudExamsModalOpen}
        onClose={() => setIsCloudExamsModalOpen(false)}
        onLoadExam={handleSelectProjectFromModal}
        onNewExam={handleNewExam}
      />

      <OnlineStorageModal
        isOpen={isOnlineStorageModalOpen}
        onClose={() => setIsOnlineStorageModalOpen(false)}
        currentProject={project}
        onLoadExam={handleSelectProjectFromModal}
      />

      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};

export default App;
