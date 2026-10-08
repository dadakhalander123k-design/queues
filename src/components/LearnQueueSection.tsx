import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Clock,
  Lightbulb,
  Layers,
  Code2,
  Copy,
  CheckCheck,
  Cpu,
  ListOrdered,
} from 'lucide-react';
import { TechniqueType } from '../types/game';
import { progressManager, normalizeTheoryChapterId } from '../utils/progressManager';
import { soundManager } from '../utils/audio';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { TheoryVisualEnhancer } from './TheoryVisualEnhancer';
import { QUEUE_MODULES, QueueModule } from '../data/queueTheory';

export interface LearnQueueSectionProps {
  initialTopic?: string;
  onStartLevel?: (levelId: number) => void;
  onOpenSandbox?: (technique?: TechniqueType, size?: number) => void;
}

export const LearnQueueSection: React.FC<LearnQueueSectionProps> = ({
  initialTopic = 'theory-01',
  onStartLevel,
  onOpenSandbox,
}) => {
  useScrollReveal();

  // Active Chapter State
  const [activeChapterId, setActiveChapterId] = useState<string>(() =>
    normalizeTheoryChapterId(initialTopic)
  );

  // Search Filter State for Table of Contents
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active Code Language Tab (C, C++, Java, Python)
  const [selectedLang, setSelectedLang] = useState<'c' | 'cpp' | 'java' | 'python'>('c');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Progress State from Single Source of Truth
  const [pState, setPState] = useState(() => progressManager.getState());

  useEffect(() => {
    if (initialTopic) {
      const normalized = normalizeTheoryChapterId(initialTopic);
      setActiveChapterId(normalized);
    }
  }, [initialTopic]);

  useEffect(() => {
    const unsub = progressManager.subscribe((state) => {
      setPState(state);
    });
    return () => unsub();
  }, []);

  const activeModuleIndex = QUEUE_MODULES.findIndex(
    (m) => m.id === activeChapterId || m.id === normalizeTheoryChapterId(activeChapterId)
  );
  const activeModule: QueueModule =
    activeModuleIndex >= 0 ? QUEUE_MODULES[activeModuleIndex] : QUEUE_MODULES[0];

  const completedChapters = pState.completedTheoryChapters || [];
  const isCurrentModuleCompleted = completedChapters.includes(activeModule.id);
  const totalCompletedCount = completedChapters.length;
  const theoryPercentage = Math.round((totalCompletedCount / QUEUE_MODULES.length) * 100);

  // Scroll-to-reveal hook
  useScrollReveal([activeModule.id]);

  // Handle Copy Code Snippet
  const handleCopyCode = () => {
    const codeToCopy =
      activeModule.codeSnippets?.[selectedLang] ||
      activeModule.codeSnippets?.c ||
      activeModule.rawLesson?.codeSnippet?.[selectedLang] ||
      '';
    if (navigator.clipboard && codeToCopy) {
      navigator.clipboard.writeText(codeToCopy).then(() => {
        setCopiedCode(true);
        soundManager.playClick();
        setTimeout(() => setCopiedCode(false), 2000);
      });
    }
  };

  // Selecting a chapter in the sidebar
  const handleSelectModule = (moduleId: string) => {
    soundManager.playSelect();
    const normalized = normalizeTheoryChapterId(moduleId);
    setActiveChapterId(normalized);
    progressManager.setCurrentTheoryChapter(normalized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mark Module as Completed
  const handleMarkCompleted = () => {
    if (isCurrentModuleCompleted) return;
    const newlyCompleted = progressManager.completeTheoryChapter(activeModule.id);
    if (newlyCompleted) {
      soundManager.playTheoryComplete();
    }
  };

  // Next Module Action
  const handleNextModule = () => {
    soundManager.playNav();
    if (activeModuleIndex < QUEUE_MODULES.length - 1) {
      const nextMod = QUEUE_MODULES[activeModuleIndex + 1];
      setActiveChapterId(nextMod.id);
      progressManager.setCurrentTheoryChapter(nextMod.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Previous Module Action
  const handlePrevModule = () => {
    soundManager.playNav();
    if (activeModuleIndex > 0) {
      const prevMod = QUEUE_MODULES[activeModuleIndex - 1];
      setActiveChapterId(prevMod.id);
      progressManager.setCurrentTheoryChapter(prevMod.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Filtered list of modules
  const filteredModules = QUEUE_MODULES.filter((m) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      m.title.toLowerCase().includes(q) ||
      m.subtitle.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q) ||
      m.summary.toLowerCase().includes(q) ||
      m.number.includes(q)
    );
  });

  const activeCode =
    activeModule.codeSnippets?.[selectedLang] ||
    activeModule.rawLesson?.codeSnippet?.[selectedLang] ||
    '';

  return (
    <div className="w-full max-w-7xl mx-auto py-2 sm:py-4 px-2 sm:px-4 space-y-6 font-sans text-slate-900 dark:text-white animate-page-enter">
      {/* =========================================================================
          1. HEADER SECTION
          ========================================================================= */}
      <div className="border border-slate-200 dark:border-blue-500/20 rounded-2xl pt-5 pb-6 px-6 sm:px-8 bg-white dark:bg-[#111827] shadow-xs dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] reveal-on-scroll">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 bg-[#EFF6FF] dark:bg-blue-950/60 text-[#2563EB] dark:text-[#3B82F6] border border-[#DBEAFE] dark:border-blue-500/30 rounded-md text-xs font-semibold uppercase tracking-wider font-mono">
              THEORY CURRICULUM // VOL. 01
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 font-sans">
              Queue Fundamentals &amp; Advanced Variants
            </span>
          </div>
          <div className="text-xs font-mono text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#0F172A] px-3 py-1 rounded-lg border border-slate-200 dark:border-blue-500/20 flex items-center gap-2">
            <span>Progress:</span>
            <span className="text-[#2563EB] dark:text-[#3B82F6] font-bold">{totalCompletedCount}</span> / {QUEUE_MODULES.length} Chapters
            <span className="font-bold text-slate-900 dark:text-white">({theoryPercentage}%)</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight animate-heading-enter">
          Queue Data Structure Curriculum
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl mt-2 leading-relaxed font-normal">
          A comprehensive 20-chapter technical curriculum covering Queue FIFO fundamentals, FRONT and REAR pointer mechanics, Enqueue and Dequeue operations, Circular Queues with modulo wraparound, Linked List queues, Priority Queues, Deque, Breadth-First Search (BFS), and multi-language code in C, C++, Java, and Python.
        </p>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-4">
          <div
            className="bg-[#2563EB] dark:bg-[#3B82F6] h-full transition-all duration-300 rounded-full"
            style={{ width: `${theoryPercentage}%` }}
          />
        </div>
      </div>

      {/* =========================================================================
          2. TWO-COLUMN INTERFACE:
             Left Sidebar: Table of Contents & Search Box (20 Modules)
             Right Main: Active Module Learning Canvas
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* =========================================================================
            LEFT COLUMN: TABLE OF CONTENTS (20 CHAPTERS)
            ========================================================================= */}
        <aside className="lg:col-span-4 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-blue-500/20 rounded-2xl shadow-xs dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col sticky top-20 max-h-[calc(100vh-6rem)]">
          {/* Header Row */}
          <div className="px-5 py-3.5 sm:px-6 sm:py-4 border-b border-slate-100 dark:border-blue-500/15 bg-slate-50/70 dark:bg-[#0F172A] flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono">
              TABLE OF CONTENTS
            </span>
            <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 font-semibold">
              {QUEUE_MODULES.length} Chapters
            </span>
          </div>

          {/* Search Box */}
          <div className="p-3 border-b border-slate-100 dark:border-blue-500/15 bg-white dark:bg-[#111827]">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chapters..."
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-blue-500/20 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#2563EB] dark:focus:border-[#3B82F6]"
              />
            </div>
          </div>

          {/* Chapter List */}
          <nav className="divide-y divide-slate-100 dark:divide-blue-500/10 overflow-y-auto custom-scrollbar flex-1" aria-label="Table of Contents">
            {filteredModules.map((mod) => {
              const isSelected = activeModule.id === mod.id;
              const isCompleted = completedChapters.includes(mod.id);

              return (
                <button
                  key={mod.id}
                  id={`btn-chapter-${mod.id}`}
                  onClick={() => handleSelectModule(mod.id)}
                  className={`w-full text-left px-4 py-3 sm:px-5 sm:py-3.5 transition-all flex items-center justify-between gap-3 cursor-pointer group select-none ${
                    isSelected
                      ? 'bg-[#EFF6FF] dark:bg-blue-950/60 text-[#2563EB] dark:text-[#3B82F6] font-bold border-l-4 border-l-[#2563EB] dark:border-l-[#3B82F6]'
                      : 'bg-white dark:bg-[#111827] text-slate-700 dark:text-slate-300 hover:bg-[#EFF6FF] dark:hover:bg-[#172033] hover:text-[#2563EB] font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span
                      className={`text-xs font-mono font-bold w-6 shrink-0 text-left ${
                        isSelected
                          ? 'text-[#2563EB] dark:text-[#3B82F6]'
                          : 'text-slate-400 dark:text-slate-500 group-hover:text-[#2563EB] dark:group-hover:text-slate-200'
                      }`}
                    >
                      {mod.number}
                    </span>
                    <span
                      className={`text-xs sm:text-sm leading-snug font-sans font-semibold truncate ${
                        isSelected
                          ? 'text-[#2563EB] dark:text-[#3B82F6] font-bold'
                          : 'text-slate-800 dark:text-slate-200 group-hover:text-[#2563EB] dark:group-hover:text-white'
                      }`}
                    >
                      {mod.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {isCompleted ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm" title="Completed">
                        ✓
                      </span>
                    ) : isSelected ? (
                      <span className="text-[#2563EB] dark:text-[#3B82F6] text-xs font-bold" title="Current">
                        ●
                      </span>
                    ) : (
                      <span className="text-slate-300 dark:text-slate-600 text-xs font-normal" title="Available">
                        ○
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Bottom Status Footer */}
          <div className="px-5 py-3.5 sm:px-6 sm:py-3.5 bg-slate-50/80 dark:bg-[#0F172A] border-t border-slate-100 dark:border-blue-500/15 flex items-center justify-between text-xs sm:text-sm font-sans">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Status:</span>
            <span className="font-bold text-slate-900 dark:text-white font-mono">
              {totalCompletedCount} / {QUEUE_MODULES.length} Completed
            </span>
          </div>
        </aside>

        {/* =========================================================================
            RIGHT COLUMN: ACTIVE MODULE LEARNING CANVAS
            ========================================================================= */}
        <main
          key={activeModule.id}
          className="lg:col-span-8 bg-white dark:bg-[#111827] border border-slate-200 dark:border-blue-500/20 rounded-2xl p-6 sm:p-8 shadow-xs dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] space-y-6 animate-chapter-switch"
        >
          {/* Module Header Bar */}
          <div className="border-b border-slate-100 dark:border-blue-500/15 pb-5 space-y-2.5">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <a href="#/overview" className="hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors">Home</a>
              <span>/</span>
              <a href="#/learn" className="hover:text-[#2563EB] dark:hover:text-[#3B82F6] transition-colors">Theory</a>
              <span>/</span>
              <span className="text-slate-800 dark:text-slate-200 font-semibold truncate">Chapter {activeModule.number}: {activeModule.title}</span>
            </nav>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#EFF6FF] dark:bg-blue-950/60 border border-[#DBEAFE] dark:border-blue-500/30 text-[#2563EB] dark:text-[#3B82F6] rounded-md text-xs sm:text-sm font-bold uppercase tracking-wider font-mono">
                  Module {activeModule.number} // {activeModule.category}
                </span>
                {isCurrentModuleCompleted && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded-md text-xs sm:text-sm font-bold font-sans">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                    <span>Completed</span>
                  </span>
                )}
              </div>
              <div className="text-xs sm:text-sm font-sans text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
                <span>Est. Read: {activeModule.readTime}</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight pt-1">
              {activeModule.title}
            </h2>
            <p className="text-base sm:text-lg font-bold text-[#2563EB] dark:text-[#3B82F6]">
              {activeModule.subtitle}
            </p>

            {/* Executive Concept Box */}
            {activeModule.executiveDefinition && (
              <div className="mt-3 p-4 sm:p-5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-blue-500/20 rounded-xl text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                <strong className="text-slate-900 dark:text-white font-bold block mb-1.5 text-base sm:text-[17px]">
                  1. Executive Definition:
                </strong>
                {activeModule.executiveDefinition}
              </div>
            )}
          </div>

          {/* Everyday Real-Life Analogy Card */}
          {activeModule.analogyContent && (
            <div className="bg-[#EFF6FF]/60 dark:bg-blue-950/30 border-l-4 border-l-[#2563EB] dark:border-l-[#3B82F6] border border-[#DBEAFE] dark:border-blue-500/20 rounded-r-xl p-4 sm:p-5 text-slate-800 dark:text-slate-200 leading-relaxed space-y-1.5 shadow-xs reveal-on-scroll">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-mono">
                <Lightbulb className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
                <span>Intuition: {activeModule.analogyTitle || 'Real-World Model'}</span>
              </div>
              <p className="text-base sm:text-[17px] text-slate-800 dark:text-slate-200 leading-relaxed italic pt-1 font-normal">
                "{activeModule.analogyContent}"
              </p>
            </div>
          )}

          {/* Critical Specifications / Key Rules */}
          {activeModule.criticalSpecifications && activeModule.criticalSpecifications.length > 0 && (
            <div className="space-y-2.5 p-4 sm:p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 reveal-on-scroll">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                  Key Rules &amp; Critical Specifications
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-100/80 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border border-amber-300/60 dark:border-amber-700/60 ml-auto">
                  Essential
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {activeModule.criticalSpecifications.map((spec, sIdx) => {
                  const colonIndex = spec.indexOf(':');
                  const hasColon = colonIndex > 0;
                  const titlePart = hasColon ? spec.slice(0, colonIndex + 1) : '';
                  const descPart = hasColon ? spec.slice(colonIndex + 1) : spec;

                  return (
                    <div
                      key={sIdx}
                      className="p-3 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-amber-200/80 dark:border-amber-800/40 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 shadow-2xs"
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400 mt-1.5 shrink-0" />
                      <span className="leading-snug">
                        {hasColon ? (
                          <>
                            <strong className="font-bold text-slate-900 dark:text-slate-100">{titlePart} </strong>
                            <span>{descPart}</span>
                          </>
                        ) : (
                          <span>{spec}</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step-by-Step Example */}
          {activeModule.example && (
            <div className="p-4 sm:p-5 bg-white dark:bg-[#172033] rounded-2xl border border-slate-200 dark:border-blue-500/20 space-y-3 shadow-2xs reveal-on-scroll">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  STEP-BY-STEP EXAMPLE
                </span>
                <span className="text-xs sm:text-sm font-bold font-mono">{activeModule.example.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                {activeModule.example.description}
              </p>
              {activeModule.example.steps && (
                <div className="space-y-1.5 pt-1">
                  {activeModule.example.steps.map((step, stIdx) => (
                    <div
                      key={stIdx}
                      className="p-2.5 bg-slate-50 dark:bg-[#0F172A] rounded-xl border border-slate-100 dark:border-slate-800 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 flex items-center gap-2"
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {stIdx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Visual Schematic Diagram */}
          {activeModule.visualDiagram?.diagramText && (
            <div className="space-y-2 reveal-on-scroll">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
                  <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Visual Diagram: {activeModule.visualDiagram.operationLabel || 'Queue Layout'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Schematic Architecture
                </span>
              </div>

              <div className="p-4 bg-slate-950 text-blue-200 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto shadow-inner">
                <pre className="leading-relaxed whitespace-pre">
                  {activeModule.visualDiagram.diagramText}
                </pre>
                {activeModule.visualDiagram.notes && (
                  <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    💡 {activeModule.visualDiagram.notes}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Interactive Visualization / Playground */}
          <div className="space-y-3 pt-2 reveal-on-scroll">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-blue-500/15">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
                <span className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                  Interactive Visualization &amp; Simulation
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#2563EB] dark:text-[#3B82F6] font-bold bg-[#EFF6FF] dark:bg-blue-950 px-2 py-0.5 rounded border border-[#DBEAFE] dark:border-blue-500/30">
                Live Interactive Demo
              </span>
            </div>

            <div className="w-full">
              <TheoryVisualEnhancer chapterId={activeModule.id} />
            </div>
          </div>

          {/* Multi-Language Code Snippet Implementation */}
          {activeCode && (
            <div className="space-y-3 pt-2 reveal-on-scroll">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-100 dark:border-blue-500/15">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
                  <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    Implementation Code
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  {(['c', 'cpp', 'java', 'python'] as const).map((lang) => {
                    const labels = { c: 'C', cpp: 'C++', java: 'JAVA', python: 'PYTHON' };
                    const isActiveLang = selectedLang === lang;

                    return (
                      <button
                        key={lang}
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedLang(lang);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                          isActiveLang
                            ? 'bg-white dark:bg-slate-900 text-[#2563EB] dark:text-[#3B82F6] shadow-2xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {labels[lang]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs overflow-hidden border border-slate-800 shadow-md">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="text-[11px] text-slate-400 ml-2 font-mono">
                      queue_{selectedLang}.{selectedLang === 'python' ? 'py' : selectedLang === 'java' ? 'java' : selectedLang === 'cpp' ? 'cpp' : 'c'}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-[13px] leading-relaxed text-blue-200">
                  <code>{activeCode}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Key Takeaway Card */}
          <div className="p-5 bg-slate-900 dark:bg-slate-950 text-white rounded-2xl space-y-2 border border-slate-800 shadow-sm reveal-on-scroll">
            <div className="flex items-center gap-2 text-amber-400 font-mono">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-extrabold uppercase tracking-wider">
                Key Takeaway
              </span>
            </div>
            <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-100">
              {activeModule.keyTakeaway}
            </p>
          </div>

          {/* Chapter Completion & Navigation Bar */}
          <div className="pt-6 border-t border-slate-100 dark:border-blue-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleMarkCompleted}
              className={`w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                isCurrentModuleCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-500 hover:from-blue-800 hover:via-blue-700 hover:to-indigo-600 text-white shadow-md shadow-blue-600/25'
              }`}
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>
                {isCurrentModuleCompleted ? 'Chapter Completed ✓ (+35 XP)' : 'Mark Chapter as Completed (+35 XP)'}
              </span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <button
                onClick={handlePrevModule}
                disabled={activeModuleIndex === 0}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleNextModule}
                disabled={activeModuleIndex === QUEUE_MODULES.length - 1}
                className="px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800 font-bold text-xs text-[#2563EB] dark:text-[#3B82F6] hover:bg-blue-100 dark:hover:bg-blue-900 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Next Chapter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export const LearnCircularLinkedListSection = LearnQueueSection;
