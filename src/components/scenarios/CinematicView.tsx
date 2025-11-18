'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Maximize2, Minimize2, RotateCw } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

interface CinematicViewProps {
  result: {
    id: string;
    title?: string;
    narrative?: string;
    image?: {
      url: string;
      alt?: string;
    };
    probabilities?: Record<string, number>;
    confidence?: number;
    macroInfluence?: string;
    volatility?: string;
    duration?: string;
  };
  onClose: () => void;
}

export function CinematicView({ result, onClose }: CinematicViewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'narrative' | 'metrics' | 'data'>('narrative');

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'f' && !e.ctrlKey && !e.metaKey) {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(console.error);
        setIsFullscreen(false);
      }
    }
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting scenario:', result.id);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-300 hover:text-white transition-colors bg-black/50 rounded-full"
          aria-label="Close cinematic view"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-16 z-10 p-2 text-gray-300 hover:text-white transition-colors bg-black/50 rounded-full"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? (
            <Minimize2 className="h-5 w-5" />
          ) : (
            <Maximize2 className="h-5 w-5" />
          )}
        </button>

        {/* Main Content */}
        <motion.div
          className="relative w-full max-w-6xl bg-[#0C172E] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          style={{ maxHeight: '90vh' }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="p-6 border-b border-[#1F2E4A] bg-[#0A1223]">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#D2D6DC]">
                  {result?.title || 'Scenario Analysis'}
                </h2>
                <p className="text-sm text-[#8A94A6] mt-1">
                  {new Date().toLocaleDateString()} • {result?.duration || 'N/A'}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#10A595] text-[#041017] rounded-lg hover:bg-[#0d8a7c] transition-colors"
                >
                  <Download size={16} />
                  Export
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-[#1F2E4A] mt-4 -mb-6">
              {['narrative', 'metrics', 'data'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === tab
                      ? 'text-[#10A595] border-b-2 border-[#10A595]'
                      : 'text-[#8A94A6] hover:text-[#D2D6DC]'
                  }`}
                  onClick={() => setActiveTab(tab as any)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto p-6">
            {activeTab === 'narrative' && (
              <div className="space-y-6">
                {result?.image?.url && (
                  <div className="relative rounded-xl overflow-hidden border border-[#1F2E4A] bg-black">
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#0A1223]/80">
                        <RotateCw className="h-8 w-8 animate-spin text-[#10A595]" />
                      </div>
                    )}
                    <img
                      src={result.image.url}
                      alt={result.image.alt || 'Scenario visualization'}
                      className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                      onLoad={handleImageLoad}
                    />
                  </div>
                )}

                <div className="prose prose-invert max-w-none">
                  <div className="text-lg text-[#D2D6DC] whitespace-pre-line">
                    {result?.narrative || 'No narrative available.'}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetricCard
                  title="Confidence Score"
                  value={`${((result?.confidence || 0) * 100).toFixed(1)}%`}
                  description="Model confidence in the prediction"
                  color="text-emerald-400"
                />
                <MetricCard
                  title="Macro Influence"
                  value={result?.macroInfluence || 'N/A'}
                  description="Impact on macroeconomic indicators"
                  color="text-blue-400"
                />
                <MetricCard
                  title="Volatility"
                  value={result?.volatility || 'N/A'}
                  description="Predicted market volatility"
                  color="text-amber-400"
                />

                {/* Probability Distribution */}
                {result?.probabilities && (
                  <div className="col-span-full bg-[#15233F] p-6 rounded-xl border border-[#1F2E4A] mt-4">
                    <h3 className="text-lg font-semibold text-[#D2D6DC] mb-4">
                      Probability Distribution
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(result.probabilities).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-[#D2D6DC]">{key}</span>
                            <span className="text-[#8A94A6]">
                              {(Number(value) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-2 bg-[#1F2E4A] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                              style={{
                                width: `${(Number(value) * 100).toFixed(1)}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'data' && (
              <div className="bg-[#15233F] p-6 rounded-xl border border-[#1F2E4A]">
                <h3 className="text-lg font-semibold text-[#D2D6DC] mb-4">
                  Raw Data
                </h3>
                <pre className="text-xs text-[#8A94A6] overflow-auto max-h-[60vh] p-4 bg-[#0A1223] rounded-lg">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Helper component for metric cards
function MetricCard({
  title,
  value,
  description,
  color,
}: {
  title: string;
  value: string | number;
  description?: string;
  color: string;
}) {
  return (
    <div className="bg-[#15233F] p-6 rounded-xl border border-[#1F2E4A] h-full">
      <p className="text-sm text-[#8A94A6] mb-1">{title}</p>
      <p className={`text-3xl font-bold ${color} mb-2`}>{value}</p>
      {description && (
        <p className="text-xs text-[#8A94A6] mt-2">{description}</p>
      )}
    </div>
  );
}
