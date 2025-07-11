import React from 'react';
import { TrendingUp, Target, Search, Award, AlertTriangle, CheckCircle, Download, Share2 } from 'lucide-react';
import { EvaluationResult } from '../types';

interface EvaluationResultsProps {
  result: EvaluationResult | null;
  isEvaluating: boolean;
}

const EvaluationResults: React.FC<EvaluationResultsProps> = ({ result, isEvaluating }) => {
  if (isEvaluating) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center space-x-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Analyzing Proposal...</h3>
            <p className="text-gray-600">Our AI is evaluating your research proposal</p>
          </div>
        </div>
        
        <div className="mt-8 space-y-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="p-4 bg-gray-100 rounded-full inline-block mb-4">
          <Search className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Evaluate</h3>
        <p className="text-gray-600">
          Enter your research proposal and click "Evaluate Proposal" to get AI-powered insights
        </p>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-blue-600 bg-blue-100';
    if (score >= 4) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Highly Recommended': return 'bg-green-100 text-green-800';
      case 'Recommended': return 'bg-blue-100 text-blue-800';
      case 'Conditional': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">{result.title}</h3>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(result.overallScore)}`}>
              {result.overallScore.toFixed(1)}
            </div>
            <p className="text-sm text-gray-600">Overall Score</p>
          </div>
          <div className="text-center">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(result.category)}`}>
              {result.category}
            </div>
            <p className="text-sm text-gray-600 mt-1">Recommendation</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {result.fundingPotential}%
            </div>
            <p className="text-sm text-gray-600">Funding Potential</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Research Field:</span>
            <span className="ml-2 text-gray-600">{result.researchField}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Estimated Duration:</span>
            <span className="ml-2 text-gray-600">{result.estimatedDuration}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Risk Level:</span>
            <span className={`ml-2 px-2 py-1 rounded text-xs ${
              result.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
              result.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {result.riskLevel}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Keywords:</span>
            <div className="mt-1 flex flex-wrap gap-1">
              {result.keywords.map((keyword, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Novelty */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Novelty</h4>
                <p className="text-sm text-gray-600">Innovation Score</p>
              </div>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(result.novelty.score)}`}>
              {result.novelty.score.toFixed(1)}
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Strengths</h5>
              <ul className="space-y-1">
                {result.novelty.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {result.novelty.weaknesses.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Areas for Improvement</h5>
                <ul className="space-y-1">
                  {result.novelty.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Impact */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Impact</h4>
                <p className="text-sm text-gray-600">Significance Score</p>
              </div>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(result.impact.score)}`}>
              {result.impact.score.toFixed(1)}
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Strengths</h5>
              <ul className="space-y-1">
                {result.impact.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {result.impact.weaknesses.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Areas for Improvement</h5>
                <ul className="space-y-1">
                  {result.impact.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Feasibility */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Search className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Feasibility</h4>
                <p className="text-sm text-gray-600">Viability Score</p>
              </div>
            </div>
            <div className={`text-2xl font-bold ${getScoreColor(result.feasibility.score)}`}>
              {result.feasibility.score.toFixed(1)}
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Strengths</h5>
              <ul className="space-y-1">
                {result.feasibility.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {result.feasibility.weaknesses.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Areas for Improvement</h5>
                <ul className="space-y-1">
                  {result.feasibility.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Award className="h-5 w-5 text-purple-600" />
          </div>
          <h4 className="font-semibold text-gray-900">AI Recommendations</h4>
        </div>
        
        <div className="space-y-3">
          {result.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium">
                {index + 1}
              </div>
              <p className="text-gray-700">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvaluationResults;