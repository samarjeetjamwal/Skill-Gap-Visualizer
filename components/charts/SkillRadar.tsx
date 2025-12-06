import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { SkillMetric } from '../../types';

interface SkillRadarProps {
  skills: SkillMetric[];
}

export const SkillRadar: React.FC<SkillRadarProps> = ({ skills }) => {
  // Aggregate data by category for a cleaner radar chart
  const categoryData = skills.reduce((acc, skill) => {
    const existing = acc.find(item => item.subject === skill.category);
    if (existing) {
      existing.currentTotal += skill.currentScore;
      existing.targetTotal += skill.targetScore;
      existing.count += 1;
    } else {
      acc.push({
        subject: skill.category,
        currentTotal: skill.currentScore,
        targetTotal: skill.targetScore,
        count: 1
      });
    }
    return acc;
  }, [] as { subject: string; currentTotal: number; targetTotal: number; count: number }[]);

  const data = categoryData.map(item => ({
    subject: item.subject,
    Current: Math.round(item.currentTotal / item.count),
    Target: Math.round(item.targetTotal / item.count),
    fullMark: 100
  }));

  if (data.length === 0) return <div>No data available for chart</div>;

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Current Proficiency"
            dataKey="Current"
            stroke="#10b981"
            strokeWidth={2}
            fill="#10b981"
            fillOpacity={0.4}
          />
          <Radar
            name="Target Requirement"
            dataKey="Target"
            stroke="#4f46e5"
            strokeWidth={2}
            fill="#4f46e5"
            fillOpacity={0.2}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};