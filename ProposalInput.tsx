import React from 'react';
import { Send, Trash2, FileText, Loader2 } from 'lucide-react';

interface ProposalInputProps {
  value: string;
  onChange: (value: string) => void;
  onEvaluate: () => void;
  onClear: () => void;
  isEvaluating: boolean;
}

const ProposalInput: React.FC<ProposalInputProps> = ({
  value,
  onChange,
  onEvaluate,
  onClear,
  isEvaluating,
}) => {
  const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = value.length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Research Proposal</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <FileText className="h-4 w-4" />
            <span>{wordCount} words • {charCount} characters</span>
          </div>
        </div>
        <p className="text-gray-600 mt-2">
          Enter your research proposal text below for AI-powered evaluation
        </p>
      </div>

      <div className="p-6">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your research proposal here... Include details about your research objectives, methodology, expected outcomes, and significance. The more detailed your proposal, the more accurate the evaluation will be."
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm leading-relaxed"
          disabled={isEvaluating}
        />

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              wordCount < 100 ? 'bg-red-400' : 
              wordCount < 300 ? 'bg-yellow-400' : 
              'bg-green-400'
            }`}></div>
            <span className="text-sm text-gray-600">
              {wordCount < 100 ? 'Too short - add more details' : 
               wordCount < 300 ? 'Good length - consider adding more context' : 
               'Excellent length for evaluation'}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClear}
              disabled={isEvaluating || !value.trim()}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="h-4 w-4 inline mr-2" />
              Clear
            </button>
            
            <button
              onClick={onEvaluate}
              disabled={isEvaluating || !value.trim() || wordCount < 50}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="h-4 w-4 inline mr-2 animate-spin" />
                  Evaluating...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 inline mr-2" />
                  Evaluate Proposal
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalInput;