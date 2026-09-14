'use client';

import React, { useState, useRef } from 'react';
import { ResumeData } from '@/lib/types';
import { SAMPLE_RESUME } from '@/lib/sample-data';
import { parseResumeDocumentsWithGemini, UploadedDocumentFile } from '@/lib/gemini-client';
import {
  Upload,
  FileText,
  FileCode,
  Image as ImageIcon,
  Sparkles,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Target,
  FileCheck
} from 'lucide-react';

interface AIUploadStepProps {
  onSuccess: (extractedResume: ResumeData) => void;
  onSkip: () => void;
}

const MAX_DOCUMENTS = 3;

export function AIUploadStep({ onSuccess, onSkip }: AIUploadStepProps) {
  const [files, setFiles] = useState<UploadedDocumentFile[]>([]);
  const [targetRole, setTargetRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File): Promise<UploadedDocumentFile> => {
    return new Promise((resolve, reject) => {
      const isImage = file.type.startsWith('image/');
      const isPdf = file.type === 'application/pdf';
      const isText = file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md');

      if (isText) {
        const reader = new FileReader();
        reader.onload = e => {
          resolve({
            name: file.name,
            mimeType: 'text/plain',
            size: file.size,
            textContent: e.target?.result as string,
          });
        };
        reader.onerror = reject;
        reader.readAsText(file);
      } else if (isPdf || isImage) {
        const reader = new FileReader();
        reader.onload = e => {
          const result = e.target?.result as string;
          // Extract pure base64 (after comma)
          const base64 = result.split(',')[1];
          resolve({
            name: file.name,
            mimeType: file.type || (isPdf ? 'application/pdf' : 'image/jpeg'),
            size: file.size,
            base64Data: base64,
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      } else {
        // Fallback: read text
        const reader = new FileReader();
        reader.onload = e => {
          resolve({
            name: file.name,
            mimeType: 'text/plain',
            size: file.size,
            textContent: (e.target?.result as string) || '',
          });
        };
        reader.onerror = reject;
        reader.readAsText(file);
      }
    });
  };

  const handleFilesAdded = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setErrorMessage('');

    const newFiles: UploadedDocumentFile[] = [];
    const remainingSlots = MAX_DOCUMENTS - files.length;

    if (remainingSlots <= 0) {
      setErrorMessage(`Maximum of ${MAX_DOCUMENTS} documents allowed. Please remove a document first.`);
      return;
    }

    const toProcess = Array.from(fileList).slice(0, remainingSlots);

    for (const f of toProcess) {
      try {
        const processed = await processFile(f);
        newFiles.push(processed);
      } catch (err) {
        console.error('File parsing error:', err);
        setErrorMessage(`Could not read file "${f.name}".`);
      }
    }

    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAnalyze = async () => {
    if (files.length === 0) {
      setErrorMessage('Please upload at least one document (PDF, Word, Image, or Text).');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');
    setCurrentStatus('Scanning document structures & text layers...');

    try {
      const extracted = await parseResumeDocumentsWithGemini(
        files,
        targetRole,
        jobDescription,
        status => setCurrentStatus(status)
      );

      onSuccess(extracted);
    } catch (err: any) {
      console.error('Extraction error:', err);
      setErrorMessage(
        err.message || 'AI extraction encountered an issue. You can retry or proceed with sample data.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <ImageIcon className="w-5 h-5 text-indigo-500" />;
    if (mimeType === 'application/pdf') return <FileText className="w-5 h-5 text-rose-500" />;
    return <FileCode className="w-5 h-5 text-emerald-500" />;
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Studio Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
          <span>Advanced AI Resume Engine</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="text-[11px] text-emerald-700 font-semibold">Live Multimodal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          AI Resume Builder &amp; AI CV Maker
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Upload up to <strong className="text-slate-900 font-semibold">3 documents</strong> (old resumes, LinkedIn PDF, certificates, job descriptions). Our AI extracts, optimizes, and transforms your experience into an interview-winning ATS resume.
        </p>
      </div>

      {/* Upload Box */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
        {/* Dropzone */}
        <div
          onDragOver={e => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={e => {
            e.preventDefault();
            setIsDragging(false);
            handleFilesAdded(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 sm:p-10 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50/50 scale-[0.99]'
              : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.docx,.txt,.png,.jpg,.jpeg,.webp"
            onChange={e => handleFilesAdded(e.target.files)}
            className="hidden"
          />

          <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 mx-auto flex items-center justify-center mb-4 shadow-sm">
            <Upload className="w-7 h-7" />
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
            Drag &amp; Drop Documents Here or <span className="text-indigo-600 underline">Browse</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Upload up to <strong className="text-slate-700 font-semibold">3 files</strong> (PDF, Word DOCX, TXT, or PNG/JPG image scans). Max 10MB each.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span className="px-2 py-0.5 bg-slate-100 rounded-md font-mono font-medium">.PDF</span>
            <span className="px-2 py-0.5 bg-slate-100 rounded-md font-mono font-medium">.DOCX</span>
            <span className="px-2 py-0.5 bg-slate-100 rounded-md font-mono font-medium">.TXT</span>
            <span className="px-2 py-0.5 bg-slate-100 rounded-md font-mono font-medium">.PNG / .JPG</span>
          </div>
        </div>

        {/* Uploaded Documents List */}
        {files.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
              <span>Attached Documents ({files.length} / {MAX_DOCUMENTS})</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ready for AI Analysis
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 flex items-center justify-between gap-3 group hover:border-indigo-300 transition-colors"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    {getFileIcon(file.mimeType)}
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-900 truncate" title={file.name}>
                        {file.name}
                      </p>
                      <span className="text-[11px] text-slate-500">{formatFileSize(file.size)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      handleRemoveFile(idx);
                    }}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                    title="Remove file"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Optional Custom Targeting */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              Target Role (Optional)
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={e => setTargetRole(e.target.value)}
              placeholder="e.g. Senior Software Engineer / Product Manager"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-indigo-600" />
              Job Description Keywords (Optional)
            </label>
            <input
              type="text"
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              placeholder="Paste job posting snippet or core keywords..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white"
            />
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">Unable to Complete AI Extraction</p>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="p-6 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-center space-y-4 animate-in fade-in duration-300">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-200 animate-spin">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-slate-900">
                Analyzing with AI...
              </h4>
              <p className="text-xs sm:text-sm text-indigo-700 font-medium mt-1">
                {currentStatus || 'Processing uploaded documents...'}
              </p>
            </div>
            <div className="max-w-md mx-auto space-y-2 text-left text-xs text-slate-600 pt-2 border-t border-indigo-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Multimodal document parsing (PDF, images, and text)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Structuring experience with Google XYZ formula</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% In-Browser Privacy — zero server database storage</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={onSkip}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors py-2 px-3"
          >
            Skip &amp; Start from Scratch &rarr;
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onSuccess(SAMPLE_RESUME)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Load Sample Profile
            </button>
            <button
              type="button"
              disabled={files.length === 0 || isProcessing}
              onClick={handleAnalyze}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all ${
                files.length === 0 || isProcessing
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:shadow-lg active:scale-95'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Analyze with AI &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Callout */}
      <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between gap-4 text-xs text-emerald-950">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
          <span>
            <strong>100% Private:</strong> Document processing runs directly in your browser. We never store or log your documents on any server.
          </span>
        </div>
      </div>
    </div>
  );
}
