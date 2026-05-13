/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Circle, 
  ChevronRight, 
  ChevronLeft,
  Mic, 
  MicOff, 
  BookOpen, 
  Trophy, 
  ArrowLeft,
  Sparkles,
  Play,
  RotateCcw,
  Languages,
  LayoutDashboard,
  Sun,
  Moon
} from 'lucide-react';
import { CHALLENGE_DATA, DayChallenge } from './data/challenge';
import { getSpeakingFeedback, FeedbackResponse, getExampleExplanation, translateKeywords } from './services/geminiService';
import { useAuth } from './auth/AuthContext';
import { UserMenu } from './auth/UserMenu';
import {
  fetchProgress,
  markDayComplete,
  mergeCompletedDays,
  saveAttempt,
} from './services/progressService';

const PROGRESS_STORAGE_KEY = 'ielts-30-day-progress';

// --- Types ---
type AppState = 'dashboard' | 'day-detail' | 'feedback';

// --- Utils ---
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function App() {
  const [view, setView] = useState<AppState>('dashboard');
  const [selectedDay, setSelectedDay] = useState<DayChallenge | null>(null);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [explainingIndex, setExplainingIndex] = useState<number | null>(null);
  const [learnerLanguage, setLearnerLanguage] = useState<'Vietnamese' | 'Chinese' | 'Japanese'>('Vietnamese');
  const [selectedBand, setSelectedBand] = useState<6 | 7 | 8>(8);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [explanationMap, setExplanationMap] = useState<Record<string, string>>({});
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [translatedKeywordsMap, setTranslatedKeywordsMap] = useState<Record<string, string[]>>({});
  const [loadingKeywords, setLoadingKeywords] = useState(false);
  const { user, token, initialized: authReady } = useAuth();

  // Load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('ielts-theme') as 'dark' | 'light';
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Load progress — from server when authed, localStorage otherwise.
  // On sign-in, any anonymous local progress is merged into the server first.
  useEffect(() => {
    if (!authReady) return;

    if (user && token) {
      const localRaw = localStorage.getItem(PROGRESS_STORAGE_KEY);
      const local: number[] = localRaw ? JSON.parse(localRaw) : [];

      const load = local.length
        ? mergeCompletedDays(token, local).then((data) => {
            localStorage.removeItem(PROGRESS_STORAGE_KEY);
            return data;
          })
        : fetchProgress(token);

      load
        .then((data) => setCompletedDays(data.completedDays))
        .catch((err) => console.error('Failed to load progress', err));
    } else {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      setCompletedDays(saved ? JSON.parse(saved) : []);
    }
  }, [authReady, user, token]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ielts-theme', theme);
  }, [theme]);

  const saveProgress = (dayId: number) => {
    if (completedDays.includes(dayId)) return;
    const next = [...completedDays, dayId];
    setCompletedDays(next);
    if (user && token) {
      markDayComplete(token, dayId).catch((err) =>
        console.error('Failed to save progress', err),
      );
    } else {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next));
    }
  };

  const startDay = (day: DayChallenge) => {
    setSelectedDay(day);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setFeedback(null);
    setView('day-detail');
  };

  const handleFeedback = async () => {
    if ((!userAnswer && !audioBase64) || !selectedDay) return;
    setLoadingFeedback(true);
    try {
      const res = await getSpeakingFeedback(
        selectedDay.title,
        selectedDay.questions[currentQuestionIndex].text,
        userAnswer,
        selectedDay.keywords.map(k => k.word),
        audioBase64 || undefined
      );
      setFeedback(res);
      saveProgress(selectedDay.id);
      if (user && token) {
        saveAttempt(token, {
          dayId: selectedDay.id,
          questionIx: currentQuestionIndex,
          transcript: res.userTranscript ?? userAnswer,
          feedback: res,
          score: res.score,
        }).catch((err) => console.error('Failed to save attempt', err));
      }
    } catch (err) {
      alert("AI was a bit busy. Please try again.");
    } finally {
      setLoadingFeedback(false);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1];
            setAudioBase64(base64String);
            // Optionally, you could try to trigger transcription here if you wanted immediate text
            setUserAnswer("(Audio recorded - ready for analysis)");
          };
          
          // Stop all tracks to release the microphone
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
        setAudioBase64(null);
      } catch (err) {
        console.error("Error accessing microphone:", err);
        alert("Could not access microphone. Please check permissions.");
      }
    }
  };

  const resetPractice = () => {
    setUserAnswer('');
    setFeedback(null);
    setAudioBase64(null);
  };

  const handleShowExplanation = async (example: string, index: number) => {
    if (explainingIndex === index) {
      setExplainingIndex(null);
      return;
    }
    
    const cacheKey = `${learnerLanguage}_${example}`;
    setExplainingIndex(index);
    if (!explanationMap[cacheKey]) {
      setLoadingExplanation(true);
      try {
        const text = await getExampleExplanation(example, learnerLanguage);
        setExplanationMap(prev => ({ ...prev, [cacheKey]: text }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingExplanation(false);
      }
    }
  };

  // Translate keywords when language or day changes
  useEffect(() => {
    if (selectedDay && learnerLanguage !== 'Vietnamese') {
      const cacheKey = `${learnerLanguage}_${selectedDay.id}`;
      if (!translatedKeywordsMap[cacheKey]) {
        const performTranslation = async () => {
          setLoadingKeywords(true);
          try {
            const translations = await translateKeywords(selectedDay.keywords, learnerLanguage);
            setTranslatedKeywordsMap(prev => ({ ...prev, [cacheKey]: translations }));
          } catch (err) {
            console.error(err);
          } finally {
            setLoadingKeywords(false);
          }
        };
        performTranslation();
      }
    }
  }, [selectedDay, learnerLanguage]);

  return (
    <div className="min-h-screen font-sans selection:bg-blue-500/30">
      <div className="immersive-bg" />

      {/* Header */}
      <header className="sticky top-0 z-50 glass px-8 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('dashboard')}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white glow-blue">
            <Trophy size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight text-app-heading">IELTS 30-Day</h1>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Speaking Challenge</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-2xl bg-white/5 border border-white/5 text-slate-400 hover:text-blue-400 transition-all"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="flex items-center space-x-3 bg-white/5 border border-white/5 px-4 py-2 rounded-2xl">
            <Languages size={14} className="text-blue-400" />
            <select 
              value={learnerLanguage}
              onChange={(e) => setLearnerLanguage(e.target.value as any)}
              className="bg-transparent text-xs font-bold uppercase tracking-widest text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="Vietnamese" className="bg-slate-950 text-slate-300">Vietnamese</option>
              <option value="Chinese" className="bg-slate-950 text-slate-300">Chinese</option>
              <option value="Japanese" className="bg-slate-950 text-slate-300">Japanese</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-right">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Your Progress</p>
              <p className="font-bold text-sm text-blue-400">{Math.round((completedDays.length / 30) * 100)}%</p>
            </div>
            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="h-full bg-blue-500 glow-blue"
                initial={{ width: 0 }}
                animate={{ width: `${(completedDays.length / 30) * 100}%` }}
              />
            </div>
          </div>

          <UserMenu />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 relative">
        <AnimatePresence mode="wait">
          {view === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <section>
              <div className="mb-12">
                <span className="text-xs text-blue-400 font-bold uppercase tracking-[0.3em] mb-2 block">Learning Path</span>
                <h2 className="text-5xl font-light tracking-tight mb-4 text-app-heading">Your Speaking <span className="text-blue-400 font-normal italic font-serif">Journey</span></h2>
                <p className="text-app-muted max-w-xl text-lg font-light leading-relaxed">Break through plateaus with our structured 3-phase curriculum. From daily habits to complex narratives.</p>
              </div>

                <div className="grid lg:grid-cols-3 grid-cols-1 gap-12">
                  {[1, 2, 3].map(phase => (
                    <div key={phase} className="space-y-8">
                      <div className="flex items-center space-x-4 border-l-2 border-blue-500/30 pl-6 py-1">
                        <span className="text-4xl font-black text-app-heading/5 select-none absolute -ml-16">0{phase}</span>
                        <div>
                          <h3 className="font-medium text-app-heading text-xl">
                            {phase === 1 ? "Phase 1: Foundations" : 
                             phase === 2 ? "Phase 2: Idea Expansion" : 
                             "Phase 3: Critical Analysis"}
                          </h3>
                          <p className="text-xs text-app-muted font-mono tracking-widest uppercase mt-1">Days {(phase-1)*10 + 1} TO {phase*10}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(phase === 3 ? CHALLENGE_DATA.filter(d => d.id >= 21) : CHALLENGE_DATA.filter(d => d.phase === phase)).map(day => (
                          <motion.div
                            key={day.id}
                            whileHover={{ scale: 1.02, y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => startDay(day)}
                            className={cn(
                              "relative p-6 rounded-2xl glass transition-all cursor-pointer group hover:border-blue-500/40",
                              completedDays.includes(day.id) 
                                ? "border-emerald-500/30 bg-emerald-500/5 shadow-lg shadow-emerald-500/10" 
                                : "hover:border-blue-500/40"
                            )}
                          >
                            <div className="flex justify-between items-start mb-4">
                              <span className={cn(
                                "text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-tighter",
                                completedDays.includes(day.id) ? "border-emerald-500/50 text-emerald-400" : "border-slate-700 text-slate-500"
                              )}>
                                DAY {day.id < 10 ? `0${day.id}` : day.id}
                              </span>
                              {completedDays.includes(day.id) && (
                                <CheckCircle size={14} className="text-emerald-400" />
                              )}
                            </div>
                            <h4 className={cn(
                              "font-medium text-sm leading-tight text-app-text group-hover:text-blue-400 transition-colors uppercase tracking-wide",
                            )}>
                              {day.title}
                            </h4>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {view === 'day-detail' && selectedDay && (
            <motion.div
              key="day-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-4 space-y-6">
                <button 
                  onClick={() => setView('dashboard')}
                  className="flex items-center space-x-2 text-slate-500 hover:text-blue-400 transition-colors text-xs font-bold uppercase tracking-widest mb-4"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Library</span>
                </button>

                <div className="glass rounded-3xl p-8 space-y-8 border-white/5">
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[10px] font-bold tracking-widest mb-4 uppercase">
                      Day {selectedDay.id} Challenge
                    </span>
                    <h2 className="text-4xl font-light text-app-heading tracking-tight leading-tight">{selectedDay.title}</h2>
                    <p className="mt-4 text-app-muted text-sm leading-relaxed font-light">{selectedDay.description}</p>
                  </div>

                  <div className="space-y-6 pt-4">
                    <h3 className="flex items-center space-x-2 font-bold text-app-muted text-[10px] uppercase tracking-[0.2em]">
                      <BookOpen size={14} className="text-blue-400" />
                      <span>Lexical Vocabulary</span>
                    </h3>
                    <div className="space-y-3">
                      {selectedDay.keywords.map((k, i) => {
                        const cacheKey = `${learnerLanguage}_${selectedDay.id}`;
                        const translatedWord = translatedKeywordsMap[cacheKey]?.[i] || k.vietnamese;
                        
                        return (
                          <div key={i} className="p-4 rounded-2xl item-card group hover:border-blue-500/20 transition-all">
                            <p className="font-medium text-app-heading flex items-center justify-between">
                              {k.word}
                              <span className={cn(
                                "text-[10px] bg-blue-500/10 px-2 py-0.5 rounded text-blue-400 font-medium",
                                loadingKeywords && learnerLanguage !== "Vietnamese" && "animate-pulse"
                              )}>
                                {learnerLanguage === 'Vietnamese' ? k.vietnamese : translatedWord}
                              </span>
                            </p>
                            <p className="text-xs text-app-muted mt-2 font-light italic leading-relaxed group-hover:text-app-text transition-colors">
                              "{k.example}"
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-8">
                {selectedDay.questions.length > 0 ? (
                  <div className="space-y-6">
                    <div className="flex space-x-2">
                      {selectedDay.questions.map((_, i) => (
                        <button 
                          key={i} 
                          onClick={() => {
                            setCurrentQuestionIndex(i);
                            setUserAnswer('');
                            setFeedback(null);
                          }}
                          className={cn(
                            "h-1 flex-1 rounded-full transition-all cursor-pointer hover:bg-blue-400/50", 
                            i === currentQuestionIndex ? "bg-blue-500 glow-blue" : 
                            i < currentQuestionIndex ? "bg-blue-800" : "bg-slate-800"
                          )} 
                        />
                      ))}
                    </div>

                    <div className="glass rounded-[2.5rem] p-12 relative overflow-hidden text-center border-white/10 shadow-2xl">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                      
                      <div className="relative space-y-8">
                        <header>
                          <div className="flex items-center justify-between max-w-xs mx-auto mb-4">
                            <button 
                              disabled={currentQuestionIndex === 0}
                              onClick={() => {
                                setCurrentQuestionIndex(prev => prev - 1);
                                setUserAnswer('');
                                setFeedback(null);
                              }}
                              className="p-1 text-slate-500 hover:text-blue-400 disabled:opacity-10 transition-colors"
                            >
                              <ChevronLeft size={20} />
                            </button>
                            <span className="text-blue-400 font-bold text-[10px] tracking-[0.3em] uppercase font-mono">Current Task</span>
                            <button 
                              disabled={currentQuestionIndex === selectedDay.questions.length - 1}
                              onClick={() => {
                                setCurrentQuestionIndex(prev => prev + 1);
                                setUserAnswer('');
                                setFeedback(null);
                              }}
                              className="p-1 text-slate-500 hover:text-blue-400 disabled:opacity-10 transition-colors"
                            >
                              <ChevronRight size={20} />
                            </button>
                          </div>
                          <h3 className="text-4xl font-light text-app-heading tracking-tight leading-snug max-w-2xl mx-auto">
                            {selectedDay.questions[currentQuestionIndex].text}
                          </h3>
                        </header>

                        <div className="flex flex-wrap justify-center gap-3">
                          {selectedDay.questions[currentQuestionIndex].tips.map((tip, i) => (
                            <span key={i} className="px-5 py-2 bg-white/5 rounded-full text-xs font-medium border border-white/5 text-slate-400">
                              {tip}
                            </span>
                          ))}
                        </div>

                        <div className="pt-8 border-t border-white/5 max-w-sm mx-auto">
                          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-3 font-mono opacity-50">Recommended Structure</p>
                          <p className="text-xl font-light italic text-blue-100/70">
                            {selectedDay.questions[currentQuestionIndex].structure}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Speech Studio */}
                    <div className="glass rounded-[2.5rem] p-10 space-y-8 border-white/5 shadow-xl relative overflow-hidden">
                      {isRecording && (
                        <div className="absolute top-8 right-10 flex items-center gap-2">
                           <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                           <span className="text-[10px] font-mono text-rose-500 font-bold tracking-widest uppercase">Recording Active</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pb-6 border-b border-white/5">
                        <h4 className="font-bold text-xs uppercase tracking-[0.3em] text-slate-500">Speaking Studio</h4>
                        <div className="flex space-x-2">
                          <button onClick={resetPractice} className="p-2 hover:bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all">
                            <RotateCcw size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-center space-y-8">
                        {isRecording ? (
                          <div className="flex items-end justify-center gap-2 h-24 w-full">
                            {[1,2,3,4,5,6,7,8,7,6,5,4,3,2,1].map((n, i) => (
                              <motion.div 
                                key={i}
                                className="waveform-bar glow-blue"
                                animate={{ height: [`${20 + Math.random()*40}%`, `${40 + Math.random()*60}%`, `${20 + Math.random()*40}%`] }}
                                transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.05 }}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="w-full">
                            <textarea
                              value={userAnswer}
                              onChange={(e) => setUserAnswer(e.target.value)}
                              placeholder="Your response will appear here..."
                              className="w-full bg-slate-900/40 border border-white/5 rounded-3xl p-8 text-xl text-app-text font-light focus:ring-1 focus:ring-blue-500/30 focus:outline-none placeholder:text-app-muted/50 min-h-[200px] transition-all"
                            />
                          </div>
                        )}

                        <div className="relative flex items-center justify-center pt-4">
                          <AnimatePresence>
                            {isRecording && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1.2 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute w-24 h-24 pulse-ring animate-ping opacity-60" 
                              />
                            )}
                          </AnimatePresence>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleRecording}
                            className={cn(
                              "w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all z-10",
                              isRecording ? "bg-rose-500 text-white glow-rose-500" : "bg-blue-600 text-white hover:bg-blue-700 glow-blue"
                            )}
                          >
                            {isRecording ? <MicOff size={28} /> : <Mic size={28} />}
                          </motion.button>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
                        <div className="flex items-center space-x-3 text-slate-500">
                           <CheckCircle size={16} className="text-blue-500" />
                           <p className="text-[10px] font-bold uppercase tracking-widest">AI Analysis Ready</p>
                        </div>
                        <button
                          disabled={(!userAnswer && !audioBase64) || loadingFeedback}
                          onClick={handleFeedback}
                          className="w-full md:w-auto flex items-center justify-center space-x-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed glow-blue transition-all group"
                        >
                          {loadingFeedback ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: 'linear' }}>
                              <Sparkles size={18} />
                            </motion.div>
                          ) : <Sparkles size={18} className="group-hover:scale-125 transition-transform" />}
                          <span>{loadingFeedback ? "Evaluating..." : "Generate AI Analysis"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Reference Answers - Moved below Speech Studio */}
                    {selectedDay.questions[currentQuestionIndex].examples && (
                      <div className="glass rounded-[2.5rem] p-10 space-y-6 border-white/5 shadow-xl">
                         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                           <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-app-muted">Reference Answers</h4>
                           <div className="flex bg-slate-900/60 p-1 rounded-2xl border border-white/5 self-start">
                             {[6, 7, 8].map(band => (
                               <button
                                 key={band}
                                 onClick={() => setSelectedBand(band as 6 | 7 | 8)}
                                 className={cn(
                                   "px-4 py-2 rounded-xl text-[10px] font-bold transition-all uppercase tracking-widest",
                                   selectedBand === band 
                                     ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                                     : "text-slate-500 hover:text-slate-300"
                                 )}
                               >
                                 Band {band}.0+
                               </button>
                             ))}
                           </div>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-left">
                            {((selectedDay.questions[currentQuestionIndex].examples as any)[selectedBand] || []).map((ex: string, i: number) => (
                              <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/20 transition-all group">
                                <div className="flex justify-between items-start mb-2">
                                  <span className="block text-[10px] font-mono text-blue-500 opacity-50 uppercase tracking-tighter">Sample 0{i+1}</span>
                                  <button 
                                    onClick={() => handleShowExplanation(ex, i)}
                                    className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest flex items-center space-x-2 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20"
                                  >
                                    <Sparkles size={12} />
                                    <span>{explainingIndex === i ? "Hide Explanation" : "Explanation"}</span>
                                  </button>
                                </div>
                                
                                <p className="text-sm text-app-text leading-relaxed italic">"{ex}"</p>
                                
                                <AnimatePresence>
                                  {explainingIndex === i && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="mt-6 pt-6 border-t border-white/10 text-xs text-slate-400 space-y-4">
                                        <div className="flex items-center space-x-2 text-blue-400 font-bold uppercase tracking-widest text-[9px]">
                                          <Sparkles size={10} />
                                          <span>Band {selectedBand}.0+ Analysis</span>
                                        </div>
                                        {loadingExplanation && explainingIndex === i && !explanationMap[`${learnerLanguage}_${ex}`] ? (
                                          <div className="flex items-center space-x-2 py-4">
                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: 'linear' }}>
                                              <RotateCcw size={14} className="text-blue-500" />
                                            </motion.div>
                                            <span className="animate-pulse">Analyzing linguistic structures...</span>
                                          </div>
                                        ) : (
                                          <div className="prose prose-invert prose-sm max-w-none prose-slate">
                                            <div className="whitespace-pre-wrap leading-relaxed font-light">
                                              {explanationMap[`${learnerLanguage}_${ex}`]}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>

                                <button 
                                  onClick={() => {
                                    setUserAnswer(ex);
                                    window.scrollTo({ top: 300, behavior: 'smooth' }); // Scroll back up to studio
                                  }}
                                  className="mt-6 text-[10px] font-bold text-slate-500 hover:text-blue-400 transition-colors uppercase tracking-widest flex items-center space-x-1"
                                >
                                  <span>Use as base for practice</span>
                                </button>
                              </div>
                            ))}
                         </div>
                      </div>
                    )}

                    <AnimatePresence>
                      {feedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="glass rounded-[2.5rem] p-12 space-y-12 relative overflow-hidden border-blue-500/20 shadow-2xl"
                        >
                          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-bl-[6rem]" />
                          
                          <header className="flex items-center justify-between relative">
                            <div>
                              <span className="text-blue-400 font-bold text-[10px] tracking-[0.3em] mb-2 block uppercase font-mono">Session Report</span>
                              <h3 className="text-3xl font-light text-app-heading">Coach Feedback</h3>
                            </div>
                            <div className="text-right">
                              <span className="text-7xl font-black text-blue-500 italic leading-none glow-blue inline-block">{feedback.score}</span>
                              <span className="text-app-muted font-bold ml-2 text-xl tracking-tighter">/ 9.0</span>
                            </div>
                          </header>

                          <div className="grid md:grid-cols-3 gap-8 relative">
                            <div className="space-y-4">
                              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                <span>Fluency</span>
                                <span className="text-blue-400">85%</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                                <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-blue-500 glow-blue" />
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed font-light">{feedback.fluencyFeedback}</p>
                            </div>
                             <div className="space-y-4">
                              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                <span>Vocabulary</span>
                                <span className="text-blue-400">72%</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                                <motion.div initial={{ width: 0 }} animate={{ width: '72%' }} className="h-full bg-blue-400" />
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed font-light">{feedback.vocabularyFeedback}</p>
                            </div>
                             <div className="space-y-4">
                              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                <span>Structure</span>
                                <span className="text-blue-400">90%</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                                <motion.div initial={{ width: 0 }} animate={{ width: '90%' }} className="h-full bg-emerald-500 glow-emerald" />
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed font-light">{feedback.structureFeedback}</p>
                            </div>
                          </div>

                          {feedback.userTranscript && (
                            <div className="bg-white/5 rounded-3xl p-10 space-y-4 border border-white/5">
                              <h5 className="font-bold text-[10px] uppercase tracking-widest flex items-center space-x-2 text-slate-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span>Your Actual Response (Analysed)</span>
                              </h5>
                              <p className="text-xl font-light text-app-text leading-relaxed italic">
                                "{feedback.userTranscript}"
                              </p>
                            </div>
                          )}

                          <div className="item-card rounded-3xl p-10 space-y-6">
                            <h5 className="font-bold text-[10px] uppercase tracking-widest flex items-center space-x-2 text-blue-400">
                              <Sparkles size={14} />
                              <span>Model Answer Analysis</span>
                            </h5>
                            <p className="text-2xl font-light font-serif italic text-app-heading leading-relaxed">
                              {feedback.sampleAnswer}
                            </p>
                          </div>

                          <div className="flex items-center space-x-6 bg-blue-500/5 rounded-[2rem] p-8 border border-blue-500/10">
                            <Languages size={40} className="text-blue-400 opacity-40 flex-shrink-0" />
                            <div className="space-y-1">
                               <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Vietnam Expert Tip</p>
                               <p className="text-lg text-app-text font-light">{feedback.vietnameseTips}</p>
                            </div>
                          </div>

                          <div className="pt-6 flex justify-end">
                            {currentQuestionIndex < selectedDay.questions.length - 1 ? (
                              <button 
                                onClick={() => {
                                  setCurrentQuestionIndex(prev => prev + 1);
                                  setUserAnswer('');
                                  setFeedback(null);
                                }}
                                className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black hover:bg-slate-200 transition-all flex items-center space-x-3 shadow-xl"
                              >
                                <span>Next Strategy</span>
                                <ChevronRight size={18} />
                              </button>
                            ) : (
                              <button 
                                onClick={() => setView('dashboard')}
                                className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 glow-blue transition-all uppercase tracking-widest text-xs"
                              >
                                Finish Day {selectedDay.id} Challenge
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-8 pt-32">
                    <div className="w-32 h-32 glass rounded-full flex items-center justify-center text-slate-700 border-white/5">
                      <LayoutDashboard size={48} />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-3xl font-light text-slate-400">Chapter Locked</h3>
                      <p className="text-slate-600 max-w-sm mx-auto font-light leading-relaxed">
                        Complete foundations before unlocking advanced critical analysis materials. Focus on consistency first.
                      </p>
                    </div>
                    <button onClick={() => setView('dashboard')} className="px-8 py-4 glass border-white/10 rounded-2xl font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                      Review Progress
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 mt-20 border-t border-app-item-border px-8 flex flex-col md:flex-row items-center justify-between text-app-muted gap-6">
        <div className="flex items-center space-x-4">
           <span className="text-xs font-mono">VERSION 2.4.0</span>
           <span className="opacity-20">|</span>
           <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500/50">Immersive Engine v2</span>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30">© 2026 IELTS Challenge • Nguyen Huyen Official</p>
      </footer>
    </div>
  );
}
