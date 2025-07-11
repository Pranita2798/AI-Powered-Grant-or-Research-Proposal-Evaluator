export interface EvaluationResult {
  title: string;
  overallScore: number;
  novelty: {
    score: number;
    reasoning: string;
    strengths: string[];
    weaknesses: string[];
  };
  impact: {
    score: number;
    reasoning: string;
    strengths: string[];
    weaknesses: string[];
  };
  feasibility: {
    score: number;
    reasoning: string;
    strengths: string[];
    weaknesses: string[];
  };
  recommendations: string[];
  category: 'Highly Recommended' | 'Recommended' | 'Conditional' | 'Not Recommended';
  fundingPotential: number;
  keywords: string[];
  researchField: string;
  estimatedDuration: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface Proposal {
  id: string;
  title: string;
  content: string;
  evaluation: EvaluationResult;
  submittedAt: Date;
}