import React from 'react';
import { InGameLab } from './game/InGameLab';
import { progressManager } from '../utils/progressManager';

interface QueueLabProps {
  onExit?: () => void;
  onOpenTheory?: () => void;
  hideHeader?: boolean;
}

export const QueueLab: React.FC<QueueLabProps> = ({
  onExit,
  onOpenTheory,
  hideHeader = false,
}) => {
  const [progress, setProgress] = React.useState(() => progressManager.getState());

  React.useEffect(() => {
    const unsub = progressManager.subscribe((st) => setProgress(st));
    return unsub;
  }, []);

  const handleUpdateProgress = (updater: any) => {
    // Progress update handler
    const next = typeof updater === 'function' ? updater(progress) : updater;
    if (next?.levelsCompleted) {
      next.levelsCompleted.forEach((lvl: number) => {
        progressManager.markLevelCompleted(lvl);
      });
    }
  };

  return (
    <div className="w-full">
      <InGameLab
        progress={progress as any}
        onUpdateProgress={handleUpdateProgress}
        onBackToGame={onExit}
        hideHeader={hideHeader}
      />
    </div>
  );
};

export const CircularLinkedListLab = QueueLab;
