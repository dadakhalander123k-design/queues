import React from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { QueueLab } from './QueueLab';
import { soundManager } from '../utils/audio';

interface SandboxModeProps {
  onExit: () => void;
  onOpenTheory?: () => void;
  initialTechnique?: any;
  initialTableSize?: number;
}

export const SandboxMode: React.FC<SandboxModeProps> = ({ onExit, onOpenTheory }) => {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 font-sans animate-page-enter">
      {/* Return to Game Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          id="btn-lab-exit-to-game"
          onClick={() => {
            soundManager.playClick();
            onExit();
          }}
          className="px-4 sm:px-5 py-2.5 text-xs font-semibold flex items-center gap-2 cursor-pointer rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-blue-500/20 shadow-xs hover:border-[#2563EB] dark:hover:border-blue-500/40 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6] group-hover:-translate-x-1 transition-transform" />
          <span>← Back to Game</span>
        </button>

        {onOpenTheory && (
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTheory();
            }}
            className="px-4 py-2.5 text-xs font-semibold flex items-center gap-2 cursor-pointer rounded-xl bg-[#EFF6FF] dark:bg-blue-950/60 border border-[#DBEAFE] dark:border-blue-500/30 text-[#2563EB] dark:text-[#3B82F6] hover:bg-[#DBEAFE] transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Theory Curriculum</span>
          </button>
        )}
      </div>

      {/* The Full Interactive Queue Lab Workbench */}
      <QueueLab onExit={onExit} onOpenTheory={onOpenTheory} />
    </div>
  );
};
