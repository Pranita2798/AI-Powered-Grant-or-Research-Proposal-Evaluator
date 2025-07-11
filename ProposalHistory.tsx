import React from 'react';
import { Clock, TrendingUp, Target, Search, FileText, Trash2 } from 'lucide-react';
import { Proposal } from '../types';

interface ProposalHistoryProps {
  proposals: Proposal[];
  onSelectProposal: (proposal: Proposal) => void;
}

const ProposalHistory: React.FC<ProposalHistoryProps> = ({ proposals, onSelectProposal }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

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

  if (proposals.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="p-4 bg-gray-100 rounded-full inline-block mb-4">
          <FileText className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Proposals Yet</h3>
        <p className="text-gray-600 mb-6">
          Start by evaluating your first research proposal to see it appear in your history
        </p>
        <button 
          onClick={() => {/* Switch to evaluate tab */}}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          Evaluate First Proposal
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Proposal History</h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>{proposals.length} proposals evaluated</span>
            <button className="text-blue-600 hover:text-blue-800">
              Export All
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              onClick={() => onSelectProposal(proposal)}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {proposal.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(proposal.evaluation.category)}`}>
                      {proposal.evaluation.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(proposal.submittedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="h-4 w-4" />
                      <span>{proposal.evaluation.researchField}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Novelty: {proposal.evaluation.novelty.score.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Impact: {proposal.evaluation.impact.score.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Feasibility: {proposal.evaluation.feasibility.score.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(proposal.evaluation.overallScore)}`}>
                      {proposal.evaluation.overallScore.toFixed(1)}
                    </div>
                    <div className="text-xs text-gray-500">Overall</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-indigo-600">
                      {proposal.evaluation.fundingPotential}%
                    </div>
                    <div className="text-xs text-gray-500">Funding</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProposalHistory;