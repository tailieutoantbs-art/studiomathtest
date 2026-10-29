import { ExamProject } from '../types/exam';
import { DEFAULT_SAMPLES } from '../data/sampleExams';

const STORAGE_KEY_PROJECTS = 'thpt_exam_matrix_projects_v1';
const STORAGE_KEY_CURRENT_ID = 'thpt_exam_matrix_current_id_v1';

export function loadProjects(): ExamProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROJECTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(DEFAULT_SAMPLES));
      return DEFAULT_SAMPLES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_SAMPLES;
  } catch (err) {
    console.error('Failed to load projects from storage:', err);
    return DEFAULT_SAMPLES;
  }
}

export function saveProject(project: ExamProject): void {
  try {
    const projects = loadProjects();
    const idx = projects.findIndex(p => p.id === project.id);
    const updated: ExamProject = {
      ...project,
      updatedAt: new Date().toISOString()
    };
    if (idx >= 0) {
      projects[idx] = updated;
    } else {
      projects.unshift(updated);
    }
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
    localStorage.setItem(STORAGE_KEY_CURRENT_ID, updated.id);
  } catch (err) {
    console.error('Failed to save project:', err);
  }
}

export function deleteProject(id: string): void {
  try {
    const filtered = loadProjects().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to delete project:', err);
  }
}

export function duplicateProject(project: ExamProject): ExamProject {
  const cloned: ExamProject = {
    ...JSON.parse(JSON.stringify(project)),
    id: `project-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    generalInfo: {
      ...project.generalInfo,
      examName: `${project.generalInfo.examName} (Bản sao)`,
      dateCreated: new Date().toISOString().split('T')[0]
    }
  };
  saveProject(cloned);
  return cloned;
}

export function getCurrentProjectId(): string {
  return localStorage.getItem(STORAGE_KEY_CURRENT_ID) || DEFAULT_SAMPLES[0].id;
}

export function exportBackupJson(projects: ExamProject[]): void {
  const jsonStr = JSON.stringify(projects, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SaoLuu_MaTranDeThi_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importBackupJson(jsonString: string): ExamProject[] {
  try {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed)) {
      const existing = loadProjects();
      const map = new Map<string, ExamProject>();
      existing.forEach(p => map.set(p.id, p));
      parsed.forEach(p => {
        if (p && p.id && p.generalInfo) {
          map.set(p.id, p);
        }
      });
      const merged = Array.from(map.values());
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(merged));
      return merged;
    }
    throw new Error('Định dạng tệp sao lưu JSON không hợp lệ.');
  } catch (err) {
    console.error('Import failed:', err);
    throw err;
  }
}

