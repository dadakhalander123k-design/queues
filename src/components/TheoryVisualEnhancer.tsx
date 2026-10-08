import React from 'react';
import { InteractiveQueueFifoDemo } from './theory/InteractiveQueueFifoDemo';
import { InteractiveQueueSandbox } from './theory/InteractiveQueueSandbox';
import { InteractiveCircularQueueDemo } from './theory/InteractiveCircularQueueDemo';
import { InteractiveLinkedListQueueDemo } from './theory/InteractiveLinkedListQueueDemo';
import { InteractiveDequeDemo } from './theory/InteractiveDequeDemo';
import { InteractivePriorityQueueDemo } from './theory/InteractivePriorityQueueDemo';
import { InteractiveQueueBfsDemo } from './theory/InteractiveQueueBfsDemo';
import { InteractiveQueueComplexityTable } from './theory/InteractiveQueueComplexityTable';
import { InteractiveQueueApplicationsDemo } from './theory/InteractiveQueueApplicationsDemo';
import { InteractiveQueueDiagram } from './theory/InteractiveQueueDiagram';
import { InteractiveQueueSummary } from './theory/InteractiveQueueSummary';
import { normalizeTheoryChapterId } from '../utils/progressManager';

interface TheoryVisualEnhancerProps {
  chapterId: string;
}

export const TheoryVisualEnhancer: React.FC<TheoryVisualEnhancerProps> = ({ chapterId }) => {
  const normId = normalizeTheoryChapterId(chapterId);

  // Map chapter IDs to specific Queue live interactive demonstrations
  switch (normId) {
    case 'theory-01':
    case 'theory-03':
      return <InteractiveQueueFifoDemo />;

    case 'theory-02':
    case 'theory-19':
      return <InteractiveQueueDiagram />;

    case 'theory-04':
    case 'theory-05':
    case 'theory-06':
    case 'theory-07':
    case 'theory-08':
    case 'theory-14':
    case 'theory-15':
      return <InteractiveQueueSandbox />;

    case 'theory-09':
    case 'theory-10':
      return <InteractiveCircularQueueDemo />;

    case 'theory-11':
      return <InteractiveLinkedListQueueDemo />;

    case 'theory-12':
      return <InteractiveDequeDemo />;

    case 'theory-13':
      return <InteractivePriorityQueueDemo />;

    case 'theory-16':
      return <InteractiveQueueApplicationsDemo />;

    case 'theory-17':
      return <InteractiveQueueBfsDemo />;

    case 'theory-18':
      return <InteractiveQueueComplexityTable />;

    case 'theory-20':
      return <InteractiveQueueSummary />;

    default:
      return <InteractiveQueueFifoDemo />;
  }
};

export const QueueTheoryVisualEnhancer = TheoryVisualEnhancer;
