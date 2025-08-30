import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingSpinner, UniverseLoading } from './components/LoadingSpinner';
import { useTaskManager } from './hooks/useTaskManager';

// Lazy load components for better performance
const TodoList = React.lazy(() => import('./components/TodoList'));
const ProductivityEngine = React.lazy(() => import('./components/ProductivityEngine'));
const AstrologyMode = React.lazy(() => import('./components/AstrologyMode'));
const Gamification = React.lazy(() => import('./components/Gamification'));
const MotivationButton = React.lazy(() => import('./components/MotivationButton'));

function App() {
  const {
    tasks,
    isLoading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    generateExcuse,
    clearCompletedTasks,
    clearAllTasks,
    setError
  } = useTaskManager();

  const [dailyFortune, setDailyFortune] = useState<string>('');
  const [showUniverse, setShowUniverse] = useState(false);

  const fortunes = [
    "Today you'll procrastinate efficiently.",
    "You will debug reality itself.",
    "The universe approves of your coffee consumption.",
    "Your code will compile on the first try (probably not).",
    "Today is a good day to question everything.",
    "The bugs fear you today.",
    "Your productivity will reach quantum levels.",
    "Reality is just a state of mind (and bugs).",
    "Today you'll achieve the impossible (or at least try).",
    "The cosmic forces align with your debugging skills.",
    "Your quantum entanglement with productivity is strong today.",
    "The multiverse has chosen you for greatness.",
    "Your procrastination will be perfectly balanced.",
    "The cosmic rays will enhance your coding abilities.",
    "Today is a superposition of success and coffee."
  ];

  useEffect(() => {
    // Generate daily fortune
    const today = new Date().toDateString();
    const fortuneIndex = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % fortunes.length;
    setDailyFortune(fortunes[fortuneIndex]);
  }, [fortunes]);

  const handleAddTask = async (text: string) => {
    await addTask(text);
  };

  const handleToggleTask = async (id: number) => {
    await toggleTask(id);
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
  };

  const handleGenerateExcuse = async (task: any) => {
    await generateExcuse(task);
  };

  if (isLoading && tasks.length === 0) {
    return <UniverseLoading />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        {/* Universe Consultation Overlay */}
        <AnimatePresence>
          {showUniverse && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
              onClick={() => setShowUniverse(false)}
            >
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="text-center"
              >
                <div className="text-6xl mb-4">🌌</div>
                <div className="text-2xl font-bold mb-2">Consulting the Universe...</div>
                <div className="text-lg text-purple-300">Please wait while we calculate the meaning of life</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent mb-4">
              Quantum Todo
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Where productivity meets quantum physics and cosmic humor
            </p>
            
            {/* Daily Fortune */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-2xl shadow-2xl"
            >
              <div className="text-sm text-purple-200 mb-1">🔮 Daily Fortune</div>
              <div className="text-lg font-semibold">{dailyFortune}</div>
            </motion.div>
          </motion.div>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 mb-6 text-center"
            >
              <div className="text-red-200 mb-2">⚠️ {error}</div>
              <button
                onClick={() => setError(null)}
                className="text-red-300 hover:text-red-200 text-sm underline"
              >
                Dismiss
              </button>
            </motion.div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Todo List */}
            <div className="lg:col-span-2">
              <Suspense fallback={<LoadingSpinner text="Loading task manager..." />}>
                <TodoList
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                  onGenerateExcuse={handleGenerateExcuse}
                  onClearCompleted={clearCompletedTasks}
                  onClearAll={clearAllTasks}
                  isLoading={isLoading}
                />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Suspense fallback={<LoadingSpinner text="Loading productivity engine..." />}>
                <ProductivityEngine tasks={tasks} />
              </Suspense>
              
              <Suspense fallback={<LoadingSpinner text="Loading astrology mode..." />}>
                <AstrologyMode tasks={tasks} />
              </Suspense>
              
              <Suspense fallback={<LoadingSpinner text="Loading gamification..." />}>
                <Gamification tasks={tasks} />
              </Suspense>
              
              <Suspense fallback={<LoadingSpinner text="Loading motivation..." />}>
                <MotivationButton />
              </Suspense>
            </div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-center mt-16 text-gray-400"
          >
            <p>Built with quantum entanglement and copious amounts of coffee ☕</p>
            <button
              onClick={() => setShowUniverse(true)}
              className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
            >
              🌌 Consult the Universe
            </button>
          </motion.div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
