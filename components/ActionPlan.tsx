import React from 'react';
import { Recommendation } from '../types';

interface ActionPlanProps {
  recommendations: Recommendation[];
}

export const ActionPlan: React.FC<ActionPlanProps> = ({ recommendations }) => {
  const sortedRecs = [...recommendations].sort((a, b) => a.priority - b.priority);

  return (
    <div className="space-y-6">
      {sortedRecs.map((rec, index) => (
        <div key={index} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                 <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${
                    rec.priority === 1 ? 'bg-red-100 text-red-700' : 
                    rec.priority === 2 ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                 }`}>
                  Priority {rec.priority}
                 </span>
                 <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">{rec.skillCategory}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{rec.actionItem}</h3>
              
              {rec.resources && rec.resources.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Recommended Resources</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {rec.resources.map((res, rIndex) => (
                      <div key={rIndex} className="flex flex-col bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div className="flex justify-between items-start mb-1">
                           <span className="text-xs font-semibold text-primary">{res.type}</span>
                           <span className="text-xs text-slate-500">{res.estimatedDuration}</span>
                        </div>
                        <p className="text-sm font-medium text-slate-800 line-clamp-2">{res.title}</p>
                        {res.provider && <p className="text-xs text-slate-500 mt-1">via {res.provider}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};