export interface QuizQuestionItem {
  id: number;
  type?: 'multiple-choice' | 'predict-output' | 'true-false' | 'scenario' | 'drag-order';
  question: string;
  options: string[];
  correctIndex: number;
  correctAnswer?: string;
  correctAnswerText: string;
  explanation: string;
  exampleSnippet?: string;
  techniqueCode: string;
  targetChapterId?: string;
  targetLevelId?: number;
  difficulty?: 'Basic' | 'Intermediate' | 'Hard';
  hints?: [string, string, string];
}

export const QUEUE_QUIZ_QUESTIONS: QuizQuestionItem[] = [
  {
    id: 1,
    difficulty: 'Basic',
    question: 'Which of the following fundamental principles governs standard Queue insertion and deletion operations?',
    options: [
      'FIFO (First In, First Out)',
      'LIFO (Last In, First Out)',
      'LILO (Last In, Last Out)',
      'Random Access Memory',
    ],
    correctIndex: 0,
    correctAnswerText: 'FIFO (First In, First Out)',
    explanation:
      'A standard Queue strictly adheres to the FIFO (First In, First Out) principle. The earliest item inserted into the queue is always the first one to be removed, exactly like a queue of customers waiting at a checkout counter.',
    exampleSnippet:
      'Enqueue(A) → Enqueue(B) → Dequeue() yields A first, because A entered before B.',
    techniqueCode: 'Q-01',
    targetChapterId: 'theory-01',
    targetLevelId: 1,
    hints: [
      'Think of waiting in a movie ticket or grocery checkout line.',
      'The first person to join the line is served first.',
      'The acronym starts with F for First.',
    ],
  },
  {
    id: 2,
    difficulty: 'Basic',
    question: 'In a standard FIFO Queue, where are new elements inserted and where are existing elements extracted?',
    options: [
      'Inserted at REAR, extracted from FRONT',
      'Inserted at FRONT, extracted from REAR',
      'Both insertion and extraction happen at FRONT',
      'Both insertion and extraction happen at REAR',
    ],
    correctIndex: 0,
    correctAnswerText: 'Inserted at REAR, extracted from FRONT',
    explanation:
      'In a standard Queue, new elements are enqueued at the REAR pointer (back of the queue) and dequeued from the FRONT pointer (head of the queue).',
    exampleSnippet:
      'FRONT → [10, 20, 30] ← REAR. Dequeue removes 10 from FRONT; Enqueue(40) appends 40 at REAR.',
    techniqueCode: 'Q-02',
    targetChapterId: 'theory-02',
    targetLevelId: 1,
    hints: [
      'Remember where people join a line and where people leave it.',
      'Newcomers join at the back (REAR), and the person being served leaves from the front (FRONT).',
      'Insertion happens at REAR; deletion happens at FRONT.',
    ],
  },
  {
    id: 3,
    difficulty: 'Basic',
    question: 'Consider the following sequence of Queue operations on an initially empty queue:\n\nEnqueue(10)\nEnqueue(20)\nEnqueue(30)\nDequeue()\nEnqueue(40)\n\nWhat value is currently returned by Peek() (or Front())?',
    options: ['10', '20', '30', '40'],
    correctIndex: 1,
    correctAnswerText: '20',
    explanation:
      'Step-by-step trace:\n1. Enqueue(10): Queue = [10]\n2. Enqueue(20): Queue = [10, 20]\n3. Enqueue(30): Queue = [10, 20, 30]\n4. Dequeue(): Removes front element 10, leaving Queue = [20, 30]\n5. Enqueue(40): Appends 40 at the rear, Queue = [20, 30, 40]\n6. Peek() reads the front element without removing it, which is 20.',
    exampleSnippet:
      'After removing 10, the new FRONT element is 20.',
    techniqueCode: 'Q-03',
    targetChapterId: 'theory-06',
    targetLevelId: 2,
    hints: [
      'Trace each operation sequentially from front to rear.',
      'Dequeue() removes the oldest element (10).',
      'Peek() looks at the front of the remaining queue, not the newly added rear element.',
    ],
  },
  {
    id: 4,
    difficulty: 'Basic',
    question: 'What error condition occurs when a software component attempts to execute Dequeue() or Peek() on a queue that is currently empty (size = 0)?',
    options: [
      'Queue Underflow',
      'Queue Overflow',
      'IndexOutOfBoundsException at Capacity',
      'Circular Pointer Wrap Error',
    ],
    correctIndex: 0,
    correctAnswerText: 'Queue Underflow',
    explanation:
      'Queue Underflow occurs when an extraction or peek operation is attempted on an empty data structure that contains zero elements (front == -1 or count == 0).',
    exampleSnippet:
      'if (isEmpty()) throw new QueueUnderflowException("Cannot dequeue from an empty queue");',
    techniqueCode: 'Q-04',
    targetChapterId: 'theory-15',
    targetLevelId: 1,
    hints: [
      'Think of taking a ticket from a dispenser when the roll has run completely out.',
      'Operating below the minimum allowable boundary (0 elements) is called underflow.',
      'The correct technical term is Queue Underflow.',
    ],
  },
  {
    id: 5,
    difficulty: 'Intermediate',
    question: 'In a naive linear array-based queue with capacity N, what critical problem occurs after several elements are repeatedly enqueued and dequeued until REAR reaches index N - 1?',
    options: [
      'False Overflow: New items cannot be enqueued even though freed slots exist at lower indices',
      'Queue Underflow: The front pointer wraps around to an invalid negative index',
      'Memory Leak: The garbage collector automatically drops the array reference',
      'Infinite Loop: The processor locks waiting for pointer reset',
    ],
    correctIndex: 0,
    correctAnswerText: 'False Overflow: New items cannot be enqueued even though freed slots exist at lower indices',
    explanation:
      'In a simple linear array queue, the REAR pointer monotonically moves rightward until it hits index N - 1. Even if multiple Dequeue() calls have freed the slots at indices 0, 1, ..., REAR == N - 1 triggers an overflow check. This waste of available memory is called "False Overflow", and is solved by implementing a Circular Queue.',
    exampleSnippet:
      'Queue: [_, _, 30, 40, 50]. Indices 0 & 1 are vacant, but rear = 4 triggers overflow in a linear queue!',
    techniqueCode: 'Q-05',
    targetChapterId: 'theory-09',
    targetLevelId: 3,
    hints: [
      'The rear pointer reached the end of the array buffer.',
      'Slots at earlier indices were emptied by earlier dequeues.',
      'The queue reports it is full even though empty space exists—a "false" condition.',
    ],
  },
  {
    id: 6,
    difficulty: 'Intermediate',
    question: 'A Circular Queue of fixed capacity 5 (indices 0 to 4) currently has its REAR pointer at index 4 and FRONT pointer at index 2 (indices 0 and 1 are empty). If a new element 99 is enqueued, what will be the new index of REAR?',
    options: ['0', '1', '4', '5'],
    correctIndex: 0,
    correctAnswerText: '0',
    explanation:
      'In a circular queue, the next insertion index is calculated using modulo arithmetic:\nnext_rear = (rear + 1) % capacity = (4 + 1) % 5 = 5 % 5 = 0.\nThe rear pointer wraps around to index 0, where element 99 is stored without needing to shift existing elements or reallocate memory.',
    exampleSnippet:
      'rear = (4 + 1) % 5 = 0. Element 99 occupies queue[0].',
    techniqueCode: 'Q-06',
    targetChapterId: 'theory-10',
    targetLevelId: 3,
    hints: [
      'Use the circular queue pointer advancement formula: (rear + 1) % capacity.',
      'Capacity is 5 and current rear is 4.',
      '(4 + 1) % 5 = 5 % 5 = 0.',
    ],
  },
  {
    id: 7,
    difficulty: 'Intermediate',
    question: 'When implementing a Queue using a Singly-Linked List, why is it standard practice to maintain BOTH a FRONT (head) pointer and a REAR (tail) pointer?',
    options: [
      'To enable both Enqueue and Dequeue operations to execute in O(1) constant time without traversing the list',
      'Because linked lists cannot store integers without a secondary pointer',
      'To prevent the garbage collector from deallocating mid-list nodes',
      'To allow bidirectional backward traversal from the rear node',
    ],
    correctIndex: 0,
    correctAnswerText: 'To enable both Enqueue and Dequeue operations to execute in O(1) constant time without traversing the list',
    explanation:
      'If only a Head pointer is maintained, removing from the head is O(1), but enqueuing at the end requires traversing all N nodes from head to tail, costing O(N) time. Maintaining a REAR (tail) pointer allows new nodes to be appended immediately via rear.next = newNode in O(1) constant time.',
    exampleSnippet:
      'front = front.next takes O(1). rear.next = newNode; rear = newNode takes O(1).',
    techniqueCode: 'Q-07',
    targetChapterId: 'theory-11',
    targetLevelId: 2,
    hints: [
      'Consider the time complexity of finding the last node if you only hold the head.',
      'Traversing N nodes takes O(N) linear time.',
      'Holding both front and rear pointers ensures O(1) performance for both operations.',
    ],
  },
  {
    id: 8,
    difficulty: 'Intermediate',
    question: 'Which of the following print jobs will an operating system print spooler (FIFO Queue) complete and dispatch FIRST?',
    options: [
      'Job A: Submitted at 10:00 AM (TaxReport.pdf)',
      'Job B: Submitted at 10:03 AM (Resume.docx)',
      'Job C: Submitted at 10:07 AM (BoardSlides.pptx)',
      'Job D: Submitted at 10:11 AM (ShippingLabel.png)',
    ],
    correctIndex: 0,
    correctAnswerText: 'Job A: Submitted at 10:00 AM (TaxReport.pdf)',
    explanation:
      'An operating system print spooler relies on a FIFO queue: incoming jobs are queued in order of arrival and dispatched strictly in chronological order (Job A at 10:00 AM, then Job B at 10:03 AM, then Job C at 10:07 AM, and finally Job D at 10:11 AM).',
    exampleSnippet:
      'Earliest arrival = earliest service: Job A arrived first at 10:00 AM.',
    techniqueCode: 'Q-08',
    targetChapterId: 'theory-16',
    targetLevelId: 4,
    hints: [
      'First In, First Out dictates that earlier timestamps are printed before later timestamps.',
      'Order from earliest arrival time (10:00 AM) to latest arrival time (10:11 AM).',
      'Sequence: Job A -> Job B -> Job C -> Job D.',
    ],
  },
  {
    id: 9,
    difficulty: 'Hard',
    question: 'How can a Double-Ended Queue (Deque) be configured to strictly emulate the behavior of a LIFO Stack?',
    options: [
      'Restrict operations to insertFront() and deleteFront() (or insertRear() and deleteRear()) on a single side',
      'Restrict operations to insertRear() and deleteFront() across opposite ends',
      'Enforce alternating insertions between front and rear',
      'Sort elements by priority value prior to each deletion',
    ],
    correctIndex: 0,
    correctAnswerText: 'Restrict operations to insertFront() and deleteFront() (or insertRear() and deleteRear()) on a single side',
    explanation:
      'A LIFO Stack performs both insertion and deletion at the same end (the top). By restricting a Deque to only one side (either insertFront + deleteFront, or insertRear + deleteRear), it replicates the exact behavior of a Stack in O(1) time. Conversely, restricting to insertRear and deleteFront yields a FIFO Queue.',
    exampleSnippet:
      'Stack emulation: push = insertFront(), pop = deleteFront(). Both happen at one opening.',
    techniqueCode: 'Q-09',
    targetChapterId: 'theory-12',
    targetLevelId: 3,
    hints: [
      'A Stack only allows operations at a single opening (the top).',
      'Choose the option where both insert and delete happen on the exact same end.',
      'Operating solely at the Front (or solely at the Rear) provides LIFO behavior.',
    ],
  },
  {
    id: 10,
    difficulty: 'Hard',
    question: 'In a circular array queue of capacity N where one slot is intentionally left empty to disambiguate between "Full" and "Empty" states, what is the mathematical formula for Queue Full?',
    options: [
      '(rear + 1) % N == front',
      '(front + 1) % N == rear',
      'front == rear',
      'rear - front == N',
    ],
    correctIndex: 0,
    correctAnswerText: '(rear + 1) % N == front',
    explanation:
      'When one slot is reserved as a sentinel, an empty queue is identified when front == rear. Advancing rear until its very next position wraps around and hits front — i.e., (rear + 1) % N == front — indicates that all usable capacity is exhausted, preventing ambiguity with the empty condition.',
    exampleSnippet:
      'If N=5, front=0, rear=4: (4 + 1) % 5 = 0 == front → Queue is FULL!',
    techniqueCode: 'Q-10',
    targetChapterId: 'theory-10',
    targetLevelId: 5,
    hints: [
      'Empty state is defined when front == rear.',
      'To prevent the full state from having the exact same condition (front == rear), we stop when rear is one step behind front.',
      'The formula uses modulo N: (rear + 1) % N == front.',
    ],
  },
  {
    id: 11,
    difficulty: 'Hard',
    question: 'When implementing a FIFO Queue using two LIFO Stacks (stack1 for Enqueue, stack2 for Dequeue), what is the amortized time complexity of the Dequeue operation?',
    options: [
      'O(1) amortized constant time',
      'O(N) worst-case and average-case time',
      'O(log N) logarithmic time',
      'O(N^2) quadratic time',
    ],
    correctIndex: 0,
    correctAnswerText: 'O(1) amortized constant time',
    explanation:
      'When stack2 has elements, Dequeue pops from stack2 in O(1) time. When stack2 is empty, all N elements from stack1 are popped and pushed to stack2 in O(N) time, which inverts their order to FIFO. Since each element is pushed to stack1 once, transferred to stack2 once, and popped from stack2 once, each element experiences at most 3 operations over its lifecycle. Hence, the total time for N operations is O(N), yielding an amortized time of O(1) per Dequeue.',
    exampleSnippet:
      'Total operations across N items = 3N. Amortized cost per operation = 3N / N = O(1).',
    techniqueCode: 'Q-11',
    targetChapterId: 'theory-18',
    targetLevelId: 5,
    hints: [
      'Although a single transfer step takes O(N), how often does it occur?',
      'Once transferred to stack2, subsequent dequeues take immediate O(1) time.',
      'Over a sequence of N operations, the average cost per operation is O(1) amortized.',
    ],
  },
  {
    id: 12,
    difficulty: 'Hard',
    question: 'Why does Breadth-First Search (BFS) in unweighted graphs strictly depend on a FIFO Queue rather than a LIFO Stack to guarantee discovering the shortest path from a start vertex?',
    options: [
      'A Queue processes all vertices at distance D before visiting any vertex at distance D + 1',
      'A Queue has a lower asymptotic space complexity than a recursion stack in dense graphs',
      'A Queue prevents cycles automatically without maintaining a visited set',
      'A Stack cannot store non-integer vertex identifiers',
    ],
    correctIndex: 0,
    correctAnswerText: 'A Queue processes all vertices at distance D before visiting any vertex at distance D + 1',
    explanation:
      'BFS explores a graph radially in concentric tiers. When visiting a vertex at depth D, all its unvisited neighbors are pushed to the REAR of the Queue (depth D + 1). Because the Queue processes nodes in FIFO order, all nodes currently queued at depth D are guaranteed to be dequeued and processed before any node at depth D + 1. This level-order invariant guarantees that the first time any vertex is encountered, it is reached along the shortest path (minimum edge count).',
    exampleSnippet:
      'FIFO maintains level-order exploration: Level 0 → Level 1 → Level 2 in increasing edge distances.',
    techniqueCode: 'Q-12',
    targetChapterId: 'theory-17',
    targetLevelId: 5,
    hints: [
      'Think about exploring a maze layer by layer (level-order traversal).',
      'FIFO ensures nodes at current distance D are evaluated before nodes at distance D + 1.',
      'This tier-by-tier exploration guarantees the shortest path in unweighted graphs.',
    ],
  },
];

QUEUE_QUIZ_QUESTIONS.forEach((q) => {
  q.type = 'multiple-choice';
  q.correctAnswer = q.correctAnswerText;
});

export const QUIZ_QUESTIONS = QUEUE_QUIZ_QUESTIONS;
