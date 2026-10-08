import { LevelConfig } from '../types/game';

export const GAME_LEVELS: LevelConfig[] = [
  {
    id: 1,
    title: 'Level 1: Core FIFO Operations & Boundary Guardrails',
    subtitle: 'REAR Enqueue, FRONT Dequeue, Capacity Limits & Underflow Defense',
    technique: 'basic',
    tableSize: 5,
    h1Formula: 'Enqueue @ REAR • Dequeue @ FRONT',
    keysSequence: [10, 20, 30, 40, 50],
    allowManualCalculation: false,
    introExplanation:
      'Master fundamental FIFO invariants with drag-and-drop ingestion, interactive dequeue deletion, and robust exception detection.',
    techniqueSummary:
      'Elements enter strictly at the REAR and leave strictly from the FRONT in FIFO order. Catch Overflow when full and Underflow when empty.',
    formulaDisplay: 'FIFO: Front Dequeue / Rear Enqueue',
    moduleCode: 'Q-01',
  },
  {
    id: 2,
    title: 'Level 2: Execution Tracing & State Prediction',
    subtitle: 'Interleaved Arrival/Departure Sequences, Pointer Shifts & State Simulation',
    technique: 'linear',
    tableSize: 5,
    h1Formula: 'Interleaved Trace: FRONT & REAR Pointer Shifting',
    keysSequence: [15, 25, 35, 45, 55],
    allowManualCalculation: false,
    introExplanation:
      'Trace compound queue transformations mentally to predict element departures and verify pointer state transitions.',
    techniqueSummary:
      'Track FRONT and REAR pointer movements mentally across complex interleaved arrivals and departures.',
    formulaDisplay: 'Trace: front++ on Dequeue, rear++ on Enqueue',
    moduleCode: 'Q-02',
  },
  {
    id: 3,
    title: 'Level 3: Multi-Station Routing & Circular Ring Buffers',
    subtitle: 'Multi-Channel Dispatching & Modulo Arithmetic Memory Recycling',
    technique: 'chaining',
    tableSize: 6,
    h1Formula: 'rear = (rear + 1) % MAX',
    keysSequence: [5, 15, 25, 35, 45, 55],
    allowManualCalculation: false,
    introExplanation:
      'Coordinate independent priority channels and eliminate linear memory waste using continuous modulo ring buffers.',
    techniqueSummary:
      'Modulo arithmetic rear = (rear + 1) % MAX wraps the rear pointer back to index 0, preventing false overflow.',
    formulaDisplay: 'Circular Queue: (rear + 1) % MAX',
    moduleCode: 'Q-03',
  },
  {
    id: 4,
    title: 'Level 4: High-Throughput Packet Dispatching Engine',
    subtitle: 'High-Velocity Data Stream Ingestion, Rapid Dequeue & Buffer Balancing',
    technique: 'quadratic',
    tableSize: 5,
    h1Formula: 'Burst Ingestion & Real-Time Queue Clearance',
    keysSequence: [100, 200, 300, 400, 500],
    allowManualCalculation: false,
    introExplanation:
      'Put your queue mastery to the test in a high-speed telecommunications dispatcher. Ingest packets and clear FRONT before buffer overflow.',
    techniqueSummary:
      'Real-time FIFO queue absorbs sudden network bursts, guarantees in-order packet transmission, and prevents packet drop.',
    formulaDisplay: 'Throughput: O(1) Streaming Buffer',
    moduleCode: 'Q-04',
  },
  {
    id: 5,
    title: 'Level 5: Master Challenge & Synthesis',
    subtitle: 'Priority Queue, Double-Ended Deque & BFS Shortest Path',
    technique: 'double_hashing',
    tableSize: 6,
    h1Formula: 'Synthesis: Priority Queue, Deque & Graph BFS',
    keysSequence: [12, 24, 36, 48, 60, 72],
    allowManualCalculation: false,
    introExplanation:
      'Synthesize all Queue variants and applications: priority scheduling, dual-ended deque operations, and level-order BFS traversal.',
    techniqueSummary:
      'Master advanced queue paradigms: highest-priority dequeue, dual-ended operations, and graph exploration guarantees.',
    formulaDisplay: 'Queue Mastery: All Operations O(1)',
    moduleCode: 'Q-05',
  },
];
