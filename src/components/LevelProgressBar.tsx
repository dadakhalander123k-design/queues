import React from 'react';
import { Check, Star, Trophy, Lock } from 'lucide-react';
import { progressManager } from '../utils/progressManager';
import { soundManager } from '../utils/audio';

interface LevelProgressBarProps {
  currentLevelId: number;
  completedLevels: number[];
  onSelectLevel: (levelId: number) => void;
  onOpenLab?: () => void;
  isCompletionActive?: boolean;
  onBackToSelection?: () => void;
}

export const LevelProgressBar: React.FC<LevelProgressBarProps> = ({
  currentLevelId,
  completedLevels,
  onSelectLevel,
  onOpenLab,
  isCompletionActive = false,
  onBackToSelection,
}) => {
  const pState = progressManager.getState();

  const steps = [
    { id: 1, code: '01', name: 'FIFO Basics' },
    { id: 2, code: '02', name: 'Trace Pointers' },
    { id: 3, code: '03', name: 'Circular Queue' },
    { id: 4, code: '04', name: 'Packet Dispatch' },
    { id: 5, code: '05', name: 'Master Synthesis' },
  ];

  const isAllQuestCompleted = [1, 2, 3, 4, 5].every(
    (id) => completedLevels.includes(id) || pState.levelsCompleted.includes(id)
  );
  const isLevel6Active = (currentLevelId === 6 || isCompletionActive) && isAllQuestCompleted;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-3 flex flex-col items-center">
      {onBackToSelection && (
        <div className="w-full flex items-center justify-between mb-3 text-xs">
          <button
            id="btn-stepper-back-to-levels"
            onClick={() => {
              soundManager.playSelect();
              onBackToSelection();
            }}
            className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-blue-500/20 shadow-2xs hover:shadow-xs transition-all"
          >
            <span>← All Levels</span>
          </button>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Level {currentLevelId <= 5 ? `0${currentLevelId}` : '06'} of 05
          </span>
        </div>
      )}

      <div className="w-full flex items-center justify-between relative font-sans">
        {/* Connecting Line */}
        <div className="absolute left-6 right-6 top-4.5 h-[2px] bg-slate-200 dark:bg-blue-500/25 -z-0" />

        {steps.map((step) => {
          const isMastered = pState.levelsMastered.includes(step.id);
          const isCompleted =
            completedLevels.includes(step.id) ||
            pState.levelsCompleted.includes(step.id) ||
            isMastered;
          const isUnlocked =
            step.id === 1 ||
            completedLevels.includes(step.id - 1) ||
            pState.levelsCompleted.includes(step.id - 1) ||
            isCompleted;
          const isCurrent = currentLevelId === step.id && !isLevel6Active;

          return (
            <button
              key={step.id}
              id={`step-progress-node-${step.id}`}
              onClick={() => {
                if (!isUnlocked) {
                  soundManager.playError();
                  return;
                }
                soundManager.playSelect();
                onSelectLevel(step.id);
              }}
              disabled={!isUnlocked}
              title={
                isUnlocked
                  ? `Level ${step.code}: ${step.name}`
                  : `Locked: Complete Level 0${step.id - 1} to unlock`
              }
              aria-disabled={!isUnlocked}
              className={`group flex flex-col items-center gap-2 relative z-10 focus:outline-hidden ${
                isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 border-2 ${
                  isCurrent
                    ? 'bg-[#2563EB] dark:bg-[#3B82F6] text-white border-[#2563EB] dark:border-[#3B82F6] shadow-md ring-4 ring-blue-100 dark:ring-blue-500/20 scale-110'
                    : isCompleted
                    ? 'bg-white dark:bg-[#111827] text-[#2563EB] dark:text-[#3B82F6] border-[#2563EB] dark:border-[#3B82F6] shadow-xs hover:bg-[#EFF6FF] dark:hover:bg-blue-950/40'
                    : 'bg-white dark:bg-[#0F172A] text-slate-400 dark:text-slate-500 border-slate-300 dark:border-blue-500/30 hover:border-slate-400 dark:hover:border-blue-400'
                }`}
              >
                {isMastered ? (
                  <Star className="w-4 h-4 fill-[#2563EB] text-[#2563EB] dark:fill-[#3B82F6] dark:text-[#3B82F6]" />
                ) : isCompleted ? (
                  <Check className="w-4 h-4 stroke-[2.5]" />
                ) : isUnlocked ? (
                  <span className="font-mono text-xs">{step.code}</span>
                ) : (
                  <Lock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                )}
              </div>
              <span
                className={`text-[11px] font-semibold transition-colors hidden sm:block ${
                  isCurrent
                    ? 'text-[#2563EB] dark:text-[#3B82F6] font-bold'
                    : isCompleted
                    ? 'text-slate-800 dark:text-slate-200 font-medium'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {step.name}
              </span>
            </button>
          );
        })}

        {/* Milestone Completion Node */}
        <button
          id="step-progress-node-completion"
          onClick={() => {
            if (!isAllQuestCompleted) {
              soundManager.playError();
              return;
            }
            soundManager.playSelect();
            onSelectLevel(6);
          }}
          disabled={!isAllQuestCompleted}
          title={isAllQuestCompleted ? 'Curriculum Completion Certificate' : 'Complete all 5 levels to unlock'}
          aria-disabled={!isAllQuestCompleted}
          className={`group flex flex-col items-center gap-2 relative z-10 focus:outline-hidden ${
            isAllQuestCompleted ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
          }`}
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 border-2 ${
              isLevel6Active
                ? 'bg-amber-500 text-white border-amber-500 shadow-md ring-4 ring-amber-100 dark:ring-amber-500/20 scale-110'
                : isAllQuestCompleted
                ? 'bg-white dark:bg-[#111827] text-amber-500 border-amber-500 shadow-xs hover:bg-amber-50 dark:hover:bg-amber-950/40'
                : 'bg-white dark:bg-[#0F172A] text-slate-400 dark:text-slate-500 border-slate-300 dark:border-blue-500/30'
            }`}
          >
            <Trophy className="w-4 h-4" />
          </div>
          <span
            className={`text-[11px] font-semibold transition-colors hidden sm:block ${
              isLevel6Active
                ? 'text-amber-500 font-bold'
                : isAllQuestCompleted
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            Certificate
          </span>
        </button>
      </div>
    </div>
  );
};
