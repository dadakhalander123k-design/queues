import React, { useState } from 'react';
import { LevelConfig } from '../types/game';
import { soundManager } from '../utils/audio';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Layers,
  Zap,
  Info,
  Check,
  Award,
} from 'lucide-react';
import { InteractiveArena } from './game/InteractiveArena';
import { InteractiveTraceSimulator } from './game/InteractiveTraceSimulator';
import { LevelCircularInteractive } from './game/LevelCircularInteractive';
import { LevelMultiQueueInteractive } from './game/LevelMultiQueueInteractive';
import { LevelSpeedQueueInteractive } from './game/LevelSpeedQueueInteractive';

interface QueueGameplayProps {
  level: LevelConfig;
  onLevelComplete: (levelId: number, score: number) => void;
  onScoreUpdate: (delta: number) => void;
  onStreakUpdate: (streak: number) => void;
}

/**
 * Level 1: FIFO Principles & Boundary Guardrails
 */
const Level1Gameplay: React.FC<{
  onLevelComplete: (levelId: number, score: number) => void;
  onScoreUpdate: (delta: number) => void;
}> = ({ onLevelComplete, onScoreUpdate }) => {
  const [queue, setQueue] = useState<(string | number)[]>([10, 20]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const capacity = 5;

  const handleEnqueue = (val: string | number) => {
    if (queue.length >= capacity) {
      soundManager.playError();
      return;
    }
    soundManager.playInsert();
    setQueue((prev) => [...prev, val]);
    onScoreUpdate(20);
    if (!completedSteps.includes(1)) {
      setCompletedSteps((prev) => [...prev, 1]);
    }
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      soundManager.playError();
      return;
    }
    soundManager.playDelete();
    setQueue((prev) => prev.slice(1));
    onScoreUpdate(20);
    if (!completedSteps.includes(2)) {
      setCompletedSteps((prev) => [...prev, 2]);
    }
  };

  const isMastered = completedSteps.includes(1) && completedSteps.includes(2);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-blue-500/20 rounded-2xl">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-bold">
          <Info className="w-4 h-4" />
          <span>Level 01 Learning Objectives</span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
          Experience FIFO in action. New elements strictly enter at the REAR pointer, and extractions depart strictly from the FRONT pointer.
        </p>
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className={`px-2.5 py-1 rounded-md border flex items-center gap-1 ${completedSteps.includes(1) ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800'}`}>
            {completedSteps.includes(1) ? <Check className="w-3.5 h-3.5" /> : '○'} Step 1: Enqueue an item at REAR
          </span>
          <span className={`px-2.5 py-1 rounded-md border flex items-center gap-1 ${completedSteps.includes(2) ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800'}`}>
            {completedSteps.includes(2) ? <Check className="w-3.5 h-3.5" /> : '○'} Step 2: Dequeue the FRONT item
          </span>
        </div>
      </div>

      <InteractiveArena
        items={queue}
        capacity={capacity}
        availableElements={[30, 40, 50, 60]}
        simulatorBadgeLabel="FIFO Principles & Guardrails"
        subtitle="Click or drag available elements to Enqueue into the REAR of the queue."
        onEnqueue={handleEnqueue}
        onDequeue={handleDequeue}
        onSelectElement={handleEnqueue}
        onInvalidAction={() => soundManager.playError()}
        highlightFront={true}
        highlightRear={true}
      />

      <div className="flex justify-end pt-2">
        <button
          id="btn-complete-level-1"
          disabled={!isMastered}
          onClick={() => {
            soundManager.playLevelComplete();
            onLevelComplete(1, 100);
          }}
          className={`btn-modern-primary px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${isMastered ? 'cursor-pointer shadow-lg' : 'opacity-40 cursor-not-allowed pointer-events-none'}`}
        >
          <Award className="w-4 h-4" />
          <span>Verify & Complete Level 01</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/**
 * Level 2: Execution Tracing & State Prediction
 */
const Level2Gameplay: React.FC<{
  onLevelComplete: (levelId: number, score: number) => void;
  onScoreUpdate: (delta: number) => void;
}> = ({ onLevelComplete, onScoreUpdate }) => {
  const [traceFinished, setTraceFinished] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-blue-500/20 rounded-2xl">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-bold">
          <Info className="w-4 h-4" />
          <span>Level 02 Tracing Simulator</span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Trace operation sequences step-by-step. Observe how the FRONT and REAR pointers shift on each Enqueue and Dequeue.
        </p>
      </div>

      <InteractiveTraceSimulator challengeId="l2-c1" />

      <div className="p-4 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-blue-500/20 rounded-xl flex items-center justify-between">
        <span className="text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-300 font-semibold">
          Execution Trace Verified: Pointer shifts conform to FIFO invariant.
        </span>
        <button
          id="btn-complete-level-2"
          onClick={() => {
            soundManager.playLevelComplete();
            onScoreUpdate(100);
            onLevelComplete(2, 100);
          }}
          className="btn-modern-primary px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Award className="w-4 h-4" />
          <span>Complete Level 02</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/**
 * Level 3: Circular Ring Buffer
 */
const Level3Gameplay: React.FC<{
  onLevelComplete: (levelId: number, score: number) => void;
  onScoreUpdate: (delta: number) => void;
}> = ({ onLevelComplete, onScoreUpdate }) => {
  const [wraparoundSeen, setWraparoundSeen] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-blue-500/20 rounded-2xl">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-bold">
          <Info className="w-4 h-4" />
          <span>Level 03 Circular Ring Buffer</span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Explore circular queues where <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[#2563EB] font-mono">rear = (rear + 1) % Capacity</code> wraps around to index 0, preventing false overflow!
        </p>
      </div>

      <LevelCircularInteractive
        onNotifyAction={(text) => {
          if (text.includes('wraps around') || text.includes('rear') || text.includes('Modulo')) {
            setWraparoundSeen(true);
            onScoreUpdate(30);
          }
        }}
      />

      <div className="flex justify-end pt-2">
        <button
          id="btn-complete-level-3"
          onClick={() => {
            soundManager.playLevelComplete();
            onScoreUpdate(100);
            onLevelComplete(3, 100);
          }}
          className="btn-modern-primary px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Award className="w-4 h-4" />
          <span>Complete Level 03</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/**
 * Level 4: Multi-Queue Routing & Priority Scheduling
 */
const Level4Gameplay: React.FC<{
  onLevelComplete: (levelId: number, score: number) => void;
  onScoreUpdate: (delta: number) => void;
}> = ({ onLevelComplete, onScoreUpdate }) => {
  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-blue-500/20 rounded-2xl">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-bold">
          <Info className="w-4 h-4" />
          <span>Level 04 Multi-Queue Scheduling</span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Route arrivals into specialized queues (Emergency, Ride, Food). Learn how real-world OS and servers manage priority traffic.
        </p>
      </div>

      <LevelMultiQueueInteractive
        onNotifyAction={() => {}}
        onScoreChange={(delta) => onScoreUpdate(delta)}
      />

      <div className="flex justify-end pt-2">
        <button
          id="btn-complete-level-4"
          onClick={() => {
            soundManager.playLevelComplete();
            onScoreUpdate(100);
            onLevelComplete(4, 100);
          }}
          className="btn-modern-primary px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Award className="w-4 h-4" />
          <span>Complete Level 04</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/**
 * Level 5: High-Throughput Packet Dispatching
 */
const Level5Gameplay: React.FC<{
  onLevelComplete: (levelId: number, score: number) => void;
  onScoreUpdate: (delta: number) => void;
}> = ({ onLevelComplete, onScoreUpdate }) => {
  return (
    <div className="space-y-6">
      <div className="p-4 sm:p-5 bg-white dark:bg-[#111827] border border-slate-200 dark:border-blue-500/20 rounded-2xl">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] font-bold">
          <Info className="w-4 h-4" />
          <span>Level 05 High-Throughput Dispatcher</span>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Operate a network packet queue buffer. Dispatch departing packets at FRONT while receiving packets at REAR without dropping packets!
        </p>
      </div>

      <LevelSpeedQueueInteractive
        onNotifyAction={() => {}}
        onScoreReward={(delta) => onScoreUpdate(delta)}
      />

      <div className="flex justify-end pt-2">
        <button
          id="btn-complete-level-5"
          onClick={() => {
            soundManager.playLevelComplete();
            onScoreUpdate(100);
            onLevelComplete(5, 100);
          }}
          className="btn-modern-primary px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Award className="w-4 h-4" />
          <span>Complete Level 05 Mastery</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export const QueueGameplay: React.FC<QueueGameplayProps> = ({
  level,
  onLevelComplete,
  onScoreUpdate,
  onStreakUpdate,
}) => {
  switch (level.id) {
    case 1:
      return <Level1Gameplay onLevelComplete={onLevelComplete} onScoreUpdate={onScoreUpdate} />;
    case 2:
      return <Level2Gameplay onLevelComplete={onLevelComplete} onScoreUpdate={onScoreUpdate} />;
    case 3:
      return <Level3Gameplay onLevelComplete={onLevelComplete} onScoreUpdate={onScoreUpdate} />;
    case 4:
      return <Level4Gameplay onLevelComplete={onLevelComplete} onScoreUpdate={onScoreUpdate} />;
    case 5:
      return <Level5Gameplay onLevelComplete={onLevelComplete} onScoreUpdate={onScoreUpdate} />;
    default:
      return <Level1Gameplay onLevelComplete={onLevelComplete} onScoreUpdate={onScoreUpdate} />;
  }
};

// Aliases for compatibility with CLL naming
export const CircularLinkedListGameplay = QueueGameplay;
export default QueueGameplay;
