import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SkillMetric } from '../../types';

interface GapBarChartProps {
  skills: SkillMetric[];
}

export const GapBarChart: React.FC<GapBarChartProps> = ({ skills }) => {
  // Filter for skills with a gap > 10 and take top 5
  const data = skills
    .map(s => ({
      name: s.skillName,
      Gap: Math.max(0, s.targetScore - s.currentScore),
      Current: s.currentScore,
      importance: s.importance
    }))
    .filter(s => s.Gap > 10)
    .sort((a, b) => b.Gap - a.Gap)
    .slice(0, 7);

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11, fill: '#475569' }} />
          <Tooltip
             cursor={{fill: 'transparent'}}
             contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
          />
          <Bar dataKey="Gap" name="Skill Gap %" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.importance === 'Critical' ? '#ef4444' : '#f59e0b'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};