import React from 'react';
import { AnalysisResult, SkillMetric } from '../types';
import { SkillRadar } from './charts/SkillRadar';
import { GapBarChart } from './charts/GapBarChart';
import { ActionPlan } from './ActionPlan';

interface DashboardProps {
  data: AnalysisResult;
  onReset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ data, onReset }) => {
  const criticalGaps = data.skills.filter(s => s.importance === 'Critical' && s.currentScore < s.targetScore).length;

  return (
    <div className="animate-fade-in space-y-8">
      {/* Top Summary Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Analysis Result</h2>
          <p className="text-slate-500 text-sm mt-1">Based on your resume and target role</p>
        </div>
        
        <div className="flex gap-6">
          <div className="text-center">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Match Score</p>
            <p className={`text-3xl font-extrabold ${
              data.overallMatchPercentage > 80 ? 'text-emerald-500' : 
              data.overallMatchPercentage > 50 ? 'text-orange-500' : 'text-red-500'
            }`}>
              {data.overallMatchPercentage}%
            </p>
          </div>
          <div className="h-12 w-px bg-slate-200"></div>
          <div className="text-center">
             <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Critical Gaps</p>
             <p className="text-3xl font-extrabold text-slate-800">{criticalGaps}</p>
          </div>
        </div>
        
        <button 
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
        >
          New Analysis
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Charts */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Competency Map</h3>
            <SkillRadar skills={data.skills} />
            <p className="text-xs text-center text-slate-400 mt-2">Proficiency by Category</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
             <h3 className="text-lg font-bold text-slate-800 mb-4">Top Skill Gaps</h3>
             <GapBarChart skills={data.skills} />
             <div className="flex gap-4 justify-center mt-4">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <span className="text-xs text-slate-500">Critical</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                 <span className="text-xs text-slate-500">Moderate</span>
               </div>
             </div>
          </div>
        </div>

        {/* Right Column: Detailed Insights & Plan */}
        <div className="lg:col-span-2 space-y-8">
           {/* Executive Summary */}
           <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-8 rounded-2xl text-white shadow-lg">
              <h3 className="text-lg font-bold mb-2 text-indigo-100">AI Assessment Summary</h3>
              <p className="text-indigo-50 leading-relaxed">{data.summary}</p>
           </div>

           {/* Learning Path */}
           <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">Recommended Learning Path</h3>
                <span className="text-sm text-slate-500 font-medium">Prioritized for impact</span>
              </div>
              <ActionPlan recommendations={data.recommendations} />
           </div>
        </div>
      </div>
    </div>
  );
};