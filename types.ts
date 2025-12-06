export interface SkillMetric {
  category: string;
  skillName: string;
  currentScore: number; // 0-100
  targetScore: number; // 0-100
  importance: 'Critical' | 'Moderate' | 'Nice-to-have';
  gapDescription: string;
}

export interface LearningResource {
  title: string;
  type: 'Course' | 'Article' | 'Project' | 'Mentorship';
  provider?: string;
  estimatedDuration?: string;
  description: string;
}

export interface Recommendation {
  priority: number;
  skillCategory: string;
  actionItem: string;
  resources: LearningResource[];
}

export interface AnalysisResult {
  overallMatchPercentage: number;
  summary: string;
  skills: SkillMetric[];
  recommendations: Recommendation[];
}

export enum AnalysisStatus {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}