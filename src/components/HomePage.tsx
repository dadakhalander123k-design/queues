import React from 'react';
import {
  ArrowRight,
  Target,
  Sigma,
  Puzzle,
  Lightbulb,
  Plus,
  List,
  Minus,
  Eye,
  Layers,
  BookOpen,
  ArrowUpDown,
  AlertTriangle,
  Database,
  Clock,
  Star,
  Zap,
  FolderGit2,
  Globe,
  Rocket,
  AlertCircle,
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { QueueHeroDiagram } from './common/QueueHeroDiagram';

export interface HomePageProps {
  onContinueLearning: () => void;
  onExploreTopics: () => void;
  onNavigateToTab: (
    tab: 'THEORY' | 'VIDEO' | 'GAME' | 'QUEST' | 'LAB' | 'QUIZ' | 'PROGRESS',
    targetOption?: string | number
  ) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onExploreTopics,
  onNavigateToTab,
}) => {
  useScrollReveal();

  const handleStartLearning = () => {
    soundManager.playPrimaryClick();
    onExploreTopics();
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6 sm:gap-7 font-sans text-slate-900 dark:text-slate-100 animate-page-enter pb-10 select-text">
      {/* =========================================================================
          SECTION 01: HERO SECTION & QUEUE FIFO DIAGRAM
          ========================================================================= */}
      <section className="reveal-on-scroll bg-white dark:bg-[#111827] p-6 sm:p-10 rounded-2xl border border-slate-200/90 dark:border-blue-500/20 shadow-xs dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Curriculum Label, Main Heading, & Description */}
          <div className="lg:col-span-6 flex flex-col gap-3.5">
            <div className="flex items-center">
              <span className="text-xs sm:text-sm font-mono font-bold tracking-wider text-[#2563EB] dark:text-[#3B82F6] uppercase">
                THEORY CURRICULUM &nbsp;•&nbsp; QUEUE DATA STRUCTURE &nbsp;•&nbsp; 20 CHAPTERS
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-[1.1]">
              Queue<br />
              <span className="text-[#2563EB] dark:text-[#3B82F6]">Data Structure</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-normal">
              Learn how queues follow the FIFO principle, how queue operations work with step-by-step pointer mechanics, and the techniques used to solve real-world problems efficiently.
            </p>

            {/* Important Callout Box */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-amber-300/90 dark:border-amber-700/80 bg-amber-50/80 dark:bg-amber-950/40 text-xs shadow-2xs mt-1">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 stroke-[2.2]" />
              <span className="text-amber-900 dark:text-amber-200">
                <strong className="font-bold">Important:</strong> Queues operate strictly on FIFO (First-In, First-Out) order.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Queue Illustration */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <QueueHeroDiagram />
          </div>
        </div>

        {/* 3 Quick Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/80">
          {/* Card 1: Core Idea */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-blue-500/20 shadow-2xs flex flex-col justify-between space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Target className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">Core Idea</h4>
                <p className="text-[11px] font-semibold text-[#2563EB] dark:text-[#3B82F6]">
                  <span className="font-bold">FIFO</span>: First In, First Out.
                </p>
              </div>
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800/60 leading-tight">
              <div className="flex items-start gap-1.5">
                <span className="text-[#2563EB] font-bold">•</span>
                <span>First inserted → first removed</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-[#2563EB] font-bold">•</span>
                <span><strong className="text-slate-800 dark:text-slate-200 font-semibold">Enqueue</strong> happens at <strong className="text-slate-800 dark:text-slate-200 font-semibold">REAR</strong></span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-[#2563EB] font-bold">•</span>
                <span><strong className="text-slate-800 dark:text-slate-200 font-semibold">Dequeue</strong> happens at <strong className="text-slate-800 dark:text-slate-200 font-semibold">FRONT</strong></span>
              </div>
            </div>
          </div>

          {/* Card 2: Key Formula */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-blue-500/20 shadow-2xs flex flex-col justify-between space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sigma className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">Key Formula</h4>
                <p className="text-[11px] font-semibold text-[#2563EB] dark:text-[#3B82F6]">
                  <span className="font-bold">FRONT</span> points to next element.
                </p>
              </div>
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800/60 leading-tight">
              <div className="flex items-start gap-1.5">
                <span className="text-[#2563EB] font-bold">•</span>
                <span><strong className="text-slate-800 dark:text-slate-200 font-semibold">Enqueue</strong> → add at <strong className="text-slate-800 dark:text-slate-200 font-semibold">REAR</strong> in O(1)</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-[#2563EB] font-bold">•</span>
                <span><strong className="text-slate-800 dark:text-slate-200 font-semibold">Dequeue</strong> → remove from <strong className="text-slate-800 dark:text-slate-200 font-semibold">FRONT</strong> in O(1)</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-[#2563EB] font-bold">•</span>
                <span><strong className="text-slate-800 dark:text-slate-200 font-semibold">Circular Queue</strong> → <strong className="text-slate-800 dark:text-slate-200 font-semibold">(rear + 1) % MAX</strong></span>
              </div>
            </div>
          </div>

          {/* Card 3: Main Challenge */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/80 dark:border-blue-500/20 shadow-2xs flex flex-col justify-between space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Puzzle className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">Main Challenge</h4>
                <p className="text-[11px] font-semibold text-[#2563EB] dark:text-[#3B82F6]">
                  Manage boundaries &amp; edge cases.
                </p>
              </div>
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800/60 leading-tight">
              <div className="flex items-start gap-1.5">
                <span className="text-[#2563EB] font-bold">•</span>
                <span>Maintain strict <strong className="text-slate-800 dark:text-slate-200 font-semibold">FIFO</strong> ordering</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-rose-500 font-bold">•</span>
                <span>Full buffer + Enqueue → <strong className="text-rose-600 dark:text-rose-400 font-semibold">Overflow</strong></span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-amber-500 font-bold">•</span>
                <span>Empty buffer + Dequeue → <strong className="text-amber-600 dark:text-amber-400 font-semibold">Underflow</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 02: THE MAIN IDEA & OPERATIONS PIPELINE
          ========================================================================= */}
      <section className="reveal-on-scroll bg-white dark:bg-[#111827] p-6 sm:p-8 lg:p-10 rounded-2xl border border-slate-200/90 dark:border-blue-500/20 shadow-xs dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950/80 text-[#2563EB] dark:text-[#3B82F6] flex items-center justify-center border border-blue-100 dark:border-blue-900/50 shadow-2xs">
            <Lightbulb className="w-4 h-4 stroke-[2.4]" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            1. The Main Idea
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <div className="lg:col-span-4 space-y-2.5">
            <h3 className="text-base sm:text-lg font-bold text-[#2563EB] dark:text-[#3B82F6] leading-snug">
              Why do we need a Queue?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              A queue stores elements in FIFO order. Insertion happens at the REAR and deletion happens at the FRONT. This orderly processing guarantees fair, predictable scheduling across asynchronous workflows.
            </p>
          </div>

          <div className="lg:col-span-8 bg-slate-50/70 dark:bg-[#0F172A] rounded-2xl border border-slate-200/60 dark:border-blue-500/20 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto custom-scrollbar py-1">
              {/* Step 1: Enqueue */}
              <div className="flex flex-col items-center text-center shrink-0 w-16 sm:w-20">
                <div className="w-11 h-11 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-xs mb-2">
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <strong className="text-xs font-bold text-slate-900 dark:text-slate-100">Enqueue</strong>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">Add to REAR</span>
              </div>

              <ArrowRight className="w-3.5 h-3.5 text-blue-400 dark:text-blue-500 shrink-0 -mt-6" />

              {/* Step 2: Queue */}
              <div className="flex flex-col items-center text-center shrink-0 w-16 sm:w-20">
                <div className="w-11 h-11 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-xs mb-2">
                  <List className="w-5 h-5 stroke-[2.2]" />
                </div>
                <strong className="text-xs font-bold text-slate-900 dark:text-slate-100">Queue</strong>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">FIFO storage</span>
              </div>

              <ArrowRight className="w-3.5 h-3.5 text-blue-400 dark:text-blue-500 shrink-0 -mt-6" />

              {/* Step 3: Dequeue */}
              <div className="flex flex-col items-center text-center shrink-0 w-16 sm:w-20">
                <div className="w-11 h-11 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-xs mb-2">
                  <Minus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <strong className="text-xs font-bold text-slate-900 dark:text-slate-100">Dequeue</strong>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">Remove from FRONT</span>
              </div>

              <ArrowRight className="w-3.5 h-3.5 text-blue-400 dark:text-blue-500 shrink-0 -mt-6" />

              {/* Step 4: Peek */}
              <div className="flex flex-col items-center text-center shrink-0 w-16 sm:w-20">
                <div className="w-11 h-11 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-xs mb-2">
                  <Eye className="w-5 h-5 stroke-[2.2]" />
                </div>
                <strong className="text-xs font-bold text-slate-900 dark:text-slate-100">Peek</strong>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">View FRONT item</span>
              </div>

              <ArrowRight className="w-3.5 h-3.5 text-blue-400 dark:text-blue-500 shrink-0 -mt-6" />

              {/* Step 5: Display */}
              <div className="flex flex-col items-center text-center shrink-0 w-16 sm:w-20">
                <div className="w-11 h-11 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-xs mb-2">
                  <Layers className="w-5 h-5 stroke-[2.2]" />
                </div>
                <strong className="text-xs font-bold text-slate-900 dark:text-slate-100">Display</strong>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">Show all elements</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 03: 5-NODE CONCEPT ROADMAP
          ========================================================================= */}
      <section className="reveal-on-scroll bg-white dark:bg-[#111827] p-6 sm:p-8 lg:p-10 rounded-2xl border border-slate-200/90 dark:border-blue-500/20 shadow-xs dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all">
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950/80 text-[#2563EB] dark:text-[#3B82F6] flex items-center justify-center border border-blue-100 dark:border-blue-900/50 shadow-2xs">
            <BookOpen className="w-4 h-4 stroke-[2.4]" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            2. Concept Roadmap
          </h2>
        </div>

        <div className="relative px-2 sm:px-4">
          <div className="hidden sm:block absolute top-[13px] left-[9%] right-[9%] h-[2px] border-t-2 border-dashed border-blue-200 dark:border-blue-800/80 z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 sm:gap-3 relative z-10">
            {/* Step 01 */}
            <div className="flex flex-col items-center text-center">
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/70 text-blue-700 dark:text-blue-300 mb-3 border border-blue-200/60 dark:border-blue-800">
                01
              </span>
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/70 text-[#2563EB] dark:text-[#3B82F6] flex items-center justify-center shadow-xs border border-blue-100 dark:border-slate-800 mb-2">
                <List className="w-5 h-5 stroke-[2.2]" />
              </div>
              <strong className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                What is <br /> a Queue?
              </strong>
            </div>

            {/* Step 02 */}
            <div className="flex flex-col items-center text-center">
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/70 text-blue-700 dark:text-blue-300 mb-3 border border-blue-200/60 dark:border-blue-800">
                02
              </span>
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/70 text-[#2563EB] dark:text-[#3B82F6] flex items-center justify-center shadow-xs border border-blue-100 dark:border-slate-800 mb-2">
                <ArrowUpDown className="w-5 h-5 stroke-[2.2]" />
              </div>
              <strong className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Queue <br /> Operations
              </strong>
            </div>

            {/* Step 03 */}
            <div className="flex flex-col items-center text-center">
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/70 text-amber-700 dark:text-amber-300 mb-3 border border-amber-200/60 dark:border-amber-800">
                03
              </span>
              <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs border border-amber-100 dark:border-slate-800 mb-2">
                <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
              </div>
              <strong className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Overflow &amp; <br /> Underflow
              </strong>
            </div>

            {/* Step 04 */}
            <div className="flex flex-col items-center text-center">
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/70 text-blue-700 dark:text-blue-300 mb-3 border border-blue-200/60 dark:border-blue-800">
                04
              </span>
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/70 text-[#2563EB] dark:text-[#3B82F6] flex items-center justify-center shadow-xs border border-blue-100 dark:border-slate-800 mb-2">
                <Database className="w-5 h-5 stroke-[2.2]" />
              </div>
              <strong className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Implementation <br /> (Array &amp; Linked List)
              </strong>
            </div>

            {/* Step 05 */}
            <div className="flex flex-col items-center text-center col-span-2 sm:col-span-1">
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/70 text-blue-700 dark:text-blue-300 mb-3 border border-blue-200/60 dark:border-blue-800">
                05
              </span>
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/70 text-[#2563EB] dark:text-[#3B82F6] flex items-center justify-center shadow-xs border border-blue-100 dark:border-slate-800 mb-2">
                <Clock className="w-5 h-5 stroke-[2.2]" />
              </div>
              <strong className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Complexity &amp; <br /> Applications
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 04: WHY THIS TOPIC MATTERS
          ========================================================================= */}
      <section className="reveal-on-scroll bg-white dark:bg-[#111827] p-6 sm:p-8 lg:p-10 rounded-2xl border border-slate-200/90 dark:border-blue-500/20 shadow-xs dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950/80 text-[#2563EB] dark:text-[#3B82F6] flex items-center justify-center border border-blue-100 dark:border-blue-900/50 shadow-2xs">
            <Star className="w-4 h-4 stroke-[2.4]" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            3. Why This Topic Matters
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
            <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center mb-4 shadow-xs">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
              Efficient Operations
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Queues allow fast insertion at REAR and deletion at FRONT in O(1) constant time without shifting remaining elements.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-xs">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
              Problem Solving
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Fundamental component for Breadth-First Search (BFS), print spooling, CPU task scheduling, and real-time streaming buffers.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/50">
            <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center mb-4 shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
              Real-World Use
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Essential in operating systems, network packet routers, message brokers (Kafka/RabbitMQ), web servers, and customer wait lines.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 05: READY TO START?
          ========================================================================= */}
      <section className="reveal-on-scroll rounded-3xl bg-blue-50/80 dark:bg-[#111827] border border-blue-100/90 dark:border-blue-500/20 p-6 sm:p-8 lg:p-10 shadow-xs transition-colors flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 sm:gap-6 text-center sm:text-left">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0">
            <Rocket className="w-9 h-9 stroke-[2.2]" />
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Ready to Start?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-md">
              Begin your comprehensive journey by understanding queue fundamentals, FIFO mechanics, and operations.
            </p>
          </div>
        </div>

        <button
          onClick={handleStartLearning}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-500 hover:from-blue-800 hover:via-blue-700 hover:to-indigo-600 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2.5 group cursor-pointer active:scale-95 shrink-0"
        >
          <span>Start Learning</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </section>
    </div>
  );
};
