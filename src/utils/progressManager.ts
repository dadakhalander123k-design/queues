import { ModuleRecord, ModuleStatus, UserProgressState } from '../types/game';

const STORAGE_KEY = 'algolearn_queues_progress_v1';

export const FIELD_NOTES_MODULES: Omit<ModuleRecord, 'status' | 'progressPercent'>[] = [
  {
    id: 'theory-01',
    number: '01',
    code: 'TH-01',
    title: 'What is a Queue?',
    category: 'FUNDAMENTALS',
    description: 'Core Definition, FIFO Principle, and Two-Ended Access Rules.',
    criteriaDescription: 'Understand the fundamental FIFO invariant and ticket counter analogy.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-01',
  },
  {
    id: 'theory-02',
    number: '02',
    code: 'TH-02',
    title: 'Basic Structure of a Queue',
    category: 'FUNDAMENTALS',
    description: 'FRONT and REAR Pointer Anatomy & Sequential Layout.',
    criteriaDescription: 'Inspect pointer roles and continuous memory indexing.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-02',
  },
  {
    id: 'theory-03',
    number: '03',
    code: 'TH-03',
    title: 'How Does a Queue Work?',
    category: 'FUNDAMENTALS',
    description: 'Dynamic Arrival and Departure Mechanics in Real Time.',
    criteriaDescription: 'Trace elements moving sequentially from rear ingestion to front departure.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-03',
  },
  {
    id: 'theory-04',
    number: '04',
    code: 'TH-04',
    title: 'Basic Queue Operations (Enqueue)',
    category: 'OPERATIONS',
    description: 'Appending Elements to REAR in O(1) Constant Time.',
    criteriaDescription: 'Trace overflow checks and rear pointer advancement.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-04',
  },
  {
    id: 'theory-05',
    number: '05',
    code: 'TH-05',
    title: 'Dequeue Operation',
    category: 'OPERATIONS',
    description: 'Extracting Front Element and Shifting FRONT in O(1).',
    criteriaDescription: 'Verify underflow defense and front pointer retrieval.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-05',
  },
  {
    id: 'theory-06',
    number: '06',
    code: 'TH-06',
    title: 'Peek / Front Operation',
    category: 'OPERATIONS',
    description: 'Safe Non-Destructive Inspection of the Oldest Item.',
    criteriaDescription: 'Read front element without pointer displacement or item removal.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-06',
  },
  {
    id: 'theory-07',
    number: '07',
    code: 'TH-07',
    title: 'isEmpty() Condition',
    category: 'OPERATIONS',
    description: 'Detecting Buffer Depletion and Reset State.',
    criteriaDescription: 'Evaluate front == -1 and size == 0 boundary invariants.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-07',
  },
  {
    id: 'theory-08',
    number: '08',
    code: 'TH-08',
    title: 'isFull() Condition',
    category: 'OPERATIONS',
    description: 'Detecting Capacity Saturation and Preventing Overflow.',
    criteriaDescription: 'Verify capacity boundaries across static buffers.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-08',
  },
  {
    id: 'theory-09',
    number: '09',
    code: 'TH-09',
    title: 'Linear Queue & False Overflow',
    category: 'ANALYSIS',
    description: 'The Unused Space Problem When REAR Hits MAX - 1.',
    criteriaDescription: 'Diagnose memory waste in naive array-based queues.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-09',
  },
  {
    id: 'theory-10',
    number: '10',
    code: 'TH-10',
    title: 'Circular Queue & Modulo Wraparound',
    category: 'VARIANTS',
    description: 'Recycling Vacant Slots with (rear + 1) % MAX.',
    criteriaDescription: 'Master continuous ring buffers and 100% memory utilization.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-10',
  },
  {
    id: 'theory-11',
    number: '11',
    code: 'TH-11',
    title: 'Queue Using Linked List',
    category: 'VARIANTS',
    description: 'Dynamic Sizing with Head (Front) and Tail (Rear) Pointers.',
    criteriaDescription: 'Achieve boundless capacity with constant O(1) operations.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-11',
  },
  {
    id: 'theory-12',
    number: '12',
    code: 'TH-12',
    title: 'Deque (Double-Ended Queue)',
    category: 'VARIANTS',
    description: 'Bi-directional Insertion and Deletion at Both Ends.',
    criteriaDescription: 'Unify stack and queue capabilities with 4 core operations.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-12',
  },
  {
    id: 'theory-13',
    number: '13',
    code: 'TH-13',
    title: 'Priority Queue',
    category: 'VARIANTS',
    description: 'Element Scheduling Based on Priority Values & Binary Heaps.',
    criteriaDescription: 'Examine highest-priority extraction for OS schedulers.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-13',
  },
  {
    id: 'theory-14',
    number: '14',
    code: 'TH-14',
    title: 'Queue Overflow Mechanics',
    category: 'ANALYSIS',
    description: 'Root Causes, Exception Handling & Defensive Guardrails.',
    criteriaDescription: 'Prevent crashes when attempting to enqueue into full buffers.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-14',
  },
  {
    id: 'theory-15',
    number: '15',
    code: 'TH-15',
    title: 'Queue Underflow Mechanics',
    category: 'ANALYSIS',
    description: 'Handling Empty Queue Exceptions and Edge Returns.',
    criteriaDescription: 'Safeguard dequeue operations on zero-length buffers.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-15',
  },
  {
    id: 'theory-16',
    number: '16',
    code: 'TH-16',
    title: 'Queue Applications in Systems',
    category: 'APPLICATIONS',
    description: 'Print Spoolers, CPU Scheduling, Web Servers & Messaging.',
    criteriaDescription: 'Review production use cases across modern computing.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-16',
  },
  {
    id: 'theory-17',
    number: '17',
    code: 'TH-17',
    title: 'Queue and BFS (Breadth-First Search)',
    category: 'APPLICATIONS',
    description: 'Level-Order Traversal & Unweighted Shortest Path Guarantee.',
    criteriaDescription: 'Understand why BFS strictly demands a FIFO Queue.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-17',
  },
  {
    id: 'theory-18',
    number: '18',
    code: 'TH-18',
    title: 'Queue Complexity Quick Revision',
    category: 'COMPLEXITY',
    description: 'Time & Space Big-O Proofs for All Queue Operations.',
    criteriaDescription: 'Synthesize constant O(1) time and O(n) auxiliary space bounds.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-18',
  },
  {
    id: 'theory-19',
    number: '19',
    code: 'TH-19',
    title: 'Entire Queue Concept in One Diagram',
    category: 'ANALYSIS',
    description: 'Unified End-to-End Visual Blueprint of Queue Systems.',
    criteriaDescription: 'Review the single-pane architecture of FIFO mechanics.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-19',
  },
  {
    id: 'theory-20',
    number: '20',
    code: 'TH-20',
    title: 'What You Should Remember First',
    category: 'COMPLEXITY',
    description: 'High-Yield Revision & Core Interview Takeaways.',
    criteriaDescription: 'Cement the top 5 essential mental models for coding interviews.',
    targetTab: 'THEORY',
    targetChapterId: 'theory-20',
  },
];

const INITIAL_PROGRESS: UserProgressState = {
  version: 2,
  modules: {},
  moduleProgress: {},
  completedTheoryChapters: [],
  currentTheoryChapterId: 'theory-01',
  levelCompletedKeys: {},
  levelsCompleted: [],
  levelsMastered: [],
  quizScores: {},
  quizSubmitted: false,
  quizFinalScore: 0,
  masterChallengesCompleted: [],
  sandboxOperationsCount: 0,
  totalScore: 0,
  streak: 0,
  currentActiveModuleId: 'theory-01',
  lastActiveTimestamp: Date.now(),
  hasCelebrated100Percent: false,
  completedVideos: [],
};

type ProgressListener = (state: UserProgressState) => void;

export function normalizeTheoryChapterId(id: string): string {
  if (!id) return 'theory-01';
  const clean = id.toLowerCase().trim();
  if (clean.startsWith('theory-')) {
    const numPart = clean.replace('theory-', '');
    const num = parseInt(numPart, 10);
    if (!isNaN(num)) {
      return `theory-${num < 10 ? `0${num}` : num}`;
    }
  }
  const directNum = parseInt(clean, 10);
  if (!isNaN(directNum)) {
    return `theory-${directNum < 10 ? `0${directNum}` : directNum}`;
  }
  return clean;
}

export const normalizeVideoId = (id: string): string => {
  if (!id) return '';
  if (id === 'lesson-01' || id === 'introduction' || id === 'video-1' || id === '1') return 'lesson-01';
  if (id === 'lesson-02' || id === 'operations' || id === 'video-2' || id === '2') return 'lesson-02';
  return id;
};

class ProgressManager {
  private state: UserProgressState;
  private listeners: Set<ProgressListener> = new Set();

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): UserProgressState {
    if (typeof window === 'undefined') return INITIAL_PROGRESS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return INITIAL_PROGRESS;
      const parsed = JSON.parse(stored);
      if (parsed.version === 2) {
        return {
          ...INITIAL_PROGRESS,
          ...parsed,
          modules: parsed.modules || {},
          moduleProgress: parsed.moduleProgress || {},
          completedTheoryChapters: parsed.completedTheoryChapters || [],
          levelsCompleted: parsed.levelsCompleted || [],
          levelsMastered: parsed.levelsMastered || [],
          completedVideos: parsed.completedVideos || [],
        };
      }
      return INITIAL_PROGRESS;
    } catch {
      return INITIAL_PROGRESS;
    }
  }

  private saveState() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.state);
      } catch (err) {
        console.error('Error in progress listener', err);
      }
    });
  }

  public subscribe(listener: ProgressListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public getState(): UserProgressState {
    return { ...this.state };
  }

  public getModules(): ModuleRecord[] {
    return FIELD_NOTES_MODULES.map((m) => {
      const status: ModuleStatus = this.state.completedTheoryChapters.includes(m.id)
        ? 'COMPLETED'
        : this.state.currentTheoryChapterId === m.id
        ? 'IN_PROGRESS'
        : 'NOT_STARTED';

      const progressPercent = status === 'COMPLETED' ? 100 : status === 'IN_PROGRESS' ? 50 : 0;

      return {
        ...m,
        status,
        progressPercent,
      };
    });
  }

  public isTheoryChapterCompleted(chapterId: string): boolean {
    const normalized = normalizeTheoryChapterId(chapterId);
    return (this.state.completedTheoryChapters || []).includes(normalized);
  }

  public completeTheoryChapter(chapterId: string): boolean {
    const normalized = normalizeTheoryChapterId(chapterId);
    if (!this.state.completedTheoryChapters) {
      this.state.completedTheoryChapters = [];
    }
    if (!this.state.completedTheoryChapters.includes(normalized)) {
      this.state.completedTheoryChapters.push(normalized);
      this.state.currentTheoryChapterId = normalized;
      if (!this.state.modules) this.state.modules = {};
      if (!this.state.moduleProgress) this.state.moduleProgress = {};
      this.state.modules[normalized] = 'COMPLETED';
      this.state.moduleProgress[normalized] = 100;
      this.state.totalScore += 35;
      this.state.lastActiveTimestamp = Date.now();
      this.saveState();
      return true;
    }
    return false;
  }

  public setCurrentTheoryChapter(chapterId: string) {
    this.state.currentTheoryChapterId = normalizeTheoryChapterId(chapterId);
    this.saveState();
  }

  public isVideoCompleted(videoId: string): boolean {
    const normalized = normalizeVideoId(videoId);
    return (this.state.completedVideos || []).map(normalizeVideoId).includes(normalized);
  }

  public completeVideo(videoId: string): boolean {
    const normalized = normalizeVideoId(videoId);
    if (!this.state.completedVideos) {
      this.state.completedVideos = [];
    }
    const currentList = this.state.completedVideos.map(normalizeVideoId);
    if (!currentList.includes(normalized)) {
      this.state.completedVideos.push(normalized);
      this.state.totalScore += 50;
      this.saveState();
      return true;
    }
    return false;
  }

  public markVideoCompleted(videoId: string) {
    this.completeVideo(videoId);
  }

  public startModule(moduleId: string) {
    if (!this.state.modules[moduleId] || this.state.modules[moduleId] === 'NOT_STARTED') {
      this.state.modules[moduleId] = 'IN_PROGRESS';
      this.state.moduleProgress[moduleId] = Math.max(this.state.moduleProgress[moduleId] || 0, 25);
      this.state.currentActiveModuleId = moduleId;
      this.saveState();
    }
  }

  public updateModuleProgress(moduleId: string, percent: number) {
    if (this.state.modules[moduleId] !== 'COMPLETED' && this.state.modules[moduleId] !== 'MASTERED') {
      this.state.modules[moduleId] = 'IN_PROGRESS';
      this.state.moduleProgress[moduleId] = Math.min(
        100,
        Math.max(this.state.moduleProgress[moduleId] || 0, percent)
      );
      this.state.currentActiveModuleId = moduleId;
      this.saveState();
    }
  }

  public completeModule(moduleId: string, isMastered: boolean = false) {
    const currentStatus = this.state.modules[moduleId];
    const newStatus: ModuleStatus =
      isMastered || currentStatus === 'MASTERED' ? 'MASTERED' : 'COMPLETED';

    this.state.modules[moduleId] = newStatus;
    this.state.moduleProgress[moduleId] = 100;
    this.state.currentActiveModuleId = moduleId;
    this.saveState();
  }

  public markLevelCompleted(levelId: number, score: number = 100, isMastered: boolean = false) {
    if (!this.state.levelsCompleted.includes(levelId)) {
      this.state.levelsCompleted.push(levelId);
      this.state.totalScore += score;
    }
    if (isMastered && !this.state.levelsMastered.includes(levelId)) {
      this.state.levelsMastered.push(levelId);
    }
    this.state.lastActiveTimestamp = Date.now();
    this.saveState();
  }

  public recordQuizScore(questionId: number, optionIndex: number) {
    this.state.quizScores[questionId] = optionIndex;
    this.saveState();
  }

  public recordQuizCompletion(scores: Record<number, number>, correctCount: number, totalQuestions: number) {
    this.state.quizScores = scores;
    this.state.quizSubmitted = true;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    this.state.quizFinalScore = percentage;
    this.state.totalScore += correctCount * 10;
    this.saveState();
  }

  public resetQuizAttempt() {
    this.state.quizScores = {};
    this.state.quizSubmitted = false;
    this.state.quizFinalScore = 0;
    this.saveState();
  }

  public submitQuiz(finalScore: number) {
    this.state.quizSubmitted = true;
    this.state.quizFinalScore = finalScore;
    this.state.totalScore += finalScore * 10;
    this.saveState();
  }

  public resetProgress() {
    this.state = {
      ...INITIAL_PROGRESS,
      lastActiveTimestamp: Date.now(),
    };
    this.saveState();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cll_reset_progress'));
      window.dispatchEvent(new CustomEvent('queue_reset_progress'));
    }
  }

  public checkAndCompleteCertification() {
    const stats = this.getStats();
    if (stats.percentage === 100 && !this.state.hasCelebrated100Percent) {
      this.state.hasCelebrated100Percent = true;
      this.saveState();
    }
  }

  public setCelebrationAcknowledged() {
    this.state.hasCelebrated100Percent = true;
    this.saveState();
  }

  public getTheoryStats() {
    const list = (this.state.completedTheoryChapters || []).map(normalizeTheoryChapterId);
    const total = 20;
    const completed = list.length;
    const percentage = Math.round((completed / total) * 100);
    return {
      total,
      completed,
      percentage,
      isComplete: completed >= total,
      completedIds: [...list],
      currentChapterId: this.state.currentTheoryChapterId,
    };
  }

  public getVideoStats() {
    const rawList = Array.isArray(this.state.completedVideos) ? this.state.completedVideos : [];
    const validList = Array.from(
      new Set(
        rawList
          .map(normalizeVideoId)
          .filter((id) => id === 'lesson-01' || id === 'lesson-02')
      )
    );
    const isIntroCompleted = validList.includes('lesson-01');
    const isCollisionCompleted = validList.includes('lesson-02');
    const completed = validList.length;
    const total = 2;
    const percentage = Math.round((completed / total) * 100);

    return {
      total,
      completed,
      completedCount: completed,
      totalCount: total,
      percentage,
      isIntroCompleted,
      isCollisionCompleted,
      isComplete: completed >= total,
      completedVideos: [...validList],
    };
  }

  public getGameStats() {
    const rawList = Array.isArray(this.state.levelsCompleted) ? this.state.levelsCompleted : [];
    const completedList = Array.from(
      new Set(rawList.filter((lvl) => typeof lvl === 'number' && lvl >= 1 && lvl <= 5))
    );
    const completed = completedList.length;
    const total = 5;
    const percentage = Math.round((completed / total) * 100);

    return {
      total,
      completed,
      percentage,
      isComplete: completed >= total,
      completedLevels: [...completedList],
    };
  }

  public getQuizStats() {
    const isSubmitted = Boolean(this.state.quizSubmitted);
    const completed = isSubmitted ? 1 : 0;
    const total = 1;
    const percentage = isSubmitted ? 100 : 0;

    return {
      total,
      completed,
      percentage,
      isSubmitted,
      finalScore: this.state.quizFinalScore || 0,
      isComplete: isSubmitted,
    };
  }

  public getStats() {
    const theory = this.getTheoryStats();
    const video = this.getVideoStats();
    const game = this.getGameStats();
    const quiz = this.getQuizStats();

    const total = 28; // 20 theory + 2 videos + 5 levels + 1 quiz
    const completed = theory.completed + video.completed + game.completed + quiz.completed;
    const percentage = Math.min(100, Math.round((completed / total) * 100));

    const modules = this.getModules();
    const mastered = modules.filter((m) => m.status === 'COMPLETED' || m.status === 'MASTERED').length;
    const nextModule = modules.find((m) => m.status === 'NOT_STARTED') || modules[modules.length - 1];

    return {
      total,
      completed,
      mastered,
      percentage,
      totalScore: this.state.totalScore,
      theoryCompleted: theory.completed,
      levelsCompleted: game.completed,
      theory,
      video,
      game,
      quiz,
      nextModule,
    };
  }
}

export const progressManager = new ProgressManager();
