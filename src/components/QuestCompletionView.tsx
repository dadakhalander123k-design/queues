import React from 'react';
import {
  Trophy,
  CheckCircle2,
  Award,
  RotateCcw,
  Layers,
  Sparkles,
  ArrowRight,
  Shield,
  BookOpen,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import { progressManager } from '../utils/progressManager';
import { soundManager } from '../utils/audio';

interface QuestCompletionViewProps {
  onReplayLevel: (levelId: number) => void;
  onOpenTheory: () => void;
  onOpenSandbox: () => void;
  onOpenQuiz: () => void;
  onOpenProgress: () => void;
  onBackToLevels?: () => void;
}

export const QuestCompletionView: React.FC<QuestCompletionViewProps> = ({
  onReplayLevel,
  onOpenTheory,
  onOpenSandbox,
  onOpenQuiz,
  onOpenProgress,
  onBackToLevels,
}) => {
  const [pState, setPState] = React.useState(() => progressManager.getState());

  React.useEffect(() => {
    const unsub = progressManager.subscribe(() => {
      setPState(progressManager.getState());
    });
    return unsub;
  }, []);

  const masteredAlgorithms = [
    {
      id: 1,
      code: '01',
      title: 'Core FIFO Operations',
      desc: 'Enqueue at REAR, Dequeue at FRONT, strict FIFO ordering, and boundary defenses against Overflow and Underflow.',
      tag: 'FIFO INVARIANT',
    },
    {
      id: 2,
      code: '02',
      title: 'Execution Tracing',
      desc: 'Tracking interleaved arrivals and departures mentally with pointer index calculation.',
      tag: 'TRACING',
    },
    {
      id: 3,
      code: '03',
      title: 'Multi-Station & Circular Queues',
      desc: 'Independent priority channels and continuous modulo arithmetic memory recycling via (rear + 1) % MAX.',
      tag: 'CIRCULAR RING',
    },
    {
      id: 4,
      code: '04',
      title: 'Packet Dispatching Engine',
      desc: 'High-speed real-time data streaming ingestion, rapid dequeue, and buffer headroom regulation.',
      tag: 'STREAMING',
    },
    {
      id: 5,
      code: '05',
      title: 'Queue Master Synthesis',
      desc: 'Priority queue scheduling, double-ended deque operations, and level-order Breadth-First Search.',
      tag: 'MASTER SYNTHESIS',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-4 px-2 sm:px-4 font-sans animate-page-enter space-y-6">
      {/* 1. Header Certificate Banner */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-xs dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-100 dark:border-blue-500/15 pb-3 font-mono">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider rounded-lg border border-amber-200 dark:border-amber-500/30">
            <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Game Level 06 // Completion Milestone</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              Status: 5 of 5 Levels Mastered
            </span>
            {onBackToLevels && (
              <button
                id="btn-completion-back-to-levels"
                onClick={() => {
                  soundManager.playSelect();
                  onBackToLevels();
                }}
                className="px-3 py-1 text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-2xs"
              >
                <span>← All Levels</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Queue Curriculum Mastery Certified
            </h1>
            <p className="text-base sm:text-lg font-bold text-amber-700 dark:text-amber-400">
              Congratulations! You have conquered all 5 progressive Queue gameplay levels.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              You have demonstrated proficiency in FIFO memory invariants, pointer arithmetic, continuous circular modulo buffers, high-throughput streaming dispatchers, and shortest-path BFS mechanics.
            </p>
          </div>

          <div className="p-5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl text-white shadow-lg flex flex-col items-center justify-center shrink-0 w-36 text-center">
            <Shield className="w-10 h-10 mb-1" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase">Mastery</span>
            <span className="text-xl font-extrabold font-mono">100%</span>
          </div>
        </div>
      </div>

      {/* 2. Grid of Mastered Concepts */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Mastered Core Technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {masteredAlgorithms.map((algo) => (
            <div
              key={algo.id}
              className="p-5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-blue-500/20 rounded-2xl shadow-xs flex items-start gap-3.5"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {algo.title}
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {algo.tag}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {algo.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Next Exploration Milestones */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenQuiz();
          }}
          className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-blue-500/20 hover:border-[#2563EB] dark:hover:border-blue-500/50 shadow-xs flex flex-col items-center text-center gap-2 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] dark:bg-blue-950/60 text-[#2563EB] dark:text-[#3B82F6] flex items-center justify-center group-hover:scale-105 transition-transform">
            <HelpCircle className="w-6 h-6" />
          </div>
          <strong className="text-sm text-slate-900 dark:text-white">Take Knowledge Exam</strong>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Evaluate your knowledge with the 12-question Queue exam
          </span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onOpenSandbox();
          }}
          className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-blue-500/20 hover:border-[#2563EB] dark:hover:border-blue-500/50 shadow-xs flex flex-col items-center text-center gap-2 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Layers className="w-6 h-6" />
          </div>
          <strong className="text-sm text-slate-900 dark:text-white">Queue Lab Workbench</strong>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Freeform simulation with capacity controls &amp; arrays
          </span>
        </button>

        <button
          onClick={() => {
            soundManager.playClick();
            onOpenProgress();
          }}
          className="p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-blue-500/20 hover:border-[#2563EB] dark:hover:border-blue-500/50 shadow-xs flex flex-col items-center text-center gap-2 cursor-pointer transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <TrendingUp className="w-6 h-6" />
          </div>
          <strong className="text-sm text-slate-900 dark:text-white">View Full Progress</strong>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Audit overall curriculum metrics and score ledger
          </span>
        </button>
      </div>
    </div>
  );
};
