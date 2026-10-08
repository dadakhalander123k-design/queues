import React from 'react';
import {
  Play,
  Lock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  FlaskConical,
  Shield,
  Layers,
} from 'lucide-react';
import { progressManager } from '../utils/progressManager';
import { soundManager } from '../utils/audio';

export interface GameLevelSelectionViewProps {
  currentLevelId: number;
  completedLevels: number[];
  score: number;
  streak: number;
  onPlayLevel: (levelId: number) => void;
  onOpenCompletion?: () => void;
  onOpenLab?: () => void;
}

interface LevelCardMeta {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  techniqueLabel: string;
  description: string;
  formula: string;
}

const LEVEL_CARDS_DATA: LevelCardMeta[] = [
  {
    id: 1,
    badge: 'LEVEL 01',
    title: 'Core FIFO Operations',
    subtitle: 'REAR Enqueue, FRONT Dequeue & Boundary Exceptions',
    techniqueLabel: 'FIFO Invariant',
    description:
      'Master fundamental FIFO invariants with drag-and-drop ingestion, interactive dequeue deletion, and robust overflow and underflow exception detection.',
    formula: 'Enqueue @ REAR • Dequeue @ FRONT',
  },
  {
    id: 2,
    badge: 'LEVEL 02',
    title: 'Execution Tracing',
    subtitle: 'Interleaved Operations, Pointer Shifts & State Simulation',
    techniqueLabel: 'Pointer Shifts',
    description:
      'Trace compound queue transformations mentally to predict element departures and verify pointer state transitions under interleaved operations.',
    formula: 'front++ on Dequeue • rear++ on Enqueue',
  },
  {
    id: 3,
    badge: 'LEVEL 03',
    title: 'Multi-Station & Circular Queues',
    subtitle: 'Priority Channels & Modulo Memory Recycling',
    techniqueLabel: 'Ring Buffers',
    description:
      'Coordinate independent priority channels and eliminate linear memory waste using continuous modulo ring buffers.',
    formula: 'rear = (rear + 1) % MAX',
  },
  {
    id: 4,
    badge: 'LEVEL 04',
    title: 'Packet Dispatching Engine',
    subtitle: 'High-Throughput Streaming & Buffer Clearance',
    techniqueLabel: 'Stream Ingestion',
    description:
      'Manage real-time packet bursts by routing incoming network payloads and clearing FRONT queues before buffer overflow.',
    formula: 'Throughput: O(1) Streaming Buffer',
  },
  {
    id: 5,
    badge: 'LEVEL 05',
    title: 'Queue Master Synthesis',
    subtitle: 'Priority Queues, Deque & Graph BFS',
    techniqueLabel: 'Master Synthesis',
    description:
      'Synthesize all Queue variants and applications: priority scheduling, dual-ended deque operations, and level-order BFS traversal.',
    formula: 'BFS Shortest Path • Priority Heap',
  },
];

export const GameLevelSelectionView: React.FC<GameLevelSelectionViewProps> = ({
  currentLevelId,
  completedLevels,
  score,
  streak,
  onPlayLevel,
  onOpenCompletion,
  onOpenLab,
}) => {
  const pState = progressManager.getState();

  const completedCount = [1, 2, 3, 4, 5].filter(
    (lvl) => completedLevels.includes(lvl) || pState.levelsCompleted.includes(lvl)
  ).length;

  const isAllLevelsCompleted = completedCount === 5;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 font-sans animate-page-enter pb-12">
      {/* 1. Header Banner & Progress Summary */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFF6FF] dark:bg-blue-950/60 text-[#2563EB] dark:text-[#3B82F6] text-xs font-bold font-mono uppercase tracking-wider rounded-lg border border-[#DBEAFE] dark:border-blue-500/30">
            <Sparkles className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
            <span>Interactive Queue Challenges</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            5 Progressive Game Levels
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl">
            Test and sharpen your algorithmic intuition through 5 progressive queue gameplay levels. Complete all levels to earn the Queue Mastery Certificate.
          </p>
        </div>

        {/* Stats Pill */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 p-4 sm:p-5 bg-slate-50 dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-blue-500/20 shrink-0">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Curriculum Progress
          </span>
          <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#2563EB] dark:text-[#3B82F6]">
            {completedCount} / 5 Levels
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Total Score: <strong className="text-slate-800 dark:text-slate-200">{score} pts</strong>
          </span>
        </div>
      </div>

      {/* 2. Grid of 5 Level Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LEVEL_CARDS_DATA.map((lvl) => {
          const isCompleted =
            completedLevels.includes(lvl.id) || pState.levelsCompleted.includes(lvl.id);
          // Level 1 is always unlocked; subsequent levels require the previous level to be completed
          const isUnlocked =
            lvl.id === 1 ||
            completedLevels.includes(lvl.id - 1) ||
            pState.levelsCompleted.includes(lvl.id - 1);
          const isCurrent = currentLevelId === lvl.id;

          return (
            <div
              key={lvl.id}
              className={`p-6 sm:p-7 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                isCompleted
                  ? 'bg-white dark:bg-[#111827] border-emerald-300 dark:border-emerald-500/30 shadow-xs ring-1 ring-emerald-500/10'
                  : isUnlocked
                  ? 'bg-white dark:bg-[#111827] border-[#2563EB] dark:border-[#3B82F6] shadow-md ring-2 ring-[#2563EB]/10'
                  : 'bg-slate-50/70 dark:bg-[#0F172A]/70 border-slate-200 dark:border-slate-800 opacity-75'
              }`}
            >
              <div className="space-y-3.5">
                {/* Level Badge & Completion Status */}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-mono font-bold border uppercase tracking-wider ${
                      isCompleted
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30'
                        : isUnlocked
                        ? 'bg-[#EFF6FF] dark:bg-blue-950/60 text-[#2563EB] dark:text-[#3B82F6] border-[#DBEAFE] dark:border-blue-500/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {lvl.badge}
                  </span>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Completed</span>
                    </span>
                  ) : !isUnlocked ? (
                    <span className="flex items-center gap-1 text-slate-400 text-xs font-semibold font-mono">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked</span>
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-[#2563EB] dark:text-[#3B82F6] font-mono">
                      Available
                    </span>
                  )}
                </div>

                {/* Level Title & Subtitle */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
                    {lvl.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#2563EB] dark:text-[#3B82F6] mt-0.5">
                    {lvl.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lvl.description}
                </p>

                {/* Formula Snippet */}
                <div className="p-2.5 bg-slate-50 dark:bg-[#0B1120] rounded-xl border border-slate-200/70 dark:border-slate-800 font-mono text-[11px] text-slate-700 dark:text-blue-300">
                  <span className="text-slate-400 font-normal">Invariant: </span>
                  <strong>{lvl.formula}</strong>
                </div>
              </div>

              {/* Play / Locked Button */}
              <div className="pt-6">
                <button
                  type="button"
                  disabled={!isUnlocked}
                  onClick={() => {
                    soundManager.playClick();
                    onPlayLevel(lvl.id);
                  }}
                  className={`w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98] ${
                    isCompleted
                      ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                      : isUnlocked
                      ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-md'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <RotateCcw className="w-4 h-4" />
                      <span>REPLAY LEVEL</span>
                    </>
                  ) : isUnlocked ? (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>PLAY LEVEL 0{lvl.id}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>LOCKED (COMPLETE PREV)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {/* 6th Card: Level 06 Quest Completion / Mastery Certificate */}
        <div
          className={`p-6 sm:p-7 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
            isAllLevelsCompleted
              ? 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border-amber-300 dark:border-amber-500/40 shadow-md ring-2 ring-amber-500/20'
              : 'bg-slate-50/70 dark:bg-[#0F172A]/70 border-slate-200 dark:border-slate-800 opacity-75'
          }`}
        >
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-500/30 uppercase tracking-wider">
                LEVEL 06 // MASTERY
              </span>
              {isAllLevelsCompleted ? (
                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 text-xs font-bold font-mono">
                  <Sparkles className="w-4 h-4" />
                  <span>Unlocked!</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-slate-400 text-xs font-semibold font-mono">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Requires 5/5</span>
                </span>
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
                Quest Completion &amp; Certificate
              </h3>
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 mt-0.5">
                Official Queue Mastery Certification
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Upon beating all 5 progressive challenges, unlock the official Queue Mastery Certificate and review complete curriculum statistics.
            </p>
          </div>

          <div className="pt-6">
            <button
              type="button"
              disabled={!isAllLevelsCompleted}
              onClick={() => {
                if (isAllLevelsCompleted && onOpenCompletion) {
                  soundManager.playClick();
                  onOpenCompletion();
                }
              }}
              className={`w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-150 flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] ${
                isAllLevelsCompleted
                  ? 'bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white cursor-pointer shadow-md'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>{isAllLevelsCompleted ? 'VIEW MASTERY CERTIFICATE' : 'LOCKED (FINISH ALL 5)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Interactive Lab Workbench Card at Bottom */}
      {onOpenLab && (
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 border border-blue-200/80 dark:border-blue-500/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-md">
              <FlaskConical className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Interactive Queue Lab Workbench
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                Need an unconstrained sandbox? Jump into the laboratory to experiment freely with dynamic capacity adjustments, canister &amp; array views, and live packet simulations.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenLab();
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#2563EB] dark:text-[#3B82F6] border border-[#2563EB]/30 dark:border-blue-500/30 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 shadow-xs transition-colors cursor-pointer"
          >
            <span>Launch Lab Workbench</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
