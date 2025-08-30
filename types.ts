export interface Task {
  id: number;
  text: string;
  completed: boolean;
  lifeMeaningScore: number;
  quantumState: 'superposition' | 'collapsed' | 'entangled';
  excuses: string[];
  createdAt: Date;
}

export interface ProductivityData {
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  averageLifeScore: number;
  quantumEfficiency: number;
  procrastinationLevel: 'Low' | 'Medium' | 'High' | 'Quantum';
}

export interface AstrologyData {
  mercuryRetrograde: boolean;
  moonPhase: 'New' | 'Waxing Crescent' | 'First Quarter' | 'Waxing Gibbous' | 'Full' | 'Waning Gibbous' | 'Last Quarter' | 'Waning Crescent';
  productivityAlignment: number;
  cosmicInterference: string[];
  luckyColor: string;
  luckyNumber: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
  points: number;
}

export interface Level {
  current: number;
  title: string;
  nextLevelPoints: number;
  currentPoints: number;
  totalPoints: number;
}
