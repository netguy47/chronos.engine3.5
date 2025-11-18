"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface ActiveScenarioCardProps {
  result: {
    id: string;
    status: 'running' | 'completed' | 'error';
    progress: number;
    confidence: number;
    duration: string;
    metrics?: {
      gdpImpact?: string;
      inflationImpact?: string;
      marketVolatility?: string;
    };
    details?: string;
  };
}

export default function ActiveScenarioCard({ result }: ActiveScenarioCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isRunning = result.status === 'running';
  const isError = result.status === 'error';

  return (
    <motion.div 
      className="bg-[#15233F] border border-[#1F2E4A] rounded-2xl p-5 mt-4 shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#D2D6DC] flex items-center gap-2">
            {isRunning ? (
              <>
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                Simulation in Progress
              </>
            ) : isError ? (
              <>
                <AlertCircle className="h-4 w-4 text-red-400" />
                Simulation Error
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Simulation Complete
              </>
            )}
          </h3>
          <p className="text-xs text-[#8A94A6] mt-1">
            {isRunning ? 'Analyzing scenario...' : isError ? 'Failed to complete simulation' : 'Results ready for review'}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {isRunning && (
            <div className="text-xs px-2 py-1 rounded-full bg-amber-400/10 text-amber-300">
              {result.progress}%
            </div>
          )}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#8A94A6] hover:text-[#D2D6DC] p-1 -mr-1"
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 h-1.5 bg-[#0C172E] rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-amber-400 to-emerald-400"
          initial={{ width: '0%' }}
          animate={{ width: `${result.progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <motion.div 
          className="mt-4 pt-4 border-t border-[#1F2E4A]"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-[#0C172E] p-3 rounded-lg border border-[#1F2E4A]">
              <p className="text-xs text-[#8A94A6] mb-1">Confidence</p>
              <div className="flex items-center gap-2">
                <div className="w-full h-2 bg-[#050814] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-emerald-400"
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{result.confidence}%</span>
              </div>
            </div>

            <div className="bg-[#0C172E] p-3 rounded-lg border border-[#1F2E4A]">
              <p className="text-xs text-[#8A94A6] mb-1">Duration</p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#8A94A6]" />
                <span className="text-sm font-medium">{result.duration}</span>
              </div>
            </div>

            <div className="bg-[#0C172E] p-3 rounded-lg border border-[#1F2E4A]">
              <p className="text-xs text-[#8A94A6] mb-1">Scenario ID</p>
              <code className="text-xs font-mono text-[#D2D6DC] bg-[#050814] px-2 py-1 rounded">
                {result.id.slice(0, 8)}...
              </code>
            </div>
          </div>

          {result.metrics && (
            <div className="mt-4">
              <h4 className="text-xs font-medium text-[#8A94A6] mb-2">KEY METRICS</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {result.metrics.gdpImpact && (
                  <div className="bg-[#0C172E] p-3 rounded-lg border border-[#1F2E4A]">
                    <p className="text-xs text-[#8A94A6]">GDP Impact</p>
                    <p className="text-sm font-medium">{result.metrics.gdpImpact}</p>
                  </div>
                )}
                {result.metrics.inflationImpact && (
                  <div className="bg-[#0C172E] p-3 rounded-lg border border-[#1F2E4A]">
                    <p className="text-xs text-[#8A94A6]">Inflation Impact</p>
                    <p className="text-sm font-medium">{result.metrics.inflationImpact}</p>
                  </div>
                )}
                {result.metrics.marketVolatility && (
                  <div className="bg-[#0C172E] p-3 rounded-lg border border-[#1F2E4A]">
                    <p className="text-xs text-[#8A94A6]">Market Volatility</p>
                    <p className="text-sm font-medium">{result.metrics.marketVolatility}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {result.details && (
            <div className="mt-4">
              <h4 className="text-xs font-medium text-[#8A94A6] mb-2">ANALYSIS</h4>
              <div className="bg-[#0C172E] p-3 rounded-lg border border-[#1F2E4A] text-sm text-[#D2D6DC]">
                {result.details}
              </div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-[#1F2E4A] flex justify-end gap-2">
            <button className="px-3 py-1.5 text-xs rounded-lg border border-[#1F2E4A] text-[#D2D6DC] hover:bg-[#1F2E4A] transition-colors">
              Export PDF
            </button>
            <button className="px-3 py-1.5 text-xs rounded-lg bg-[#10A595] text-[#041017] font-medium hover:bg-[#0d8a7c] transition-colors">
              View Full Report
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
