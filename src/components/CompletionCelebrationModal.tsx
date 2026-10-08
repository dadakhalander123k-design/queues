import React, { useEffect } from 'react';
import {
  Award,
  Sparkles,
  Printer,
  X,
  BookOpen,
  Gamepad2,
  Sliders,
  Check,
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import { progressManager } from '../utils/progressManager';

interface CompletionCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToQuest?: () => void;
  onNavigateToLab?: () => void;
  onNavigateToProgress?: () => void;
}

export const CompletionCelebrationModal: React.FC<CompletionCelebrationModalProps> = ({
  isOpen,
  onClose,
  onNavigateToLab,
  onNavigateToProgress,
}) => {
  useEffect(() => {
    if (isOpen) {
      soundManager.play100PercentFanfare();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const stats = progressManager.getStats();
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const competencies = [
    { code: 'Q-01', title: 'FIFO Principle (First In, First Out) & Queue Fundamentals', status: 'Mastered' },
    { code: 'Q-02', title: 'FRONT & REAR Pointer Invariants & Tracking', status: 'Mastered' },
    { code: 'Q-03', title: 'ENQUEUE Operation & Queue Overflow Defense', status: 'Mastered' },
    { code: 'Q-04', title: 'DEQUEUE Operation & Queue Underflow Defense', status: 'Mastered' },
    { code: 'Q-05', title: 'Linear Queue Array Storage & Memory Drift', status: 'Mastered' },
    { code: 'Q-06', title: 'Circular Queue Ring Buffer & Modulo Indexing ((rear+1)%N)', status: 'Mastered' },
    { code: 'Q-07', title: 'Linked List Queue (Head Dequeue, Tail Enqueue O(1))', status: 'Mastered' },
    { code: 'Q-08', title: 'Double-Ended Queue (Deque) Bidirectional Operations', status: 'Mastered' },
    { code: 'Q-09', title: 'Priority Queue & Binary Heap Fundamentals', status: 'Mastered' },
    { code: 'Q-10', title: 'Multi-Language Implementation in C, C++, Java & Python', status: 'Mastered' },
    { code: 'Q-11', title: 'Real-World Applications (CPU Scheduling, BFS, Buffers)', status: 'Mastered' },
    { code: 'Q-12', title: 'Time Complexity Derivations & O(1) Amortized Guarantees', status: 'Mastered' },
  ];

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div
      id="completion-celebration-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-editorial-fade overflow-y-auto font-sans"
      onClick={onClose}
    >
      <div
        id="completion-celebration-modal"
        className="relative w-full max-w-3xl my-8 bg-white dark:bg-[#111827] border border-slate-200 dark:border-blue-500/30 rounded-3xl shadow-2xl dark:shadow-[0_0_35px_rgba(59,130,246,0.35)] p-6 sm:p-8 text-slate-900 dark:text-white animate-editorial-scale"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-celebration"
          onClick={() => {
            soundManager.playModalClose();
            onClose();
          }}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-blue-500/25 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-blue-950/40 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Header Badge */}
        <div className="text-center pb-6 border-b border-slate-100 dark:border-blue-500/15">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-bold font-mono uppercase tracking-widest mb-3 rounded-lg border border-amber-200 dark:border-amber-500/30 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>100% Curriculum Mastery Achieved</span>
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>

          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center text-amber-500 mb-4 shadow-inner">
            <Award className="w-11 h-11" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white uppercase mb-2">
            Queue Data Structure Mastery Certificate
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            This certifies that you have completed all 20 theoretical modules, 2 video deep dives, 5 interactive challenge levels, lab experiments, and the final assessment with a perfect score.
          </p>
        </div>

        {/* Stats Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="p-3.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-blue-500/20 rounded-2xl text-center">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">Overall Mastery</span>
            <span className="text-2xl font-black text-[#2563EB] dark:text-[#3B82F6] font-mono">{stats.percentage}%</span>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-blue-500/20 rounded-2xl text-center">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">Chapters Finished</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{stats.theory.completed} / 20</span>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-blue-500/20 rounded-2xl text-center">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">Game Levels</span>
            <span className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">{stats.game.completed} / 5</span>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-blue-500/20 rounded-2xl text-center">
            <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">Issue Date</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono mt-2 block">{currentDate}</span>
          </div>
        </div>

        {/* Verified Technical Competencies */}
        <div className="space-y-2.5 my-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Verified Architectural Competencies (12/12)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {competencies.map((comp) => (
              <div
                key={comp.code}
                className="p-2.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-blue-500/20 rounded-xl flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className="font-mono font-bold text-[#2563EB] dark:text-[#3B82F6]">{comp.code}</span>
                  <span className="truncate text-slate-700 dark:text-slate-300 font-medium">{comp.title}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                  {comp.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-blue-500/15 flex flex-wrap items-center justify-between gap-3">
          <button
            id="btn-print-certificate"
            onClick={handlePrint}
            className="btn-modern-secondary px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Certificate</span>
          </button>

          <div className="flex items-center gap-2.5">
            {onNavigateToLab && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                  onNavigateToLab();
                }}
                className="btn-modern-secondary px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
                <span>Queue Lab</span>
              </button>
            )}

            {onNavigateToProgress && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                  onNavigateToProgress();
                }}
                className="btn-modern-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Progress</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionCelebrationModal;
