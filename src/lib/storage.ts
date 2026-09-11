import { ResumeData, CoverLetterData } from './types';
import { SAMPLE_RESUME, SAMPLE_COVER_LETTER } from './sample-data';

const RESUME_STORAGE_KEY = 'cvmake_resume_draft_v1';
const COVER_LETTER_STORAGE_KEY = 'cvmake_cover_letter_draft_v1';
const AUTOSAVE_FLAG_KEY = 'cvmake_autosave_enabled';

export function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = '__cvmake_storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function isAutosaveEnabled(): boolean {
  if (!isLocalStorageAvailable()) return false;
  const val = window.localStorage.getItem(AUTOSAVE_FLAG_KEY);
  return val === null ? true : val === 'true';
}

export function setAutosaveEnabled(enabled: boolean): void {
  if (!isLocalStorageAvailable()) return;
  window.localStorage.setItem(AUTOSAVE_FLAG_KEY, enabled ? 'true' : 'false');
}

export function loadSavedResume(): ResumeData {
  if (!isLocalStorageAvailable()) return SAMPLE_RESUME;
  try {
    const raw = window.localStorage.getItem(RESUME_STORAGE_KEY);
    if (!raw) return SAMPLE_RESUME;
    const parsed = JSON.parse(raw);
    return { ...SAMPLE_RESUME, ...parsed };
  } catch (err) {
    console.warn('Error reading from localStorage:', err);
    return SAMPLE_RESUME;
  }
}

export function saveResumeToLocal(resume: ResumeData): boolean {
  if (!isLocalStorageAvailable() || !isAutosaveEnabled()) return false;
  try {
    window.localStorage.setItem(RESUME_STORAGE_KEY, JSON.stringify(resume));
    return true;
  } catch (err) {
    console.error('Failed to save resume locally:', err);
    return false;
  }
}

export function clearResumeData(): void {
  if (!isLocalStorageAvailable()) return;
  window.localStorage.removeItem(RESUME_STORAGE_KEY);
}

export function loadSavedCoverLetter(): CoverLetterData {
  if (!isLocalStorageAvailable()) return SAMPLE_COVER_LETTER;
  try {
    const raw = window.localStorage.getItem(COVER_LETTER_STORAGE_KEY);
    if (!raw) return SAMPLE_COVER_LETTER;
    return { ...SAMPLE_COVER_LETTER, ...JSON.parse(raw) };
  } catch {
    return SAMPLE_COVER_LETTER;
  }
}

export function saveCoverLetterToLocal(data: CoverLetterData): boolean {
  if (!isLocalStorageAvailable() || !isAutosaveEnabled()) return false;
  try {
    window.localStorage.setItem(COVER_LETTER_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function exportResumeAsJSON(resume: ResumeData): void {
  if (typeof window === 'undefined') return;
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(resume, null, 2)
  )}`;
  const downloadAnchor = document.createElement('a');
  const filename = `${resume.personalInfo.fullName.replace(/\s+/g, '_') || 'My'}_Resume_CVMake.json`;
  downloadAnchor.setAttribute('href', jsonString);
  downloadAnchor.setAttribute('download', filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
