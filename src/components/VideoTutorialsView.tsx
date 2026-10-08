import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  AlertCircle,
  Video as VideoIcon,
  Tv,
  Check,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { LessonItem, VIDEO_LESSONS } from '../data/videoLessons';
import { soundManager } from '../utils/audio';
import { progressManager } from '../utils/progressManager';

export const VideoTutorialsView: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<LessonItem | null>(() => VIDEO_LESSONS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.9);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isFullscreenControlsVisible, setIsFullscreenControlsVisible] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [completedVideos, setCompletedVideos] = useState<string[]>(() => {
    return progressManager.getVideoStats().completedVideos;
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync completion state from progressManager
  useEffect(() => {
    const unsub = progressManager.subscribe((state) => {
      setCompletedVideos(state.completedVideos || []);
    });
    return unsub;
  }, []);

  // Format time in mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Video loading when selected lesson changes
  useEffect(() => {
    if (!selectedLesson) return;
    const video = videoRef.current;
    if (!video) return;

    setHasError(false);
    setIsLoading(true);
    setCurrentTime(0);
    setDuration(0);

    video.src = selectedLesson.videoSrc;
    video.load();

    const handleReadyToPlay = () => {
      setIsLoading(false);
      setHasError(false);
      if (isPlaying) {
        video.play().catch(() => {
          setIsPlaying(false);
        });
      }
    };

    video.addEventListener('loadeddata', handleReadyToPlay, { once: true });
    video.addEventListener('canplay', handleReadyToPlay, { once: true });

    return () => {
      video.removeEventListener('loadeddata', handleReadyToPlay);
      video.removeEventListener('canplay', handleReadyToPlay);
    };
  }, [selectedLesson?.id]);

  // Select lesson
  const handleSelectLesson = useCallback(
    (lesson: LessonItem, autoPlay: boolean = true) => {
      soundManager.playSelect();
      setHasError(false);

      if (selectedLesson?.id === lesson.id && videoRef.current) {
        if (!isPlaying && autoPlay) {
          soundManager.playVideoPlay();
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
        return;
      }

      setSelectedLesson(lesson);
      if (autoPlay) {
        setIsPlaying(true);
      }
    },
    [selectedLesson, isPlaying]
  );

  // Play / Pause toggle
  const togglePlay = useCallback(() => {
    if (!videoRef.current || !selectedLesson) return;

    if (isPlaying) {
      soundManager.playVideoPause();
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      soundManager.playVideoPlay();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(() => {
            setIsPlaying(false);
            setIsLoading(false);
          });
      }
    }
  }, [isPlaying, selectedLesson]);

  // Strict Pause (for 'K' shortcut)
  const pauseVideoStrict = useCallback(() => {
    if (!videoRef.current || !selectedLesson) return;
    if (isPlaying) {
      soundManager.playVideoPause();
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isPlaying, selectedLesson]);

  // Rewind 10s
  const handleRewind = useCallback(() => {
    if (!videoRef.current) return;
    soundManager.playVideoSeek();
    const newTime = Math.max(0, videoRef.current.currentTime - 10);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, []);

  // Forward 10s
  const handleForward = useCallback(() => {
    if (!videoRef.current) return;
    soundManager.playVideoSeek();
    const maxTime = duration || videoRef.current.duration || 0;
    const newTime = Math.min(maxTime, videoRef.current.currentTime + 10);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, [duration]);

  // Timeline scrubber seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  // Jump to specific scene timestamp
  const handleJumpToTime = (timestamp: number) => {
    if (!videoRef.current) return;
    soundManager.playVideoSeek();
    videoRef.current.currentTime = timestamp;
    setCurrentTime(timestamp);
    if (!isPlaying) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Speed selector
  const handleChangeSpeed = useCallback((spd: number) => {
    soundManager.playVideoSpeed();
    setPlaybackSpeed(spd);
    if (videoRef.current) {
      videoRef.current.playbackRate = spd;
    }
  }, []);

  // Volume slider
  const handleVolumeChange = (newVol: number) => {
    soundManager.playVideoSeek();
    setVolume(newVol);
    const muted = newVol === 0;
    setIsMuted(muted);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = muted;
    }
  };

  // Mute / Unmute toggle
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    soundManager.playVideoSeek();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoRef.current.muted = nextMuted;
  }, [isMuted]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!playerContainerRef.current) return;
    const isDocFs = !!document.fullscreenElement;
    soundManager.playVideoFullscreen(!isDocFs);

    if (!isDocFs) {
      playerContainerRef.current
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
          setIsFullscreenControlsVisible(true);
        })
        .catch(() => {});
    } else {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
          setIsFullscreenControlsVisible(true);
        })
        .catch(() => {});
    }
  }, []);

  // Retry loading current video
  const handleRetry = () => {
    if (!selectedLesson || !videoRef.current) return;
    soundManager.playClick();
    setHasError(false);
    setIsLoading(true);
    videoRef.current.src = selectedLesson.videoSrc;
    videoRef.current.load();
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
        });
    }
  };

  // HTML5 Video Lifecycle Handlers
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    setIsLoading(false);
    setHasError(false);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (selectedLesson) {
      progressManager.markVideoCompleted(selectedLesson.id);
      soundManager.playSuccess();
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    setIsPlaying(false);
    soundManager.playError();
  };

  const handleWaiting = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // Auto-hide controls in fullscreen after inactivity
  const triggerFullscreenActivity = useCallback(() => {
    if (!isFullscreen) return;
    setIsFullscreenControlsVisible(true);
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
    hideControlsTimerRef.current = setTimeout(() => {
      if (isPlaying) {
        setIsFullscreenControlsVisible(false);
      }
    }, 2800);
  }, [isFullscreen, isPlaying]);

  const handleControlsInteraction = () => {
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }
    setIsFullscreenControlsVisible(true);
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.tagName === 'SELECT')
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        handleRewind();
      } else if (e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        pauseVideoStrict();
      } else if (e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        handleForward();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [togglePlay, handleRewind, pauseVideoStrict, handleForward, toggleFullscreen]);

  // Sync document fullscreen state
  useEffect(() => {
    const onFsChange = () => {
      const isDocFs = !!document.fullscreenElement;
      setIsFullscreen(isDocFs);
      setIsFullscreenControlsVisible(true);
      if (!isDocFs && hideControlsTimerRef.current) {
        clearTimeout(hideControlsTimerRef.current);
      }
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      if (hideControlsTimerRef.current) {
        clearTimeout(hideControlsTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fadeIn pb-12 font-sans">
      {/* Top Header Banner for Section */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-slate-100 dark:border-blue-500/15 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EFF6FF] dark:bg-blue-950/60 text-[#2563EB] dark:text-[#3B82F6] text-xs sm:text-sm font-bold font-mono uppercase tracking-wider rounded-lg border border-[#DBEAFE] dark:border-blue-500/30">
            <VideoIcon className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
            <span>Video Masterclass</span>
          </div>
          <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono font-semibold">
            Queue Mechanics In Action
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight animate-heading-enter">
            Queue Video Tutorials &amp; Demonstrations
          </h1>
          <p className="text-base sm:text-lg font-bold text-[#2563EB] dark:text-[#3B82F6]">
            Watch step-by-step visual explanations of queue data structures and their operations.
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Select a video lesson below to visually understand FIFO queue concepts, pointer movements (FRONT &amp; REAR), Enqueue/Dequeue mechanics, and circular queue modulo wraparound.
          </p>
        </div>
      </div>

      {/* Two Lesson Cards */}
      <section aria-label="Video Lessons Selection">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VIDEO_LESSONS.map((lesson) => {
            const isSelected = selectedLesson?.id === lesson.id;
            const isCompleted = completedVideos.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                id={`video-card-${lesson.id}`}
                onClick={() => handleSelectLesson(lesson, true)}
                className={`p-6 sm:p-7 rounded-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-white dark:bg-[#111827] border-[#2563EB] dark:border-[#3B82F6] shadow-md dark:shadow-lg ring-2 ring-[#2563EB]/20 dark:ring-blue-500/30'
                    : 'bg-white dark:bg-[#111827]/85 border-[#E2E8F0] dark:border-blue-500/20 hover:border-[#DBEAFE] dark:hover:border-blue-500/50 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`px-3 py-1 rounded-md text-xs sm:text-sm font-bold font-mono border tracking-wide transition-colors ${
                          isSelected
                            ? 'bg-[#EFF6FF] dark:bg-blue-950/80 text-[#2563EB] dark:text-[#3B82F6] border-[#DBEAFE] dark:border-blue-500/40'
                            : 'bg-[#F8FAFC] dark:bg-blue-950/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-blue-500/20'
                        }`}
                      >
                        {lesson.lessonNumber}
                      </span>
                      {isCompleted && (
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-bold font-mono">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                          <span>Completed</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                      {lesson.duration}s HD
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-slate-900 dark:text-white mb-2 leading-snug">
                    {lesson.title}
                  </h2>
                  <p className="text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {lesson.description}
                  </p>

                  {/* Topic Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {lesson.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectLesson(lesson, true);
                  }}
                  className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98] ${
                    isSelected
                      ? 'bg-[#2563EB] dark:bg-[#2563EB] hover:bg-[#1D4ED8] dark:hover:bg-[#1D4ED8] text-white shadow-md'
                      : 'bg-[#EFF6FF] dark:bg-blue-950/50 hover:bg-[#DBEAFE] dark:hover:bg-blue-900/60 text-[#2563EB] dark:text-[#3B82F6] border border-[#DBEAFE] dark:border-blue-500/30'
                  }`}
                  aria-label={`Click to watch ${lesson.title}`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>CLICK TO WATCH</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* VIDEO PLAYER AREA */}
      <section
        aria-label="Video Player Area"
        className="p-4 sm:p-8 rounded-2xl bg-white dark:bg-[#111827]/90 border border-slate-200 dark:border-blue-500/20 shadow-[0_4px_24px_rgba(15,23,42,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] space-y-4 sm:space-y-6"
      >
        {/* Now Playing Header Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-100 dark:border-blue-500/20">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-[#EFF6FF] dark:bg-blue-950/50 text-[#2563EB] dark:text-[#3B82F6] border border-[#DBEAFE] dark:border-blue-500/30 shrink-0 shadow-xs">
              <Tv className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs sm:text-sm font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Current Lesson
              </span>
              <h3 className="text-lg sm:text-2xl font-bold font-sans text-slate-900 dark:text-white break-words leading-snug">
                {selectedLesson
                  ? `NOW PLAYING: ${selectedLesson.nowPlayingTitle}`
                  : 'Select a lesson to begin'}
              </h3>
            </div>
          </div>

          {selectedLesson && (
            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              {completedVideos.includes(selectedLesson.id) && (
                <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-bold rounded-lg font-mono flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Completed</span>
                </span>
              )}
              <span className="px-3 py-1 bg-slate-100 dark:bg-[#0F172A] border border-slate-200 dark:border-blue-500/25 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold rounded-lg font-mono">
                {selectedLesson.filename}
              </span>
            </div>
          )}
        </div>

        {/* Video Player Display Container */}
        <div
          ref={playerContainerRef}
          onMouseMove={triggerFullscreenActivity}
          onPointerMove={triggerFullscreenActivity}
          onTouchStart={triggerFullscreenActivity}
          onClick={triggerFullscreenActivity}
          className={`relative w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800/80 dark:border-blue-500/30 shadow-[0_8px_30px_rgba(0,0,0,0.25)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-center group select-none ${
            isFullscreen
              ? `fixed inset-0 z-50 rounded-none w-screen h-screen ${
                  !isFullscreenControlsVisible ? 'cursor-none' : 'cursor-default'
                }`
              : 'aspect-video'
          }`}
        >
          {!selectedLesson && (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-900 to-[#0F172A] text-slate-300 space-y-3.5 select-none">
              <div className="w-16 h-16 rounded-2xl bg-blue-950/50 dark:bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-[#2563EB] dark:text-[#3B82F6] shadow-md">
                <VideoIcon className="w-8 h-8" />
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white font-sans">
                Select a lesson and click CLICK TO WATCH.
              </h4>
              <p className="text-sm sm:text-base text-slate-400 max-w-md font-sans leading-relaxed">
                Choose between Queue Data Structure or Types of Queues and Operations to load and play the video lesson.
              </p>
            </div>
          )}

          {selectedLesson && hasError && (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-slate-900 to-[#0F172A] text-slate-200 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-950/60 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-md">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white font-sans">
                  VIDEO COULD NOT BE LOADED
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
                  Please verify: <code className="text-rose-300 font-mono">{selectedLesson.filename}</code>
                </p>
              </div>
              <button
                id="btn-video-try-again"
                onClick={handleRetry}
                className="btn-modern-primary px-5 py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>TRY AGAIN</span>
              </button>
            </div>
          )}

          <video
            ref={videoRef}
            preload="metadata"
            playsInline
            className={`w-full h-full object-contain ${
              selectedLesson && !hasError ? 'block' : 'hidden'
            }`}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onError={handleError}
            onWaiting={handleWaiting}
            onCanPlay={handleCanPlay}
            onClick={togglePlay}
          />

          {selectedLesson && isLoading && !hasError && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center gap-3 pointer-events-none text-white">
              <Loader2 className="w-8 h-8 text-[#2563EB] dark:text-[#3B82F6] animate-spin" />
              <span className="text-xs font-bold font-mono tracking-wider uppercase">
                LOADING VIDEO...
              </span>
            </div>
          )}

          {/* Fullscreen controls overlay */}
          {isFullscreen && selectedLesson && (
            <div
              onMouseEnter={handleControlsInteraction}
              onTouchStart={handleControlsInteraction}
              onClick={(e) => e.stopPropagation()}
              className={`absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-50 bg-slate-900/65 dark:bg-[#0F172A]/75 backdrop-blur-xl border border-white/15 dark:border-blue-500/30 rounded-2xl p-3 sm:p-4 shadow-2xl space-y-3 transition-all duration-300 ease-out ${
                isFullscreenControlsVisible
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                />
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={handleRewind} className="p-2 text-white hover:text-[#2563EB]">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button onClick={togglePlay} className="p-2.5 bg-[#2563EB] text-white rounded-xl">
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>
                  <button onClick={handleForward} className="p-2 text-white hover:text-[#2563EB]">
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={toggleMute} className="p-2 text-white">
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button onClick={toggleFullscreen} className="p-2 text-white">
                    <Minimize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Regular Playback Controls Deck */}
        {selectedLesson && (
          <div className="bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-blue-500/20 rounded-2xl p-4 sm:p-5 space-y-3">
            {/* Scrubber */}
            <div className="space-y-1">
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
              />
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              {/* Left Playback Cluster */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRewind}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-[#2563EB] hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Rewind 10s (J)"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={togglePlay}
                  className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                  title="Play/Pause (Space)"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span className="text-xs">PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span className="text-xs">PLAY</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleForward}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-[#2563EB] hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Forward 10s (L)"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>

              {/* Center Speed Cluster */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => handleChangeSpeed(spd)}
                    className={`px-2 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      playbackSpeed === spd
                        ? 'bg-[#2563EB] text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              {/* Right Volume & Fullscreen Cluster */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-[#2563EB] transition-colors cursor-pointer"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-16 sm:w-20 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                  />
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-[#2563EB] transition-colors cursor-pointer"
                  title="Fullscreen (F)"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Scene Markers & Timestamps */}
        {selectedLesson?.scenes && selectedLesson.scenes.length > 0 && (
          <div className="space-y-3 pt-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-white">
              <Sparkles className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
              <span>Lesson Scenes &amp; Key Concepts (Click to Jump)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedLesson.scenes.map((scene) => {
                const isActive = currentTime >= scene.timeStart && currentTime < scene.timeEnd;

                return (
                  <button
                    key={scene.id}
                    onClick={() => handleJumpToTime(scene.timeStart)}
                    className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                      isActive
                        ? 'bg-[#EFF6FF] dark:bg-blue-950/70 border-[#2563EB] dark:border-[#3B82F6] ring-1 ring-[#2563EB]'
                        : 'bg-white dark:bg-[#0F172A] border-slate-200 dark:border-blue-500/20 hover:border-[#DBEAFE] dark:hover:border-blue-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-bold text-[#2563EB] dark:text-[#3B82F6]">
                        {formatTime(scene.timeStart)} – {formatTime(scene.timeEnd)}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        Scene 0{scene.id}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                        {scene.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {scene.narration}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
