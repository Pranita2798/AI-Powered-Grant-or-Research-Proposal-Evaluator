import React, { useState } from 'react';
import { FileText, Brain, TrendingUp, Target, History, Download, Search, Filter } from 'lucide-react';
import ProposalInput from './components/ProposalInput';
import EvaluationResults from './components/EvaluationResults';
import ProposalHistory from './components/ProposalHistory';
import { EvaluationResult, Proposal } from './types';
import { evaluateProposal } from './utils/evaluationEngine';

function App() {
  const [currentProposal, setCurrentProposal] = useState<string>('');
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
  const [proposalHistory, setProposalHistory] = useState<Proposal[]>([]);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [activeTab, setActiveTab] = useState<'evaluate' | 'history'>('evaluate');

  const handleEvaluate = async () => {
    if (!currentProposal.trim()) return;
    
    setIsEvaluating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = evaluateProposal(currentProposal);
    setEvaluationResult(result);
    
    // Add to history
    const newProposal: Proposal = {
      id: Date.now().toString(),
      title: result.title,
      content: currentProposal,
      evaluation: result,
      submittedAt: new Date(),
    };
    
    setProposalHistory(prev => [newProposal, ...prev]);
    setIsEvaluating(false);
  };

  const handleClearProposal = () => {
    setCurrentProposal('');
    setEvaluationResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Research Proposal Evaluator</h1>
                <p className="text-sm text-gray-600">AI-Powered Grant Assessment Tool</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('evaluate')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'evaluate'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FileText className="h-4 w-4 inline mr-2" />
                  Evaluate
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'history'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <History className="h-4 w-4 inline mr-2" />
                  History ({proposalHistory.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'evaluate' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <ProposalInput
                value={currentProposal}
                onChange={setCurrentProposal}
                onEvaluate={handleEvaluate}
                onClear={handleClearProposal}
                isEvaluating={isEvaluating}
              />
              
              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Evaluation Metrics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="p-3 bg-blue-100 rounded-lg inline-block mb-2">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">Novelty</p>
                    <p className="text-xs text-gray-500">Innovation & Originality</p>
                  </div>
                  <div className="text-center">
                    <div className="p-3 bg-green-100 rounded-lg inline-block mb-2">
                      <Target className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600">Impact</p>
                    <p className="text-xs text-gray-500">Potential Significance</p>
                  </div>
                  <div className="text-center">
                    <div className="p-3 bg-orange-100 rounded-lg inline-block mb-2">
                      <Search className="h-6 w-6 text-orange-600" />
                    </div>
                    <p className="text-sm text-gray-600">Feasibility</p>
                    <p className="text-xs text-gray-500">Implementation Viability</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <EvaluationResults
                result={evaluationResult}
                isEvaluating={isEvaluating}
              />
            </div>
          </div>
        ) : (
          <ProposalHistory
            proposals={proposalHistory}
            onSelectProposal={(proposal) => {
              setCurrentProposal(proposal.content);
              setEvaluationResult(proposal.evaluation);
              setActiveTab('evaluate');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              AI-Powered Research Proposal Evaluator • Built with advanced NLP algorithms
            </p>
            <p className="text-xs mt-2">
              Analyze proposals based on novelty, impact, and feasibility metrics
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;