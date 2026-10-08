import { QUEUE_LESSONS_PART1 } from './queueLessonsPart1';
import { QUEUE_LESSONS_PART2 } from './queueLessonsPart2';
import { TheoryLesson } from '../types';

export interface MultiLangCode {
  c?: string;
  cpp?: string;
  java?: string;
  python?: string;
}

export interface CodeExplanationLine {
  lineNum: string;
  code: string;
  explanation: string;
}

export interface QueueModule {
  id: string; // 'theory-01' to 'theory-20'
  number: string; // '01' to '20'
  numericId: number;
  category: string;
  title: string;
  subtitle: string;
  readTime: string;
  summary: string;
  executiveDefinition?: string;
  analogyTitle?: string;
  analogyContent?: string;
  criticalSpecifications?: string[];
  visualDiagram?: {
    type?: string;
    operationLabel?: string;
    notes?: string;
    diagramText?: string;
  };
  example?: {
    title: string;
    description: string;
    steps?: string[];
  };
  codeSnippets?: MultiLangCode;
  codeExplanations?: CodeExplanationLine[];
  keyTakeaway: string;
  interactiveDemoType?: string;
  rawLesson: TheoryLesson;
}

export type CircularLinkedListModule = QueueModule;

const ALL_LESSONS: TheoryLesson[] = [...QUEUE_LESSONS_PART1, ...QUEUE_LESSONS_PART2];

export const QUEUE_MODULES: QueueModule[] = ALL_LESSONS.map((lesson) => {
  const numStr = lesson.chapterNumber || (lesson.id < 10 ? `0${lesson.id}` : `${lesson.id}`);
  const idStr = `theory-${numStr}`;

  return {
    id: idStr,
    number: numStr,
    numericId: lesson.id,
    category: lesson.categoryLabel || 'FUNDAMENTALS',
    title: lesson.title,
    subtitle: lesson.shortDesc,
    readTime: lesson.readTime,
    summary: lesson.executiveDefinition || lesson.shortDesc,
    executiveDefinition: lesson.executiveDefinition,
    analogyTitle: lesson.analogy?.title,
    analogyContent: lesson.analogy?.description,
    criticalSpecifications: lesson.criticalSpecifications,
    visualDiagram: lesson.visualDiagram,
    example: lesson.example,
    codeSnippets: lesson.codeSnippet,
    keyTakeaway: lesson.keyTakeaway,
    interactiveDemoType: lesson.interactiveDemoType,
    rawLesson: lesson,
  };
});

// Backward-compatible aliases
export const CIRCULAR_LINKED_LIST_MODULES = QUEUE_MODULES;
export const LINEAR_SEARCH_MODULES = QUEUE_MODULES;
