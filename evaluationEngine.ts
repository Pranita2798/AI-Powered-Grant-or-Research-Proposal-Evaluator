import { EvaluationResult } from '../types';

// Simulated AI evaluation engine
export const evaluateProposal = (proposalText: string): EvaluationResult => {
  // Extract basic information
  const wordCount = proposalText.trim().split(/\s+/).length;
  const sentences = proposalText.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const paragraphs = proposalText.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  
  // Simulate AI analysis with realistic scoring
  const complexityScore = Math.min(10, Math.max(1, (wordCount / 100) * 2));
  const structureScore = Math.min(10, Math.max(1, paragraphs.length * 1.5));
  const detailScore = Math.min(10, Math.max(1, sentences.length / 10));
  
  // Generate realistic scores based on content analysis
  const noveltyScore = Math.min(10, Math.max(1, 
    (checkForKeywords(proposalText, ['innovative', 'novel', 'breakthrough', 'unique', 'unprecedented']) * 2) +
    (complexityScore * 0.6) +
    (Math.random() * 2)
  ));
  
  const impactScore = Math.min(10, Math.max(1,
    (checkForKeywords(proposalText, ['significant', 'important', 'crucial', 'transformative', 'impact']) * 2) +
    (checkForKeywords(proposalText, ['society', 'community', 'global', 'healthcare', 'environment']) * 1.5) +
    (Math.random() * 2)
  ));
  
  const feasibilityScore = Math.min(10, Math.max(1,
    (checkForKeywords(proposalText, ['methodology', 'approach', 'timeline', 'resources', 'budget']) * 2) +
    (structureScore * 0.7) +
    (Math.random() * 2)
  ));
  
  const overallScore = (noveltyScore + impactScore + feasibilityScore) / 3;
  
  // Generate title from first sentence or use default
  const title = sentences[0]?.trim().slice(0, 100) || 'Research Proposal Analysis';
  
  // Determine category
  let category: EvaluationResult['category'];
  if (overallScore >= 8) category = 'Highly Recommended';
  else if (overallScore >= 6) category = 'Recommended';
  else if (overallScore >= 4) category = 'Conditional';
  else category = 'Not Recommended';
  
  // Generate field classification
  const researchField = classifyResearchField(proposalText);
  
  // Generate keywords
  const keywords = extractKeywords(proposalText);
  
  // Generate duration estimate
  const estimatedDuration = estimateProjectDuration(proposalText);
  
  // Calculate funding potential
  const fundingPotential = Math.min(95, Math.max(5, Math.round(overallScore * 10 + Math.random() * 15)));
  
  // Determine risk level
  const riskLevel = overallScore >= 7 ? 'Low' : overallScore >= 5 ? 'Medium' : 'High';
  
  return {
    title,
    overallScore,
    novelty: {
      score: noveltyScore,
      reasoning: generateReasoning('novelty', noveltyScore, proposalText),
      strengths: generateStrengths('novelty', noveltyScore),
      weaknesses: generateWeaknesses('novelty', noveltyScore),
    },
    impact: {
      score: impactScore,
      reasoning: generateReasoning('impact', impactScore, proposalText),
      strengths: generateStrengths('impact', impactScore),
      weaknesses: generateWeaknesses('impact', impactScore),
    },
    feasibility: {
      score: feasibilityScore,
      reasoning: generateReasoning('feasibility', feasibilityScore, proposalText),
      strengths: generateStrengths('feasibility', feasibilityScore),
      weaknesses: generateWeaknesses('feasibility', feasibilityScore),
    },
    recommendations: generateRecommendations(overallScore, noveltyScore, impactScore, feasibilityScore),
    category,
    fundingPotential,
    keywords,
    researchField,
    estimatedDuration,
    riskLevel,
  };
};

const checkForKeywords = (text: string, keywords: string[]): number => {
  const lowerText = text.toLowerCase();
  return keywords.reduce((count, keyword) => {
    const matches = (lowerText.match(new RegExp(keyword, 'g')) || []).length;
    return count + matches;
  }, 0);
};

const classifyResearchField = (text: string): string => {
  const fields = {
    'Computer Science': ['algorithm', 'software', 'programming', 'artificial intelligence', 'machine learning', 'data'],
    'Medicine': ['medical', 'health', 'disease', 'patient', 'clinical', 'therapeutic'],
    'Engineering': ['design', 'system', 'technical', 'engineering', 'mechanical', 'electrical'],
    'Biology': ['biological', 'organism', 'gene', 'cell', 'molecular', 'evolution'],
    'Physics': ['physics', 'quantum', 'particle', 'energy', 'matter', 'force'],
    'Social Sciences': ['social', 'society', 'behavior', 'psychological', 'cultural', 'economic'],
    'Environmental Science': ['environment', 'climate', 'sustainability', 'ecological', 'conservation'],
    'Mathematics': ['mathematical', 'equation', 'theorem', 'calculation', 'statistical'],
  };
  
  const lowerText = text.toLowerCase();
  let bestField = 'Interdisciplinary';
  let maxScore = 0;
  
  for (const [field, keywords] of Object.entries(fields)) {
    const score = checkForKeywords(lowerText, keywords);
    if (score > maxScore) {
      maxScore = score;
      bestField = field;
    }
  }
  
  return bestField;
};

const extractKeywords = (text: string): string[] => {
  const commonKeywords = [
    'research', 'analysis', 'study', 'investigation', 'methodology', 'approach',
    'innovation', 'development', 'improvement', 'optimization', 'evaluation',
    'framework', 'model', 'system', 'process', 'technique', 'algorithm',
    'data', 'results', 'outcomes', 'findings', 'implications', 'applications'
  ];
  
  const lowerText = text.toLowerCase();
  const foundKeywords = commonKeywords.filter(keyword => 
    lowerText.includes(keyword)
  );
  
  // Add some field-specific keywords based on content
  const fieldKeywords = [];
  if (lowerText.includes('ai') || lowerText.includes('machine learning')) {
    fieldKeywords.push('AI', 'ML');
  }
  if (lowerText.includes('quantum')) {
    fieldKeywords.push('quantum computing');
  }
  if (lowerText.includes('sustainable')) {
    fieldKeywords.push('sustainability');
  }
  
  return [...foundKeywords.slice(0, 5), ...fieldKeywords].slice(0, 8);
};

const estimateProjectDuration = (text: string): string => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('longitudinal') || lowerText.includes('long-term')) {
    return '3-5 years';
  } else if (lowerText.includes('pilot') || lowerText.includes('preliminary')) {
    return '6-12 months';
  } else if (lowerText.includes('comprehensive') || lowerText.includes('extensive')) {
    return '2-3 years';
  } else {
    return '1-2 years';
  }
};

const generateReasoning = (aspect: string, score: number, text: string): string => {
  const reasonings = {
    novelty: {
      high: 'The proposal demonstrates significant innovation with unique approaches and methodologies.',
      medium: 'The proposal shows some innovative elements but builds largely on existing work.',
      low: 'The proposal lacks clear innovative aspects and appears to replicate existing research.'
    },
    impact: {
      high: 'The proposed research addresses critical issues with potential for significant societal impact.',
      medium: 'The research addresses important questions with moderate potential for impact.',
      low: 'The research impact appears limited with unclear broader implications.'
    },
    feasibility: {
      high: 'The proposal presents a well-structured methodology with clear implementation pathway.',
      medium: 'The proposal shows reasonable feasibility but some aspects need further clarification.',
      low: 'The proposal faces significant feasibility challenges that need to be addressed.'
    }
  };
  
  const level = score >= 7 ? 'high' : score >= 5 ? 'medium' : 'low';
  return reasonings[aspect as keyof typeof reasonings][level];
};

const generateStrengths = (aspect: string, score: number): string[] => {
  const strengths = {
    novelty: {
      high: ['Unique theoretical framework', 'Innovative methodology', 'Original research questions'],
      medium: ['Some novel approaches', 'Creative problem-solving', 'Interesting perspectives'],
      low: ['Clear research focus', 'Well-defined objectives']
    },
    impact: {
      high: ['Addresses critical societal needs', 'Potential for wide application', 'Significant theoretical contribution'],
      medium: ['Relevant to current challenges', 'Practical applications', 'Contribution to field knowledge'],
      low: ['Clear research objectives', 'Defined target outcomes']
    },
    feasibility: {
      high: ['Well-structured methodology', 'Realistic timeline', 'Adequate resource planning'],
      medium: ['Reasonable approach', 'Identifiable milestones', 'Basic resource consideration'],
      low: ['Clear research plan', 'Defined methodology']
    }
  };
  
  const level = score >= 7 ? 'high' : score >= 5 ? 'medium' : 'low';
  return strengths[aspect as keyof typeof strengths][level];
};

const generateWeaknesses = (aspect: string, score: number): string[] => {
  if (score >= 7) return [];
  
  const weaknesses = {
    novelty: {
      medium: ['Limited theoretical innovation', 'Some overlap with existing work'],
      low: ['Lacks clear innovation', 'Replication of existing research', 'Limited original contribution']
    },
    impact: {
      medium: ['Narrow scope of impact', 'Limited broader implications'],
      low: ['Unclear practical applications', 'Limited societal relevance', 'Minimal contribution to field']
    },
    feasibility: {
      medium: ['Some methodological concerns', 'Timeline needs refinement'],
      low: ['Significant implementation challenges', 'Unclear methodology', 'Inadequate resource planning']
    }
  };
  
  const level = score >= 5 ? 'medium' : 'low';
  return weaknesses[aspect as keyof typeof weaknesses][level];
};

const generateRecommendations = (
  overall: number,
  novelty: number,
  impact: number,
  feasibility: number
): string[] => {
  const recommendations = [];
  
  if (novelty < 6) {
    recommendations.push('Consider strengthening the innovative aspects by exploring unique methodological approaches or theoretical frameworks.');
  }
  
  if (impact < 6) {
    recommendations.push('Expand the discussion of potential applications and broader implications of the research outcomes.');
  }
  
  if (feasibility < 6) {
    recommendations.push('Provide more detailed methodology and implementation timeline with clear milestones and resource requirements.');
  }
  
  if (overall >= 7) {
    recommendations.push('Excellent proposal! Consider adding risk mitigation strategies and potential collaboration opportunities.');
  } else if (overall >= 5) {
    recommendations.push('Good foundation. Focus on addressing the identified weaknesses to strengthen the proposal.');
  } else {
    recommendations.push('Significant revision needed. Consider restructuring the proposal to better highlight innovation and impact.');
  }
  
  recommendations.push('Include more specific details about expected outcomes and success metrics.');
  
  return recommendations;
};