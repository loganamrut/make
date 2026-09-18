'use client';

import React, { useRef, useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Sparkles,
  ShieldCheck,
  FileCheck,
  Layers,
  Download,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Chapter {
  id: string;
  stepNumber: string;
  title: string;
  time: number;
  icon: React.ElementType;
  badgeColor: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'step-1',
    stepNumber: '01',
    title: 'Upload & OCR',
    time: 3.2,
    icon: FileCheck,
    badgeColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
  },
  {
    id: 'step-2',
    stepNumber: '02',
    title: 'AI Polish & ATS',
    time: 8.2,
    icon: Sparkles,
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  },
  {
    id: 'step-3',
    stepNumber: '03',
    title: '17 ATS Templates',
    time: 13.8,
    icon: Layers,
    badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
  },
  {
    id: 'step-4',
    stepNumber: '04',
    title: 'Vector PDF Export',
    time: 19.2,
    icon: Download,
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  },
];

export function HowItWorksVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(25);
  const [isMuted, setIsMuted] = useState(true);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      setHasStartedPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
    setHasStartedPlaying(true);
  };

  const seekToChapter = (chapterTime: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = chapterTime;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
    setHasStartedPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    setCurrentTime(cur);

    if (cur < 8.2) {
      setActiveChapterIndex(0);
    } else if (cur < 13.8) {
      setActiveChapterIndex(1);
    } else if (cur < 19.2) {
      setActiveChapterIndex(2);
    } else {
      setActiveChapterIndex(3);
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    if (videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!videoRef.current) return;
    videoRef.current.currentTime = val;
    setCurrentTime(val);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <figure
      itemScope
      itemType="https://schema.org/VideoObject"
      className="mb-14 rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-950 shadow-xl"
    >
      <meta
        itemProp="name"
        content="How CVMake AI Resume Builder & AI CV Maker Works (4-Step Video Guide)"
      />
      <meta
        itemProp="description"
        content="Learn how CVMake creates ATS-friendly resumes in 4 easy steps using in-browser Neural OCR, Gemini AI bullet optimization, 17 recruiter-tested templates, and vector PDF download with 100% privacy."
      />
      <meta
        itemProp="thumbnailUrl"
        content="https://cvmake.dev/images/how-it-works-video-poster.jpg"
      />
      <meta itemProp="uploadDate" content="2026-09-18T00:00:00+00:00" />
      <meta
        itemProp="contentUrl"
        content="https://cvmake.dev/videos/how-it-works-ai-resume-builder.mp4"
      />
      <meta
        itemProp="embedUrl"
        content="https://cvmake.dev/videos/how-it-works-ai-resume-builder.mp4"
      />
      <meta itemProp="duration" content="PT25S" />

      {/* Top Chapter Navigation Tabs */}
      <div className="bg-slate-900 border-b border-slate-800 p-3 sm:p-4 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 hidden md:inline">
            Skip to Step:
          </span>
          {CHAPTERS.map((ch, idx) => {
            const Icon = ch.icon;
            const isActive = activeChapterIndex === idx;
            return (
              <button
                key={ch.id}
                onClick={() => seekToChapter(ch.time)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? `${ch.badgeColor} ring-1 ring-white/20 shadow-sm font-bold`
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                }`}
                title={`Jump to Step ${ch.stepNumber}: ${ch.title}`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="opacity-70 font-mono text-[10px]">{ch.stepNumber}</span>
                <span>{ch.title}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-400 font-medium pl-3 border-l border-slate-800">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% In-Browser Privacy</span>
        </div>
      </div>

      {/* Video Display Container */}
      <div className="relative w-full aspect-video bg-black group">
        <video
          ref={videoRef}
          src="/videos/how-it-works-ai-resume-builder.mp4"
          poster="/images/how-it-works-video-poster.jpg"
          preload="metadata"
          playsInline
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
          className="w-full h-full object-contain cursor-pointer"
        >
          <track
            kind="subtitles"
            src="/videos/how-it-works.vtt"
            srcLang="en"
            label="English"
            default
          />
          Your browser does not support HTML5 video. You can download the video directly at /videos/how-it-works-ai-resume-builder.mp4.
        </video>

        {/* Center Play Overlay when Paused */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-[2px] cursor-pointer transition-opacity"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-600/90 hover:bg-indigo-600 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all ring-4 ring-white/20">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-white" />
            </div>
            <p className="mt-4 text-white text-sm sm:text-base font-bold drop-shadow-md">
              {hasStartedPlaying ? 'Click to Resume Video' : 'Watch How CVMake AI Works (25s)'}
            </p>
            <span className="mt-1 text-xs text-slate-300 drop-shadow">
              Neural OCR • Gemini AI Polish • 17 ATS Templates • Vector PDF
            </span>
          </div>
        )}

        {/* Custom Controls Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-3 sm:p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Progress Timeline Scrubber */}
          <div className="relative mb-2.5 flex items-center">
            <input
              type="range"
              min={0}
              max={duration || 25}
              step={0.1}
              value={currentTime}
              onChange={handleSeekChange}
              aria-label="Video scrubber"
              className="w-full h-1.5 bg-slate-700/80 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:h-2 transition-all"
            />
          </div>

          <div className="flex items-center justify-between text-white text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              <button
                onClick={restartVideo}
                aria-label="Restart video"
                title="Restart"
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                title={isMuted ? 'Unmute' : 'Mute'}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>

              <span className="font-mono text-xs text-slate-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Full HD 1080p
              </span>
              <button
                onClick={toggleFullscreen}
                aria-label="Toggle fullscreen"
                title="Fullscreen"
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Figcaption Bar & SEO Transcript Accordion */}
      <figcaption className="p-4 bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              Interactive Video Guide
            </span>
            <span className="font-semibold text-white">
              How CVMake AI Resume Builder Works: 4-Step Walkthrough
            </span>
          </div>

          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            <span>{showTranscript ? 'Hide Video Transcript' : 'Read Video Transcript'}</span>
            {showTranscript ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Collapsible SEO-Friendly Video Transcript */}
        {showTranscript && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
            <p className="font-bold text-white text-xs uppercase tracking-wider">
              Full Video Transcript (CVMake Step-by-Step AI Resume Builder):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <span className="font-bold text-indigo-400 block mb-1">
                  00:03 – Step 1: Upload Documents &amp; Neural OCR
                </span>
                <p className="text-slate-300 text-xs">
                  Upload existing PDF resumes, Microsoft Word DOCX files, or photographed paper resumes. Built-in Mozilla pdfjs vector text extraction and Tesseract 4.0.0_best LSTM Neural OCR ingest 100% of your career history directly in your browser.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <span className="font-bold text-emerald-400 block mb-1">
                  00:08 – Step 2: Gemini AI Polish &amp; Live ATS Score
                </span>
                <p className="text-slate-300 text-xs">
                  Transform passive job duties into quantifiable achievement bullets using the Google XYZ formula (Accomplished [X] by doing [Z], measured by [Y]). Live ATS scoring audits action verbs, metric density, and keyword match for an immediate 98/100 score.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <span className="font-bold text-purple-400 block mb-1">
                  00:14 – Step 3: 17 Recruiter-Approved ATS Templates
                </span>
                <p className="text-slate-300 text-xs">
                  Switch instantly between 17 recruiter-tested templates (ATS Standard, Modern Accent, Career Timeline, Metro Modular, Tech Stack, and Two-Column Hybrid). Customize themes, fonts, and margins with zero content loss.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <span className="font-bold text-amber-400 block mb-1">
                  00:19 – Step 4: 1-Click Vector PDF &amp; Print Export
                </span>
                <p className="text-slate-300 text-xs">
                  Download crisp, unwatermarked vector PDFs engineered to achieve 100% parsing accuracy across Taleo, Workday, Greenhouse, and Lever. 100% private in-browser processing with zero cloud database storage.
                </p>
              </div>
            </div>
          </div>
        )}
      </figcaption>
    </figure>
  );
}
